<script setup lang="ts">
/** 「充电监控」主岛视图 —— 电量环 + 实时充电功率曲线。 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '../../../components/i18n'
import type { IslandTheme } from '../../services/islandTheme'

defineProps<{ theme: IslandTheme }>()

const { t } = useI18n()

const R = 15.5
const CIRC = 2 * Math.PI * R

const percent = ref(78)
const charging = ref(true)

/** 功率采样，画成一条折线 */
const samples = ref<number[]>(Array.from({ length: 34 }, (_, i) => 26 + Math.sin(i / 3) * 4 + Math.random() * 6))
let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(() => {
    samples.value = [...samples.value.slice(1), 26 + Math.sin(Date.now() / 2600) * 5 + Math.random() * 7]
    if (charging.value && percent.value < 100) percent.value = Math.min(100, percent.value + 0.4)
  }, 420)
})
onBeforeUnmount(() => window.clearInterval(timer))

const dashOffset = computed(() => CIRC * (1 - percent.value / 100))
const currentWatts = computed(() => samples.value[samples.value.length - 1] ?? 0)

/** 折线路径（viewBox 100x28） */
const path = computed(() => {
  const list = samples.value
  const max = Math.max(...list, 45)
  const step = 100 / (list.length - 1)
  return list
    .map((v, i) => {
      const x = i * step
      const y = 28 - (v / max) * 26 - 1
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
})

const area = computed(() => `${path.value} L100,28 L0,28 Z`)
</script>

<template>
  <div class="battery-view">
    <div class="battery-view__ring">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" :r="R" class="battery-view__ring-track" />
        <circle
          cx="20"
          cy="20"
          :r="R"
          class="battery-view__ring-fill"
          :class="{ 'is-charging': charging }"
          :stroke-dasharray="CIRC"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
      <span class="battery-view__pct">{{ Math.round(percent) }}<i>%</i></span>
    </div>

    <div class="battery-view__body">
      <div class="battery-view__row">
        <span class="icon battery-view__bolt" :class="{ 'is-on': charging }">&#xE83F;</span>
        <span class="battery-view__status">{{
          charging ? t('island.demo.battery.charging') : t('island.demo.battery.discharging')
        }}</span>
        <span class="battery-view__watts">{{ currentWatts.toFixed(1) }} W</span>
      </div>

      <div class="battery-view__chart">
        <svg viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="batteryArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#32d0c8" stop-opacity="0.42" />
              <stop offset="100%" stop-color="#32d0c8" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path :d="area" fill="url(#batteryArea)" />
          <path :d="path" fill="none" stroke="#32d0c8" stroke-width="1.2" vector-effect="non-scaling-stroke" />
        </svg>
      </div>

      <div class="battery-view__meta">
        <span>{{ t('island.demo.battery.capacity') }}</span>
        <span>{{ t('island.demo.battery.cycles') }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.battery-view {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}
.battery-view__ring {
  position: relative;
  width: 52px;
  height: 52px;
  min-width: 52px;
  display: grid;
  place-items: center;
}
.battery-view__ring svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.battery-view__ring-track {
  fill: none;
  stroke: var(--on-hover);
  stroke-width: 3;
}
.battery-view__ring-fill {
  fill: none;
  stroke: #32d0c8;
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s var(--ease-out);
}
.battery-view__ring-fill.is-charging {
  animation: battery-pulse 2.4s ease-in-out infinite;
}
.battery-view__pct {
  position: relative;
  font-size: 13px;
  line-height: 1;
  color: var(--on-primary);
  font-variant-numeric: tabular-nums;
}
.battery-view__pct i {
  font-style: normal;
  font-size: 9px;
  color: var(--on-tertiary);
}

.battery-view__body {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.battery-view__row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.battery-view__bolt {
  font-size: 12px;
  color: var(--on-tertiary);
}
.battery-view__bolt.is-on {
  color: #32d0c8;
}
.battery-view__status {
  font-size: 12px;
  color: var(--on-secondary);
  flex: 1 1 auto;
}
.battery-view__watts {
  font-size: 12px;
  color: var(--on-primary);
  font-variant-numeric: tabular-nums;
}
.battery-view__chart {
  height: 28px;
}
.battery-view__chart svg {
  width: 100%;
  height: 100%;
  display: block;
}
.battery-view__meta {
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  color: var(--on-tertiary);
}
</style>
