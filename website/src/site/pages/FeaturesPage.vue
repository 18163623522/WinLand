<script setup lang="ts">
/**
 * 功能一览页。
 *
 * 顶部一排分类胶囊（全部 / 核心交互 / 外观 / 插件体系 / 系统集成 / 平台），
 * 下面按分类铺功能卡。每张卡都带 source —— 指向宿主里真正实现它的那个文件，
 * 这是这一页的立身之本：不是营销词，是可核对实现。
 *
 * 支持 ?cat= 与 #id 深链，首页点卡片会直接跳到对应条目。
 */
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import WinButton from '../../components/WinButton.vue'
import WinInfoBar from '../../components/WinInfoBar.vue'
import { useReactiveI18n } from '../../components/i18n'

import PageHeader from '../components/PageHeader.vue'
import PageSection from '../components/PageSection.vue'
import { features, featureCategories, type FeatureCategoryId, type FeatureEntry } from '../services/features'

const { t } = useReactiveI18n()
const route = useRoute()
const router = useRouter()

type CatId = FeatureCategoryId

const active = ref<CatId>('all')
const query = ref('')

/** 分类胶囊上的计数，让访客一眼知道每类有多少条 */
const counts = computed(() => {
  const map: Record<string, number> = { all: features.length }
  for (const entry of features) {
    map[entry.cat] = (map[entry.cat] ?? 0) + 1
  }
  return map
})

const visible = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  return features.filter((entry) => {
    if (active.value !== 'all' && entry.cat !== active.value) return false
    if (!keyword) return true
    const haystack = `${entry.id} ${entry.source} ${t(`feat.${entry.id}.name`)} ${t(`feat.${entry.id}.desc`)}`
    return haystack.toLowerCase().includes(keyword)
  })
})

/** 按分类分组显示（"全部"时分组才有意义） */
const grouped = computed(() => {
  const order: Exclude<CatId, 'all'>[] = ['core', 'appearance', 'plugin', 'system', 'platform']
  if (active.value !== 'all' || query.value.trim()) {
    return [{ cat: active.value === 'all' ? 'core' : active.value, items: visible.value }]
  }
  return order
    .map((cat) => ({ cat, items: visible.value.filter((entry) => entry.cat === cat) }))
    .filter((group) => group.items.length > 0)
})

const categoryLabel = (cat: string) => {
  const found = featureCategories.find((entry) => entry.id === cat)
  return found ? t(found.key) : cat
}

const selectCategory = (cat: CatId) => {
  active.value = cat
  if (cat === 'all') router.replace({ path: '/features' })
  else router.replace({ path: '/features', query: { cat } })
}

const highlightId = ref<string | null>(null)

const focusEntry = (id: string) => {
  highlightId.value = id
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, 60)
  window.setTimeout(() => (highlightId.value = null), 2400)
}

// 首次进入时读一次 URL：?cat= 决定筛选，#id 决定滚到哪条
onMounted(() => {
  const cat = String(route.query.cat ?? '')
  if (featureCategories.some((entry) => entry.id === cat)) active.value = cat as CatId
  if (route.hash) focusEntry(route.hash.slice(1))
})

watch(
  () => route.query.cat,
  (cat) => {
    const value = String(cat ?? '')
    active.value = featureCategories.some((entry) => entry.id === value) ? (value as CatId) : 'all'
  }
)

const entryAnchor = (entry: FeatureEntry) => entry.id
</script>

