/**
 * 站点文案（简体中文）。
 * 数据在 services/ 里，文案全在这里 —— 改文案不用碰组件。
 */
const zhCN: Record<string, string> = {
  /* ------------------------------------------------------------ 品牌 ---- */
  'app.name': 'WinIsland',
  'app.tagline': '给 Windows 的灵动岛',
  'app.summary': '一个常驻桌面的悬浮胶囊：平时安静地待在角落，展开就是媒体控制台、充电与硬件看板。',

  /* ------------------------------------------------------------ 导航 ---- */
  'nav.home': '首页',
  'nav.features': '功能',
  'nav.island': '灵动岛',
  'nav.plugins': '插件开发',
  'nav.market': '插件市场',
  'nav.download': '下载',
  'nav.about': '关于',

  /* ----------------------------------------------------------- 通用 ---- */
  'common.learnMore': '了解更多',
  'common.viewAll': '查看全部',
  'common.copy': '复制',
  'common.copied': '已复制',
  'common.new': '新',
  'common.builtin': '内置',
  'common.community': '社区',
  'common.beta': '预览',
  'common.and': '与',
  'common.or': '或',
  'common.recommended': '推荐',

  /* ---------------------------------------------------------- 首屏 ---- */
  'home.hero.badge': '插件 API v2 · Windows 10 1809+ · 免管理员',
  'home.hero.title1': '一枚安静的小胶囊',
  'home.hero.title2': '展开就是一座岛',
  'home.hero.lead':
    'WinIsland 用 WinUI 3 与 Windows App SDK 2.3 重写了 Windows 上的「灵动岛」。所有内容都由可热插拔的插件提供，配有社区插件市场。',
  'home.hero.ctaPrimary': '免费下载',
  'home.hero.ctaSecondary': '自己动手玩一下',
  'home.hero.meta1': '自包含安装包',
  'home.hero.meta2': 'x64 / ARM64',
  'home.hero.meta3': '无需管理员权限',
  'home.stats.plugins': '内置插件',
  'home.stats.samples': '样例工程',
  'home.stats.sdk': '插件 API 版本',
  'home.stats.arch': '支持架构',

  'home.playground.title': '先在这页上摸一摸它',
  'home.playground.lead':
    '下面这座岛不是截图，是用 Web 复刻的可交互实体。把鼠标移上去、点一下、或者从桌面拖个文件进来 —— 行为和真的 WinIsland 一样。',
  'home.playground.tip': '提示：往岛里拖一个文件或一段选中的文字，试试「文件投放」。',

  /* ---------------------------------------------------------- 特性 ---- */
  'home.features.title': '它能做什么',
  'home.features.lead': '从岛体形态到插件生态，每一处都按 Windows 的原生规范来做。',

  'feat.forms.name': '两种形态',
  'feat.forms.desc':
    '紧凑胶囊不超过 200 逻辑像素；鼠标移上去展开成主岛 + 3 张队列卡片，带形变动画。',
  'feat.drop.name': '文件投放',
  'feat.drop.desc':
    '把文件、文本、图片拖到岛上：岛展开成一排投放卡片，松手即执行，动作可由插件注册。',
  'feat.style.name': '两种外观',
  'feat.style.desc': 'Apple 纯黑胶囊，或带 Desktop Acrylic / Mica 系统材质的 Windows Fluent。',
  'feat.place.name': '两种摆放',
  'feat.place.desc': '贴屏幕顶部悬浮，或真·嵌进任务栏条带，自动避让图标并跟随自动隐藏。',
  'feat.plugin.name': '插件系统 v2',
  'feat.plugin.desc': '依赖隔离、热插拔、超时与异常防护、注册项全部可回收。',
  'feat.spotlight.name': '超级展开',
  'feat.spotlight.desc':
    '信息比大岛装得下更多时，点一下让聚光卡从岛体位置带倾角飞入，居中展示大内容。',
  'feat.market.name': '插件市场',
  'feat.market.desc': '整表一次请求、多镜像回退、安装前强制校验 SHA-256。',
  'feat.update.name': '更新提醒',
  'feat.update.desc': '先问 GitCode 国内镜像、失败回退 GitHub，只提醒不擅自安装。',
  'feat.ai.name': 'AI 友好',
  'feat.ai.desc':
    '配套 winland-plugin-maker 技能：用中文说一句需求，AI 就从零写插件、装进你在用的 WinIsland 实测。',
  'feat.clean.name': '干净',
  'feat.clean.desc':
    '无边框、真透明、形状级点击穿透，每用户安装到 %LocalAppData%，全程不要管理员权限。',
  'feat.multidisplay.name': '多屏锚定',
  'feat.multidisplay.desc':
    '可以指定岛在哪块显示器；auto 模式跟随鼠标所在屏，热插拔后自动重新定位。',
  'feat.tray.name': '托盘常驻',
  'feat.tray.desc': '双击托盘图标打开设置，右键显示/隐藏、检查更新、退出。',
  'feat.onboarding.name': '首次引导',
  'feat.onboarding.desc': '第一次启动带你走一遍位置、外观与自启动设置，配实时预览。',

  /* ------------------------------------------------------ 岛体演示 ---- */
  'island.demo.stageTitle': '交互演示',
  'island.demo.hoverTip': '把鼠标移到岛上',
  'island.demo.media.compact': '正在播放 · 晴天',
  'island.demo.media.title': '晴天',
  'island.demo.media.subtitle': '周杰伦 · 叶惠美',
  'island.demo.media.source': 'Windows 媒体会话',
  'island.demo.media.play': '播放',
  'island.demo.media.pause': '暂停',
  'island.demo.media.prev': '上一首',
  'island.demo.media.next': '下一首',
  'island.demo.battery.compact': '78% · 正在充电',
  'island.demo.battery.title': '充电监控',
  'island.demo.battery.subtitle': '电池报告 · 实时功率',
  'island.demo.battery.charging': '正在充电',
  'island.demo.battery.discharging': '使用电池中',
  'island.demo.battery.capacity': '设计容量 62.4 Wh',
  'island.demo.battery.cycles': '循环 137 次',
  'island.demo.monitor.compact': 'CPU 34% · ↓ 12.4 MB/s',
  'island.demo.monitor.title': '硬件监控',
  'island.demo.monitor.subtitle': '前台窗口 FPS · CPU / GPU',
  'island.demo.monitor.fps': 'FPS',
  'island.demo.weather.compact': '24° · 多云',
  'island.demo.weather.title': '天气小岛',
  'island.demo.weather.subtitle': 'Open-Meteo · 免密钥',
  'island.demo.weather.place': '中国 · 杭州',
  'island.demo.weather.range': '体感 26° · 湿度 62%',
  'island.demo.weather.today': '今天',
  'island.demo.weather.tomorrow': '明天',
  'island.demo.weather.day3': '后天',
  'island.demo.messaging.compact': '发送消息',
  'island.demo.messaging.title': '发送消息',
  'island.demo.messaging.subtitle': '把一条消息推上岛',
  'island.demo.monthLabel': '月份',

  'island.action.msgMedia': '播放提示',
  'island.action.msgBattery': '充电提示',
  'island.action.msgNeutral': '中性消息',
  'island.action.superExpand': '超级展开',
  'island.msg.mediaTitle': '正在播放',
  'island.msg.mediaText': '晴天 — 周杰伦',
  'island.msg.batteryTitle': '已接通电源',
  'island.msg.neutralTitle': '已完成「复制路径」',
  'island.msg.neutralText': '3 个路径已写入剪贴板',
  'island.queue.flip': '翻到下一条活动',

  'island.console.messages': '临时消息',
  'island.console.drag': '文件投放',
  'island.console.dragHint': '把文件 / 选中的文字 / 图片直接拖进岛上试试',
  'island.console.switches': '设置键',

  'island.drop.nFiles': '{n} 个文件',
  'island.drop.fileDetail': '文件 · 松手执行',
  'island.drop.filesDetail': '多个文件 · 松手执行',
  'island.drop.imageDetail': '图片 · 松手执行',
  'island.drop.link': '网址链接',
  'island.drop.text': '选中的文本',
  'island.drop.textDetail': '文本 · {n} 行 · {chars} 字符',
  'island.drop.noneCanTake': '没有卡片能接收它',
  'island.drop.addToPlaylist': '加入播放列表',
  'island.drop.addToPlaylistHint': '加进当前列表',
  'island.drop.addToPlaylistResult': '已加入 {n} 首',
  'island.drop.saveWallpaper': '设为壁纸',
  'island.drop.saveWallpaperHint': '存为当前桌面壁纸',
  'island.drop.saveWallpaperResult': '已设为壁纸',
  'island.drop.remember': '记入历史',
  'island.drop.rememberHint': '存档，之后可以翻回来',
  'island.drop.rememberResult': '已记入历史',
  'island.drop.open': '打开',
  'island.drop.openHint': '用默认应用打开',
  'island.drop.openResult': '已打开「{name}」',
  'island.drop.reveal': '所在位置',
  'island.drop.revealHint': '在资源管理器中选中',
  'island.drop.revealResult': '已在资源管理器中定位',
  'island.drop.copyPath': '复制路径',
  'island.drop.copyPathHint': '路径写入剪贴板',
  'island.drop.copyPathResult': '已复制 {n} 个路径',
  'island.drop.copyText': '复制文本',
  'island.drop.copyTextHint': '文本写入剪贴板',
  'island.drop.copyTextResult': '已复制到剪贴板',
  'island.drop.saveImage': '保存图片',
  'island.drop.saveImageHint': '弹出「另存为」让你挑位置',
  'island.drop.saveImageResult': '已保存图片',

  'island.spotlight.title': '超级展开',
  'island.spotlight.subtitle': '聚光卡 · 独立的全屏覆盖窗',
  'island.spotlight.close': '收起（Esc）',
  'island.spotlight.used': '磁盘已用',
  'island.spotlight.read': '顺序读',
  'island.spotlight.write': '顺序写',
  'island.spotlight.temp': '温度',
  'island.spotlight.health': '健康度',
  'island.spotlight.hint': '点卡片外区域或按 Esc 收起 —— 反向飞回岛体位置',

  /* ----------------------------------------------------------- 岛页 ---- */
  'islandPage.title': '灵动岛',
  'islandPage.lead': '岛体的每一处行为、每一种外观，都是可配置的。下面这些开关就是「设置 → 通用」里的同一批。',
  'islandPage.customize': '现场调一调',
  'islandPage.style': '外观风格',
  'islandPage.styleApple': 'Apple 灵动岛',
  'islandPage.styleAppleDesc': '不透明纯黑胶囊、大圆角，最接近 iPhone 上的样子。',
  'islandPage.styleFluent': 'Windows Fluent',
  'islandPage.styleFluentDesc': '元素级系统材质 + 1px 描边 + 小圆角，配色跟随系统明暗。',
  'islandPage.material': '系统材质',
  'islandPage.materialAcrylic': 'Desktop Acrylic',
  'islandPage.materialAcrylicDesc': '实时模糊背后桌面与窗口的磨砂玻璃。',
  'islandPage.materialMica': 'Mica',
  'islandPage.materialMicaDesc': '采样壁纸色调的偏不透明材质，Windows 11 起支持。',
  'islandPage.materialSolid': '纯色回退',
  'islandPage.materialSolidDesc': '材质不可用时宿主自动退回的纯色底衬。',
  'islandPage.position': '摆放位置',
  'islandPage.positionTop': '屏幕顶部',
  'islandPage.positionTopDesc': '贴工作区顶部悬浮，队列向下生长。',
  'islandPage.positionBottom': '屏幕底部（嵌入任务栏）',
  'islandPage.positionBottomDesc': '真的嵌进任务栏条带，队列向上生长。',
  'islandPage.horizontal': '水平对齐',
  'islandPage.hLeft': '靠左',
  'islandPage.hCenter': '居中',
  'islandPage.hRight': '靠右',
  'islandPage.theme': '系统主题',
  'islandPage.themeLight': '浅色',
  'islandPage.themeDark': '深色',

  'islandPage.behavior.title': '行为开关',
  'islandPage.behavior.hover': '悬停展开',
  'islandPage.behavior.hoverDesc': '鼠标移到岛上就展开；关掉之后只能点击展开。',
  'islandPage.behavior.hoverDelay': '展开延迟',
  'islandPage.behavior.hoverDelayDesc': '从指针进入岛体到开始展开的等待时间，防止"路过"就弹开。',
  'islandPage.behavior.bounce': '回弹动画',
  'islandPage.behavior.bounceDesc': '展开/收起时带一点弹性过冲，机器慢的时候可以关掉。',
  'islandPage.behavior.hideIdle': '空闲时隐藏',
  'islandPage.behavior.hideIdleDesc': '没有任何插件在报事时自动收起，有内容再出现。',
  'islandPage.behavior.drop': '允许文件投放',
  'islandPage.behavior.dropDesc': '关掉后拖文件到岛上不会打开投放面板。',
  'islandPage.behavior.queueTail': '队列翻页位',
  'islandPage.behavior.queueTailDesc': '报事插件多于三张时，末尾出现圆形按钮逐张翻看。',
  'islandPage.geometry.title': '几何与偏移',
  'islandPage.geometry.offset': '垂直偏移',
  'islandPage.geometry.offsetDesc': '岛体离屏幕边缘的距离（DIP），上下摆放各存一份。',
  'islandPage.geometry.hOffset': '水平偏移',
  'islandPage.geometry.hOffsetDesc': '在左对齐 / 右对齐模式下离边缘的距离。',
  'islandPage.geometry.display': '目标显示器',
  'islandPage.geometry.displayDesc': 'auto = 跟随鼠标所在屏；也可以钉死在某一台显示器上。',
  'islandPage.geometry.displayAuto': '自动（跟随鼠标）',
  'islandPage.geometry.display1': '显示器 1 · 2560×1440',
  'islandPage.geometry.display2': '显示器 2 · 1920×1080',
  'islandPage.startup.title': '启动',
  'islandPage.startup.autostart': '开机自启动',
  'islandPage.startup.autostartOff': '关闭自启动',
  'islandPage.startup.autostartUser': '普通权限自启动',
  'islandPage.startup.autostartAdmin': '管理员权限自启动',
  'islandPage.startup.autostartAdminDesc': '登录后以管理员身份静默启动（需一次 UAC 授权）。想要 FPS 显示就选它。',

  'islandPage.how.title': '状态机是怎么走的',
  'islandPage.how.lead':
    '宿主 IslandWindow 用一个状态机统一管这几件事 —— 面板尺寸是启动时就预留好的常量，所以拖拽全程不改窗口几何，动画也不会有重影。',
  'islandPage.state.idle': '空闲',
  'islandPage.state.idleDesc': '只有一个呼吸的小点，宽度收在 200 以内。',
  'islandPage.state.expanded': '展开',
  'islandPage.state.expandedDesc': '主岛 + 3 张队列卡片，尺寸取所有活动里的最大值。',
  'islandPage.state.message': '临时消息',
  'islandPage.state.messageDesc': '宽度跟随内容（152–340），有正文时是 46 高的小卡。',
  'islandPage.state.drop': '文件投放',
  'islandPage.state.dropDesc': '与临时消息同级的内容状态，卡片长在岛体内部。',

  /* ------------------------------------------------------ 功能总览 ---- */
  'featuresPage.title': '全部功能',
  'featuresPage.lead': 'WinIsland 的每一项能力，按主题分好类。点标签筛选。',
  'featuresPage.filterAll': '全部',
  'featuresPage.count': '共 {n} 项',

  'featuresPage.cat.core': '岛体',
  'featuresPage.cat.appearance': '外观',
  'featuresPage.cat.plugin': '插件',
  'featuresPage.cat.system': '系统集成',
  'featuresPage.cat.platform': '平台',

  'featuresPage.core.forms': '紧凑 / 展开两种形态',
  'featuresPage.core.formsDesc':
    '紧凑态宽度随内容在 126–200 之间自适应；展开态取所有活动的最大展开宽度，队列卡片取所有队列活动的最大高度，一列对齐。',
  'featuresPage.core.queue': '队列与翻页',
  'featuresPage.core.queueDesc':
    '展开后是主岛 + 3 张队列卡。前两张按 priority 固定，最后一张是「翻页位」——队列还有别的活动时末尾出现圆形切换按钮，循环翻看，排在后面的活动也一定看得到。',
  'featuresPage.core.priority': '优先级仲裁',
  'featuresPage.core.priorityDesc':
    '多个插件同时报事时，Priority 数值大者占据主岛。宿主可以在「插件管理」里用 plugin.<id>.priority 覆盖插件声明的值。',
  'featuresPage.core.morph': '单视图形变',
  'featuresPage.core.morphDesc':
    '插件实现 IMorphView 后，一个可视树同时承载紧凑与展开两种形态，宿主逐帧推进进度，所以"展开到一半又收起"能从当前位置接着走。',
  'featuresPage.core.tap': '主操作',
  'featuresPage.core.tapDesc':
    '点击胶囊执行当前内容的主操作。点插件自己的按钮不会触发 OnTap —— 宿主顺着可视树上溯识别交互控件，只有点内容空白处才算点了岛体。',
  'featuresPage.core.passthrough': '形状级点击穿透',
  'featuresPage.core.passthroughDesc':
    '用 SetWindowRgn 把透明画布裁成岛屿的真实形状（带圆角），形状之外的像素不属于这个窗口，点击直接落到下面 —— 包括其它进程的窗口。',
  'featuresPage.core.topmost': '置顶自愈',
  'featuresPage.core.topmostDesc':
    '任务栏、开始菜单、搜索面板会随时把自己抬到最上层，所以岛体会重新断言置顶。独占全屏游戏、UAC 安全桌面与锁屏在 topmost 波段之外，不会被盖。',
  'featuresPage.core.geometry': '几何不变式',
  'featuresPage.core.geometryDesc':
    '绝不在展开动画里改窗口大小 —— 改客户区宽度会让 DWM 把上一帧按旧坐标合成进新窗口矩形，出现一帧重影。画布是预留的，展开只动 XAML 内的岛体尺寸。',

  'featuresPage.appearance.style': 'Apple / Fluent 双外观',
  'featuresPage.appearance.styleDesc':
    'Apple 不透明纯黑胶囊 + 大圆角；Fluent 元素级系统材质 + 1px 描边 + 小圆角。圆角策略是唯一的，同时决定点击穿透的窗口形状。',
  'featuresPage.appearance.material': 'Desktop Acrylic / Mica',
  'featuresPage.appearance.materialDesc':
    'Fluent 下可选实时磨砂玻璃或壁纸着色材质。浅色主题不压纱（让材质原样透出来），深色主题压一层黑纱保证白字对比度。',
  'featuresPage.appearance.theme': '明暗跟随系统',
  'featuresPage.appearance.themeDesc':
    '岛的 Fluent 外观跟随「设置 → 个性化 → 颜色 → 默认应用模式」，进程存活期间切换也当场生效。Apple 恒为深色。',
  'featuresPage.appearance.themeApi': '插件主题适配',
  'featuresPage.appearance.themeApiDesc':
    '插件通过 IIslandTheme 读岛体明暗并订阅 Changed，中性色用共享画刷，一处改动全树跟着变。',
  'featuresPage.appearance.opacity': '真透明与无边框',
  'featuresPage.appearance.opacityDesc': 'DWM 扩展边框 + Composition 全透明背衬，没有系统标题栏也没有白色底块。',

  'featuresPage.plugin.sdk': '插件 SDK 2.0',
  'featuresPage.plugin.sdkDesc':
    'WinIsland.Core 是只读契约：只有接口、数据与特性，没有实现。插件通过 IPluginContext 拿到日志、作用域设置、岛面 API 与主题。',
  'featuresPage.plugin.isolation': '依赖隔离',
  'featuresPage.plugin.isolationDesc':
    '每个插件跑在可回收的 AssemblyContext 里，配 AssemblyDependencyResolver + 自己的 deps.json。WinIsland.Core、System.*/Windows.* 与宿主已有的程序集统一绑定到宿主，防止类型身份分裂。',
  'featuresPage.plugin.hotplug': '热插拔',
  'featuresPage.plugin.hotplugDesc':
    '禁用 → 卸载程序集（用 WeakReference 验证真的被回收）→ 重新启用。更新或删除时先把旧目录改名移走，绝不删除正在加载的文件。',
  'featuresPage.plugin.scope': '注册即回收',
  'featuresPage.plugin.scopeDesc':
    '设置页、常驻内容、临时消息、定时器、设置订阅都记在 PluginScope 里，停用时统一撤销 —— 插件自己清理得不干净，宿主兜底。',
  'featuresPage.plugin.guard': '防护与超时',
  'featuresPage.plugin.guardDesc':
    '初始化 10 秒超时；单会话 5 次未处理异常自动停用；所有从宿主进入插件的回调都包在守卫里，一个插件抛异常不会让整个应用变成 WinUI 的 stowed exception 崩溃。',
  'featuresPage.plugin.packaging': '.lwp 插件包',
  'featuresPage.plugin.packagingDesc':
    '构建输出 + plugin.json 打成 zip 就是 .lwp。拖进 plugins/ 自动安装，或在「插件管理 → 安装插件包…」里选。更新是同 Id 覆盖语义，先停用再替换。',
  'featuresPage.plugin.native': '自带依赖',
  'featuresPage.plugin.nativeDesc':
    '插件可以带任意 NuGet 依赖与本机 DLL；WinAppSDK 运行时由宿主提供，不必随插件分发那 40MB。',

  'featuresPage.system.drop': '文件投放',
  'featuresPage.system.dropDesc':
    '文件 / 文件夹、文本、图片拖到岛上 → 岛展开成一排投放卡片。悬停放大高亮、指针压到两端自动横向滚动、系统拖拽气泡显示「投放到 XXX」，摘要按载荷换样子。',
  'featuresPage.system.dropKind': '载荷判定退化链',
  'featuresPage.system.dropKindDesc':
    '真文件 → 图片 → 文本。浏览器拖网页图片给的是没有路径的虚拟文件，宿主会读内容并按扩展名识别（SVG 也支持）；同时有位图和文本时不会盲目当图片 —— 浏览器里拖选中的文字常附带一张选区快照位图。',
  'featuresPage.system.dropBuiltin': '宿主内置五个动作',
  'featuresPage.system.dropBuiltinDesc':
    '打开、所在位置、复制路径、复制文本、保存图片。插件动作用 Order 0 默认排在它们（900+）前面。',
  'featuresPage.system.dropSafety': '落空的边界',
  'featuresPage.system.dropSafetyDesc':
    '不匹配的卡片根本不出现（不是变暗）；松手落空 = 什么都不做，绝不误触发；图片有 32 MB 上限；每次读取都有超时，源进程不回应也不会冻住界面。',
  'featuresPage.system.message': '临时消息',
  'featuresPage.system.messageDesc':
    'IslandMessage 是岛体内部的一条反馈条：图标芯片 + 标题 + 正文，宽度跟随内容（152–340）。不给 AccentColor 时用与空闲点同色的中性芯片，而不是平白冒出一个蓝点。',
  'featuresPage.system.spotlight': '超级展开（聚光卡）',
  'featuresPage.system.spotlightDesc':
    'IslandSpotlight 在一扇独立的全屏覆盖窗里从岛体位置带倾角飞入、居中放大。全屏点击都被覆盖窗接管 —— 这正是「点卡片外收起」的实现方式，按 Esc 也能反向飞回。',
  'featuresPage.system.spotlightLife': '聚光卡的生命周期',
  'featuresPage.system.spotlightLifeDesc':
    '同一时刻只有一张：别的插件再次请求时替换，旧 owner 先收到 OnClosed；插件停用或卸载时宿主自动收起，不留幽灵窗口。内容必须是独立于岛视图的可视树（每个窗口一棵树）。',
  'featuresPage.system.tray': '托盘图标',
  'featuresPage.system.trayDesc':
    '原生 Shell_NotifyIcon + Win32 弹出菜单：双击打开设置，右键显示/隐藏灵动岛、检查更新、退出。',
  'featuresPage.system.trayTip': '插件报事时的托盘提示',
  'featuresPage.system.trayTipDesc': '有插件在报事而岛被隐藏时，托盘那边也能看到状态。',
  'featuresPage.system.multidisplay': '多屏与热插拔',
  'featuresPage.system.multidisplayDesc':
    'DisplayResolver 是唯一的「岛该在哪块屏」解析层：island.display 取 auto（跟随鼠标所在屏）或指定的某一台。订阅 DisplayInformation.DisplayContentsInvalidated，多屏热插拔时重新定位。',
  'featuresPage.system.taskbar': '任务栏停靠',
  'featuresPage.system.taskbarDesc':
    '用 UI Automation 探测任务栏的「已占用段落」，把岛放进真正空闲的那一段 —— 不再假设左边一定是空的。同时匹配主任务栏与副屏任务栏，跟随自动隐藏。',
  'featuresPage.system.update': '更新检查',
  'featuresPage.system.updateDesc':
    '先问 GitCode 国内镜像、失败回退 GitHub。只在设置页和岛上提醒，下载与安装由你自己完成 —— 程序不会静默替换自己。不想再看到的那一版可以「跳过此版本」。',
  'featuresPage.system.settings': '设置存储',
  'featuresPage.system.settingsDesc':
    'JSON 键值对存在 %LocalAppData%\\WinIsland\\settings.json。插件设置自动加 <插件 id>. 前缀，插件改不到宿主的设置。',
  'featuresPage.system.logging': '日志',
  'featuresPage.system.loggingDesc':
    'plugin.host.log 是宿主日志，每个插件另有 plugin.<id>.log（内存环形缓冲 + 文件）。界面里「查看日志」能看到最近 500 行。',
  'featuresPage.system.crash': '全局崩溃日志',
  'featuresPage.system.crashDesc': '未处理异常统一落盘并给出可复制的诊断信息，方便带着日志提 issue。',

  'featuresPage.platform.req': '系统要求',
  'featuresPage.platform.reqDesc':
    'Windows 10 1809（build 17763）或更高，x64 / ARM64。安装包自包含 .NET 10 运行时与 Windows App SDK，不用另外装。',
  'featuresPage.platform.install': '每用户安装',
  'featuresPage.platform.installDesc':
    '装到 %LocalAppData%\\Programs\\WinIsland，全程不需要管理员权限。卸载走标准卸载项。',
  'featuresPage.platform.stack': '技术栈',
  'featuresPage.platform.stackDesc':
    'WinUI 3 · .NET 10 · Windows App SDK 2.3.1 · 非打包 WinExe（无 MSIX、无商店打包）。',
  'featuresPage.platform.arch': '单实例闸门',
  'featuresPage.platform.archDesc':
    '本地命名互斥体 + 重复启动通知事件：重复双击会把自己亮出来，而不是再开一个岛。',

  /* ---------------------------------------------------------- 插件页 ---- */
  'pluginsPage.title': '插件开发',
  'pluginsPage.lead':
    '宿主只管「岛体」—— 尺寸、圆角、悬停展开、队列排版、点击穿透形状；插件只提供内容。两条路都能走：让 AI 帮你做，或者自己动手。',
  'pluginsPage.routeA': '路线 A · 让 AI 帮你做',
  'pluginsPage.routeANote': '不会编程也能用',
  'pluginsPage.routeADesc':
    '把 WinLandPluginSkills 装进你的 AI 助手，然后用中文说一句需求。它会带你从零做到上架插件市场。',
  'pluginsPage.routeA.step1': '安装技能',
  'pluginsPage.routeA.step1Desc':
    '把下面这段原样发给你的 AI 助手（Claude Code / Command Code / 任何支持 skills 的智能体）。',
  'pluginsPage.routeA.step2': '直接说需求',
  'pluginsPage.routeA.step2Desc': '不用提「技能」两个字，AI 会自己认出来。',
  'pluginsPage.routeA.pipeline': '陪跑流程',
  'pluginsPage.routeA.pipelineDesc':
    '想点子 → 环境体检 → 从模板建工程 → 写代码（SDK 2.0）→ 装进你正在用的 WinIsland、你亲手实测 → 打包 .lwp → 先问你同不同意 → 上传 GitHub / 投稿市场。',
  'pluginsPage.routeA.rule1': '必须装进你实际在用的那个 WinIsland，由你亲口确认效果才算测试通过。',
  'pluginsPage.routeA.rule2': '任何「发到网上」的动作（建仓库 / push / 开 PR）都必须先问你同意。',

  'pluginsPage.routeB': '路线 B · 自己动手',
  'pluginsPage.routeBDesc': '一个能跑的最小插件就这么多：继承 IslandPluginBase，重写两个方法。',
  'pluginsPage.minimal': '最小插件',
  'pluginsPage.package': '打包与安装',
  'pluginsPage.packageDesc': '把构建输出 + plugin.json 打成 .lwp（zip），拖进 plugins/ 目录或者从插件管理页安装。',
  'pluginsPage.manifest': 'plugin.json 清单',
  'pluginsPage.manifestDesc': '清单是唯一的元数据来源，字段级校验失败时插件会以「错误」状态出现在插件管理里，并写明具体字段和原因。',
  'pluginsPage.field': '字段',
  'pluginsPage.fieldReq': '必填',
  'pluginsPage.fieldRule': '规则',
  'pluginsPage.lifecycle': '生命周期与状态',
  'pluginsPage.lifecycleDesc': 'InitializeAsync 在启用循环中可能被多次调用（禁用→启用、重新加载），必须可重复执行。',
  'pluginsPage.apiTable': 'API 速查',
  'pluginsPage.apiTableDesc': '插件通过 IPluginContext 与宿主交互 —— 这是你能碰到的全部东西。',
  'pluginsPage.api.member': '成员',
  'pluginsPage.api.desc': '说明',
  'pluginsPage.threading': '线程模型',
  'pluginsPage.threadingDesc':
    'InitializeAsync / ShutdownAsync / 设置页工厂 / OnSettingsChanged / CreateTimer 回调都在 UI 线程执行。采样、网络、文件放后台线程，再用 Context.RunOnUI(...) 更新 UI。',
  'pluginsPage.pitfall': '最容易踩的坑',
  'pluginsPage.pitfall.morph': '形态动画必须逐帧直接赋值，不能用 Storyboard',
  'pluginsPage.pitfall.morphDesc':
    '属性路径动画在动态加载的插件程序集里解析不出类型信息，会在动画 tick 上抛 COMException，而且是调用点 try/catch 拦不住的那种 —— 表现是「大岛变小之后卡死」。宿主内置视图能用 Storyboard 是因为它们在宿主程序集里。',
  'pluginsPage.pitfall.sdk': '构建用的 SDK 不能比宿主新',
  'pluginsPage.pitfall.sdkDesc':
    '.NET 不允许向下绑定强命名程序集，插件用比宿主新的 SDK 构建就会加载失败。在插件仓库根目录放一个 global.json 把 SDK 钉在 .NET 10。',
  'pluginsPage.pitfall.spotlight': '聚光卡内容必须是另一棵可视树',
  'pluginsPage.pitfall.spotlightDesc':
    '每个窗口一棵树，同一个 UIElement 不能同时挂在两个窗口里。复用岛视图里那个元素会打不开或一片空白。',
  'pluginsPage.pitfall.background': '视图根元素保持透明背景',
  'pluginsPage.pitfall.backgroundDesc':
    '岛体材质由宿主绘制。插件自绘不透明底色会在切换 Apple / Fluent 时露出与材质不一致的色块。卡片、徽标用半透明白（如 #33FFFFFF）即可适配两种材质。',

  'pluginsPage.samples': '样例工程',
  'pluginsPage.samplesDesc': '仓库里这几个工程同时也是最好的示例代码。',
  'pluginsPage.sample.hello': '代码构建 UI、私有依赖、设置页、定时器、完整清理',
  'pluginsPage.sample.xaml': 'XAML 视图 + PluginXaml.Load + 逐帧形变动画',
  'pluginsPage.sample.hardware': '真实功能插件：CPU / GPU / 网络 / 帧率，自带 NuGet 依赖',
  'pluginsPage.sample.weather': '网络数据 + 定时刷新 + 主题适配 + 聚光卡',
  'pluginsPage.sample.device': '设备热插拔监听、多条目列表与逐条操作',
  'pluginsPage.coreApi': 'SDK 完整源码',
  'pluginsPage.coreApiDesc': '只读契约，30 分钟能读完。',

  /* ---------------------------------------------------------- 市场页 ---- */
  'marketPage.title': '插件市场',
  'marketPage.lead':
    '「设置 → 插件市场」读取社区仓库的 index.json。整个列表只发一次请求 —— 图标以 base64 内嵌在清单里，不做逐插件请求。',
  'marketPage.builtin': '内置插件',
  'marketPage.community': '社区插件',
  'marketPage.col.plugin': '插件',
  'marketPage.col.compact': '小岛显示',
  'marketPage.col.expanded': '展开后',
  'marketPage.col.note': '说明',
  'marketPage.install': '安装',
  'marketPage.detail': '详情',
  'marketPage.detailTip':
    '详情页能看到版本 / 作者 / 体积 / 许可证 / SHA-256 与插件自带的说明。README 只在打开详情时才取。',
  'marketPage.mirror': '多镜像回退',
  'marketPage.mirrorDesc':
    'GitHub raw → GitCode 国内镜像 → jsDelivr。GitHub 是唯一源头，其余都只是镜像；客户端按顺序尝试并记住上次成功的源。也可以用 marketplace.baseUrl 指向自建源。',
  'marketPage.sha': 'SHA-256 强制校验',
  'marketPage.shaDesc': '只有点「安装」才下载 .lwp，下载完强制校验哈希，不匹配就拒绝安装。',
  'marketPage.submit': '投稿',
  'marketPage.submitDesc':
    '把 plugin.json + <id>.lwp + logo.png（可选）+ README.md（可选）放进 plugins/<id>/ 提 PR，合并后 Action 自动重建清单。',

  'market.media.name': '正在播放',
  'market.media.compact': '封面 + 曲名 + 跳动音条',
  'market.media.expanded': '封面、曲名 / 歌手、进度条与上一首 / 播放暂停 / 下一首',
  'market.media.note': '基于 Windows 系统媒体会话（GSMTC），任何播放器都能接管',
  'market.battery.name': '充电监控',
  'market.battery.compact': '电量环 + 百分比 + 充放电状态',
  'market.battery.expanded': '实时充电功率曲线、电池状态',
  'market.battery.note': '用 Windows.Devices.Power 读电池报告，插拔时自动弹提示',
  'market.messaging.name': '发送消息',
  'market.messaging.compact': '—（没有常驻内容）',
  'market.messaging.expanded': '手动推一条消息 / 自定义 XAML 控件到岛上',
  'market.messaging.note': '用来验证、演示和对接自己的脚本与自动化',
  'market.weather.name': '天气小岛',
  'market.weather.compact': '天气图标 + 温度',
  'market.weather.expanded': '今天 / 明天 / 后天三天预报',
  'market.weather.note': '数据来自 Open-Meteo，不用注册也不用填密钥',
  'market.hardware.name': '硬件监控',
  'market.hardware.compact': 'CPU 占用 + 上下行网速',
  'market.hardware.expanded': '前台窗口 FPS、CPU / GPU 占用与型号、网络吞吐',
  'market.hardware.note': '想要 FPS 时需要以管理员身份运行 WinIsland',

  'marketPage.risk': '插件与你自己的程序同样权限运行（不是沙箱）',
  'marketPage.riskDesc':
    '装插件前请看清来源。宿主会在插件出错时保护自身不崩，但这不等于安全隔离。市场里下载的包在安装前会校验 SHA-256。',

  /* ---------------------------------------------------------- 下载页 ---- */
  'downloadPage.title': '下载',
  'downloadPage.lead': '安装包是自包含的：.NET 运行时与 Windows App SDK 都在包里，不用另外装。',
  'downloadPage.primary': '官方源',
  'downloadPage.mirror': '国内镜像',
  'downloadPage.mirrorDesc': 'GitCode · 国内网络更快，内容与官方源一致',
  'downloadPage.ghDesc': 'GitHub · 唯一源头，Release 在这里发布',
  'downloadPage.andMirror': '与',
  'downloadPage.arch': '选择架构',
  'downloadPage.archX64': 'x64',
  'downloadPage.archX64Desc': '绝大多数 Intel / AMD 电脑',
  'downloadPage.archArm64': 'ARM64',
  'downloadPage.archArm64Desc': '骁龙 X 系列等 Windows on ARM 设备',
  'downloadPage.getSetup': '下载安装包',
  'downloadPage.allReleases': '所有版本',
  'downloadPage.requirements': '系统要求',
  'downloadPage.reqOs': 'Windows 10 1809（build 17763）或更高',
  'downloadPage.reqArch': 'x64 或 ARM64 处理器',
  'downloadPage.reqAdmin': '不需要管理员权限（每用户安装）',
  'downloadPage.reqRuntime': '不需要预装 .NET 或 Windows App SDK',
  'downloadPage.afterInstall': '装好之后',
  'downloadPage.after1': '胶囊出现在屏幕顶部中央，或嵌进任务栏（由「设置 → 通用 → 位置」决定）',
  'downloadPage.after2': '双击托盘图标打开设置，右键托盘图标可以显示/隐藏、检查更新、退出',
  'downloadPage.after3': '默认「空闲时隐藏」：没有任何插件在报事时自动收起，有内容再出现',
  'downloadPage.after4': '第一次启动会有引导，带你走一遍位置、外观与自启动',
  'downloadPage.buildFromSource': '从源码构建',
  'downloadPage.buildDesc': '需要 .NET 10 SDK；Windows App SDK 由 NuGet 还原。仓库里没有 .sln，直接构建 csproj。',
  'downloadPage.checksum': '校验完整性',
  'downloadPage.checksumDesc': 'Release 页面附有每个产物的 SHA-256，下载后可以自己核对。',

  /* ---------------------------------------------------------- 关于页 ---- */
  'aboutPage.title': '关于',
  'aboutPage.lead': 'WinIsland 是一个开源项目，MIT 许可。',
  'aboutPage.author': '作者',
  'aboutPage.authorDesc': 'luolangaga · 用 WinUI 3 从零写一个给 Windows 的灵动岛',
  'aboutPage.repo': '源码仓库',
  'aboutPage.repoDesc': '遇到问题、有想法，都欢迎提 issue',
  'aboutPage.pluginRepo': '社区插件仓库',
  'aboutPage.pluginRepoDesc': '市场清单的来源，投稿也在这里',
  'aboutPage.skillsRepo': 'AI 技能仓库',
  'aboutPage.skillsRepoDesc': 'winland-plugin-maker —— 让 AI 从零做到上架市场',
  'aboutPage.docs': '插件开发指南',
  'aboutPage.docsDesc': 'PLUGIN.md，SDK 2.0 的完整参考',
  'aboutPage.license': '许可证',
  'aboutPage.licenseDesc': 'MIT —— 随便用、随便改，保留版权声明就行',
  'aboutPage.tech': '技术栈',
  'aboutPage.techDesc': 'WinUI 3 · .NET 10 · Windows App SDK 2.3.1 · 非打包 WinExe',
  'aboutPage.changelog': '更新日志',
  'aboutPage.changelogDesc': '每个版本改了什么，见 Release Notes',
  'aboutPage.faq': '常见问题',
  'aboutPage.faq.q1': '会挡住全屏游戏吗？',
  'aboutPage.faq.a1':
    '不会。独占全屏 / 全屏优化的游戏、UAC 安全桌面、锁屏界面都在 topmost 波段之外，灵动岛不会盖在上面。',
  'aboutPage.faq.q2': '为什么展开时队列卡片一样宽、一样高？',
  'aboutPage.faq.a2':
    '这是设计：一列对齐的卡片比参差不齐更好看。所以宿主会统一卡片尺寸 —— 宽度取所有活动的最大展开宽度、高度取所有队列活动的最大值（最后一张是翻页位，可能轮到任何一个）。插件视图请用星号/自适应布局。',
  'aboutPage.faq.q3': '插件能读到我的隐私数据吗？',
  'aboutPage.faq.a3':
    '插件与你自己的程序同样权限运行（不是沙箱），装插件前请看清来源。宿主会在插件出错时保护自身不崩，但这不等于安全隔离。市场里下载的包在安装前会校验 SHA-256。',
  'aboutPage.faq.q4': '日志在哪里？',
  'aboutPage.faq.a4':
    '%LocalAppData%\\WinIsland\\logs\\：plugin.host.log 是宿主日志，每个插件另有 plugin.<id>.log。',
  'aboutPage.faq.q5': '怎么更新到新版本？',
  'aboutPage.faq.a5':
    '「设置 → 关于」或右键托盘图标 →「检查更新…」：先查 GitCode 国内镜像，失败回退 GitHub 官方源。下载与安装由你自己点按钮完成 —— 程序不会在后台下载、也不会静默替换自己。',

  /* ---------------------------------------------------------- 页脚 ---- */
  'footer.rights': 'MIT 许可 · 开源项目',
  'footer.builtWith': '用 WinUI 3 打造，本站用同款 WinUIonWeb 组件库复刻',
  'footer.links': '链接',
  'footer.releases': '版本发布',
  'footer.issues': '问题反馈',

  /* ------------------------------------------------------- 搜索索引 ---- */
  'search.noResult': '没有匹配结果',
  'search.hint': '输入关键词搜索功能、插件与文档',
  'search.results': '搜索结果',
}

export default zhCN
