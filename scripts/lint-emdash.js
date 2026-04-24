// Brand rule: no em dashes anywhere in shipped copy.
// Scans src/ for U+2014 and fails if found.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const EXTS = new Set(['.jsx', '.js', '.css', '.html'])
const ROOT = 'src'
const IGNORE = new Set(['node_modules', '.git', 'dist'])

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (IGNORE.has(name)) continue
    const p = join(dir, name)
    const s = statSync(p)
    if (s.isDirectory()) walk(p, out)
    else if (EXTS.has(p.slice(p.lastIndexOf('.')))) out.push(p)
  }
  return out
}

let hits = 0
for (const file of walk(ROOT)) {
  const text = readFileSync(file, 'utf8')
  const lines = text.split('\n')
  lines.forEach((line, i) => {
    if (line.includes('—')) {
      console.error(`${file}:${i + 1}  em dash found  ->  ${line.trim()}`)
      hits++
    }
  })
}

if (hits > 0) {
  console.error(`\nFAIL · ${hits} em dash${hits > 1 ? 'es' : ''} found. Brand standard: none.`)
  process.exit(1)
}
console.log('OK · no em dashes in src/')
