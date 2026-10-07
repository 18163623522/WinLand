<script setup lang="ts">
/** WinDropDownButton —— 下拉按钮（含开合菜单）。 */
import { onBeforeUnmount, ref } from 'vue'

export interface DropDownItem {
  Tag: string
  Content: string
  Icon?: string
  Selected?: boolean
}

withDefaults(
  defineProps<{
    Content?: string
    Items?: DropDownItem[]
    Icon?: string
    Style?: string
  }>(),
  { Items: () => [], Style: 'DefaultButtonStyle' }
)

const emit = defineEmits<{ (e: 'select', item: DropDownItem): void }>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const close = (ev: MouseEvent) => {
  if (root.value && !root.value.contains(ev.target as Node)) open.value = false
}
document.addEventListener('click', close)
onBeforeUnmount(() => document.removeEventListener('click', close))

const pick = (item: DropDownItem) => {
  open.value = false
  emit('select', item)
}
</script>

<template>
  <div ref="root" class="win-dropdown">
    <button
      type="button"
      class="win-dropdown__button"
      :class="Style === 'AccentButtonStyle' ? 'is-accent' : ''"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span v-if="Icon" class="icon win-dropdown__icon" aria-hidden="true">{{ Icon }}</span>
      <span class="win-dropdown__label">{{ Content }}</span>
      <span class="icon win-dropdown__chevron" aria-hidden="true">&#xE70D;</span>
    </button>

    <Transition name="win-dropdown">
      <div v-if="open" class="win-dropdown__menu" role="menu">
        <button
          v-for="item in Items"
          :key="item.Tag"
          type="button"
          class="win-dropdown__item"
          role="menuitem"
          @click="pick(item)"
        >
          <span class="win-dropdown__check icon">
            {{ item.Selected ? '\uE73E' : '' }}
          </span>
          <span v-if="item.Icon" class="icon win-dropdown__itemicon" aria-hidden="true">{{ item.Icon }}</span>
          <span class="win-dropdown__itemlabel">{{ item.Content }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style>
.win-dropdown {
  position: relative;
  display: inline-flex;
}

.win-dropdown__button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 11px;
  border: 1px solid var(--ctrl-border-accent);
  border-radius: 4px;
  background-color: var(--ctrl-fill-default);
  color: var(--text-primary);
  font: inherit;
  font-size: 14px;
  cursor: default;
  transition: background-color var(--fast-duration) var(--fast-out-slow-in);
}
.win-dropdown__button:hover {
  background-color: var(--ctrl-fill-secondary);
}
.win-dropdown__button.is-accent {
  background-color: var(--accent-base);
  border-color: var(--accent-border-accent);
  color: var(--accent-text);
}
.win-dropdown__icon,
.win-dropdown__chevron {
  font-size: 12px;
}
.win-dropdown__chevron {
  font-size: 10px;
  margin-left: 2px;
}

.win-dropdown__menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 200px;
  padding: 4px;
  z-index: 900;
  border: 1px solid var(--flyout-border);
  border-radius: 8px;
  background-color: var(--flyout-bg);
  backdrop-filter: var(--flyout-backdrop);
  -webkit-backdrop-filter: var(--flyout-backdrop);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

.win-dropdown__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 32px;
  padding: 0 8px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--text-primary);
  font: inherit;
  font-size: 14px;
  text-align: left;
  cursor: default;
}
.win-dropdown__item:hover {
  background-color: var(--subtle-secondary);
}
.win-dropdown__check {
  width: 12px;
  min-width: 12px;
  font-size: 11px;
  color: var(--accent-base);
}
.win-dropdown__itemicon {
  font-size: 14px;
  color: var(--text-secondary);
}
.win-dropdown__itemlabel {
  flex: 1 1 auto;
}

.win-dropdown-enter-active,
.win-dropdown-leave-active {
  transition:
    opacity var(--fast-duration) var(--fast-out-slow-in),
    transform var(--fast-duration) var(--ease-out);
  transform-origin: top left;
}
.win-dropdown-enter-from,
.win-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
