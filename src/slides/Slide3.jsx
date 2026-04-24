import { motion } from 'framer-motion'
import { motions, cadence } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import CountUp from '../components/CountUp.jsx'
import { CreamBackdrop } from '../components/AmbientBackdrop.jsx'

// Step choreography:
// 0: hero
// 1: Store + Multi-Location lift tiles
// 2: Combined lift (dark accent tile, dramatic)
// 3: Rep behavior column (staggered bullets)
// 4: Marketing behavior column (staggered bullets)
// 5: Decision rhythm strip (4 cells)
// 6: (closed)

const repBehavior = [
  'Corporate Store reps coached to 203-day cycle with multi-stakeholder playbooks. No penalty for patience.',
  'Multi-Location reps coached to 80-day cycle with volume-efficient cadence.',
  '70% of pursuit hours concentrated on top 5 composite verticals.',
  'End-to-end cycle mapped so reps and managers know what "on track" looks like in each motion.'
]

const marketingBehavior = [
  'QBRs sequenced 60-90 days ahead of each segment’s peak month.',
  'Spend weighted to April, May, October (highest net swing months).',
  'Cross-sell campaigns fire when Multi-Location accounts enter Corporate Store signals, and vice versa.',
  'Dual dashboards: two motions, two calendars, one combined revenue goal.'
]

function MathTile({ label, pct, value, base, tone, accent, active }) {
  const dark = tone === 'dark'
  return (
    <div
      className={`flex-1 p-5 rounded-sm relative overflow-hidden ${dark ? 'shadow-[0_15px_40px_rgba(16,45,80,0.3)]' : ''}`}
      style={{
        background: dark ? 'var(--color-navy)' : 'white',
        border: dark ? '1px solid var(--color-navy)' : '1px solid var(--color-rule)',
        color: dark ? 'white' : 'var(--color-navy)'
      }}
    >
      {accent && !dark && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] origin-left"
          style={{ background: accent }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      {dark && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(250,168,64,0.25), transparent 60%)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.2em] opacity-70 mb-1">{label}</div>
        <div className="flex items-baseline gap-2">
          <div
            className="font-serif text-[40px] leading-none"
            style={{ color: dark ? '#FAA840' : (accent || 'var(--color-navy)') }}
          >
            {active ? <CountUp value={value} duration={1.6} /> : value}
          </div>
          <div className="text-[11px] opacity-70">{pct}</div>
        </div>
        <div className="text-[10px] opacity-60 mt-1">{base}</div>
      </div>
    </div>
  )
}

function BehaviorColumn({ title, items, step, show }) {
  return (
    <StepGate show={show} step={step} variant="up">
      <div className="bg-white border border-[var(--color-rule)] rounded-sm p-5 h-full shadow-sm">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-orange)] font-semibold mb-3">{title}</div>
        <ul className="space-y-2.5">
          {items.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={step >= show ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
              className="flex gap-3 text-[12px] text-[var(--color-navy)]"
            >
              <span className="text-[var(--color-orange)] font-semibold font-mono">0{i+1}</span>
              <span className="leading-[1.4]">{b}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </StepGate>
  )
}

export default function Slide3({ step }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <CreamBackdrop tone="cream-soft" />

      <div className="relative z-10 h-full flex flex-col px-12 pt-9 pb-14">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-orange)] mb-2"
          >
            Slide 03 · The Operating Blueprint
          </motion.div>
          <StepGate show={0} step={step}>
            <h1 className="font-serif text-[44px] leading-[1.05] text-[var(--color-navy)]">
              Same target. Sharper aim. <span className="text-[var(--color-orange)]">Higher probability.</span>
            </h1>
            <p className="mt-2 text-[14px] text-[var(--color-muted)]">
              The merger pays off when reps and marketing operate on two rhythms, not one.
            </p>
          </StepGate>
        </div>

        {/* Revenue Math Band */}
        <div className="mt-5">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-navy)] font-semibold mb-2 opacity-70">
            Revenue Math · +10% lift per motion, timed to rhythm
          </div>
          <div className="flex gap-3">
            <StepGate show={1} step={step} variant="up" className="flex-1">
              <MathTile
                label="Corporate Store · Concord legacy"
                pct="+10%"
                value={motions.store.lift}
                base={motions.store.liftBase}
                tone="light"
                accent="var(--color-concord)"
                active={step >= 1}
              />
            </StepGate>
            <StepGate show={1} step={step} variant="up" delay={0.12} className="flex-1">
              <MathTile
                label="Multi-Location · Clayton Kendall legacy"
                pct="+10%"
                value={motions.transactional.lift}
                base={motions.transactional.liftBase}
                tone="light"
                accent="var(--color-ck-green)"
                active={step >= 1}
              />
            </StepGate>
            <StepGate show={2} step={step} variant="scale" className="flex-1">
              <MathTile
                label="Combined annualized lift"
                pct="60-90d ahead of peak"
                value={motions.combinedLift}
                base="Share of wallet, timed to rhythm"
                tone="dark"
                active={step >= 2}
              />
            </StepGate>
          </div>
        </div>

        {/* Behavior columns */}
        <div className="grid grid-cols-2 gap-4 flex-1 mt-4">
          <BehaviorColumn title="How Reps Spend Time" items={repBehavior} step={step} show={3} />
          <BehaviorColumn title="How Marketing Fires" items={marketingBehavior} step={step} show={4} />
        </div>

        {/* Decision Rhythm Strip */}
        <StepGate show={5} step={step} variant="up" className="mt-4">
          <div className="grid grid-cols-4 rounded-sm overflow-hidden shadow-[0_15px_40px_rgba(16,45,80,0.25)]">
            {cadence.map((c, i) => (
              <motion.div
                key={c.when}
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 5 ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                className="p-3 relative"
                style={{ background: i % 2 === 0 ? 'var(--color-navy)' : 'var(--color-navy-soft)' }}
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-orange)] font-semibold">{c.when}</div>
                <div className="text-[11.5px] text-white mt-0.5 leading-snug">{c.what}</div>
              </motion.div>
            ))}
          </div>
        </StepGate>
      </div>
    </div>
  )
}
