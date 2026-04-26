import { motion } from 'framer-motion'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'

// Load-screen intro. Partner logo lockup (mirrors the Thank You slide's design)
// + "Revenue Intelligence" + "Lets Get Started" button.
// Click the button (or press any deck nav key) to advance to Slide0 (Cover).
export default function SlideIntro({ onStart }) {
  return (
    <div className="absolute inset-0 overflow-hidden text-white">
      <DarkBackdrop />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-16">
        {/* Partner logo lockup — equal-width columns with a thin orange divider, matching SlideThankYou */}
        <div className="flex items-center w-full max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-[88px] w-px origin-center mx-8 shrink-0"
            style={{ background: 'linear-gradient(180deg, transparent, var(--color-orange), transparent)' }}
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
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

        {/* "Revenue Intelligence" headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 font-serif text-[64px] leading-[1.0] text-center"
        >
          Revenue Intelligence
          <span className="text-[var(--color-orange)]">.</span>
        </motion.h1>

        {/* Lets Get Started button */}
        <motion.button
          type="button"
          onClick={onStart}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04, backgroundColor: 'rgba(250,168,64,1)', color: '#0A0F1A' }}
          whileTap={{ scale: 0.97 }}
          className="mt-12 inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[var(--color-orange)] text-[var(--color-orange)] text-[12px] uppercase tracking-[0.36em] font-semibold cursor-pointer focus:outline-none"
          style={{ background: 'rgba(250,168,64,0.06)' }}
        >
          <span>Lets Get Started</span>
          <span aria-hidden="true">→</span>
        </motion.button>
      </div>
    </div>
  )
}
