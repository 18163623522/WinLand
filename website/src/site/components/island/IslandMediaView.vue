<script setup lang="ts">
/** 「正在播放」主岛视图 —— 对应宿主 Modules/Media 的展开态。 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '../../../components/i18n'
import type { IslandTheme } from '../../services/islandTheme'

defineProps<{ theme: IslandTheme }>()

const { t } = useI18n()

/** 演示用的"播放进度"，让进度条真的在走 */
const progress = ref(38)
const playing = ref(true)
let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(() => {
    if (!playing.value) return
    progress.value = progress.value >= 100 ? 0 : progress.value + 0.6
  }, 220)
})
onBeforeUnmount(() => window.clearInterval(timer))

const bars = [0, 1, 2, 3, 4, 5]
const elapsed = computed(() => {
  const total = 214
  const sec = Math.round((progress.value / 100) * total)
  return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`
})
</script>

<template>
  <div class="media-view">
    <div class="media-view__row">
      <!-- 封面：用渐变 + 图标代替专辑图，避免依赖外部素材 -->
      <div class="media-view__cover" aria-hidden="true">
        <span class="icon">&#xE8D6;</span>
      </div>
      <div class="media-view__info">
        <div class="media-view__title">{{ t('island.demo.media.title') }}</div>
        <div class="media-view__artist">{{ t('island.demo.media.subtitle') }}</div>
      </div>
      <div class="media-view__eq" aria-hidden="true">
        <i v-for="b in bars" :key="b" :style="{ animationDelay: `${b * 0.12}s` }" />
      </div>
    </div>

    <div class="media-view__progress">
      <span class="media-view__time">{{ elapsed }}</span>
      <div class="media-view__track" @click="progress = Math.round((($event.offsetX / ($event.currentTarget as HTMLElement).clientWidth) * 100))">
        <div class="media-view__fill" :style="{ width: `${progress}%` }" />
      </div>
      <span class="media-view__time">03:34</span>
    </div>

    <div class="media-view__controls">
      <button class="media-view__btn" type="button" :title="t('island.demo.media.prev')">
        <span class="icon">&#xE892;</span>
      </button>
      <button
        class="media-view__btn media-view__btn--primary"
        type="button"
        :title="playing ? t('island.demo.media.pause') : t('island.demo.media.play')"
        @click.stop="playing = !playing"
      >
        <span class="icon">{{ playing ? '\uE769' : '\uE768' }}</span>
      </button>
      <button class="media-view__btn" type="button" :title="t('island.demo.media.next')">
        <span class="icon">&#xE893;</span>
      </button>
      <span class="media-view__spacer" />
      <span class="media-view__source">{{ t('island.demo.media.source') }}</span>
    </div>
  </div>
</template>

<style>
.media-view {
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 100%;
}
.media-view__row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.media-view__cover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 8px;
  font-size: 18px;
  color: #fff;
  background: linear-gradient(140deg, #0a84ff 0%, #5e5ce6 55%, #32d0c8 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}
.media-view__info {
  min-width: 0;
  flex: 1 1 auto;
}
.media-view__title {
  font-size: 13px;
  line-height: 17px;
  color: var(--on-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.media-view__artist {
  font-size: 11.5px;
  line-height: 15px;
  color: var(--on-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.media-view__eq {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 18px;
  flex: 0 0 auto;
}
.media-view__eq i {
  display: block;
  width: 2.5px;
  height: 100%;
  border-radius: 1.5px;
  background: #0a84ff;
  transform-origin: bottom;
  animation: island-eq-bounce 0.9s ease-in-out infinite;
}
.media-view__eq i:nth-child(2) {
  animation-duration: 0.7s;
}
.media-view__eq i:nth-child(3) {
  animation-duration: 1.05s;
}
.media-view__eq i:nth-child(4) {
  animation-duration: 0.64s;
}
.media-view__eq i:nth-child(5) {
  animation-duration: 0.96s;
}
.media-view__eq i:nth-child(6) {
  animation-duration: 0.8s;
}

.media-view__progress {
  display: flex;
  align-items: center;
  gap: 8px;
}
.media-view__time {
  font-size: 10.5px;
  line-height: 14px;
  color: var(--on-tertiary);
  font-variant-numeric: tabular-nums;
  flex: 0 0 auto;
}
.media-view__track {
  flex: 1 1 auto;
  height: 4px;
  border-radius: 2px;
  background: var(--on-hover);
  overflow: hidden;
  cursor: default;
}
.media-view__fill {
  height: 100%;
  border-radius: 2px;
  background: #0a84ff;
  transition: width 0.22s linear;
}

.media-view__controls {
  display: flex;
  align-items: center;
  gap: 4px;
}
.media-view__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--on-secondary);
  font-size: 12px;
  cursor: default;
  transition: background-color var(--fast-duration) var(--fast-out-slow-in);
}
.media-view__btn:hover {
  background: var(--on-hover);
  color: var(--on-primary);
}
.media-view__btn--primary {
  width: 32px;
  height: 32px;
  font-size: 14px;
  background: #0a84ff;
  color: #fff;
}
.media-view__btn--primary:hover {
  background: #2f97ff;
  color: #fff;
}
.media-view__spacer {
  flex: 1 1 auto;
}
.media-view__source {
  font-size: 10.5px;
  color: var(--on-tertiary);
}
</style>
