using Microsoft.UI.Xaml;
using WinIsland.Core;

namespace WinIsland.Core.Plugins;

public sealed class ScopedIslandSurface : IIslandSurface
{
    private readonly PluginInstance _owner;
    private readonly IslandService _island;
    private readonly PluginScope _scope;
    private readonly HashSet<string> _dropTargetIds = new(StringComparer.Ordinal);
    private bool _contentRevokerRegistered;
    private bool _temporaryRevokerRegistered;
    private bool _spotlightRevokerRegistered;

    public ScopedIslandSurface(PluginInstance owner, IslandService island, PluginScope scope)
    {
        _owner = owner;
        _island = island;
        _scope = scope;
    }

    public void SetContent(IslandLiveContent? content)
    {
        if (!_owner.TryEnter("SetContent"))
        {
            return;
        }

        if (content == null)
        {
            _island.SetLiveContent(_owner.Info.Id, null);
            return;
        }

        if (!_contentRevokerRegistered)
        {
            _contentRevokerRegistered = true;
            _scope.Register(new ActionDisposable(() => _island.SetLiveContent(_owner.Info.Id, null)));
        }

        _island.SetLiveContent(_owner.Info.Id, Guard(content));
    }

    public void ShowMessage(IslandMessage message)
    {
        if (!_owner.TryEnter("ShowMessage"))
        {
            return;
        }

        RegisterTemporaryRevoker();
        _island.SendMessage(_owner.Info.Id, message);
    }

    public void Show(UIElement content, Windows.Foundation.Size size, TimeSpan? duration = null)
    {
        if (!_owner.TryEnter("Show"))
        {
            return;
        }

        RegisterTemporaryRevoker();
        _island.ShowContent(_owner.Info.Id, content, size, duration ?? TimeSpan.FromSeconds(5));
    }

    public void DismissTemporary()
    {
        if (!_owner.TryEnter("DismissTemporary"))
        {
            return;
        }

        _island.DismissTemporary(_owner.Info.Id);
    }

    public void AddSettingsPage(SettingsPageDescriptor page)
    {
        if (!_owner.TryEnter("AddSettingsPage"))
        {
            return;
        }

        var scopedId = ScopedPageId(page.Id);
        var descriptor = new SettingsPageDescriptor(
            scopedId,
            page.Title,
            page.Glyph,
            () => _owner.GuardPageFactory(page),
            page.Order);

        _island.AddSettingsPage(descriptor);
        _scope.Register(new ActionDisposable(() => _island.RemoveSettingsPage(scopedId)));
    }

    public void RemoveSettingsPage(string pageId)
    {
        if (!_owner.TryEnter("RemoveSettingsPage"))
        {
            return;
        }

        _island.RemoveSettingsPage(ScopedPageId(pageId));
    }

    public void AddDropTarget(IslandDropTarget target)
    {
        if (!_owner.TryEnter("AddDropTarget"))
        {
            return;
        }

        if (string.IsNullOrWhiteSpace(target.Id))
        {
            return;
        }

        // 停用/卸载时撤回：同一个 Id 只挂一个撤回器（重复注册同 Id 是覆盖语义，不需要再挂）
        if (_dropTargetIds.Add(target.Id))
        {
            var id = target.Id;
            _scope.Register(new ActionDisposable(() => _island.RemoveDropTarget(_owner.Info.Id, id)));
        }

        _island.AddDropTarget(_owner.Info.Id, Guard(target));
    }

    public void RemoveDropTarget(string targetId)
    {
        if (!_owner.TryEnter("RemoveDropTarget") || string.IsNullOrWhiteSpace(targetId))
        {
            return;
        }

        _dropTargetIds.Remove(targetId);
        _island.RemoveDropTarget(_owner.Info.Id, targetId);
    }

    public void OpenSpotlight(IslandSpotlight spotlight)
    {
        if (!_owner.TryEnter("OpenSpotlight"))
        {
            return;
        }

        if (spotlight?.Content is null)
        {
            return;
        }

        if (!_spotlightRevokerRegistered)
        {
            _spotlightRevokerRegistered = true;
            _scope.Register(new ActionDisposable(() => _island.CloseSpotlight(_owner.Info.Id)));
        }

        _island.OpenSpotlight(_owner.Info.Id, new IslandSpotlight
        {
            Content = spotlight.Content,
            Size = spotlight.Size,
            OnClosed = spotlight.OnClosed == null
                ? null
                : () => _owner.InvokeGuarded("聚光卡关闭回调", spotlight.OnClosed),
        });
    }

    public void CloseSpotlight()
    {
        if (!_owner.TryEnter("CloseSpotlight"))
        {
            return;
        }

        _island.CloseSpotlight(_owner.Info.Id);
    }

    private void RegisterTemporaryRevoker()
    {
        if (_temporaryRevokerRegistered)
        {
            return;
        }

        _temporaryRevokerRegistered = true;
        _scope.Register(new ActionDisposable(() => _island.DismissTemporary(_owner.Info.Id)));
    }

    private string ScopedPageId(string pageId) => $"{_owner.Info.Id}/{pageId}";

    /// <summary>
    /// 复制一份常驻内容：插件之后改自己那份对象不再影响宿主，回调统一包进守卫。
    /// 用 <c>with</c> 整体复制（SDK 里是 record）——之后新增属性会自动带上，不会再像手抄字段那样漏。
    /// </summary>
    private IslandLiveContent Guard(IslandLiveContent content) => content with
    {
        OnTap = content.OnTap == null ? null : () => _owner.InvokeGuarded("点击回调", content.OnTap),
    };

    /// <summary>
    /// 复制一份投放目标：插件之后改自己那份对象不再影响宿主，
    /// 回调统一包进异步守卫（投放动作可能 await），扩展名列表复制一份（避免插件改了它以后宿主读到半截）。
    /// 复制必须走 <c>with</c> 整体拷贝：**只能覆盖 <c>Handler</c> 与 <c>Extensions</c>** ——
    /// 曾经按字段手抄漏掉了 <see cref="IslandDropTarget.Kinds"/>，插件声明的 Text / Image
    /// 被静默降级成默认的 Files（表现与声明相反），别改回逐字段构造。
    /// </summary>
    private IslandDropTarget Guard(IslandDropTarget target) => target with
    {
        Extensions = target.Extensions?.ToArray(),
        Handler = ctx => _owner.InvokeGuardedAsync("投放回调", () => target.Handler(ctx)),
    };
}
