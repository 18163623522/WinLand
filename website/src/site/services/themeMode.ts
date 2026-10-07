/**
 * 站点的主题（明/暗）开关。
 *
 * 和 WinIsland 宿主一样，外观只有一个真相来源：<html> 上的 class。
 * theme.css 里四套覆盖（:root / @media dark / html.theme-light / html.theme-dark），
 * 这里只负责把 class 落上去 —— 显式选择了就锁住，没选就让系统那套生效。
 */
import { readonly, ref } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'winisland.theme'

const mode = ref<ThemeMode>('system')
/** 系统当前是不是暗色（system 模式下用它决定实际生效的那套） */
const systemDark = ref(false)

const resolved = ref<'light' | 'dark'>('light')

const media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

systemDark.value = media?.matches ?? false

const resolve = (): 'light' | 'dark' => {
  if (mode.value === 'system') return systemDark.value ? 'dark' : 'light'
  return mode.value
}

/** 把当前状态写到 <html>（class 与 color-scheme 都要，滚动条/表单控件才跟着变） */
const sync = () => {
  const next = resolve()
  resolved.value = next
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('theme-dark', next === 'dark')
  root.classList.toggle('theme-light', next === 'light')
  root.style.colorScheme = next
}

export const applyTheme = (next: ThemeMode) => {
  mode.value = next
  sync()
}

export const setThemeMode = (next: ThemeMode) => {
  mode.value = next
  try {
    if (next === 'system') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* 隐私模式下忽略 */
  }
  sync()
}

export const readThemePreference = (): ThemeMode => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
  } catch {
    /* 同上 */
  }
  return 'system'
}

export const toggleTheme = () => {
  setThemeMode(resolved.value === 'dark' ? 'light' : 'dark')
}

// 系统主题变了要跟着走（但只在 system 模式下）
media?.addEventListener?.('change', (event) => {
  systemDark.value = event.matches
  if (mode.value === 'system') sync()
})

sync()

export const themeState = {
  mode: readonly(mode),
  resolved: readonly(resolved),
}

export const useTheme = () => ({
  mode,
  resolved,
  setThemeMode,
  toggleTheme,
})
