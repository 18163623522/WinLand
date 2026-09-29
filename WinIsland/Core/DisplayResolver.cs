using Microsoft.UI;
using Microsoft.UI.Windowing;
using Windows.Graphics;
using Windows.Graphics.Display;

namespace WinIsland.Core;

/// <summary>
/// 显示器解析层：把「岛该待在哪个屏幕」从散落各处的 <c>DisplayAreaFallback.Primary</c> 硬编码里收出来，
/// 统一按 <c>island.display</c> 设置（自动 = 跟随鼠标所在屏 / 指定某一台）解析，并在多屏热插拔时广播失效信号。
///
/// 为什么需要它：<see cref="DisplayArea.GetFromWindowId"/> 拿到的永远是「窗口当前所在屏」，
/// 而岛窗口在搬到目标屏之前一直待在旧屏上，于是"目标屏"永远等于"当前屏" —— 这是本类存在的全部理由。
/// 所有调用方必须显式问「岛应该在哪块屏」，不能再用 Primary 兜底。
/// </summary>
internal static class DisplayResolver
{
    /// <summary>设置键：岛锚定到哪块显示器。值为 <see cref="DisplayAuto"/> 或某块屏的 <c>\\.\DISPLAYn</c>。</summary>
    public const string SettingKey = "island.display";

    /// <summary>自动：跟随鼠标光标所在的显示器（默认）。</summary>
    public const string DisplayAuto = "auto";

    /// <summary>
    /// 显示器配置失效信号。多屏热插拔（拔/接外接屏、换分辨率、改显示器排列、切投影模式）时触发，
    /// **在任意线程**上 —— 订阅方自行编组到 UI 线程。
    /// </summary>
    public static event Action? DisplaysInvalidated;

    private static bool _subscribed;

    /// <summary>
    /// 多屏热插拔（拔掉/接上外接屏、切换分辨率/投影模式、显示器排列变化）时系统会广播
    /// <c>DisplayInformation.DisplayContentsInvalidated</c>。WinUI 没有暴露等价事件，所以只能订阅这个静态事件。
    /// 该事件在**任意线程**触发，订阅方自行编组到 UI 线程。
    /// </summary>
    public static void EnsureInvalidationWatcher()
    {
        if (_subscribed) return;
        _subscribed = true;
        try
        {
            DisplayInformation.DisplayContentsInvalidated += (_, _) => NotifyInvalidated();
        }
        catch
        {
            // 取不到 DisplayInformation（极老系统 / 无显示器会话）时静默降级：只是没有热插拔重定位
        }
    }

    private static void NotifyInvalidated()
    {
        var handler = DisplaysInvalidated;
        if (handler == null) return;
        try
        {
            handler();
        }
        catch
        {
            // 订阅方在别的线程抛异常不能反过来污染系统事件
        }
    }

    /// <summary>所有显示器的描述（主屏排最前，其余按排列坐标从左到右、从上到下 —— 与设置页卡片同序）。
    /// 枚举失败时返回空数组。</summary>
    public static DisplayDescription[] List()
    {
        DisplayArea[] areas;
        try
        {
            areas = DisplayArea.FindAll().ToArray();
        }
        catch
        {
            return Array.Empty<DisplayDescription>();
        }

        var list = new List<DisplayDescription>(areas.Length);
        foreach (var area in areas)
        {
            if (area is null) continue;
            var desc = Describe(area);
            if (desc is not null) list.Add(desc.Value);
        }

        // 主屏排最前，其余按物理坐标从左到右、从上到下（给人看的顺序，与设置页卡片一致）
        return list
            .OrderByDescending(d => d.IsPrimary)
            .ThenBy(d => d.Bounds.X)
            .ThenBy(d => d.Bounds.Y)
            .ToArray();
    }

    /// <summary>
    /// 解析岛应该待在哪块显示器。
    /// <paramref name="setting"/> 为 <c>auto</c>/空时跟随鼠标光标所在屏；否则按 <c>\\.\DISPLAYn</c> 匹配，
    /// 匹配不到（那块屏被拔了/换插口了）静默退回自动模式 —— 不报错，用户下次打开设置页会看到「自动」被选中。
    /// </summary>
    /// <param name="windowId">岛窗口的 window id：鼠标屏解析不出来时用它做「最近屏」兜底，绝不用 Primary。</param>
    public static DisplayArea Resolve(string? setting, WindowId windowId)
    {
        var all = SafeFindAll();
        if (all.Length == 0) return DisplayArea.GetFromWindowId(windowId, DisplayAreaFallback.Nearest);

        if (!string.IsNullOrWhiteSpace(setting)
            && !string.Equals(setting, DisplayAuto, StringComparison.OrdinalIgnoreCase))
        {
            if (FindByKey(all, setting) is { } pinned) return pinned;
            // 指定的屏不在了（拔掉/驱动变了）：不报错，静默退回自动 —— 用户下次打开设置页会看到"自动"被选中
        }

        // 自动：跟随鼠标。GetFromPoint 在坐标不落在任何屏上时抛异常（多屏之间的死区、负坐标边界），
        // 所以裹一层 —— 那种情况用窗口所在屏兜底
        if (CursorPoint() is { } pt && DisplayFromPoint(pt) is { } hover) return hover;

        return DisplayArea.GetFromWindowId(windowId, DisplayAreaFallback.Nearest);
    }

