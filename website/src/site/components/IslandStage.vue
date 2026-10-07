<script setup lang="ts">
/**
 * IslandStage —— 用 Web 把 WinIsland 的「岛」完整复刻出来，并且真的能玩。
 *
 * 复刻的状态机（与宿主 IslandWindow 一致）：
 *
 *   空闲胶囊 ──hover──▶ 展开岛（主岛 + 队列卡片 + 翻页按钮）
 *      ▲                    │
 *      │                    ├─ 点主岛 ──▶ 聚光卡「超级展开」（全屏遮罩 + 飞入）
 *      │                    ├─ ShowMessage ──▶ 临时消息卡（宽度跟随内容）
 *      └── 拖文件进来 ◀──────┴─ 投放面板（一排投放卡片，悬停放大、两端自动滚动）
 *
 * 所有外观都从 resolveIslandTheme() 取，切换 Apple/Fluent、材质、明暗时整块跟着变。
 */
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from '../../components/i18n'
import WinButton from '../../components/WinButton.vue'
import {
  ISLAND_METRICS,
  materialBackdrop,
  resolveIslandTheme,
  type IslandHorizontal,
  type IslandMaterialKind,
  type IslandPosition,
  type IslandStyleKind,
} from '../services/islandTheme'
import {
  demoActivities,
  matchDropTargets,
  type DemoActivity,
  type DemoDropTarget,
} from '../services/demoData'
import IslandMediaView from './island/IslandMediaView.vue'
import IslandBatteryView from './island/IslandBatteryView.vue'
import IslandMonitorView from './island/IslandMonitorView.vue'
import IslandWeatherView from './island/IslandWeatherView.vue'
import IslandMessagingView from './island/IslandMessagingView.vue'
import IslandSpotlight from './island/IslandSpotlight.vue'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    style?: IslandStyleKind
    material?: IslandMaterialKind
    position?: IslandPosition
    horizontal?: IslandHorizontal
    light?: boolean
    /** 演示舞台的高度 */
    stageHeight?: number
  }>(),
  {
    style: 'apple',
    material: 'acrylic',
    position: 'top',
    horizontal: 'center',
    light: false,
    stageHeight: 420,
  }
)

const theme = computed(() => resolveIslandTheme(props.style, props.material, props.light))
const backdrop = computed(() => materialBackdrop(props.material, !theme.value.isLight))

/* ---------------------------------------------------------------- 状态机 ---- */

type Phase = 'idle' | 'expanded' | 'message' | 'drop'

const phase = ref<Phase>('idle')
const hovered = ref(false)
const dropActive = ref(false)
const hoverTileId = ref<string | null>(null)
const spotlightOpen = ref(false)

/** 队列翻页游标：末尾那张卡是"翻页位"，点一下换成下一个 */
const queuePage = ref(0)

/** 主岛 = 优先级最高的活动；其余按优先级进队列 */
const sorted = computed(() => [...demoActivities].sort((a, b) => b.priority - a.priority))
const primary = computed(() => sorted.value[0])

/**
 * 宿主只显示 3 张队列卡：前两张按优先级固定，最后一张是翻页位。
 * 翻页位在"剩下的活动"里循环，所以排在后面的活动也一定翻得到。
 */
const fixedQueue = computed(() => sorted.value.slice(1, 3))
const pagedPool = computed(() => sorted.value.slice(3))

const tailActivity = computed<DemoActivity | null>(() => {
  if (pagedPool.value.length === 0) return null
  return pagedPool.value[queuePage.value % pagedPool.value.length]
})

const queueVisible = computed(() => {
  const list = [...fixedQueue.value]
  if (tailActivity.value) list.push(tailActivity.value)
  return list
})

const canFlip = computed(() => pagedPool.value.length > 1)

const flipQueue = () => {
  if (!canFlip.value) return
  queuePage.value = (queuePage.value + 1) % pagedPool.value.length
  // 换页位时给每张卡一点错位动画
  queueAnimKey.value++
}
const queueAnimKey = ref(0)

const showAll = ref(false)
/** 展开态：显示全部活动还是只显示前 3 张 */
const queueExtended = computed(() => (showAll.value ? sorted.value.slice(1) : queueVisible.value))

