import { motion } from 'framer-motion'
import { deck } from '../data.js'
import { DarkBackdrop } from '../components/AmbientBackdrop.jsx'

// Single-step cover. CK logo + "Clayton Kendall + Concord Marketing" sub,
// then "Revenue Intelligence." headline, sub-tagline, and prepared-for footer.
// All elements auto-cascade on slide entry.
export default function Slide0() {
  return (
    <div className="absolute inset-0 overflow-hidden text-white">
      <DarkBackdrop />

      {/* Top eyebrow strap */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 px-12 pt-8 z-20"
      >
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/55">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-orange)]" />
            <span>Board Update · {deck.quarter}</span>
          </div>
          <div>{deck.authors}</div>
        </div>
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-16">
        {/* CK logo with ambient halo */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.55, 0.45], scale: [0.6, 1.15, 1] }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute pointer-events-none"
            style={{
              width: 560,
              height: 560,
              background: 'radial-gradient(ellipse at center, rgba(250,168,64,0.16) 0%, rgba(46,128,102,0.10) 40%, rgba(43,53,160,0.06) 65%, transparent 80%)'
            }}
          />

          <motion.img
            src="/ck-logo.png"
            alt="CK Marketing"
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
            style={{ maxHeight: 200, maxWidth: 480 }}
          />
        </div>

        {/* "Clayton Kendall + Concord Marketing" sub-line directly under the logo */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-[12px] uppercase tracking-[0.42em] text-white/70 font-semibold"
        >
          Clayton Kendall <span className="text-[var(--color-orange)]">+</span> Concord Marketing
        </motion.div>

        {/* Headline — long-form board-update statement. Sized down from the original 88px
            two-word headline so it can wrap to ~3 lines without crowding the logo above
            or the prepared-for footer below. Orange italic on "Revenue Operations" is the
            same emphasis pattern used in SlideThankYou's "compounding year" lockup. */}
        <div className="mt-10 text-center max-w-[1000px]">
          <motion.h1
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[52px] leading-[1.08] text-balance"
          >
            What Our AI Told Us About Your{' '}
            <span className="italic text-[var(--color-orange)]">Revenue Operations</span>{' '}
            in Under 8 Weeks<span className="text-[var(--color-orange)]">.</span>
          </motion.h1>
        </div>
      </div>

      {/* Bottom: prepared-for + delivery date */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 px-12 pb-10"
      >
        <div className="h-px w-full bg-white/10 mb-5" />
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-white/45">Prepared for</div>
            <div className="text-[15px] text-white mt-1">{deck.audience}</div>
          </div>
          <div className="text-[14px] text-white/70 tracking-[0.18em]">{deck.deliveryDate}</div>
        </div>
      </motion.div>
    </div>
  )
}
