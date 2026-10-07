using Microsoft.UI.Dispatching;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using WinIsland.Core;

namespace InputIsland;

/// <summary>
/// 示例插件：演示宿主 2.4.0 的「输入会话」。
/// 岛体与聚光卡默认都是 WS_EX_NOACTIVATE（点它们不抢焦点），宿主只在内容里的
/// 标准文本控件获得焦点时临时放开激活 —— 所以下面的 TextBox 可以直接打字（含中文输入法），
/// 而按钮点击依旧不会打断其它程序。
/// </summary>
public sealed class InputIslandPlugin : IslandPluginBase
{
    private IslandInputView? _view;

    protected override Task OnInitializeAsync()
    {
        _view = new IslandInputView(this);
        SetContent(new IslandLiveContent
        {
            Priority = 30,
            OwnerLabel = Manifest.Name,
            OwnerGlyph = Manifest.IconGlyph,
            OwnerAccent = Windows.UI.Color.FromArgb(255, 34, 197, 94),
            MorphView = _view,
            CompactSize = new Windows.Foundation.Size(300, 44),
            ExpandedSize = new Windows.Foundation.Size(420, 150),
        });
        return Task.CompletedTask;
    }

    protected override Task OnShutdownAsync()
    {
        _view?.Stop();
        _view = null;
        return Task.CompletedTask;
    }

    /// <summary>打开一张带输入框的聚光卡（点岛上的「聚光卡」按钮触发）。</summary>
    internal void OpenSpotlight()
    {
        var detail = new SpotlightInputView();
        Context.Island.OpenSpotlight(new IslandSpotlight
        {
            Content = detail.View,
            Size = new Windows.Foundation.Size(560, 320),
            OnClosed = detail.Stop,
        });
    }
}

/// <summary>
/// 岛体视图（单视图 morph）：可直接打字的文本框 + 回显 + 打开聚光卡的按钮。
/// 展开/收起用逐帧属性赋值驱动回显区（插件程序集里禁用 Storyboard 属性路径动画，见 PLUGIN.md）。
/// </summary>
internal sealed class IslandInputView : IMorphView
{
    private const double CompactEchoHeight = 0;
    private const double ExpandedEchoHeight = 76;

    private readonly TextBox _input;
    private readonly TextBlock _echo;
    private readonly Border _echoBox;
    private readonly DispatcherQueueTimer _morph;
    private DateTimeOffset _morphStart;
    private TimeSpan _morphDuration = TimeSpan.FromMilliseconds(1);
    private double _morphFrom;
    private double _morphTo;

    public UIElement View { get; }

    public IslandInputView(InputIslandPlugin plugin)
    {
        _input = new TextBox
        {
            PlaceholderText = "在岛上输入…",
            Width = 176,
        };
        _input.TextChanged += (_, _) => ShowEcho();

        var spotlight = new Button { Content = "聚光卡" };
        spotlight.Click += (_, _) => plugin.OpenSpotlight();

        var row = new StackPanel
        {
            Orientation = Orientation.Horizontal,
            Spacing = 8,
            VerticalAlignment = VerticalAlignment.Center,
        };
        row.Children.Add(_input);
        row.Children.Add(spotlight);

        _echo = new TextBlock
        {
            FontSize = 12,
            TextWrapping = TextWrapping.Wrap,
            Text = EchoPrefix,
        };
        _echoBox = new Border
        {
            Height = CompactEchoHeight,
            Opacity = 0,
            Margin = new Thickness(0, 6, 0, 0),
            Child = _echo,
        };

        var root = new Grid { Padding = new Thickness(14, 6, 14, 6) };
        root.RowDefinitions.Add(new RowDefinition { Height = GridLength.Auto });
        root.RowDefinitions.Add(new RowDefinition { Height = new GridLength(1, GridUnitType.Star) });
        root.Children.Add(row);
        Grid.SetRow(_echoBox, 1);
        root.Children.Add(_echoBox);
        View = root;

        _morph = root.DispatcherQueue.CreateTimer();
        _morph.Interval = TimeSpan.FromMilliseconds(16);
        _morph.IsRepeating = true;
        _morph.Tick += (_, _) => MorphTick();
    }

    private const string EchoPrefix = "回显：（还没输入）";

    public void AnimateToExpanded(TimeSpan duration) => StartMorph(ExpandedEchoHeight, duration);

    public void AnimateToCompact(TimeSpan duration) => StartMorph(CompactEchoHeight, duration);

    /// <summary>插件停用时停掉定时器（视图会被宿主卸载，这里只负责收尾）。</summary>
    public void Stop() => _morph.Stop();

    private void ShowEcho()
        => _echo.Text = _input.Text.Length == 0 ? EchoPrefix : "回显：" + _input.Text;

    private void StartMorph(double target, TimeSpan duration)
    {
        _morphFrom = _echoBox.Height;
        _morphTo = target;
        _morphStart = DateTimeOffset.UtcNow;
        _morphDuration = duration <= TimeSpan.Zero ? TimeSpan.FromMilliseconds(1) : duration;
        _morph.Stop();
        _morph.Start();
    }

    private void MorphTick()
    {
        double t = Math.Clamp(
            (DateTimeOffset.UtcNow - _morphStart).TotalMilliseconds / _morphDuration.TotalMilliseconds, 0, 1);
        double eased = 1 - Math.Pow(1 - t, 3);
        _echoBox.Height = _morphFrom + (_morphTo - _morphFrom) * eased;
        _echoBox.Opacity = ExpandedEchoHeight <= 0 ? 0 : _echoBox.Height / ExpandedEchoHeight;
        if (t >= 1) _morph.Stop();
    }
}

/// <summary>聚光卡视图：必须是独立于岛视图的可视树（每个窗口一棵树）。</summary>
internal sealed class SpotlightInputView
{
    private readonly TextBox _input;
    private readonly TextBlock _echo;

    public UIElement View { get; }

    public SpotlightInputView()
    {
        _input = new TextBox
        {
            PlaceholderText = "在聚光卡里输入…（Esc 关卡片；组词中的第一次 Esc 只取消组词）",
            Width = 340,
        };
        _input.TextChanged += (_, _) => ShowEcho();

        _echo = new TextBlock
        {
            FontSize = 13,
            TextWrapping = TextWrapping.Wrap,
            Text = EchoPrefix,
        };

        var panel = new StackPanel { Padding = new Thickness(24), Spacing = 12 };
        panel.Children.Add(new TextBlock { Text = "聚光卡输入演示", FontSize = 16 });
        panel.Children.Add(_input);
        panel.Children.Add(_echo);
        View = panel;
    }

    private const string EchoPrefix = "回显：（还没输入）";

    /// <summary>收起回调：把用户输入清掉，不留在被丢弃的视图里。</summary>
    public void Stop()
    {
        _input.Text = string.Empty;
        _echo.Text = EchoPrefix;
    }

    private void ShowEcho()
        => _echo.Text = _input.Text.Length == 0 ? EchoPrefix : "回显：" + _input.Text;
}
