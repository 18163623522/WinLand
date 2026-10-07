<script setup lang="ts">
/**
 * 岛体与外观页。
 *
 * 左边一列是控制台：风格、材质、位置、水平对齐、明暗、各种行为开关、几何偏移。
 * 右边是 IslandStage 本体，所有开关实时作用到它身上 —— 等于把宿主设置窗里的
 * 「常规」页搬到了网页上，改一个值就能立刻看到差别。
 *
 * 控件里的选项都对着宿主源码：
 *   island.style      apple | fluent      （IslandStyle.cs / GeneralSettingsPage.xaml.cs）
 *   island.material   acrylic | mica
 *   island.position   top | bottom
 *   island.horizontal center | left | right
 *   island.display    auto | 指定某台显示器（对应 DisplayResolver）
 */
import { computed, ref } from 'vue'

import WinButton from '../../components/WinButton.vue'
import WinSettingsCard from '../../components/WinSettingsCard.vue'
import WinToggleSwitch from '../../components/WinToggleSwitch.vue'
import WinTextBlock from '../../components/WinTextBlock.vue'
import WinInfoBar from '../../components/WinInfoBar.vue'
import { useReactiveI18n } from '../../components/i18n'

import IslandStage from '../components/IslandStage.vue'
import PageHeader from '../components/PageHeader.vue'
import PageSection from '../components/PageSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { ISLAND_METRICS, resolveIslandTheme } from '../services/islandTheme'
import type { IslandHorizontal, IslandMaterialKind, IslandPosition, IslandStyleKind } from '../services/islandTheme'

const { t } = useReactiveI18n()

/* ------------------------------------------------------------- 外观状态 ---- */

const style = ref<IslandStyleKind>('apple')
const material = ref<IslandMaterialKind>('acrylic')
const light = ref(false)
const position = ref<IslandPosition>('top')
const horizontal = ref<IslandHorizontal>('center')

const hoverExpand = ref(true)
const hideWhenIdle = ref(false)
const dropEnabled = ref(true)
const bounce = ref(true)
const queueTail = ref(true)
const autostart = ref(false)

const theme = computed(() => resolveIslandTheme(style.value, material.value, light.value))

/* ------------------------------------------------------------- 选项列表 ---- */

interface Option<T> {
  value: T
  label: string
  desc: string
}

const styleOptions: Option<IslandStyleKind>[] = [
  { value: 'apple', label: t('islandPage.styleApple'), desc: t('islandPage.styleAppleDesc') },
  { value: 'fluent', label: t('islandPage.styleFluent'), desc: t('islandPage.styleFluentDesc') },
]

const materialOptions: Option<IslandMaterialKind>[] = [
  { value: 'acrylic', label: t('islandPage.materialAcrylic'), desc: t('islandPage.materialAcrylicDesc') },
  { value: 'mica', label: t('islandPage.materialMica'), desc: t('islandPage.materialMicaDesc') },
  { value: 'solid', label: t('islandPage.materialSolid'), desc: t('islandPage.materialSolidDesc') },
]

const positionOptions: Option<IslandPosition>[] = [
  { value: 'top', label: t('islandPage.positionTop'), desc: t('islandPage.positionTopDesc') },
  { value: 'bottom', label: t('islandPage.positionBottom'), desc: t('islandPage.positionBottomDesc') },
]

const horizontalOptions: Option<IslandHorizontal>[] = [
  { value: 'center', label: t('islandPage.horizontalCenter'), desc: t('islandPage.horizontalCenterDesc') },
  { value: 'left', label: t('islandPage.horizontalLeft'), desc: t('islandPage.horizontalLeftDesc') },
  { value: 'right', label: t('islandPage.horizontalRight'), desc: t('islandPage.horizontalRightDesc') },
]

/* --------------------------------------------------------------- 状态机 ---- */

const phases = computed(() => [
  {
    key: 'idle',
    glyph: '\uE91B',
    title: t('islandPage.phase.idle'),
    desc: t('islandPage.phase.idleDesc'),
    metric: `${ISLAND_METRICS.compactMinWidth}–${ISLAND_METRICS.compactMaxWidth} × ${ISLAND_METRICS.compactHeight}`,
  },
  {
    key: 'expanded',
    glyph: '\uE7F4',
    title: t('islandPage.phase.expanded'),
    desc: t('islandPage.phase.expandedDesc'),
    metric: t('islandPage.phase.expandedMetric'),
  },
  {
    key: 'message',
    glyph: '\uE8BD',
    title: t('islandPage.phase.message'),
    desc: t('islandPage.phase.messageDesc'),
    metric: `${ISLAND_METRICS.messageHeightWithText} × ≤${ISLAND_METRICS.messageMaxWidth}`,
  },
  {
    key: 'drop',
    glyph: '\uE7C3',
    title: t('islandPage.phase.drop'),
    desc: t('islandPage.phase.dropDesc'),
    metric: `${ISLAND_METRICS.dropPanelHeight}`,
  },
])

