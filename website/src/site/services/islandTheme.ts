/**
 * 灵动岛的视觉规则 —— 与宿主 WinIsland 的 `Island/IslandStyle.cs` 一一对应。
 *
 * 这里是整站唯一的外观策略来源：颜色、圆角、材质、空闲点，全部从
 * `resolveIslandTheme(style, material, light)` 取。任何地方都不要再写死一套颜色，
 * 否则切换外观时就会露馅（黑胶囊上冒出白底、浅色材质上压一道黑纱）。
 */

export type IslandStyleKind = 'apple' | 'fluent'
export type IslandMaterialKind = 'acrylic' | 'mica' | 'solid'
export type IslandPosition = 'top' | 'bottom'
export type IslandHorizontal = 'left' | 'center' | 'right'

export interface IslandTheme {
  /** 岛体是否为浅色表面 */
  isLight: boolean
  /** 岛体底衬 */
  surface: string
  /** 岛体是否使用真实材质（Acrylic/Mica 生效） */
  materialApplied: boolean
  /** 1px 描边（Apple 为 none） */
  stroke: string
  /** 上缘 1px 反光（仅 Fluent） */
  topHighlight: string | null
  /** 空闲小点颜色 */
  idleDot: string
  /** 紧凑态圆角（px） */
  compactRadius: number
  /** 展开态圆角（px） */
  expandedRadius: number
  /** 队列卡片圆角（px） */
  queueRadius: number
  /** 聚光卡圆角（px） */
  spotlightRadius: number
  /** 聚光卡底衬 */
  spotlightSurface: string
  /** 聚光卡描边 */
  spotlightStroke: string
  /** 临时消息图标芯片底色（无强调色时的中性芯片） */
  messageChipFill: string
  /** 消息标题色 */
  messageTitle: string
  /** 消息正文色 */
  messageText: string
  /** 投放卡片底衬 */
  dropTileFill: string
  /** 投放卡片高亮色（无强调色时） */
  dropTileHighlight: string
  /** 投放面板主文字 */
  panelText: string
  /** 投放面板次级文字 */
  panelSecondary: string
  /** 投放面板提示文字 */
  panelHint: string
  /** 投放面板左右渐隐的起点色 */
  panelFade: string
  /** 面板内自适应文字色（浅色材质下要用深字） */
  onSurfacePrimary: string
  onSurfaceSecondary: string
  onSurfaceTertiary: string
  /** 叠在岛体上的控件悬停底色 */
  onSurfaceHover: string
  onSurfaceActive: string
  /** 聚光卡上的文字色 */
  spotlightText: string
  spotlightTextSecondary: string
  spotlightTextTertiary: string
  spotlightHover: string
  spotlightStrokeSoft: string
}

/** Apple 黑胶囊恒为深色 —— 这是它的身份，不跟随系统主题 */
const APPLE_SURFACE = '#000000'
const APPLE_IDLE_DOT = 'rgb(46,46,50)'
const APPLE_SPOTLIGHT_SURFACE = 'rgba(12,12,16,0.96)'
const APPLE_MESSAGE_CHIP = 'rgb(46,46,50)'
const APPLE_DROP_TILE = 'rgba(255,255,255,0.078)'

/** Fluent + 系统材质：深色压一层黑纱保证白字对比度；浅色不压纱，让材质原样透出来 */
const FLUENT_SURFACE_DARK = 'rgba(0,0,0,0.25)'
const FLUENT_SURFACE_LIGHT = 'transparent'
const FLUENT_SOLID_DARK = 'rgba(32,32,32,0.9)'
const FLUENT_SOLID_LIGHT = 'rgba(243,243,243,0.9)'

const FLUENT_STROKE_DARK = 'rgba(255,255,255,0.078)'
const FLUENT_STROKE_LIGHT = 'rgba(0,0,0,0.078)'
const FLUENT_IDLE_DOT_DARK = 'rgba(255,255,255,0.45)'
const FLUENT_IDLE_DOT_LIGHT = 'rgba(0,0,0,0.45)'

const FLUENT_SPOTLIGHT_DARK = 'rgba(38,38,42,0.93)'
const FLUENT_SPOTLIGHT_LIGHT = 'rgba(249,249,249,0.95)'
const FLUENT_SPOTLIGHT_SOLID_DARK = 'rgba(26,26,30,0.95)'
const FLUENT_SPOTLIGHT_SOLID_LIGHT = 'rgba(243,243,243,0.95)'

/** 聚光卡描边：两种风格都加，把卡片从暗化遮罩里"抠"出来 */
const SPOTLIGHT_STROKE_DARK = 'rgba(255,255,255,0.1)'
const SPOTLIGHT_STROKE_LIGHT = 'rgba(0,0,0,0.1)'

const FLUENT_MESSAGE_CHIP_DARK = 'rgba(255,255,255,0.118)'
const FLUENT_MESSAGE_CHIP_LIGHT = 'rgba(0,0,0,0.118)'

const FLUENT_DROP_TILE_DARK = 'rgba(255,255,255,0.102)'
const FLUENT_DROP_TILE_LIGHT = 'rgba(0,0,0,0.102)'

const TOP_HIGHLIGHT_DARK = 'rgba(255,255,255,0.11)'
const TOP_HIGHLIGHT_LIGHT = 'rgba(255,255,255,0.28)'

/**
 * 该用浅色配色吗：只有 Fluent 跟随系统主题，Apple 的黑胶囊在浅色系统下也是黑的。
 * 与宿主 `IslandStyle.IsLightChrome` 同一条规则。
 */
export const isLightChrome = (style: IslandStyleKind, light: boolean) =>
  style === 'fluent' && light

