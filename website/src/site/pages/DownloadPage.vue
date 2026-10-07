<script setup lang="ts">
/**
 * 下载与安装页。
 *
 * 两个源（GitHub 官方 / GitCode 国内镜像）各给 x64 与 ARM64 两个架构，
 * 下面是系统要求、免安装说明与"从源码构建"的完整命令。
 *
 * 链接策略：GitHub 走 releases/latest/download 的固定路径（永远指向最新版），
 * GitCode 走 releases 页面 —— 国内用它更快。
 */
import { computed, ref } from 'vue'

import WinButton from '../../components/WinButton.vue'
import WinInfoBar from '../../components/WinInfoBar.vue'
import WinTextBlock from '../../components/WinTextBlock.vue'
import { useReactiveI18n } from '../../components/i18n'

import PageHeader from '../components/PageHeader.vue'
import PageSection from '../components/PageSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import {
  GITHUB_DOWNLOAD_ARM64,
  GITHUB_DOWNLOAD_X64,
  GITHUB_REPO,
  GITHUB_RELEASES,
  GITCODE_RELEASES,
  HOST_VERSION,
  LICENSE_NAME,
  MIN_WINDOWS,
  TARGET_FRAMEWORK,
} from '../services/links'
const { t } = useReactiveI18n()

type SourceId = 'github' | 'gitcode'
type ArchId = 'x64' | 'arm64'

const source = ref<SourceId>('github')
const arch = ref<ArchId>('x64')

/** 下载地址：GitHub 有固定 latest 直链，GitCode 落到 releases 页自己挑 */
const downloadUrl = computed(() => {
  if (source.value === 'gitcode') return GITCODE_RELEASES
  return arch.value === 'arm64' ? GITHUB_DOWNLOAD_ARM64 : GITHUB_DOWNLOAD_X64
})

const sources = computed(() => [
  {
    id: 'github' as SourceId,
    name: 'GitHub',
    glyph: '\uE943',
    desc: t('downloadPage.ghDesc'),
    url: GITHUB_RELEASES,
    badge: t('downloadPage.official'),
  },
  {
    id: 'gitcode' as SourceId,
    name: 'GitCode',
    glyph: '\uE774',
    desc: t('downloadPage.gitcodeDesc'),
    url: GITCODE_RELEASES,
    badge: t('downloadPage.mirror'),
  },
])

const requirements = computed(() => [
  { label: t('downloadPage.req.os'), value: MIN_WINDOWS },
  { label: t('downloadPage.req.arch'), value: 'x64 · ARM64' },
  { label: t('downloadPage.req.runtime'), value: '.NET 10 Desktop Runtime' },
  { label: t('downloadPage.req.appsdk'), value: 'Windows App SDK 1.7+' },
  { label: t('downloadPage.req.perm'), value: t('downloadPage.req.permValue') },
  { label: t('downloadPage.req.license'), value: LICENSE_NAME },
])

const steps = computed(() => [
  { title: t('downloadPage.step1'), desc: t('downloadPage.step1Desc'), glyph: '\uE896' },
  { title: t('downloadPage.step2'), desc: t('downloadPage.step2Desc'), glyph: '\uE8B7' },
  { title: t('downloadPage.step3'), desc: t('downloadPage.step3Desc'), glyph: '\uE768' },
  { title: t('downloadPage.step4'), desc: t('downloadPage.step4Desc'), glyph: '\uE7F4' },
])

const buildSample = `# 需要 .NET 10 SDK + Windows App SDK 2.3.1
git clone ${GITHUB_REPO}.git
cd WinIsland/WinIsland

# 仓库里没有 .sln，直接从工程目录构建
dotnet build

# 跑起来
dotnet run

# 发布一个自包含包（不带运行时依赖）
dotnet publish -c Release -r win-x64 --self-contained true`

const portableSample = `# WinIsland 不写注册表、不装服务，撤掉就是删目录：
%LocalAppData%\\WinIsland\\        # 设置、插件、日志都在这
  settings.json                    # 全部 island.* 设置
  plugins\\<插件 id>\\             # 每个插件一个目录
  logs\\plugin.host.log            # 宿主日志
  logs\\plugin.<id>.log            # 每个插件自己的日志

# 想彻底清干净：先把「设置 → 常规」里的开机自启关掉，再删掉上面这个目录`

const portableItems = 4

const version = HOST_VERSION

const openRepo = () => window.open(GITHUB_REPO, '_blank', 'noopener,noreferrer')</script>

