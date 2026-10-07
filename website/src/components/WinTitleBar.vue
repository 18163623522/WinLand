<script setup lang="ts">
/** WinTitleBar —— 自绘标题栏（左：图标 + 标题，右：自定义动作区）。 */
withDefaults(
  defineProps<{
    Title?: string
    Subtitle?: string
    IconGlyph?: string
    IsBackButtonVisible?: boolean
  }>(),
  { IconGlyph: '\uE7F4', IsBackButtonVisible: false }
)

const emit = defineEmits<{ (e: 'back'): void }>()
</script>

<template>
  <header class="win-titlebar">
    <button
      v-if="IsBackButtonVisible"
      class="win-titlebar__back"
      type="button"
      aria-label="Back"
      @click="emit('back')"
    >
      <span class="icon">&#xE72B;</span>
    </button>

    <div class="win-titlebar__brand">
      <slot name="left">
        <span class="win-titlebar__icon icon" aria-hidden="true">{{ IconGlyph }}</span>
        <div class="win-titlebar__text">
          <div class="win-titlebar__title">{{ Title }}</div>
          <div v-if="Subtitle" class="win-titlebar__subtitle">{{ Subtitle }}</div>
        </div>
      </slot>
    </div>

    <div class="win-titlebar__spacer" />

    <div class="win-titlebar__actions">
      <slot name="right" />
      <slot />
    </div>
  </header>
</template>

<style>
.win-titlebar {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 48px;
  min-height: 48px;
  padding: 0 16px;
  border-bottom: 1px solid var(--divider-stroke);
  background-color: var(--layer-default);
  backdrop-filter: var(--flyout-backdrop);
  -webkit-backdrop-filter: var(--flyout-backdrop);
  z-index: 30;
}

.win-titlebar__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--text-primary);
  font-size: 14px;
  cursor: default;
}
.win-titlebar__back:hover {
  background-color: var(--subtle-secondary);
}

.win-titlebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.win-titlebar__icon {
  font-size: 16px;
  color: var(--accent-base);
}
.win-titlebar__text {
  min-width: 0;
}
.win-titlebar__title {
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.win-titlebar__subtitle {
  font-size: 11px;
  line-height: 14px;
  color: var(--text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.win-titlebar__spacer {
  flex: 1 1 auto;
}
.win-titlebar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

@media (max-width: 720px) {
  .win-titlebar__subtitle {
    display: none;
  }
}
</style>
