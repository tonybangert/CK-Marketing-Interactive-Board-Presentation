import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { months, motions, qbrSteps, deck } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import CountUp from '../components/CountUp.jsx'
import { NavyBackdrop } from '../components/AmbientBackdrop.jsx'

// Step choreography:
// 0: hero
// 1: calendar shell + motion rows (peaks bloom in)
// 2: QBR fire window row reveals (pulses in sequence)
// 3: QBR agent steps (staggered)
// 4: Forecast target value
// 5: Wide interval band appears
// 6: Narrows to tight interval (visual metaphor)

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
      className="h-10 border-r border-white/10 last:border-r-0 flex items-center justify-center text-[11px] font-semibold uppercase tracking-wider"
      style={{
        background: bg,
        color: peak ? 'white' : 'rgba(255,255,255,0.3)',
        boxShadow: highlighted ? '0 0 0 2px var(--color-red), 0 0 20px rgba(239,69,55,0.4)' : 'none',
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
      <NavyBackdrop />

      <div className="relative z-10 h-full flex flex-col px-12 pt-9 pb-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-orange)] mb-2"
        >
          Slide 04 · The Always-On Engine
        </motion.div>

        <StepGate show={0} step={step}>
          <h1 className="font-serif text-[44px] leading-[1.05]">
            From quarterly snapshot to <span className="text-[var(--color-orange)]">always-on engine.</span>
          </h1>
          <p className="mt-2 text-[14px] text-white/60">
            The merger keeps compounding once the engine keeps running.
          </p>
        </StepGate>

        {/* Calendar */}
        <StepGate show={1} step={step} variant="up" className="mt-5">
          <div className="bg-white/[0.04] border border-white/10 rounded-sm p-5 backdrop-blur-sm">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <div className="font-serif text-[22px]">Dynamic Revenue Calendar</div>
                <div className="text-[11px] text-white/50">Dual-motion. Account-aware. Always current.</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/60">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm" style={{ background: 'var(--color-concord)' }} />
                    Concord · Store
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm" style={{ background: 'var(--color-ck-green)' }} />
                    Clayton Kendall · Multi-Loc
                  </span>
                </div>
                {selected && (
                  <button
                    onClick={() => setSelected(null)}
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-orange)]"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Header */}
            <div className="grid grid-cols-[110px_repeat(12,1fr)] text-[10px] uppercase tracking-wider text-white/40 border-b border-white/10">
              <div className="p-2 font-semibold">Motion</div>
              {months.map(m => (
                <div key={m} className="p-2 text-center border-l border-white/10">{m}</div>
              ))}
            </div>

            {/* Corporate Store row */}
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

            {/* Multi-Location row */}
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

            {/* QBR fire window row */}
            <div className="grid grid-cols-[110px_repeat(12,1fr)] border-t border-white/10 bg-white/[0.03]">
              <div className="p-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-orange)]">QBR fire</div>
              {months.map((_, i) => {
                const isFireMonth = allPeaks.some(p => qbrFireMonthFor(p.monthIdx) === i)
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={step >= 2 && isFireMonth ? {
                      opacity: hl.dim && !hl.qbrCells.has(i) ? 0.25 : 1,
                      scale: hl.qbrCells.has(i) ? 1.08 : 1
                    } : { opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.4, delay: isFireMonth ? i * 0.05 : 0 },
                      scale: { type: 'spring', stiffness: 320, damping: 22 }
                    }}
                    className="h-8 border-l border-white/10 flex items-center justify-center"
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

            <div className="mt-3 text-[10px] text-white/40">
              Fire windows = 60-90 days ahead of each segment's peak. Click any peak to see cross-motion convergence.
            </div>
          </div>
        </StepGate>

        {/* QBR Agent + Forecast */}
        <div className="grid grid-cols-[1.5fr_1fr] gap-4 flex-1 mt-4">
          <StepGate show={3} step={step} variant="up" className="h-full">
            <div className="bg-white/[0.04] border border-white/10 rounded-sm p-5 backdrop-blur-sm h-full">
              <div className="font-serif text-[20px]">Automated QBR Agent</div>
              <div className="text-[11px] text-white/60 mb-4">Every QBR fires at the window the buyer is already opening.</div>
              <div className="grid grid-cols-4 gap-2">
                {qbrSteps.map((s, i) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, y: 8 }}
                    animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.12 }}
                    className="bg-white/[0.03] border border-white/10 p-3 rounded-sm"
                  >
                    <div className="text-[10px] text-[var(--color-orange)] font-semibold">{s.n}</div>
                    <div className="text-[12px] font-semibold mt-1">{s.title}</div>
                    <div className="text-[10px] text-white/50 mt-1 leading-snug">{s.body}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </StepGate>

          <StepGate show={4} step={step} variant="up" className="h-full">
            <div className="bg-[var(--color-cream)] text-[var(--color-navy)] rounded-sm p-5 h-full flex flex-col shadow-[0_15px_40px_rgba(16,45,80,0.3)]">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-orange)] font-semibold">2026 Target · Holds</div>
              <div className="font-serif text-[44px] leading-none mt-1">
                {step >= 4 ? <CountUp value={deck.revenueTarget} duration={1.8} /> : deck.revenueTarget}
              </div>
              <div className="text-[10px] text-[var(--color-muted)]">{deck.revenueTargetLong}</div>

              <div className="mt-3 flex-1 flex flex-col justify-center gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1">Today · wide interval</div>
                  <div className="h-3 bg-white rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: step >= 5 ? 1 : 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-y-0 left-[8%] right-[8%] bg-[var(--color-red)]/40 origin-center"
                    />
                    <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-[var(--color-navy)]" />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1">After · narrowed, tighter, more probable</div>
                  <div className="h-3 bg-white rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ left: '8%', right: '8%' }}
                      animate={step >= 6 ? { left: '38%', right: '38%' } : step >= 5 ? { left: '8%', right: '8%' } : { left: '50%', right: '50%' }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-y-0 bg-[var(--color-orange)]"
                    />
                    <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-[var(--color-navy)]" />
                  </div>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 6 ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-[11px] italic text-[var(--color-muted)] mt-3"
              >
                The number does not change. The probability of hitting it does.
              </motion.p>
            </div>
          </StepGate>
        </div>
      </div>
    </div>
  )
}
