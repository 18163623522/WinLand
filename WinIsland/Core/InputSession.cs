using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;
using Windows.Foundation;

namespace WinIsland.Core;

/// <summary>
/// 岛体与聚光卡共用的「输入会话」：两个窗口默认都是 WS_EX_NOACTIVATE（点它们不抢焦点，
/// 这是产品的核心行为，剪贴板「直接粘贴回原窗口」等都依赖它）。唯一例外：用户点到内容里的
/// 文本输入控件（TextBox / PasswordBox / RichEditBox，含 NumberBox / AutoSuggestBox 的内部编辑器）时，
/// 宿主临时摘掉 NOACTIVATE、把窗口抢到前台，让 WinUI 把键盘焦点（含输入法、光标、选区）交给控件；
/// 窗口一失活就把样式还原，并通知窗口恢复正常的悬停/收起裁决。
///
/// 两条检测通道缺一不可（见 <see cref="Attach"/>）：
///  · GettingFocus —— 首次点击把焦点移上控件、以及程序化聚焦；
///  · PointerPressed(handledEventsToo) —— 焦点已在控件上时再点击不产生焦点变化，
///    且 TextBox 会把 PointerPressed 标记 handled，普通订阅收不到。
///
/// 会话结束的唯一条件是窗口失活（点岛外/别的应用、隐藏、被聚光卡遮挡）；点岛内其它控件
/// 不结束会话 —— 窗口仍是激活态，输入能力应当保持。
/// </summary>
internal sealed class InputSession : IDisposable
{
    private readonly Window _window;
    private readonly nint _hwnd;
    private readonly IPluginLogger _log;
    private readonly Action? _afterStyleChange;

    /// <summary>会话进行中：窗口当前可激活且已在尝试保持前台。</summary>
    public bool IsActive { get; private set; }

    /// <summary>进入会话（已抢到前台）时触发，UI 线程同步。</summary>
    public event Action? Entered;

    /// <summary>会话结束（窗口失活）时触发，UI 线程同步，触发时样式已还原。</summary>
    public event Action? Exited;

    public InputSession(Window window, IPluginLogger log, Action? afterStyleChange = null)
    {
        _window = window;
        _hwnd = WinRT.Interop.WindowNative.GetWindowHandle(window);
        _log = log;
        _afterStyleChange = afterStyleChange;
        _window.Activated += OnActivated;
    }

    /// <summary>
    /// 把检测挂到内容根元素上：岛体用 RootGrid（覆盖主岛 + 队列卡片 + 临时消息），
    /// 聚光卡用 RootCanvas。
    /// </summary>
    public void Attach(UIElement root)
    {
        root.AddHandler(UIElement.GettingFocusEvent,
            new TypedEventHandler<UIElement, GettingFocusEventArgs>(OnGettingFocus), handledEventsToo: true);
        root.AddHandler(UIElement.PointerPressedEvent,
            new PointerEventHandler(OnPointerPressed), handledEventsToo: true);
    }

    /// <summary>
    /// 尝试进入输入会话：先清掉 NOACTIVATE（会话中重复调用也重清一次，幂等自愈 ——
    /// 防止别的路径如窗口样式重断言把位写回去），再抢前台；抢不到就立刻还原样式并放弃，
    /// 调用方无需补救，下次点击会重试。
    /// </summary>
    public bool TryBegin()
    {
        Win32.SetActivatable(_hwnd, true);

        if (IsActive) return true;

        if (!Win32.TryBringToForeground(_hwnd))
        {
            Win32.SetActivatable(_hwnd, false);
            _log.Warn("输入会话抢前台失败（前台锁/系统拒绝），本次输入不可用；下次点击会重试。");
            return false;
        }

        IsActive = true;
        _log.Debug("进入输入会话：已临时解除 NOACTIVATE 并抢到前台。");
        _afterStyleChange?.Invoke();
        Entered?.Invoke();
        return true;
    }

    /// <summary>结束会话并还原样式（幂等；由窗口失活或窗口的隐藏/遮挡/关闭路径调用）。</summary>
    public void End()
    {
        if (!IsActive) return;

        IsActive = false;
        Win32.SetActivatable(_hwnd, false);
        _log.Debug("退出输入会话：NOACTIVATE 已还原。");
        _afterStyleChange?.Invoke();
        Exited?.Invoke();
    }

    public void Dispose() => _window.Activated -= OnActivated;

    private void OnActivated(object sender, WindowActivatedEventArgs e)
    {
        if (e.WindowActivationState == WindowActivationState.Deactivated)
        {
            End();
        }
    }

    private void OnGettingFocus(UIElement sender, GettingFocusEventArgs e)
    {
        if (IsTextInputSource(e.NewFocusedElement)) TryBegin();
    }

    private void OnPointerPressed(object sender, PointerRoutedEventArgs e)
    {
        if (IsTextInputSource(e.OriginalSource)) TryBegin();
    }

    /// <summary>
    /// 焦点/点击源是不是（或落在）文本输入控件里：沿可视树上溯认标准输入控件，
    /// NumberBox / AutoSuggestBox 的焦点落在其内部 TextBox 上，同样能上溯命中。
    /// </summary>
    private static bool IsTextInputSource(object? source)
    {
        for (var element = source as DependencyObject; element != null; element = VisualTreeHelper.GetParent(element))
        {
            if (element is TextBox or PasswordBox or RichEditBox or AutoSuggestBox or NumberBox)
            {
                return true;
            }
        }

        return false;
    }
}
