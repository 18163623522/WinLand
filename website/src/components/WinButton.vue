<script setup lang="ts">
/**
 * WinButton —— WinUI 3 Button 的 Web 复刻。
 *
 * 沿用 XAML 命名属性：Style / Content / Padding / Width / Height …
 * Style 取 "DefaultButtonStyle" | "AccentButtonStyle" | "SubtleButtonStyle"。
 * 嵌套用法（图标 + 文字）走默认插槽；只给 Content 就走纯文本。
 */
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    Style?: string
    Content?: string | number
    IsEnabled?: boolean
    Background?: string
    Foreground?: string
    BorderBrush?: string
    BorderThickness?: string | number
    Padding?: string | number
    Margin?: string | number
    Width?: string | number
    Height?: string | number
    MinWidth?: string | number
    MinHeight?: string | number
    MaxWidth?: string | number
    MaxHeight?: string | number
    HorizontalAlignment?: 'Left' | 'Center' | 'Right' | 'Stretch'
    VerticalAlignment?: 'Top' | 'Center' | 'Bottom' | 'Stretch'
    HorizontalContentAlignment?: 'Left' | 'Center' | 'Right' | 'Stretch'
    VerticalContentAlignment?: 'Top' | 'Center' | 'Bottom' | 'Stretch'
    FontFamily?: string
    FontWeight?: string | number
    FontSize?: string | number
    CornerRadius?: string | number
    UseSystemFocusVisuals?: boolean
  }>(),
  {
    Style: 'DefaultButtonStyle',
    IsEnabled: true,
    UseSystemFocusVisuals: true,
  }
)

const attrs = useAttrs()

