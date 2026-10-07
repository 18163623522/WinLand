import { createApp } from 'vue'

import './styles/theme.css'
import './styles/animations.css'

import { createReactiveI18n, detectLocale, provideI18n } from './components/i18n'
import SiteApp from './site/App.vue'
import { createSiteRouter } from './site/router'
import { vReveal } from './site/directives/reveal'
import { applyTheme, readThemePreference } from './site/services/themeMode'

/**
 * 站点入口。
 *
 * 三件事：语言、主题、路由。
 * 语言与主题都在 <html> 上落属性/类，CSS 令牌据此切换；
 * 路由用 history 模式，构建期会把 index.html 复制成 404.html 做回退。
 *
 * 文案全部住在组件库里（components/Strings/**），和参考站点同构 ——
 * 这样岛上那些子视图用同一个 t() 就能取到自己的文案，不用层层透传。
 */

const i18n = createReactiveI18n(detectLocale())

// 首次进入跟随系统，之后记在 localStorage 里
applyTheme(readThemePreference())

document.documentElement.setAttribute('lang', i18n.locale.value)

const app = createApp(SiteApp)

// 全站挂一个 v-reveal：元素滚进视口时点亮
app.directive('reveal', vReveal)

provideI18n(app, i18n)
app.use(createSiteRouter())
app.mount('#app')