<template>
  <div class="features-page">
    <PageHeader
      :eyebrow="t('featuresPage.eyebrow')"
      :title="t('featuresPage.title')"
      :lead="t('featuresPage.lead')"
      glyph="&#xE9D9;"
    >
      <template #actions>
        <WinButton Style="AccentButtonStyle" Padding="18,10" @click="$router.push('/download')">
          <span class="icon" aria-hidden="true">&#xE896;</span>
          <span>{{ t('common.download') }}</span>
        </WinButton>
        <WinButton Padding="18,10" @click="$router.push('/island')">
          <span class="icon" aria-hidden="true">&#xE7F4;</span>
          <span>{{ t('nav.island') }}</span>
        </WinButton>
      </template>
    </PageHeader>

    <!-- ======================================================== 筛选栏 ==== -->
    <PageSection width="wide">
      <div class="features-bar">
        <div class="features-bar__chips" role="tablist" :aria-label="t('common.category')">
          <button
            v-for="category in featureCategories"
            :key="category.id"
            type="button"
            role="tab"
            :aria-selected="active === category.id"
            class="features-bar__chip"
            :class="{ 'is-on': active === category.id }"
            @click="selectCategory(category.id)"
          >
            <span class="icon" aria-hidden="true">{{ category.glyph }}</span>
            <span>{{ t(category.key) }}</span>
            <span class="features-bar__count">{{ counts[category.id] ?? 0 }}</span>
          </button>
        </div>

        <label class="features-bar__search">
          <span class="icon" aria-hidden="true">&#xE721;</span>
          <input
            v-model="query"
            type="search"
            class="features-bar__input"
            :placeholder="t('search.hint')"
          />
        </label>
      </div>

      <p class="features-page__count">
        {{ t('featuresPage.count', { n: visible.length }) }}
        <span v-if="active !== 'all'"> · {{ categoryLabel(active) }}</span>
      </p>
    </PageSection>

    <!-- ======================================================== 列表 ==== -->
    <PageSection v-for="group in grouped" :key="group.cat" width="wide" :title="categoryLabel(group.cat)">
      <div class="site-grid site-grid--wide">
        <article
          v-for="entry in group.items"
          :id="entryAnchor(entry)"
          :key="entry.id"
          v-reveal
          class="site-card features-card"
          :class="{ 'is-flash': highlightId === entry.id }"
          :style="{ '--card-accent': entry.accent }"
        >
          <span class="site-card__glyph icon" aria-hidden="true">{{ entry.glyph }}</span>
          <h3 class="site-card__title">{{ t(`feat.${entry.id}.name`) }}</h3>
          <p class="site-card__body">{{ t(`feat.${entry.id}.desc`) }}</p>
          <div class="features-card__foot">
            <span class="site-chip site-chip--mono">{{ entry.cat }}</span>
            <span class="features-card__source" :title="entry.source">
              <span class="icon" aria-hidden="true">&#xE943;</span>
              {{ entry.source }}
            </span>
          </div>
        </article>
      </div>
    </PageSection>

    <PageSection v-if="visible.length === 0" width="wide">
      <WinInfoBar
        Severity="Informational"
        :Title="t('search.noResult')"
        :Message="t('featuresPage.emptyHint')"
        :IsOpen="true"
      />
    </PageSection>

    <!-- ==================================================== 收尾 ==== -->
    <PageSection width="wide">
      <WinInfoBar
        Severity="Success"
        :Title="t('featuresPage.evidenceTitle')"
        :Message="t('featuresPage.evidence')"
        :IsOpen="true"
      />
    </PageSection>
  </div>
</template>

<style scoped>
.features-page {
  padding-bottom: 40px;
}

/* ======================================================== 筛选栏 ==== */

.features-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
}

.features-bar__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.features-bar__chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid var(--card-stroke);
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--card-bg);
  cursor: pointer;
  transition: border-color var(--faster-duration) linear, color var(--faster-duration) linear,
    background-color var(--faster-duration) linear;
}

.features-bar__chip:hover {
  color: var(--text-primary);
  border-color: color-mix(in srgb, var(--accent-base) 34%, var(--card-stroke));
}

.features-bar__chip.is-on {
  color: var(--text-on-accent);
  background: var(--accent-base);
  border-color: var(--accent-base);
}

.features-bar__chip .icon {
  font-size: 13px;
}

.features-bar__count {
  padding: 0 6px;
  border-radius: 999px;
  font-size: 10.5px;
  font-variant-numeric: tabular-nums;
  background: var(--subtle-secondary);
}

.features-bar__chip.is-on .features-bar__count {
  background: rgb(255 255 255 / 26%);
}

.features-bar__search {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 240px;
  padding: 0 12px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--card-stroke);
  background: var(--ctrl-fill-input-active, var(--card-bg));
  transition: border-color var(--faster-duration) linear;
}

.features-bar__search:focus-within {
  border-bottom: 2px solid var(--accent-base);
}

.features-bar__search .icon {
  font-size: 13px;
  color: var(--text-tertiary);
}

.features-bar__input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  color: var(--text-primary);
  background: transparent;
}

.features-page__count {
  margin: 14px 0 0;
  font-size: 12.5px;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
}

/* ======================================================== 卡片 ==== */

.features-card {
  scroll-margin-top: 130px;
  transition: box-shadow var(--normal-duration) var(--fast-out-slow-in),
    border-color var(--normal-duration) linear;
}

/* 从首页跳过来时闪一下，让人知道落在哪张卡上 */
.features-card.is-flash {
  border-color: var(--accent-base);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-base) 22%, transparent), var(--card-shadow);
  animation: drop-tile-arm 1.2s var(--fast-out-slow-in) 2;
}

.features-card__foot {
  margin-top: auto;
  padding-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
  min-width: 0;
}

.features-card__source {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  font-family: var(--mono-font);
  font-size: 10.5px;
  color: var(--text-tertiary);
}

.features-card__source .icon {
  flex: 0 0 auto;
  font-size: 10px;
}

.features-card__source {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 640px) {
  .features-bar__search {
    min-width: 0;
    width: 100%;
  }
}
</style>
