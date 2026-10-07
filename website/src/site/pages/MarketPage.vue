<script setup lang="ts">
/**
 * 插件市场页。
 *
 * 讲清两件事：出厂的五个内置插件长什么样（主岛 / 队列两种形态的文案），
 * 以及社区市场是怎么工作的 —— 单次 index.json、ETag + TTL 缓存、
 * 镜像回退、.lwp 下载前校验 SHA-256。
 *
 * 表格里的文案全部来自宿主的真实插件声明。
 */
import { computed, ref } from 'vue'

import WinButton from '../../components/WinButton.vue'
import WinInfoBar from '../../components/WinInfoBar.vue'
import WinTextBlock from '../../components/WinTextBlock.vue'
import { useReactiveI18n } from '../../components/i18n'

import PageHeader from '../components/PageHeader.vue'
import PageSection from '../components/PageSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { demoActivities, demoDropTargets } from '../services/demoData'
import { GITHUB_REPO, GITCODE_REPO, SDK_VERSION } from '../services/links'

const { t } = useReactiveI18n()

/* ------------------------------------------------------------ 内置插件 ---- */

const builtin = computed(() =>
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
      note: t(`market.${activity.id}.note`),
    }))
)

/** 宿主内置的文件投放动作 —— 排在插件之后 */
const hostTargets = computed(() => [
  { kind: 'open', label: t('market.host.open'), order: 900, glyph: '\uE8E5' },
  { kind: 'reveal', label: t('market.host.reveal'), order: 901, glyph: '\uE838' },
  { kind: 'copy', label: t('market.host.copy'), order: 902, glyph: '\uE8C8' },
])

/* ------------------------------------------------------------ 市场机制 ---- */

const marketSteps = computed(() => [
  { glyph: '\uE774', title: t('marketPage.step1'), desc: t('marketPage.step1Desc') },
  { glyph: '\uE896', title: t('marketPage.step2'), desc: t('marketPage.step2Desc') },
  { glyph: '\uE73E', title: t('marketPage.step3'), desc: t('marketPage.step3Desc') },
  { glyph: '\uE7B8', title: t('marketPage.step4'), desc: t('marketPage.step4Desc') },
])

const indexSample = `{
  "schema": 1,
  "plugins": [
    {
      "id": "winisland.weather",
      "name": "Weather",
      "version": "1.2.0",
      "author": "community",
      "description": "Compact forecast on the island.",
      "api_version": 2,
      "min_host_version": "2.0.0",
      "download": "https://example.com/weather-1.2.0.lwp",
      "sha256": "9f2c...c41d",
      "tags": ["weather", "notification"]
    }
  ]
}`

const installSample = `# 路线 A：从市场装。设置 → 插件市场 → 找到插件 → 安装
#   下载完成后会比对 index.json 里的 sha256，不一致就不装。

# 路线 B：本地 .lwp 包。设置 → 插件管理 → 安装本地包
#   .lwp 就是一个 zip，里面必须有 plugin.json 和 entry 指向的 DLL。

# 手动安装（不推荐，但能用）：把解压后的目录丢进去，然后重启宿主
%LocalAppData%\\WinIsland\\plugins\\<插件 id>\\`

/* ------------------------------------------------------------ 双源信息 ---- */

const communityLinks = computed(() => [
  {
    name: 'GitHub',
    glyph: '\uE943',
    desc: t('marketPage.ghDesc'),
    url: GITHUB_REPO,
    accent: 'var(--text-primary)',
  },
  {
    name: 'GitCode',
    glyph: '\uE774',
    desc: t('marketPage.gitcodeDesc'),
    url: GITCODE_REPO,
    accent: 'var(--brand-2)',
  },
])

const activeTab = ref<'builtin' | 'host'>('builtin')
</script>

