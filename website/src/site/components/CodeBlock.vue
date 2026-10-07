<script setup lang="ts">
/**
 * CodeBlock —— 带文件名标题栏与复制按钮的代码块。
 *
 * 语法高亮不做通用解析（站点里只有 C# / JSON / PowerShell / 少量 XML），
 * 只做一层轻量着色：注释、字符串、关键字、类型名、数字。够用且零依赖。
 */
import { computed, ref } from 'vue'
import { useReactiveI18n } from '../../components/i18n'

const props = withDefaults(
  defineProps<{
    code: string
    /** 标题栏左侧的文件名 / 语言标识 */
    filename?: string
    lang?: 'csharp' | 'json' | 'powershell' | 'text'
    /** 折叠最大高度（px），超出给展开按钮 */
    collapseHeight?: number
  }>(),
  { lang: 'csharp' }
)

const { t } = useReactiveI18n()
const copied = ref(false)

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const CSHARP_KEYWORDS =
  /\b(?:public|private|protected|internal|static|class|interface|record|struct|enum|namespace|using|new|return|await|async|void|var|this|base|override|virtual|sealed|readonly|const|if|else|foreach|for|while|switch|case|default|break|continue|try|catch|finally|throw|null|true|false|get|set|init|where|in|out|ref|partial|event|delegate|is|as|nameof|typeof)\b/g

const POWERSHELL_KEYWORDS =
  /\b(?:param|function|if|else|elseif|foreach|for|while|return|try|catch|finally|throw|New-Item|Copy-Item|Remove-Item|Get-ChildItem|Write-Host|Write-Error|Compress-Archive|Expand-Archive|Test-Path)\b/g

const highlight = (raw: string) => {
  let text = escapeHtml(raw)

  // 整体先抽走注释与字符串，避免关键字正则误伤里面的内容。
  // 占位符形如 \u0000x0x\u0000：索引数字两侧必须是单词字符（x），
  // 否则后续的数字 / 关键字 / 类型高亮正则会匹配到索引本身，
  // 把占位符切碎后无法还原（JSON 代码块会把 "键": "值" 渲染成裸索引数字）。
  const stash: string[] = []
  const keep = (html: string) => {
    stash.push(html)
    return `\u0000x${stash.length - 1}x\u0000`
  }

  if (props.lang === 'csharp') {
    text = text.replace(/\/\*[\s\S]*?\*\//g, (m) => keep(`<span class="tk-comment">${m}</span>`))
    text = text.replace(/\/\/[^\n]*/g, (m) => keep(`<span class="tk-comment">${m}</span>`))
    text = text.replace(/&quot;[^&]*?&quot;|"(?:[^"\\\n]|\\.)*"/g, (m) => keep(`<span class="tk-string">${m}</span>`))
    text = text.replace(CSHARP_KEYWORDS, '<span class="tk-keyword">$&</span>')
    text = text.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, '<span class="tk-type">$1</span>')
  } else if (props.lang === 'powershell') {
    text = text.replace(/#[^\n]*/g, (m) => keep(`<span class="tk-comment">${m}</span>`))
    text = text.replace(/'[^']*'|"(?:[^"\\]|\\.)*"/g, (m) => keep(`<span class="tk-string">${m}</span>`))
    text = text.replace(/-\w+/g, (m) => keep(`<span class="tk-flag">${m}</span>`))
    text = text.replace(POWERSHELL_KEYWORDS, '<span class="tk-keyword">$&</span>')
  } else if (props.lang === 'json') {
    text = text.replace(/"(?:[^"\\]|\\.)*"\s*:/g, (m) => keep(`<span class="tk-key">${m}</span>`))
    text = text.replace(/"(?:[^"\\]|\\.)*"/g, (m) => keep(`<span class="tk-string">${m}</span>`))
    text = text.replace(/\b(true|false|null)\b/g, '<span class="tk-keyword">$&</span>')
    text = text.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tk-number">$1</span>')
  }

  text = text.replace(/\u0000x(\d+)x\u0000/g, (_, index) => stash[Number(index)])

  return text
}

const html = computed(() => highlight(props.code))

