import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { shifts, dealTiers } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'
import EyebrowStrap from '../components/EyebrowStrap.jsx'
import { SEASONALITY_VALUES, SEASONALITY_PEAKS } from './Slide2.jsx'

// Step choreography (sub-steps allow the speaker to click through phase changes):
// 0: hero
// 1: SEPARATE - blended scorecard splits in two (auto-plays)
// 2: SCORE phase=size (tiers ranked by deal size)
// 3: SCORE phase=score (click triggers re-rank by composite score)
// 4: SEQUENCE phase=quarterly (4 evenly-spaced markers, faded wave)
// 5: SEQUENCE phase=aligned (click triggers markers migrating to peak alignment)
const VIZ = [SeparateSplitViz, ScoreReorderViz, SequenceMigrateViz]
const SUB_STEPS = [1, 2, 2]

function locateCard(step) {
  let remaining = step - 1
  for (let i = 0; i < SUB_STEPS.length; i++) {
    if (remaining < SUB_STEPS[i]) return { cardIndex: i, subStep: Math.max(0, remaining) }
    remaining -= SUB_STEPS[i]
  }
  return { cardIndex: SUB_STEPS.length - 1, subStep: SUB_STEPS[SUB_STEPS.length - 1] - 1 }
}

export default function Slide3({ step }) {
  const { cardIndex, subStep } = locateCard(step)
  const activeShift = shifts[cardIndex]
  const ActiveViz = VIZ[cardIndex]

  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <DarkBackdrop />

      <EyebrowStrap label="Response" crumb="Three findings → three operational shifts" />

      <div className="relative z-10 h-full flex flex-col px-12 pt-28 pb-14">
        <StepGate show={0} step={step}>
          <h1 className="font-serif text-[56px] leading-[1.04] text-white">
            What we're doing about it.
          </h1>
        </StepGate>

        <div className="relative flex-1 mt-10">
          <AnimatePresence mode="wait">
            {step >= 1 && (
              <motion.div
                key={`shift-${cardIndex}`}
                initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <ShiftCard
                  shift={activeShift}
                  index={cardIndex}
                  total={shifts.length}
                  Viz={ActiveViz}
                  subStep={subStep}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step >= 1 && (
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {shifts.map((s, i) => (
              <div
                key={s.verb}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === cardIndex ? 36 : 8,
                  background: i <= cardIndex ? 'var(--color-orange)' : 'rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ShiftCard({ shift, index, total, Viz, subStep }) {
  return (
    <div className="relative h-full flex flex-col bg-white/[0.025] border border-white/10 rounded-sm px-14 py-10 overflow-hidden">
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
          <span>{shift.verb}</span>
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

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative font-serif text-[48px] leading-[1.05] text-white"
      >
        {shift.headline}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-6 h-px w-20 origin-left bg-[var(--color-orange)]/50"
      />

      <div className="relative flex-1 mt-6 min-h-0">
        <Viz shift={shift} subStep={subStep} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Shift 01 - SEPARATE: Blended scorecard splits into two distinct scorecards.
// ─────────────────────────────────────────────────────────────────────────────
function SeparateSplitViz({ shift }) {
  const [phase, setPhase] = useState('blended')

  useEffect(() => {
    const t = setTimeout(() => setPhase('split'), 1100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative h-full flex flex-col items-center justify-center px-2">
      {/* Phase label */}
      <div className="flex items-baseline justify-between w-full mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="text-[13px] uppercase tracking-[0.32em] font-semibold"
            style={{ color: phase === 'blended' ? 'rgba(255,255,255,0.5)' : 'var(--color-orange)' }}
          >
            {phase === 'blended' ? `From: ${shift.from}` : `To: distinct scorecards.`}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bar stage */}
      <div className="relative w-full max-w-[860px] flex items-center justify-center">
        {/* Left card (Corporate Store) */}
        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={phase === 'split' ? { x: '-52%' } : { x: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
          style={{ left: '50%', width: '48%', transform: 'translate(-50%, 0)' }}
        >
          <Scorecard
            label="Corporate Store"
            phase={phase}
            color="var(--color-concord-soft)"
            metrics={[80, 65, 72]}
          />
        </motion.div>

        {/* Right card (Multi-Location) */}
        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={phase === 'split' ? { x: '52%' } : { x: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
          style={{ left: '50%', width: '48%', transform: 'translate(-50%, 0)' }}
        >
          <Scorecard
            label="Multi-Location"
            phase={phase}
            color="var(--color-ck-green-soft)"
            metrics={[58, 88, 70]}
          />
        </motion.div>

        {/* Vertical orange separator that drops in at the moment of split */}
        <AnimatePresence>
          {phase === 'split' && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="absolute h-full w-px"
              style={{
                left: '50%',
                background: 'linear-gradient(180deg, transparent, var(--color-orange), transparent)',
                transform: 'translateX(-50%)',
                transformOrigin: 'center'
              }}
            />
          )}
        </AnimatePresence>

        {/* Spacer to give the absolute kids height */}
        <div style={{ height: 200, width: '100%' }} />
      </div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: phase === 'split' ? 1.4 : 0.6 }}
        className="mt-6 text-[14px] uppercase tracking-[0.32em] text-white/55 font-semibold"
      >
        From one. To two.
      </motion.div>
    </div>
  )
}

function Scorecard({ label, phase, color, metrics }) {
  const isBlended = phase === 'blended'
  // In blended state, both cards visually overlap as one fused gradient bar
  const fusedBg = 'linear-gradient(90deg, var(--color-concord-soft), var(--color-ck-green-soft))'

  return (
    <div
      className="rounded-sm border px-5 py-4 transition-all duration-700"
      style={{
        background: isBlended ? fusedBg : `linear-gradient(180deg, ${color}, rgba(255,255,255,0.04))`,
        borderColor: isBlended ? 'rgba(255,255,255,0.2)' : color,
        opacity: isBlended ? 0.85 : 1
      }}
    >
      <div className="text-[11px] uppercase tracking-[0.28em] text-white/85 font-semibold mb-2">
        {isBlended ? 'Blended scorecard' : label}
      </div>
      <div className="space-y-2">
        {metrics.map((v, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="text-[9px] uppercase tracking-wider text-white/55 w-16">
              {['Win rate','Cycle','Expansion'][i]}
            </div>
            <div className="flex-1 h-2 bg-black/30 rounded-sm overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${v}%` }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
                className="h-full"
                style={{ background: 'rgba(255,255,255,0.85)' }}
              />
            </div>
            <div className="text-[10px] text-white/65 w-7 text-right font-mono">{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Shift 02 - SCORE: Deal tiers ranked by size, then re-ranked by composite score.
// Uses the SAME dealTiers from Finding 02 so the inversion is visibly sharp.
// ─────────────────────────────────────────────────────────────────────────────
function ScoreReorderViz({ shift, subStep = 0 }) {
  // sub-step is driven by parent slide click; subStep 0 = size, subStep 1 = score
  const phase = subStep >= 1 ? 'score' : 'size'

  const sortedBySize = [...dealTiers].sort((a, b) => b.size - a.size)
  const sortedByScore = [...dealTiers].sort((a, b) => b.score - a.score)
  const order = phase === 'size' ? sortedBySize : sortedByScore
  const rowHeight = 50
  const gap = 8

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
            {phase === 'size' ? `From: ${shift.from}` : 'To: composite scoring'}
          </motion.div>
        </AnimatePresence>
        <div className="text-[11px] uppercase tracking-[0.28em] text-white/35 font-semibold">
          Win rate · cycle speed · expansion
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        {dealTiers.map((tier) => {
          const slotIndex = order.findIndex(t => t.id === tier.id)
          const yPx = slotIndex * (rowHeight + gap)
          const isTop = slotIndex === 0

          return (
            <motion.div
              key={tier.id}
              animate={{ y: yPx }}
              transition={{ type: 'spring', stiffness: 140, damping: 22 }}
              className="absolute left-0 right-0 flex items-center gap-4"
              style={{ height: rowHeight }}
            >
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/45 font-semibold w-9">
                {String(slotIndex + 1).padStart(2, '0')}
              </div>
              <div className="font-serif text-[20px] text-white w-24">
                {tier.sizeLabel}
              </div>
              <div className="text-[12px] text-white/55 flex-1 truncate">
                {tier.label}
              </div>
              {/* 3 composite micro-bars */}
              <div className="flex items-center gap-1.5">
                {['win','cycle','exp'].map((_, i) => {
                  const v = phase === 'size' ? 0 : Math.min(100, tier.score - 10 + i * 6)
                  return (
                    <div key={i} className="w-12 h-1.5 bg-black/30 rounded-sm overflow-hidden">
                      <motion.div
                        animate={{ width: `${v}%` }}
                        transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
                        className="h-full"
                        style={{ background: phase === 'score' && isTop ? 'var(--color-orange)' : 'rgba(255,255,255,0.6)' }}
                      />
                    </div>
                  )
                })}
              </div>
              {/* Composite score number */}
              <motion.div
                animate={{
                  opacity: phase === 'score' ? 1 : 0.25,
                  color: phase === 'score' && isTop ? 'var(--color-orange)' : 'rgba(255,255,255,0.65)'
                }}
                transition={{ duration: 0.4 }}
                className="font-serif text-[24px] w-12 text-right"
              >
                {tier.score}
              </motion.div>
              {/* Active row glow */}
              {phase === 'score' && isTop && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute inset-0 -mx-4 rounded-sm pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px var(--color-orange), 0 0 24px rgba(250,168,64,0.18)' }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: phase === 'score' ? 1.0 : 0.6 }}
        className="mt-3 text-[14px] uppercase tracking-[0.32em] text-white/55 font-semibold text-center"
      >
        Re-rank by yield, not size.
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Shift 03 - SEQUENCE: Quarterly markers migrate from evenly-spaced to peak-aligned.
// Echoes Slide 2 Finding 03's seasonality wave (faded version below).
// ─────────────────────────────────────────────────────────────────────────────
function SequenceMigrateViz({ shift, subStep = 0 }) {
  // sub-step is driven by parent slide click; subStep 0 = quarterly, subStep 1 = aligned
  const phase = subStep >= 1 ? 'aligned' : 'quarterly'

  const W = 1000
  const H = 200
  const padX = 30
  const padY = 20
  const stepX = (W - padX * 2) / (SEASONALITY_VALUES.length - 1)
  const points = SEASONALITY_VALUES.map((v, i) => ({
    x: padX + i * stepX,
    y: padY + (1 - v) * (H - padY * 2),
    v
  }))
  const linePath = catmullRomLite(points)

  // Quarterly: evenly spaced at months 1.5, 4.5, 7.5, 10.5 (mid-Feb, mid-May, mid-Aug, mid-Nov)
  const quarterlyXs = [1.5, 4.5, 7.5, 10.5].map(m => padX + m * stepX)
  // Aligned: 60-90 days BEFORE each peak month → roughly peak month - 2 to -3
  // Peaks are at 0 (Jan), 3 (Apr), 4 (May), 9 (Oct). Fire windows: ~Nov, ~Feb, ~Mar, ~Aug
  const alignedXs = [
    padX + 10.7 * stepX,  // Nov for Jan peak
    padX + 1.4 * stepX,   // Feb-mid for Apr peak
    padX + 2.4 * stepX,   // Mar for May peak
    padX + 7.2 * stepX    // Aug for Oct peak
  ]

  const months = ['J','F','M','A','M','J','J','A','S','O','N','D']

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
            style={{ color: phase === 'quarterly' ? 'rgba(255,255,255,0.5)' : 'var(--color-orange)' }}
          >
            {phase === 'quarterly' ? `From: ${shift.from}` : 'To: outreach syncs to buying windows'}
          </motion.div>
        </AnimatePresence>
        <div className="text-[11px] uppercase tracking-[0.28em] text-white/35 font-semibold">
          Reps coach to cycle · Marketing fires 60-90d ahead
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="seq-wave-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-orange)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--color-orange)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Seasonality wave (faded callback to Finding 03) */}
          <motion.path
            d={`${linePath} L ${points[points.length - 1].x} ${H - padY} L ${points[0].x} ${H - padY} Z`}
            fill="url(#seq-wave-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="rgba(250,168,64,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Peak dots on the wave */}
          {points.map((p, i) => {
            if (!SEASONALITY_PEAKS.includes(i)) return null
            return (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={4}
                fill="var(--color-orange)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.04 }}
              />
            )
          })}

          {/* 4 quarterly markers - animate from evenly-spaced to peak-aligned */}
          {[0, 1, 2, 3].map((i) => {
            const fromX = quarterlyXs[i]
            const toX = alignedXs[i]
            const targetX = phase === 'aligned' ? toX : fromX
            return (
              <g key={i}>
                <motion.line
                  initial={{ x1: fromX, x2: fromX }}
                  animate={{ x1: targetX, x2: targetX }}
                  transition={{ type: 'spring', stiffness: 110, damping: 22 }}
                  y1={H - padY}
                  y2={padY - 4}
                  stroke={phase === 'aligned' ? 'var(--color-orange)' : 'rgba(255,255,255,0.45)'}
                  strokeWidth="2"
                  strokeDasharray={phase === 'aligned' ? '0' : '4 4'}
                  style={{ transition: 'stroke 0.4s ease' }}
                />
                <motion.circle
                  initial={{ cx: fromX, opacity: 1 }}
                  animate={{ cx: targetX, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 110, damping: 22 }}
                  cy={padY - 4}
                  r={5}
                  fill={phase === 'aligned' ? 'var(--color-orange)' : 'rgba(255,255,255,0.55)'}
                />
                <motion.text
                  initial={{ x: fromX, opacity: 1 }}
                  animate={{ x: targetX, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 110, damping: 22 }}
                  y={padY - 14}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={phase === 'aligned' ? 'var(--color-orange)' : 'rgba(255,255,255,0.55)'}
                  style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  {phase === 'quarterly' ? `Q${i + 1}` : 'Fire'}
                </motion.text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Month ruler */}
      <div className="grid grid-cols-12 px-[3%] mt-2 text-[11px] uppercase tracking-wider font-semibold text-center">
        {months.map((m, i) => (
          <div
            key={i}
            style={{ color: SEASONALITY_PEAKS.includes(i) ? 'var(--color-orange)' : 'rgba(255,255,255,0.4)' }}
          >
            {m}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: phase === 'aligned' ? 1.2 : 0.5 }}
        className="mt-4 text-[14px] uppercase tracking-[0.32em] text-white/55 font-semibold text-center"
      >
        Calendar follows the customer.
      </motion.div>
    </div>
  )
}

// Lightweight catmull-rom spline (duplicated from Slide2.jsx to avoid extra coupling)
function catmullRomLite(pts) {
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
