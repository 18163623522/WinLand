/** Site copy (English). Keep the keys in sync with Strings/zh-CN/Resources.ts. */
const enUS: Record<string, string> = {
  /* ------------------------------------------------------------ Brand ---- */
  'app.name': 'WinIsland',
  'app.tagline': 'The Dynamic Island for Windows',
  'app.summary':
    'A floating capsule that lives on your desktop: quiet in the corner, and a media console, charging readout and hardware dashboard once it expands.',

  /* ---------------------------------------------------------- Nav ---- */
  'nav.home': 'Home',
  'nav.features': 'Features',
  'nav.island': 'The Island',
  'nav.plugins': 'Plugin Dev',
  'nav.market': 'Plugins',
  'nav.download': 'Download',
  'nav.about': 'About',

  /* ------------------------------------------------------- Common ---- */
  'common.learnMore': 'Learn more',
  'common.viewAll': 'View all',
  'common.copy': 'Copy',
  'common.copied': 'Copied',
  'common.new': 'New',
  'common.builtin': 'Built-in',
  'common.community': 'Community',
  'common.beta': 'Preview',
  'common.and': 'and',
  'common.or': 'or',
  'common.recommended': 'Recommended',

  /* --------------------------------------------------------- Hero ---- */
  'home.hero.badge': 'Plugin API v2 · Windows 10 1809+ · No admin required',
  'home.hero.title1': 'A quiet little capsule',
  'home.hero.title2': 'that expands into an island',
  'home.hero.lead':
    'WinIsland rebuilds the Dynamic Island for Windows with WinUI 3 and Windows App SDK 2.3. Every piece of content comes from a hot-pluggable plugin, with a community marketplace on top.',
  'home.hero.ctaPrimary': 'Download free',
  'home.hero.ctaSecondary': 'Try it right here',
  'home.hero.meta1': 'Self-contained installer',
  'home.hero.meta2': 'x64 / ARM64',
  'home.hero.meta3': 'No administrator rights',
  'home.stats.plugins': 'Built-in plugins',
  'home.stats.samples': 'Sample projects',
  'home.stats.sdk': 'Plugin API version',
  'home.stats.arch': 'Supported architectures',

  'home.playground.title': 'Play with it on this very page',
  'home.playground.lead':
    'The island below is not a screenshot — it is an interactive replica built with web technology. Hover it, click it, or drag a file in from your desktop: it behaves like the real WinIsland.',
  'home.playground.tip': 'Tip: drag a file or selected text into the island to try file drop.',

  /* ------------------------------------------------------ Features ---- */
  'home.features.title': 'What it does',
  'home.features.lead':
    'From the island itself to the plugin ecosystem, everything follows the native Windows conventions.',

  'feat.forms.name': 'Two forms',
  'feat.forms.desc':
    'The compact capsule stays under 200 logical pixels; hovering expands it into the main island plus three queue cards, with a morph animation.',
  'feat.drop.name': 'File drop',
  'feat.drop.desc':
    'Drag files, text or images onto the island and it unfolds into a row of drop cards. Release to run — actions are registered by plugins.',
  'feat.style.name': 'Two looks',
  'feat.style.desc':
    'An Apple-style pure black capsule, or Windows Fluent with Desktop Acrylic / Mica system materials.',
  'feat.place.name': 'Two placements',
  'feat.place.desc':
    'Float at the top of the screen, or truly dock into the taskbar strip, dodging icons and following auto-hide.',
  'feat.plugin.name': 'Plugin system v2',
  'feat.plugin.desc':
    'Dependency isolation, hot-swap, timeouts and crash guards, with every registration reclaimed on shutdown.',
  'feat.spotlight.name': 'Super Expand',
  'feat.spotlight.desc':
    'When there is more to show than the island can hold, a spotlight card flies in from the island position and presents it centered.',
  'feat.market.name': 'Plugin marketplace',
  'feat.market.desc': 'One request for the whole index, multi-mirror fallback, mandatory SHA-256 check before install.',
  'feat.update.name': 'Update check',
  'feat.update.desc':
    'GitCode mirror first, GitHub as fallback. It only notifies — it never downloads or installs behind your back.',
  'feat.ai.name': 'AI friendly',
  'feat.ai.desc':
    'The winland-plugin-maker skill lets you describe what you want in one sentence and have AI build, test and submit the plugin.',
  'feat.clean.name': 'Clean',
  'feat.clean.desc':
    'Borderless, truly transparent, shape-accurate click-through, per-user install to %LocalAppData% with no admin rights.',
  'feat.multidisplay.name': 'Multi-display anchoring',
  'feat.multidisplay.desc':
    'Pin the island to a specific monitor, or let auto mode follow the display your cursor is on and re-anchor on hot-plug.',
  'feat.tray.name': 'Tray resident',
  'feat.tray.desc': 'Double-click the tray icon for settings; right-click to show/hide, check for updates or quit.',
  'feat.onboarding.name': 'First-run guide',
  'feat.onboarding.desc':
    'The first launch walks you through placement, appearance and auto-start, with live previews.',

  /* -------------------------------------------------- Island demo ---- */
  'island.demo.stageTitle': 'Interactive demo',
  'island.demo.hoverTip': 'Move your cursor onto the island',
  'island.demo.media.compact': 'Now playing · Sunny Day',
  'island.demo.media.title': 'Sunny Day',
  'island.demo.media.subtitle': 'Jay Chou · Yeh Hui-mei',
  'island.demo.media.source': 'Windows media session',
  'island.demo.media.play': 'Play',
  'island.demo.media.pause': 'Pause',
  'island.demo.media.prev': 'Previous',
  'island.demo.media.next': 'Next',
  'island.demo.battery.compact': '78% · Charging',
  'island.demo.battery.title': 'Charging monitor',
  'island.demo.battery.subtitle': 'Battery report · live power',
  'island.demo.battery.charging': 'Charging',
  'island.demo.battery.discharging': 'On battery',
  'island.demo.battery.capacity': 'Design capacity 62.4 Wh',
  'island.demo.battery.cycles': '137 cycles',
  'island.demo.monitor.compact': 'CPU 34% · ↓ 12.4 MB/s',
  'island.demo.monitor.title': 'Hardware monitor',
  'island.demo.monitor.subtitle': 'Foreground FPS · CPU / GPU',
  'island.demo.monitor.fps': 'FPS',
  'island.demo.weather.compact': '24° · Cloudy',
  'island.demo.weather.title': 'Weather island',
  'island.demo.weather.subtitle': 'Open-Meteo · no API key',
  'island.demo.weather.place': 'Hangzhou, China',
  'island.demo.weather.range': 'Feels like 26° · humidity 62%',
  'island.demo.weather.today': 'Today',
  'island.demo.weather.tomorrow': 'Tomorrow',
  'island.demo.weather.day3': 'Day 3',
  'island.demo.messaging.compact': 'Send a message',
  'island.demo.messaging.title': 'Send a message',
  'island.demo.messaging.subtitle': 'Push one message onto the island',
  'island.demo.monthLabel': 'Month',

  'island.action.msgMedia': 'Media toast',
  'island.action.msgBattery': 'Charging toast',
  'island.action.msgNeutral': 'Neutral toast',
  'island.action.superExpand': 'Super Expand',
  'island.msg.mediaTitle': 'Now playing',
  'island.msg.mediaText': 'Sunny Day — Jay Chou',
  'island.msg.batteryTitle': 'Power connected',
  'island.msg.neutralTitle': 'Done — Copy path',
  'island.msg.neutralText': '3 paths written to the clipboard',
  'island.queue.flip': 'Flip to the next activity',

  'island.console.messages': 'Temp messages',
  'island.console.drag': 'File drop',
  'island.console.dragHint': 'Drag a file, some selected text or an image into the island',
  'island.console.switches': 'Setting keys',

  'island.drop.nFiles': '{n} files',
  'island.drop.fileDetail': 'File · release to run',
  'island.drop.filesDetail': 'Multiple files · release to run',
  'island.drop.imageDetail': 'Image · release to run',
  'island.drop.link': 'Web link',
  'island.drop.text': 'Selected text',
  'island.drop.textDetail': 'Text · {n} lines · {chars} characters',
  'island.drop.noneCanTake': 'No card can take this',
  'island.drop.addToPlaylist': 'Add to playlist',
  'island.drop.addToPlaylistHint': 'Add to the current list',
  'island.drop.addToPlaylistResult': 'Added {n} tracks',
  'island.drop.saveWallpaper': 'Set as wallpaper',
  'island.drop.saveWallpaperHint': 'Save as the current desktop wallpaper',
  'island.drop.saveWallpaperResult': 'Wallpaper updated',
  'island.drop.remember': 'Keep in history',
  'island.drop.rememberHint': 'Archive it, come back to it later',
  'island.drop.rememberResult': 'Kept in history',
  'island.drop.open': 'Open',
  'island.drop.openHint': 'Open with the default app',
  'island.drop.openResult': 'Opened “{name}”',
  'island.drop.reveal': 'Show in folder',
  'island.drop.revealHint': 'Select it in File Explorer',
  'island.drop.revealResult': 'Revealed in File Explorer',
  'island.drop.copyPath': 'Copy path',
  'island.drop.copyPathHint': 'Write the path to the clipboard',
  'island.drop.copyPathResult': 'Copied {n} paths',
  'island.drop.copyText': 'Copy text',
  'island.drop.copyTextHint': 'Write the text to the clipboard',
  'island.drop.copyTextResult': 'Copied to the clipboard',
  'island.drop.saveImage': 'Save image',
  'island.drop.saveImageHint': 'Show a Save As dialog so you pick the location',
  'island.drop.saveImageResult': 'Image saved',

  'island.spotlight.title': 'Super Expand',
  'island.spotlight.subtitle': 'Spotlight card · its own full-screen overlay',
  'island.spotlight.close': 'Dismiss (Esc)',
  'island.spotlight.used': 'Disk used',
  'island.spotlight.read': 'Seq. read',
  'island.spotlight.write': 'Seq. write',
  'island.spotlight.temp': 'Temp',
  'island.spotlight.health': 'Health',
  'island.spotlight.hint': 'Click outside the card or press Esc — it flies back into the island',

  /* ---------------------------------------------------- Island page ---- */
  'islandPage.title': 'The Island',
  'islandPage.lead':
    'Every behaviour and every look of the island is configurable. The switches below are the same ones behind Settings → General.',
  'islandPage.customize': 'Tune it live',
  'islandPage.style': 'Appearance style',
  'islandPage.styleApple': 'Apple Dynamic Island',
  'islandPage.styleAppleDesc': 'An opaque pure black capsule with large radii — closest to the iPhone original.',
  'islandPage.styleFluent': 'Windows Fluent',
  'islandPage.styleFluentDesc':
    'Element-level system material, a 1px stroke and smaller radii, with colors following the system theme.',
  'islandPage.material': 'System material',
  'islandPage.materialAcrylic': 'Desktop Acrylic',
  'islandPage.materialAcrylicDesc': 'Frosted glass that blurs the desktop and windows behind it in real time.',
  'islandPage.materialMica': 'Mica',
  'islandPage.materialMicaDesc':
    'A mostly-opaque material tinted by your wallpaper. Supported from Windows 11 onward.',
  'islandPage.materialSolid': 'Solid fallback',
  'islandPage.materialSolidDesc': 'The solid surface the host falls back to when materials are unavailable.',
  'islandPage.position': 'Placement',
  'islandPage.positionTop': 'Top of the screen',
  'islandPage.positionTopDesc': 'Floats against the top of the work area; the queue grows downward.',
  'islandPage.positionBottom': 'Bottom (docked in the taskbar)',
  'islandPage.positionBottomDesc': 'Truly docked into the taskbar strip; the queue grows upward.',
  'islandPage.horizontal': 'Horizontal alignment',
  'islandPage.hLeft': 'Left',
  'islandPage.hCenter': 'Center',
  'islandPage.hRight': 'Right',
  'islandPage.theme': 'System theme',
  'islandPage.themeLight': 'Light',
  'islandPage.themeDark': 'Dark',

  'islandPage.behavior.title': 'Behaviour switches',
  'islandPage.behavior.hover': 'Expand on hover',
  'islandPage.behavior.hoverDesc':
    'Expanding as soon as the pointer enters the island. Turn it off to require a click.',
  'islandPage.behavior.hoverDelay': 'Expand delay',
  'islandPage.behavior.hoverDelayDesc':
    'How long to wait after the pointer enters before expanding, so passing over it does not pop it open.',
  'islandPage.behavior.bounce': 'Spring animation',
  'islandPage.behavior.bounceDesc':
    'A little elastic overshoot when expanding and collapsing. Turn it off on slow machines.',
  'islandPage.behavior.hideIdle': 'Hide when idle',
  'islandPage.behavior.hideIdleDesc': 'Collapse automatically while no plugin has anything to report.',
  'islandPage.behavior.drop': 'Allow file drop',
  'islandPage.behavior.dropDesc': 'When off, dragging files onto the island will not open the drop panel.',
  'islandPage.behavior.queueTail': 'Queue paging slot',
  'islandPage.behavior.queueTailDesc':
    'With more than three reporting plugins, a round button appears at the end to flip through them one by one.',
  'islandPage.geometry.title': 'Geometry and offsets',
  'islandPage.geometry.offset': 'Vertical offset',
  'islandPage.geometry.offsetDesc':
    'Distance from the screen edge in DIPs. Top and bottom placements each keep their own value.',
  'islandPage.geometry.hOffset': 'Horizontal offset',
  'islandPage.geometry.hOffsetDesc': 'Distance from the edge in left- and right-aligned modes.',
  'islandPage.geometry.display': 'Target display',
  'islandPage.geometry.displayDesc':
    'auto follows the display your cursor is on; you can also pin the island to one specific monitor.',
  'islandPage.geometry.displayAuto': 'Auto (follow the cursor)',
  'islandPage.geometry.display1': 'Display 1 · 2560×1440',
  'islandPage.geometry.display2': 'Display 2 · 1920×1080',
  'islandPage.startup.title': 'Startup',
  'islandPage.startup.autostart': 'Launch at sign-in',
  'islandPage.startup.autostartOff': 'Off',
  'islandPage.startup.autostartUser': 'As a standard user',
  'islandPage.startup.autostartAdmin': 'As administrator',
  'islandPage.startup.autostartAdminDesc':
    'Starts silently with elevation at sign-in (one UAC prompt). Required for the FPS readout.',

  'islandPage.how.title': 'How the state machine runs',
  'islandPage.how.lead':
    'The host keeps all of this in a single state machine. Panel sizes are constants reserved at startup, so dragging never changes window geometry and the animation never ghosts.',
  'islandPage.state.idle': 'Idle',
  'islandPage.state.idleDesc': 'A single breathing dot, width kept under 200.',
  'islandPage.state.expanded': 'Expanded',
  'islandPage.state.expandedDesc':
    'The main island plus three queue cards, sized to the largest of all activities.',
  'islandPage.state.message': 'Temp message',
  'islandPage.state.messageDesc':
    'Width follows the content (152–340); with body text it is a 46-high card.',
  'islandPage.state.drop': 'File drop',
  'islandPage.state.dropDesc':
    'A content state on the same level as a temp message; the cards live inside the island body.',

  /* ------------------------------------------------- Feature overview ---- */
  'featuresPage.title': 'All features',
  'featuresPage.lead': 'Everything WinIsland can do, grouped by theme. Use the chips to filter.',
  'featuresPage.filterAll': 'All',
  'featuresPage.count': '{n} features',

  'featuresPage.cat.core': 'Island',
  'featuresPage.cat.appearance': 'Appearance',
  'featuresPage.cat.plugin': 'Plugins',
  'featuresPage.cat.system': 'System integration',
  'featuresPage.cat.platform': 'Platform',

  'featuresPage.core.forms': 'Compact and expanded forms',
  'featuresPage.core.formsDesc':
    'The compact width adapts between 126 and 200 based on content. Expanded, all elements share the widest expanded width and all queue cards take the tallest height, so the column lines up.',
  'featuresPage.core.queue': 'Queue and paging',
  'featuresPage.core.queueDesc':
    'Expanding shows the main island plus three queue cards. The first two are pinned by priority; the last one is the paging slot, and when more activities are waiting a round button appears to cycle through them — so an activity at the back is always reachable.',
  'featuresPage.core.priority': 'Priority arbitration',
  'featuresPage.core.priorityDesc':
    'When several plugins report at once, the highest Priority takes the main island. The host can override your declared value per plugin with plugin.<id>.priority.',
  'featuresPage.core.morph': 'Single-view morphing',
  'featuresPage.core.morphDesc':
    'Implement IMorphView and one visual tree carries both the compact and expanded forms. The host drives the progress frame by frame, so collapsing mid-expand continues from where it is.',
  'featuresPage.core.tap': 'Primary action',
  'featuresPage.core.tapDesc':
    'Tapping the capsule runs the primary action of the current content. Tapping a plugin\u2019s own buttons will not fire OnTap — the host walks the visual tree to recognise interactive controls, and only a tap on empty content counts.',
  'featuresPage.core.passthrough': 'Shape-accurate click-through',
  'featuresPage.core.passthroughDesc':
    'SetWindowRgn clips the transparent canvas to the island\u2019s real rounded shape. Pixels outside the shape do not belong to this window, so clicks land on whatever is underneath — including other processes.',
  'featuresPage.core.topmost': 'Topmost self-heal',
  'featuresPage.core.topmostDesc':
    'The taskbar, Start menu and search flyout raise themselves at any time, so the island re-asserts its topmost state. Exclusive-fullscreen games, the UAC secure desktop and the lock screen sit outside that band and are never covered.',
  'featuresPage.core.geometry': 'Geometry invariants',
  'featuresPage.core.geometryDesc':
    'The window is never resized during the expand animation — changing the client width makes DWM composite the previous frame into the new window rect, producing a one-frame ghost. The canvas is pre-reserved; only the XAML island resizes.',

  'featuresPage.appearance.style': 'Apple and Fluent looks',
  'featuresPage.appearance.styleDesc':
    'Apple is an opaque black capsule with large radii; Fluent is element-level system material with a 1px stroke and small radii. The radius policy is the single source of truth and also drives the click-through window shape.',
  'featuresPage.appearance.material': 'Desktop Acrylic / Mica',
  'featuresPage.appearance.materialDesc':
    'Fluent offers real-time frosted glass or a wallpaper-tinted material. Light theme adds no veil so the material shows through; dark theme lays a black veil to keep white text readable.',
  'featuresPage.appearance.theme': 'Light and dark follow the system',
  'featuresPage.appearance.themeDesc':
    'The Fluent look follows Settings → Personalisation → Colours → default app mode, and switches live while the process is running. Apple is always dark.',
  'featuresPage.appearance.themeApi': 'Theme adaptation for plugins',
  'featuresPage.appearance.themeApiDesc':
    'Plugins read the island\u2019s lightness through IIslandTheme and subscribe to Changed. Neutral colors live in shared brushes, so one update repaints the whole tree.',
  'featuresPage.appearance.opacity': 'Truly transparent and borderless',
  'featuresPage.appearance.opacityDesc':
    'A DWM extended frame plus a fully transparent Composition backdrop — no system title bar and no white backing block.',

  'featuresPage.plugin.sdk': 'Plugin SDK 2.0',
  'featuresPage.plugin.sdkDesc':
    'WinIsland.Core is a read-only contract: interfaces, data and attributes only, no implementation. Plugins get logging, scoped settings, the island surface and the theme through IPluginContext.',
  'featuresPage.plugin.isolation': 'Dependency isolation',
  'featuresPage.plugin.isolationDesc':
    'Each plugin runs in a collectible AssemblyContext backed by AssemblyDependencyResolver and its own deps.json. WinIsland.Core, System.*/Windows.* and any assembly the host already ships bind to the host, preventing split type identity.',
  'featuresPage.plugin.hotplug': 'Hot-swap',
  'featuresPage.plugin.hotplugDesc':
    'Disable → unload the assembly (verified actually collected with a WeakReference) → enable again. Updates and uninstalls rename the old folder away first; files in use are never deleted.',
  'featuresPage.plugin.scope': 'Registration implies reclamation',
  'featuresPage.plugin.scopeDesc':
    'Settings pages, live content, temp messages, timers and settings subscriptions are all recorded in PluginScope and revoked together on shutdown — if a plugin cleans up badly, the host covers for it.',
  'featuresPage.plugin.guard': 'Guards and timeouts',
  'featuresPage.plugin.guardDesc':
    'A 10-second initialisation timeout; five unhandled exceptions in a session auto-disable the plugin; every callback from host to plugin is guarded, so one throwing plugin never turns the app into a WinUI stowed-exception crash.',
  'featuresPage.plugin.packaging': '.lwp plugin packages',
  'featuresPage.plugin.packagingDesc':
    'Build output plus plugin.json zipped up is a .lwp. Drop it into plugins/ to auto-install, or pick it in Plugin manager → Install package. Updates are same-Id overwrites: disable first, then replace.',
  'featuresPage.plugin.native': 'Bring your own dependencies',
  'featuresPage.plugin.nativeDesc':
    'Plugins may carry any NuGet dependency and native DLLs. The WinAppSDK runtime comes from the host, so you do not ship that 40MB with every plugin.',

  'featuresPage.system.drop': 'File drop',
  'featuresPage.system.dropDesc':
    'Drop files or folders, text or images onto the island and it unfolds into a row of drop cards. Cards scale up on hover, the rail auto-scrolls when the pointer reaches either end, the system drag bubble says “Drop onto XXX”, and the summary reshapes to the payload.',
  'featuresPage.system.dropKind': 'Payload detection chain',
  'featuresPage.system.dropKindDesc':
    'Real file → image → text. Images dragged from a browser are virtual files with no path; the host reads their contents and identifies them by extension (SVG included). When both a bitmap and text are present it does not blindly treat it as an image — selecting text in a browser often attaches a bitmap snapshot of the selection.',
  'featuresPage.system.dropBuiltin': 'Five built-in actions',
  'featuresPage.system.dropBuiltinDesc':
    'Open, Show in folder, Copy path, Copy text and Save image. Plugin targets sort ahead of them (900+) by default with Order 0.',
  'featuresPage.system.dropSafety': 'Boundary conditions',
  'featuresPage.system.dropSafetyDesc':
    'Non-matching cards simply do not appear (they are not dimmed). Releasing with no target does nothing — it never misfires. Images have a 32 MB ceiling, and every read has a timeout so a non-responsive source process never freezes the UI.',
  'featuresPage.system.message': 'Temp messages',
  'featuresPage.system.messageDesc':
    'IslandMessage is a feedback bar inside the island body: icon chip, title and body, with the width following the content (152–340). Without an AccentColor it uses a neutral chip matching the idle dot, so the host never pops a stray blue dot.',
  'featuresPage.system.spotlight': 'Super Expand (spotlight card)',
  'featuresPage.system.spotlightDesc':
    'IslandSpotlight opens in its own full-screen overlay window and flies in from the island position with a tilt, then scales up centered. All full-screen clicks are captured by that overlay — which is exactly how “click outside to dismiss” works. Esc flies it back.',
  'featuresPage.system.spotlightLife': 'Spotlight lifecycle',
  'featuresPage.system.spotlightLifeDesc':
    'Only one exists at a time: a second request replaces it and the previous owner gets OnClosed first. When a plugin is disabled or uninstalled the host collapses its card, leaving no ghost window. The content must be a visual tree separate from the island view — one tree per window.',
  'featuresPage.system.tray': 'Tray icon',
  'featuresPage.system.trayDesc':
    'A native Shell_NotifyIcon with a Win32 popup menu: double-click for settings, right-click to show/hide the island, check for updates or quit.',
  'featuresPage.system.trayTip': 'Tray reflects plugin activity',
  'featuresPage.system.trayTipDesc': 'When plugins are reporting while the island is hidden, the tray shows it too.',
  'featuresPage.system.multidisplay': 'Multi-display and hot-plug',
  'featuresPage.system.multidisplayDesc':
    'DisplayResolver is the single source of truth for which screen the island belongs on: island.display is either auto (follow the cursor) or one specific display. It subscribes to DisplayInformation.DisplayContentsInvalidated and repositions when monitors come and go.',
  'featuresPage.system.taskbar': 'Taskbar docking',
  'featuresPage.system.taskbarDesc':
    'A UI Automation probe reads the taskbar\u2019s occupied bands and places the island in a genuinely free one — it no longer assumes the left side is empty. It matches both the primary and secondary taskbars and follows auto-hide.',
  'featuresPage.system.update': 'Update check',
  'featuresPage.system.updateDesc':
    'GitCode mirror first, GitHub as fallback. It only surfaces a notice in Settings and on the island — you do the download and install yourself, because the app never silently replaces itself. Any version you do not want can be skipped.',
  'featuresPage.system.settings': 'Settings storage',
  'featuresPage.system.settingsDesc':
    'A JSON key-value store at %LocalAppData%\\WinIsland\\settings.json. Plugin settings get a <plugin id>. prefix automatically, so a plugin cannot touch host settings.',
  'featuresPage.system.logging': 'Logging',
  'featuresPage.system.loggingDesc':
    'plugin.host.log is the host log, and every plugin gets its own plugin.<id>.log (in-memory ring buffer plus file). The in-app “View log” shows the latest 500 lines.',
  'featuresPage.system.crash': 'Global crash log',
  'featuresPage.system.crashDesc':
    'Unhandled exceptions are written to disk with copyable diagnostics, so you can file an issue with the log attached.',

  'featuresPage.platform.req': 'System requirements',
  'featuresPage.platform.reqDesc':
    'Windows 10 1809 (build 17763) or later, x64 / ARM64. The installer is self-contained with the .NET 10 runtime and Windows App SDK, so nothing else is needed.',
  'featuresPage.platform.install': 'Per-user install',
  'featuresPage.platform.installDesc':
    'Installs to %LocalAppData%\\Programs\\WinIsland and needs no administrator rights at any point. Uninstall goes through the standard entry.',
  'featuresPage.platform.stack': 'Tech stack',
  'featuresPage.platform.stackDesc':
    'WinUI 3 · .NET 10 · Windows App SDK 2.3.1 · unpackaged WinExe (no MSIX, no store packaging).',
  'featuresPage.platform.arch': 'Single-instance gate',
  'featuresPage.platform.archDesc':
    'A local named mutex plus a duplicate-launch notification event: launching again surfaces the running island instead of creating a second one.',

  /* ---------------------------------------------------- Plugins page ---- */
  'pluginsPage.title': 'Plugin development',
  'pluginsPage.lead':
    'The host owns the island — size, radii, hover expand, queue layout, click-through shape. Plugins only supply content. There are two roads in: let AI build it, or write it yourself.',
  'pluginsPage.routeA': 'Route A · Let AI build it',
  'pluginsPage.routeANote': 'No coding required',
  'pluginsPage.routeADesc':
    'Install WinLandPluginSkills into your AI assistant, then describe what you want in one sentence. It walks you from nothing all the way to publishing on the marketplace.',
  'pluginsPage.routeA.step1': 'Install the skill',
  'pluginsPage.routeA.step1Desc':
    'Send the text below to your AI assistant (Claude Code, Command Code, or anything that supports skills).',
  'pluginsPage.routeA.step2': 'Just describe what you want',
  'pluginsPage.routeA.step2Desc': 'You do not need to mention the word “skill” — the assistant recognises it.',
  'pluginsPage.routeA.pipeline': 'The guided pipeline',
  'pluginsPage.routeA.pipelineDesc':
    'Idea → environment check → scaffold from the template → write code (SDK 2.0) → install into the WinIsland you actually use and verify it by hand → package the .lwp → ask your permission → upload to GitHub / submit to the marketplace.',
  'pluginsPage.routeA.rule1':
    'It must be installed into the WinIsland you actually use, and only you confirming the result counts as a passing test.',
  'pluginsPage.routeA.rule2':
    'Any action that publishes to the internet (creating a repo, pushing, opening a PR) must ask your permission first.',

  'pluginsPage.routeB': 'Route B · Write it yourself',
  'pluginsPage.routeBDesc':
    'A minimal working plugin is this small: derive from IslandPluginBase and override two methods.',
  'pluginsPage.minimal': 'Minimal plugin',
  'pluginsPage.package': 'Package and install',
  'pluginsPage.packageDesc':
    'Zip the build output plus plugin.json into a .lwp, then drop it into plugins/ or install it from the plugin manager page.',
  'pluginsPage.manifest': 'The plugin.json manifest',
  'pluginsPage.manifestDesc':
    'The manifest is the only source of metadata. If field-level validation fails, the plugin shows up in Plugin manager with an Error state naming the exact field and reason.',
  'pluginsPage.field': 'Field',
  'pluginsPage.fieldReq': 'Required',
  'pluginsPage.fieldRule': 'Rule',
  'pluginsPage.lifecycle': 'Lifecycle and states',
  'pluginsPage.lifecycleDesc':
    'InitializeAsync may be called more than once in an enable cycle (disable → enable, or reload), so it must be repeatable.',
  'pluginsPage.apiTable': 'API reference',
  'pluginsPage.apiTableDesc':
    'Plugins talk to the host through IPluginContext — this is the entire surface you get.',
  'pluginsPage.api.member': 'Member',
  'pluginsPage.api.desc': 'Description',
  'pluginsPage.threading': 'Threading model',
  'pluginsPage.threadingDesc':
    'InitializeAsync, ShutdownAsync, settings page factories, OnSettingsChanged and CreateTimer callbacks all run on the UI thread. Put sampling, network and file work on background threads and marshal back with Context.RunOnUI(...).',
  'pluginsPage.pitfall': 'The easiest traps to fall into',
  'pluginsPage.pitfall.morph': 'Morph animations must assign properties frame by frame, not use Storyboard',
  'pluginsPage.pitfall.morphDesc':
    'Property-path animation cannot resolve type information inside a dynamically loaded plugin assembly and throws a COMException on the animation tick — the kind a try/catch at the call site cannot stop. The symptom is “the island shrinks and then freezes”. Built-in host views can use Storyboard because they live in the host assembly.',
  'pluginsPage.pitfall.sdk': 'Your build SDK must not be newer than the host\u2019s',
  'pluginsPage.pitfall.sdkDesc':
    '.NET does not allow binding strong-named assemblies downwards, so a plugin built with a newer SDK than the host fails to load. Put a global.json at the plugin repo root to pin the SDK to .NET 10.',
  'pluginsPage.pitfall.spotlight': 'Spotlight content must be a separate visual tree',
  'pluginsPage.pitfall.spotlightDesc':
    'One tree per window — the same UIElement cannot be attached to two windows at once. Reusing the element from the island view results in a card that will not open, or shows up blank.',
  'pluginsPage.pitfall.background': 'Keep the view root transparent',
  'pluginsPage.pitfall.backgroundDesc':
    'The host paints the island material. A plugin-drawn opaque background shows up as a mismatched block when switching between Apple and Fluent. Semi-transparent white (such as #33FFFFFF) works with both materials.',

  'pluginsPage.samples': 'Sample projects',
  'pluginsPage.samplesDesc': 'These projects in the repository double as the best example code.',
  'pluginsPage.sample.hello': 'Code-built UI, private dependencies, a settings page, timers, full cleanup',
  'pluginsPage.sample.xaml': 'XAML views with PluginXaml.Load and frame-by-frame morph animation',
  'pluginsPage.sample.hardware': 'A real plugin: CPU / GPU / network / frame rate, with its own NuGet dependency',
  'pluginsPage.sample.weather': 'Network data, timed refresh, theme adaptation and a spotlight card',
  'pluginsPage.sample.device': 'Device hot-plug monitoring, multi-item lists and per-item actions',
  'pluginsPage.coreApi': 'Full SDK source',
  'pluginsPage.coreApiDesc': 'A read-only contract you can read in 30 minutes.',

  /* ----------------------------------------------------- Market page ---- */
  'marketPage.title': 'Plugins',
  'marketPage.lead':
    'Settings → Plugin marketplace reads the community repository\u2019s index.json. The whole list is a single request — icons are inlined as base64 in the index, with no per-plugin requests.',
  'marketPage.builtin': 'Built-in plugins',
  'marketPage.community': 'Community plugins',
  'marketPage.col.plugin': 'Plugin',
  'marketPage.col.compact': 'Compact view',
  'marketPage.col.expanded': 'Expanded view',
  'marketPage.col.note': 'Notes',
  'marketPage.install': 'Install',
  'marketPage.detail': 'Details',
  'marketPage.detailTip':
    'The detail page shows version, author, size, license, SHA-256 and the plugin\u2019s own description. The README is only fetched when you open it.',
  'marketPage.mirror': 'Multi-mirror fallback',
  'marketPage.mirrorDesc':
    'GitHub raw → GitCode mirror → jsDelivr. GitHub is the only origin; the rest are mirrors. The client tries them in order and remembers the last one that worked. You can also point marketplace.baseUrl at your own source.',
  'marketPage.sha': 'Mandatory SHA-256 verification',
  'marketPage.shaDesc':
    'The .lwp is downloaded only when you click Install, and the hash is verified immediately — a mismatch refuses the install.',
  'marketPage.submit': 'Submitting',
  'marketPage.submitDesc':
    'Put plugin.json + <id>.lwp + logo.png (optional) + README.md (optional) into plugins/<id>/ and open a PR. Once merged, an Action rebuilds the index.',

  'market.media.name': 'Now Playing',
  'market.media.compact': 'Cover + title + animated equaliser',
  'market.media.expanded': 'Cover, title / artist, progress bar and previous / play-pause / next',
  'market.media.note': 'Built on the Windows media session (GSMTC), so any player can take over',
  'market.battery.name': 'Charging Monitor',
  'market.battery.compact': 'Battery ring + percentage + charge state',
  'market.battery.expanded': 'Live charging power curve and battery status',
  'market.battery.note': 'Reads battery reports via Windows.Devices.Power and toasts when you plug in',
  'market.messaging.name': 'Send a Message',
  'market.messaging.compact': '— (no live content)',
  'market.messaging.expanded': 'Push a message or a custom XAML control onto the island by hand',
  'market.messaging.note': 'For testing, demos and wiring up your own scripts and automation',
  'market.weather.name': 'Weather Island',
  'market.weather.compact': 'Weather icon + temperature',
  'market.weather.expanded': 'Three-day forecast for today / tomorrow / the day after',
  'market.weather.note': 'Data from Open-Meteo — no sign-up and no API key',
  'market.hardware.name': 'Hardware Monitor',
  'market.hardware.compact': 'CPU usage + upload / download speed',
  'market.hardware.expanded': 'Foreground FPS, CPU / GPU usage and models, network throughput',
  'market.hardware.note': 'The FPS readout requires running WinIsland as administrator',

  'marketPage.risk': 'Plugins run with the same privileges as your own programs (they are not sandboxed)',
  'marketPage.riskDesc':
    'Check where a plugin comes from before installing. The host protects itself from plugin crashes, but that is not the same as a security boundary. Packages from the marketplace have their SHA-256 verified before install.',

  /* --------------------------------------------------- Download page ---- */
  'downloadPage.title': 'Download',
  'downloadPage.lead':
    'The installer is self-contained: the .NET runtime and Windows App SDK are both bundled, so nothing else is required.',
  'downloadPage.primary': 'Official source',
  'downloadPage.mirror': 'Domestic mirror',
  'downloadPage.mirrorDesc': 'GitCode · faster inside mainland China, identical contents',
  'downloadPage.ghDesc': 'GitHub · the one true origin, where releases are published',
  'downloadPage.andMirror': 'or',
  'downloadPage.arch': 'Choose your architecture',
  'downloadPage.archX64': 'x64',
  'downloadPage.archX64Desc': 'Almost every Intel / AMD machine',
  'downloadPage.archArm64': 'ARM64',
  'downloadPage.archArm64Desc': 'Snapdragon X series and other Windows on ARM devices',
  'downloadPage.getSetup': 'Download installer',
  'downloadPage.allReleases': 'All releases',
  'downloadPage.requirements': 'System requirements',
  'downloadPage.reqOs': 'Windows 10 1809 (build 17763) or later',
  'downloadPage.reqArch': 'x64 or ARM64 processor',
  'downloadPage.reqAdmin': 'No administrator rights needed (per-user install)',
  'downloadPage.reqRuntime': 'No need to pre-install .NET or the Windows App SDK',
  'downloadPage.afterInstall': 'After installing',
  'downloadPage.after1':
    'The capsule appears at the top centre of the screen, or docked in the taskbar (per Settings → General → Position)',
  'downloadPage.after2':
    'Double-click the tray icon for settings; right-click to show/hide, check for updates or quit',
  'downloadPage.after3':
    'Hide when idle is the default: it collapses whenever no plugin has anything to report',
  'downloadPage.after4':
    'The first launch runs a guide that walks you through placement, appearance and auto-start',
  'downloadPage.buildFromSource': 'Build from source',
  'downloadPage.buildDesc':
    'Requires the .NET 10 SDK; Windows App SDK is restored via NuGet. There is no .sln in the repo — build the csproj directly.',
  'downloadPage.checksum': 'Verify integrity',
  'downloadPage.checksumDesc':
    'The release page lists a SHA-256 for every artifact so you can check it yourself after downloading.',

  /* ------------------------------------------------------ About page ---- */
  'aboutPage.title': 'About',
  'aboutPage.lead': 'WinIsland is an open-source project under the MIT license.',
  'aboutPage.author': 'Author',
  'aboutPage.authorDesc': 'luolangaga · building a Dynamic Island for Windows from scratch with WinUI 3',
  'aboutPage.repo': 'Source repository',
  'aboutPage.repoDesc': 'Issues and ideas are both welcome',
  'aboutPage.pluginRepo': 'Community plugin repository',
  'aboutPage.pluginRepoDesc': 'The source of the marketplace index, and where you submit plugins',
  'aboutPage.skillsRepo': 'AI skill repository',
  'aboutPage.skillsRepoDesc': 'winland-plugin-maker — takes AI from an idea to a marketplace release',
  'aboutPage.docs': 'Plugin development guide',
  'aboutPage.docsDesc': 'PLUGIN.md, the full SDK 2.0 reference',
  'aboutPage.license': 'License',
  'aboutPage.licenseDesc': 'MIT — use it and change it freely, just keep the copyright notice',
  'aboutPage.tech': 'Tech stack',
  'aboutPage.techDesc': 'WinUI 3 · .NET 10 · Windows App SDK 2.3.1 · unpackaged WinExe',
  'aboutPage.changelog': 'Changelog',
  'aboutPage.changelogDesc': 'See the release notes for what changed in each version',
  'aboutPage.faq': 'Frequently asked questions',
  'aboutPage.faq.q1': 'Will it cover my full-screen games?',
  'aboutPage.faq.a1':
    'No. Exclusive-fullscreen and fullscreen-optimised games, the UAC secure desktop and the lock screen all sit outside the topmost band, so the island never covers them.',
  'aboutPage.faq.q2': 'Why are the queue cards all the same size when expanded?',
  'aboutPage.faq.a2':
    'That is deliberate: a column of aligned cards looks better than a ragged one. The host unifies card sizes — width from the widest expanded activity, height from the tallest queued activity (the last one is the paging slot and can be any of them). Write your plugin views with star / adaptive layout.',
  'aboutPage.faq.q3': 'Can a plugin read my private data?',
  'aboutPage.faq.a3':
    'Plugins run with the same privileges as your own programs — they are not sandboxed. Check where a plugin comes from before installing. The host protects itself from plugin crashes, but that is not a security boundary. Marketplace packages have their SHA-256 verified before install.',
  'aboutPage.faq.q4': 'Where are the logs?',
  'aboutPage.faq.a4':
    '%LocalAppData%\\WinIsland\\logs\\ — plugin.host.log is the host log, and each plugin gets its own plugin.<id>.log.',
  'aboutPage.faq.q5': 'How do I update?',
  'aboutPage.faq.a5':
    'Settings → About, or right-click the tray icon → Check for updates. It queries the GitCode mirror first and falls back to GitHub. Downloading and installing are buttons you press yourself — the app never downloads in the background and never silently replaces itself.',

  /* --------------------------------------------------------- Footer ---- */
  'footer.rights': 'MIT licensed · open source',
  'footer.builtWith': 'Built with WinUI 3; this site is recreated with the same WinUIonWeb component library',
  'footer.links': 'Links',
  'footer.releases': 'Releases',
  'footer.issues': 'Issues',

  /* --------------------------------------------------------- Search ---- */
  'search.noResult': 'No matching results',
  'search.hint': 'Search features, plugins and documentation',
  'search.results': 'Results',
}

export default enUS