/* ---------------------------------------------------------- 临时消息 ---- */

interface DemoMessage {
  title: string
  text?: string
  glyph: string
  accent?: string
}

const message = ref<DemoMessage | null>(null)
let messageTimer: number | undefined

const showMessage = (msg: DemoMessage, phaseAfter: Phase = 'message') => {
  message.value = msg
  phase.value = phaseAfter
  window.clearTimeout(messageTimer)
  messageTimer = window.setTimeout(() => {
    message.value = null
    phase.value = hovered.value ? 'expanded' : 'idle'
  }, 4200)
}

/** 演示用的快捷消息（对应插件里的 Context.Island.ShowMessage） */
const sampleMessages = computed<Array<{ label: string; msg: DemoMessage }>>(() => [
  { label: t('island.action.msgMedia'), msg: { title: t('island.msg.mediaTitle'), text: t('island.msg.mediaText'), glyph: '\uE8D6', accent: '#0a84ff' } },
  { label: t('island.action.msgBattery'), msg: { title: t('island.msg.batteryTitle'), glyph: '\uE83F', accent: '#32d0c8' } },
  { label: t('island.action.msgNeutral'), msg: { title: t('island.msg.neutralTitle'), text: t('island.msg.neutralText'), glyph: '\uE946' } },
])

const fireSample = (item: { msg: DemoMessage }) => showMessage(item.msg)

/* ------------------------------------------------------------ 拖放 ---- */

const dropKind = ref<'files' | 'text' | 'image' | null>(null)
const dropPayload = ref<{ title: string; detail: string; preview?: string } | null>(null)
const dragOver = ref(false)

const availableTargets = computed<DemoDropTarget[]>(() => {
  const names = dropPayloadNames.value
  return matchDropTargets(dropKind.value, names)
})

const dropPayloadNames = ref<string[]>([])

const readDragPayload = (ev: DragEvent): { kind: 'files' | 'text' | 'image'; names: string[]; title: string; detail: string; preview?: string } | null => {
  const dt = ev.dataTransfer
  if (!dt) return null

  const files = Array.from(dt.files || [])
  if (files.length > 0) {
    const names = files.map((f) => f.name)
    const isImage = files.every((f) => f.type.startsWith('image/'))
    return {
      kind: isImage ? 'image' : 'files',
      names,
      title: files.length === 1 ? files[0].name : t('island.drop.nFiles', { n: files.length }),
      detail: isImage
        ? t('island.drop.imageDetail')
        : files.length === 1
          ? t('island.drop.fileDetail')
          : t('island.drop.filesDetail'),
      preview: isImage && files[0] ? URL.createObjectURL(files[0]) : undefined,
    }
  }

  const text = dt.getData('text/plain')
  if (text) {
    const lines = text.split('\n').filter((l) => l.trim().length > 0)
    const looksLikeUrl = /^https?:\/\/\S+$/i.test(text.trim())
    return {
      kind: 'text',
      names: [],
      title: looksLikeUrl ? t('island.drop.link') : lines[0]?.slice(0, 48) || t('island.drop.text'),
      detail: t('island.drop.textDetail', { n: lines.length, chars: text.length }),
    }
  }

  return null
}

const onDragEnter = (ev: DragEvent) => {
  const payload = readDragPayload(ev)
  if (!payload) return
  ev.preventDefault()
  dropKind.value = payload.kind
  dropPayloadNames.value = payload.names
  dropPayload.value = { title: payload.title, detail: payload.detail, preview: payload.preview }
  dropActive.value = true
  dragOver.value = true
  if (phase.value !== 'drop') phase.value = 'drop'
}

const onDragOver = (ev: DragEvent) => {
  if (dropActive.value) ev.preventDefault()
}

const onDragLeave = (ev: DragEvent) => {
  const related = ev.relatedTarget as Node | null
  const current = ev.currentTarget as Node
  if (related && current.contains(related)) return
  dragOver.value = false
  if (!hoverTileId.value) endDrop()
}

const endDrop = () => {
  dropActive.value = false
  dragOver.value = false
  dropKind.value = null
  dropPayload.value = null
  dropPayloadNames.value = []
  hoverTileId.value = null
  if (phase.value === 'drop') phase.value = hovered.value ? 'expanded' : 'idle'
}

