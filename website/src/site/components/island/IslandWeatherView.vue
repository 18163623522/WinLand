<script setup lang="ts">
/** 「天气小岛」主岛视图 —— 当前天气 + 三天预报（对应社区插件 WeatherIsland）。 */
import { useI18n } from '../../../components/i18n'
import type { IslandTheme } from '../../services/islandTheme'

defineProps<{ theme: IslandTheme }>()

const { t } = useI18n()

const days = [
  { key: 'today', glyph: '\uE9BD', high: 27, low: 19 },
  { key: 'tomorrow', glyph: '\uE9C4', high: 24, low: 18 },
  { key: 'day3', glyph: '\uE9BD', high: 29, low: 20 },
]
</script>

<template>
  <div class="weather-view">
    <div class="weather-view__now">
      <span class="icon weather-view__glyph">&#xE9BD;</span>
      <div class="weather-view__temp">
        24<i>°C</i>
      </div>
      <div class="weather-view__place">
        <div>{{ t('island.demo.weather.place') }}</div>
        <div class="weather-view__range">{{ t('island.demo.weather.range') }}</div>
      </div>
    </div>

    <div class="weather-view__days">
      <div v-for="(d, i) in days" :key="i" class="weather-view__day">
        <span class="weather-view__dayname">{{ t(`island.demo.weather.${d.key}`) }}</span>
        <span class="icon weather-view__dayglyph">{{ d.glyph }}</span>
        <span class="weather-view__daytemp">{{ d.high }}° / {{ d.low }}°</span>
      </div>
    </div>
  </div>
</template>

<style>
.weather-view {
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 100%;
}
.weather-view__now {
  display: flex;
  align-items: center;
  gap: 10px;
}
.weather-view__glyph {
  font-size: 24px;
  color: #3fb950;
  flex: 0 0 auto;
}
.weather-view__temp {
  font-size: 22px;
  line-height: 1;
  color: var(--on-primary);
  font-variant-numeric: tabular-nums;
}
.weather-view__temp i {
  font-style: normal;
  font-size: 11px;
  color: var(--on-tertiary);
}
.weather-view__place {
  min-width: 0;
  flex: 1 1 auto;
}
.weather-view__place > div:first-child {
  font-size: 12.5px;
  color: var(--on-secondary);
}
.weather-view__range {
  font-size: 10.5px;
  color: var(--on-tertiary);
}
.weather-view__days {
  display: flex;
  gap: 6px;
}
.weather-view__day {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 4px;
  border-radius: 7px;
  background: var(--on-hover);
}
.weather-view__dayname {
  font-size: 10px;
  color: var(--on-tertiary);
}
.weather-view__dayglyph {
  font-size: 14px;
  color: #3fb950;
}
.weather-view__daytemp {
  font-size: 10.5px;
  color: var(--on-secondary);
  font-variant-numeric: tabular-nums;
}
</style>
