import { motion, AnimatePresence } from 'framer-motion'
import { motions, dealTiers } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'
import EyebrowStrap from '../components/EyebrowStrap.jsx'

// Merged middle section: each beat carries the pattern AND the operational
// shift on the same canvas. One click reveals the diagnosis, second click
// transforms it into the response. Three beats. Six clicks.
//
// Step choreography (sub-steps drive in-card phase changes):
// 0: hero
// 1: Beat 1 - Two motions, one blended forecast (diagnosis)
// 2: Beat 1 - Each motion gets its own scorecard (response)
// 3: Beat 2 - Efficiency hides behind deal size (diagnosis)
// 4: Beat 2 - Re-rank by yield (response)
// 5: Beat 3 - Buying rhythms are predictable (diagnosis)
// 6: Beat 3 - Outreach syncs to the wave (response)
const BEATS = [
  {
    id: '01',
    pattern: 'Two motions, one blended forecast.',
    shift: 'Each motion gets its own scorecard.',
    Viz: MotionsBeatViz
  },
  {
    id: '02',
    pattern: 'Efficiency hides behind deal size.',
    shift: 'Re-rank by yield, not size.',
    Viz: EfficiencyBeatViz
  },
  {
    id: '03',
    pattern: 'Buying rhythms are predictable.',
    shift: 'Outreach syncs to the wave.',
    Viz: RhythmsBeatViz
  }
]
const SUB_STEPS = [2, 2, 2]

function locateBeat(step) {
  let remaining = step - 1
  for (let i = 0; i < SUB_STEPS.length; i++) {
    if (remaining < SUB_STEPS[i]) return { beatIndex: i, subStep: Math.max(0, remaining) }
    remaining -= SUB_STEPS[i]
  }
  return { beatIndex: BEATS.length - 1, subStep: SUB_STEPS[SUB_STEPS.length - 1] - 1 }
}

