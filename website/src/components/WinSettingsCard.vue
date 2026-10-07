<script setup lang="ts">
/**
 * WinSettingsCard —— WinUI 3 SettingsCard 的 Web 复刻。
 * 左侧 HeaderIcon + Header/Description，右侧 ActionIcon / 自定义动作区。
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    Header?: string
    Description?: string
    HeaderIcon?: string
    ActionIcon?: string
    ActionIconToolTip?: string
    IsClickEnabled?: boolean
    ContentAlignment?: 'Right' | 'Left' | 'Vertical'
    IsActionIconVisible?: boolean
    Height?: string | number
    Width?: string | number
  }>(),
  {
    ActionIcon: '\uE974',
    IsClickEnabled: false,
    ContentAlignment: 'Right',
    IsActionIconVisible: true,
  }
)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const cssLength = (value?: string | number) =>
  value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value

const tag = computed(() => (props.IsClickEnabled ? 'button' : 'div'))

/** HeaderIcon 允许传入 HTML 标记（例如一段彩色 SVG） */
const headerIconIsMarkup = computed(
  () => !!props.HeaderIcon && props.HeaderIcon.trim().startsWith('<')
)

const rootStyle = computed(() => ({
  '--settings-card-height': cssLength(props.Height),
  '--settings-card-width': cssLength(props.Width),
}))

const onClick = (ev: MouseEvent) => {
  if (!props.IsClickEnabled) return
  emit('click', ev)
}
</script>

<template>
  <component
    :is="tag"
    class="settings-card"
    :class="[
      `settings-card--align-${ContentAlignment.toLowerCase()}`,
      { 'settings-card--clickable': IsClickEnabled },
    ]"
    :style="rootStyle"
    :type="IsClickEnabled ? 'button' : undefined"
    :role="IsClickEnabled ? undefined : 'group'"
    @click="onClick"
  >
    <div class="settings-card__body">
      <div v-if="HeaderIcon || $slots.HeaderIcon" class="settings-card__icon">
        <slot name="HeaderIcon">
          <span class="icon" aria-hidden="true">{{ HeaderIcon }}</span>
        </slot>
      </div>
      <div class="settings-card__text">
        <div class="settings-card__header">
          <slot name="Header">{{ Header }}</slot>
        </div>
        <div v-if="Description || $slots.Description" class="settings-card__description">
          <slot name="Description">{{ Description }}</slot>
        </div>
      </div>
    </div>

    <div class="settings-card__action">
      <slot />
      <slot name="ActionIcon">
        <span
          v-if="IsActionIconVisible"
          class="icon settings-card__chevron"
          :title="ActionIconToolTip"
          aria-hidden="true"
          >{{ ActionIcon }}</span
        >
      </slot>
    </div>
  </component>
</template>

<style>
.settings-card {
  --settings-card-fill: var(--card-bg);
  --settings-card-stroke: var(--card-stroke);

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: var(--settings-card-width, 100%);
  min-height: var(--settings-card-height, 64px);
  height: var(--settings-card-height, auto);
  padding: 12px 16px;
  text-align: left;
  border: 1px solid var(--settings-card-stroke);
  border-radius: 4px;
  background-color: var(--settings-card-fill);
  color: var(--text-primary);
  font: inherit;
  box-sizing: border-box;
  transition:
    background-color var(--fast-duration) var(--fast-out-slow-in),
    border-color var(--fast-duration) var(--fast-out-slow-in);
}

.settings-card--clickable {
  cursor: default;
}
.settings-card--clickable:hover {
  --settings-card-fill: var(--card-bg-secondary);
  background-color: var(--card-bg-secondary);
}
.settings-card--clickable:active {
  background-color: var(--subtle-tertiary);
}
.settings-card:focus-visible {
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}

.settings-card__body {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex: 1 1 auto;
}

.settings-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  min-width: 20px;
  font-size: 16px;
  color: var(--text-secondary);
}

.settings-card__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.settings-card__header {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
}

.settings-card__description {
  font-size: 12px;
  line-height: 16px;
  color: var(--text-secondary);
}

.settings-card__action {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  color: var(--text-secondary);
}

.settings-card__chevron {
  font-size: 12px;
  color: var(--text-secondary);
}

/* 左对齐内容（ActionIcon 隐藏时用于纯展示卡） */
.settings-card--align-left .settings-card__action {
  order: -1;
}

/* 纵向：描述在动作区上方 */
.settings-card--align-vertical {
  flex-direction: column;
  align-items: stretch;
}
.settings-card--align-vertical .settings-card__action {
  justify-content: flex-start;
}
</style>
