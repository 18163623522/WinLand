<script setup lang="ts">
/**
 * PageSection —— 内容分节容器。
 *
 * 标题 + 可选副标题 + 右侧动作，下面放内容。
 * 带 `.reveal` 的块会随滚动入场（见 animations.css + useReveal）。
 */
import WinTextBlock from '../../components/WinTextBlock.vue'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    /** 内容区最大宽度，默认与站点栅格一致 */
    width?: 'default' | 'wide' | 'narrow'
    /** 是否给内容套一层卡片底色 */
    surface?: boolean
  }>(),
  { width: 'default', surface: false }
)
</script>

<template>
  <section class="page-section" :class="`page-section--${width}`">
    <div v-if="title || subtitle || $slots.actions" class="page-section__head">
      <div class="page-section__head-text">
        <WinTextBlock v-if="title" Style="TitleTextBlockStyle" class="page-section__title">
          {{ title }}
        </WinTextBlock>
        <p v-if="subtitle" class="page-section__subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="page-section__actions">
        <slot name="actions" />
      </div>
    </div>

    <div class="page-section__body" :class="{ 'is-surface': surface }">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.page-section {
  margin: 0 auto;
  padding: 40px 28px 0;
}

.page-section--narrow {
  max-width: 880px;
}

.page-section--default {
  max-width: 1240px;
}

.page-section--wide {
  max-width: 1440px;
}

.page-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.page-section__title {
  display: block;
  margin: 0;
  font-size: 22px;
  line-height: 30px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.page-section__subtitle {
  margin: 8px 0 0;
  max-width: 76ch;
  font-size: 14px;
  line-height: 23px;
  color: var(--text-secondary);
}

.page-section__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
}

.page-section__body.is-surface {
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}
</style>