/** XAML 允许纯数字表示像素 */
const cssLength = (value?: string | number): string | undefined => {
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value === 'number') return `${value}px`
  const trimmed = String(value).trim()
  return /^-?\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}px` : trimmed
}

/** XAML Thickness："20" → 20px；"20,0" → 上下20 左右0；"1,2,3,4" → 左 上 右 下 */
const xamlThickness = (value?: string | number, axis: 'padding' | 'margin' = 'padding') => {
  if (value === undefined || value === null || value === '') return undefined
  const raw = String(value).trim()
  if (typeof value === 'number' || !raw.includes(',')) {
    const single = cssLength(value) ?? raw
    return axis === 'margin' ? single : single
  }
  const parts = raw.split(',').map((p) => p.trim())
  const turn = (v: string) => cssLength(v) ?? v
  if (parts.length === 2) return `${turn(parts[0])} ${turn(parts[1])}`
  if (parts.length === 4) return `${turn(parts[3])} ${turn(parts[0])} ${turn(parts[1])} ${turn(parts[2])}`
  return turn(parts[0])
}

const styleClass = computed(() => {
  switch (props.Style) {
    case 'AccentButtonStyle':
      return 'win-button--accent'
    case 'SubtleButtonStyle':
      return 'win-button--subtle'
    default:
      return 'win-button--default'
  }
})

const buttonStyle = computed(() => {
  const s: Record<string, string> = {}
  const set = (key: string, value?: string) => {
    if (value) s[key] = value
  }
  set('--ButtonBackground', props.Background)
  set('--ButtonForeground', props.Foreground)
  set('--ButtonBorderBrush', props.BorderBrush)
  set('--ButtonBorderThickness', cssLength(props.BorderThickness) ?? undefined)
  set('--ButtonPadding', xamlThickness(props.Padding))
  set('--ButtonMargin', xamlThickness(props.Margin, 'margin'))
  set('--ButtonWidth', cssLength(props.Width) ?? undefined)
  set('--ButtonHeight', cssLength(props.Height) ?? undefined)
  set('--ButtonMinWidth', cssLength(props.MinWidth) ?? undefined)
  set('--ButtonMinHeight', cssLength(props.MinHeight) ?? undefined)
  set('--ButtonMaxWidth', cssLength(props.MaxWidth) ?? undefined)
  set('--ButtonMaxHeight', cssLength(props.MaxHeight) ?? undefined)
  set('--ButtonFontFamily', props.FontFamily)
  set('--ButtonFontWeight', props.FontWeight !== undefined ? String(props.FontWeight) : undefined)
  set('--ButtonFontSize', cssLength(props.FontSize) ?? undefined)
  set('--ButtonCornerRadius', cssLength(props.CornerRadius) ?? undefined)
  if (props.HorizontalAlignment && props.HorizontalAlignment !== 'Stretch') {
    s['align-self'] = props.HorizontalAlignment.toLowerCase()
  }
  if (props.VerticalAlignment && props.VerticalAlignment !== 'Stretch') {
    s['vertical-align'] = props.VerticalAlignment.toLowerCase()
  }
  if (props.HorizontalContentAlignment) {
    s['--ButtonContentJustify'] =
      props.HorizontalContentAlignment === 'Stretch'
        ? 'space-between'
        : props.HorizontalContentAlignment.toLowerCase() === 'left'
          ? 'flex-start'
          : props.HorizontalContentAlignment.toLowerCase() === 'right'
            ? 'flex-end'
            : 'center'
  }
  if (props.VerticalContentAlignment) {
    s['--ButtonContentAlign'] =
      props.VerticalContentAlignment.toLowerCase() === 'top'
        ? 'flex-start'
        : props.VerticalContentAlignment.toLowerCase() === 'bottom'
          ? 'flex-end'
          : 'center'
  }
  return s
})

const forwardedAttrs = computed(() => {
  const { class: cls, style: st, ...rest } = attrs as Record<string, unknown>
  return { cls, st, rest }
})
</script>

<template>
  <button
    type="button"
    class="win-button"
    :class="[styleClass, forwardedAttrs.cls]"
    :style="[buttonStyle, forwardedAttrs.st]"
    :disabled="!IsEnabled"
    v-bind="forwardedAttrs.rest"
  >
    <span class="win-button__content">
      <slot>{{ Content }}</slot>
    </span>
  </button>
</template>

<style>
.win-button {
  --ButtonBackground: var(--ctrl-fill-default);
  --ButtonForeground: var(--text-primary);
  --ButtonBorderBrush: var(--ControlElevationBorderBrush);
  --ButtonBorderThickness: 1px;
  --ButtonPadding: 12px 16px;
  --ButtonMinWidth: 120px;
  --ButtonMinHeight: 32px;
  --ButtonFontSize: 14px;
  --ButtonFontWeight: 400;
  --ButtonCornerRadius: 4px;
  --ButtonContentJustify: center;
  --ButtonContentAlign: center;

  /* 状态机当前值 */
  --ButtonBackgroundCurrent: var(--ButtonBackground);
  --ButtonForegroundCurrent: var(--ButtonForeground);
  --ButtonBorderBrushCurrent: var(--ButtonBorderBrush);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: var(--ButtonContentJustify);
  width: var(--ButtonWidth, auto);
  height: var(--ButtonHeight, auto);
  min-width: var(--ButtonMinWidth);
  min-height: var(--ButtonMinHeight);
  max-width: var(--ButtonMaxWidth);
  max-height: var(--ButtonMaxHeight);
  padding: var(--ButtonPadding);
  margin: var(--ButtonMargin, 0);
  font-family: var(--ButtonFontFamily, inherit);
  font-size: var(--ButtonFontSize);
  font-weight: var(--ButtonFontWeight);
  line-height: 20px;
  border: var(--ButtonBorderThickness) solid transparent;
  border-radius: var(--ButtonCornerRadius);
  outline: none;
  box-sizing: border-box;
  cursor: default;
  transition:
    background-color var(--fast-duration) var(--fast-out-slow-in),
    border-color var(--fast-duration) var(--fast-out-slow-in),
    color var(--fast-duration) var(--fast-out-slow-in);
  -webkit-tap-highlight-color: transparent;
}

.win-button__content {
  display: flex;
  align-items: var(--ButtonContentAlign);
  justify-content: inherit;
  gap: 8px;
  width: 100%;
  white-space: nowrap;
}

.win-button:focus-visible {
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}

/* ---- DefaultButtonStyle ---- */
.win-button--default {
  background-color: var(--ButtonBackgroundCurrent);
  color: var(--ButtonForegroundCurrent);
  border-color: var(--ctrl-border);
  border-image: var(--ControlElevationBorderBrush) 1;
}
.win-button--default:hover:not(:disabled) {
  --ButtonBackgroundCurrent: var(--ctrl-fill-secondary);
}
.win-button--default:active:not(:disabled) {
  --ButtonBackgroundCurrent: var(--ctrl-fill-tertiary);
  border-image: none;
  border-color: var(--ctrl-border-accent);
  color: var(--text-secondary);
}

/* ---- AccentButtonStyle ---- */
.win-button--accent {
  --ButtonBackground: var(--accent-base);
  --ButtonForeground: var(--accent-text);
  background-color: var(--ButtonBackgroundCurrent);
  color: var(--ButtonForegroundCurrent);
  border-color: var(--accent-border-accent);
  border-image: var(--AccentControlElevationBorderBrush) 1;
}
.win-button--accent:hover:not(:disabled) {
  --ButtonBackgroundCurrent: var(--accent-hover);
}
.win-button--accent:active:not(:disabled) {
  --ButtonBackgroundCurrent: var(--accent-pressed);
  border-image: none;
  border-color: var(--accent-border-accent);
  color: var(--accent-text-secondary);
}

/* ---- SubtleButtonStyle ---- */
.win-button--subtle {
  --ButtonBackground: transparent;
  background-color: var(--ButtonBackgroundCurrent);
  color: var(--ButtonForegroundCurrent);
  border-color: transparent;
  border-image: none;
}
.win-button--subtle:hover:not(:disabled) {
  --ButtonBackgroundCurrent: var(--subtle-secondary);
}
.win-button--subtle:active:not(:disabled) {
  --ButtonBackgroundCurrent: var(--subtle-tertiary);
  color: var(--text-secondary);
}

/* ---- 禁用 ---- */
.win-button:disabled {
  --ButtonBackgroundCurrent: var(--ctrl-fill-disabled);
  --ButtonForegroundCurrent: var(--text-disabled);
  --ButtonBorderBrushCurrent: var(--ctrl-border);
  background-color: var(--ButtonBackgroundCurrent);
  color: var(--ButtonForegroundCurrent);
  border-color: var(--ctrl-border);
  border-image: none;
}
.win-button--subtle:disabled {
  --ButtonBackgroundCurrent: transparent;
}
</style>