/* ------------------------------------------------------------ 关键常量表 ---- */

const metrics = computed(() => [
  { key: 'compactRadius', label: t('islandPage.metrics.compactRadius'), value: `${theme.value.metrics.compactRadius}px`, note: t('islandPage.metrics.compactRadiusNote') },
  { key: 'expandedRadius', label: t('islandPage.metrics.expandedRadius'), value: `${theme.value.metrics.expandedRadius}px`, note: t('islandPage.metrics.expandedRadiusNote') },
  { key: 'queueRadius', label: t('islandPage.metrics.queueRadius'), value: `${theme.value.metrics.queueRadius}px`, note: t('islandPage.metrics.queueRadiusNote') },
  { key: 'spotlightRadius', label: t('islandPage.metrics.spotlightRadius'), value: `${theme.value.metrics.spotlightRadius}px`, note: t('islandPage.metrics.spotlightRadiusNote') },
  { key: 'compactWidth', label: t('islandPage.metrics.compactWidth'), value: `${ISLAND_METRICS.compactMinWidth}–${ISLAND_METRICS.compactMaxWidth}`, note: t('islandPage.metrics.compactWidthNote') },
  { key: 'queueCard', label: t('islandPage.metrics.queueCard'), value: `${ISLAND_METRICS.queueCardWidth}×${ISLAND_METRICS.queueCardHeight}`, note: t('islandPage.metrics.queueCardNote') },
  { key: 'queueVisible', label: t('islandPage.metrics.queueVisible'), value: String(ISLAND_METRICS.queueMaxVisible), note: t('islandPage.metrics.queueVisibleNote') },
  { key: 'spotlightMargin', label: t('islandPage.metrics.spotlightMargin'), value: `${Math.round(ISLAND_METRICS.spotlightMargin * 100)}%`, note: t('islandPage.metrics.spotlightMarginNote') },
])

/* --------------------------------------------------- 设置键 → 当前值映射 ---- */

const settingsSnapshot = computed(() =>
  JSON.stringify(
    {
      'island.style': style.value,
      'island.material': material.value,
      'island.position': position.value,
      'island.horizontal': horizontal.value,
      'island.hoverExpand': hoverExpand.value,
      'island.hideWhenIdle': hideWhenIdle.value,
      'island.dropEnabled': dropEnabled.value,
      'island.bounce': bounce.value,
      'island.queueTail': queueTail.value,
      'island.autostart': autostart.value,
    },
    null,
    2
  )
)

const themeSample = `// 外观只有一个真相来源：IslandStyle.cs
// 站点的 resolveIslandTheme() 与它逐项对齐，所以两边颜色与圆角完全一致
public static IslandTheme Resolve(IslandAppearance appearance, bool isDark) => appearance switch
{
    IslandAppearance.Apple => new IslandTheme(
        Surface: Colors.Black,                  // 恒定深色，浅色主题也不变
        IdleDot: Color.FromRgb(46, 46, 50),
        CompactRadius: 999, ExpandedRadius: 28,
        QueueRadius: 17, SpotlightRadius: 28),
    _ => new IslandTheme(
        Surface: isDark ? Color.FromArgb(64, 0, 0, 0) : Colors.Transparent,
        CompactRadius: 8, ExpandedRadius: 12,
        QueueRadius: 8, SpotlightRadius: 20),
};`
</script>

