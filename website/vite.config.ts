import { copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const rootDir = dirname(fileURLToPath(import.meta.url))

/**
 * SPA 回退：把 index.html 复制成 404.html，静态托管（Cloudflare Pages / GitHub Pages）
 * 就能把未知路由交回给前端路由，而不是吐一个真 404。
 *
 * 用 writeBundle 而不是 closeBundle：closeBundle 跑在 Vite 把带哈希的
 * <script>/<link> 注入 index.html 之前，复制出来的是没有资源引用的空壳。
 * writeBundle 在 html 插件把最终 html 写盘之后触发，`enforce: 'post'`
 * 再保证它排在其他插件（含内置 html 插件）之后。
 */
function spaFallback() {
  return {
    name: 'generate-404-fallback',
    apply: 'build' as const,
    enforce: 'post' as const,
    writeBundle() {
      const dist = resolve(rootDir, 'dist')
      const index = join(dist, 'index.html')
      if (existsSync(index)) {
        copyFileSync(index, join(dist, '404.html'))
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [vue(), spaFallback()],
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src'),
    },
  },
  server: {
    port: 63728,
    open: false,
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
  },
})
