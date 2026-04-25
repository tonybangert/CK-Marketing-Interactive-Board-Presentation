import { motion } from 'framer-motion'
import { sources } from '../data.js'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'
import EyebrowStrap from '../components/EyebrowStrap.jsx'

// Single-step minimalist unification diagram:
//   Three source pills fade in (HubSpot · Finance · Sales Data),
//   SVG lines draw down to converge on a central "One Source of Truth" box.
// Click → advances to the live-product proof slide ("Queryable in seconds").
//
// Density: 6 anchors (3 source labels + 3 detail subs + box title + eyebrow + hero).
// No metrics. The box is the punchline.

// Geometry: a single SVG sits behind the pills + box, drawing the converging lines
// from each pill's bottom-center to the top of the central box.
// Coordinates are within an 1000×440 viewBox; the parent div sets aspect-ratio so it scales.
const PILL_Y = 80                 // y of pill bottoms
const BOX_TOP_Y = 360             // y of box top
const BOX_X = 500                 // x of box center
const PILLS = [
  { x: 200, key: 'left' },
  { x: 500, key: 'center' },
  { x: 800, key: 'right' }
]

export default function Slide1Unify() {
  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <DarkBackdrop />

      <EyebrowStrap label="Architecture" crumb="Three sources, one source of truth" />

      <div className="relative z-10 h-full flex flex-col px-12 pt-28 pb-14">
        <motion.h1
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[56px] leading-[1.04] text-white"
        >
          How it works.
        </motion.h1>

        {/* Diagram zone */}
        <div className="relative flex-1 mt-6">
          <svg
            viewBox="0 0 1000 440"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {PILLS.map((p, i) => (
              <motion.path
                key={p.key}
                d={`M ${p.x} ${PILL_Y} C ${p.x} ${(PILL_Y + BOX_TOP_Y) / 2}, ${BOX_X} ${(PILL_Y + BOX_TOP_Y) / 2}, ${BOX_X} ${BOX_TOP_Y}`}
                stroke="var(--color-orange)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="600"
                initial={{ strokeDashoffset: 600, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 0.85 }}
                transition={{
                  strokeDashoffset: { duration: 1.2, delay: 1.1 + i * 0.12, ease: [0.65, 0, 0.35, 1] },
                  opacity: { duration: 0.6, delay: 1.1 + i * 0.12 }
                }}
              />
            ))}
            {/* Tiny arrowheads at the box-top */}
            {PILLS.map((p, i) => (
              <motion.circle
                key={`dot-${p.key}`}
                cx={BOX_X}
                cy={BOX_TOP_Y}
                r={3.5}
                fill="var(--color-orange)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </svg>

          {/* 3 source pills at top */}
          <div className="absolute inset-x-0 top-0 grid grid-cols-3 gap-8">
            {sources.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.65, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center"
              >
                <div className="bg-white/[0.04] border border-white/15 rounded-sm px-6 py-4 min-w-[220px] text-center">
                  <div className="font-serif text-[22px] text-white leading-none">
                    {s.name}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/50">
                    {s.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Central "One Source of Truth" box */}
          <div className="absolute inset-x-0 flex justify-center" style={{ top: '78%' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Orange glow halo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.7, 0.45], scale: [0.6, 1.3, 1.1] }}
                transition={{ duration: 1.6, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(250,168,64,0.35) 0%, rgba(250,168,64,0.12) 40%, transparent 70%)',
                  transform: 'scale(1.8)'
                }}
              />

              <div className="relative bg-[var(--color-deck-dark-soft)] border-[1.5px] border-[var(--color-orange)] rounded-sm px-10 py-5 shadow-[0_15px_40px_rgba(250,168,64,0.15)]">
                <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.32em] text-[var(--color-orange)] font-semibold mb-2">
                  <span className="inline-block h-1.5 w-1.5 bg-[var(--color-orange)]" />
                  <span>Unified</span>
                </div>
                <div className="font-serif text-[34px] leading-none text-white whitespace-nowrap">
                  One Source of Truth
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom hint to advance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: [0, 6, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 3.2 },
            x: { duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 3.6 }
          }}
          className="self-end text-[10px] uppercase tracking-[0.32em] text-[var(--color-orange)]/80 font-semibold mt-2"
        >
          Press → for live product
        </motion.div>
      </div>
    </div>
  )
}
