/**
 * 截图助手：agent-browser 每条命令都是独立进程，容易丢标签页上下文。
 * 在一次进程里顺序调用 finish 命令，保证同一标签页。
 *
 * 用法：node tools/shoot.cjs <url> <outDir> <steps...>
 *   step 语法：
 *     shot:<name>            截图
 *     full:<name>            整页截图
 *     down[:像素]            向下滚动（默认 700）
 *     top                    回到顶部
 *     hover:<selector>       悬停
 *     click:<selector>       点击
 *     wait:<毫秒>            等待
 *     eval:<js>              执行 js 并打印
 *     text:<selector>        打印元素文本（截断 400 字）
 */
const { execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const BIN = 'C:/Users/luolan/.workbuddy/binaries/node/versions/22.22.2-3/node_modules/agent-browser/bin/agent-browser.js'
const NODE = process.execPath
const SESSION = 'shoot'

const run = (args) => {
  try {
    return execFileSync(NODE, [BIN, '--session', SESSION, ...args], {
      encoding: 'utf8',
      timeout: 90000,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  } catch (e) {
    return 'ERR: ' + (e.stdout || '') + (e.stderr || '') + (e.message || '')
  }
}

const [url, outDir, ...steps] = process.argv.slice(2)
fs.mkdirSync(outDir, { recursive: true })

run(['set', 'viewport', '1400', '900'])
console.log(run(['open', url]).trim())

let index = 0
const shot = (name, fullPage) => {
  index += 1
  const file = path.resolve(outDir, `${String(index).padStart(2, '0')}-${name}.png`)
  const args = fullPage ? ['screenshot', file, '--full'] : ['screenshot', file]
  console.log('  ' + run(args).trim().replace(/^✓ /, ''))
}

for (const step of steps) {
  if (step.startsWith('shot:')) { shot(step.slice(5), false); continue }
  if (step.startsWith('full:')) { shot(step.slice(5), true); continue }
  if (step === 'top') { run(['eval', 'window.scrollTo(0,0)']); continue }
  if (step.startsWith('down')) {
    const px = Number(step.split(':')[1] || 700)
    run(['eval', `window.scrollBy(0,${px})`])
    continue
  }
  if (step.startsWith('wait:')) { run(['wait', step.slice(5)]); continue }
  if (step.startsWith('hover:')) { console.log('  ' + run(['hover', step.slice(6)]).trim()); continue }
  if (step.startsWith('click:')) { console.log('  ' + run(['click', step.slice(6)]).trim()); continue }
  if (step.startsWith('text:')) {
    const t = run(['eval', `(document.querySelector(${JSON.stringify(step.slice(5))})||{}).innerText||'(none)'`])
    console.log('  ' + t.trim().slice(0, 400))
    continue
  }
  if (step.startsWith('eval:')) {
    console.log('  ' + run(['eval', step.slice(5)]).trim().slice(0, 600))
    continue
  }
}

const errs = run(['errors']).trim()
console.log('--- errors ---\n' + (errs || '(none)'))