const commitDrop = (target: DemoDropTarget) => {
  const result = t(target.resultKey, {
    n: dropPayloadNames.value.length || 1,
    name: dropPayload.value?.title ?? '',
  })
  endDrop()
  showMessage({ title: result, glyph: target.glyph, accent: target.accent })
}

const onDrop = (ev: DragEvent) => {
  ev.preventDefault()
  const target = hoverTileId.value
    ? availableTargets.value.find((x) => x.id === hoverTileId.value)
    : null
  // 松手落空 = 什么都不做，绝不误触发
  if (target) commitDrop(target)
  else endDrop()
}

/** 没有任何卡片能接收它时，摘要要写明 */
const noTargets = computed(() => availableTargets.value.length === 0)

/* ------------------------------------------------------------ 主岛交互 ---- */

const onIslandTap = () => {
  // 对应宿主「点插件自己的按钮不会触发 OnTap」：只有点内容空白处才算点了岛体
  spotlightOpen.value = true
}

/* ---------------------------------------------------------- 悬停展开 ---- */

const enterIsland = () => {
  hovered.value = true
  if (phase.value === 'idle') phase.value = 'expanded'
}
const leaveIsland = () => {
  hovered.value = false
  if (!spotlightOpen.value && !dropActive.value && phase.value === 'expanded') phase.value = 'idle'
}

watch(spotlightOpen, (open) => {
  if (!open && !hovered.value && phase.value === 'expanded') phase.value = 'idle'
})

/* ------------------------------------------------------------ 布局 ---- */

const dropEnabled = ref(true)
const hoverExpand = ref(true)
const hideWhenIdle = ref(false)

/** 紧凑态宽度：跟随主岛内容，夹在 126..200 */
const compactWidth = computed(() =>
  Math.min(ISLAND_METRICS.compactMaxWidth, Math.max(ISLAND_METRICS.compactMinWidth, primary.value.compactWidth))
)

const isExpanded = computed(() => phase.value === 'expanded' || phase.value === 'drop')
const isMessage = computed(() => phase.value === 'message' && message.value !== null)

/** 岛的当前外框宽度 */
const frameWidth = computed(() => {
  if (isMessage.value || phase.value === 'drop') {
    return Math.max(ISLAND_METRICS.messageMaxWidth, ISLAND_METRICS.queueCardWidth)
  }
  if (isExpanded.value) return ISLAND_METRICS.queueCardWidth
  return compactWidth.value
})

/** 展开态是否向上生长（底部停靠时队列在岛体上方） */
const growsUp = computed(() => props.position === 'bottom')

/** 水平摆放：left / center / right */
const anchorStyle = computed(() => {
  switch (props.horizontal) {
    case 'left':
      return { left: '9%', right: 'auto', transform: 'none' }
    case 'right':
      return { right: '9%', left: 'auto', transform: 'none' }
    default:
      return { left: '50%', right: 'auto', transform: 'translateX(-50%)' }
  }
})

/** 队列在岛体的哪一侧 */
const queueSide = computed(() => (growsUp.value ? 'column-reverse' : 'column'))

const stageStyle = computed(() => ({
  '--island-width': `${frameWidth.value}px`,
  '--island-height': `${ISLAND_METRICS.compactHeight}px`,
  '--island-surface': theme.value.surface,
  '--island-stroke': theme.value.stroke,
  '--island-radius': `${theme.value.compactRadius}px`,
  '--island-expanded-radius': `${theme.value.expandedRadius}px`,
  '--island-queue-radius': `${theme.value.queueRadius}px`,
  '--island-backdrop': backdrop.value,
  '--island-top-highlight': theme.value.topHighlight ?? 'transparent',
  '--on-primary': theme.value.onSurfacePrimary,
  '--on-secondary': theme.value.onSurfaceSecondary,
  '--on-tertiary': theme.value.onSurfaceTertiary,
  '--on-hover': theme.value.onSurfaceHover,
  '--on-active': theme.value.onSurfaceActive,
  '--panel-text': theme.value.panelText,
  '--panel-secondary': theme.value.panelSecondary,
  '--panel-hint': theme.value.panelHint,
  '--panel-fade': theme.value.panelFade,
  '--message-chip': theme.value.messageChipFill,
  '--message-title': theme.value.messageTitle,
  '--message-text': theme.value.messageText,
  '--drop-tile': theme.value.dropTileFill,
  '--drop-highlight': theme.value.dropTileHighlight,
  height: `${props.stageHeight}px`,
  ...(props.position === 'top' ? { paddingTop: '28px' } : { paddingBottom: '28px' }),
}))