export default function Slide2({ step }) {
  const { beatIndex, subStep } = locateBeat(step)
  const activeBeat = BEATS[beatIndex]

  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <DarkBackdrop />

      <EyebrowStrap label="Patterns → Shifts" crumb="Three diagnoses. Three responses." />

      <div className="relative z-10 h-full flex flex-col px-12 pt-28 pb-14">
        <StepGate show={0} step={step}>
          <h1 className="font-serif text-[56px] leading-[1.04] text-white">
            Three patterns. Three operational shifts.
          </h1>
        </StepGate>

        <div className="relative flex-1 mt-10">
          <AnimatePresence mode="wait">
            {step >= 1 && (
              <motion.div
                key={`beat-${beatIndex}`}
                initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <BeatCard beat={activeBeat} index={beatIndex} total={BEATS.length} subStep={subStep} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step >= 1 && (
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {BEATS.map((b, i) => (
              <div
                key={b.id}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === beatIndex ? 36 : 8,
                  background: i <= beatIndex ? 'var(--color-orange)' : 'rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BeatCard({ beat, index, total, subStep }) {
  const inResponse = subStep >= 1
  const Viz = beat.Viz

  return (
    <div className="relative h-full flex flex-col bg-white/[0.025] border border-white/10 rounded-sm px-14 py-9 overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-30%',
          right: '-20%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(250,168,64,0.12) 0%, transparent 60%)'
        }}
      />

      <div className="relative flex items-baseline justify-between mb-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 text-[18px] uppercase tracking-[0.32em] font-semibold text-[var(--color-orange)]"
        >
          <span className="text-[24px] leading-none">▸</span>
          <span>{inResponse ? 'Shift' : 'Pattern'}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[11px] uppercase tracking-[0.32em] text-white/40 font-semibold"
        >
          {String(index + 1).padStart(2, '0')} <span className="text-white/25">/</span> {String(total).padStart(2, '0')}
        </motion.div>
      </div>

      {/* Headline crossfade: pattern -> shift */}
      <div className="relative" style={{ minHeight: 120 }}>
        <AnimatePresence mode="wait">
          <motion.h2
            key={inResponse ? 'shift' : 'pattern'}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[44px] leading-[1.05] text-white max-w-[1100px] absolute"
          >
            {inResponse ? (
              <>
                <span className="text-[var(--color-orange)]/80 mr-3">→</span>{beat.shift}
              </>
            ) : (
              beat.pattern
            )}
          </motion.h2>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-2 h-px w-20 origin-left bg-[var(--color-orange)]/50"
      />

      <div className="relative flex-1 mt-6 min-h-0">
        <Viz inResponse={inResponse} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Beat 1 - MOTIONS: Two cycle bars + blended forecast (diagnosis).
//                   Click: blended line dissolves, motion-specific scorecard
//                   metrics appear inside each bar (response).
// ─────────────────────────────────────────────────────────────────────────────
function MotionsBeatViz({ inResponse }) {
  const store = motions.store.cycleDays
  const trans = motions.transactional.cycleDays
  const blend = Math.round((store + trans) / 2)

  const max = store
  const storeWidth = 100
  const transWidth = (trans / max) * 100
  const blendX = (blend / max) * 100

  return (
    <div className="relative h-full flex flex-col justify-center gap-8 px-2">
      <ScorecardBar
        label="Corporate Store"
        days={store}
        widthPct={storeWidth}
        delay={0.0}
        color="var(--color-concord-soft)"
        inResponse={inResponse}
        metrics={[80, 65, 72]}
      />
      <ScorecardBar
        label="Multi-Location"
        days={trans}
        widthPct={transWidth}
        delay={0.15}
        color="var(--color-ck-green-soft)"
        inResponse={inResponse}
        metrics={[58, 88, 70]}
      />

      {/* Blended forecast line - present in diagnosis, dissolves on response */}
      <AnimatePresence>
        {!inResponse && (
          <>
            <motion.div
              key="blend-line"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="absolute pointer-events-none"
              style={{
                left: `calc(${blendX}% + 0px)`,
                top: 24,
                bottom: 24,
                width: 0,
                borderLeft: '1.5px dashed rgba(255,255,255,0.55)',
                transformOrigin: 'top'
              }}
            />
            <motion.div
              key="blend-label"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 1.0 }}
              className="absolute text-[11px] uppercase tracking-[0.32em] font-semibold text-white/75 whitespace-nowrap"
              style={{ left: `${blendX}%`, top: 0, transform: 'translateX(-50%)' }}
            >
              Blended forecast · {blend} days
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function ScorecardBar({ label, days, widthPct, delay, color, inResponse, metrics }) {
  return (
    <div className="relative">
      <div className="flex items-baseline justify-between mb-2">
        <div className="text-[13px] uppercase tracking-[0.28em] text-white/60 font-semibold">
          {label}
        </div>
        <div className="font-serif text-[22px] text-white">
          {days} <span className="text-[13px] text-white/55 font-sans">days</span>
        </div>
      </div>

      <div className="relative">
        {/* Cycle bar (always present) */}
        <div className="relative h-6 bg-white/[0.04] border border-white/10 rounded-sm overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${widthPct}%` }}
            transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0"
            style={{ background: color }}
          />
        </div>

        {/* Scorecard metrics - appear in response state */}
        <AnimatePresence>
          {inResponse && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 grid grid-cols-3 gap-4">
                {['Win rate', 'Cycle', 'Expansion'].map((m, i) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-2"
                  >
                    <div className="text-[9px] uppercase tracking-[0.18em] text-white/45 font-semibold w-16">{m}</div>
                    <div className="flex-1 h-1.5 bg-black/30 rounded-sm overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metrics[i]}%` }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                        className="h-full"
                        style={{ background: color }}
                      />
                    </div>
                    <div className="text-[10px] text-white/65 w-6 text-right font-mono">{metrics[i]}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Beat 2 - EFFICIENCY: 5 deal tiers sorted by deal size (diagnosis).
//                      Click: tiers re-rank by composite score, top tier glows
//                      orange, composite sub-bars appear (response).
// ─────────────────────────────────────────────────────────────────────────────
function EfficiencyBeatViz({ inResponse }) {
  const phase = inResponse ? 'score' : 'size'

  const sortedBySize = [...dealTiers].sort((a, b) => b.size - a.size)
  const sortedByScore = [...dealTiers].sort((a, b) => b.score - a.score)
  const order = phase === 'size' ? sortedBySize : sortedByScore

  const slotCount = dealTiers.length
  const slotPercent = 100 / slotCount
  const maxSize = Math.max(...dealTiers.map(t => t.size))

  return (
    <div className="relative h-full flex flex-col px-2">
      <div className="flex items-baseline justify-between mb-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="text-[13px] uppercase tracking-[0.32em] font-semibold"
            style={{ color: phase === 'size' ? 'rgba(255,255,255,0.5)' : 'var(--color-orange)' }}
          >
            {phase === 'size' ? 'Sorted by deal size' : 'Re-ranked by composite score'}
          </motion.div>
        </AnimatePresence>
        <div className="text-[11px] uppercase tracking-[0.28em] text-white/35 font-semibold">
          Win rate · cycle speed · expansion
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        {dealTiers.map((tier) => {
          const slotIndex = order.findIndex(t => t.id === tier.id)
          const xPct = slotIndex * slotPercent + slotPercent / 2
          const heightPct = (tier.size / maxSize) * 100
          const isTop = slotIndex === 0
          return (
            <motion.div
              key={tier.id}
              animate={{ left: `${xPct}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 22, mass: 1.1 }}
              className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center justify-end"
              style={{ width: `${slotPercent * 0.8}%`, height: '100%' }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, color: phase === 'score' && isTop ? 'var(--color-orange)' : 'rgba(255,255,255,0.6)' }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="font-serif text-[18px] mb-2"
              >
                {tier.sizeLabel}
              </motion.div>
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: `${heightPct}%`,
                  boxShadow: phase === 'score' && isTop ? '0 0 0 2px var(--color-orange)' : 'none'
                }}
                transition={{
                  height: { duration: 0.85, delay: 0.2 + dealTiers.indexOf(tier) * 0.06, ease: [0.22, 1, 0.36, 1] },
                  boxShadow: { duration: 0.4 }
                }}
                className="w-full rounded-sm"
                style={{
                  background: phase === 'score' && isTop
                    ? 'linear-gradient(180deg, var(--color-orange), rgba(250,168,64,0.4))'
                    : 'linear-gradient(180deg, rgba(46,53,160,0.85), rgba(30,38,114,0.6))'
                }}
              />
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/40 font-semibold mt-2">
                {tier.id}
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {phase === 'score' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-[12px] uppercase tracking-[0.32em] text-[var(--color-orange)] font-semibold mt-3 text-center"
          >
            Highest yield per pursuit-hour
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Beat 3 - RHYTHMS: 12-month seasonality wave with peak markers (diagnosis).
//                   Click: 4 fire-window markers slide in, anchored 60-90d
//                   before each peak (response).
// ─────────────────────────────────────────────────────────────────────────────
export const SEASONALITY_VALUES = [0.85, 0.32, 0.55, 0.78, 0.92, 0.42, 0.28, 0.58, 0.48, 0.95, 0.40, 0.50]
export const SEASONALITY_PEAKS = [0, 3, 4, 9] // Jan, Apr, May, Oct

function RhythmsBeatViz({ inResponse }) {
  const W = 1000
  const H = 240
  const padX = 30
  const padY = 30
  const stepX = (W - padX * 2) / (SEASONALITY_VALUES.length - 1)
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D']

  const points = SEASONALITY_VALUES.map((v, i) => ({
    x: padX + i * stepX,
    y: padY + (1 - v) * (H - padY * 2),
    v
  }))
  const linePath = catmullRom(points)

  // Fire-window positions: 60-90 days before each peak
  const fireXs = [
    padX + 10.7 * stepX,  // Nov  -> Jan peak
    padX + 1.4 * stepX,   // Feb  -> Apr peak
    padX + 2.4 * stepX,   // Mar  -> May peak
    padX + 7.2 * stepX    // Aug  -> Oct peak
  ]

  return (
    <div className="relative h-full flex flex-col">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet" style={{ flex: 1 }}>
        <defs>
          <linearGradient id="beat-wave-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-orange)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--color-orange)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d={`${linePath} L ${points[points.length - 1].x} ${H - padY} L ${points[0].x} ${H - padY} Z`}
          fill="url(#beat-wave-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--color-orange)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Peak dots */}
        {points.map((p, i) => {
          if (!SEASONALITY_PEAKS.includes(i)) return null
          return (
            <g key={i}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={6}
                fill="var(--color-orange)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.4 + i * 0.05 }}
              />
              <motion.text
                x={p.x}
                y={p.y - 18}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--color-orange)"
                style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + i * 0.05 }}
              >
                {months[i]}
              </motion.text>
            </g>
          )
        })}

        {/* Fire-window markers - appear in response state */}
        <AnimatePresence>
          {inResponse && fireXs.map((x, i) => (
            <g key={i}>
              <motion.line
                initial={{ opacity: 0, y2: padY - 4 + 30 }}
                animate={{ opacity: 1, y2: padY - 4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                x1={x}
                x2={x}
                y1={H - padY}
                stroke="var(--color-orange)"
                strokeWidth="2"
              />
              <motion.circle
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                cx={x}
                cy={padY - 4}
                r={5}
                fill="var(--color-orange)"
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                x={x}
                y={padY - 14}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="var(--color-orange)"
                style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Fire
              </motion.text>
            </g>
          ))}
        </AnimatePresence>
      </svg>

      <div className="grid grid-cols-12 px-[3%] mt-2 text-[11px] uppercase tracking-wider font-semibold text-center">
        {months.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.04 }}
            style={{ color: SEASONALITY_PEAKS.includes(i) ? 'var(--color-orange)' : 'rgba(255,255,255,0.4)' }}
          >
            {m}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {inResponse && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.7 }}
            className="text-[12px] uppercase tracking-[0.32em] text-[var(--color-orange)] font-semibold mt-3 text-center"
          >
            Reps coach to cycle · Marketing fires 60-90d ahead
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function catmullRom(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}
