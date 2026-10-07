<script setup lang="ts">
/** WinToggleSwitch —— ToggleSwitch 的 Web 复刻。 */
const props = withDefaults(
  defineProps<{
    IsOn?: boolean
    OnContent?: string
    OffContent?: string
    Header?: string
    IsEnabled?: boolean
  }>(),
  { IsEnabled: true }
)

const emit = defineEmits<{ (e: 'update:IsOn', value: boolean): void; (e: 'toggled', value: boolean): void }>()

const toggle = () => {
  if (!props.IsEnabled) return
  const next = !props.IsOn
  emit('update:IsOn', next)
  emit('toggled', next)
}
</script>

<template>
  <div class="win-toggleswitch" :class="{ 'is-disabled': !IsEnabled }">
    <div v-if="Header" class="win-toggleswitch__header">{{ Header }}</div>
    <div class="win-toggleswitch__row">
      <button
        type="button"
        class="win-toggleswitch__track"
        role="switch"
        :aria-checked="IsOn"
        :disabled="!IsEnabled"
        @click="toggle"
      >
        <span class="win-toggleswitch__thumb" />
      </button>
      <span class="win-toggleswitch__label">{{ IsOn ? OnContent : OffContent }}</span>
    </div>
  </div>
</template>

<style>
.win-toggleswitch {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
}
.win-toggleswitch__header {
  font-size: 14px;
  color: var(--text-primary);
}
.win-toggleswitch__row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.win-toggleswitch__track {
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid var(--toggle-border);
  background-color: transparent;
  padding: 0;
  cursor: default;
  transition:
    background-color var(--fast-duration) var(--fast-out-slow-in),
    border-color var(--fast-duration) var(--fast-out-slow-in);
}
.win-toggleswitch__thumb {
  position: absolute;
  top: 50%;
  left: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--toggle-thumb);
  transform: translate(0, -50%);
  transition:
    transform var(--fast-duration) var(--ease-out),
    background-color var(--fast-duration) var(--fast-out-slow-in),
    width var(--fast-duration) var(--ease-out),
    height var(--fast-duration) var(--ease-out);
}
.win-toggleswitch__track:hover .win-toggleswitch__thumb {
  background-color: var(--toggle-thumb-hover);
  width: 14px;
  height: 14px;
  left: 2px;
}
.win-toggleswitch__track[aria-checked='true'] {
  background-color: var(--accent-base);
  border-color: var(--accent-base);
}
.win-toggleswitch__track[aria-checked='true'] .win-toggleswitch__thumb {
  transform: translate(20px, -50%);
  background-color: var(--toggle-on-thumb);
}
.win-toggleswitch__track[aria-checked='true']:hover .win-toggleswitch__thumb {
  transform: translate(19px, -50%);
}
.win-toggleswitch__label {
  font-size: 12px;
  color: var(--text-secondary);
  min-width: 24px;
}
.win-toggleswitch.is-disabled {
  opacity: 0.4;
}
</style>
