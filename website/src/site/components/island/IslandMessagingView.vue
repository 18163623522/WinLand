<script setup lang="ts">
/**
 * 「发送消息」主岛视图 —— 内置的 Messaging 插件本体就是"把一条消息推上岛"，
 * 所以这里直接把 ShowMessage 的入口做出来，让访客点了就看到消息卡。
 */
import { useI18n } from '../../../components/i18n'
import type { IslandTheme } from '../../services/islandTheme'

defineProps<{ theme: IslandTheme }>()

const emit = defineEmits<{ (e: 'send', payload: { title: string; text: string }): void }>()

const { t } = useI18n()
</script>

<template>
  <div class="messaging-view">
    <div class="messaging-view__head">
      <span class="icon messaging-view__glyph">&#xE8BD;</span>
      <div>
        <div class="messaging-view__title">{{ t('island.demo.messaging.title') }}</div>
        <div class="messaging-view__sub">{{ t('island.demo.messaging.subtitle') }}</div>
      </div>
    </div>

    <div class="messaging-view__actions">
      <button
        class="messaging-view__btn"
        type="button"
        @click.stop="emit('send', { title: t('island.msg.mediaTitle'), text: t('island.msg.mediaText') })"
      >
        {{ t('island.action.msgMedia') }}
      </button>
      <button
        class="messaging-view__btn"
        type="button"
        @click.stop="emit('send', { title: t('island.msg.batteryTitle'), text: '' })"
      >
        {{ t('island.action.msgBattery') }}
      </button>
      <button
        class="messaging-view__btn"
        type="button"
        @click.stop="emit('send', { title: t('island.msg.neutralTitle'), text: t('island.msg.neutralText') })"
      >
        {{ t('island.action.msgNeutral') }}
      </button>
    </div>

    <div class="messaging-view__code">
      <code>Context.Island.ShowMessage(new IslandMessage { … })</code>
    </div>
  </div>
</template>

<style>
.messaging-view {
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 100%;
}
.messaging-view__head {
  display: flex;
  align-items: center;
  gap: 9px;
}
.messaging-view__glyph {
  font-size: 18px;
  color: #f0883e;
}
.messaging-view__title {
  font-size: 13px;
  color: var(--on-primary);
}
.messaging-view__sub {
  font-size: 10.5px;
  color: var(--on-tertiary);
}
.messaging-view__actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.messaging-view__btn {
  height: 28px;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  background: var(--on-hover);
  color: var(--on-secondary);
  font: inherit;
  font-size: 11.5px;
  cursor: default;
  transition: background-color var(--fast-duration) var(--fast-out-slow-in);
}
.messaging-view__btn:hover {
  background: var(--on-active);
  color: var(--on-primary);
}
.messaging-view__code {
  font-size: 10.5px;
  color: var(--on-tertiary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.messaging-view__code code {
  font-family: 'Cascadia Code', Consolas, monospace;
}
</style>
