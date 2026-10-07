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
  'home.hero.ctaTertiary': 'Browse all features',
  'home.hero.meta1': 'Self-contained installer',
  'home.hero.meta2': 'x64 / ARM64',
  'home.hero.meta3': 'No administrator rights',
  'home.stats.plugins': 'Built-in plugins',
  'home.stats.samples': 'Sample projects',
  'home.stats.sdk': 'Plugin API version',
  'home.stats.arch': 'Supported architectures',
  'home.stats.pluginsHint': 'Media / Battery / Hardware / Weather / Messaging',
  'home.stats.statesHint': 'Idle · Expanded · Message · Drop',
  'home.stats.sdkHint': 'Semantic versioning, backwards compatible',
  'home.stats.licenseHint': 'Free to use and build upon',

  'home.playground.title': 'Play with it on this very page',
  'home.playground.lead':
    'The island below is not a screenshot — it is an interactive replica built with web technology. Hover it, click it, or drag a file in from your desktop: it behaves like the real WinIsland.',
  'home.playground.tip': 'Tip: drag a file or selected text into the island to try file drop.',
  'home.playground.tipTitle': 'It is live, not a recording',

  /* ------------------------------------------------------ Features ---- */
  'home.features.title': 'What it does',
  'home.features.lead':
    'From the island itself to the plugin ecosystem, everything follows the native Windows conventions.',
  'home.features.subtitle': 'Four representative ones here — the full list lives under All features.',

  /* ------------------------------------------------- Built-in plugins ---- */
  'home.plugins.title': 'Five plugins out of the box',
  'home.plugins.subtitle':
    'Each plugin declares its own priority and both content forms. The highest priority takes the main island; the rest queue up automatically.',
  'home.plugins.cta': 'See all plugins',
  'home.plugins.note':
    'Higher priority sorts first. Host drop actions sit past 900 so plugins always win the front slot.',

  /* ------------------------------------------------------------ Stack ---- */
  'home.stack.title': 'One plugin, one JSON, one DLL',
  'home.stack.subtitle':
    'Full functionality without touching host code. The SDK is a small standalone DLL — that is the only reference a plugin needs.',
  'home.stack.item1':
    'Plugin engine v2: every plugin runs in a collectible AssemblyLoadContext, so disabling it truly unloads it.',
  'home.stack.item2':
    'All callbacks are timeout-guarded (10s by default); five consecutive faults auto-disable the plugin instead of taking the host down.',
  'home.stack.item3':
    'The host owns radius, sizing, hover, expand/collapse and transient messages — plugins only supply content.',
  'home.stack.item4':
    'Plugins can register their own settings pages; order within the settings navigation comes from Order.',
  'home.stack.item5': 'Ship it as a single .lwp (a zip); drop it into the plugin manager and it installs.',
  'home.stack.ctaPlugin': 'Read the developer docs',
  'home.stack.ctaAbout': 'About the project',
  'home.stack.manifestLabel': 'plugin.json — a minimal runnable manifest',

  /* --------------------------------------------------------- Final CTA ---- */
  'home.final.title': 'Put it on your taskbar right now',
  'home.final.lead':
    'A portable package: unzip and run. No registry writes, no administrator rights. To remove it, delete the folder.',
  'home.final.cta': 'Go to downloads',
  'home.final.ctaRepo': 'Browse the source on GitHub',
  'home.final.note': 'WinIsland is open source under the MIT license. Issues and PRs are welcome.',

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
  'marketPage.col.plugin': 'Plugin',
  'marketPage.col.compact': 'Compact view',
  'marketPage.col.expanded': 'Expanded view',
  'marketPage.col.note': 'Notes',

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

  /* The demo activity id is "monitor" — same built-in plugin as "hardware" above.
     Both names are kept so a rename cannot leave a dangling reference. */
  'market.monitor.name': 'Hardware Monitor',
  'market.monitor.compact': 'CPU usage + upload / download speed',
  'market.monitor.expanded': 'Foreground FPS, CPU / GPU usage and models, network throughput',
  'market.monitor.note': 'The FPS readout requires running WinIsland as administrator',


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

  /* --------------------------------------------- Shell: theme / titles ---- */
  'common.download': 'Download',
  'common.themeLight': 'Switch to light',
  'common.themeDark': 'Switch to dark',
  'common.expand': 'Show all',
  'common.collapse': 'Collapse',
  'common.close': 'Close',
  'common.source': 'Source',
  'common.required': 'Required',
  'common.optional': 'Optional',
  'common.category': 'Category',

  'footer.product': 'Product',
  'footer.develop': 'Developers',
  'footer.resource': 'Resources',
  'footer.community': 'Community',
  'footer.sdk': 'SDK reference',
  'footer.changelog': 'Changelog',
  'footer.tagline': 'An open-source Dynamic Island for the Windows desktop — media, battery, hardware, messages and file drops in one island.',
  'footer.copyright': 'MIT licensed open source',
  'footer.disclaimer': 'Windows is a registered trademark of Microsoft Corporation. This site is not affiliated with Microsoft.',

  'pageTitle.home': 'WinIsland — a Dynamic Island for Windows',
  'pageTitle.island': 'Island & appearance — WinIsland',
  'pageTitle.features': 'All features — WinIsland',
  'pageTitle.plugins': 'Plugin development — WinIsland',
  'pageTitle.market': 'Plugin marketplace — WinIsland',
  'pageTitle.download': 'Download & install — WinIsland',
  'pageTitle.about': 'About — WinIsland',
  'pageTitle.not-found': 'Page not found — WinIsland',

  /* ==========================================================================
     Page-level copy added during implementation
     ========================================================================== */

  /* ------------------------------------------------- Island: live lab ---- */
  'islandPage.eyebrow': 'Island · appearance · behaviour',
  'islandPage.styleNote':
    'Both appearance policies come from the host IslandStyle.cs — radius, surface fill and stroke all change together.',
  'islandPage.materialNote':
    'Materials are window-level system materials (Composition + DWM). In light mode Fluent stops layering a veil, so it looks more transparent.',
  'islandPage.positionNote':
    'top hugs the top of the work area; bottom sits on the taskbar strip. Both avoid occupied taskbar segments automatically.',
  'islandPage.horizontalNote':
    'Horizontal alignment picks where the island lands; pair it with island.horizontalOffset for fine tuning.',
  'islandPage.appearance': 'Light & dark',
  'islandPage.lightMode': 'Light UI',
  'islandPage.lightModeNote': 'Apple style is always a dark capsule; only Fluent follows the system light/dark setting.',
  'islandPage.on': 'On',
  'islandPage.off': 'Off',
  'islandPage.behaviour': 'Behaviour',
  'islandPage.hoverExpand': 'Expand on hover',
  'islandPage.hideWhenIdle': 'Hide when idle',
  'islandPage.dropEnabled': 'Accept file drops',
  'islandPage.bounce': 'Bounce on new message',
  'islandPage.queueTail': 'Show pager slot',
  'islandPage.autostart': 'Start with Windows',
  'islandPage.panelTipTitle': 'Change it left, see it right',
  'islandPage.panelTip':
    'This column is exactly what the host shows under Settings → General. Watch the capsule radius, queue card shape and backdrop blur as you switch.',
  'islandPage.currentStyle': 'Current style',
  'islandPage.currentMaterial': 'Current material',
  'islandPage.currentSurface': 'Surface fill',
  'islandPage.currentRadius': 'Radius (compact / expanded)',

  'islandPage.phasesTitle': 'Four states, one state machine',
  'islandPage.phasesLead':
    "The island's geometry is owned entirely by the host; plugins only ever fill it with content.",
  'islandPage.phase.idle': 'Idle capsule',
  'islandPage.phase.idleDesc':
    'The quietest form: an indicator dot plus a progress line or one short line of text, width adapting between 126 and 200.',
  'islandPage.phase.expanded': 'Expanded island',
  'islandPage.phase.expandedDesc':
    'On mouse enter the main island yields to the highest-priority activity, followed by up to three queue cards — the last one is the pager.',
  'islandPage.phase.expandedMetric': 'Main island + 3 queue cards + 8px gap',
  'islandPage.phase.message': 'Transient message',
  'islandPage.phase.messageDesc':
    'The small card shown when a plugin calls ShowMessage: width follows content, height follows line count, and it retracts on its own.',
  'islandPage.phase.drop': 'File drop',
  'islandPage.phase.dropDesc':
    'Drag a file in and the island unfolds into a row of drop tiles. If nothing accepts it you are told so plainly, and releasing over nothing has no effect.',
  'islandPage.phasesTipTitle': 'The island above really implements all four',
  'islandPage.phasesTip':
    'Hover it to expand, click the main island for the spotlight, use the console buttons for a transient message, and drag a file in from your desktop to drop.',

  'islandPage.metrics.title': 'Key geometry constants',
  'islandPage.metrics.lead':
    'Every number here comes from the host code, and the web replica is aligned to them item by item — so the proportions you see are the real ones.',
  'islandPage.metrics.colName': 'Constant',
  'islandPage.metrics.colValue': 'Value',
  'islandPage.metrics.colNote': 'Notes',
  'islandPage.metrics.compactRadius': 'compactRadius',
  'islandPage.metrics.compactRadiusNote': 'Idle capsule radius. Apple uses 999 (fully round); Fluent uses 8.',
  'islandPage.metrics.expandedRadius': 'expandedRadius',
  'islandPage.metrics.expandedRadiusNote': 'Radius for the expanded main island and the drop panel.',
  'islandPage.metrics.queueRadius': 'queueRadius',
  'islandPage.metrics.queueRadiusNote': 'Queue card radius — squarer than the main island so it does not look loose.',
  'islandPage.metrics.spotlightRadius': 'spotlightRadius',
  'islandPage.metrics.spotlightRadiusNote': 'Spotlight card radius; generous in both styles so it reads as a card.',
  'islandPage.metrics.compactWidth': 'compactWidth',
  'islandPage.metrics.compactWidthNote': 'Width range of the idle capsule, adaptive to content.',
  'islandPage.metrics.queueCard': 'queueCard',
  'islandPage.metrics.queueCardNote': 'Fixed size of a single queue card.',
  'islandPage.metrics.queueVisible': 'queueMaxVisible',
  'islandPage.metrics.queueVisibleNote': 'How many queue cards show at once before paging kicks in.',
  'islandPage.metrics.spotlightMargin': 'spotlightMargin',
  'islandPage.metrics.spotlightMarginNote': 'Maximum share of the work area the spotlight may take; beyond that it is clamped.',

  'islandPage.settingsTitle': 'Where your changes actually land',
  'islandPage.settingsLead': 'Every toggle is one key in a JSON file — no registry, no hidden state.',
  'islandPage.settingsItem1': 'Host keys use the island. prefix; plugin preferences live under plugin.<id>.*',
  'islandPage.settingsItem2': 'Writes are atomic: a temp file is written and then swapped in, so a power cut cannot corrupt it.',
  'islandPage.settingsItem3': 'Disabling a plugin keeps its plugin.<id>.* values, so re-enabling restores your setup.',
  'islandPage.settingsItem4': 'Editing by hand works too — flip any toggle in the settings window afterwards to trigger a reload.',

  'islandPage.themeTitle': 'One source of truth for appearance',
  'islandPage.themeLead':
    'The host derives colours and radii from IslandStyle.cs; this site reuses the same policy function so the two cannot drift.',

  /* ------------------------------------------------- Marketplace: how ---- */
  'marketPage.eyebrow': 'Plugin ecosystem',
  'marketPage.ctaDevelop': 'I want to build one',
  'marketPage.hostTargets': 'Host drop actions',
  'marketPage.hostTitle': 'The host contributes drop tiles too',
  'marketPage.hostLead':
    'Open, reveal in Explorer and copy paths are registered by the host itself with Order values past 900 — give your plugin a small Order to take the front slots.',
  'marketPage.howTitle': 'How the marketplace works',
  'marketPage.howLead': 'The whole client makes a single index.json request; everything else is local work and verification.',
  'marketPage.step1': 'Fetch the index',
  'marketPage.step1Desc':
    'Requests the community index index.json (schema 1). In mainland China it tries the mirror first and falls back to the official source automatically.',
  'marketPage.step2': 'Cache and negotiate',
  'marketPage.step2Desc':
    'Conditional requests with ETag plus a TTL cache: if nothing changed, the local copy is reused rather than re-downloaded.',
  'marketPage.step3': 'Verify',
  'marketPage.step3Desc':
    'After downloading the .lwp the declared SHA-256 is checked; a mismatch refuses installation, so a tampered package never gets in.',
  'marketPage.step4': 'Install atomically',
  'marketPage.step4Desc':
    'Extract to a temp directory, confirm the manifest and the entry DLL both exist, then swap the whole directory in. A failure leaves no half-installed plugin.',
  'marketPage.indexLabel': 'Community index shape',
  'marketPage.installLabel': 'Two install routes',
  'marketPage.submitTitle': 'Want your plugin listed here',
  'marketPage.submitLead':
    'Package the .lwp locally, install it yourself to confirm it works, then open a PR against the index repository.',
  'marketPage.ghDesc': 'The official source. Source code, samples, issues and pull requests all live here.',
  'marketPage.gitcodeDesc': 'A China-friendly mirror with faster fetches; update checks query it first.',
  'marketPage.trustTitle': 'Plugins are not sandboxed',
  'marketPage.trust':
    'A plugin runs with the same privileges as your other programs. The host protects itself when a plugin throws, but that is not isolation — check where a plugin comes from, and note that marketplace packages are SHA-256 verified before install.',
  'marketPage.reqTitle': 'To publish a plugin, it must',
  'marketPage.req1': 'Declare api_version as {sdk} and not require a min_host_version newer than the host you target.',
  'marketPage.req2': 'Ship as a single .lwp containing both plugin.json and the DLL its entry points to.',
  'marketPage.req3':
    'Release subscriptions, timers and window references in ShutdownAsync — otherwise the ALC cannot be collected after unload.',

  /* ----------------------------------------------- Download & install ---- */
  'downloadPage.eyebrow': 'Get WinIsland',
  'downloadPage.getTitle': 'Download WinIsland',
  'downloadPage.getSub': 'A portable package: unzip and run. No registry writes, no administrator rights.',
  'downloadPage.sourceLabel': 'Source',
  'downloadPage.archLabel': 'Architecture',
  'downloadPage.official': 'Official',
  'downloadPage.go': 'Get the latest release',
  'downloadPage.ghHint':
    'GitHub\'s latest link always points at the newest build; browse the Releases list if you want an older one.',
  'downloadPage.gitcodeHint': 'GitCode hosts whole-release pages — pick the package for your architecture there.',
  'downloadPage.freeOpenSource': 'Free & open source',
  'downloadPage.sourcesTitle': 'Two sources, take your pick',
  'downloadPage.sourcesLead': 'Identical contents; they differ only in how fast they fetch from where you are.',
  'downloadPage.updateTitle': 'It tells you about updates, it never installs them',
  'downloadPage.updateNote':
    'Update checking is notification only: it queries GitCode first and falls back to GitHub. You download and install in the browser — the app never silently replaces itself in the background.',
  'downloadPage.stepsTitle': 'After you install',
  'downloadPage.stepsLead': 'Everything lives in the tray; no taskbar button is taken.',
  'downloadPage.step1': 'Unzip',
  'downloadPage.step1Desc':
    'Extract the zip anywhere (avoid locations that need administrator rights, like C:\\Program Files).',
  'downloadPage.step2': 'Run',
  'downloadPage.step2Desc': 'Double-click WinIsland.exe. First launch shows an onboarding window that walks the common toggles.',
  'downloadPage.step3': 'Find the tray icon',
  'downloadPage.step3Desc':
    'The island appears near the top of the screen and an icon shows up in the tray. Right-click it for settings, plugin management and update checks.',
  'downloadPage.step4': 'Make it yours',
  'downloadPage.step4Desc':
    'Under Settings → General, change style, material or position — or move the island to the bottom taskbar strip entirely.',
  'downloadPage.portableTitle': 'Why deleting it is safe',
  'downloadPage.portableLead': 'All state lives in one directory, so rolling back means removing it.',
  'downloadPage.portable1': 'No registry entries, no system services, no scheduled tasks.',
  'downloadPage.portable2':
    'Autostart is a shortcut in the Startup folder — turn it off in settings and it is genuinely gone.',
  'downloadPage.portable3': 'Uninstalling leaves nothing behind, because there was never an install step.',
  'downloadPage.portable4':
    'Settings and plugins live under %LocalAppData%\\WinIsland; copy that folder to back everything up.',
  'downloadPage.buildTitle': 'Build from source',
  'downloadPage.buildLead':
    'Requires the .NET 10 SDK and Windows App SDK 2.3.1. There is no .sln — build straight from the project directory.',
  'downloadPage.openRepo': 'Open repository',
  'downloadPage.targetNote': 'Targets {tfm}, with a minimum of Windows 10 1809 (build 17763).',

  /* ------------------------------------------------------ About ---- */
  'aboutPage.eyebrow': 'About the project',
  'aboutPage.ctaRepo': 'View on GitHub',
  'aboutPage.authorTitle': 'Author and project facts',
  'aboutPage.fact.version': 'Host version',
  'aboutPage.fact.sdk': 'Plugin SDK',
  'aboutPage.fact.tfm': 'Target framework',
  'aboutPage.fact.minOs': 'Minimum OS',
  'aboutPage.fact.license': 'License',
  'aboutPage.fact.lang': 'Built with',
  'aboutPage.reposTitle': 'Where to find things',
  'aboutPage.reposLead': 'Code, samples, mirror and feedback each have their own door.',
  'aboutPage.issues': 'Issue tracker',
  'aboutPage.issuesDesc':
    'Hit a bug or have an idea? Open an issue. Including the host version and plugin.host.log makes it far easier to pin down.',
  'aboutPage.gitcodeDesc': 'The China mirror — pull code from here when the network is uncooperative.',
  'aboutPage.stackTitle': 'What it is built on',
  'aboutPage.stackLead': 'All native Windows pieces, with no Electron layer in between.',
  'aboutPage.stack.winui': 'The entire UI and control system',
  'aboutPage.stack.appsdk': 'Windows, materials, tray, UIA and other system capabilities',
  'aboutPage.stack.net': 'Runtime and plugin loading',
  'aboutPage.stack.csharp': 'The implementation language',
  'aboutPage.stack.composition': 'Animation and fly-in / fly-back',
  'aboutPage.stack.tray': 'Tray icon and the native popup menu',
  'aboutPage.stack.uia': 'Probing for free taskbar segments',
  'aboutPage.stack.installer': 'Optional installer (not needed for the portable build)',
  'aboutPage.websiteTitle': 'This website uses the same stack',
  'aboutPage.website':
    'The pages are built with WinUIonWeb, a component library that re-creates WinUI controls as Vue components — so buttons, switches and cards feel like Windows itself, and the island in the middle is a rewrite of the host state machine for the web.',
  'aboutPage.faqTitle': 'Frequently asked questions',
  'aboutPage.faqLead': 'Straight answers, including the unflattering ones.',
  'aboutPage.logTitle': 'Changelog',
  'aboutPage.logLead': 'Newest first.',
  'aboutPage.log.v231.i1':
    'Fixed a memory vendor decoding regression: the two-byte packing semantics in SPD are now unified, so Kingbank and others are no longer misidentified.',
  'aboutPage.log.v231.i2':
    'Layout improvements: the tab strip scrolls, scene categories are clearer, and SSD-related hints are complete.',
  'aboutPage.log.v231.i3':
    'Multi-display resolution is unified behind DisplayResolver; after a hot-plug the island returns to the correct screen by itself.',
  'aboutPage.log.v220.i1':
    'Plugin marketplace shipped: a single index.json, ETag caching, mirror fallback and SHA-256 verification before install.',
  'aboutPage.log.v220.i2':
    'The file drop panel was rebuilt — drop tiles scale on hover and the strip auto-scrolls at both ends.',
  'aboutPage.log.v220.i3':
    'Free taskbar segment detection moved to UI Automation, so the island lands in a genuinely empty band.',
  'aboutPage.log.v210.i1':
    'Added the "super expand" spotlight: a standalone full-screen overlay window with fly-in and fly-back animation.',
  'aboutPage.log.v210.i2':
    'Added the transient message API (ShowMessage) so plugins no longer hand-roll a small card.',
  'aboutPage.log.v210.i3':
    'Plugins can insert settings pages into the settings navigation, with the order they declare.',
  'aboutPage.log.v200.i1':
    'Plugin engine v2: collectible AssemblyLoadContext, a registration ledger, 10s timeouts and auto-disable on repeated faults.',
  'aboutPage.log.v200.i2':
    'The plugin SDK became a standalone package — plugins reference it only, never the host.',
  'aboutPage.log.v200.i3':
    'Settings pages register dynamically, letting a plugin insert its own page into the settings navigation.',
  'aboutPage.thanksTitle': 'Thanks and legal',
  'aboutPage.thanks':
    'Thanks to everyone who filed an issue, reported a bug or published a plugin — this project grew out of those concrete problems, not out of a one-line ambition. The samples and docs are much friendlier to newcomers because of it.',
  'aboutPage.legal':
    'Windows, WinUI and Segoe are trademarks or registered trademarks of Microsoft Corporation. This site is not affiliated with, nor endorsed by, Microsoft. WinIsland is an independent open-source project distributed under the MIT license, with no warranty.',

  /* ------------------------------------------------------- 404 ---- */
  'notFound.title': 'This page is not on the island',
  'notFound.lead': 'The link may have expired, or a character got mistyped. How about heading home?',
  'notFound.home': 'Back to home',

  /* --------------------------------------------- Marketplace: host actions ---- */
  'market.host.open': 'Open file',
  'market.host.reveal': 'Show in Explorer',
  'market.host.copy': 'Copy file path',

  /* ------------------------------------- Implementation top-ups: island page ---- */
  'islandPage.horizontalCenter': 'Center',
  'islandPage.horizontalCenterDesc': 'The island sits dead centre (default). The steadiest option, and the closest to a phone Dynamic Island.',
  'islandPage.horizontalLeft': 'Left',
  'islandPage.horizontalLeftDesc': 'Hugs the left edge of the work area — handy when the primary display is on the right.',
  'islandPage.horizontalRight': 'Right',
  'islandPage.horizontalRightDesc': 'Hugs the right edge, keeping clear of window title bars on the left.',

  /* ---------------------------------- Implementation top-ups: download page ---- */
  'downloadPage.reqTitle': 'System requirements',
  'downloadPage.req.os': 'Operating system',
  'downloadPage.req.arch': 'Architecture',
  'downloadPage.req.runtime': 'Runtime',
  'downloadPage.req.appsdk': 'App framework',
  'downloadPage.req.perm': 'Privileges',
  'downloadPage.req.permValue': 'No admin needed',
  'downloadPage.req.license': 'License',
  'downloadPage.gitcodeDesc': 'The China mirror release page — pick the package for your architecture.',

  /* ------------------------------------ Implementation top-ups: features page ---- */
  'featuresPage.eyebrow': 'Features · mapped to source',
  'featuresPage.emptyHint': 'Try another keyword, or hit "All" for the complete list.',
  'featuresPage.evidenceTitle': 'These are not marketing words',
  'featuresPage.evidence':
    'Every card names the file that implements it, so you can open the repository and check each one. This list was extracted from README, PLUGIN.md and the host source — nothing was invented to pad it out.',

  /* ------------------------------------- Implementation top-ups: plugins page ---- */
  'pluginsPage.eyebrow': 'Developer documentation',
  'pluginsPage.ctaSamples': 'Open the samples',
  'pluginsPage.routeTitle': 'Two ways to start',
  'pluginsPage.routeLead':
    'Copy a sample if you want results fast; build from an empty project if you want to understand every piece. Both end up at the same artifact.',
  'pluginsPage.routeBNote': 'Best if you already have code, or want to know why each dependency is there',
  'pluginsPage.routeA.step3': 'Change the content',
  'pluginsPage.routeA.step3Desc':
    'Swap the text in SetContent for your own data. Wire up a real source by injecting a service and starting it in InitializeAsync.',
  'pluginsPage.routeA.step4': 'Package and install',
  'pluginsPage.routeA.step4Desc':
    'After building the DLL, run tools/pack-plugin.ps1 and drop the resulting .lwp into the plugin manager.',
  'pluginsPage.routeA.step5': 'Publish it',
  'pluginsPage.routeA.step5Desc':
    'Once it checks out, attach the .lwp to your release and open a PR against the community index to list it.',
  'pluginsPage.routeB.step1': 'Create the project',
  'pluginsPage.routeB.step1Desc':
    'Make a class library whose target framework matches the host, then reference luolan.winland.Core.',
  'pluginsPage.routeB.step2': 'Write the entry class',
  'pluginsPage.routeB.step2Desc':
    'Derive from IslandPluginBase and register your first piece of content in InitializeAsync.',
  'pluginsPage.routeB.step3': 'Write the manifest',
  'pluginsPage.routeB.step3Desc':
    'Add plugin.json with the right id, entry and api_version — if the fields do not line up the host refuses to load you.',
  'pluginsPage.routeB.step4': 'Iterate locally',
  'pluginsPage.routeB.step4Desc':
    'Copy or link the output into the plugin directory and hit Reload in the plugin manager to see changes as you make them.',
  'pluginsPage.routeB.step5': 'Flesh it out',
  'pluginsPage.routeB.step5Desc':
    'Add a settings page, drop targets, transient messages and a spotlight — that is a complete plugin.',

  'pluginsPage.minimalTitle': 'A minimal runnable plugin',
  'pluginsPage.minimalLead': 'Two files: a project file and a class. That is the entire cost of appearing on the island.',

  'pluginsPage.manifestTitle': 'plugin.json fields',
  'pluginsPage.manifestLead': 'The host validates field by field, and the log tells you exactly which one is wrong.',
  'pluginsPage.colField': 'Field',
  'pluginsPage.colRequired': 'Required',
  'pluginsPage.colMeaning': 'Meaning',
  'pluginsPage.colMember': 'Member',
  'pluginsPage.colDesc': 'Description',

  'pluginsPage.versionRuleTitle': 'The SDK cannot be newer than the host',
  'pluginsPage.versionRule':
    'api_version declares the interface version the host must provide; asking for more than the host offers means it will refuse to load. min_host_version is the oldest host you accept — using incremental APIs like the spotlight means raising it to 2.1.0.',

  'pluginsPage.apiTitle': 'SDK API reference',
  'pluginsPage.apiLead':
    'Everything a plugin can reach. Types not listed here are not public contract and may change between releases.',
  'pluginsPage.snippetMessage': 'Post a transient message / open a spotlight',
  'pluginsPage.snippetDrop': 'Register a file drop target',

  'pluginsPage.lifeTitle': 'Lifecycle',
  'pluginsPage.lifeLead': 'Six stages, each guarded by the host with timeouts and fault handling.',
  'pluginsPage.life.discover': 'Discover',
  'pluginsPage.life.discoverDesc':
    'Scans the plugin directory, reads each plugin.json and validates the fields and api_version compatibility.',
  'pluginsPage.life.load': 'Load',
  'pluginsPage.life.loadDesc':
    'Creates a dedicated collectible AssemblyLoadContext for the plugin and resolves its own dependencies.',
  'pluginsPage.life.init': 'Initialize',
  'pluginsPage.life.initDesc':
    'Calls InitializeAsync within a 10-second timeout. This is where you register settings pages, drop targets and subscriptions.',
  'pluginsPage.life.running': 'Run',
  'pluginsPage.life.runningDesc':
    'Each callback is wrapped individually: a throw only affects that plugin, and five consecutive faults disable it.',
  'pluginsPage.life.shutdown': 'Shut down',
  'pluginsPage.life.shutdownDesc': 'ShutdownAsync is time-limited too — all cleanup has to happen here.',
  'pluginsPage.life.unload': 'Unload',
  'pluginsPage.life.unloadDesc':
    'The ALC is collected and references verified. If this stage fails, something in ShutdownAsync was not released.',

  'pluginsPage.threadTitle': 'Threading model',
  'pluginsPage.threadLead': 'In one line: do not block the UI thread, and never touch the visual tree from a background thread.',
  'pluginsPage.thread.rule1': 'Keep UI-thread work light',
  'pluginsPage.thread.rule1Desc':
    'InitializeAsync and every callback run on the UI thread. Push heavy work (file I/O, network, hardware queries) to a background thread.',
  'pluginsPage.thread.rule2': 'Hop back to the UI thread for the visual tree',
  'pluginsPage.thread.rule2Desc':
    'From a background thread always wrap content changes in RunOnUI(...); writing directly throws.',
  'pluginsPage.thread.rule3': 'The host will not wait for you',
  'pluginsPage.thread.rule3Desc':
    'A callback that times out is discarded and logged. Do not start long jobs inside a callback.',
  'pluginsPage.thread.rule4': 'Disabling is asynchronous',
  'pluginsPage.thread.rule4Desc':
    'The host revokes registrations before unloading the ALC — stop your timers here, or the ALC will not be collectible.',

  'pluginsPage.packTitle': 'Package it as .lwp',
  'pluginsPage.packLead':
    '.lwp is just a zip: plugin.json at the root, the DLL its entry points to also at the root, and any other dependencies in their folder structure.',

  'pluginsPage.pitfallsTitle': 'Pitfalls worth knowing',
  'pluginsPage.pitfallsLead': 'All of these were hit for real — expand for details.',
  'pluginsPage.pitfall1': 'Forgetting base.Attach',
  'pluginsPage.pitfall1Desc':
    'When deriving from IslandPluginBase you must hand the context to the base first, or Context / Log / Settings stay null and something null-references later for no obvious reason.',
  'pluginsPage.pitfall2': 'Two windows cannot share one visual tree',
  'pluginsPage.pitfall2Desc':
    'The spotlight is a separate window, so its Content must be a visual tree the plugin creates. Moving island elements into it will crash.',
  'pluginsPage.pitfall3': 'ShutdownAsync leaves things behind',
  'pluginsPage.pitfall3Desc':
    'Miss a single timer, subscription or window reference and the ALC cannot be collected — the log says so plainly. This accumulates if a plugin is toggled repeatedly.',
  'pluginsPage.pitfall4': 'Touching UI from a background thread',
  'pluginsPage.pitfall4Desc':
    'Every write to the visual tree or content API needs RunOnUI. Writing directly may appear to work, then crash at random.',
  'pluginsPage.pitfall5': 'Declaring an absurd size',
  'pluginsPage.pitfall5Desc':
    'Spotlight sizes are clamped to 92% of the work area. Overshooting is not an error — it just pins the card to the edges and looks cropped.',

  'pluginsPage.helpTitle': 'Stuck?',
  'pluginsPage.help':
    'Start with logs/plugin.<id>.log — your plugin\'s exceptions land there. If that does not settle it, open an issue with the host version, plugin id and the relevant log.',
}

export default enUS