const ACCENT = '#0a84ff'
const spotFill = computed(() => theme.value.spotlightSurface)
const spotStroke = computed(() => theme.value.spotlightStroke)
const spotRadius = computed(() => `${theme.value.spotlightRadius}px`)
const spotText = computed(() => theme.value.spotlightText)
const spotTextSecondary = computed(() => theme.value.spotlightTextSecondary)
const spotTextTertiary = computed(() => theme.value.spotlightTextTertiary)
const spotHover = computed(() => theme.value.spotlightHover)
const spotStrokeSoft = computed(() => theme.value.spotlightStrokeSoft)

/* ---------------------------------------------------- 音条 / 电量等演示 ---- */
const eqBars = [0, 1, 2, 3, 4]
const batteryPct = 78
const monthNames = computed(() => t('island.demo.monthLabel'))

onBeforeUnmount(() => {
  window.clearTimeout(messageTimer)
  if (dropPayload.value?.preview) URL.revokeObjectURL(dropPayload.value.preview)
})

const viewFor = (id: string) => {
  switch (id) {
    case 'media':
      return IslandMediaView
    case 'battery':
      return IslandBatteryView
    case 'monitor':
      return IslandMonitorView
    case 'weather':
      return IslandWeatherView
    default:
      return IslandMessagingView
  }
}

defineExpose({ hovered, phase, fireSample })
</script>

