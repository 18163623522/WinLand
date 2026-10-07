<script setup lang="ts">
/**
 * IslandSpotlight —— 「超级展开」聚光卡（对应宿主 Island/SpotlightWindow）。
 *
 * 真实宿主里它是一扇铺满主岛所在显示器的全屏覆盖窗：暗化遮罩 + 居中大卡片，
 * 从岛体位置带倾角飞入，点卡片外区域或按 Esc 反向飞回。
 * 这里用 Teleport 到 body 复刻同一套行为，仍然走 WinIsland 的 `OnClosed` 语义。
 */
import { onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from '../../../components/i18n'
import type { IslandTheme } from '../../services/islandTheme'

const props = withDefaults(
  defineProps<{
    open: boolean
    radius: string
    surface: string
    stroke: string
    text: string
    textSecondary: string
    textTertiary: string
    hover: string
    strokeSoft: string
    accent: string
    activity?: { owner: string; glyph: string; accent: string; titleKey: string; subtitleKey: string } | null
  }>(),
  { activity: null }
)

const emit = defineEmits<{ (e: 'update:open', value: boolean): void; (e: 'closed'): void }>()

const { t } = useI18n()

const closing = ref(false)
const hoveredSlice = ref<number | null>(null)

const close = () => {
  if (closing.value) return
  closing.value = true
  window.setTimeout(() => {
    closing.value = false
    emit('update:open', false)
    // 任何关闭路径都会回调一次 —— 与宿主 IslandSpotlight.OnClosed 同语义
    emit('closed')
  }, 260)
}

const onVeilClick = (ev: MouseEvent) => {
  // 点卡片外区域才收起（卡片自身的点击已在上层 stop）
  const target = ev.target as HTMLElement
  if (target.dataset.veil === 'true') close()
}

const onKey = (ev: KeyboardEvent) => {
  if (ev.key === 'Escape') close()
}

watch(
  () => props.open,
  (v) => {
    if (v) {
      window.addEventListener('keydown', onKey)
    } else {
      window.removeEventListener('keydown', onKey)
    }
  }
)

onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

/** 卡片里演示一张"磁盘占用"环图，说明聚光卡装得下比大岛更多的信息 */
const slices = [
  { label: 'SYSTEM', pct: 24, color: '#0a84ff' },
  { label: 'APPS', pct: 18, color: '#5e5ce6' },
  { label: 'MEDIA', pct: 31, color: '#32d0c8' },
  { label: 'OTHER', pct: 12, color: '#f0883e' },
]
const RING = 2 * Math.PI * 52
let acc = 0
const arcs = slices.map((s) => {
  const start = acc
  acc += s.pct
  return { ...s, start, length: (s.pct / 100) * RING }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="spotlight">
      <div
        v-if="open"
        class="spotlight-veil"
        :class="{ 'is-closing': closing }"
        data-veil="true"
        @click="onVeilClick"
      >
        <div
          class="spotlight-card"
          :style="{
            borderRadius: radius,
            background: surface,
            boxShadow: `inset 0 0 0 1px ${stroke}, 0 32px 80px rgba(0,0,0,0.5)`,
            color: text,
          }"
          role="dialog"
          aria-modal="true"
        >
          <!-- 卡片头 -->
          <header class="spotlight-card__head">
            <span class="icon spotlight-card__glyph" :style="{ color: activity?.accent ?? accent }">
              {{ activity?.glyph ?? '\uE946' }}
            </span>
            <div class="spotlight-card__titles">
              <div class="spotlight-card__title">
                {{ activity ? t(activity.titleKey) : t('island.spotlight.title') }}
              </div>
              <div class="spotlight-card__sub" :style="{ color: textSecondary }">
                {{ activity ? t(activity.subtitleKey) : t('island.spotlight.subtitle') }}
              </div>
            </div>
            <button
              class="spotlight-card__close"
              type="button"
              :style="{ color: textSecondary }"
              :title="t('island.spotlight.close')"
              @click.stop="close"
            >
              <span class="icon">&#xE711;</span>
            </button>
          </header>

          <div class="spotlight-card__rule" :style="{ background: strokeSoft }" />

          <!-- 内容：宿主只负责窗口与动画，内容树完全由插件提供 -->
          <div class="spotlight-card__content">
            <div class="spotlight-grid">
              <div class="spotlight-ring">
                <svg viewBox="0 0 130 130" aria-hidden="true">
                  <circle cx="65" cy="65" r="52" fill="none" :stroke="hover" stroke-width="11" />
                  <circle
                    v-for="(a, i) in arcs"
                    :key="a.label"
                    cx="65"
                    cy="65"
                    r="52"
                    fill="none"
                    :stroke="a.color"
                    stroke-width="11"
                    :stroke-dasharray="`${a.length - 2} ${RING - a.length + 2}`"
                    :stroke-dashoffset="-((a.start / 100) * RING)"
                    :opacity="hoveredSlice === null || hoveredSlice === i ? 1 : 0.28"
                    transform="rotate(-90 65 65)"
                    stroke-linecap="butt"
                    class="spotlight-ring__slice"
                    @mouseenter="hoveredSlice = i"
                    @mouseleave="hoveredSlice = null"
                  />
                  <text x="65" y="60" text-anchor="middle" class="spotlight-ring__num" :fill="text">85</text>
                  <text x="65" y="76" text-anchor="middle" class="spotlight-ring__unit" :fill="textTertiary">
                    {{ t('island.spotlight.used') }}
                  </text>
                </svg>
              </div>

              <div class="spotlight-legend">
                <button
                  v-for="(a, i) in arcs"
                  :key="a.label"
                  type="button"
                  class="spotlight-legend__item"
                  :style="{
                    background: hoveredSlice === i ? hover : 'transparent',
                  }"
                  @mouseenter="hoveredSlice = i"
                  @mouseleave="hoveredSlice = null"
                >
                  <span class="spotlight-legend__dot" :style="{ background: a.color }" />
                  <span class="spotlight-legend__label">{{ a.label }}</span>
                  <span class="spotlight-legend__pct" :style="{ color: textSecondary }">{{ a.pct }}%</span>
                </button>
              </div>

              <div class="spotlight-stats">
                <div class="spotlight-stat">
                  <span class="spotlight-stat__label" :style="{ color: textTertiary }">
                    {{ t('island.spotlight.read') }}
                  </span>
                  <span class="spotlight-stat__value">4.12 GB/s</span>
                </div>
                <div class="spotlight-stat">
                  <span class="spotlight-stat__label" :style="{ color: textTertiary }">
                    {{ t('island.spotlight.write') }}
                  </span>
                  <span class="spotlight-stat__value">1.86 GB/s</span>
                </div>
                <div class="spotlight-stat">
                  <span class="spotlight-stat__label" :style="{ color: textTertiary }">
                    {{ t('island.spotlight.temp') }}
                  </span>
                  <span class="spotlight-stat__value">42 °C</span>
                </div>
                <div class="spotlight-stat">
                  <span class="spotlight-stat__label" :style="{ color: textTertiary }">
                    {{ t('island.spotlight.health') }}
                  </span>
                  <span class="spotlight-stat__value">98%</span>
                </div>
              </div>
            </div>
          </div>

          <footer class="spotlight-card__foot" :style="{ color: textTertiary }">
            <span class="icon">&#xE7C4;</span>
            <span>{{ t('island.spotlight.hint') }}</span>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.spotlight-veil {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.55);
  animation: spotlight-veil-in 0.28s var(--fast-out-slow-in) both;
}
.spotlight-veil.is-closing {
  animation: win-fade-out 0.26s var(--fast-out-slow-in) both;
}

