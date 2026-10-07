<script setup lang="ts">
/** WinTextBlock —— TextBlock 的 Web 复刻（Typography 层级用 Style 指定）。 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    Text?: string
    Style?:
      | 'CaptionTextBlockStyle'
      | 'BodyTextBlockStyle'
      | 'BodyStrongTextBlockStyle'
      | 'SubtitleTextBlockStyle'
      | 'TitleTextBlockStyle'
      | 'TitleLargeTextBlockStyle'
      | 'DisplayTextBlockStyle'
    Foreground?: string
    FontSize?: string | number
    FontWeight?: string | number
    TextWrapping?: 'Wrap' | 'NoWrap' | 'WrapWholeWords'
    TextTrimming?: 'None' | 'CharacterEllipsis' | 'WordEllipsis'
    MaxLines?: number
    IsTextSelectionEnabled?: boolean
    HorizontalAlignment?: 'Left' | 'Center' | 'Right' | 'Stretch'
  }>(),
  {
    TextWrapping: 'Wrap',
    TextTrimming: 'None',
    IsTextSelectionEnabled: false,
    HorizontalAlignment: 'Left',
  }
)

const cssLength = (value?: string | number) =>
  value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value

const styleClass = computed(() => {
  switch (props.Style) {
    case 'CaptionTextBlockStyle':
      return 'win-text--caption'
    case 'BodyStrongTextBlockStyle':
      return 'win-text--body-strong'
    case 'SubtitleTextBlockStyle':
      return 'win-text--subtitle'
    case 'TitleTextBlockStyle':
      return 'win-text--title'
    case 'TitleLargeTextBlockStyle':
      return 'win-text--title-large'
    case 'DisplayTextBlockStyle':
      return 'win-text--display'
    default:
      return 'win-text--body'
  }
})

const textStyle = computed(() => ({
  color: props.Foreground,
  fontSize: cssLength(props.FontSize),
  fontWeight: props.FontWeight !== undefined ? String(props.FontWeight) : undefined,
  textAlign: props.HorizontalAlignment.toLowerCase() as 'left' | 'center' | 'right',
  '-webkit-line-clamp': props.MaxLines ?? undefined,
  overflow: props.MaxLines ? 'hidden' : undefined,
  display: props.MaxLines ? ('-webkit-box' as const) : undefined,
  '-webkit-box-orient': props.MaxLines ? ('vertical' as const) : undefined,
  whiteSpace: props.TextWrapping === 'NoWrap' ? 'nowrap' : undefined,
  textOverflow: props.TextTrimming === 'None' ? undefined : 'ellipsis',
  overflowWrap: props.TextWrapping === 'WrapWholeWords' ? 'normal' : 'break-word',
  userSelect: props.IsTextSelectionEnabled ? 'text' : undefined,
}))
</script>

<template>
  <div class="win-text" :class="styleClass" :style="textStyle">
    <slot>{{ Text }}</slot>
  </div>
</template>

<style>
.win-text {
  margin: 0;
  font-family: 'Segoe UI Variable Text', 'Segoe UI', 'Microsoft YaHei UI', system-ui, sans-serif;
  color: inherit;
}
.win-text--caption {
  font-size: 12px;
  line-height: 16px;
}
.win-text--body {
  font-size: 14px;
  line-height: 20px;
}
.win-text--body-strong {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}
.win-text--subtitle {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  font-family: 'Segoe UI Variable Display', 'Segoe UI', 'Microsoft YaHei UI', system-ui, sans-serif;
}
.win-text--title {
  font-size: 28px;
  line-height: 36px;
  font-weight: 600;
  font-family: 'Segoe UI Variable Display', 'Segoe UI', 'Microsoft YaHei UI', system-ui, sans-serif;
}
.win-text--title-large {
  font-size: 40px;
  line-height: 52px;
  font-weight: 600;
  font-family: 'Segoe UI Variable Display', 'Segoe UI', 'Microsoft YaHei UI', system-ui, sans-serif;
}
.win-text--display {
  font-size: 68px;
  line-height: 92px;
  font-weight: 600;
  font-family: 'Segoe UI Variable Display', 'Segoe UI', 'Microsoft YaHei UI', system-ui, sans-serif;
}
</style>