export function resolveIslandTheme(
  style: IslandStyleKind,
  material: IslandMaterialKind,
  light: boolean
): IslandTheme {
  const isLight = isLightChrome(style, light)
  const materialApplied = style === 'fluent' && material !== 'solid'

  // 只有 Fluent 才"浅色"，所以这里的 onSurface 系列就是岛内的文字色
  const lightSurfaceText = isLight

  const surface =
    style === 'apple'
      ? APPLE_SURFACE
      : materialApplied
        ? isLight
          ? FLUENT_SURFACE_LIGHT
          : FLUENT_SURFACE_DARK
        : isLight
          ? FLUENT_SOLID_LIGHT
          : FLUENT_SOLID_DARK

  const spotlightSurface =
    style === 'apple'
      ? APPLE_SPOTLIGHT_SURFACE
      : materialApplied
        ? isLight
          ? FLUENT_SPOTLIGHT_LIGHT
          : FLUENT_SPOTLIGHT_DARK
        : isLight
          ? FLUENT_SPOTLIGHT_SOLID_LIGHT
          : FLUENT_SPOTLIGHT_SOLID_DARK

  const onSurfacePrimary = lightSurfaceText ? 'rgba(28,28,30,0.94)' : 'rgba(255,255,255,0.96)'
  const onSurfaceSecondary = lightSurfaceText ? 'rgba(28,28,30,0.72)' : 'rgba(255,255,255,0.76)'
  const onSurfaceTertiary = lightSurfaceText ? 'rgba(28,28,30,0.52)' : 'rgba(255,255,255,0.54)'

  // 聚光卡始终从压暗的遮罩里浮出来，所以卡上的文字一律按卡片自身明暗取
  const spotlightText = isLight ? 'rgba(28,28,30,0.94)' : 'rgba(255,255,255,0.96)'
  const spotlightTextSecondary = isLight ? 'rgba(28,28,30,0.72)' : 'rgba(255,255,255,0.76)'
  const spotlightTextTertiary = isLight ? 'rgba(28,28,30,0.5)' : 'rgba(255,255,255,0.52)'

  return {
    isLight,
    surface,
    materialApplied,
    stroke: style === 'fluent' ? (isLight ? FLUENT_STROKE_LIGHT : FLUENT_STROKE_DARK) : 'transparent',
    topHighlight: style === 'fluent' ? (isLight ? TOP_HIGHLIGHT_LIGHT : TOP_HIGHLIGHT_DARK) : null,
    idleDot: style === 'apple' ? APPLE_IDLE_DOT : isLight ? FLUENT_IDLE_DOT_LIGHT : FLUENT_IDLE_DOT_DARK,

    // 与宿主 IslandStyle.ResolveRadius 同一套常量
    compactRadius: style === 'fluent' ? 8 : 999,
    expandedRadius: style === 'fluent' ? 12 : 28,
    queueRadius: style === 'fluent' ? 8 : 17,
    spotlightRadius: style === 'fluent' ? 20 : 28,

    spotlightSurface,
    spotlightStroke: isLight ? SPOTLIGHT_STROKE_LIGHT : SPOTLIGHT_STROKE_DARK,
    messageChipFill:
      style === 'apple'
        ? APPLE_MESSAGE_CHIP
        : isLight
          ? FLUENT_MESSAGE_CHIP_LIGHT
          : FLUENT_MESSAGE_CHIP_DARK,
    messageTitle: lightSurfaceText ? 'rgb(28,28,30)' : '#ffffff',
    messageText: lightSurfaceText ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
    dropTileFill:
      style === 'apple'
        ? APPLE_DROP_TILE
        : isLight
          ? FLUENT_DROP_TILE_LIGHT
          : FLUENT_DROP_TILE_DARK,
    dropTileHighlight: isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',

    panelText: lightSurfaceText ? 'rgba(28,28,30,0.94)' : 'rgba(255,255,255,0.94)',
    panelSecondary: lightSurfaceText ? 'rgba(28,28,30,0.84)' : 'rgba(255,255,255,0.84)',
    panelHint: lightSurfaceText ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)',
    panelFade: lightSurfaceText ? 'rgb(255,255,255)' : 'rgb(0,0,0)',

    onSurfacePrimary,
    onSurfaceSecondary,
    onSurfaceTertiary,
    onSurfaceHover: lightSurfaceText ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)',
    onSurfaceActive: lightSurfaceText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.16)',

    spotlightText,
    spotlightTextSecondary,
    spotlightTextTertiary,
    spotlightHover: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)',
    spotlightStrokeSoft: isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.09)',
  }
}

/** 材质的 CSS 表现（Acrylic 更强模糊，Mica 更内敛） */
export function materialBackdrop(material: IslandMaterialKind, dark: boolean): string {
  switch (material) {
    case 'acrylic':
      return dark
        ? 'blur(44px) saturate(190%) brightness(1.2) contrast(1.04)'
        : 'blur(40px) saturate(180%) brightness(1.04)'
    case 'mica':
      return dark
        ? 'blur(28px) saturate(150%) brightness(1.06)'
        : 'blur(26px) saturate(145%) brightness(1.02)'
    default:
      return 'none'
  }
}

/** 岛的紧凑态 / 展开态尺寸（DIP，与宿主一致） */
export const ISLAND_METRICS = {
  compactMinWidth: 126,
  compactMaxWidth: 200,
  compactHeight: 32,
  queueCardWidth: 340,
  queueCardHeight: 52,
  queueMaxVisible: 3,
  expandedGap: 8,
  messageHeightCompact: 40,
  messageHeightWithText: 46,
  messageMaxWidth: 340,
  dropPanelHeight: 96,
  spotlightMargin: 0.92,
}
