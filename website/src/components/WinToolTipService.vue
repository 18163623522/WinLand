<script setup lang="ts">
/** WinToolTipService —— 轻量悬浮提示（对应 WinUI ToolTipService）。 */
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    Content?: string
    Placement?: 'Top' | 'Bottom' | 'Left' | 'Right'
    Delay?: number
  }>(),
  { Placement: 'Top', Delay: 400 }
)

const visible = ref(false)
let timer: number | undefined

const show = () => {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (visible.value = true), props.Delay)
}
const hide = () => {
  window.clearTimeout(timer)
  visible.value = false
}
</script>

<template>
  <span class="win-tooltip-host" @mouseenter="show" @mouseleave="hide" @focusin="show" @focusout="hide">
    <slot />
    <Transition name="win-tooltip">
      <span
        v-if="visible && Content"
        class="win-tooltip"
        :class="`win-tooltip--${Placement.toLowerCase()}`"
        role="tooltip"
      >
        {{ Content }}
      </span>
    </Transition>
  </span>
</template>

<style>
.win-tooltip-host {
  position: relative;
  display: inline-flex;
}
.win-tooltip {
  position: absolute;
  z-index: 1200;
  max-width: 300px;
  padding: 5px 9px;
  border: 1px solid var(--flyout-border);
  border-radius: 4px;
  background-color: var(--flyout-bg);
  backdrop-filter: var(--flyout-backdrop);
  -webkit-backdrop-filter: var(--flyout-backdrop);
  color: var(--text-primary);
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
}
.win-tooltip--top {
  left: 50%;
  bottom: calc(100% + 8px);
  transform: translateX(-50%);
}
.win-tooltip--bottom {
  left: 50%;
  top: calc(100% + 8px);
  transform: translateX(-50%);
}
.win-tooltip--left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}
.win-tooltip--right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.win-tooltip-enter-active,
.win-tooltip-leave-active {
  transition: opacity var(--fast-duration) var(--fast-out-slow-in);
}
.win-tooltip-enter-from,
.win-tooltip-leave-to {
  opacity: 0;
}
</style>
