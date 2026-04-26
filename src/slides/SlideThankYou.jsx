import { motion } from 'framer-motion'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'
import EyebrowStrap from '../components/EyebrowStrap.jsx'
import { deck } from '../data.js'

// Final social-conclusion slide - restrained version of the original Thank You.
// Follows the deck's design language: dark canvas, serif headline, eyebrow strap,
// orange accent used sparingly. Partner logos lock up centered with a thin rule between.
// Single step, auto-cascade.
export default function SlideThankYou() {
  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <DarkBackdrop />

      <EyebrowStrap label="Partnership" crumb={`${deck.client} · ${deck.quarter}`} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-16 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[88px] leading-[0.98] text-center"
        >
          Thank you<span className="text-[var(--color-orange)]">.</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 h-px w-[220px] origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), var(--color-orange), rgba(255,255,255,0.4), transparent)'
          }}
        />

        {/* Partner logo lockup - equal-width columns force the divider to sit at the
            true visual center, matching the "Thank you" text above. */}
        <div className="mt-12 flex items-center w-full max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col items-center gap-3"
          >
            <img
              src="/performancelabs.png"
              alt="PerformanceLabs.AI"
              style={{ height: 96, width: 'auto' }}
            />
            <div className="text-[11px] uppercase tracking-[0.32em] text-white/60 font-semibold">
              PerformanceLabs.AI
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-[88px] w-px origin-center mx-8 shrink-0"
            style={{ background: 'linear-gradient(180deg, transparent, var(--color-orange), transparent)' }}
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col items-center gap-3"
          >
            <img
              src="/aplora.png"
              alt="Aplora.AI"
              style={{ height: 96, width: 'auto' }}
            />
            <div className="text-[11px] uppercase tracking-[0.32em] text-white/60 font-semibold">
              Aplora.AI
            </div>
          </motion.div>
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 font-serif text-[24px] text-white/85 text-center"
        >
          To a{' '}
          <span className="italic text-[var(--color-orange)]">compounding</span>{' '}
          year.
        </motion.div>
      </div>

      {/* Bottom strap */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 px-12 pb-10"
      >
        <div className="h-px w-full bg-white/10 mb-5" />
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/55">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-orange)]" />
            <span>Clayton Kendall + Concord Marketing · 2026</span>
          </div>
          <div>{deck.deliveryDate}</div>
        </div>
      </motion.div>
    </div>
  )
}
