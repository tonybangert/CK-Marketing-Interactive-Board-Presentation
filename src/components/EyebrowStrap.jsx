import { motion } from 'framer-motion'

// Top-of-slide strap matching the sample deck:
//   ● LABEL                                      CRUMB
// ─────────────────────────────────────────────────────
// Dot is brand orange. Both sides use small, wide-tracked uppercase.
// Used by Slides 1-4. Slide 0 (cover) and Slide 5 (closer) use bespoke headers.
export default function EyebrowStrap({ label, crumb, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-0 right-0 px-12 pt-8"
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/60">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-orange)]" />
          <span>{label}</span>
        </div>
        {crumb && <span>{crumb}</span>}
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 h-px origin-left bg-white/15"
      />
    </motion.div>
  )
}