<template>
  <div
    class="island-stage"
    :class="[`island-stage--${style}`, { 'is-tall-light': theme.isLight }]"
    :style="stageStyle"
    @dragenter="onDragEnter"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <!-- 桌面壁纸感的背景，好让 Acrylic 真的有东西可"磨砂" -->
    <div class="island-stage__wallpaper" aria-hidden="true">
      <span class="island-stage__blob island-stage__blob--a" />
      <span class="island-stage__blob island-stage__blob--b" />
      <span class="island-stage__blob island-stage__blob--c" />
    </div>

    <!-- 任务栏条带（底部停靠模式） -->
    <div v-if="position === 'bottom'" class="island-stage__taskbar" aria-hidden="true">
      <span class="island-stage__taskbar-pill" />
      <span class="island-stage__taskbar-pill" />
      <span class="island-stage__taskbar-pill" />
    </div>

    <div class="island-stage__frame" :style="anchorStyle">
      <div class="island-stack" :style="{ flexDirection: queueSide }">
        <!-- ================= 展开态：队列卡片 ================= -->
        <TransitionGroup v-if="isExpanded" name="island-queue" tag="div" class="island-queue">
          <div
            v-for="(act, idx) in queueExtended"
            :key="`${act.id}-${idx}`"
            class="island-queue-card"
            :style="{ '--i': idx }"
          >
            <div class="island-queue-card__head">
              <span class="icon island-queue-card__glyph" :style="{ color: act.accent }">{{ act.glyph }}</span>
              <span class="island-queue-card__owner">{{ act.owner }}</span>
              <span class="island-queue-card__title">{{ t(act.titleKey) }}</span>
            </div>
            <div class="island-queue-card__sub">{{ t(act.subtitleKey) }}</div>
          </div>

          <!-- 翻页按钮：队列还有别的活动时出现在末尾 -->
          <button
            v-if="canFlip"
            key="flip"
            class="island-queue-flip"
            type="button"
            :title="t('island.queue.flip')"
            @click.stop="flipQueue"
          >
            <span class="icon">&#xE72C;</span>
            <span class="island-queue-flip__count">{{ pagedPool.length }}</span>
          </button>
        </TransitionGroup>

        <!-- ================= 主岛 / 消息 / 投放面板 ================= -->
        <div
          class="island-body"
          :class="{
            'is-expanded': isExpanded,
            'is-message': isMessage,
            'is-drop': phase === 'drop',
          }"
          @mouseenter="hoverExpand && enterIsland()"
          @mouseleave="leaveIsland"
          @click="onIslandTap"
        >
          <span v-if="theme.topHighlight" class="island-body__highlight" aria-hidden="true" />

          <!-- ---- 空闲胶囊 ---- -->
          <div v-if="phase === 'idle'" class="island-idle">
            <span class="island-idle__dot" />
          </div>

          <!-- ---- 紧凑态：主内容一行摘要 ---- -->
          <div v-else-if="!isExpanded && !isMessage" class="island-compact">
            <span class="icon island-compact__glyph" :style="{ color: primary.accent }">{{ primary.glyph }}</span>
            <span class="island-compact__text">{{ t(primary.compactKey) }}</span>
            <span v-if="primary.id === 'media'" class="island-eq" aria-hidden="true">
              <i v-for="b in eqBars" :key="b" :style="{ animationDelay: `${b * 0.13}s` }" />
            </span>
          </div>

          <!-- ---- 展开态：主岛内容（各插件自己的视图） ---- -->
          <div v-else-if="isExpanded && phase !== 'drop'" class="island-expanded">
            <component :is="viewFor(primary.id)" :theme="theme" />
            <button class="island-expanded__more" type="button" @click.stop="spotlightOpen = true">
              <span class="icon">&#xE8A7;</span>
              <span>{{ t('island.action.superExpand') }}</span>
            </button>
          </div>

          <!-- ---- 临时消息卡 ---- -->
          <div v-else-if="isMessage && message" class="island-message">
            <span
              class="island-message__chip icon"
              :style="{
                background: message.accent ?? theme.messageChipFill,
                color: message.accent ? '#fff' : theme.onSurfacePrimary,
              }"
              >{{ message.glyph }}</span
            >
            <div class="island-message__body">
              <div class="island-message__title">{{ message.title }}</div>
              <div v-if="message.text" class="island-message__text">{{ message.text }}</div>
            </div>
          </div>

          <!-- ---- 投放面板 ---- -->
          <div v-else-if="phase === 'drop'" class="island-drop">
            <div class="island-drop__summary">
              <div v-if="dropPayload?.preview" class="island-drop__thumb">
                <img :src="dropPayload.preview" alt="" />
              </div>
              <span v-else class="icon island-drop__icon">&#xE8B7;</span>
              <div class="island-drop__meta">
                <div class="island-drop__title">{{ dropPayload?.title }}</div>
                <div class="island-drop__detail">
                  {{ noTargets ? t('island.drop.noneCanTake') : dropPayload?.detail }}
                </div>
              </div>
            </div>

            <div class="island-drop__rail" :class="{ 'is-empty': noTargets }">
              <button
                v-for="target in availableTargets"
                :key="target.id"
                type="button"
                class="island-drop-tile"
                :class="{ 'is-armed': hoverTileId === target.id, 'is-builtin': target.builtin }"
                :style="{
                  '--tile-accent': target.accent ?? theme.dropTileHighlight,
                }"
                @mouseenter="hoverTileId = target.id"
                @mouseleave="hoverTileId = null"
                @click.stop="commitDrop(target)"
              >
                <span class="icon island-drop-tile__glyph">{{ target.glyph }}</span>
                <span class="island-drop-tile__label">{{ t(target.titleKey) }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 控制台 ================= -->
    <div class="island-console">
      <div class="island-console__row">
        <span class="island-console__label">{{ t('island.console.messages') }}</span>
        <WinButton
          v-for="(item, i) in sampleMessages"
          :key="i"
          Style="SubtleButtonStyle"
          Padding="8,4"
          MinWidth="0"
          Height="28"
          FontSize="12"
          @click.stop="fireSample(item)"
        >
          {{ item.label }}
        </WinButton>
      </div>

      <div class="island-console__row">
        <span class="island-console__label">{{ t('island.console.drag') }}</span>
        <span class="island-console__hint">{{ t('island.console.dragHint') }}</span>
      </div>

      <div class="island-console__row">
        <span class="island-console__label">{{ t('island.console.switches') }}</span>
        <button
          class="island-chip"
          :class="{ 'is-on': hoverExpand }"
          type="button"
          @click="hoverExpand = !hoverExpand"
        >
          island.hoverExpand
        </button>
        <button
          class="island-chip"
          :class="{ 'is-on': dropEnabled }"
          type="button"
          @click="dropEnabled = !dropEnabled"
        >
          island.dropEnabled
        </button>
        <button
          class="island-chip"
          :class="{ 'is-on': hideWhenIdle }"
          type="button"
          @click="hideWhenIdle = !hideWhenIdle"
        >
          island.hideWhenIdle
        </button>
        <button class="island-chip" type="button" @click="spotlightOpen = true">
          OpenSpotlight()
        </button>
      </div>
    </div>

    <!-- ================= 聚光卡 ================= -->
    <IslandSpotlight
      v-model:open="spotlightOpen"
      :radius="spotRadius"
      :surface="spotFill"
      :stroke="spotStroke"
      :text="spotText"
      :text-secondary="spotTextSecondary"
      :text-tertiary="spotTextTertiary"
      :hover="spotHover"
      :stroke-soft="spotStrokeSoft"
      :accent="ACCENT"
      :activity="primary"
    />
  </div>
</template>

<style>
.island-stage {
  position: relative;
  width: 100%;
  border: 1px solid var(--card-stroke);
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--solid-base);
  display: flex;
  flex-direction: column;
  isolation: isolate;
}