<template>
  <div class="market-page">
    <PageHeader
      :eyebrow="t('marketPage.eyebrow')"
      :title="t('marketPage.title')"
      :lead="t('marketPage.lead')"
      glyph="&#xE719;"
    >
      <template #actions>
        <WinButton Style="AccentButtonStyle" Padding="18,10" @click="$router.push('/plugins')">
          <span class="icon" aria-hidden="true">&#xEA86;</span>
          <span>{{ t('marketPage.ctaDevelop') }}</span>
        </WinButton>
        <WinButton Padding="18,10" @click="$router.push('/download')">
          <span class="icon" aria-hidden="true">&#xE896;</span>
          <span>{{ t('common.download') }}</span>
        </WinButton>
      </template>
    </PageHeader>

    <!-- ==================================================== 内置插件 ==== -->
    <PageSection width="wide">
      <div class="market-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          class="market-tabs__btn"
          :class="{ 'is-on': activeTab === 'builtin' }"
          :aria-selected="activeTab === 'builtin'"
          @click="activeTab = 'builtin'"
        >
          <span class="icon" aria-hidden="true">&#xE8B7;</span>
          <span>{{ t('marketPage.builtin') }}</span>
          <span class="market-tabs__count">{{ builtin.length }}</span>
        </button>
        <button
          type="button"
          role="tab"
          class="market-tabs__btn"
          :class="{ 'is-on': activeTab === 'host' }"
          :aria-selected="activeTab === 'host'"
          @click="activeTab = 'host'"
        >
          <span class="icon" aria-hidden="true">&#xE7C3;</span>
          <span>{{ t('marketPage.hostTargets') }}</span>
          <span class="market-tabs__count">{{ hostTargets.length }}</span>
        </button>
      </div>

      <!-- 内置插件表 -->
      <div v-if="activeTab === 'builtin'" class="site-table-wrap market-table">
        <table class="site-table">
          <thead>
            <tr>
              <th>{{ t('marketPage.col.plugin') }}</th>
              <th class="site-table__nowrap">Priority</th>
              <th>{{ t('marketPage.col.compact') }}</th>
              <th>{{ t('marketPage.col.expanded') }}</th>
              <th>{{ t('marketPage.col.note') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="plugin in builtin" :key="plugin.id">
              <td class="site-table__nowrap">
                <span class="market-plugin">
                  <span class="icon" :style="{ color: plugin.accent }" aria-hidden="true">{{ plugin.glyph }}</span>
                  <span class="market-plugin__name">{{ plugin.name }}</span>
                </span>
                <span class="market-plugin__id">{{ plugin.id }}</span>
              </td>
              <td class="site-table__nowrap"><span class="site-chip site-chip--mono">{{ plugin.priority }}</span></td>
              <td>{{ plugin.compact }}</td>
              <td>{{ plugin.expanded }}</td>
              <td>{{ plugin.note }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 宿主内置投放目标 -->
      <div v-else class="market-host">
        <WinInfoBar
          Severity="Informational"
          :Title="t('marketPage.hostTitle')"
          :Message="t('marketPage.hostLead')"
          :IsOpen="true"
        />
        <div class="site-grid">
          <article
            v-for="target in hostTargets"
            :key="target.kind"
            v-reveal
            class="site-card"
          >
            <span class="site-card__glyph icon" aria-hidden="true">{{ target.glyph }}</span>
            <h3 class="site-card__title">{{ target.label }}</h3>
            <span class="site-card__meta">Order {{ target.order }}</span>
          </article>
        </div>
      </div>
    </PageSection>

    <!-- ==================================================== 市场机制 ==== -->
    <PageSection width="wide" :title="t('marketPage.howTitle')" :subtitle="t('marketPage.howLead')">
      <div class="site-grid">
        <article
          v-for="(step, index) in marketSteps"
          :key="step.title"
          v-reveal
          class="site-card market-step"
        >
          <div class="market-step__head">
            <span class="site-card__glyph icon" aria-hidden="true">{{ step.glyph }}</span>
            <span class="market-step__index">{{ index + 1 }}</span>
          </div>
          <h3 class="site-card__title">{{ step.title }}</h3>
          <p class="site-card__body">{{ step.desc }}</p>
        </article>
      </div>

      <div class="market-page__split">
        <div>
          <p class="market-page__code-label">{{ t('marketPage.indexLabel') }}</p>
          <CodeBlock :code="indexSample" filename="index.json" lang="json" />
        </div>
        <div>
          <p class="market-page__code-label">{{ t('marketPage.installLabel') }}</p>
          <CodeBlock :code="installSample" filename="install.txt" lang="text" />
        </div>
      </div>
    </PageSection>

    <!-- ==================================================== 投稿入口 ==== -->
    <PageSection width="wide" :title="t('marketPage.submitTitle')" :subtitle="t('marketPage.submitLead')">
      <div class="site-grid site-grid--wide">
        <a
          v-for="link in communityLinks"
          :key="link.name"
          v-reveal
          class="site-card is-interactive market-link"
          :href="link.url"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span class="site-card__glyph icon" :style="{ color: link.accent }" aria-hidden="true">{{ link.glyph }}</span>
          <h3 class="site-card__title">{{ link.name }}</h3>
          <p class="site-card__body">{{ link.desc }}</p>
          <span class="market-link__go">
            <span>{{ t('common.learnMore') }}</span>
            <span class="icon" aria-hidden="true">&#xE8A7;</span>
          </span>
        </a>
      </div>

      <WinInfoBar
        class="market-page__bar"
        Severity="Warning"
        :Title="t('marketPage.trustTitle')"
        :Message="t('marketPage.trust')"
        :IsOpen="true"
      />
    </PageSection>

    <!-- ==================================================== 版本要求 ==== -->
    <PageSection width="narrow">
      <div class="market-req">
        <WinTextBlock Style="BodyStrongTextBlockStyle" class="market-req__title">
          {{ t('marketPage.reqTitle') }}
        </WinTextBlock>
        <ul class="market-req__list">
          <li v-for="index in 3" :key="index">            <span class="icon" aria-hidden="true">&#xE73E;</span>
            <span>{{ t(`marketPage.req${index}`) }}</span>
          </li>
        </ul>
      </div>
    </PageSection>
  </div>
</template>

<style scoped>
.market-page {
  padding-bottom: 40px;
}

/* ======================================================== 标签页 ==== */

.market-tabs {
  display: inline-flex;
  gap: 4px;
  margin-bottom: 16px;
  padding: 3px;
  border-radius: 10px;
  border: 1px solid var(--card-stroke);
  background: var(--subtle-secondary);
}

.market-tabs__btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 16px;
  border: 0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-secondary);
  background: transparent;
  cursor: pointer;
  transition: background-color var(--faster-duration) linear, color var(--faster-duration) linear;
}

.market-tabs__btn.is-on {
  color: var(--text-primary);
  background: var(--ctrl-fill-secondary);
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
}

.market-tabs__btn .icon {
  font-size: 13px;
}

.market-tabs__count {
  padding: 0 6px;
  border-radius: 999px;
  font-size: 10.5px;
  font-variant-numeric: tabular-nums;
  background: var(--subtle-secondary);
}

.market-tabs__btn.is-on .market-tabs__count {
  background: color-mix(in srgb, var(--accent-base) 16%, transparent);
  color: var(--accent-base);
}

/* ======================================================== 表格 ==== */

.market-table {
  margin-top: 4px;
}

.market-plugin {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.market-plugin__name {
  font-weight: 600;
  color: var(--text-primary);
}

.market-plugin__id {
  display: block;
  margin-top: 2px;
  font-family: var(--mono-font);
  font-size: 10.5px;
  color: var(--text-tertiary);
}

.market-host {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ==================================================== 市场机制 ==== */

.market-step__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.market-step__index {
  font-family: var(--mono-font);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-tertiary);
}

.market-page__split {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  align-items: start;
}

.market-page__code-label {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

/* ==================================================== 投稿 ==== */

.market-link {
  text-decoration: none;
  color: inherit;
}

.market-link__go {
  margin-top: auto;
  padding-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--accent-base);
}

.market-page__bar {
  margin-top: 20px;
}

/* ==================================================== 版本要求 ==== */

.market-req {
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}

.market-req__title {
  display: block;
  margin-bottom: 12px;
}

.market-req__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.market-req__list li {
  display: flex;
  gap: 10px;
  font-size: 13px;
  line-height: 21px;
  color: var(--text-secondary);
}

.market-req__list .icon {
  margin-top: 5px;
  font-size: 11px;
  color: var(--brand-1);
}
</style>
