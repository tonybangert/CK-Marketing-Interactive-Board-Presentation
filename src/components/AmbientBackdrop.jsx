import { motion } from 'framer-motion'

// Slow-breathing radial gradient for navy slides. Never distracting; always alive.
export function NavyBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-[var(--color-navy)]" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 0%, rgba(250,168,64,0.18), transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(239,69,55,0.12), transparent 50%)'
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.05), transparent 40%)'
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  )
}

// Dark backdrop for board-update slides. Near-black with restrained orange spotlight,
// matching the sample deck's aesthetic family. Used by Slides 0, 2, 3, 5.
export function DarkBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-[var(--color-deck-dark)]" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 12% 0%, rgba(250,168,64,0.08), transparent 55%), radial-gradient(ellipse at 88% 100%, rgba(30,38,114,0.10), transparent 55%)'
        }}
        animate={{ opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />
    </>
  )
}

// Cream backdrop for light slides. Subtle animated accent rule sweeps across top.
export function CreamBackdrop({ tone = 'cream-soft' }) {
  const bg = tone === 'cream' ? 'var(--color-cream)' : 'var(--color-cream-soft)'
  return (
    <>
      <div className="absolute inset-0" style={{ background: bg }} />
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-orange), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #102D50 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
    </>
  )
}
