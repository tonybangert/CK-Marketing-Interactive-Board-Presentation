import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { months, motions, roadmap } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'
import EyebrowStrap from '../components/EyebrowStrap.jsx'

// Step choreography:
// 0: hero (eyebrow + headline)
// 1: calendar grid blooms (motion peaks + QBR fire row, staggered via delayIndex)
// 2: "Where should we fish?" card reveals (Market Intelligence - calendar is the visual answer)
// 3: "Who should fish where?" card + bottom strap

function qbrFireMonthFor(peakMonthIdx) {
  return ((peakMonthIdx - 3) + 12) % 12
}

const storePeakIdx = motions.store.peaks.map(m => months.indexOf(m))
const transPeakIdx = motions.transactional.peaks.map(m => months.indexOf(m))
const allPeaks = [
  ...storePeakIdx.map(i => ({ motion: 'store', monthIdx: i })),
  ...transPeakIdx.map(i => ({ motion: 'transactional', monthIdx: i }))
]

function computeHighlight(selected) {
  if (!selected) return { storeCells: new Set(), transCells: new Set(), qbrCells: new Set(), dim: false }
  const m = selected.monthIdx
  return {
    storeCells: new Set(storePeakIdx.filter(i => i === m)),
    transCells: new Set(transPeakIdx.filter(i => i === m)),
    qbrCells: new Set([qbrFireMonthFor(m)]),
    dim: true
  }
}

function MonthCell({ label, peak, delayIndex, revealed, highlighted, dimmed, onClick, tone }) {
  const bg = peak
    ? (tone === 'store' ? 'var(--color-concord)' : 'var(--color-ck-green)')
    : 'transparent'
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={peak && revealed ? {
        opacity: dimmed ? 0.25 : 1,
        scale: highlighted ? 1.08 : 1,
      } : { opacity: 0, scale: 0.5 }}
      transition={{
        opacity: { duration: 0.4, delay: peak ? delayIndex * 0.08 : 0 },
        scale: { type: 'spring', stiffness: 320, damping: 22 }
      }}
      onClick={onClick}
      disabled={!peak}
      className="h-9 border-r border-white/10 last:border-r-0 flex items-center justify-center text-[11px] font-semibold uppercase tracking-wider"
      style={{
        background: bg,
        color: peak ? 'white' : 'rgba(255,255,255,0.3)',
        boxShadow: highlighted ? '0 0 0 2px var(--color-orange), 0 0 20px rgba(250,168,64,0.4)' : 'none',
        cursor: peak ? 'pointer' : 'default'
      }}
    >
      {peak ? label : ''}
    </motion.button>
  )
}