/* 壁纸层——让磨砂材质真有东西可磨 */
.island-stage__wallpaper {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(120% 90% at 12% 8%, rgba(94, 92, 230, 0.5), transparent 60%),
    radial-gradient(100% 80% at 88% 18%, rgba(10, 132, 255, 0.45), transparent 62%),
    radial-gradient(120% 110% at 50% 108%, rgba(50, 208, 200, 0.36), transparent 60%),
    linear-gradient(160deg, #101322 0%, #0a0d18 55%, #05070c 100%);
}
html.theme-light .island-stage__wallpaper {
  background:
    radial-gradient(120% 90% at 12% 8%, rgba(94, 92, 230, 0.34), transparent 60%),
    radial-gradient(100% 80% at 88% 18%, rgba(10, 132, 255, 0.3), transparent 62%),
    radial-gradient(120% 110% at 50% 108%, rgba(50, 208, 200, 0.28), transparent 60%),
    linear-gradient(160deg, #eef1fb 0%, #e4e9f7 55%, #dbe2f4 100%);
}

.island-stage__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(46px);
  opacity: 0.55;
  animation: brand-drift 18s ease-in-out infinite;
}
.island-stage__blob--a {
  width: 240px;
  height: 240px;
  left: 6%;
  top: 10%;
  background: #5e5ce6;
}
.island-stage__blob--b {
  width: 200px;
  height: 200px;
  right: 10%;
  top: 24%;
  background: #0a84ff;
  animation-delay: -6s;
}
.island-stage__blob--c {
  width: 180px;
  height: 180px;
  left: 44%;
  bottom: -8%;
  background: #32d0c8;
  animation-delay: -12s;
}

/* 任务栏条带 */
.island-stage__taskbar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(20, 22, 34, 0.55);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
html.theme-light .island-stage__taskbar {
  background: rgba(245, 247, 252, 0.62);
  border-top-color: rgba(0, 0, 0, 0.07);
}
.island-stage__taskbar-pill {
  width: 26px;
  height: 22px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.16);
}
html.theme-light .island-stage__taskbar-pill {
  background: rgba(0, 0, 0, 0.12);
}

/* ---- 岛的定位框 ---- */
.island-stage__frame {
  position: absolute;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  width: var(--island-width);
  transition:
    width 0.34s var(--ease-spring),
    left 0.3s var(--ease-out),
    right 0.3s var(--ease-out);
}
.island-stage--top .island-stage__frame,
.island-stage:not([class*='--bottom']) .island-stage__frame {
  top: 28px;
}
.island-stage .island-stage__frame {
  top: auto;
  bottom: auto;
}
/* 顶部摆放：贴工作区顶部；底部摆放：贴着任务栏 */
.island-stage[data-pos='top'] .island-stage__frame {
  top: 28px;
}
.island-stage[data-pos='bottom'] .island-stage__frame {
  bottom: 44px;
}