<template>
  <div class="download-page">
    <PageHeader
      :eyebrow="t('downloadPage.eyebrow')"
      :title="t('downloadPage.title')"
      :lead="t('downloadPage.lead')"
      glyph="&#xE896;"
    >
      <div class="download-page__facts">
        <span class="site-chip site-chip--accent">v{{ version }}</span>
        <span class="site-chip">{{ t('downloadPage.freeOpenSource') }}</span>
        <span class="site-chip site-chip--mono">{{ LICENSE_NAME }}</span>
      </div>
    </PageHeader>

    <!-- ======================================================= 下载卡 ==== -->
    <PageSection width="wide">
      <div class="download-main">
        <div class="download-main__card">
          <div class="download-main__head">
            <span class="download-main__glyph icon" aria-hidden="true">&#xE896;</span>
            <div>
              <WinTextBlock Style="SubtitleTextBlockStyle" class="download-main__title">
                {{ t('downloadPage.getTitle') }}
              </WinTextBlock>
              <p class="download-main__sub">{{ t('downloadPage.getSub') }}</p>
            </div>
          </div>

          <!-- 源切换 -->
          <div class="download-main__field">
            <span class="download-main__label">{{ t('downloadPage.sourceLabel') }}</span>
            <div class="download-main__seg">
              <button
                v-for="item in sources"
                :key="item.id"
                type="button"
                class="download-main__seg-btn"
                :class="{ 'is-on': source === item.id }"
                @click="source = item.id"
              >
                <span class="icon" aria-hidden="true">{{ item.glyph }}</span>
                <span>{{ item.name }}</span>
              </button>
            </div>
          </div>

          <!-- 架构切换：GitCode 是整包页面，架构就置灰 -->
          <div class="download-main__field">
            <span class="download-main__label">{{ t('downloadPage.archLabel') }}</span>
            <div class="download-main__seg" :class="{ 'is-disabled': source === 'gitcode' }">
              <button
                type="button"
                class="download-main__seg-btn"
                :class="{ 'is-on': arch === 'x64' }"
                :disabled="source === 'gitcode'"
                @click="arch = 'x64'"
              >
                x64
              </button>
              <button
                type="button"
                class="download-main__seg-btn"
                :class="{ 'is-on': arch === 'arm64' }"
                :disabled="source === 'gitcode'"
                @click="arch = 'arm64'"
              >
                ARM64
              </button>
            </div>
          </div>

          <a class="download-main__go" :href="downloadUrl" target="_blank" rel="noreferrer noopener">
            <span class="icon" aria-hidden="true">&#xE896;</span>
            <span>{{ t('downloadPage.go') }}</span>
          </a>

          <p class="download-main__hint">
            <span class="icon" aria-hidden="true">&#xE946;</span>
            <span>{{ source === 'gitcode' ? t('downloadPage.gitcodeHint') : t('downloadPage.ghHint') }}</span>
          </p>
        </div>

        <!-- 系统要求 -->
        <div class="download-main__req">
          <WinTextBlock Style="BodyStrongTextBlockStyle" class="download-main__req-title">
            {{ t('downloadPage.reqTitle') }}
          </WinTextBlock>
          <dl class="download-req">
            <div v-for="row in requirements" :key="row.label" class="download-req__row">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </PageSection>

    <!-- ======================================================= 镜像源 ==== -->
    <PageSection width="wide" :title="t('downloadPage.sourcesTitle')" :subtitle="t('downloadPage.sourcesLead')">
      <div class="site-grid site-grid--wide">
        <a
          v-for="item in sources"
          :key="item.id"
          v-reveal
          class="site-card is-interactive download-source"
          :href="item.url"
          target="_blank"
          rel="noreferrer noopener"
        >
          <div class="download-source__head">
            <span class="site-card__glyph icon" aria-hidden="true">{{ item.glyph }}</span>
            <span class="site-chip" :class="{ 'site-chip--accent': item.id === 'github' }">{{ item.badge }}</span>
          </div>
          <h3 class="site-card__title">{{ item.name }}</h3>
          <p class="site-card__body">{{ item.desc }}</p>
          <span class="download-source__url">{{ item.url }}</span>
        </a>
      </div>

      <WinInfoBar
        class="download-page__bar"
        Severity="Success"
        :Title="t('downloadPage.updateTitle')"
        :Message="t('downloadPage.updateNote')"
        :IsOpen="true"
      />
    </PageSection>

    <!-- ==================================================== 安装步骤 ==== -->
    <PageSection width="wide" :title="t('downloadPage.stepsTitle')" :subtitle="t('downloadPage.stepsLead')">
      <div class="site-grid">
        <article v-for="(step, index) in steps" v-reveal :key="step.title" class="site-card download-step">
          <div class="download-step__head">
            <span class="site-card__glyph icon" aria-hidden="true">{{ step.glyph }}</span>
            <span class="download-step__index">{{ index + 1 }}</span>
          </div>
          <h3 class="site-card__title">{{ step.title }}</h3>
          <p class="site-card__body">{{ step.desc }}</p>
        </article>
      </div>
    </PageSection>

    <!-- ==================================================== 免安装 ==== -->
    <PageSection width="wide">
      <div class="download-page__split">
        <div>
          <WinTextBlock Style="BodyStrongTextBlockStyle" class="download-page__split-title">
            {{ t('downloadPage.portableTitle') }}
          </WinTextBlock>
          <p class="download-page__split-lead">{{ t('downloadPage.portableLead') }}</p>
          <ul class="download-page__list">
            <li v-for="index in portableItems" :key="index">              <span class="icon" aria-hidden="true">&#xE73E;</span>
              <span>{{ t(`downloadPage.portable${index}`) }}</span>
            </li>
          </ul>
        </div>
        <CodeBlock :code="portableSample" filename="paths.txt" lang="text" />
      </div>
    </PageSection>

    <!-- ==================================================== 源码构建 ==== -->
    <PageSection
      width="wide"
      :title="t('downloadPage.buildTitle')"
      :subtitle="t('downloadPage.buildLead')"
    >
      <template #actions>
        <WinButton Style="SubtleButtonStyle" @click="openRepo">
          <span class="icon" aria-hidden="true">&#xE943;</span>
          <span>{{ t('downloadPage.openRepo') }}</span>
        </WinButton>
      </template>

      <CodeBlock :code="buildSample" filename="build.ps1" lang="powershell" />

      <p class="download-page__target">
        <span class="icon" aria-hidden="true">&#xE946;</span>
        <span>{{ t('downloadPage.targetNote', { tfm: TARGET_FRAMEWORK }) }}</span>
      </p>
    </PageSection>
  </div>
