<script setup lang="ts">
/**
 * 首页。
 *
 * 一块 Hero（大标题 + 双 CTA + 关键指标）→ 岛体实机演示（IslandStage，真的能玩）
 * → 四张能力卡 → 内置插件一览 → 技术底座 → 尾部 CTA。
 *
 * 内容是营销语气，但每条都能在源码里找到出处 —— features.ts 里每条功能都带 source 路径。
 */
import { computed, ref } from 'vue'

import WinButton from '../../components/WinButton.vue'
import WinTextBlock from '../../components/WinTextBlock.vue'
import WinBadge from '../../components/WinBadge.vue'
import WinInfoBar from '../../components/WinInfoBar.vue'
import { useReactiveI18n } from '../../components/i18n'

import IslandStage from '../components/IslandStage.vue'
import PageSection from '../components/PageSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { demoActivities } from '../services/demoData'
import { features } from '../services/features'
import { GITHUB_REPO, HOST_VERSION, MIN_WINDOWS, SDK_VERSION, TARGET_FRAMEWORK } from '../services/links'

const { t } = useReactiveI18n()

/* ------------------------------------------------------------ 首页内容 ---- */

/** 首页只挑最有代表性的四张卡，全量在 /features */
const highlightIds = ['content', 'drop', 'style', 'plugin-engine']
const highlights = computed(() =>
  highlightIds
    .map((id) => features.find((entry) => entry.id === id))
    .filter((entry): entry is (typeof features)[number] => Boolean(entry))
)

const stats = computed(() => [
  { value: '5', label: t('home.stats.plugins'), hint: t('home.stats.pluginsHint') },
  { value: '4', label: t('home.playground.tipTitle'), hint: t('home.stats.statesHint') },
  { value: SDK_VERSION, label: t('home.stats.sdk'), hint: t('home.stats.sdkHint') },
  { value: 'MIT', label: t('home.stats.arch'), hint: t('home.stats.licenseHint') },
])

/** 内置插件表：就直接用演示数据里的那五个，名字和优先级和宿主一致 */
const builtinPlugins = computed(() =>
  [...demoActivities]
    .sort((a, b) => b.priority - a.priority)
    .map((activity) => ({
      id: activity.id,
      name: t(`market.${activity.id}.name`),
      glyph: activity.glyph,
      accent: activity.accent,
      priority: activity.priority,
      compact: t(`market.${activity.id}.compact`),
      expanded: t(`market.${activity.id}.expanded`),
    }))
)

const manifestSample = `{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "author": "you",
  "description": "Short line shown in the plugin manager.",
  "api_version": 2,
  "min_host_version": "2.0.0",
  "entry": "MyPlugin.dll",
  "icon": "Assets/icon.png",
  "settings_pages": [
    { "id": "main", "title": "My Plugin", "order": 200 }
  ]
}`

/* --------------------------------------------------------------- 演示状态 ---- */

// 首页的演示区给一个「外观切换」小工具，让访客不动摇就看出两套风格差别
const demoStyle = ref<'apple' | 'fluent'>('apple')
const demoMaterial = ref<'acrylic' | 'mica'>('acrylic')
const demoLight = ref(false)
const demoPosition = ref<'top' | 'bottom'>('top')

const styleOptions = computed(() => [
  { value: 'apple' as const, label: t('islandPage.styleApple'), glyph: '\uE8A7' },
  { value: 'fluent' as const, label: t('islandPage.styleFluent'), glyph: '\uE790' },
])

const openRepo = () => window.open(GITHUB_REPO, '_blank', 'noopener,noreferrer')
</script>

