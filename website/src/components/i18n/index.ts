import { inject, provide, type App, type Ref, ref } from 'vue'
import enUS from '../Strings/en-US/Resources'
import zhCN from '../Strings/zh-CN/Resources'

export type Locale = 'en-US' | 'zh-CN'
export type I18nValues = Record<string, string | number | boolean | null | undefined>
export type ResourceMap = Record<string, string>
export type ResourceBundle = Record<Locale, ResourceMap>

export interface I18n {
  locale: Locale
  t: (key: string, values?: I18nValues) => string
}

export const i18nKey = Symbol.for('WinUIonWeb.i18n')

export const componentResources: ResourceBundle = {
  'en-US': enUS,
  'zh-CN': zhCN,
}

export const normalizeLocale = (locale?: string): Locale => {
  const normalized = (locale || 'zh-CN').toLowerCase()
  if (normalized.startsWith('zh')) return 'zh-CN'
  return 'en-US'
}

const format = (value: string, values?: I18nValues) => {
  if (!values) return value
  return value.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''))
}

export const createI18n = (
  locale = navigator.language,
  extraResources?: Partial<ResourceBundle>
): I18n => {
  const currentLocale = normalizeLocale(locale)
  const currentResources = {
    ...componentResources[currentLocale],
    ...extraResources?.[currentLocale],
  }
  const fallbackResources = {
    ...componentResources['en-US'],
    ...extraResources?.['en-US'],
  }

  const t = (key: string, values?: I18nValues) => {
    const value = currentResources[key] ?? fallbackResources[key] ?? key
    return format(value, values)
  }

  return {
    locale: currentLocale,
    t,
  }
}

export const useI18n = () => inject(i18nKey, createI18n('zh-CN'))

/* ---------------------------------------------------------------- 站点扩展 ---- */

const LOCALE_STORAGE_KEY = 'winisland.locale'

/** 读一次系统/用户偏好：先是手动选过的，再是浏览器语言，中文归 zh-CN，其余 en-US。 */
export const detectLocale = (): Locale => {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved) return normalizeLocale(saved)
  } catch {
    /* 隐私模式里 localStorage 可能直接抛错，忽略即可 */
  }
  return normalizeLocale(navigator.language)
}

export const persistLocale = (locale: Locale) => {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    /* 同上 */
  }
}

/**
 * 装一个可切换语言的 i18n。
 *
 * createI18n() 返回的是闭包里的静态函数，切语言得整包重建，
 * 所以这里把当前包放进一个 ref，t() 改成每次读 ref —— 组件不用重新挂载。
 */
export interface ReactiveI18n {
  locale: Ref<Locale>
  t: (key: string, values?: I18nValues) => string
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

export const createReactiveI18n = (
  initial: Locale,
  extraResources?: Partial<ResourceBundle>
): ReactiveI18n => {
  const locale = ref<Locale>(initial)
  let current = createI18n(initial, extraResources)

  const setLocale = (next: Locale) => {
    const normalized = normalizeLocale(next)
    if (normalized === locale.value) return
    locale.value = normalized
    current = createI18n(normalized, extraResources)
    persistLocale(normalized)
    document.documentElement.setAttribute('lang', normalized)
  }

  return {
    locale,
    t: (key, values) => current.t(key, values),
    setLocale,
    toggleLocale: () => setLocale(locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'),
  }
}

export const provideI18n = (app: App, i18n: ReactiveI18n) => {
  app.provide(i18nKey, i18n)
}

export const useReactiveI18n = (): ReactiveI18n =>
  inject(i18nKey, createReactiveI18n('zh-CN')) as ReactiveI18n
