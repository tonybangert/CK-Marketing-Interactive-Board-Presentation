import { motion } from 'framer-motion'
import { findings, motions, verticals, seasonality, seasonalityMeta, deck } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import CountUp from '../components/CountUp.jsx'
import { CreamBackdrop } from '../components/AmbientBackdrop.jsx'

// Step choreography:
// 0: hero
// 1: Finding 01 (two motions)
// 2: Finding 02 (composite scoring)
// 3: Finding 03 (seasonality chart bars animate)
// 4: Finding 04 (sleepers)
// 5: Finding 05 (hygiene)
// 6: Finding 06 (summary dark tile)

function FindingTile({ n, title, accent = false, children, step, show }) {
  return (
    <StepGate show={show} step={step} variant="scale">
      <div
        className={`rounded-sm p-5 h-full border transition-colors ${
          accent
            ? 'bg-[var(--color-navy)] border-[var(--color-navy)] text-white shadow-[0_15px_40px_rgba(16,45,80,0.25)]'
            : 'bg-white border-[var(--color-rule)] text-[var(--color-navy)] shadow-sm'
        }`}
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-orange)] font-semibold">
            Finding {n}
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 h-px bg-[var(--color-orange)]/40 origin-left"
          />
        </div>
        <div className={`font-serif text-[19px] leading-[1.15] mb-3 ${accent ? 'text-white' : 'text-[var(--color-navy)]'}`}>
          {title}
        </div>
        <div className={`text-[12px] ${accent ? 'text-white/80' : 'text-[var(--color-muted)]'}`}>
          {children}
        </div>
      </div>
    </StepGate>
  )
}

function MotionRow({ m, active }) {
  const accent = m.key === 'store' ? 'var(--color-concord)' : 'var(--color-ck-green)'
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--color-rule)] py-1.5 last:border-0">
      <div className="flex items-baseline gap-2">
        <span className="h-2 w-2 rounded-sm shrink-0 self-center" style={{ background: accent }} />
        <div>
          <div className="text-[12px] font-semibold text-[var(--color-navy)]">{m.label}</div>
          <div className="text-[10px] text-[var(--color-muted)]">{m.legacy}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-serif text-[16px]" style={{ color: accent }}>
          {active ? <CountUp value={m.avgDeal} duration={1.1} /> : m.avgDeal}
        </div>
        <div className="text-[10px] text-[var(--color-muted)]">
          {m.cycleDays}d · {m.deals} · {m.volume}
        </div>
      </div>
    </div>
  )
}

function SeasonalityChart({ active }) {
  const max = Math.max(...seasonality.map(s => Math.abs(s.net)))
  return (
    <div className="flex items-center gap-1 h-[78px] mt-2 relative">
      <div className="absolute left-0 right-0 top-1/2 h-px bg-[var(--color-rule)]" />
      {seasonality.map((s, i) => {
        const heightPct = (Math.abs(s.net) / max)
        const positive = s.net >= 0
        const isBigPeak = s.net >= 1000
        return (
          <div key={s.month} className="flex-1 flex flex-col items-center justify-center h-full relative">
            <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-center">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: active ? heightPct : 0 }}
                transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto w-[70%] rounded-[1px]"
                style={{
                  height: '30px',
                  transformOrigin: positive ? 'bottom' : 'top',
                  marginTop: positive ? '0' : '30px',
                  background: positive
                    ? (isBigPeak ? 'var(--color-orange)' : 'var(--color-navy)')
                    : 'var(--color-red)'
                }}
              />
            </div>
            <div className="absolute bottom-0 text-[8px] text-[var(--color-muted)] uppercase">{s.month}</div>
          </div>
        )
      })}
    </div>
  )
}

