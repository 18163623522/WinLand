<script setup lang="ts">
/**
 * 关于页。
 *
 * 作者与许可、两个仓库、技术栈清单、FAQ（可折叠）、更新记录、致谢。
 * FAQ 的答案都是从 README / PLUGIN.md 里摘的实话 —— 包括"插件没有沙箱"这种不讨好的。
 */
import { computed } from 'vue'

import WinButton from '../../components/WinButton.vue'
import WinInfoBar from '../../components/WinInfoBar.vue'
import WinTextBlock from '../../components/WinTextBlock.vue'
import { useReactiveI18n } from '../../components/i18n'

import PageHeader from '../components/PageHeader.vue'
import PageSection from '../components/PageSection.vue'
import {
  GITHUB_ISSUES,
  GITHUB_REPO,
  GITCODE_REPO,
  HOST_VERSION,
  LICENSE_NAME,
  MIN_WINDOWS,
  SDK_VERSION,
  TARGET_FRAMEWORK,
} from '../services/links'

const { t } = useReactiveI18n()

/* --------------------------------------------------------------- 项目信息 ---- */

const facts = computed(() => [
  { label: t('aboutPage.fact.version'), value: `v${HOST_VERSION}` },
  { label: t('aboutPage.fact.sdk'), value: SDK_VERSION },
  { label: t('aboutPage.fact.tfm'), value: TARGET_FRAMEWORK },
  { label: t('aboutPage.fact.minOs'), value: MIN_WINDOWS },
  { label: t('aboutPage.fact.license'), value: LICENSE_NAME },
  { label: t('aboutPage.fact.lang'), value: 'C# · XAML · WinUI 3' },
])

const repos = computed(() => [
  {
    name: t('aboutPage.repo'),
    glyph: '\uE943',
    desc: t('aboutPage.repoDesc'),
    url: GITHUB_REPO,
    accent: 'var(--brand-1)',
  },
  {
    name: t('aboutPage.pluginRepo'),
    glyph: '\uEA86',
    desc: t('aboutPage.pluginRepoDesc'),
    url: `${GITHUB_REPO}/tree/master/samples`,
    accent: 'var(--brand-2)',
  },
  {
    name: 'GitCode',
    glyph: '\uE774',
    desc: t('aboutPage.gitcodeDesc'),
    url: GITCODE_REPO,
    accent: 'var(--brand-3)',
  },
  {
    name: t('aboutPage.issues'),
    glyph: '\uE7BA',
    desc: t('aboutPage.issuesDesc'),
    url: GITHUB_ISSUES,
    accent: 'var(--text-secondary)',
  },
])

const stack = computed(() => [
  { name: 'WinUI 3', note: t('aboutPage.stack.winui') },
  { name: 'Windows App SDK 1.7+', note: t('aboutPage.stack.appsdk') },
  { name: '.NET 10', note: t('aboutPage.stack.net') },
  { name: 'C# / XAML', note: t('aboutPage.stack.csharp') },
  { name: 'Composition API', note: t('aboutPage.stack.composition') },
  { name: 'Shell_NotifyIcon', note: t('aboutPage.stack.tray') },
  { name: 'UI Automation', note: t('aboutPage.stack.uia') },
  { name: 'Inno Setup', note: t('aboutPage.stack.installer') },
])

const faqs = computed(() => [1, 2, 3, 4, 5].map((index) => ({
  q: t(`aboutPage.faq.q${index}`),
  a: t(`aboutPage.faq.a${index}`),
})))

const changelog = computed(() => [
  { version: '2.3.1', date: '2026-09', items: [1, 2, 3].map((i) => t(`aboutPage.log.v231.i${i}`)) },
  { version: '2.2.0', date: '2026-07', items: [1, 2, 3].map((i) => t(`aboutPage.log.v220.i${i}`)) },
  { version: '2.1.0', date: '2026-05', items: [1, 2, 3].map((i) => t(`aboutPage.log.v210.i${i}`)) },
  { version: '2.0.0', date: '2026-03', items: [1, 2, 3].map((i) => t(`aboutPage.log.v200.i${i}`)) },
])

const openLink = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')
</script>

