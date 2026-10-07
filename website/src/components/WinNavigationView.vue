<script setup lang="ts">
/**
 * WinNavigationView —— 顶部导航模式的 NavigationView 复刻。
 * 用 Tag 匹配路由；当前项带底部指示条 + 淡色底。
 */
export interface NavItem {
  Tag: string
  Icon?: string
  Content: string
  /** 额外跳转目标（不参与激活匹配），例如外链 */
  Href?: string
}

const props = withDefaults(
  defineProps<{
    MenuItems?: NavItem[]
    FooterMenuItems?: NavItem[]
    SelectedTag?: string
  }>(),
  { MenuItems: () => [], FooterMenuItems: () => [] }
)

const emit = defineEmits<{ (e: 'itemInvoked', item: NavItem): void }>()

const invoke = (item: NavItem) => emit('itemInvoked', item)
</script>

<template>
  <nav class="win-navview" aria-label="Primary">
    <div class="win-navview__row">
      <div class="win-navview__items">
        <button
          v-for="item in props.MenuItems"
          :key="item.Tag"
          type="button"
          class="win-navview__item"
          :class="{ 'is-selected': item.Tag === SelectedTag }"
          @click="invoke(item)"
        >
          <span v-if="item.Icon" class="icon win-navview__icon" aria-hidden="true">{{ item.Icon }}</span>
          <span class="win-navview__label">{{ item.Content }}</span>
          <span v-if="item.Tag === SelectedTag" class="win-navview__indicator" />
        </button>
      </div>
      <div class="win-navview__footer">
        <button
          v-for="item in props.FooterMenuItems"
          :key="item.Tag"
          type="button"
          class="win-navview__item"
          :class="{ 'is-selected': item.Tag === SelectedTag }"
          @click="invoke(item)"
        >
          <span v-if="item.Icon" class="icon win-navview__icon" aria-hidden="true">{{ item.Icon }}</span>
          <span class="win-navview__label">{{ item.Content }}</span>
          <span v-if="item.Tag === SelectedTag" class="win-navview__indicator" />
        </button>
        <slot name="footer" />
      </div>
    </div>
  </nav>
</template>

<style>
.win-navview {
  width: 100%;
  border-bottom: 1px solid var(--divider-stroke);
  background-color: var(--layer-default);
  backdrop-filter: var(--flyout-backdrop);
  -webkit-backdrop-filter: var(--flyout-backdrop);
  z-index: 20;
}

.win-navview__row {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 16px;
}

.win-navview__items,
.win-navview__footer {
  display: flex;
  align-items: center;
  gap: 2px;
}
.win-navview__footer {
  margin-left: auto;
}

.win-navview__item {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: 14px;
  cursor: default;
  white-space: nowrap;
  transition: background-color var(--fast-duration) var(--fast-out-slow-in);
}
.win-navview__item:hover {
  background-color: var(--subtle-secondary);
  color: var(--text-primary);
}
.win-navview__item.is-selected {
  color: var(--text-primary);
  font-weight: 600;
}
.win-navview__icon {
  font-size: 16px;
}
.win-navview__indicator {
  position: absolute;
  left: 50%;
  bottom: -1px;
  width: 16px;
  height: 3px;
  border-radius: 2px 2px 0 0;
  background-color: var(--accent-base);
  transform: translateX(-50%);
}

@media (max-width: 860px) {
  .win-navview__label {
    display: none;
  }
  .win-navview__item {
    padding: 0 10px;
  }
}
</style>