<template>
  <div class="home">
    <!-- ==================================================== Hero ==== -->
    <section class="home-hero">
      <div class="home-hero__glow" aria-hidden="true" />

      <div class="home-hero__inner">
        <div class="home-hero__copy">
          <div class="home-hero__badge">
            <WinBadge Content="v2.3.1" Severity="Accent" />
            <span>{{ t('home.hero.badge') }}</span>
          </div>

          <h1 class="home-hero__title">
            <span>{{ t('home.hero.title1') }}</span>
            <span class="home-hero__title-accent">{{ t('home.hero.title2') }}</span>
          </h1>

          <p class="home-hero__lead">{{ t('home.hero.lead') }}</p>

          <div class="home-hero__cta">
            <WinButton Style="AccentButtonStyle" Padding="20,10" @click="$router.push('/download')">
              <span class="icon" aria-hidden="true">&#xE896;</span>
              <span>{{ t('home.hero.ctaPrimary') }}</span>
            </WinButton>
            <WinButton Padding="20,10" @click="$router.push('/island')">
              <span class="icon" aria-hidden="true">&#xE7F4;</span>
              <span>{{ t('home.hero.ctaSecondary') }}</span>
            </WinButton>
            <WinButton Style="SubtleButtonStyle" Padding="14,10" @click="$router.push('/features')">
              <span>{{ t('home.hero.ctaTertiary') }}</span>
              <span class="icon" aria-hidden="true">&#xE72A;</span>
            </WinButton>
          </div>

          <ul class="home-hero__meta">
            <li><span class="icon" aria-hidden="true">&#xE73E;</span>{{ MIN_WINDOWS }}</li>
            <li><span class="icon" aria-hidden="true">&#xE73E;</span>{{ TARGET_FRAMEWORK }}</li>
            <li><span class="icon" aria-hidden="true">&#xE73E;</span>{{ t('home.hero.meta3') }}</li>
          </ul>
        </div>

        <div class="home-hero__art">
          <div class="home-hero__art-card">
            <span class="home-hero__art-label">{{ t('home.hero.meta1') }}</span>
            <div class="home-hero__art-island">
              <span class="home-hero__art-dot" />
              <span class="home-hero__art-bar" />
              <span class="home-hero__art-text">{{ t('island.demo.media.compact') }}</span>
            </div>
            <div class="home-hero__art-rows">
              <div v-for="plugin in builtinPlugins.slice(0, 4)" :key="plugin.id" class="home-hero__art-row">
                <span class="home-hero__art-glyph icon" :style="{ color: plugin.accent }">{{ plugin.glyph }}</span>
                <span class="home-hero__art-name">{{ plugin.name }}</span>
                <span class="home-hero__art-prio">{{ plugin.priority }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="home-hero__stats">
        <div v-for="stat in stats" :key="stat.label" class="home-hero__stat">
          <span class="home-hero__stat-value">{{ stat.value }}</span>
          <span class="home-hero__stat-label">{{ stat.label }}</span>
          <span class="home-hero__stat-hint">{{ stat.hint }}</span>
        </div>
      </div>
    </section>

    <!-- ============================================ 岛体实机演示 ==== -->
    <PageSection
      width="wide"
      :title="t('home.playground.title')"
      :subtitle="t('home.playground.lead')"
    >
      <template #actions>
        <div class="home-demo__style-switch" role="radiogroup" :aria-label="t('islandPage.style')">
          <button
            v-for="option in styleOptions"
            :key="option.value"
            type="button"
            role="radio"
            :aria-checked="demoStyle === option.value"
            class="home-demo__style-btn"
            :class="{ 'is-on': demoStyle === option.value }"
            @click="demoStyle = option.value"
          >
            <span class="icon" aria-hidden="true">{{ option.glyph }}</span>
            <span>{{ option.label }}</span>
          </button>
        </div>
      </template>

      <IslandStage
        :style="demoStyle"
        :material="demoMaterial"
        :light="demoLight"
        :position="demoPosition"
        :stage-height="470"
      />

      <WinInfoBar
        class="home-demo__tip"
        Severity="Informational"
        :Title="t('home.playground.tipTitle')"
        :Message="t('home.playground.tip')"
        :IsOpen="true"
      />
    </PageSection>

    <!-- ================================================= 能力卡 ==== -->
    <PageSection
      width="wide"
      :title="t('home.features.title')"
      :subtitle="t('home.features.subtitle')"
    >
      <template #actions>
        <WinButton Style="SubtleButtonStyle" @click="$router.push('/features')">
          <span>{{ t('common.viewAll') }}</span>
          <span class="icon" aria-hidden="true">&#xE72A;</span>
        </WinButton>
      </template>

      <div class="site-grid site-grid--wide">
        <article
          v-for="entry in highlights"
          :key="entry.id"
          v-reveal
          class="site-card is-interactive"
          :style="{ '--card-accent': entry.accent }"
          @click="$router.push(`/features#${entry.id}`)"
        >
          <span class="site-card__glyph icon" aria-hidden="true">{{ entry.glyph }}</span>
          <h3 class="site-card__title">{{ t(`feat.${entry.id}.name`) }}</h3>
          <p class="site-card__body">{{ t(`feat.${entry.id}.desc`) }}</p>
          <span class="site-card__meta">{{ entry.source }}</span>
        </article>
      </div>
    </PageSection>

    <!-- ============================================ 内置插件一览 ==== -->
    <PageSection
      width="wide"
      :title="t('home.plugins.title')"
      :subtitle="t('home.plugins.subtitle')"
    >      <template #actions>
        <WinButton Style="SubtleButtonStyle" @click="$router.push('/market')">
          <span>{{ t('home.plugins.cta') }}</span>
          <span class="icon" aria-hidden="true">&#xE72A;</span>
        </WinButton>
      </template>

      <div class="site-table-wrap">
        <table class="site-table">
          <thead>
            <tr>
              <th>{{ t('marketPage.col.plugin') }}</th>
              <th class="site-table__nowrap">Priority</th>
              <th>{{ t('marketPage.col.compact') }}</th>
              <th>{{ t('marketPage.col.expanded') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="plugin in builtinPlugins" :key="plugin.id">
              <td class="site-table__nowrap">
                <span class="home-plugin__name">
                  <span class="icon" :style="{ color: plugin.accent }" aria-hidden="true">{{ plugin.glyph }}</span>
                  {{ plugin.name }}
                </span>
              </td>
              <td class="site-table__nowrap"><span class="site-chip site-chip--mono">{{ plugin.priority }}</span></td>
              <td>{{ plugin.compact }}</td>
              <td>{{ plugin.expanded }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="home-plugins__note">{{ t('home.plugins.note') }}</p>
    </PageSection>

    <!-- ================================================ 技术底座 ==== -->
    <PageSection width="wide" :title="t('home.stack.title')" :subtitle="t('home.stack.subtitle')">
      <div class="home-stack">
        <div class="home-stack__text">
          <ul class="home-stack__list">
            <li v-for="index in 5" :key="index">
              <span class="icon" aria-hidden="true">&#xE73E;</span>
              <span>{{ t(`home.stack.item${index}`) }}</span>
            </li>
          </ul>

          <div class="home-stack__actions">
            <WinButton Padding="18,10" @click="$router.push('/plugins')">
              <span class="icon" aria-hidden="true">&#xEA86;</span>
              <span>{{ t('home.stack.ctaPlugin') }}</span>
            </WinButton>
            <WinButton Style="SubtleButtonStyle" @click="$router.push('/about')">
              <span>{{ t('home.stack.ctaAbout') }}</span>
              <span class="icon" aria-hidden="true">&#xE72A;</span>
            </WinButton>
          </div>
        </div>

        <div class="home-stack__code">
          <p class="home-stack__code-label">{{ t('home.stack.manifestLabel') }}</p>
          <CodeBlock :code="manifestSample" filename="plugin.json" lang="json" />
        </div>
      </div>
    </PageSection>

    <!-- ================================================ 尾部 CTA ==== -->
    <section class="home-cta">
      <div class="home-cta__card">
        <div class="home-cta__glow" aria-hidden="true" />
        <WinTextBlock Style="TitleTextBlockStyle" class="home-cta__title">{{ t('home.final.title') }}</WinTextBlock>
        <p class="home-cta__lead">{{ t('home.final.lead') }}</p>
        <div class="home-cta__actions">
          <WinButton Style="AccentButtonStyle" Padding="20,10" @click="$router.push('/download')">
            <span class="icon" aria-hidden="true">&#xE896;</span>
            <span>{{ t('home.final.cta') }}</span>
          </WinButton>
          <WinButton Padding="20,10" @click="openRepo">
            <span class="icon" aria-hidden="true">&#xE943;</span>
            <span>{{ t('home.final.ctaRepo') }}</span>
          </WinButton>
        </div>
        <p class="home-cta__note">{{ t('home.final.note') }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ==================================================== Hero ==== */

.home-hero {
  position: relative;
  overflow: hidden;
  padding: 72px 28px 56px;
}

.home-hero__glow {
  position: absolute;
  inset: -30% -10% auto -10%;
  height: 620px;
  pointer-events: none;
  background:
    radial-gradient(48% 55% at 22% 32%, color-mix(in srgb, var(--brand-1) 26%, transparent), transparent 70%),
    radial-gradient(42% 50% at 78% 22%, color-mix(in srgb, var(--brand-2) 22%, transparent), transparent 72%),
    radial-gradient(36% 44% at 55% 62%, color-mix(in srgb, var(--brand-3) 16%, transparent), transparent 76%);
  filter: blur(6px);
  animation: brand-drift 18s ease-in-out infinite alternate;
}

.home-hero__inner {
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 56px;
  align-items: center;
}

.home-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 12.5px;
  color: var(--text-secondary);
}

.home-hero__title {
  margin: 0;
  font-size: clamp(34px, 5vw, 58px);
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.home-hero__title span {
  display: block;
}

.home-hero__title-accent {
  background: linear-gradient(100deg, var(--brand-1), var(--brand-2) 55%, var(--brand-3));
  background-size: 220% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient-pan 9s ease-in-out infinite alternate;
}

.home-hero__lead {
  margin: 22px 0 0;
  max-width: 62ch;
  font-size: 16px;
  line-height: 28px;
  color: var(--text-secondary);
}

.home-hero__cta {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.home-hero__meta {
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}

.home-hero__meta li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  color: var(--text-tertiary);
}

.home-hero__meta .icon {
  font-size: 11px;
  color: var(--brand-3);
}

/* 右侧小卡：拿内置插件当"产品截图" */
.home-hero__art {
  display: flex;
  justify-content: center;
}

.home-hero__art-card {
  width: 100%;
  max-width: 340px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
  box-shadow: 0 1px 2px rgb(0 0 0 / 6%), 0 18px 44px rgb(0 0 0 / 10%);
  backdrop-filter: var(--flyout-backdrop);
}

.home-hero__art-label {
  display: block;
  margin-bottom: 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.home-hero__art-island {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  background: #000;
  color: #fff;
}

.home-hero__art-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff453a;
  animation: battery-pulse 1.8s ease-in-out infinite;
}

.home-hero__art-bar {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, #fff 42%, rgb(255 255 255 / 22%) 42%);
}

.home-hero__art-text {
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
}

.home-hero__art-rows {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.home-hero__art-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 8px;
  border-radius: 8px;
  font-size: 12.5px;
  color: var(--text-secondary);
}

.home-hero__art-row:hover {
  background: var(--subtle-secondary);
}

.home-hero__art-glyph {
  font-size: 14px;
}

.home-hero__art-name {
  flex: 1;
  color: var(--text-primary);
}

.home-hero__art-prio {
  font-family: var(--mono-font);
  font-size: 11px;
  color: var(--text-tertiary);
}

/* 指标条 */
.home-hero__stats {
  position: relative;
  max-width: 1240px;
  margin: 56px auto 0;
  padding: 22px 28px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  border-radius: 16px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  backdrop-filter: var(--flyout-backdrop);
}

.home-hero__stat {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.home-hero__stat-value {
  font-size: 26px;
  line-height: 32px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.home-hero__stat-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.home-hero__stat-hint {
  font-size: 11.5px;
  line-height: 17px;
  color: var(--text-tertiary);
}

/* ============================================ 演示区 ==== */

.home-demo__style-switch {
  display: inline-flex;
  padding: 3px;
  border-radius: 999px;
  border: 1px solid var(--card-stroke);
  background: var(--subtle-secondary);
}

.home-demo__style-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 0;
  border-radius: 999px;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-secondary);
  background: transparent;
  cursor: pointer;
  transition: background-color var(--faster-duration) linear, color var(--faster-duration) linear;
}

.home-demo__style-btn.is-on {
  color: var(--text-primary);
  background: var(--ctrl-fill-secondary);
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
}

.home-demo__tip {
  margin-top: 16px;
}

/* ================================================ 插件表 ==== */

.home-plugin__name {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-primary);
}

.home-plugins__note {
  margin: 14px 0 0;
  font-size: 12.5px;
  line-height: 20px;
  color: var(--text-tertiary);
}

/* ================================================ 技术底座 ==== */

.home-stack {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
}

.home-stack__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.home-stack__list li {
  display: flex;
  gap: 10px;
  font-size: 14px;
  line-height: 23px;
  color: var(--text-secondary);
}

.home-stack__list .icon {
  margin-top: 5px;
  font-size: 11px;
  color: var(--brand-1);
}

.home-stack__actions {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.home-stack__code-label {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

/* ================================================ 尾部 CTA ==== */

.home-cta {
  max-width: 1240px;
  margin: 72px auto 0;
  padding: 0 28px;
}

.home-cta__card {
  position: relative;
  overflow: hidden;
  padding: 48px 40px;
  border-radius: 20px;
  border: 1px solid color-mix(in srgb, var(--brand-1) 24%, var(--card-stroke));
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  text-align: center;
}

.home-cta__glow {
  position: absolute;
  inset: -60% -20% auto -20%;
  height: 420px;
  pointer-events: none;
  background:
    radial-gradient(50% 60% at 30% 40%, color-mix(in srgb, var(--brand-1) 22%, transparent), transparent 70%),
    radial-gradient(46% 56% at 72% 34%, color-mix(in srgb, var(--brand-2) 18%, transparent), transparent 72%);
}

.home-cta__title {
  position: relative;
  display: block;
  margin: 0;
  font-size: clamp(22px, 2.6vw, 30px);
  line-height: 1.24;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.home-cta__lead {
  position: relative;
  margin: 14px auto 0;
  max-width: 60ch;
  font-size: 14.5px;
  line-height: 25px;
  color: var(--text-secondary);
}

.home-cta__actions {
  position: relative;
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.home-cta__note {
  position: relative;
  margin: 18px 0 0;
  font-size: 12px;
  color: var(--text-tertiary);
}

/* ================================================ 响应式 ==== */

@media (max-width: 1000px) {
  .home-hero__inner,
  .home-stack {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }

  .home-hero__art {
    order: -1;
  }

  .home-hero__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .home-hero {
    padding: 48px 20px 40px;
  }

  .home-hero__stats {
    padding: 18px 20px;
  }

  .home-cta__card {
    padding: 36px 22px;
  }
}
</style>
