using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Shapes;
using Windows.Foundation;
using Windows.UI;

namespace WeatherIsland;

/// <summary>
/// 自绘天气图标。
///
/// 为什么不用图标字体：Segoe Fluent Icons 与 Segoe MDL2 Assets 里都没有天气字形
/// （E9C4 附近的天气位是空的，塞进去只会显示成方框），所以这里按 24×24 的设计网格
/// 用形状画出来，交给 Viewbox 缩放任意尺寸。
///
/// **配色必须跟着岛体主题走**：形状的填充色是烘进 SolidColorBrush 的死值，
/// 深色岛体上为了看得清，云 / 雪 / 雾 / 月亮都用的是接近白的颜色 ——
/// 这些颜色搬到浅色岛体上就是白压白，整枚图标直接消失。
/// 所以这里备两套 <see cref="Palette"/>：深色岛体用亮色，浅色岛体整体压暗。
/// 调用方负责把 <c>IIslandTheme.IsLight</c> 传进来，并在主题变化时**重建**图标
/// （画刷是一次性的，就地改 Color 不现实，重画一枚最省事）。
/// </summary>
internal static class WeatherIcon
{
    private const double Design = 24;

    /// <summary>一枚图标的全部填充色。深色 / 浅色岛体各一套。</summary>
    private readonly struct Palette
    {
        public readonly Color Sun;         // 太阳本体与光芒
        public readonly Color CloudLight;  // 「浅云」：多云 / 雾 / 雪的云
        public readonly Color CloudDark;   // 「深云」：阴天 / 雨 / 雷的云
        public readonly Color Rain;        // 雨丝
        public readonly Color Snow;        // 雪片
        public readonly Color Bolt;        // 闪电
        public readonly Color Fog;         // 雾的横条
        public readonly Color Moon;        // 月亮本体与小星星
        public readonly Color Crater;      // 月面上的环形山

        public Palette(Color sun, Color cloudLight, Color cloudDark, Color rain,
            Color snow, Color bolt, Color fog, Color moon, Color crater)
        {
            Sun = sun;
            CloudLight = cloudLight;
            CloudDark = cloudDark;
            Rain = rain;
            Snow = snow;
            Bolt = bolt;
            Fog = fog;
            Moon = moon;
            Crater = crater;
        }
    }

    /// <summary>深色岛体：整体亮色，贴住深色胶囊底。</summary>
    private static readonly Palette DarkIsland = new(
        sun: Color.FromArgb(255, 0xFF, 0xC8, 0x3D),
        cloudLight: Color.FromArgb(255, 0xF4, 0xF5, 0xF7),
        cloudDark: Color.FromArgb(255, 0xC3, 0xCA, 0xD3),
        rain: Color.FromArgb(255, 0x5A, 0xB0, 0xF5),
        snow: Color.FromArgb(255, 0xEA, 0xF4, 0xFF),
        bolt: Color.FromArgb(255, 0xFF, 0xD2, 0x4D),
        fog: Color.FromArgb(255, 0xCB, 0xD1, 0xD8),
        moon: Color.FromArgb(255, 0xDC, 0xE6, 0xF5),
        crater: Color.FromArgb(255, 0xBD, 0xCC, 0xE2));

    /// <summary>
    /// 浅色岛体（Fluent + 浅色系统）：整体压暗成"深色图标"。
    /// 保留蓝 / 琥珀的色相（雨还是蓝的、闪电还是黄的），只把明度降下来；
    /// 太阳与闪电这类暖色也一并对齐到深色描边风格，否则浅黄压浅底会糊成一片。
    /// </summary>
    private static readonly Palette LightIsland = new(
        sun: Color.FromArgb(255, 0xE0, 0x8A, 0x00),
        cloudLight: Color.FromArgb(255, 0x93, 0xA0, 0xB0),
        cloudDark: Color.FromArgb(255, 0x5E, 0x68, 0x75),
        rain: Color.FromArgb(255, 0x2B, 0x82, 0xD4),
        snow: Color.FromArgb(255, 0x86, 0xA9, 0xD6),
        bolt: Color.FromArgb(255, 0xE3, 0xA0, 0x00),
        fog: Color.FromArgb(255, 0x7E, 0x88, 0x96),
        moon: Color.FromArgb(255, 0x93, 0xA0, 0xB0),
        crater: Color.FromArgb(255, 0x74, 0x80, 0x8F));

