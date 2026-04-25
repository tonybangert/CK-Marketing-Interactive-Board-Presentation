import { motion } from 'framer-motion'
import { findings3 } from '../data.js'
import StepGate from '../components/StepGate.jsx'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'
import EyebrowStrap from '../components/EyebrowStrap.jsx'

// Step choreography:
// 0: hero (eyebrow + headline)
// 1-3: three finding cards animate in sequence
//
// Density: 9 anchors at filled state (3 titles + 3 bodies + eyebrow + hero).
// Down from 28 in the previous design. Speaker fills in numerics verbally.
export default function Slide2({ step }) {
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

        <div className="mt-12 grid grid-cols-3 gap-5 flex-1">
          {findings3.map((f, i) => (
            <StepGate key={f.id} show={i + 1} step={step} variant="up" className="h-full">
              <FindingCard finding={f} />
            </StepGate>
          ))}
        </div>
      </div>
    </div>
  )
}

function FindingCard({ finding }) {
  return (
    <div className="h-full flex flex-col bg-white/[0.03] border border-white/10 rounded-sm p-7">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-10 origin-left bg-[var(--color-orange)] mb-5"
      />
      <h2 className="font-serif text-[26px] leading-[1.15] text-white">
        {finding.title}
      </h2>
      <p className="mt-4 text-[14px] leading-[1.55] text-white/60">
        {finding.body}
      </p>
    </div>
  )
}
