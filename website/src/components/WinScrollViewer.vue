<script setup lang="ts">
/** WinScrollViewer —— 带 Fluent 滚动条的滚动容器。 */
withDefaults(
  defineProps<{
    VerticalScrollBarVisibility?: 'Auto' | 'Visible' | 'Hidden' | 'Disabled'
    HorizontalScrollBarVisibility?: 'Auto' | 'Visible' | 'Hidden' | 'Disabled'
    Padding?: string | number
  }>(),
  {
    VerticalScrollBarVisibility: 'Auto',
    HorizontalScrollBarVisibility: 'Disabled',
  }
)

const cssLength = (value?: string | number) =>
  value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value
</script>

<template>
  <div
    class="win-scrollviewer"
    :class="{
      'is-v-visible': VerticalScrollBarVisibility === 'Visible',
      'is-v-hidden': VerticalScrollBarVisibility === 'Hidden' || VerticalScrollBarVisibility === 'Disabled',
      'is-h-auto': HorizontalScrollBarVisibility === 'Auto' || HorizontalScrollBarVisibility === 'Visible',
    }"
    :style="{ padding: cssLength(Padding) }"
  >
    <div class="win-scrollviewer__content">
      <slot />
    </div>
  </div>
</template>

<style>
.win-scrollviewer {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
}
.win-scrollviewer.is-v-visible {
  overflow-y: scroll;
}
.win-scrollviewer.is-v-hidden {
  overflow-y: hidden;
}
.win-scrollviewer.is-h-auto {
  overflow-x: auto;
}
.win-scrollviewer__content {
  min-height: 100%;
}
</style>
