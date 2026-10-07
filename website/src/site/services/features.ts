/**
 * 功能清单 —— 数据在这里，文案走 i18n（`featuresPage.<id>` / `<id>Desc`）。
 * 每一条都对应 WinIsland 源码里真实存在的实现，不是营销词。
 */

export type FeatureCategoryId = 'all' | 'core' | 'appearance' | 'plugin' | 'system' | 'platform'

export interface FeatureCategory {
  id: FeatureCategoryId
  /** 图标字形 */
  glyph: string
  /** 文案 key */
  key: string
}

export const featureCategories: FeatureCategory[] = [
  { id: 'all', glyph: '\uE8FD', key: 'featuresPage.filterAll' },
  { id: 'core', glyph: '\uE7F4', key: 'featuresPage.cat.core' },
  { id: 'appearance', glyph: '\uE790', key: 'featuresPage.cat.appearance' },
  { id: 'plugin', glyph: '\uEA86', key: 'featuresPage.cat.plugin' },
  { id: 'system', glyph: '\uE770', key: 'featuresPage.cat.system' },
  { id: 'platform', glyph: '\uE964', key: 'featuresPage.cat.platform' },
]

export interface FeatureEntry {
  id: string
  cat: Exclude<FeatureCategoryId, 'all'>
  /** 展示用的图标 */
  glyph: string
  accent: string
  /** 对应的宿主源码路径，作为"这是真做过的"的证据 */
  source: string
}

