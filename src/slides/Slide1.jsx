import { motion, AnimatePresence } from 'framer-motion'
import { NavyBackdrop } from '../components/AmbientBackdrop.jsx'
import EyebrowStrap from '../components/EyebrowStrap.jsx'
import RevenueIntelligenceDashboard from '../components/RevenueIntelligenceDashboard.jsx'
import ExecutiveAdvisorChat from '../components/ExecutiveAdvisorChat.jsx'

// Step choreography (sequential reveals; each component owns the full canvas):
// 0: Revenue Intelligence Dashboard fills the page, chip cycle plays automatically
// 1: Dashboard exits, Executive Advisor enters and types its response
export default function Slide1({ step }) {
  const showAdvisor = step >= 1

  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <NavyBackdrop />

      <EyebrowStrap label="Live Product" crumb="Queryable in seconds" />

      <div className="relative z-10 h-full flex flex-col px-12 pt-24 pb-10">
        {/* Compact hero stays consistent across both steps */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 flex-wrap"
        >
          <h1 className="font-serif text-[32px] leading-none text-white">
            Live now.
          </h1>
          <div className="px-3 py-1.5 rounded-sm border border-[var(--color-orange)]/50 bg-[var(--color-orange)]/10 text-[var(--color-orange)] text-[11px] uppercase tracking-[0.25em] font-semibold">
            Queryable in seconds
          </div>
        </motion.div>

        {/* Section label flips between dashboard and advisor */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showAdvisor ? 'advisor-label' : 'dashboard-label'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[10px] uppercase tracking-[0.32em] text-white/55"
          >
            {showAdvisor ? (
              <>Executive Advisor · <span className="text-[var(--color-orange)] font-semibold">Powered by Claude</span></>
            ) : (
              <>Revenue Intelligence · <span className="text-[var(--color-orange)] font-semibold">Live now</span></>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Stage: full-canvas swap between dashboard and advisor */}
        <div className="relative flex-1 mt-3">
          <AnimatePresence mode="wait">
            {!showAdvisor ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96, x: -40, filter: 'blur(8px)' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-start justify-center"
              >
                <div className="w-full max-w-[1180px]">
                  <RevenueIntelligenceDashboard
                    revealed={step >= 0}
                    cycleChips={step >= 0}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="advisor"
                initial={{ opacity: 0, scale: 0.96, x: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex justify-center"
              >
                <div className="w-full max-w-[900px] h-full flex flex-col">
                  <ExecutiveAdvisorChat revealed typing />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
