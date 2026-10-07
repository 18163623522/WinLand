/**
 * 站点演示用的「插件活动」数据 —— 对应宿主里的 IslandLiveContent。
 * 真实的宿主由 Media / Battery / AiMonitor / Messaging 四个内置插件提供内容；
 * 这里把它们在网页上重放一遍，好让访客真的"摸到"那座岛。
 */

export type ActivityId = 'media' | 'battery' | 'monitor' | 'messaging' | 'weather'

export interface DemoActivity {
  id: ActivityId
  /** 主岛占用优先级：数值大者占据主岛（与宿主 IslandLiveContent.Priority 同语义） */
  priority: number
  /** 插件名（展开态卡片顶部的小标签） */
  owner: string
  glyph: string
  accent: string
  /** 紧凑态一行摘要的 i18n key */
  compactKey: string
  /** 展开态标题 / 副标题的 i18n key */
  titleKey: string
  subtitleKey: string
  /** 紧凑态宽度（DIP），宿主会按内容在 126..200 之间取 */
  compactWidth: number
}

/**
 * 优先级与宿主内置插件一致：Media 抢占主岛，其余进队列。
 * 队列里由 `island.queueTail` 决定谁出现在末尾的"翻页位"。
 */
export const demoActivities: DemoActivity[] = [
  {
    id: 'media',
    priority: 80,
    owner: 'Media',
    glyph: '\uE8D6',
    accent: '#0a84ff',
    compactKey: 'island.demo.media.compact',
    titleKey: 'island.demo.media.title',
    subtitleKey: 'island.demo.media.subtitle',
    compactWidth: 188,
  },
  {
    id: 'battery',
    priority: 60,
    owner: 'Battery',
    glyph: '\uE83F',
    accent: '#32d0c8',
    compactKey: 'island.demo.battery.compact',
    titleKey: 'island.demo.battery.title',
    subtitleKey: 'island.demo.battery.subtitle',
    compactWidth: 152,
  },
  {
    id: 'monitor',
    priority: 50,
    owner: 'AiMonitor',
    glyph: '\uE9D9',
    accent: '#5e5ce6',
    compactKey: 'island.demo.monitor.compact',
    titleKey: 'island.demo.monitor.title',
    subtitleKey: 'island.demo.monitor.subtitle',
    compactWidth: 176,
  },
  {
    id: 'weather',
    priority: 40,
    owner: 'WeatherIsland',
    glyph: '\uE9BD',
    accent: '#3fb950',
    compactKey: 'island.demo.weather.compact',
    titleKey: 'island.demo.weather.title',
    subtitleKey: 'island.demo.weather.subtitle',
    compactWidth: 148,
  },
  {
    id: 'messaging',
    priority: 30,
    owner: 'Messaging',
    glyph: '\uE8BD',
    accent: '#f0883e',
    compactKey: 'island.demo.messaging.compact',
    titleKey: 'island.demo.messaging.title',
    subtitleKey: 'island.demo.messaging.subtitle',
    compactWidth: 160,
  },
]

/** 宿主自己会注册的投放动作（Order 900+，排在插件卡片后面） */
export interface DemoDropTarget {
  id: string
  titleKey: string
  glyph: string
  hintKey: string
  accent?: string
  order: number
  /** 接受哪种载荷：files / text / image */
  kinds: Array<'files' | 'text' | 'image'>
  /** 文件扩展名白名单（仅 files 生效） */
  extensions?: string[]
  /** 松手后的反馈文案 i18n key */
  resultKey: string
  builtin?: boolean
}

export const demoDropTargets: DemoDropTarget[] = [
  {
    id: 'add-to-playlist',
    titleKey: 'island.drop.addToPlaylist',
    glyph: '\uE8C8',
    hintKey: 'island.drop.addToPlaylistHint',
    accent: '#0a84ff',
    order: 0,
    kinds: ['files'],
    extensions: ['.mp3', '.flac', '.wav', '.m4a'],
    resultKey: 'island.drop.addToPlaylistResult',
  },
  {
    id: 'save-wallpaper',
    titleKey: 'island.drop.saveWallpaper',
    glyph: '\uEB9F',
    hintKey: 'island.drop.saveWallpaperHint',
    accent: '#32d0c8',
    order: 10,
    kinds: ['files', 'image'],
    extensions: ['.png', '.jpg', '.jpeg', '.webp', '.svg'],
    resultKey: 'island.drop.saveWallpaperResult',
  },
  {
    id: 'remember',
    titleKey: 'island.drop.remember',
    glyph: '\uE8C7',
    hintKey: 'island.drop.rememberHint',
    order: 20,
    kinds: ['files', 'text', 'image'],
    resultKey: 'island.drop.rememberResult',
  },
  {
    id: 'open',
    titleKey: 'island.drop.open',
    glyph: '\uE8E5',
    hintKey: 'island.drop.openHint',
    order: 900,
    kinds: ['files'],
    resultKey: 'island.drop.openResult',
    builtin: true,
  },
  {
    id: 'reveal',
    titleKey: 'island.drop.reveal',
    glyph: '\uE838',
    hintKey: 'island.drop.revealHint',
    order: 901,
    kinds: ['files'],
    resultKey: 'island.drop.revealResult',
    builtin: true,
  },
  {
    id: 'copy-path',
    titleKey: 'island.drop.copyPath',
    glyph: '\uE8C8',
    hintKey: 'island.drop.copyPathHint',
    order: 902,
    kinds: ['files'],
    resultKey: 'island.drop.copyPathResult',
    builtin: true,
  },
  {
    id: 'copy-text',
    titleKey: 'island.drop.copyText',
    glyph: '\uE77F',
    hintKey: 'island.drop.copyTextHint',
    order: 903,
    kinds: ['text'],
    resultKey: 'island.drop.copyTextResult',
    builtin: true,
  },
  {
    id: 'save-image',
    titleKey: 'island.drop.saveImage',
    glyph: '\uEB9F',
    hintKey: 'island.drop.saveImageHint',
    order: 904,
    kinds: ['image'],
    resultKey: 'island.drop.saveImageResult',
    builtin: true,
  },
]

/** 判断一张卡片能不能接收这份载荷（与宿主同一条规则：不匹配的卡片根本不出现） */
export function matchDropTargets(
  kind: 'files' | 'text' | 'image' | null,
  fileNames: string[]
): DemoDropTarget[] {
  if (!kind) return []
  return demoDropTargets
    .filter((t) => t.kinds.includes(kind))
    .filter((t) => {
      if (kind !== 'files' || !t.extensions || t.extensions.length === 0) return true
      return fileNames.some((name) => {
        const lower = name.toLowerCase()
        return t.extensions!.some((ext) => lower.endsWith(ext))
      })
    })
    .sort((a, b) => a.order - b.order)
}
