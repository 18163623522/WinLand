<script setup lang="ts">
/** WinBadge —— 小号状态标签（用于「新」「Beta」「内置」这类角标）。 */
withDefaults(
  defineProps<{
    Content?: string
    Severity?: 'Accent' | 'Success' | 'Caution' | 'Critical' | 'Neutral'
  }>(),
  { Severity: 'Accent' }
)
</script>

<template>
  <span class="win-badge" :class="`win-badge--${Severity.toLowerCase()}`">
    <slot>{{ Content }}</slot>
  </span>
</template>

<style>
.win-badge {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  font-size: 11px;
  line-height: 1;
  font-weight: 600;
  white-space: nowrap;
}
.win-badge--accent {
  background-color: color-mix(in srgb, var(--accent-base) 16%, transparent);
  color: var(--accent-base);
}
.win-badge--success {
  background-color: var(--SystemFillColorSuccessBackgroundBrush);
  color: var(--SystemFillColorSuccessBrush);
}
.win-badge--caution {
  background-color: var(--SystemFillColorCautionBackgroundBrush);
  color: var(--SystemFillColorCautionBrush);
}
.win-badge--critical {
  background-color: var(--SystemFillColorCriticalBackgroundBrush);
  color: var(--SystemFillColorCriticalBrush);
}
.win-badge--neutral {
  background-color: var(--subtle-secondary);
  color: var(--text-secondary);
}
</style>
