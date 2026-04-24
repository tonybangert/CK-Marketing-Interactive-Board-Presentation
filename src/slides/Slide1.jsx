import { motion } from 'framer-motion'
import { Database, LineChart, Receipt, ArrowRight } from 'lucide-react'
import { deck, motions } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import CountUp from '../components/CountUp.jsx'
import { NavyBackdrop } from '../components/AmbientBackdrop.jsx'
import RevenueIntelligenceDashboard from '../components/RevenueIntelligenceDashboard.jsx'
import ExecutiveAdvisorChat from '../components/ExecutiveAdvisorChat.jsx'

// Step choreography (upgraded):
// 0: hero title + sub
// 1: three systems + proof stats (left column fills)
// 2: Revenue Intelligence Dashboard appears (live product, count-up on $7.1M / 96)
// 3: Pipeline filter chips cycle Composite -> Store -> Transactional (live filter demo)
// 4: Executive Advisor enters, question slides in, Claude types response live
// 5: Bottom ribbon Connect -> Vectorize -> Interrogate -> Deliver

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

      <div className="relative z-10 h-full flex flex-col px-10 pt-8 pb-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-orange)] mb-2"
        >
          Slide 01 · The Intelligence Layer
        </motion.div>

        <StepGate show={0} step={step}>
          <h1 className="font-serif text-[46px] leading-[1.02] text-white">
            Two companies.{' '}
            <span className="text-[var(--color-orange)]">One data spine.</span>
          </h1>
          <p className="mt-2 text-[14px] text-white/70">
            Answers in seconds, not quarters. A live agentic backend, not a slide.
          </p>
        </StepGate>

        <div className="mt-5 flex-1 grid grid-cols-[0.8fr_1.2fr] gap-6">
          {/* LEFT: systems + stats */}
          <div className="flex flex-col">
            <StepGate show={1} step={step} className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3">
              Three Revenue Systems · One Spine
            </StepGate>

            <div className="space-y-2">
              {systems.map((s, i) => (
                <StepGate key={s.label} show={1} step={step} delay={i * 0.1}>
                  <div className="flex items-center gap-3 p-3 bg-white/[0.04] border border-white/10 rounded-sm backdrop-blur-sm">
                    <div className="h-9 w-9 rounded-sm bg-[var(--color-orange)]/15 flex items-center justify-center border border-[var(--color-orange)]/30 shrink-0">
                      <s.icon size={17} strokeWidth={1.5} color="#FAA840" />
                    </div>
                    <div>
                      <div className="font-semibold text-[13px]">{s.label}</div>
                      <div className="text-[10px] text-white/50">{s.sub}</div>
                    </div>
                  </div>
                </StepGate>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { k: deck.activePipeline, v: 'Pipeline' },
                { k: String(deck.activeDeals), v: 'Deals' },
                { k: deck.contactsUnified, v: 'Contacts' }
              ].map((p, i) => (
                <StepGate key={p.v} show={1} step={step} delay={0.3 + i * 0.08} variant="scale">
                  <div className="bg-gradient-to-br from-white/[0.06] to-transparent border border-white/10 p-3 rounded-sm">
                    <div className="font-serif text-[22px] leading-none text-white">
                      {step >= 1 ? <CountUp value={p.k} duration={1.2} /> : p.k}
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-orange)] mt-1.5">{p.v}</div>
                  </div>
                </StepGate>
              ))}
            </div>

            <StepGate show={1} step={step} delay={0.5} className="mt-4">
              <div className="p-3 border border-white/10 rounded-sm bg-white/[0.03]">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-orange)] font-semibold mb-1">
                  Queryable in seconds
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[motions.store, motions.transactional].map((m) => {
                    const accent = m.key === 'store' ? 'var(--color-concord)' : 'var(--color-ck-green)'
                    return (
                      <div key={m.key} className="border-l-2 pl-2" style={{ borderColor: accent }}>
                        <div className="font-serif text-[18px] leading-none">
                          {step >= 1 ? <CountUp value={String(m.cycleDays)} duration={1.0} /> : m.cycleDays}
                          <span className="text-[10px] font-sans ml-0.5">d</span>
                        </div>
                        <div className="text-[9px] text-white/50">{m.label}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </StepGate>
          </div>

          {/* RIGHT: actual live product proof */}
          <div className="flex flex-col gap-3">
            <StepGate show={2} step={step} className="text-[10px] uppercase tracking-[0.25em] text-white/50">
              The Live Intelligence Product · <span className="text-[var(--color-orange)]">Live now</span>
            </StepGate>

            {/* Revenue Intelligence Dashboard (real product chrome) */}
            <RevenueIntelligenceDashboard
              revealed={step >= 2}
              cycleChips={step >= 3}
            />

            {/* Executive Advisor chat */}
            <div className="flex-1 min-h-0">
              <ExecutiveAdvisorChat revealed={step >= 4} typing={step >= 4} />
            </div>
          </div>
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