export default function Slide2({ step }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <CreamBackdrop tone="cream-soft" />

      <div className="relative z-10 h-full flex flex-col px-12 pt-10 pb-14">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-orange)] mb-3"
          >
            Slide 02 · Five Findings
          </motion.div>

          <StepGate show={0} step={step}>
            <h1 className="font-serif text-[48px] leading-[1.05] text-[var(--color-navy)]">
              Five truths only the combined business can see.
            </h1>
            <p className="mt-2 text-[14px] text-[var(--color-muted)]">
              {deck.clientLong}. The merger thesis, evidenced.
            </p>
          </StepGate>
        </div>

        <div className="mt-5 flex-1 grid grid-cols-3 grid-rows-[1.4fr_1fr] gap-3">
          <FindingTile n="01" title={findings[0].title} show={1} step={step}>
            <div className="space-y-0">
              <MotionRow m={motions.store} active={step >= 1} />
              <MotionRow m={motions.transactional} active={step >= 1} />
            </div>
            <div className="mt-2 text-[11px] italic text-[var(--color-navy)]">
              One roof. Two economic engines.
            </div>
          </FindingTile>

          <FindingTile n="02" title={findings[1].title} show={2} step={step}>
            <div className="space-y-1.5">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-orange)] font-semibold">Composite</span>
                <div className="text-[12px] text-[var(--color-navy)]">{verticals.composite.join(' · ')}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-muted)] font-semibold">Store</span>
                  <div className="text-[11px] text-[var(--color-navy)] leading-tight">{verticals.store.join(' · ')}</div>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-muted)] font-semibold">Transactional</span>
                  <div className="text-[11px] text-[var(--color-navy)] leading-tight">{verticals.transactional.join(' · ')}</div>
                </div>
              </div>
              <div className="mt-1 text-[10px] text-[var(--color-muted)] pt-1 border-t border-[var(--color-rule)]">
                Accounting 57% win · Construction 41.7% · $14.4M
              </div>
            </div>
          </FindingTile>

          <FindingTile n="03" title={findings[2].title} show={3} step={step}>
            <SeasonalityChart active={step >= 3} />
            <div className="mt-2 flex justify-between text-[10px] text-[var(--color-muted)]">
              <span>{seasonalityMeta.peaks} peaks · {seasonalityMeta.troughs} troughs</span>
              <span>May: {seasonalityMeta.mayCluster.accounts} acct · {seasonalityMeta.mayCluster.spend}</span>
            </div>
          </FindingTile>

          <FindingTile n="04" title={findings[3].title} show={4} step={step}>
            <div className="flex items-baseline gap-3 mb-2">
              <div className="font-serif text-[36px] text-[var(--color-orange)] leading-none">
                {step >= 4 ? <CountUp value={deck.inactivePct} duration={1.2} /> : deck.inactivePct}
              </div>
              <div className="text-[11px] text-[var(--color-muted)]">
                of {deck.contactsUnified} inactive ({deck.inactiveContacts})
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] uppercase tracking-wider">
              {['T1 Outreach', 'T2 Nurture', 'T3 Purge'].map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 6 }}
                  animate={step >= 4 ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="bg-[var(--color-cream)] p-1.5 text-center text-[var(--color-navy)]"
                >
                  {t}
                </motion.div>
              ))}
            </div>
          </FindingTile>

          <FindingTile n="05" title={findings[4].title} show={5} step={step}>
            <div className="flex items-baseline gap-3 mb-2">
              <div className="font-serif text-[28px] text-[var(--color-red)] leading-none">5-10%</div>
              <div className="text-[11px] text-[var(--color-muted)]">stage & naming mismatch</div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={step >= 5 ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-2 text-[11px] text-[var(--color-navy)] bg-[var(--color-cream)] p-2 border-l-2 border-[var(--color-red)]"
            >
              7-figure unattributed revenue, quietly.
            </motion.div>
          </FindingTile>

          <FindingTile n="06" title={findings[5].title} show={6} step={step} accent>
            <p className="text-[11.5px] leading-[1.4]">
              Two motions. Composite ICP. Timed to rhythm. Visible across both books. Measured on hygiene.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={step >= 6 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[11px] mt-2 text-[var(--color-orange)] font-semibold uppercase tracking-[0.15em]"
            >
              Forecast confidence compounds.
            </motion.p>
          </FindingTile>
        </div>
      </div>
    </div>
  )
}
