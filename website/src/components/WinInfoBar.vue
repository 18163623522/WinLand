<script setup lang="ts">
/** WinInfoBar —— WinUI 3 InfoBar 的 Web 复刻。 */
const props = withDefaults(
  defineProps<{
    Title?: string
    Message?: string
    Severity?: 'Informational' | 'Success' | 'Warning' | 'Error'
    IsOpen?: boolean
    IsClosable?: boolean
    IconGlyph?: string
  }>(),
  {
    Severity: 'Informational',
    IsOpen: true,
    IsClosable: false,
  }
)

const emit = defineEmits<{ (e: 'close'): void }>()

const glyphs: Record<string, string> = {
  Informational: '\uE946',
  Success: '\uE73E',
  Warning: '\uE7BA',
  Error: '\uEA39',
}
</script>

<template>
  <div v-if="IsOpen" class="win-infobar" :class="`win-infobar--${Severity.toLowerCase()}`">
    <span class="icon win-infobar__icon">{{ IconGlyph || glyphs[Severity] }}</span>
    <div class="win-infobar__body">
      <div v-if="Title" class="win-infobar__title">{{ Title }}</div>
      <div v-if="Message || $slots.default" class="win-infobar__message">
        <slot>{{ Message }}</slot>
      </div>
    </div>
    <div v-if="$slots.action" class="win-infobar__action"><slot name="action" /></div>
    <button
      v-if="IsClosable"
      class="win-infobar__close"
      type="button"
      aria-label="Close"
      @click="emit('close')"
    >
      <span class="icon">&#xE711;</span>
    </button>
  </div>
</template>

<style>
.win-infobar {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--card-stroke);
  border-radius: 4px;
  background-color: var(--card-bg);
  color: var(--text-primary);
  font-size: 14px;
  line-height: 20px;
}
.win-infobar__icon {
  font-size: 16px;
  margin-top: 2px;
  flex: 0 0 auto;
}
.win-infobar__body {
  flex: 1 1 auto;
  min-width: 0;
}
.win-infobar__title {
  font-weight: 600;
}
.win-infobar__message {
  color: var(--text-secondary);
}
.win-infobar__action {
  flex: 0 0 auto;
}
.win-infobar__close {
  border: 0;
  background: transparent;
  color: var(--text-secondary);
  cursor: default;
  padding: 2px;
  border-radius: 4px;
}
.win-infobar__close:hover {
  background: var(--subtle-secondary);
}

.win-infobar--informational .win-infobar__icon {
  color: var(--SystemFillColorAttentionBrush);
}
.win-infobar--success {
  background-color: var(--SystemFillColorSuccessBackgroundBrush);
}
.win-infobar--success .win-infobar__icon {
  color: var(--SystemFillColorSuccessBrush);
}
.win-infobar--warning {
  background-color: var(--SystemFillColorCautionBackgroundBrush);
}
.win-infobar--warning .win-infobar__icon {
  color: var(--SystemFillColorCautionBrush);
}
.win-infobar--error {
  background-color: var(--SystemFillColorCriticalBackgroundBrush);
}
.win-infobar--error .win-infobar__icon {
  color: var(--SystemFillColorCriticalBrush);
}
</style>
