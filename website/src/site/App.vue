<script setup lang="ts">
/**
 * 站点外壳。
 *
 * 结构照搬 WinIsland 的设置窗：顶部一条 48px 标题栏 + NavigationView 顶部导航，
 * 下面是路由出口（带 WinUI 的页面过渡），最后是页脚。
 * 标题栏右侧放语言与主题开关 —— 这两个是所有页面共享的。
 */
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import WinTitleBar from '../components/WinTitleBar.vue'
import WinNavigationView from '../components/WinNavigationView.vue'
import WinButton from '../components/WinButton.vue'
import WinToolTipService from '../components/WinToolTipService.vue'
import { useReactiveI18n } from '../components/i18n'
import SiteFooter from './components/SiteFooter.vue'
import { useTheme } from './services/themeMode'
import { GITHUB_REPO } from './services/links'

const { t, locale, toggleLocale } = useReactiveI18n()
const { resolved, toggleTheme } = useTheme()
const route = useRoute()
const router = useRouter()

/** 滚过 Hero 之后标题栏才加底色，免得开局就压着大标题 */
const scrolled = ref(false)
onMounted(() => {
  const onScroll = () => (scrolled.value = window.scrollY > 8)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

const navItems = computed(() => [
  { Tag: 'home', Icon: '\uE80F', Content: t('nav.home'), Href: '/' },
  { Tag: 'island', Icon: '\uE7F4', Content: t('nav.island'), Href: '/island' },
  { Tag: 'features', Icon: '\uE9D9', Content: t('nav.features'), Href: '/features' },
  { Tag: 'plugins', Icon: '\uEA86', Content: t('nav.plugins'), Href: '/plugins' },
  { Tag: 'market', Icon: '\uE719', Content: t('nav.market'), Href: '/market' },
  { Tag: 'download', Icon: '\uE896', Content: t('nav.download'), Href: '/download' },
  { Tag: 'about', Icon: '\uE946', Content: t('nav.about'), Href: '/about' },
])

const activeKey = computed(() => {
  const name = String(route.name ?? 'home')
  return name === 'not-found' ? '' : name
})

const onNavInvoke = (item: { Href?: string }) => {
  if (item.Href) router.push(item.Href)
}

// 切页时同步 <title>，浏览器历史与分享链接才像样
watch(
  () => route.meta.title,
  (title) => {
    if (typeof title === 'string') document.title = title
  },
  { immediate: true }
)

watch(locale, () => {
  // 语言变了，页面标题也要跟着换
  const key = `pageTitle.${String(route.name ?? 'home')}`
  const next = t(key)
  if (next !== key) document.title = next
})
</script>

<template>
  <div class="site-shell">
    <header class="site-shell__top" :class="{ 'is-scrolled': scrolled }">
      <WinTitleBar class="site-shell__titlebar">
        <template #left>
          <RouterLink to="/" class="site-brand">
            <span class="site-brand__mark" aria-hidden="true">
              <svg viewBox="0 0 24 12" width="26" height="13">
                <rect x="0.6" y="0.6" width="22.8" height="10.8" rx="5.4" fill="currentColor" opacity="0.16" />
                <rect x="5" y="3.6" width="14" height="4.8" rx="2.4" fill="currentColor" />
                <circle cx="8.6" cy="6" r="1.1" fill="#fff" />
              </svg>
            </span>
            <span class="site-brand__text">WinIsland</span>
            <span class="site-brand__tag">{{ t('app.tagline') }}</span>
          </RouterLink>
        </template>

        <template #right>
          <WinToolTipService :Content="locale === 'zh-CN' ? 'Switch to English' : '切换到中文'" Placement="Bottom">
            <WinButton
              Style="SubtleButtonStyle"
              class="site-shell__icon-btn"
              @click="toggleLocale()"
            >
              <span class="icon" aria-hidden="true">&#xE774;</span>
              <span class="site-shell__icon-text">{{ locale === 'zh-CN' ? 'EN' : '中文' }}</span>
            </WinButton>
          </WinToolTipService>

          <WinToolTipService
            :Content="resolved === 'dark' ? t('common.themeLight') : t('common.themeDark')"
            Placement="Bottom"
          >
            <WinButton
              Style="SubtleButtonStyle"
              class="site-shell__icon-btn"
              @click="toggleTheme()"
            >
              <span class="icon" aria-hidden="true">{{ resolved === 'dark' ? '&#xE706;' : '&#xE708;' }}</span>
            </WinButton>
          </WinToolTipService>

          <WinButton
            Style="AccentButtonStyle"
            class="site-shell__download"
            @click="router.push('/download')"
          >
            <span class="icon" aria-hidden="true">&#xE896;</span>
            <span>{{ t('common.download') }}</span>
          </WinButton>
        </template>
      </WinTitleBar>

      <WinNavigationView
        :MenuItems="navItems"
        :SelectedTag="activeKey"
        @itemInvoked="onNavInvoke"
      />
    </header>

    <main class="site-shell__main">
      <RouterView v-slot="{ Component, route: current }">
        <Transition name="win-page" mode="out-in">
          <component :is="Component" :key="current.path" />
        </Transition>
      </RouterView>
    </main>

    <SiteFooter>
      <template #actions>
        <WinButton Style="SubtleButtonStyle" @click="toggleLocale()">
          <span class="icon" aria-hidden="true">&#xE774;</span>
          <span>{{ locale === 'zh-CN' ? 'English' : '中文' }}</span>
        </WinButton>
      </template>
    </SiteFooter>

    <a class="site-shell__repo-fab" :href="GITHUB_REPO" target="_blank" rel="noreferrer noopener">
      <span class="icon" aria-hidden="true">&#xE943;</span>
      <span>GitHub</span>
    </a>
  </div>
</template>

<style scoped>
.site-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--app-bg);
  color: var(--text-primary);
}