export default function Slide4({ step }) {
  const [selected, setSelected] = useState(null)
  const hl = useMemo(() => computeHighlight(selected), [selected])

  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <DarkBackdrop />

      <EyebrowStrap label="Roadmap" crumb="From insight to deployment" />

      <div className="relative z-10 h-full flex flex-col px-12 pt-28 pb-14">
        <StepGate show={0} step={step}>
          <h1 className="font-serif text-[56px] leading-[1.04] text-white">
            From insight to deployment.
          </h1>
        </StepGate>

        {/* Calendar - visual answer to "Where should we fish?" */}
        <StepGate show={1} step={step} variant="up" className="mt-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-sm p-5">
            <div className="flex items-baseline justify-between mb-3">
              <div className="text-[10px] uppercase tracking-[0.32em] text-white/55">
                Buying-window calendar
              </div>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-white/55">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm" style={{ background: 'var(--color-concord)' }} />
                  Concord · Store
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm" style={{ background: 'var(--color-ck-green)' }} />
                  Clayton Kendall · Multi-Loc
                </span>
                {selected && (
                  <button
                    onClick={() => setSelected(null)}
                    className="text-[var(--color-orange)]"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[110px_repeat(12,1fr)] text-[10px] uppercase tracking-wider text-white/35 border-b border-white/10">
              <div className="p-2 font-semibold">Motion</div>
              {months.map(m => (
                <div key={m} className="p-2 text-center border-l border-white/10">{m}</div>
              ))}
            </div>

            <div className="grid grid-cols-[110px_repeat(12,1fr)]">
              <div className="p-2 text-[11px] font-semibold flex items-center">Corporate Store</div>
              {months.map((m, i) => (
                <MonthCell
                  key={m}
                  label={m}
                  peak={storePeakIdx.includes(i)}
                  tone="store"
                  delayIndex={storePeakIdx.indexOf(i)}
                  revealed={step >= 1}
                  highlighted={hl.storeCells.has(i)}
                  dimmed={hl.dim && !hl.storeCells.has(i)}
                  onClick={() => setSelected({ motion: 'store', monthIdx: i })}
                />
              ))}
            </div>

            <div className="grid grid-cols-[110px_repeat(12,1fr)] border-t border-white/10">
              <div className="p-2 text-[11px] font-semibold flex items-center">Multi-Location</div>
              {months.map((m, i) => (
                <MonthCell
                  key={m}
                  label={m}
                  peak={transPeakIdx.includes(i)}
                  tone="transactional"
                  delayIndex={transPeakIdx.indexOf(i) + storePeakIdx.length}
                  revealed={step >= 1}
                  highlighted={hl.transCells.has(i)}
                  dimmed={hl.dim && !hl.transCells.has(i)}
                  onClick={() => setSelected({ motion: 'transactional', monthIdx: i })}
                />
              ))}
            </div>

            <div className="grid grid-cols-[110px_repeat(12,1fr)] border-t border-white/10 bg-white/[0.02]">
              <div className="p-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-orange)]">QBR fire</div>
              {months.map((_, i) => {
                const isFireMonth = allPeaks.some(p => qbrFireMonthFor(p.monthIdx) === i)
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={step >= 1 && isFireMonth ? {
                      opacity: hl.dim && !hl.qbrCells.has(i) ? 0.25 : 1,
                      scale: hl.qbrCells.has(i) ? 1.08 : 1
                    } : { opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.4, delay: isFireMonth ? 0.6 + i * 0.04 : 0 },
                      scale: { type: 'spring', stiffness: 320, damping: 22 }
                    }}
                    className="h-7 border-l border-white/10 flex items-center justify-center"
                    style={{
                      background: isFireMonth ? 'rgba(250,168,64,0.7)' : 'transparent',
                      boxShadow: hl.qbrCells.has(i) ? 'inset 0 0 0 2px var(--color-red)' : 'none'
                    }}
                  >
                    {isFireMonth && <div className="h-1 w-1 rounded-full bg-white" />}
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-3 text-[10px] text-white/35">
              QBRs fire 60-90 days ahead of each peak. Click any peak to see cross-motion convergence.
            </div>
          </div>
        </StepGate>

        {/* Mid strap: sits between the buying-window calendar and the roadmap cards */}
        <StepGate show={2} step={step} variant="fade" delay={0.2}>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="font-serif text-[18px] leading-[1.2] text-white">
              The right rep, on the right deal,{' '}
              <span className="text-[var(--color-orange)] italic">at the right time.</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] text-white/55">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-orange)]" />
              <span>Q3 · Q4 2026</span>
            </div>
          </div>
        </StepGate>

        {/* Two roadmap cards: Market Intelligence (the calendar's narrative half) + Rep Specialization */}
        <div className="mt-4 grid grid-cols-2 gap-5 flex-1 min-h-0">
          {roadmap.map((card, i) => (
            <StepGate key={card.label} show={i + 2} step={step} variant="up" className="h-full">
              <RoadmapCard card={card} />
            </StepGate>
          ))}
        </div>
      </div>
    </div>
  )
}

function RoadmapCard({ card }) {
  return (
    <div className="h-full bg-white/[0.03] border border-white/10 rounded-sm px-6 py-5 flex flex-col">
      <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.32em] text-[var(--color-orange)] font-semibold">
        <span className="inline-block h-1.5 w-1.5 bg-[var(--color-orange)]" />
        <span>{card.label}</span>
      </div>
      <h3 className="font-serif text-[28px] leading-[1.15] text-white mt-3">
        {card.question}
      </h3>
      <div className="mt-3 h-px w-full bg-white/10" />
      <p className="mt-3 text-[15px] leading-[1.55] text-white/75">
        {card.body}
      </p>
    </div>
  )
}
