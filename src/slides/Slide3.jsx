import { motion, AnimatePresence } from 'framer-motion'
import { shifts, cadenceDetail } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'
import EyebrowStrap from '../components/EyebrowStrap.jsx'

// Step choreography (one card per click for dynamic delivery):
// 0: hero
// 1: SEPARATE card
// 2: SCORE card replaces
// 3: SEQUENCE card replaces
// 4: HOW REPS SPEND TIME cadence card (hero swaps to "How we operate it.")
// 5: HOW MARKETING FIRES cadence card replaces
const CADENCE_CARDS = [
  {
    label: 'How reps spend time',
    headline: 'Two cycles, two coaching plans.',
    items: null  // populated from cadenceDetail.reps
  },
  {
    label: 'How marketing fires',
    headline: "Fire on the buyer's clock.",
    items: null  // populated from cadenceDetail.marketing
  }
]

export default function Slide3({ step }) {
  const inCadence = step >= 4
  const cadenceIndex = Math.min(Math.max(step - 4, 0), 1)
  const shiftIndex = Math.min(Math.max(step - 1, 0), shifts.length - 1)

  const cadenceCards = [
    { ...CADENCE_CARDS[0], items: cadenceDetail.reps },
    { ...CADENCE_CARDS[1], items: cadenceDetail.marketing }
  ]

  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <DarkBackdrop />

      <EyebrowStrap label="Response" crumb="Three findings → three operational shifts" />

      <div className="relative z-10 h-full flex flex-col px-12 pt-28 pb-14">
        <StepGate show={0} step={step}>
          <h1 className="font-serif text-[56px] leading-[1.04] text-white">
            {inCadence ? 'How we operate it.' : "What we're doing about it."}
          </h1>
        </StepGate>

        <div className="relative flex-1 mt-12">
          <AnimatePresence mode="wait">
            {!inCadence && step >= 1 && (
              <motion.div
                key={`shift-${shiftIndex}`}
                initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <ShiftCard shift={shifts[shiftIndex]} index={shiftIndex} total={shifts.length} />
              </motion.div>
            )}

            {inCadence && (
              <motion.div
                key={`cadence-${cadenceIndex}`}
                initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <CadenceCard card={cadenceCards[cadenceIndex]} index={cadenceIndex} total={cadenceCards.length} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step >= 1 && (
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {/* 3 shift dashes */}
            {shifts.map((s, i) => (
              <div
                key={s.verb}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: !inCadence && i === shiftIndex ? 36 : 8,
                  background: !inCadence
                    ? (i <= shiftIndex ? 'var(--color-orange)' : 'rgba(255,255,255,0.2)')
                    : 'var(--color-orange)'
                }}
              />
            ))}
            {/* divider */}
            <div className="h-1 w-3" />
            {/* 2 cadence dashes */}
            {cadenceCards.map((c, i) => (
              <div
                key={c.label}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: inCadence && i === cadenceIndex ? 36 : 8,
                  background: inCadence
                    ? (i <= cadenceIndex ? 'var(--color-orange)' : 'rgba(255,255,255,0.2)')
                    : 'rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ShiftCard({ shift, index, total }) {
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
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[68px] leading-[1.05] text-white"
        >
          {shift.headline}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 h-px w-24 origin-left bg-[var(--color-orange)]/50"
        />

        <div className="mt-8 grid grid-cols-[80px_1fr] gap-x-6 gap-y-5 max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="text-[12px] uppercase tracking-[0.3em] text-white/40 font-semibold pt-1"
          >
            From
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.6 }}
            className="text-[22px] text-white/45 line-through decoration-white/30 leading-[1.4]"
          >
            {shift.from}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.75 }}
            className="text-[12px] uppercase tracking-[0.3em] text-[var(--color-orange)] font-semibold pt-1"
          >
            To
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.8 }}
            className="text-[22px] text-white leading-[1.4]"
          >
            {shift.to}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function CadenceCard({ card, index, total }) {
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
            <span>{card.label}</span>
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
          className="font-serif text-[68px] leading-[1.05] text-white"
        >
          {card.headline}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 h-px w-24 origin-left bg-[var(--color-orange)]/50"
        />

        <ul className="mt-8 space-y-5 max-w-[1000px]">
          {card.items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.55 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline gap-5 text-[24px] leading-[1.45] text-white/85"
            >
              <span className="text-[var(--color-orange)] text-[18px] mt-0.5">●</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}
