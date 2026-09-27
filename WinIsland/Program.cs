using Microsoft.UI.Dispatching;
using Microsoft.UI.Xaml;
using WinIsland.Core;

namespace WinIsland;

/// <summary>
/// 应用入口。WinUI 默认的 Main 由 XAML 编译器生成（见 csproj 里的 DISABLE_XAML_GENERATED_MAIN），
/// 这里换成自己的，唯一目的是把「多开」挡在启动流程前面：两个实例会各建一座岛、各占一个托盘图标、
/// 插件目录也会互抢，必须在建岛之前就判断掉。
/// </summary>
internal static class Program
{
    [STAThread]
    private static void Main(string[] args)
    {
        var gate = SingleInstance.TryAcquire();
        if (gate is null)
        {
            // 已经有实例在跑（闸门已经通知它把自己的设置窗口亮出来）：提醒用户一句就退出
            SingleInstance.ReportDuplicateLaunch();
            return;
        }

        Application.Start(_ =>
        {
            SynchronizationContext.SetSynchronizationContext(
                new DispatcherQueueSynchronizationContext(DispatcherQueue.GetForCurrentThread()));
            new App { InstanceGate = gate };
        });

        // Application.Start 返回 = 应用已退出，闸门句柄要活到这一刻
        gate.Dispose();
    }
}
