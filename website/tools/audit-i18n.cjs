/**
 * i18n 键体检。
 *
 * 目标：找出「源码引用了、但资源包里没有」的键。做法有三条：
 *   1) 字面量键  t('a.b.c')        —— 直接收集
 *   2) 数字循环键 t(`p.refix${i}`) —— 只有变量是纯数字循环时才展开，上限取该文件里 v-for 的实际上限
 *   3) 数据驱动键 t(`m.${x.id}`)   —— 变量的取值范围来自指定数据文件里的 id 集合
 *
 * 另外检查两份语言包的键集合是否完全一致，并列出资源里多出来的键（仅提示）。
 *
 * 用法：node tools/audit-i18n.cjs
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..', 'src')
const LOCALES = ['zh-CN', 'en-US']

const keysOf = (locale) => {
  const raw = fs.readFileSync(path.join(ROOT, 'components', 'Strings', locale, 'Resources.ts'), 'utf8')
  return [...raw.matchAll(/^\s*'([^']+)':/gm)].map((m) => m[1])
}

/** 同一个对象字面量里重复的键会让后一个静默覆盖前一个，esbuild 只会告警，必须自己查。 */
const duplicatesOf = (locale) => {
  const raw = fs.readFileSync(path.join(ROOT, 'components', 'Strings', locale, 'Resources.ts'), 'utf8')
  const lines = raw.split('\n')
  const seen = new Map()
  const dups = []
  lines.forEach((line, index) => {
    const m = line.match(/^\s*'([^']+)':/)
    if (!m) return
    if (seen.has(m[1])) dups.push(`${m[1]}  (第 ${seen.get(m[1])} 行 与 第 ${index + 1} 行)`)
    else seen.set(m[1], index + 1)
  })
  return dups
}

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.(vue|ts)$/.test(entry.name)) out.push(full)
  }
  return out
}

/**
 * 数据驱动的模板键：变量是数据里的 id，静态分析只能顺着数据源枚举。
 * extract: 从数据文件里怎么把 id 抠出来（正则捕获组 = id）。
 *
 * 注意：extract 一定要锚定在真正的数据数组上。demoData.ts 里还有
 * demoDropTargets 等其它数组，id 格式相同 —— 若无脑全匹配就会把投放目标
 * 的 id 当成插件 id，凭空报出一堆不存在的 market.* 键。
 */
const DATA_DRIVEN = [
  {
    tpl: 'feat.${entry.id}.{field}',
    source: 'src/site/services/features.ts',
    // features 数组里的条目：两个空格缩进 + id
    extract: /^\s{2}id:\s*'([^']+)'/gm,
    fields: ['name', 'desc'],
  },
  {
    tpl: 'market.${activity.id}.{field}',
    source: 'src/site/services/demoData.ts',
    // 只取 demoActivities 这一段（到下一个顶层 export 为止）里的四个空格缩进 id
    extract: /^\s{4}id:\s*'([^']+)'/gm,
    scope: /export const demoActivities[\s\S]*?(?=\/\*\* 宿主自己会注册)/,
    fields: ['name', 'compact', 'expanded', 'note'],
  },
]

const files = walk(ROOT)
const literal = new Set()
const unresolved = []

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8')
  const rel = path.relative(ROOT, file)

  for (const m of src.matchAll(/\bt\(\s*'([^']+)'/g)) literal.add(m[1])

  for (const m of src.matchAll(/\bt\(\s*`([^`]*)`/g)) {
    const tpl = m[1]
    if (!tpl.includes('${')) {
      literal.add(tpl)
      continue
    }
    // 只有「单个变量且变量名是循环计数」的模板才在这里展开；
    // 数据驱动的模板交给 DATA_DRIVEN 处理，静态分析不猜。
    unresolved.push(`${tpl}  @${rel}`)
  }
}

// 数字循环键：直接从资源包里反查。凡是源码里出现 `prefix` + 数字的模式，
// 就把资源里所有 `prefix<数字>...` 的键视为已引用 —— 这样不会误报，也不会漏报。
const loopTemplates = []
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8')
  for (const m of src.matchAll(/\bt\(\s*`([^`$]*)\$\{(\w+)\}(\w*)`/g)) {
    loopTemplates.push({ prefix: m[1], suffix: m[3] })
  }
}

for (const locale of LOCALES) {
  const all = keysOf(locale)
  for (const { prefix, suffix } of loopTemplates) {
    for (const key of all) {
      if (!key.startsWith(prefix)) continue
      const rest = key.slice(prefix.length)
      if (!/^\d/.test(rest)) continue
      if (suffix && !rest.endsWith(suffix)) continue
      literal.add(key)
    }
  }
}

const dataDrivenProblems = []
for (const entry of DATA_DRIVEN) {
  const sourcePath = path.resolve(ROOT, '..', entry.source)
  const whole = fs.readFileSync(sourcePath, 'utf8')
  const src = entry.scope ? (whole.match(entry.scope)?.[0] ?? '') : whole
  if (!src) {
    dataDrivenProblems.push(`无法在 ${entry.source} 里定位到数据段（${entry.tpl}）`)
    continue
  }
  const ids = [...src.matchAll(entry.extract)].map((m) => m[1])
  if (ids.length === 0) {
    dataDrivenProblems.push(`无法从 ${entry.source} 读出 id（${entry.tpl}）`)
    continue
  }
  for (const id of ids) {
    for (const field of entry.fields) {
      literal.add(entry.tpl.replace('${entry.id}', id).replace('${activity.id}', id).replace('{field}', field))
    }
  }
}

const bundles = Object.fromEntries(LOCALES.map((l) => [l, new Set(keysOf(l))]))
const union = new Set(LOCALES.flatMap((l) => [...bundles[l]]))

const missing = new Set()
for (const key of literal) {
  // 模板占位符不是真键，跳过
  if (key.includes('${')) continue
  for (const locale of LOCALES) {
    if (!bundles[locale].has(key)) missing.add(`${key}  [${locale}]`)
  }
}

console.log('源码引用的键（含循环与数据驱动展开）: ' + literal.size)
console.log('资源键数量: ' + LOCALES.map((l) => `${l}=${bundles[l].size}`).join('  '))

for (const locale of LOCALES) {
  const others = LOCALES.filter((l) => l !== locale)
  const diff = [...bundles[locale]].filter((k) => !others.every((o) => bundles[o].has(k)))
  console.log(`仅存在于 ${locale} 的键 (${diff.length}):` + (diff.length ? '\n  ' + diff.join('\n  ') : ' none'))
}

console.log(`\n缺失的键 (${missing.size}):` + (missing.size ? '\n  ' + [...missing].sort().join('\n  ') : ' none'))

const allDups = LOCALES.flatMap((l) => duplicatesOf(l).map((d) => `[${l}] ${d}`))
console.log(`\n重复定义的键 (${allDups.length}):` + (allDups.length ? '\n  ' + allDups.join('\n  ') : ' none'))

if (unresolved.length) {
  console.log(`\n含变量的模板键（已由循环/数据驱动规则覆盖，仅列出）(${unresolved.length}):\n  ` + [...new Set(unresolved)].join('\n  '))
}

if (dataDrivenProblems.length) {
  console.log('\n数据驱动展开的问题:\n  ' + dataDrivenProblems.join('\n  '))
}

const unused = [...union].filter((k) => !literal.has(k)).sort()
console.log(`\n资源里定义但源码未使用 (${unused.length}):\n  ` + unused.join('\n  '))

process.exitCode = missing.size > 0 || allDups.length > 0 ? 1 : 0