export const features: FeatureEntry[] = [
  /* ------------------------------------------------------------ 岛体 ---- */
  { id: 'featuresPage.core.forms', cat: 'core', glyph: '\uE7C4', accent: '#0a84ff', source: 'Island/IslandWindow.xaml.cs' },
  { id: 'featuresPage.core.queue', cat: 'core', glyph: '\uE8FD', accent: '#0a84ff', source: 'Island/IslandWindow.xaml.cs' },
  { id: 'featuresPage.core.priority', cat: 'core', glyph: '\uE8CB', accent: '#0a84ff', source: 'WinIsland.Core/IslandApi.cs' },
  { id: 'featuresPage.core.morph', cat: 'core', glyph: '\uE8AB', accent: '#0a84ff', source: 'WinIsland.Core/IslandApi.cs' },
  { id: 'featuresPage.core.tap', cat: 'core', glyph: '\uE815', accent: '#0a84ff', source: 'Island/IslandWindow.xaml.cs' },
  { id: 'featuresPage.core.passthrough', cat: 'core', glyph: '\uE8D4', accent: '#0a84ff', source: 'Core/Win32.cs' },
  { id: 'featuresPage.core.topmost', cat: 'core', glyph: '\uE718', accent: '#0a84ff', source: 'Core/Win32.cs' },
  { id: 'featuresPage.core.geometry', cat: 'core', glyph: '\uE7EF', accent: '#0a84ff', source: 'Island/IslandWindow.xaml.cs' },

  /* ------------------------------------------------------------ 外观 ---- */
  { id: 'featuresPage.appearance.style', cat: 'appearance', glyph: '\uE790', accent: '#5e5ce6', source: 'Island/IslandStyle.cs' },
  { id: 'featuresPage.appearance.material', cat: 'appearance', glyph: '\uE81E', accent: '#5e5ce6', source: 'Island/IslandBackdrop.cs' },
  { id: 'featuresPage.appearance.theme', cat: 'appearance', glyph: '\uE706', accent: '#5e5ce6', source: 'Island/IslandStyle.cs' },
  { id: 'featuresPage.appearance.themeApi', cat: 'appearance', glyph: '\uE771', accent: '#5e5ce6', source: 'WinIsland.Core/IIslandTheme' },
  { id: 'featuresPage.appearance.opacity', cat: 'appearance', glyph: '\uE790', accent: '#5e5ce6', source: 'Core/TransparentBackdrop.cs' },

  /* ------------------------------------------------------------ 插件 ---- */
  { id: 'featuresPage.plugin.sdk', cat: 'plugin', glyph: '\uEA86', accent: '#32d0c8', source: 'WinIsland.Core/' },
  { id: 'featuresPage.plugin.isolation', cat: 'plugin', glyph: '\uE7B3', accent: '#32d0c8', source: 'Core/Plugins/PluginAssemblyContext.cs' },
  { id: 'featuresPage.plugin.hotplug', cat: 'plugin', glyph: '\uE895', accent: '#32d0c8', source: 'Core/Plugins/PluginHost.cs' },
  { id: 'featuresPage.plugin.scope', cat: 'plugin', glyph: '\uE74D', accent: '#32d0c8', source: 'Core/Plugins/PluginScope.cs' },
  { id: 'featuresPage.plugin.guard', cat: 'plugin', glyph: '\uE72E', accent: '#32d0c8', source: 'Core/Plugins/PluginInstance.cs' },
  { id: 'featuresPage.plugin.packaging', cat: 'plugin', glyph: '\uE7B8', accent: '#32d0c8', source: 'Core/Plugins/LwpInstaller.cs' },
  { id: 'featuresPage.plugin.native', cat: 'plugin', glyph: '\uE74C', accent: '#32d0c8', source: 'Core/Plugins/PluginAssemblyContext.cs' },

  /* -------------------------------------------------------- 系统集成 ---- */
  { id: 'featuresPage.system.drop', cat: 'system', glyph: '\uE8B7', accent: '#f0883e', source: 'Island/DropStripView.cs' },
  { id: 'featuresPage.system.dropKind', cat: 'system', glyph: '\uE8B7', accent: '#f0883e', source: 'Island/IslandWindow.xaml.cs' },
  { id: 'featuresPage.system.dropBuiltin', cat: 'system', glyph: '\uE8B7', accent: '#f0883e', source: 'Core/DropTargets/HostDropTargets.cs' },
  { id: 'featuresPage.system.dropSafety', cat: 'system', glyph: '\uE72E', accent: '#f0883e', source: 'Island/IslandWindow.xaml.cs' },
  { id: 'featuresPage.system.message', cat: 'system', glyph: '\uE8BD', accent: '#f0883e', source: 'Island/MessageView.cs' },
  { id: 'featuresPage.system.spotlight', cat: 'system', glyph: '\uE8A7', accent: '#f0883e', source: 'Island/SpotlightWindow.xaml.cs' },
  { id: 'featuresPage.system.spotlightLife', cat: 'system', glyph: '\uE8A7', accent: '#f0883e', source: 'Core/SpotlightHost.cs' },
  { id: 'featuresPage.system.tray', cat: 'system', glyph: '\uE7F4', accent: '#f0883e', source: 'Core/TrayIcon.cs' },
  { id: 'featuresPage.system.multidisplay', cat: 'system', glyph: '\uE7F8', accent: '#f0883e', source: 'Core/DisplayResolver.cs' },
  { id: 'featuresPage.system.taskbar', cat: 'system', glyph: '\uE7C4', accent: '#f0883e', source: 'Core/TaskbarLayout.cs' },
  { id: 'featuresPage.system.update', cat: 'system', glyph: '\uE896', accent: '#f0883e', source: 'Core/Update/UpdateService.cs' },
  { id: 'featuresPage.system.settings', cat: 'system', glyph: '\uE713', accent: '#f0883e', source: 'Core/SettingsService.cs' },
  { id: 'featuresPage.system.logging', cat: 'system', glyph: '\uE9D9', accent: '#f0883e', source: 'Core/Plugins/PluginLogService.cs' },
  { id: 'featuresPage.system.crash', cat: 'system', glyph: '\uEA39', accent: '#f0883e', source: 'App.xaml.cs' },

  /* ------------------------------------------------------------ 平台 ---- */
  { id: 'featuresPage.platform.req', cat: 'platform', glyph: '\uE770', accent: '#3fb950', source: 'README.md' },
  { id: 'featuresPage.platform.install', cat: 'platform', glyph: '\uE896', accent: '#3fb950', source: 'installer/WinIsland.iss' },
  { id: 'featuresPage.platform.stack', cat: 'platform', glyph: '\uE964', accent: '#3fb950', source: 'WinIsland.csproj' },
  { id: 'featuresPage.platform.arch', cat: 'platform', glyph: '\uE72E', accent: '#3fb950', source: 'Core/SingleInstance.cs' },
]

/** 插件 API 速查表（对应 PLUGIN.md §4） */
export interface ApiRow {
  member: string
  descKey: string
  /** 纯代码成员名不翻译 */
  literal?: boolean
}

