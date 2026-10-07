<script setup lang="ts">
/**
 * 页脚。
 *
 * 左：品牌 + 一句话定位；中：四栏链接（产品 / 开发 / 资源 / 社区）；
 * 右：构建信息（版本号、目标框架、许可证）与主题开关。
 */
import { computed } from 'vue'
import { useReactiveI18n } from '../../components/i18n'
import { GITHUB_ISSUES, GITHUB_REPO, HOST_VERSION, LICENSE_NAME, SDK_VERSION } from '../services/links'

const { t } = useReactiveI18n()

interface FooterLink {
  label: string
  to?: string
  href?: string
}

const columns = computed<{ title: string; links: FooterLink[] }[]>(() => [
  {
    title: t('footer.product'),
    links: [
      { label: t('nav.island'), to: '/island' },
      { label: t('nav.features'), to: '/features' },
      { label: t('nav.download'), to: '/download' },
    ],
  },
  {
    title: t('footer.develop'),
    links: [
      { label: t('nav.plugins'), to: '/plugins' },
      { label: t('nav.market'), to: '/market' },
      { label: t('footer.sdk'), to: '/plugins#sdk' },
    ],
  },
  {
    title: t('footer.resource'),
    links: [
      { label: t('nav.about'), to: '/about' },
      { label: t('aboutPage.faqTitle'), to: '/about#faq' },
      { label: t('footer.changelog'), to: '/about#changelog' },
    ],
  },
  {
    title: t('footer.community'),
    links: [
      { label: 'GitHub', href: GITHUB_REPO },
      { label: t('footer.issues'), href: GITHUB_ISSUES },
      { label: 'GitCode', href: 'https://gitcode.com/luolangaga/WinIsland' },
    ],
  },
])

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <div class="site-footer__brand-row">
          <span class="site-footer__mark" aria-hidden="true">
            <svg viewBox="0 0 24 12" width="28" height="14">
              <rect x="0.6" y="0.6" width="22.8" height="10.8" rx="5.4" fill="currentColor" opacity="0.18" />
              <rect x="5" y="3.6" width="14" height="4.8" rx="2.4" fill="currentColor" />
              <circle cx="8.6" cy="6" r="1.1" fill="#fff" />
            </svg>
          </span>
          <span class="site-footer__name">WinIsland</span>
        </div>
        <p class="site-footer__desc">{{ t('footer.tagline') }}</p>
        <div class="site-footer__badges">
          <span class="site-footer__badge">v{{ HOST_VERSION }}</span>
          <span class="site-footer__badge">SDK {{ SDK_VERSION }}</span>
          <span class="site-footer__badge">{{ LICENSE_NAME }}</span>
        </div>
        <div v-if="$slots.actions" class="site-footer__actions">
          <slot name="actions" />
        </div>
      </div>

      <div class="site-footer__nav">
        <div v-for="column in columns" :key="column.title" class="site-footer__col">
          <h4 class="site-footer__col-title">{{ column.title }}</h4>
          <ul>
            <li v-for="link in column.links" :key="link.label">
              <a v-if="link.href" :href="link.href" target="_blank" rel="noreferrer noopener">{{ link.label }}</a>
              <RouterLink v-else :to="link.to!">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="site-footer__bottom">
      <span>&copy; {{ year }} WinIsland · {{ t('footer.copyright') }}</span>
      <span class="site-footer__note">{{ t('footer.disclaimer') }}</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 80px;
  border-top: 1px solid var(--divider-stroke);
  background: var(--card-bg);
  backdrop-filter: var(--flyout-backdrop);
}

.site-footer__inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 48px 28px 32px;
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(0, 1.5fr);
  gap: 48px;
}

.site-footer__brand-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.site-footer__mark {
  display: inline-flex;
  color: var(--brand-1);
}

.site-footer__name {
  font-size: 15px;
  font-weight: 600;
}

.site-footer__desc {
  margin: 12px 0 16px;
  max-width: 34ch;
  font-size: 13px;
  line-height: 20px;
  color: var(--text-secondary);
}

.site-footer__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.site-footer__badge {
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid var(--card-stroke);
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary);
  background: var(--subtle-secondary);
}

.site-footer__actions {
  margin-top: 18px;
}

.site-footer__nav {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.site-footer__col-title {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.site-footer__nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.site-footer__nav a {
  font-size: 13px;
  color: var(--text-secondary);
  text-decoration: none;
}

.site-footer__nav a:hover {
  color: var(--accent-base);
  text-decoration: underline;
}

.site-footer__bottom {
  max-width: 1240px;
  margin: 0 auto;
  padding: 16px 28px 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  justify-content: space-between;
  border-top: 1px solid var(--divider-stroke);
  font-size: 12px;
  color: var(--text-tertiary);
}

@media (max-width: 900px) {
  .site-footer__inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 36px;
  }

  .site-footer__nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