<template>
  <div class="island-page">
    <PageHeader
      :eyebrow="t('islandPage.eyebrow')"
      :title="t('islandPage.title')"
      :lead="t('islandPage.lead')"
      glyph="&#xE7F4;"
    >
      <template #actions>
        <WinButton Style="AccentButtonStyle" Padding="18,10" @click="$router.push('/download')">
          <span class="icon" aria-hidden="true">&#xE896;</span>
          <span>{{ t('common.download') }}</span>
        </WinButton>
        <WinButton Padding="18,10" @click="$router.push('/plugins')">
          <span class="icon" aria-hidden="true">&#xEA86;</span>
          <span>{{ t('nav.plugins') }}</span>
        </WinButton>
      </template>
    </PageHeader>

    <!-- ======================================================== 实验台 ==== -->
    <PageSection width="wide">
      <div class="island-lab">
        <!-- 左侧控制台 -->
        <aside class="island-lab__panel">
          <div class="island-lab__group">
            <h3 class="island-lab__group-title">{{ t('islandPage.style') }}</h3>
            <p class="island-lab__group-note">{{ t('islandPage.styleNote') }}</p>
            <div class="island-lab__options">
              <button
                v-for="option in styleOptions"
                :key="option.value"
                type="button"
                class="island-lab__option"
                :class="{ 'is-on': style === option.value }"
                @click="style = option.value"
              >
                <span class="island-lab__option-head">
                  <span class="island-lab__option-dot" :class="`is-${option.value}`" aria-hidden="true" />
                  <span class="island-lab__option-label">{{ option.label }}</span>
                </span>
                <span class="island-lab__option-desc">{{ option.desc }}</span>
              </button>
            </div>
          </div>

          <div class="island-lab__group">
            <h3 class="island-lab__group-title">{{ t('islandPage.material') }}</h3>
            <p class="island-lab__group-note">{{ t('islandPage.materialNote') }}</p>
            <div class="island-lab__options">
              <button
                v-for="option in materialOptions"
                :key="option.value"
                type="button"
                class="island-lab__option"
                :class="{ 'is-on': material === option.value }"
                @click="material = option.value"
              >
                <span class="island-lab__option-head">
                  <span class="island-lab__option-swatch" :class="`is-${option.value}`" aria-hidden="true" />
                  <span class="island-lab__option-label">{{ option.label }}</span>
                </span>
                <span class="island-lab__option-desc">{{ option.desc }}</span>
              </button>
            </div>
          </div>

          <div class="island-lab__group">
            <h3 class="island-lab__group-title">{{ t('islandPage.position') }}</h3>
            <div class="island-lab__seg">
              <button
                v-for="option in positionOptions"
                :key="option.value"
                type="button"
                class="island-lab__seg-btn"
                :class="{ 'is-on': position === option.value }"
                @click="position = option.value"
              >
                {{ option.label }}
              </button>
            </div>
            <p class="island-lab__group-note">{{ t('islandPage.positionNote') }}</p>
          </div>

          <div class="island-lab__group">
            <h3 class="island-lab__group-title">{{ t('islandPage.horizontal') }}</h3>
            <div class="island-lab__seg">
              <button
                v-for="option in horizontalOptions"
                :key="option.value"
                type="button"
                class="island-lab__seg-btn"
                :class="{ 'is-on': horizontal === option.value }"
                @click="horizontal = option.value"
              >
                {{ option.label }}
              </button>
            </div>
            <p class="island-lab__group-note">{{ t('islandPage.horizontalNote') }}</p>
          </div>

          <div class="island-lab__group">
            <h3 class="island-lab__group-title">{{ t('islandPage.appearance') }}</h3>
            <WinToggleSwitch
              :IsOn="light"
              :Header="t('islandPage.lightMode')"
              :OnContent="t('islandPage.on')"
              :OffContent="t('islandPage.off')"
              @update:IsOn="(v) => (light = v)"
            />
            <p class="island-lab__group-note">{{ t('islandPage.lightModeNote') }}</p>
          </div>

          <div class="island-lab__group">
            <h3 class="island-lab__group-title">{{ t('islandPage.behaviour') }}</h3>
            <div class="island-lab__switches">
              <WinToggleSwitch
                :IsOn="hoverExpand"
                :Header="t('islandPage.hoverExpand')"
                @update:IsOn="(v) => (hoverExpand = v)"
              />
              <WinToggleSwitch
                :IsOn="hideWhenIdle"
                :Header="t('islandPage.hideWhenIdle')"
                @update:IsOn="(v) => (hideWhenIdle = v)"
              />
              <WinToggleSwitch
                :IsOn="dropEnabled"
                :Header="t('islandPage.dropEnabled')"
                @update:IsOn="(v) => (dropEnabled = v)"
              />
              <WinToggleSwitch
                :IsOn="bounce"
                :Header="t('islandPage.bounce')"
                @update:IsOn="(v) => (bounce = v)"
              />
              <WinToggleSwitch
                :IsOn="queueTail"
                :Header="t('islandPage.queueTail')"
                @update:IsOn="(v) => (queueTail = v)"
              />
              <WinToggleSwitch
                :IsOn="autostart"
                :Header="t('islandPage.autostart')"
                @update:IsOn="(v) => (autostart = v)"
              />
            </div>
          </div>

          <WinInfoBar
        Severity="Informational"
        :Title="t('islandPage.panelTipTitle')"
        :Message="t('islandPage.panelTip')"
        :IsOpen="true"
      />
        </aside>

        <!-- 右侧实机 -->
        <div class="island-lab__stage">
          <IslandStage
            :style="style"
            :material="material"
            :light="light"
            :position="position"
            :horizontal="horizontal"
            :stage-height="560"
          />

          <div class="island-lab__readout">
            <div class="island-lab__readout-item">
              <span class="island-lab__readout-label">{{ t('islandPage.currentStyle') }}</span>
              <span class="site-chip site-chip--mono">{{ style }}</span>
            </div>
            <div class="island-lab__readout-item">
              <span class="island-lab__readout-label">{{ t('islandPage.currentMaterial') }}</span>
              <span class="site-chip site-chip--mono">{{ material }}</span>
            </div>
            <div class="island-lab__readout-item">
              <span class="island-lab__readout-label">{{ t('islandPage.currentSurface') }}</span>
              <span class="site-chip site-chip--mono">{{ theme.surface }}</span>
            </div>
            <div class="island-lab__readout-item">
              <span class="island-lab__readout-label">{{ t('islandPage.currentRadius') }}</span>
              <span class="site-chip site-chip--mono">
                {{ theme.metrics.compactRadius }} / {{ theme.metrics.expandedRadius }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageSection>

    <!-- ======================================================== 状态机 ==== -->
    <PageSection width="wide" :title="t('islandPage.phasesTitle')" :subtitle="t('islandPage.phasesLead')">
      <div class="site-grid site-grid--wide">
        <article
          v-for="(phase, index) in phases"
          :key="phase.key"
          v-reveal
          class="site-card"
        >
          <div class="island-phase__head">
            <span class="site-card__glyph icon" aria-hidden="true">{{ phase.glyph }}</span>
            <span class="island-phase__index">0{{ index + 1 }}</span>
          </div>
          <h3 class="site-card__title">{{ phase.title }}</h3>
          <p class="site-card__body">{{ phase.desc }}</p>
          <span class="site-card__meta">{{ phase.metric }}</span>
        </article>
      </div>

      <WinInfoBar
        class="island-page__bar"
        Severity="Success"
        :Title="t('islandPage.phasesTipTitle')"
        :Message="t('islandPage.phasesTip')"
        :IsOpen="true"
      />
    </PageSection>

    <!-- ===================================================== 关键常量 ==== -->
    <PageSection width="wide" :title="t('islandPage.metrics.title')" :subtitle="t('islandPage.metrics.lead')">
      <div class="site-table-wrap">
        <table class="site-table">
          <thead>
            <tr>
              <th>{{ t('islandPage.metrics.colName') }}</th>
              <th class="site-table__nowrap">{{ t('islandPage.metrics.colValue') }}</th>
              <th>{{ t('islandPage.metrics.colNote') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in metrics" :key="row.key">
              <td class="site-table__nowrap"><code>{{ row.label }}</code></td>
              <td class="site-table__nowrap"><span class="site-chip site-chip--mono">{{ row.value }}</span></td>
              <td>{{ row.note }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageSection>

    <!-- ================================================== 设置键快照 ==== -->
    <PageSection width="wide" :title="t('islandPage.settingsTitle')" :subtitle="t('islandPage.settingsLead')">
      <div class="island-page__split">
        <div>
          <ul class="island-page__list">
            <li v-for="index in 4" :key="index">
              <span class="icon" aria-hidden="true">&#xE73E;</span>
              <span>{{ t(`islandPage.settingsItem${index}`) }}</span>
            </li>
          </ul>
          <p class="island-page__path">
            <span class="icon" aria-hidden="true">&#xE8B7;</span>
            <code>%LocalAppData%\WinIsland\settings.json</code>
          </p>
        </div>
        <CodeBlock :code="settingsSnapshot" filename="settings.json" lang="json" />
      </div>
    </PageSection>

    <!-- ================================================== 外观策略 ==== -->
    <PageSection width="wide" :title="t('islandPage.themeTitle')" :subtitle="t('islandPage.themeLead')">
      <CodeBlock :code="themeSample" filename="Island/IslandStyle.cs" lang="csharp" />
    </PageSection>
  </div>
</template>

<style scoped>
.island-page {
  padding-bottom: 40px;
}

/* ======================================================== 实验台 ==== */

.island-lab {
  display: grid;
  grid-template-columns: minmax(260px, 300px) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.island-lab__panel {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}

.island-lab__group + .island-lab__group {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--divider-stroke);
}

.island-lab__group-title {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.island-lab__group-note {
  margin: 4px 0 0;
  font-size: 11.5px;
  line-height: 17px;
  color: var(--text-tertiary);
}

.island-lab__options {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.island-lab__option {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 12px;
  border-radius: 9px;
  border: 1px solid var(--card-stroke);
  font-family: inherit;
  text-align: left;
  background: transparent;
  cursor: pointer;
  transition: border-color var(--faster-duration) linear, background-color var(--faster-duration) linear;
}

.island-lab__option:hover {
  background: var(--subtle-secondary);
}

.island-lab__option.is-on {
  border-color: var(--accent-base);
  background: color-mix(in srgb, var(--accent-base) 9%, transparent);
}

.island-lab__option-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.island-lab__option-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-primary);
}

.island-lab__option-desc {
  padding-left: 20px;
  font-size: 11px;
  line-height: 16px;
  color: var(--text-tertiary);
}

/* 风格用形状示意：Apple 是胶囊，Fluent 是圆角矩形 */
.island-lab__option-dot {
  width: 12px;
  height: 12px;
  background: currentColor;
  color: var(--text-secondary);
  flex: 0 0 auto;
}

.island-lab__option-dot.is-apple {
  border-radius: 999px;
}

.island-lab__option-dot.is-fluent {
  border-radius: 4px;
}

/* 材质用色块示意 */
.island-lab__option-swatch {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  border: 1px solid var(--card-stroke);
  flex: 0 0 auto;
}

.island-lab__option-swatch.is-acrylic {
  background: linear-gradient(135deg, color-mix(in srgb, var(--brand-1) 55%, transparent), color-mix(in srgb, var(--brand-2) 40%, transparent)),
    var(--surface-raised);
}

.island-lab__option-swatch.is-mica {
  background: linear-gradient(135deg, var(--surface-raised), color-mix(in srgb, var(--brand-3) 34%, transparent));
}

.island-lab__option-swatch.is-solid {
  background: var(--text-primary);
  opacity: 0.72;
}

.island-lab__seg {
  margin-top: 10px;
  display: inline-flex;
  padding: 3px;
  border-radius: 9px;
  border: 1px solid var(--card-stroke);
  background: var(--subtle-secondary);
}

.island-lab__seg-btn {
  padding: 6px 14px;
  border: 0;
  border-radius: 6px;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-secondary);
  background: transparent;
  cursor: pointer;
  transition: background-color var(--faster-duration) linear, color var(--faster-duration) linear;
}

.island-lab__seg-btn.is-on {
  color: var(--text-primary);
  background: var(--ctrl-fill-secondary);
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
}

.island-lab__switches {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.island-lab__stage {
  position: sticky;
  top: 132px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.island-lab__readout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 10px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
}

.island-lab__readout-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.island-lab__readout-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.island-lab__readout-item .site-chip {
  align-self: flex-start;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ======================================================== 状态机 ==== */

.island-phase__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.island-phase__index {
  font-family: var(--mono-font);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-tertiary);
}

.island-page__bar {
  margin-top: 16px;
}

/* ==================================================== 设置键 / 外观 ==== */

.island-page__split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: 28px;
  align-items: start;
}

.island-page__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.island-page__list li {
  display: flex;
  gap: 10px;
  font-size: 13.5px;
  line-height: 22px;
  color: var(--text-secondary);
}

.island-page__list .icon {
  margin-top: 5px;
  font-size: 11px;
  color: var(--brand-1);
}

.island-page__path {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 22px 0 0;
  font-size: 12.5px;
  color: var(--text-tertiary);
}

.island-page__path code {
  font-family: var(--mono-font);
  padding: 3px 8px;
  border-radius: 5px;
  color: var(--text-secondary);
  background: var(--subtle-secondary);
}

@media (max-width: 1080px) {
  .island-lab {
    grid-template-columns: minmax(0, 1fr);
  }

  .island-lab__stage {
    position: static;
  }

  .island-page__split {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