const collapsible = computed(() => Boolean(props.collapseHeight) && props.code.split('\n').length > 14)
const expanded = ref(false)

const bodyStyle = computed(() =>
  collapsible.value && !expanded.value ? { maxHeight: `${props.collapseHeight}px` } : {}
)

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
  } catch {
    // 非安全上下文（http）里 clipboard 可能没有，退回 textarea 方案
    const area = document.createElement('textarea')
    area.value = props.code
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
  }
  copied.value = true
  window.setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <div class="code-block">
    <div class="code-block__bar">
      <span class="code-block__dots" aria-hidden="true"><i /><i /><i /></span>
      <span class="code-block__filename">{{ filename ?? lang }}</span>
      <button type="button" class="code-block__copy" @click="copy">
        <span class="icon" aria-hidden="true">{{ copied ? '&#xE73E;' : '&#xE8C8;' }}</span>
        <span>{{ copied ? t('common.copied') : t('common.copy') }}</span>
      </button>
    </div>

    <pre class="code-block__body" :class="{ 'is-collapsed': collapsible && !expanded }" :style="bodyStyle"><code v-html="html" /></pre>

    <button v-if="collapsible" type="button" class="code-block__more" @click="expanded = !expanded">
      {{ expanded ? t('common.collapse') : t('common.expand') }}
    </button>
  </div>
</template>

<style scoped>
.code-block {
  border-radius: 10px;
  border: 1px solid var(--card-stroke);
  background: var(--code-bg);
  overflow: hidden;
}

.code-block__bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px 8px 12px;
  border-bottom: 1px solid var(--card-stroke);
  background: color-mix(in srgb, var(--text-primary) 4%, transparent);
}

.code-block__dots {
  display: inline-flex;
  gap: 5px;
}

.code-block__dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--text-tertiary);
  opacity: 0.4;
}

.code-block__filename {
  font-size: 12px;
  font-weight: 600;
  font-family: var(--mono-font);
  color: var(--text-secondary);
}

.code-block__copy {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 12px;
  font-family: inherit;
  color: var(--text-secondary);
  background: transparent;
  cursor: pointer;
  transition: background-color var(--faster-duration) linear, color var(--faster-duration) linear;
}

.code-block__copy:hover {
  background: var(--subtle-secondary);
  color: var(--text-primary);
}

.code-block__body {
  margin: 0;
  padding: 14px 16px;
  overflow: auto;
  font-family: var(--mono-font);
  font-size: 12.5px;
  line-height: 21px;
  color: var(--text-primary);
  tab-size: 4;
}

.code-block__body.is-collapsed {
  overflow: hidden;
  mask-image: linear-gradient(180deg, #000 68%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, #000 68%, transparent 100%);
}

.code-block__more {
  width: 100%;
  padding: 7px;
  border: 0;
  border-top: 1px solid var(--card-stroke);
  font-size: 12px;
  font-family: inherit;
  color: var(--accent-base);
  background: transparent;
  cursor: pointer;
}

.code-block__more:hover {
  background: var(--subtle-secondary);
}

.code-block :deep(.tk-comment) {
  color: var(--text-tertiary);
  font-style: italic;
}

.code-block :deep(.tk-string) {
  color: #ce9178;
}

.code-block :deep(.tk-keyword) {
  color: #569cd6;
}

.code-block :deep(.tk-type) {
  color: #4ec9b0;
}

.code-block :deep(.tk-number) {
  color: #b5cea8;
}

.code-block :deep(.tk-key) {
  color: #9cdcfe;
}

.code-block :deep(.tk-flag) {
  color: #dcdcaa;
}

html.theme-light .code-block :deep(.tk-string) {
  color: #a31515;
}

html.theme-light .code-block :deep(.tk-keyword) {
  color: #0000ff;
}

html.theme-light .code-block :deep(.tk-type) {
  color: #267f99;
}

html.theme-light .code-block :deep(.tk-number) {
  color: #098658;
}

html.theme-light .code-block :deep(.tk-key) {
  color: #0451a5;
}

html.theme-light .code-block :deep(.tk-flag) {
  color: #795e26;
}
</style>
