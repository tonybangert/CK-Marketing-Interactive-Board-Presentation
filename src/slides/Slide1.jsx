import { motion } from 'framer-motion'
import { Database, LineChart, Receipt, ArrowRight } from 'lucide-react'
import { deck, motions } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import CountUp from '../components/CountUp.jsx'
import { NavyBackdrop } from '../components/AmbientBackdrop.jsx'

// Step choreography:
// 0: hero title + sub
// 1: three systems (staggered fade-up)
// 2: proof stats (count-up)
// 3: live product mocks (dashboard + executive advisor)
// 4: bottom ribbon (Connect -> Vectorize -> Interrogate -> Deliver)

const systems = [
  { icon: LineChart, label: 'HubSpot', sub: 'Pipeline & activity' },
  { icon: Database,  label: 'Finance', sub: 'Budget, forecast, actuals' },
  { icon: Receipt,   label: 'Transactions', sub: 'Historical orders & accounts' }
]

const flow = ['Connect', 'Vectorize', 'Interrogate', 'Deliver']

export default function Slide1({ step }) {
  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <NavyBackdrop />

      <div className="relative z-10 h-full flex flex-col px-12 pt-10 pb-14">
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-orange)] mb-3"
        >
          Slide 01 · The Intelligence Layer
        </motion.div>

        <StepGate show={0} step={step}>
          <h1 className="font-serif text-[58px] leading-[1.02] text-white">
            Two companies.<br />
            <span className="text-[var(--color-orange)]">One data spine.</span>
          </h1>
          <p className="mt-3 text-[17px] text-white/70">
            Answers in seconds, not quarters.
          </p>
        </StepGate>

        <div className="mt-8 flex-1 grid grid-cols-2 gap-10">
          {/* Left: systems + stats */}
          <div className="flex flex-col">
            <StepGate show={1} step={step} className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-4">
              Three Revenue Systems · One Spine
            </StepGate>

            <div className="space-y-2.5">
              {systems.map((s, i) => (
                <StepGate key={s.label} show={1} step={step} delay={i * 0.12}>
                  <div className="flex items-center gap-4 p-4 bg-white/[0.04] border border-white/10 rounded-sm backdrop-blur-sm hover:bg-white/[0.06] transition-colors">
                    <div className="h-11 w-11 rounded-sm bg-[var(--color-orange)]/15 flex items-center justify-center border border-[var(--color-orange)]/30">
                      <s.icon size={20} strokeWidth={1.5} color="#FAA840" />
                    </div>
                    <div>
                      <div className="font-semibold text-[15px]">{s.label}</div>
                      <div className="text-[12px] text-white/50">{s.sub}</div>
                    </div>
                  </div>
                </StepGate>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { k: deck.activePipeline, v: 'Active pipeline' },
                { k: String(deck.activeDeals), v: 'Live deals' },
                { k: deck.contactsUnified, v: 'Contacts unified' }
              ].map((p, i) => (
                <StepGate key={p.v} show={2} step={step} delay={i * 0.1} variant="scale">
                  <div className="bg-gradient-to-br from-white/[0.06] to-transparent border border-white/10 p-4 rounded-sm">
                    <div className="font-serif text-[28px] leading-none text-white">
                      {step >= 2 ? <CountUp value={p.k} duration={1.3} /> : p.k}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-orange)] mt-2">{p.v}</div>
                  </div>
                </StepGate>
              ))}
            </div>
          </div>

          {/* Right: live product */}
          <div className="flex flex-col">
            <StepGate show={3} step={step} className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-4">
              The Live Intelligence Product
            </StepGate>

            <StepGate show={3} step={step} variant="scale">
              <div className="bg-gradient-to-br from-[var(--color-orange)]/20 via-white/5 to-transparent border border-white/10 rounded-sm p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-[var(--color-orange)] uppercase tracking-[0.25em]">Hello Tony</div>
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Live</div>
                  </div>
                </div>
                <div className="font-serif text-[44px] leading-none mt-2">
                  {step >= 3 ? <CountUp value={deck.activePipeline} duration={1.4} /> : deck.activePipeline}
                </div>
                <div className="text-[12px] text-white/60 mt-1">
                  {step >= 3 ? <CountUp value={String(deck.activeDeals)} duration={1.0} /> : deck.activeDeals} active deals
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: step >= 3 ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 h-16 rounded-sm bg-gradient-to-r from-[var(--color-orange)]/80 via-[var(--color-orange)]/30 to-transparent origin-left flex items-end p-2"
                >
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/70">Dashboard · live</div>
                </motion.div>
              </div>
            </StepGate>

            <StepGate show={3} step={step} delay={0.15}>
              <div className="mt-3 bg-white/[0.04] border border-white/10 rounded-sm p-4 backdrop-blur-sm">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Executive Advisor</div>
                <div className="text-[13px] text-white italic">
                  "What's the velocity difference between store and transactional pipelines?"
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[motions.store, motions.transactional].map((m, i) => (
                    <motion.div
                      key={m.key}
                      initial={{ opacity: 0, x: -12 }}
                      animate={step >= 3 ? { opacity: 1, x: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="border-l-2 border-[var(--color-orange)] pl-3"
                    >
                      <div className="font-serif text-[24px] leading-none">
                        {step >= 3 ? <CountUp value={String(m.cycleDays)} duration={1.0} /> : m.cycleDays}
                        <span className="text-[12px] font-sans ml-1"> days</span>
                      </div>
                      <div className="text-[11px] text-white/50">{m.label} · {m.volume}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </StepGate>
          </div>
        </div>

        {/* Bottom ribbon */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {flow.map((stepLabel, i) => (
            <div key={stepLabel} className="flex items-center gap-4">
              <StepGate show={4} step={step} delay={i * 0.15} variant="fade">
                <span className="text-[12px] uppercase tracking-[0.35em] text-white font-semibold">
                  {stepLabel}
                </span>
              </StepGate>
              {i < flow.length - 1 && (
                <StepGate show={4} step={step} delay={i * 0.15 + 0.08} variant="drawX">
                  <div className="w-12 h-px bg-[var(--color-orange)] relative">
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
