<script setup lang="ts">
/**
 * PageHeader —— 每个内页顶部的统一大标题区。
 *
 * 一颗图标芯片 + 标题 + 一段导语，右侧可选插槽放动作按钮。
 * 深色时芯片用品牌渐变，浅色时降到 8% 不透明度，免得刺眼。
 */
import WinTextBlock from '../../components/WinTextBlock.vue'

withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lead?: string
    glyph?: string
  }>(),
  { glyph: '\uE7F4' }
)
</script>

<template>
  <header class="page-header reveal">
    <div class="page-header__chip" aria-hidden="true">
      <span class="icon">{{ glyph }}</span>
    </div>
    <p v-if="eyebrow" class="page-header__eyebrow">{{ eyebrow }}</p>
    <WinTextBlock Style="TitleLargeTextBlockStyle" class="page-header__title">{{ title }}</WinTextBlock>
    <p v-if="lead" class="page-header__lead">{{ lead }}</p>
    <div v-if="$slots.actions" class="page-header__actions">
      <slot name="actions" />
    </div>
    <slot />
  </header>
</template>

<style scoped>
.page-header {
  max-width: 1240px;
  margin: 0 auto;
  padding: 56px 28px 8px;
}

.page-header__chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  margin-bottom: 18px;
  font-size: 20px;
  color: var(--brand-1);
  background: color-mix(in srgb, var(--brand-1) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--brand-1) 22%, transparent);
}

.page-header__eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.page-header__title {
  display: block;
  margin: 0;
  font-size: clamp(28px, 3.4vw, 40px);
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.page-header__lead {
  margin: 16px 0 0;
  max-width: 72ch;
  font-size: 15px;
  line-height: 26px;
  color: var(--text-secondary);
}

.page-header__actions {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
