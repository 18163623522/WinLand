<script setup lang="ts">
/** 「硬件监控」主岛视图 —— CPU / GPU 占用 + 网络吞吐 + 前台窗口帧率。 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '../../../components/i18n'
import type { IslandTheme } from '../../services/islandTheme'

defineProps<{ theme: IslandTheme }>()

const { t } = useI18n()

const cpu = ref(34)
const gpu = ref(52)
const fps = ref(144)
const up = ref(1.8)
const down = ref(12.4)
const cpuHistory = ref<number[]>(Array.from({ length: 24 }, () => 20 + Math.random() * 26))

let timer: number | undefined
onMounted(() => {
  timer = window.setInterval(() => {
    cpu.value = Math.max(3, Math.min(98, cpu.value + (Math.random() - 0.48) * 14))
    gpu.value = Math.max(4, Math.min(99, gpu.value + (Math.random() - 0.5) * 12))
    fps.value = Math.round(138 + Math.random() * 14)
    up.value = Math.max(0.05, up.value + (Math.random() - 0.5) * 1.2)
    down.value = Math.max(0.3, down.value + (Math.random() - 0.5) * 7)
    cpuHistory.value = [...cpuHistory.value.slice(1), cpu.value]
  }, 560)
})
onBeforeUnmount(() => window.clearInterval(timer))

const sparkPath = computed(() => {
  const list = cpuHistory.value
  const step = 100 / (list.length - 1)
  return list
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(24 - (v / 100) * 22 - 1).toFixed(1)}`)
    .join(' ')
})

const barColor = (v: number) =>
  v > 85 ? 'var(--SystemFillColorCriticalBrush)' : v > 60 ? '#5e5ce6' : '#3fb950'
</script>

<template>
  <div class="monitor-view">
    <div class="monitor-view__row">
      <div class="monitor-view__metric">
        <span class="monitor-view__label">CPU</span>
        <div class="monitor-view__bar">
          <div class="monitor-view__fill" :style="{ width: `${cpu}%`, background: barColor(cpu) }" />
        </div>
        <span class="monitor-view__value">{{ Math.round(cpu) }}<i>%</i></span>
      </div>
      <div class="monitor-view__metric">
        <span class="monitor-view__label">GPU</span>
        <div class="monitor-view__bar">
          <div class="monitor-view__fill" :style="{ width: `${gpu}%`, background: barColor(gpu) }" />
        </div>
        <span class="monitor-view__value">{{ Math.round(gpu) }}<i>%</i></span>
      </div>
    </div>

    <div class="monitor-view__spark">
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
        <path :d="sparkPath" fill="none" stroke="#5e5ce6" stroke-width="1.2" vector-effect="non-scaling-stroke" />
      </svg>
    </div>

    <div class="monitor-view__foot">
      <span class="monitor-view__chip">
        <span class="icon">&#xE9D9;</span>{{ t('island.demo.monitor.fps') }}
        <b>{{ fps }}</b>
      </span>
      <span class="monitor-view__chip">
        <span class="icon">&#xE898;</span><b>{{ down.toFixed(1) }}</b> MB/s
      </span>
      <span class="monitor-view__chip">
        <span class="icon">&#xE898;</span><b>{{ up.toFixed(1) }}</b> MB/s
      </span>
    </div>
  </div>
</template>

<style>
.monitor-view {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.monitor-view__row {
  display: flex;
  gap: 14px;
}
.monitor-view__metric {
  display: flex;
  align-items: center;
  gap: 7px;
  flex: 1 1 0;
  min-width: 0;
}
.monitor-view__label {
  font-size: 10px;
  line-height: 14px;
  color: var(--on-tertiary);
  letter-spacing: 0.04em;
  flex: 0 0 auto;
}
.monitor-view__bar {
  flex: 1 1 auto;
  height: 5px;
  border-radius: 3px;
  background: var(--on-hover);
  overflow: hidden;
  min-width: 0;
}
.monitor-view__fill {
  height: 100%;
  border-radius: 3px;
  transition:
    width 0.5s var(--ease-out),
    background-color 0.4s linear;
}
.monitor-view__value {
  font-size: 11.5px;
  color: var(--on-primary);
  font-variant-numeric: tabular-nums;
  flex: 0 0 auto;
  min-width: 30px;
  text-align: right;
}
.monitor-view__value i {
  font-style: normal;
  font-size: 9px;
  color: var(--on-tertiary);
}
.monitor-view__spark {
  height: 24px;
}
.monitor-view__spark svg {
  width: 100%;
  height: 100%;
  display: block;
}
.monitor-view__foot {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.monitor-view__chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  color: var(--on-tertiary);
}
.monitor-view__chip .icon {
  font-size: 11px;
}
.monitor-view__chip b {
  color: var(--on-secondary);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
</style>