.island-stack {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  pointer-events: none;
}
.island-stack > * {
  pointer-events: auto;
}

/* ---- 岛体本体 ---- */
.island-body {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--island-height);
  border-radius: var(--island-radius);
  background: var(--island-surface);
  backdrop-filter: var(--island-backdrop);
  -webkit-backdrop-filter: var(--island-backdrop);
  box-shadow: inset 0 0 0 1px var(--island-stroke);
  overflow: hidden;
  transition:
    height 0.34s var(--ease-spring),
    border-radius 0.3s var(--ease-out),
    background-color 0.24s var(--fast-out-slow-in);
}
.island-stage--fluent .island-body {
  backdrop-filter: var(--island-backdrop);
}
.island-body.is-expanded {
  height: auto;
  min-height: 72px;
  border-radius: var(--island-expanded-radius);
  flex-direction: column;
  align-items: stretch;
  padding: 12px;
}
.island-body.is-message {
  height: auto;
  border-radius: var(--island-expanded-radius);
}
.island-body.is-drop {
  height: auto;
  border-radius: var(--island-expanded-radius);
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
}

.island-body__highlight {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--island-top-highlight) 50%,
    transparent 100%
  );
  pointer-events: none;
}

/* ---- 空闲胶囊 ---- */
.island-idle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.island-idle__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: v-bind('theme.idleDot');
  animation: island-idle-breathe 3.4s ease-in-out infinite;
}

/* ---- 紧凑态 ---- */
.island-compact {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 0 12px;
  color: var(--on-primary);
}
.island-compact__glyph {
  font-size: 14px;
  flex: 0 0 auto;
}
.island-compact__text {
  flex: 1 1 auto;
  font-size: 13px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.island-eq {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 14px;
  flex: 0 0 auto;
}
.island-eq i {
  display: block;
  width: 2.5px;
  height: 100%;
  border-radius: 1.5px;
  background: #0a84ff;
  transform-origin: center;
  animation: island-eq-bounce 0.92s ease-in-out infinite;
}
.island-eq i:nth-child(2) {
  animation-duration: 0.72s;
}
.island-eq i:nth-child(3) {
  animation-duration: 1.08s;
}
.island-eq i:nth-child(4) {
  animation-duration: 0.66s;
}
.island-eq i:nth-child(5) {
  animation-duration: 0.94s;
}

/* ---- 展开态主岛 ---- */
.island-expanded {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  color: var(--on-primary);
}
.island-expanded__more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  align-self: flex-end;
  height: 26px;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  background: var(--on-hover);
  color: var(--on-secondary);
  font: inherit;
  font-size: 12px;
  cursor: default;
  transition: background-color var(--fast-duration) var(--fast-out-slow-in);
}
.island-expanded__more:hover {
  background: var(--on-active);
  color: var(--on-primary);
}