    /// <summary>
    /// 按 WMO 天气代码生成一个 24×24 的画布。
    /// <paramref name="isDay"/> 决定晴天画太阳还是月亮；
    /// <paramref name="lightIsland"/> 决定用哪套配色（浅色岛体必须传 true）。
    /// </summary>
    public static Canvas Create(int code, bool isDay = true, bool lightIsland = false)
    {
        var palette = lightIsland ? LightIsland : DarkIsland;
        var canvas = new Canvas { Width = Design, Height = Design };

        switch (WeatherCodes.Kind(code))
        {
            case WeatherKind.Sunny:
                if (isDay) AddSun(canvas, palette, 12, 12, 5.5, 9.0, 3.4, 2.1);
                else AddMoon(canvas, palette, 12, 12, 6.2, 1.6);
                break;

            case WeatherKind.PartlyCloudy:
                if (isDay) AddSun(canvas, palette, 8.2, 8.2, 3.6, 6.6, 2.6, 1.7);
                else AddMoon(canvas, palette, 8.8, 7.8, 4.4, 1.3);
                AddCloud(canvas, 1.2, 2.8, palette.CloudLight);
                break;

            case WeatherKind.Cloudy:
                AddCloud(canvas, 0, 0, palette.CloudLight);
                break;

            case WeatherKind.Overcast:
                AddCloud(canvas, 0, 0, palette.CloudDark);
                break;

            case WeatherKind.Fog:
                AddCloud(canvas, 0, -2.2, palette.CloudLight);
                AddRoundedRect(canvas, 6.0, 16.4, 13.0, 2.2, 1.1, palette.Fog);
                AddRoundedRect(canvas, 7.5, 20.2, 10.0, 2.2, 1.1, palette.Fog);
                break;

            case WeatherKind.Rain:
                AddCloud(canvas, 0, -1.6, palette.CloudDark);
                AddRotatedRect(canvas, 9.0, 20.4, 1.8, 4.4, 16, palette.Rain);
                AddRotatedRect(canvas, 13.2, 21.4, 1.8, 4.4, 16, palette.Rain);
                AddRotatedRect(canvas, 17.4, 20.4, 1.8, 4.4, 16, palette.Rain);
                break;

            case WeatherKind.Snow:
                AddCloud(canvas, 0, -1.6, palette.CloudLight);
                AddEllipse(canvas, 7.6, 19.0, 2.8, 2.8, palette.Snow);
                AddEllipse(canvas, 11.8, 20.2, 2.8, 2.8, palette.Snow);
                AddEllipse(canvas, 16.0, 19.0, 2.8, 2.8, palette.Snow);
                break;

            case WeatherKind.Thunder:
                AddCloud(canvas, 0, -2.4, palette.CloudDark);
                AddPolygon(canvas, palette.Bolt,
                    (13.8, 14.6), (10.0, 20.6), (12.3, 20.6), (10.6, 23.8), (14.6, 18.2), (12.2, 18.2));
                break;
        }

        return canvas;
    }

    private static void AddSun(Canvas canvas, Palette palette, double cx, double cy, double radius,
        double rayRadius, double rayLength, double rayWidth)
    {
        for (var i = 0; i < 8; i++)
        {
            var angle = i * 45d;
            var radians = angle * Math.PI / 180d;
            AddRotatedRect(canvas,
                cx + rayRadius * Math.Cos(radians),
                cy + rayRadius * Math.Sin(radians),
                rayWidth, rayLength, angle + 90, palette.Sun);
        }

        AddEllipse(canvas, cx - radius, cy - radius, radius * 2, radius * 2, palette.Sun);
    }

    /// <summary>
    /// 夜间晴 / 少云用月亮。画的是满月加两处环形山（Canvas 上没法"挖洞"，月牙得用两段
    /// 圆弧拼路径，不值得为这点装饰引入解析不确定的几何），旁边点两颗小星强调"夜里"。
    /// </summary>
    private static void AddMoon(Canvas canvas, Palette palette, double cx, double cy, double radius, double starRadius)
    {
        AddEllipse(canvas, cx - radius, cy - radius, radius * 2, radius * 2, palette.Moon);
        AddEllipse(canvas, cx - radius * 0.46, cy - radius * 0.34, radius * 0.52, radius * 0.52, palette.Crater);
        AddEllipse(canvas, cx + radius * 0.20, cy + radius * 0.12, radius * 0.36, radius * 0.36, palette.Crater);

        AddEllipse(canvas, cx + radius * 1.02, cy - radius * 1.20, starRadius, starRadius, palette.Moon);
        AddEllipse(canvas, cx + radius * 1.52, cy - radius * 0.62, starRadius * 0.7, starRadius * 0.7, palette.Moon);
    }

    private static void AddCloud(Canvas canvas, double dx, double dy, Color color)
    {
        AddEllipse(canvas, 4.5 + dx, 9.5 + dy, 8, 8, color);
        AddEllipse(canvas, 7.5 + dx, 6.5 + dy, 10.5, 10.5, color);
        AddEllipse(canvas, 12.5 + dx, 10 + dy, 8, 8, color);
        AddRoundedRect(canvas, 4.5 + dx, 13.5 + dy, 17, 6.5, 3.25, color);
    }

    private static void AddEllipse(Canvas canvas, double x, double y, double w, double h, Color color)
    {
        var ellipse = new Ellipse { Width = w, Height = h, Fill = new SolidColorBrush(color) };
        Canvas.SetLeft(ellipse, x);
        Canvas.SetTop(ellipse, y);
        canvas.Children.Add(ellipse);
    }

    private static void AddRoundedRect(Canvas canvas, double x, double y, double w, double h, double radius, Color color)
    {
        var rect = new Rectangle
        {
            Width = w,
            Height = h,
            RadiusX = radius,
            RadiusY = radius,
            Fill = new SolidColorBrush(color),
        };
        Canvas.SetLeft(rect, x);
        Canvas.SetTop(rect, y);
        canvas.Children.Add(rect);
    }

    private static void AddRotatedRect(Canvas canvas, double cx, double cy,
        double w, double h, double angle, Color color)
    {
        var rect = new Rectangle
        {
            Width = w,
            Height = h,
            Fill = new SolidColorBrush(color),
            RenderTransformOrigin = new Point(0.5, 0.5),
            RenderTransform = new RotateTransform { Angle = angle },
        };
        Canvas.SetLeft(rect, cx - w / 2);
        Canvas.SetTop(rect, cy - h / 2);
        canvas.Children.Add(rect);
    }

    private static void AddPolygon(Canvas canvas, Color color, params (double X, double Y)[] points)
    {
        var polygon = new Polygon { Fill = new SolidColorBrush(color) };
        foreach (var (x, y) in points)
        {
            polygon.Points.Add(new Point(x, y));
        }
        canvas.Children.Add(polygon);
    }
}
