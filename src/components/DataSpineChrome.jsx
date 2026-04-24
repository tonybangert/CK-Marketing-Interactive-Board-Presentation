import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Database, Receipt } from 'lucide-react'

// Persistent data-spine chrome. Sits above the slide stage and never unmounts.
// Three source nodes (HubSpot / Finance / Transactions) pulse around a vertical
// spine on the left edge. The spine IS the deck's data lineage made visible:
// every metric shown in the deck visibly traces to the source that produced it.
//
// Slides fire `window.dispatchEvent(new CustomEvent('spine-pulse', { detail: 'hubspot' }))`
// when they want a source node to pulse (e.g., the moment the seasonality chart
// animates in, Finance pulses; when the Dynamic Revenue Calendar appears, HubSpot
// pulses). This decouples slides from the chrome.

const SOURCES = [
  {
    id: 'hubspot',
    label: 'HubSpot',
    sub: 'Pipeline & activity',
    icon: LineChart,
    color: '#FF7A59',
    y: 16
  },
  {
    id: 'finance',
    label: 'Finance',
    sub: 'Budget · forecast · actuals',
    icon: Database,
    color: '#22C55E',
    y: 50
  },
  {
    id: 'transactions',
    label: 'Transactions',
    sub: 'Historical orders',
    icon: Receipt,
    color: '#1E9FFF',
    y: 84
  }
]

export default function DataSpineChrome({ visible, introPlayed }) {
  const [pulses, setPulses] = useState({})

  useEffect(() => {
    function onPulse(e) {
      const id = e.detail
      setPulses((p) => ({ ...p, [id]: (p[id] || 0) + 1 }))
      setTimeout(() => {
        setPulses((p) => {
          const next = { ...p }
          if (next[id] > 0) next[id] = Math.max(0, next[id] - 1)
          return next
        })
      }, 1600)
    }
    window.addEventListener('spine-pulse', onPulse)
    return () => window.removeEventListener('spine-pulse', onPulse)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute top-0 left-0 h-full z-[5]"
          style={{ width: 140 }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Vertical spine: gradient line with slow traveling pulses */}
          <div className="absolute top-[14%] bottom-[14%] left-[58px] w-[2px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(180deg, transparent, rgba(250,168,64,0.7) 20%, rgba(250,168,64,0.9) 50%, rgba(250,168,64,0.7) 80%, transparent)'
              }}
            />

            {/* Three travelling pulse dots (one per source, staggered) */}
            {SOURCES.map((src, i) => (
              <motion.div
                key={src.id}
                className="absolute -left-[3px] w-2 rounded-full"
                style={{
                  height: 14,
                  background: `linear-gradient(180deg, ${src.color}, transparent)`,
                  boxShadow: `0 0 10px ${src.color}, 0 0 20px ${src.color}`
                }}
                animate={{ top: ['5%', '95%', '5%'] }}
                transition={{
                  duration: 6 + i * 0.7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 1.2
                }}
              />
            ))}
          </div>

          {/* Source nodes */}
          {SOURCES.map((src, i) => {
            const Icon = src.icon
            const pulseCount = pulses[src.id] || 0
            const hot = pulseCount > 0
            return (
              <div
                key={src.id}
                className="absolute left-[14px]"
                style={{ top: `${src.y}%`, transform: 'translateY(-50%)' }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.5 }}
                  animate={introPlayed ? {
                    opacity: 1,
                    x: 0,
                    scale: hot ? 1.08 : 1
                  } : { opacity: 0, x: -20, scale: 0.5 }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
                    x: { duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
                    scale: { type: 'spring', stiffness: 260, damping: 18 }
                  }}
                  className="relative"
                >
                  {/* Connector line to spine */}
                  <div
                    className="absolute left-[24px] top-1/2 h-px origin-left"
                    style={{
                      width: 20,
                      background: hot ? src.color : 'rgba(250,168,64,0.4)',
                      boxShadow: hot ? `0 0 8px ${src.color}` : 'none',
                      transition: 'all 0.35s ease'
                    }}
                  />

                  {/* Node halo pulse (fires on spine-pulse event) */}
                  <AnimatePresence>
                    {hot && (
                      <motion.div
                        key={`halo-${pulseCount}`}
                        initial={{ opacity: 0.9, scale: 1 }}
                        animate={{ opacity: 0, scale: 2.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 rounded-sm pointer-events-none"
                        style={{ border: `2px solid ${src.color}` }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Ambient resting halo */}
                  <motion.div
                    className="absolute inset-0 rounded-sm pointer-events-none"
                    animate={{
                      opacity: hot ? 0.45 : [0.12, 0.22, 0.12]
                    }}
                    transition={{
                      duration: hot ? 0.3 : 3 + i * 0.4,
                      repeat: hot ? 0 : Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{
                      boxShadow: `0 0 20px ${src.color}`,
                      background: `radial-gradient(circle, ${src.color}30 0%, transparent 70%)`
                    }}
                  />

                  {/* Node body */}
                  <div
                    className="relative h-12 w-12 rounded-sm flex items-center justify-center backdrop-blur-sm"
                    style={{
                      background: hot ? `${src.color}25` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${hot ? src.color : 'rgba(255,255,255,0.15)'}`,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Icon size={18} strokeWidth={1.6} color={hot ? src.color : 'rgba(255,255,255,0.75)'} />
                  </div>

                  {/* Label */}
                  <div className="absolute left-[-8px] top-[52px] text-[9px] uppercase tracking-[0.15em] font-semibold whitespace-nowrap"
                       style={{
                         color: hot ? src.color : 'rgba(255,255,255,0.55)',
                         transition: 'color 0.3s ease'
                       }}>
                    {src.label}
                  </div>
                </motion.div>
              </div>
            )
          })}

          {/* "UNIFIED" label at spine top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introPlayed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="absolute top-[6%] left-[18px] text-[8px] uppercase tracking-[0.3em] text-[var(--color-orange)]/80 font-semibold"
          >
            Unified
          </motion.div>

          {/* "LIVE" label at spine bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introPlayed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="absolute bottom-[6%] left-[30px] text-[8px] uppercase tracking-[0.3em] text-[var(--color-orange)]/80 font-semibold flex items-center gap-1.5"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-green-400"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            Live
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Helper slides can import to fire a pulse on a specific source
export function pulseSource(id) {
  window.dispatchEvent(new CustomEvent('spine-pulse', { detail: id }))
}
