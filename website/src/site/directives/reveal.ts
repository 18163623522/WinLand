/**
 * 滚动入场。
 *
 * 全站的 .reveal 元素由它统一接管：进视口加 .is-visible，动画交给 CSS。
 * 尊重 prefers-reduced-motion —— 关掉动效时直接全部点亮，不留任何隐形的块。
 */
import type { Directive } from 'vue'

let observer: IntersectionObserver | null = null

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const ensureObserver = () => {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )
  return observer
}

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    if (reducedMotion()) {
      el.classList.add('is-visible')
      return
    }
    el.classList.add('reveal')
    ensureObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