<template>
  <div class="about-page">
    <PageHeader
      :eyebrow="t('aboutPage.eyebrow')"
      :title="t('aboutPage.title')"
      :lead="t('aboutPage.lead')"
      glyph="&#xE946;"
    >
      <template #actions>
        <WinButton Style="AccentButtonStyle" Padding="18,10" @click="openLink(GITHUB_REPO)">
          <span class="icon" aria-hidden="true">&#xE943;</span>
          <span>{{ t('aboutPage.ctaRepo') }}</span>
        </WinButton>
        <WinButton Padding="18,10" @click="$router.push('/download')">
          <span class="icon" aria-hidden="true">&#xE896;</span>
          <span>{{ t('common.download') }}</span>
        </WinButton>
      </template>
    </PageHeader>

    <!-- ==================================================== 作者 ==== -->
    <PageSection width="wide" :title="t('aboutPage.authorTitle')">
      <div class="about-author">
        <div class="about-author__card">
          <div class="about-author__avatar" aria-hidden="true">luolan</div>
          <div>
            <WinTextBlock Style="SubtitleTextBlockStyle" class="about-author__name">
              {{ t('aboutPage.author') }}
            </WinTextBlock>
            <p class="about-author__desc">{{ t('aboutPage.authorDesc') }}</p>
          </div>
        </div>

        <dl class="about-facts">
          <div v-for="row in facts" :key="row.label" class="about-facts__row">
            <dt>{{ row.label }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
        </dl>
      </div>
    </PageSection>

    <!-- ==================================================== 仓库 ==== -->
    <PageSection width="wide" :title="t('aboutPage.reposTitle')" :subtitle="t('aboutPage.reposLead')">
      <div class="site-grid site-grid--wide">
        <a
          v-for="repo in repos"
          :key="repo.name"
          v-reveal
          class="site-card is-interactive about-repo"
          :href="repo.url"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span class="site-card__glyph icon" :style="{ color: repo.accent }" aria-hidden="true">{{ repo.glyph }}</span>
          <h3 class="site-card__title">{{ repo.name }}</h3>
          <p class="site-card__body">{{ repo.desc }}</p>
          <span class="about-repo__go">
            <span>{{ t('common.learnMore') }}</span>
            <span class="icon" aria-hidden="true">&#xE8A7;</span>
          </span>
        </a>
      </div>
    </PageSection>

    <!-- ==================================================== 技术栈 ==== -->
    <PageSection width="wide" :title="t('aboutPage.stackTitle')" :subtitle="t('aboutPage.stackLead')">
      <div class="about-stack">
        <div v-for="item in stack" :key="item.name" class="about-stack__item">
          <span class="about-stack__name">{{ item.name }}</span>
          <span class="about-stack__note">{{ item.note }}</span>
        </div>
      </div>

      <WinInfoBar
        class="about-page__bar"
        Severity="Informational"
        :Title="t('aboutPage.websiteTitle')"
        :Message="t('aboutPage.website')"
        :IsOpen="true"
      />
    </PageSection>

    <!-- ==================================================== FAQ ==== -->
    <PageSection :title="t('aboutPage.faqTitle')" width="narrow" :subtitle="t('aboutPage.faqLead')">
      <div id="faq" class="about-page__anchor" />
      <div class="about-faq">
        <details v-for="(item, index) in faqs" :key="item.q" class="about-faq__item">
          <summary>
            <span class="about-faq__index">Q{{ index + 1 }}</span>
            <span class="about-faq__q">{{ item.q }}</span>
            <span class="icon about-faq__chevron" aria-hidden="true">&#xE70D;</span>
          </summary>
          <p class="about-faq__a">{{ item.a }}</p>
        </details>
      </div>
    </PageSection>

    <!-- ================================================ 更新记录 ==== -->
    <PageSection :title="t('aboutPage.logTitle')" width="narrow" :subtitle="t('aboutPage.logLead')">
      <div id="changelog" class="about-page__anchor" />
      <ol class="about-log">
        <li v-for="release in changelog" :key="release.version" class="about-log__item">
          <div class="about-log__head">
            <span class="about-log__version">v{{ release.version }}</span>
            <span class="about-log__date">{{ release.date }}</span>
          </div>
          <ul class="about-log__list">
            <li v-for="line in release.items" :key="line">
              <span class="icon" aria-hidden="true">&#xE73E;</span>
              <span>{{ line }}</span>
            </li>
          </ul>
        </li>
      </ol>
    </PageSection>

    <!-- ==================================================== 致谢 ==== -->
    <PageSection width="narrow">
      <div class="about-thanks">
        <WinTextBlock Style="BodyStrongTextBlockStyle" class="about-thanks__title">
          {{ t('aboutPage.thanksTitle') }}
        </WinTextBlock>
        <p class="about-thanks__body">{{ t('aboutPage.thanks') }}</p>
        <p class="about-thanks__legal">{{ t('aboutPage.legal') }}</p>
      </div>
    </PageSection>
  </div>
</template>

<style scoped>
.about-page {
  padding-bottom: 40px;
}

.about-page__bar {
  margin-top: 20px;
}

.about-page__anchor {
  scroll-margin-top: 130px;
}

/* ======================================================== 作者 ==== */

.about-author {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 20px;
  align-items: start;
}

.about-author__card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 22px;
  border-radius: 14px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}

