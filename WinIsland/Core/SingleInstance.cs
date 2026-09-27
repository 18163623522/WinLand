using WinIsland.Core.Plugins;

namespace WinIsland.Core;

/// <summary>
/// 单实例闸门：同一个登录会话里只允许跑一个 WinIsland。
/// 检查在 XAML 起来之前做（<see cref="Program.Main"/>），重复启动的进程根本走不到建岛、装托盘、起插件那一步。
///
/// 名字带 <c>Local\</c> 前缀 = 按登录会话隔离：多用户 / 远程桌面各自可以跑一个，同一会话里不管是不是管理员身份都只跑一个；
/// 顺带避开 <c>Global\</c> 需要的「创建全局对象」特权（普通用户没有）。
///
/// 判定用 <see cref="Mutex.WaitOne(int)"/> 而不是构造函数给出来的 createdNew：后者只看对象在不在，
/// 而上一个实例刚退出、正弹提醒的重复实例还攥着它的句柄时对象仍然在，会把后来的实例误判成多开。
/// WaitOne 问的是「有没有人真的持有」，那才是实例还活着的证据。
/// </summary>
internal sealed class SingleInstance : IDisposable
{
    private const string MutexName = @"Local\WinIsland.SingleInstance";
    private const string ActivationEventName = @"Local\WinIsland.SingleInstance.Activate";

    /// <summary>闸门本身。持有它 = 这个进程就是那个唯一实例，必须活到进程结束。</summary>
    private readonly Mutex _mutex;

    /// <summary>重复启动的通知：后来者 Set 一下，在跑的实例据此把自己亮出来。</summary>
    private readonly EventWaitHandle _activation;

    private RegisteredWaitHandle? _wait;

    private SingleInstance(Mutex mutex, EventWaitHandle activation)
    {
        _mutex = mutex;
        _activation = activation;
    }

    /// <summary>
    /// 抢闸门：抢到返回实例；已经有实例在跑则返回 null —— 此时已经通知过在跑的那个实例，
    /// 调用方提醒用户（<see cref="ReportDuplicateLaunch"/>）之后退出即可。
    /// </summary>
    public static SingleInstance? TryAcquire()
    {
        EventWaitHandle? activation = null;
        Mutex? mutex = null;
        try
        {
            // 事件先于互斥体创建：互斥体被别人占着的时候，事件必然已经存在，后来者才通知得到那个实例
            activation = new EventWaitHandle(false, EventResetMode.AutoReset, ActivationEventName);
            mutex = new Mutex(false, MutexName);
        }
        catch (UnauthorizedAccessException)
        {
            // 同名对象存在却打不开（在跑的实例是管理员身份，对象带了高完整性标签）：
            // 「打不开」本身就是「已经有人占着」的证据，按多开处理
            activation?.Dispose();
            return null;
        }

        if (TryTakeOwnership(mutex))
        {
            return new SingleInstance(mutex, activation);
        }

        // 已经有实例在跑：先让它拿到抢前台的资格（它把设置窗口调到前面时才不会被系统的前台锁挡住），再喊它一声
        Win32.AllowSetForegroundWindow(Win32.ASFW_ANY);
        activation.Set();

        activation.Dispose();
        mutex.Dispose();
        return null;
    }

    /// <summary>
    /// 在跑的实例调用：每来一次重复启动就回调一次（线程池线程，调用方自己编组到 UI 线程）。
    /// 早到的通知不会丢 —— 自动重置事件会把「没人等着的时候收到的信号」留到下一次等待。
    /// </summary>
    public void ListenForActivation(Action onActivated)
        => _wait = ThreadPool.RegisterWaitForSingleObject(
            _activation,
            (_, _) =>
            {
                try
                {
                    onActivated();
                }
                catch (Exception)
                {
                    // 线程池回调里绝不能把异常抛出去
                }
            },
            state: null,
            millisecondsTimeOutInterval: Timeout.Infinite,
            executeOnlyOnce: false);

    /// <summary>
    /// 重复启动的收尾：记一条日志 + 弹一个原生提示框，调用方随后直接退出。
    /// 提示框必须是原生的 —— 这个位置在 XAML 起来之前，没有任何 XAML 对话框可用。
    /// </summary>
    public static void ReportDuplicateLaunch()
    {
        try
        {
            new PluginLogService().Host.Warn("检测到重复启动：已经有一个 WinIsland 在运行，本次启动被拒绝。");
        }
        catch (Exception)
        {
            // 日志写不出来不影响提醒
        }

        Win32.ShowStartupMessage(
            "WinIsland 已经在运行，不能重复打开。\n\n程序只允许开一个实例，请使用托盘里的那个（双击托盘图标打开设置）。",
            "WinIsland");
    }

    /// <summary>
    /// 抢闸门的所有权。上一个实例崩溃（没来得及释放）时 WaitOne 会抛 AbandonedMutexException —— 那算我们抢到。
    /// </summary>
    private static bool TryTakeOwnership(Mutex mutex)
    {
        try
        {
            return mutex.WaitOne(0);
        }
        catch (AbandonedMutexException)
        {
            return true;
        }
    }

    public void Dispose()
    {
        _wait?.Unregister(null);   // 不等回调跑完：这会儿应用正在退出
        _activation.Dispose();
        // 关掉最后一个句柄，闸门自动交出去；不显式 ReleaseMutex：所有权是线程相关的，退出时未必在同一个线程上
        _mutex.Dispose();
    }
}