</template>

<style scoped>
.download-page {
  padding-bottom: 40px;
}

.download-page__facts {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.download-page__bar {
  margin-top: 18px;
}

/* ======================================================== 下载卡 ==== */

.download-main {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 20px;
  align-items: start;
}

.download-main__card {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--brand-1) 22%, var(--card-stroke));
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}

.download-main__head {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.download-main__glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  border-radius: 11px;
  font-size: 18px;
  color: var(--brand-1);
  background: color-mix(in srgb, var(--brand-1) 13%, transparent);
}

.download-main__title {
  display: block;
}

.download-main__sub {
  margin: 5px 0 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--text-secondary);
}

.download-main__field {
  margin-top: 20px;
}

.download-main__label {
  display: block;
  margin-bottom: 8px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.download-main__seg {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
}

.download-main__seg-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border-radius: 8px;
  border: 1px solid var(--card-stroke);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  background: transparent;
  cursor: pointer;
  transition: border-color var(--faster-duration) linear, background-color var(--faster-duration) linear,
    color var(--faster-duration) linear;
}

.download-main__seg-btn:hover:not(:disabled) {
  color: var(--text-primary);
  background: var(--subtle-secondary);
}

.download-main__seg-btn.is-on {
  color: var(--text-on-accent);
  background: var(--accent-base);
  border-color: var(--accent-base);
}

.download-main__seg-btn:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.download-main__go {
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: 10px;
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  color: var(--text-on-accent);
  background: var(--accent-base);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--accent-base) 34%, transparent);
  transition: transform var(--fast-duration) var(--fast-out-slow-in), box-shadow var(--fast-duration) linear;
}

.download-main__go:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 22px color-mix(in srgb, var(--accent-base) 42%, transparent);
  text-decoration: none;
}

.download-main__hint {
  margin: 14px 0 0;
  display: flex;
  gap: 7px;
  font-size: 12px;
  line-height: 18px;
  color: var(--text-tertiary);
}

.download-main__hint .icon {
  margin-top: 2px;
  flex: 0 0 auto;
}

/* 系统要求 */
.download-main__req {
  padding: 20px;
  border-radius: 14px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
}

.download-main__req-title {
  display: block;
  margin-bottom: 14px;
}

.download-req {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.download-req__row {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--divider-stroke);
}

.download-req__row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.download-req dt {
  flex: 0 0 auto;
  font-size: 12.5px;
  color: var(--text-tertiary);
}

.download-req dd {
  margin: 0;
  text-align: right;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-primary);
}

/* ======================================================== 镜像源 ==== */

.download-source {
  text-decoration: none;
  color: inherit;
}

.download-source__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.download-source__url {
  margin-top: auto;
  padding-top: 10px;
  font-family: var(--mono-font);
  font-size: 11px;
  color: var(--text-tertiary);
  word-break: break-all;
}

/* ======================================================== 步骤 ==== */

.download-step__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.download-step__index {
  font-family: var(--mono-font);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-tertiary);
}

/* ==================================================== 免安装 ==== */

.download-page__split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: 28px;
  align-items: start;
}

.download-page__split-title {
  display: block;
  margin-bottom: 10px;
}

.download-page__split-lead {
  margin: 0 0 18px;
  font-size: 13.5px;
  line-height: 23px;
  color: var(--text-secondary);
}

.download-page__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.download-page__list li {
  display: flex;
  gap: 10px;
  font-size: 13px;
  line-height: 21px;
  color: var(--text-secondary);
}

.download-page__list .icon {
  margin-top: 5px;
  font-size: 11px;
  color: var(--brand-1);
}

.download-page__target {
  margin: 16px 0 0;
  display: flex;
  gap: 8px;
  font-size: 12.5px;
  color: var(--text-tertiary);
}

.download-page__target .icon {
  margin-top: 2px;
}

@media (max-width: 1000px) {
  .download-main,
  .download-page__split {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