export const apiRows: Array<{ member: string; zh: string; en: string }> = [
  { member: 'Manifest', zh: '当前插件清单（Id / Name / Version / …）', en: 'The current plugin manifest (Id / Name / Version / …)' },
  { member: 'PluginDirectory', zh: '插件自己的目录，读资源文件用', en: 'The plugin\u2019s own directory, for reading resource files' },
  { member: 'HostVersion / Dispatcher', zh: '宿主版本 / UI 线程调度器', en: 'Host version / the UI thread dispatcher' },
  { member: 'Log', zh: 'Debug / Info / Warn / Error，写入插件日志（内存环形缓冲 + 文件）', en: 'Debug / Info / Warn / Error, written to the plugin log (in-memory ring buffer plus file)' },
  { member: 'Settings', zh: '作用域化设置存储，键自动加 <id>. 前缀', en: 'A scoped settings store; keys get an <id>. prefix automatically' },
  { member: 'Island.SetContent(content)', zh: '注册常驻内容（null 取消），owner 由宿主绑定为插件 Id', en: 'Register live content (null clears it). The host binds the owner to your plugin Id' },
  { member: 'Island.OpenSpotlight(s) / CloseSpotlight()', zh: '打开 / 收起「超级展开」聚光卡', en: 'Open / dismiss the Super Expand spotlight card' },
  { member: 'Island.ShowMessage(msg)', zh: '临时消息（标题 + 正文 + 图标 + 时长），宽度跟随内容（152..340）', en: 'A temp message (title + body + icon + duration) whose width follows the content (152..340)' },
  { member: 'Island.Show(uiElement, size, duration)', zh: '临时展示任意控件', en: 'Temporarily show any control' },
  { member: 'Island.AddSettingsPage(desc)', zh: '注册设置页（停用时自动移除）', en: 'Register a settings page (removed automatically on shutdown)' },
  { member: 'Island.AddDropTarget(target)', zh: '注册文件投放目标：拖文件到岛上时的一排卡片', en: 'Register a file drop target: one of the cards shown when dragging onto the island' },
  { member: 'Theme', zh: '岛体当前的明暗主题（IIslandTheme：IsLight + Changed），配色适配用', en: 'The island\u2019s current lightness (IIslandTheme: IsLight + Changed) for adapting colors' },
  { member: 'Register(IDisposable)', zh: '登记需要在停用时释放的资源（订阅、原生句柄…）', en: 'Register resources to release on shutdown (subscriptions, native handles, …)' },
  { member: 'OnSettingsChanged(key, handler)', zh: '监听某个设置键（handler 在 UI 线程调用）', en: 'Watch one settings key (the handler runs on the UI thread)' },
  { member: 'CreateTimer(interval, repeat, tick)', zh: 'UI 线程定时器（停用时自动停止并解绑）', en: 'A UI-thread timer (stopped and detached automatically on shutdown)' },
  { member: 'RunOnUI / RunOnUIAsync', zh: '把工作编组回 UI 线程', en: 'Marshal work back to the UI thread' },
]

/** plugin.json 必备字段（对应 PLUGIN.md §1） */
export const manifestFields: Array<{ field: string; required: boolean; zh: string; en: string }> = [
  { field: 'id', required: true, zh: '^[a-z0-9][a-z0-9-]{1,63}$，全局唯一', en: '^[a-z0-9][a-z0-9-]{1,63}$, globally unique' },
  { field: 'name', required: true, zh: '显示名称', en: 'Display name' },
  { field: 'version', required: true, zh: '数字点分版本号（1.2.3）', en: 'Dotted numeric version (1.2.3)' },
  { field: 'entry_dll', required: true, zh: '包内文件名，不能含路径，不能是 WinIsland.Core.dll', en: 'File name inside the package; no path, and never WinIsland.Core.dll' },
  { field: 'api_version', required: true, zh: '当前为 2，必须 ≤ 宿主支持的版本', en: 'Currently 2; must be ≤ the version the host supports' },
  { field: 'min_host_version', required: false, zh: '低于此宿主版本时拒绝加载', en: 'Refuse to load below this host version' },
  { field: 'description / author / icon_glyph / homepage / license / tags', required: false, zh: '展示用', en: 'Presentation only' },
]
