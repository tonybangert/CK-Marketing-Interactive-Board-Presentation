import { useEffect, useState } from 'react'

// Minimal typewriter that reveals characters over time when `active` flips true.
// Supports segments like ['plain ', { bold: 'emphasized' }, ' plain'] to preserve
// inline formatting that the bot response uses.
export default function Typewriter({ segments, active, speedMs = 22, onDone }) {
  const fullLength = segments.reduce((n, s) => n + (typeof s === 'string' ? s.length : s.text.length), 0)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!active) { setShown(0); return }
    if (shown >= fullLength) { onDone?.(); return }
    const t = setInterval(() => {
      setShown((s) => {
        if (s >= fullLength) {
          clearInterval(t)
          onDone?.()
          return s
        }
        return s + 1
      })
    }, speedMs)
    return () => clearInterval(t)
  }, [active, fullLength, speedMs])

  let remaining = shown
  const rendered = []
  segments.forEach((seg, idx) => {
    if (remaining <= 0) return
    if (typeof seg === 'string') {
      rendered.push(<span key={idx}>{seg.slice(0, remaining)}</span>)
      remaining -= seg.length
    } else {
      const taken = seg.text.slice(0, remaining)
      rendered.push(
        <span
          key={idx}
          className={seg.bold ? 'font-semibold' : ''}
          style={seg.color ? { color: seg.color } : undefined}
        >
          {taken}
        </span>
      )
      remaining -= seg.text.length
    }
  })

  const done = shown >= fullLength
  return (
    <span>
      {rendered}
      {active && !done && <span className="inline-block w-[2px] h-[1em] -mb-[2px] ml-0.5 bg-current animate-pulse" />}
    </span>
  )
}