.spotlight-card {
  position: relative;
  width: min(760px, 92vw);
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: spotlight-fly-in 0.42s var(--ease-spring) both;
}
.spotlight-veil.is-closing .spotlight-card {
  animation: spotlight-fly-out 0.26s var(--fast-out-slow-in) both;
}

.spotlight-card__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px 12px;
}
.spotlight-card__glyph {
  font-size: 20px;
}
.spotlight-card__titles {
  flex: 1 1 auto;
  min-width: 0;
}
.spotlight-card__title {
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
}
.spotlight-card__sub {
  font-size: 12px;
  line-height: 16px;
}
.spotlight-card__close {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  font-size: 13px;
  cursor: default;
  transition: background-color var(--fast-duration) var(--fast-out-slow-in);
}
.spotlight-card__close:hover {
  background: rgba(128, 128, 128, 0.18);
}
.spotlight-card__rule {
  height: 1px;
  margin: 0 18px;
}
.spotlight-card__content {
  padding: 18px;
  overflow-y: auto;
}
.spotlight-card__foot {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px 14px;
  font-size: 11.5px;
}

.spotlight-grid {
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: auto auto;
  gap: 14px 22px;
  align-items: center;
}
.spotlight-ring {
  grid-row: span 2;
}
.spotlight-ring svg {
  width: 150px;
  height: 150px;
  display: block;
}
.spotlight-ring__slice {
  transition: opacity 0.18s var(--fast-out-slow-in);
}
.spotlight-ring__num {
  font-size: 26px;
  font-weight: 600;
}
.spotlight-ring__unit {
  font-size: 10px;
}

.spotlight-legend {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.spotlight-legend__item {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 28px;
  padding: 0 8px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12.5px;
  cursor: default;
  transition: background-color var(--fast-duration) var(--fast-out-slow-in);
}
.spotlight-legend__dot {
  width: 9px;
  height: 9px;
  border-radius: 2px;
  flex: 0 0 auto;
}
.spotlight-legend__label {
  letter-spacing: 0.04em;
  flex: 1 1 auto;
  text-align: left;
}
.spotlight-legend__pct {
  font-variant-numeric: tabular-nums;
}

.spotlight-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.spotlight-stat {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 9px 10px;
  border-radius: 7px;
  background: rgba(128, 128, 128, 0.12);
}
.spotlight-stat__label {
  font-size: 10.5px;
}
.spotlight-stat__value {
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 640px) {
  .spotlight-grid {
    grid-template-columns: 1fr;
  }
  .spotlight-ring {
    grid-row: auto;
    justify-self: center;
  }
  .spotlight-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