    private static DisplayArea? DisplayFromPoint(PointInt32 pt)
    {
        try
        {
            return DisplayArea.GetFromPoint(pt, DisplayAreaFallback.None);
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// 按屏幕（物理像素）解析显示器 —— 聚光卡这类「覆盖整块屏」的场景用。
    /// 岛矩形有效时它就是岛所在的那块屏，所以不需要"反推"：岛确实在那块屏上。
    /// </summary>
    public static DisplayArea FromRect(RectInt32 rect)
        => DisplayArea.GetFromRect(rect, DisplayAreaFallback.Nearest);

    /// <summary>一块 DisplayArea 在设置里的标识（见 <see cref="Describe"/>）。</summary>
    public static string KeyOf(DisplayArea area)
        => Describe(area)?.Key ?? string.Empty;

    /// <summary>
    /// 一块 DisplayArea 在设置里的标识。取 <c>\\.\DISPLAYn</c>（如 <c>\\.\DISPLAY2</c>）：
    /// 用户手动改 settings.json 时能直接看明白、对得上号。
    /// 取不到（枚举失败）时退回整数 id 的字符串形式，保证至少能自洽匹配。
    /// </summary>
    private static string StableKey(int displayId, DisplayArea area)
        => SystemIdOf(area) ?? $"displayid:{displayId}";

    private static DisplayDescription? Describe(DisplayArea area)
    {
        string systemId;
        int displayId;
        try
        {
            displayId = (int)area.DisplayId.Value;
            systemId = StableKey(displayId, area);
        }
        catch
        {
            return null;
        }

        bool primary = false;
        try
        {
            primary = area.IsPrimary;
        }
        catch
        {
            // 该属性在某些系统上会抛，当作非主屏处理
        }

        return new DisplayDescription(
            systemId,
            systemId,
            displayId,
            primary,
            area.OuterBounds,
            area.WorkArea);
    }

    /// <summary>
    /// 按显示器外框反查 <c>\\.\DISPLAYn</c> 名：<see cref="DisplayArea"/> 只暴露一个整数 id，
    /// 而用户在设置里看得懂、能手改的是 <c>\\.\DISPLAY2</c> 这种名字。两者靠排列原点对上
    /// （<c>EnumDisplaySettings</c> 报告的原点与 <c>DisplayArea.OuterBounds</c> 的原点
    /// 是同一套虚拟桌面坐标）。查不到返回 null。
    /// </summary>
    private static string? SystemIdOf(DisplayArea area)
    {
        var bounds = area.OuterBounds;
        foreach (var device in Win32.EnumerateDisplayDevices())
        {
            if (device.Position.X == bounds.X && device.Position.Y == bounds.Y) return device.Name;
        }

        return null;
    }

    /// <summary>
    /// 按设置里的值找显示器。匹配面放宽是有意的：<c>\\.\DISPLAYn</c> 是主键，
    /// 但也接受用户手写的纯整数显示器 id（就当是 <c>DisplayArea.DisplayId</c>）。
    /// </summary>
    private static DisplayArea? FindByKey(DisplayArea[] all, string key)
    {
        key = key.Trim();

        foreach (var area in all)
        {
            if (Describe(area) is not { } desc) continue;
            if (string.Equals(desc.Key, key, StringComparison.OrdinalIgnoreCase)) return area;
        }

        // 用户直接写了整数显示器 id
        foreach (var area in all)
        {
            if (Describe(area) is not { } desc) continue;
            if (int.TryParse(key, out int id) && desc.DisplayId == id) return area;
        }

        return null;
    }

    private static DisplayArea[] SafeFindAll()
    {
        try
        {
            return DisplayArea.FindAll().Where(a => a is not null).ToArray();
        }
        catch
        {
            return Array.Empty<DisplayArea>();
        }
    }

    /// <summary>鼠标光标位置（物理像素）。取不到返回 null（无输入会话、远程桌面等）。</summary>
    private static PointInt32? CursorPoint()
        => Win32.GetCursorPos(out var pt) ? new PointInt32(pt.X, pt.Y) : null;
}

/// <summary>一块显示器在设置页里需要的全部信息（不含任何 WinRT 对象，便于跨线程传）。</summary>
internal readonly record struct DisplayDescription(
    string Key,
    string SystemId,
    int DisplayId,
    bool IsPrimary,
    RectInt32 Bounds,
    RectInt32 WorkArea)
{
    /// <summary>给人看的名字：「显示器 1（主）· 2560×1440」。</summary>
    public string Label
    {
        get
        {
            int index = ParseIndex(SystemId);
            string name = index > 0 ? $"显示器 {index}" : "显示器";
            string primary = IsPrimary ? "（主）" : string.Empty;
            return $"{name}{primary} · {Bounds.Width}×{Bounds.Height}";
        }
    }

    /// <summary>卡片副标题：「\\.\DISPLAY2 · 2560×1440 @ 0,0」这类给排查用的细节。</summary>
    public string Detail => $"{SystemId} · {Bounds.Width}×{Bounds.Height} @ {Bounds.X},{Bounds.Y}";

    private static int ParseIndex(string systemId)
    {
        const string prefix = @"\\.\DISPLAY";
        if (!systemId.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)) return 0;
        return int.TryParse(systemId.AsSpan(prefix.Length), out int n) ? n : 0;
    }
}