.site-shell__top {
  position: sticky;
  top: 0;
  z-index: 60;
  background: var(--layer-default);
  backdrop-filter: var(--flyout-backdrop);
  transition: box-shadow var(--fast-duration) var(--fast-out-slow-in);
}

.site-shell__top.is-scrolled {
  box-shadow: 0 1px 0 var(--divider-stroke), 0 4px 14px rgb(0 0 0 / 6%);
}

.site-shell__titlebar {
  padding-inline: 16px;
}

.site-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  text-decoration: none;
  outline: none;
}

.site-brand:focus-visible {
  outline: 2px solid var(--focus-stroke-outer);
  outline-offset: 2px;
  border-radius: 4px;
}

.site-brand__mark {
  display: inline-flex;
  color: var(--brand-1);
}

.site-brand__text {
  font-weight: 600;
  letter-spacing: -0.01em;
}

.site-brand__tag {
  margin-left: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--subtle-secondary);
}

.site-shell__icon-btn {
  min-width: 40px;
  gap: 6px;
}

.site-shell__icon-text {
  font-size: 12px;
  font-weight: 600;
}

.site-shell__download {
  gap: 6px;
}

.site-shell__main {
  flex: 1;
  min-width: 0;
}

/* 页面过渡：借 WinUI 的 NavigationTrigger_Default 的语汇 —— 轻微上移 + 淡入 */
.win-page-enter-active {
  transition: opacity var(--normal-duration) var(--fast-out-slow-in),
    transform var(--normal-duration) var(--fast-out-slow-in);
}

.win-page-leave-active {
  transition: opacity var(--fast-duration) var(--fast-out-slow-in),
    transform var(--fast-duration) var(--fast-out-slow-in);
}

.win-page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.win-page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* 右下角的 GitHub 悬浮按钮，小屏藏起来免得挡住操作 */
.site-shell__repo-fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 50;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  color: var(--text-on-accent);
  background: var(--accent-base);
  box-shadow: 0 4px 16px rgb(0 0 0 / 22%);
  transition: transform var(--fast-duration) var(--fast-out-slow-in),
    box-shadow var(--fast-duration) var(--fast-out-slow-in);
}

.site-shell__repo-fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgb(0 0 0 / 28%);
}

@media (max-width: 760px) {
  .site-brand__tag,
  .site-shell__icon-text,
  .site-shell__repo-fab span:last-child {
    display: none;
  }
}
</style>