/* ---- 队列卡片 ---- */
.island-queue {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.island-queue-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  min-height: 52px;
  padding: 8px 12px;
  border-radius: var(--island-queue-radius);
  background: var(--island-surface);
  backdrop-filter: var(--island-backdrop);
  -webkit-backdrop-filter: var(--island-backdrop);
  box-shadow: inset 0 0 0 1px var(--island-stroke);
  color: var(--on-primary);
  overflow: hidden;
}
.island-queue-card__head {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.island-queue-card__glyph {
  font-size: 13px;
}
.island-queue-card__owner {
  font-size: 10px;
  line-height: 12px;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--on-hover);
  color: var(--on-tertiary);
  letter-spacing: 0.02em;
  flex: 0 0 auto;
}
.island-queue-card__title {
  font-size: 12.5px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.island-queue-card__sub {
  font-size: 11px;
  line-height: 14px;
  color: var(--on-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---- 翻页按钮 ---- */
.island-queue-flip {
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding: 0 10px;
  border: 0;
  border-radius: 13px;
  background: var(--island-surface);
  backdrop-filter: var(--island-backdrop);
  -webkit-backdrop-filter: var(--island-backdrop);
  box-shadow: inset 0 0 0 1px var(--island-stroke);
  color: var(--on-secondary);
  font: inherit;
  font-size: 11px;
  cursor: default;
  transition: color var(--fast-duration) var(--fast-out-slow-in);
}
.island-queue-flip:hover {
  color: var(--on-primary);
}
.island-queue-flip__count {
  font-variant-numeric: tabular-nums;
}

/* ---- 队列进出场 ---- */
.island-queue-enter-active,
.island-queue-leave-active {
  transition:
    opacity 0.24s var(--ease-out),
    transform 0.28s var(--ease-spring);
}
.island-queue-enter-from,
.island-queue-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.94);
}
.island-queue-move {
  transition: transform 0.28s var(--ease-out);
}

/* ---- 临时消息卡 ---- */
.island-message {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 14px;
  color: var(--on-primary);
}
.island-message__chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  min-width: 26px;
  border-radius: 8px;
  font-size: 13px;
}
.island-message__body {
  min-width: 0;
}
.island-message__title {
  font-size: 13px;
  line-height: 17px;
  color: var(--message-title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.island-message__text {
  font-size: 11.5px;
  line-height: 15px;
  color: var(--message-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ---- 投放面板 ---- */
.island-drop {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.island-drop__summary {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 2px;
  min-width: 0;
}
.island-drop__thumb {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--island-stroke);
}
.island-drop__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.island-drop__icon {
  font-size: 18px;
  color: var(--panel-secondary);
  width: 34px;
  min-width: 34px;
  text-align: center;
}
.island-drop__meta {
  min-width: 0;
  flex: 1 1 auto;
}
.island-drop__title {
  font-size: 12.5px;
  line-height: 16px;
  color: var(--panel-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.island-drop__detail {
  font-size: 11px;
  line-height: 14px;
  color: var(--panel-hint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.island-drop__rail {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;
}
.island-drop__rail::-webkit-scrollbar {
  display: none;
}
.island-drop__rail.is-empty {
  display: none;
}

.island-drop-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 76px;
  min-width: 76px;
  height: 62px;
  padding: 6px 4px;
  border: 0;
  border-radius: 8px;
  background: var(--drop-tile);
  box-shadow: inset 0 0 0 1px var(--island-stroke);
  color: var(--panel-text);
  font: inherit;
  cursor: default;
  transition:
    transform 0.18s var(--ease-spring),
    background-color 0.16s var(--fast-out-slow-in);
}
.island-drop-tile.is-builtin {
  opacity: 0.72;
}
.island-drop-tile.is-armed,
.island-drop-tile:hover {
  transform: scale(1.09);
  background: var(--tile-accent);
}
.island-drop-tile__glyph {
  font-size: 17px;
  color: var(--panel-secondary);
}
.island-drop-tile.is-armed .island-drop-tile__glyph {
  color: var(--panel-text);
}
.island-drop-tile__label {
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ---- 控制台 ---- */
.island-console {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 8;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  border: 1px solid var(--card-stroke);
  border-radius: 10px;
  background: var(--flyout-bg);
  backdrop-filter: var(--flyout-backdrop);
  -webkit-backdrop-filter: var(--flyout-backdrop);
}
.island-stage[data-pos='bottom'] .island-console {
  bottom: auto;
  top: 12px;
}
.island-console__row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.island-console__label {
  font-size: 11px;
  line-height: 14px;
  color: var(--text-tertiary);
  min-width: 62px;
  flex: 0 0 auto;
}
.island-console__hint {
  font-size: 11.5px;
  color: var(--text-secondary);
}

.island-chip {
  height: 24px;
  padding: 0 8px;
  border: 1px solid var(--card-stroke);
  border-radius: 12px;
  background: transparent;
  color: var(--text-tertiary);
  font: inherit;
  font-size: 11px;
  font-family: 'Cascadia Code', Consolas, monospace;
  cursor: default;
  transition:
    background-color var(--fast-duration) var(--fast-out-slow-in),
    color var(--fast-duration) var(--fast-out-slow-in);
}
.island-chip:hover {
  background: var(--subtle-secondary);
  color: var(--text-secondary);
}
.island-chip.is-on {
  background: color-mix(in srgb, var(--accent-base) 16%, transparent);
  border-color: color-mix(in srgb, var(--accent-base) 36%, transparent);
  color: var(--accent-base);
}

@media (max-width: 640px) {
  .island-console__label {
    min-width: 100%;
  }
}
</style>
