<script setup lang="ts">
/** 404 页。样式与站点一致，给回首页/功能/下载三条路。 */
import WinButton from '../../components/WinButton.vue'
import WinTextBlock from '../../components/WinTextBlock.vue'
import { useReactiveI18n } from '../../components/i18n'

const { t } = useReactiveI18n()
</script>

<template>
  <div class="not-found">
    <div class="not-found__glow" aria-hidden="true" />
    <div class="not-found__inner">
      <span class="not-found__glyph icon" aria-hidden="true">&#xE7BA;</span>
      <WinTextBlock Style="DisplayTextBlockStyle" class="not-found__code">404</WinTextBlock>
      <p class="not-found__title">{{ t('notFound.title') }}</p>
      <p class="not-found__lead">{{ t('notFound.lead') }}</p>
      <div class="not-found__actions">
        <WinButton Style="AccentButtonStyle" Padding="20,10" @click="$router.push('/')">
          <span class="icon" aria-hidden="true">&#xE80F;</span>
          <span>{{ t('notFound.home') }}</span>
        </WinButton>
        <WinButton Padding="20,10" @click="$router.push('/features')">
          <span>{{ t('nav.features') }}</span>
        </WinButton>
        <WinButton Style="SubtleButtonStyle" Padding="14,10" @click="$router.push('/download')">
          <span>{{ t('common.download') }}</span>
        </WinButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 320px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 28px;
}

.not-found__glow {
  position: absolute;
  inset: 10% 10% auto 10%;
  height: 420px;
  pointer-events: none;
  background:
    radial-gradient(46% 54% at 34% 40%, color-mix(in srgb, var(--brand-1) 20%, transparent), transparent 70%),
    radial-gradient(42% 50% at 68% 34%, color-mix(in srgb, var(--brand-2) 16%, transparent), transparent 72%);
}

.not-found__inner {
  position: relative;
  max-width: 560px;
  text-align: center;
}

.not-found__glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  font-size: 24px;
  color: var(--brand-1);
  background: color-mix(in srgb, var(--brand-1) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--brand-1) 22%, transparent);
}

.not-found__code {
  display: block;
  margin: 20px 0 0;
  font-size: clamp(48px, 9vw, 84px);
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.04em;
  background: linear-gradient(100deg, var(--brand-1), var(--brand-2) 60%, var(--brand-3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.not-found__title {
  margin: 16px 0 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.not-found__lead {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--text-secondary);
}

.not-found__actions {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
</style>
