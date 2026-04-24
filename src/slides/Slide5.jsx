import { motion } from 'framer-motion'
import { NavyBackdrop } from '../components/AmbientBackdrop.jsx'

// Closing choreography (all auto-cascades after entry; 1 optional click for mic drop):
// 0 (on load): "Thank you" title reveals with letter stagger
//              1.4s later: partner logos fly in from edges + halo pulses
//              2.6s later: partner names appear below logos
//              3.4s later: "To a compounding year." closing line
//              4.2s later: client footer line with animated rule
// 1 (click): mic-drop moment - title swells, orange particle burst radiates

const PL_ORANGE = '#F47A2D'
const APLORA_BLUE = '#1E9FFF'

const TITLE = 'Thank you.'

export default function Slide5({ step }) {
  const micDrop = step >= 1

  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <NavyBackdrop />

      {/* Slow rotating conic spotlight with orange + blue (partnership color DNA) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%,
            rgba(244,122,45,0.10) 0deg,
            transparent 90deg,
            rgba(30,159,255,0.10) 180deg,
            transparent 270deg,
            rgba(244,122,45,0.10) 360deg)`
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Secondary soft glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(250,168,64,0.08) 0%, transparent 60%)'
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-16">
        {/* THANK YOU title - letter-by-letter serif reveal */}
        <motion.h1
          className="font-serif text-[128px] leading-[0.95] text-center"
          animate={micDrop ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {TITLE.split('').map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              initial={{ opacity: 0, y: 40, scale: 0.7, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 0.9,
                delay: 0.2 + i * 0.06,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Gradient rule under title */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-[2px] w-[280px] origin-center rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${PL_ORANGE}, #FAA840, ${APLORA_BLUE}, transparent)`
          }}
        />

        {/* Partner logo stage */}
        <div className="mt-10 relative flex items-center justify-center" style={{ minHeight: 180 }}>

          {/* PerformanceLabs halo pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 0.65, 0.35],
              scale: [0.6, 1.15, 1]
            }}
            transition={{ duration: 1.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 260,
              height: 260,
              left: 'calc(50% - 280px)',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${PL_ORANGE}33 0%, transparent 70%)`
            }}
          />

          {/* Aplora halo pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 0.65, 0.35],
              scale: [0.6, 1.15, 1]
            }}
            transition={{ duration: 1.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 260,
              height: 260,
              left: 'calc(50% + 280px)',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${APLORA_BLUE}33 0%, transparent 70%)`
            }}
          />

          {/* PerformanceLabs logo - flies in from left with counter-rotation */}
          <motion.div
            initial={{ opacity: 0, x: -240, rotate: -25, scale: 0.7, filter: 'blur(12px)' }}
            animate={{
              opacity: 1,
              x: -280,
              rotate: 0,
              scale: 1,
              filter: 'blur(0px)'
            }}
            transition={{ duration: 1.3, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute flex flex-col items-center"
            style={{ left: '50%', top: 0 }}
          >
            <motion.img
              src="/performancelabs.png"
              alt="PerformanceLabs.AI"
              animate={micDrop ? { rotate: [0, -8, 0], scale: [1, 1.08, 1] } : { rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 120, width: 'auto' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.6 }}
              className="mt-4 text-[13px] uppercase tracking-[0.35em] font-semibold"
              style={{ color: PL_ORANGE }}
            >
              PerformanceLabs.AI
            </motion.div>
          </motion.div>

          {/* Center gradient rule between the two logos */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.9, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-[100px] w-[2px] origin-center rounded-full"
            style={{
              background: `linear-gradient(180deg, transparent, ${PL_ORANGE}, ${APLORA_BLUE}, transparent)`
            }}
          />

          {/* Aplora logo - flies in from right with counter-rotation */}
          <motion.div
            initial={{ opacity: 0, x: 240, rotate: 25, scale: 0.7, filter: 'blur(12px)' }}
            animate={{
              opacity: 1,
              x: 280,
              rotate: 0,
              scale: 1,
              filter: 'blur(0px)'
            }}
            transition={{ duration: 1.3, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute flex flex-col items-center"
            style={{ left: '50%', top: 0 }}
          >
            <motion.img
              src="/aplora.png"
              alt="Aplora.AI"
              animate={micDrop ? { rotate: [0, 8, 0], scale: [1, 1.08, 1] } : { rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 120, width: 'auto' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.7 }}
              className="mt-4 text-[13px] uppercase tracking-[0.35em] font-semibold"
              style={{ color: APLORA_BLUE }}
            >
              Aplora.AI
            </motion.div>
          </motion.div>
        </div>

        {/* Closing line: "To a compounding year." */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 3.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 font-serif text-[28px] text-white/90 text-center"
        >
          To a{' '}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.8 }}
            className="italic"
            style={{ color: 'var(--color-ck-green-soft)' }}
          >
            compounding
          </motion.span>{' '}
          year.
        </motion.div>

        {/* Client footer line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 4.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <div className="text-[11px] uppercase tracking-[0.45em] text-white/55">
            Clayton Kendall + Concord · CK Marketing · 2026
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 4.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-[160px] origin-center rounded-full"
            style={{ background: 'var(--color-orange)' }}
          />
        </motion.div>

        {/* Mic drop particle burst (click 1) */}
        {micDrop && [...Array(24)].map((_, i) => {
          const angle = (i / 24) * Math.PI * 2
          const distance = 280 + Math.random() * 120
          const colors = [PL_ORANGE, APLORA_BLUE, '#FAA840', 'var(--color-ck-green)', 'var(--color-concord)']
          const color = colors[i % colors.length]
          return (
            <motion.div
              key={`mic-particle-${i}`}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: [0, 1.2, 0]
              }}
              transition={{
                duration: 1.5,
                delay: (i % 5) * 0.04,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 8,
                height: 8,
                top: '50%',
                left: '50%',
                background: color
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
