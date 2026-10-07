<script setup lang="ts">
/** WinProgressBar —— 确定/不确定进度条。 */
withDefaults(
  defineProps<{
    Value?: number
    Maximum?: number
    IsIndeterminate?: boolean
    ShowError?: boolean
    ShowPaused?: boolean
  }>(),
  { Value: 0, Maximum: 100 }
)
</script>

<template>
  <div
    class="win-progressbar"
    :class="{ 'is-indeterminate': IsIndeterminate, 'is-error': ShowError, 'is-paused': ShowPaused }"
    role="progressbar"
    :aria-valuenow="IsIndeterminate ? undefined : Value"
    :aria-valuemax="Maximum"
  >
    <div
      class="win-progressbar__fill"
      :style="{ width: IsIndeterminate ? '40%' : `${Math.min(100, (Value / Maximum) * 100)}%` }"
    />
  </div>
</template>

<style>
.win-progressbar {
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: var(--ctrl-strong-fill);
  opacity: 0.9;
  overflow: hidden;
}
.win-progressbar__fill {
  height: 100%;
  border-radius: 2px;
  background-color: var(--accent-base);
  transition: width var(--normal-duration) var(--fast-out-slow-in);
}
.win-progressbar.is-error .win-progressbar__fill {
  background-color: var(--SystemFillColorCriticalBrush);
}
.win-progressbar.is-paused .win-progressbar__fill {
  background-color: var(--SystemFillColorCautionBrush);
}
.win-progressbar.is-indeterminate .win-progressbar__fill {
  animation: win-indeterminate 1.6s var(--fast-out-slow-in) infinite;
}
@keyframes win-indeterminate {
  0% {
    transform: translateX(-110%);
  }
  100% {
    transform: translateX(260%);
  }
}
</style>