.about-author__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  flex: 0 0 auto;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #fff;
  background: linear-gradient(135deg, var(--brand-1), var(--brand-2));
}

.about-author__name {
  display: block;
}

.about-author__desc {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 22px;
  color: var(--text-secondary);
}

.about-facts {
  margin: 0;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.about-facts__row {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: baseline;
}

.about-facts dt {
  flex: 0 0 auto;
  font-size: 12.5px;
  color: var(--text-tertiary);
}

.about-facts dd {
  margin: 0;
  text-align: right;
  font-family: var(--mono-font);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  word-break: break-all;
}

/* ======================================================== 仓库 ==== */

.about-repo {
  text-decoration: none;
  color: inherit;
}

.about-repo__go {
  margin-top: auto;
  padding-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--accent-base);
}

/* ======================================================== 技术栈 ==== */

.about-stack {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}

.about-stack__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
}

.about-stack__name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-primary);
}

.about-stack__note {
  font-size: 12px;
  line-height: 18px;
  color: var(--text-tertiary);
}

/* ======================================================== FAQ ==== */

.about-faq {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.about-faq__item {
  border-radius: 10px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
  overflow: hidden;
}

.about-faq__item summary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 16px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  list-style: none;
}

.about-faq__item summary::-webkit-details-marker {
  display: none;
}

.about-faq__item summary:hover {
  background: var(--subtle-secondary);
}

.about-faq__index {
  flex: 0 0 auto;
  font-family: var(--mono-font);
  font-size: 11px;
  font-weight: 700;
  color: var(--accent-base);
}

.about-faq__q {
  flex: 1;
  min-width: 0;
}

.about-faq__chevron {
  flex: 0 0 auto;
  font-size: 12px;
  color: var(--text-tertiary);
  transition: transform var(--fast-duration) var(--fast-out-slow-in);
}

.about-faq__item[open] .about-faq__chevron {
  transform: rotate(180deg);
}

.about-faq__a {
  margin: 0;
  padding: 0 16px 16px 44px;
  font-size: 13px;
  line-height: 22px;
  color: var(--text-secondary);
  animation: win-nav-enter var(--normal-duration) var(--fast-out-slow-in);
}

/* ==================================================== 更新记录 ==== */

.about-log {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.about-log__item {
  position: relative;
  padding: 0 0 20px 22px;
  border-left: 2px solid var(--divider-stroke);
}

.about-log__item:last-child {
  padding-bottom: 0;
  border-left-color: transparent;
}

.about-log__item::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-base);
  box-shadow: 0 0 0 3px var(--app-bg);
}

.about-log__item:last-child::before {
  background: var(--text-tertiary);
}

.about-log__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.about-log__version {
  font-family: var(--mono-font);
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.about-log__date {
  font-size: 12px;
  color: var(--text-tertiary);
}

.about-log__list {
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.about-log__list li {
  display: flex;
  gap: 9px;
  font-size: 13px;
  line-height: 21px;
  color: var(--text-secondary);
}

.about-log__list .icon {
  margin-top: 5px;
  flex: 0 0 auto;
  font-size: 10px;
  color: var(--brand-1);
}

/* ======================================================== 致谢 ==== */

.about-thanks {
  padding: 24px;
  border-radius: 14px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
}

.about-thanks__title {
  display: block;
  margin-bottom: 10px;
}

.about-thanks__body {
  margin: 0;
  font-size: 13.5px;
  line-height: 23px;
  color: var(--text-secondary);
}

.about-thanks__legal {
  margin: 16px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--divider-stroke);
  font-size: 12px;
  line-height: 19px;
  color: var(--text-tertiary);
}

@media (max-width: 1000px) {
  .about-author {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
