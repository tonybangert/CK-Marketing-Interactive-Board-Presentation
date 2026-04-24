import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

// Animated count-up. Parses a target string like "$7.1M" or "$394.2K" or "203"
// into {prefix, number, suffix} and animates the number portion on mount / view.
function parse(target) {
  const m = String(target).match(/^([^\d-]*)(-?[\d,.]+)([^\d]*)$/)
  if (!m) return { prefix: '', number: 0, suffix: String(target) }
  return {
    prefix: m[1] || '',
    number: parseFloat(m[2].replace(/,/g, '')),
    suffix: m[3] || ''
  }
}

function formatNumber(n, original) {
  // Preserve decimal style from original target (e.g., "7.1" keeps 1 decimal)
  const hasDecimal = /\./.test(String(original))
  if (hasDecimal) {
    const decimals = String(original).split('.')[1].length
    return n.toFixed(decimals)
  }
  return Math.round(n).toLocaleString()
}

export default function CountUp({ value, duration = 1.2, className = '', active = true }) {
  const { prefix, number, suffix } = parse(value)
  const ref = useRef(null)
  const [display, setDisplay] = useState(active ? number : 0)
  const inView = useInView(ref, { once: false, amount: 0.2 })

  useEffect(() => {
    if (!active) return
    const controls = animate(0, number, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v)
    })
    return () => controls.stop()
  }, [number, duration, active, inView])

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(display, number)}{suffix}
    </span>
  )
}
