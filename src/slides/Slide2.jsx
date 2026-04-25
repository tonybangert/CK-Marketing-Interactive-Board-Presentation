import { motion, AnimatePresence } from 'framer-motion'
import { findings3 } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'
import EyebrowStrap from '../components/EyebrowStrap.jsx'

// Step choreography (one finding per click for dynamic delivery):
// 0: hero only
// 1-3: each finding takes the canvas as a large card; previous swaps out
export default function Slide2({ step }) {
  const cardIndex = Math.min(Math.max(step - 1, 0), findings3.length - 1)
  const activeFinding = findings3[cardIndex]

  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <DarkBackdrop />

      <EyebrowStrap label="Findings" crumb="Three patterns hidden in plain sight" />

      <div className="relative z-10 h-full flex flex-col px-12 pt-28 pb-14">
        <StepGate show={0} step={step}>
          <h1 className="font-serif text-[56px] leading-[1.04] text-white">
            What the AI revealed.
          </h1>
        </StepGate>

        <div className="relative flex-1 mt-12">
          <AnimatePresence mode="wait">
            {step >= 1 && (
              <motion.div
                key={`finding-${cardIndex}`}
                initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <FindingCard finding={activeFinding} index={cardIndex} total={findings3.length} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step >= 1 && (
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {findings3.map((f, i) => (
              <div
                key={f.id}
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

function FindingCard({ finding, index, total }) {
  return (
    <div className="relative h-full flex flex-col justify-center bg-white/[0.025] border border-white/10 rounded-sm px-16 py-12 overflow-hidden">
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

      <div className="relative">
        <div className="flex items-baseline justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 text-[20px] uppercase tracking-[0.32em] font-semibold text-[var(--color-orange)]"
          >
            <span className="text-[28px] leading-none">▸</span>
            <span>Finding</span>
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
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[68px] leading-[1.05] text-white max-w-[1100px]"
        >
          {finding.title}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 h-px w-24 origin-left bg-[var(--color-orange)]/50"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-[24px] leading-[1.45] text-white/70 max-w-[900px]"
        >
          {finding.body}
        </motion.p>
      </div>
    </div>
  )
}
