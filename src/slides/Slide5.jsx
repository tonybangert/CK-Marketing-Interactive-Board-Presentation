import { motion } from 'framer-motion'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'
import { deck } from '../data.js'

// Closer: single-sentence mic drop. Sample's exact framing.
// "The revenue target doesn't change. The confidence in hitting it does."
// One step (auto-cascade). Black canvas. No animations beyond a quiet fade.
export default function Slide5() {
  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <DarkBackdrop />

      <div className="relative z-10 h-full flex flex-col px-16 pt-10 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[68px] leading-[1.06] mt-auto"
        >
          The revenue target doesn't change.{' '}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="block text-[var(--color-orange)]"
          >
            The confidence in hitting it does.
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-auto h-px origin-left bg-white/15"
        />

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/55"
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-orange)]" />
            <span>Engagement</span>
          </div>
          <div>
            {deck.authors} <span className="text-[var(--color-orange)]">+</span> Clayton Kendall + Concord Marketing
          </div>
        </motion.div>
      </div>
    </div>
  )
}
