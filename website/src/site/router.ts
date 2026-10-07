import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

/**
 * 站点路由。
 *
 * 每页都 lazy import —— 首页只带 IslandStage 那一坨，其它页按需加载。
 * scrollBehavior 里对锚点做平滑滚动，切页时回到顶部（但保留浏览器前进后退的位置）。
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/HomePage.vue'),
    meta: { title: 'WinIsland — Windows 上的动态岛' },
  },
  {
    path: '/island',
    name: 'island',
    component: () => import('./pages/IslandPage.vue'),
    meta: { title: '岛体与外观 — WinIsland' },
  },
  {
    path: '/features',
    name: 'features',
    component: () => import('./pages/FeaturesPage.vue'),
    meta: { title: '功能一览 — WinIsland' },
  },
  {
    path: '/plugins',
    name: 'plugins',
    component: () => import('./pages/PluginsPage.vue'),
    meta: { title: '插件开发 — WinIsland' },
  },
  {
    path: '/market',
    name: 'market',
    component: () => import('./pages/MarketPage.vue'),
    meta: { title: '插件市场 — WinIsland' },
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('./pages/DownloadPage.vue'),
    meta: { title: '下载与安装 — WinIsland' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./pages/AboutPage.vue'),
    meta: { title: '关于 — WinIsland' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: { title: '页面不存在 — WinIsland' },
  },
]

export const createSiteRouter = () =>
  createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: (to, _from, savedPosition) => {
      if (to.hash) {
        return { el: to.hash, behavior: 'smooth', top: 72 }
      }
      if (savedPosition) return savedPosition
      return { top: 0 }
    },
  })
