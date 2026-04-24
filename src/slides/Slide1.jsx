import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { motions } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import CountUp from '../components/CountUp.jsx'
import { NavyBackdrop } from '../components/AmbientBackdrop.jsx'
import RevenueIntelligenceDashboard from '../components/RevenueIntelligenceDashboard.jsx'
import ExecutiveAdvisorChat from '../components/ExecutiveAdvisorChat.jsx'
import { pulseSource } from '../components/DataSpineChrome.jsx'

// Slide 1 in the new paradigm:
// The DataSpineChrome (three source nodes + spine) is always visible on the left.
// This slide's job is no longer to "show the convergence" (chrome does that).
// Its job is to prove the converged product is REAL.
//
// Step choreography:
// 0: hero title - audience's eye catches the chrome on the left for the first time
// 1: "Queryable in seconds" payoff + motion cycle stats (chrome pulses all three sources)
// 2: Revenue Intelligence Dashboard reveals (HubSpot pulses - that's where pipeline data comes from)
// 3: Pipeline chip cycles Composite -> Store -> Transactional (Transactions source pulses)
// 4: Executive Advisor enters, Claude types response (Finance source pulses - the peak revenue insight)
// 5: Bottom ribbon

const flow = ['Connect', 'Vectorize', 'Interrogate', 'Deliver']

export default function Slide1({ step }) {
  // Fire spine pulses at the moment each step reveals data from a specific source.
  useEffect(() => {
    if (step === 1) {
      pulseSource('hubspot')
      setTimeout(() => pulseSource('finance'), 250)
      setTimeout(() => pulseSource('transactions'), 500)
    } else if (step === 2) {
      pulseSource('hubspot')
    } else if (step === 3) {
      pulseSource('transactions')
    } else if (step === 4) {
      pulseSource('finance')
    }
  }, [step])

  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <NavyBackdrop />

      <div className="relative z-10 h-full flex flex-col pl-[160px] pr-10 pt-7 pb-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-orange)] mb-2"
        >
          Slide 01 · The Intelligence Layer
        </motion.div>

        {/* Hero: compresses when product reveals */}
        <AnimatePresence mode="wait">
          {step < 2 ? (
            <motion.div
              key="full-hero"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-serif text-[44px] leading-[1.02] text-white">
                Two companies.{' '}
                <span className="text-[var(--color-orange)]">One data spine.</span>
              </h1>
              <p className="mt-2 text-[13px] text-white/70">
                Three revenue systems, unified. Answers in seconds, not quarters.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="compact-hero"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 flex-wrap"
            >
              <h1 className="font-serif text-[28px] leading-none text-white">
                Two companies. <span className="text-[var(--color-orange)]">One data spine.</span>
              </h1>
              <motion.div
                layoutId="queryable-hero"
                className="px-3 py-1.5 rounded-sm border border-[var(--color-orange)]/50 bg-[var(--color-orange)]/10 text-[var(--color-orange)] text-[11px] uppercase tracking-[0.25em] font-semibold"
                transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              >
                Queryable in seconds
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage */}
        <div className="relative flex-1 mt-4">

          {/* STEP 1: "Queryable in seconds" crystallization payoff */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                key="crystallize"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Radiant backdrop */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 0.8, 0.55], scale: [0.6, 1.2, 1] }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(250,168,64,0.15) 0%, rgba(30,38,114,0.1) 35%, transparent 70%)'
                  }}
                />

                {/* The payoff hero */}
                <motion.div
                  layoutId="queryable-hero"
                  initial={{ opacity: 0, scale: 0.5, filter: 'blur(16px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <div className="font-serif text-[78px] leading-[1.02] text-white">
                    <span className="text-[var(--color-orange)]">Queryable</span>
                    <br />
                    <span>in seconds.</span>
                  </div>
                </motion.div>

                {/* Motion-cycle proof */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex items-center gap-10"
                >
                  {[motions.store, motions.transactional].map((m) => {
                    const accent = m.key === 'store' ? 'var(--color-concord)' : 'var(--color-ck-green)'
                    return (
                      <div key={m.key} className="flex items-baseline gap-3 border-l-2 pl-4" style={{ borderColor: accent }}>
                        <div className="font-serif text-[34px] leading-none">
                          <CountUp value={String(m.cycleDays)} duration={1.2} />
                          <span className="text-[13px] font-sans ml-1">days</span>
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.22em] text-white/60">{m.label}</div>
                      </div>
                    )
                  })}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="mt-4 text-[11px] uppercase tracking-[0.35em] text-white/50"
                >
                  Three sources. One answer.
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STEP 2+: live product */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                key="product"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 grid grid-cols-[1.25fr_1fr] gap-4"
              >
                <div className="flex flex-col">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">
                    Revenue Intelligence · <span className="text-[var(--color-orange)]">Live now</span>
                  </div>
                  <RevenueIntelligenceDashboard
                    revealed={step >= 2}
                    cycleChips={step >= 3}
                  />
                </div>

                <div className="flex flex-col min-h-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">
                    Executive Advisor · <span className="text-[var(--color-orange)]">Powered by Claude</span>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ExecutiveAdvisorChat revealed={step >= 4} typing={step >= 4} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom ribbon */}
        <div className="mt-4 flex items-center justify-center gap-4">
          {flow.map((stepLabel, i) => (
            <div key={stepLabel} className="flex items-center gap-4">
              <StepGate show={5} step={step} delay={i * 0.15} variant="fade">
                <span className="text-[11px] uppercase tracking-[0.35em] text-white font-semibold">
                  {stepLabel}
                </span>
              </StepGate>
              {i < flow.length - 1 && (
                <StepGate show={5} step={step} delay={i * 0.15 + 0.08} variant="drawX">
                  <div className="w-10 h-px bg-[var(--color-orange)] relative">
                    <ArrowRight size={12} color="#FAA840" className="absolute -right-1 -top-1.5" />
                  </div>
                </StepGate>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
