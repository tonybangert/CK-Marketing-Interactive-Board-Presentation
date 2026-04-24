import { motion, AnimatePresence } from 'framer-motion'
import { deck } from '../data.js'
import { CreamBackdrop } from '../components/AmbientBackdrop.jsx'

// Step choreography (only 2 clicks total):
// 0 (on load): Concord enters from left, Clayton Kendall from right, orange rule between
// 1 (click): MERGER SEQUENCE - logos arc toward center with slight rotation, collide in a
//            white flash + two-color radial shockwave, merged CK logo crystallizes,
//            then tagline + attribution + begin prompt cascade in automatically

export default function Slide0({ step }) {
  const merging = step >= 1

  return (
    <div className="absolute inset-0 overflow-hidden">
      <CreamBackdrop tone="cream-soft" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[var(--color-muted)]"
        >
          Board Briefing · {deck.deliveryDate}
        </motion.div>

        {/* Logo stage: fixed height zone so the choreography has a stable center */}
        <div className="relative w-full flex items-center justify-center" style={{ height: 320 }}>

          {/* Concord: enters from far left, then arcs to center */}
          <motion.img
            src="/concord.png"
            alt="Concord Marketing Solutions"
            initial={{
              opacity: 0,
              x: -420,
              rotate: -3,
              scale: 0.85,
              filter: 'blur(12px)'
            }}
            animate={merging ? {
              opacity: 0,
              x: 0,
              y: 0,
              rotate: 8,
              scale: 0.5,
              filter: 'blur(6px)',
              transition: {
                opacity: { duration: 0.55, delay: 0.6, ease: [0.6, 0, 0.2, 1] },
                x: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
                rotate: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
                scale: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
                filter: { duration: 0.55, delay: 0.6 }
              }
            } : {
              opacity: 1,
              x: -200,
              rotate: 0,
              scale: 1,
              filter: 'blur(0px)',
              transition: {
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
            className="absolute"
            style={{ maxHeight: 140, maxWidth: 360 }}
          />

          {/* Clayton Kendall: enters from far right, then arcs to center */}
          <motion.img
            src="/clayton-kendall.png"
            alt="Clayton Kendall"
            initial={{
              opacity: 0,
              x: 420,
              rotate: 3,
              scale: 0.85,
              filter: 'blur(12px)'
            }}
            animate={merging ? {
              opacity: 0,
              x: 0,
              y: 0,
              rotate: -8,
              scale: 0.5,
              filter: 'blur(6px)',
              transition: {
                opacity: { duration: 0.55, delay: 0.6, ease: [0.6, 0, 0.2, 1] },
                x: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
                rotate: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
                scale: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
                filter: { duration: 0.55, delay: 0.6 }
              }
            } : {
              opacity: 1,
              x: 200,
              rotate: 0,
              scale: 1,
              filter: 'blur(0px)',
              transition: {
                duration: 1.1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
            className="absolute"
            style={{ maxHeight: 140, maxWidth: 360 }}
          />

          {/* Orange connecting rule between the two parent logos */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={merging ? {
              opacity: 0,
              scaleY: 0,
              transition: { duration: 0.4 }
            } : {
              opacity: 1,
              scaleY: 1,
              transition: { duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
            className="absolute w-px origin-center"
            style={{ background: 'var(--color-orange)', height: 130 }}
          />

          {/* COLLISION: bright white flash at the exact moment of merge */}
          <AnimatePresence>
            {merging && (
              <motion.div
                key="flash"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.4, 2.2]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.3, 1]
                }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 260,
                  height: 260,
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, transparent 70%)',
                  filter: 'blur(2px)'
                }}
              />
            )}
          </AnimatePresence>

          {/* SHOCKWAVE 1: Concord navy radiating outward */}
          <AnimatePresence>
            {merging && (
              <motion.div
                key="shock-concord"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: [0, 0.7, 0], scale: [0.2, 2.8, 3.4] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, delay: 1.15, ease: [0.2, 0.8, 0.25, 1] }}
                className="absolute rounded-full pointer-events-none border-[3px]"
                style={{
                  width: 200,
                  height: 200,
                  borderColor: 'var(--color-concord)'
                }}
              />
            )}
          </AnimatePresence>

          {/* SHOCKWAVE 2: CK green radiating outward (slightly staggered) */}
          <AnimatePresence>
            {merging && (
              <motion.div
                key="shock-green"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: [0, 0.7, 0], scale: [0.2, 2.5, 3.1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, delay: 1.22, ease: [0.2, 0.8, 0.25, 1] }}
                className="absolute rounded-full pointer-events-none border-[3px]"
                style={{
                  width: 200,
                  height: 200,
                  borderColor: 'var(--color-ck-green)'
                }}
              />
            )}
          </AnimatePresence>

          {/* SHOCKWAVE 3: orange accent (the merger's signal color) */}
          <AnimatePresence>
            {merging && (
              <motion.div
                key="shock-orange"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: [0, 0.55, 0], scale: [0.2, 3.2, 3.8] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, delay: 1.3, ease: [0.2, 0.8, 0.25, 1] }}
                className="absolute rounded-full pointer-events-none border-2"
                style={{
                  width: 200,
                  height: 200,
                  borderColor: 'var(--color-orange)'
                }}
              />
            )}
          </AnimatePresence>

          {/* Particle burst: small dots flying outward on merge */}
          <AnimatePresence>
            {merging && [...Array(16)].map((_, i) => {
              const angle = (i / 16) * Math.PI * 2
              const distance = 240 + Math.random() * 60
              const color = i % 3 === 0 ? 'var(--color-concord)'
                          : i % 3 === 1 ? 'var(--color-ck-green)'
                          : 'var(--color-orange)'
              return (
                <motion.div
                  key={`particle-${i}`}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    scale: [0, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.3,
                    delay: 1.18 + (i % 4) * 0.04,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 6,
                    height: 6,
                    background: color
                  }}
                />
              )
            })}
          </AnimatePresence>

          {/* Persistent ambient halo behind the merged logo */}
          <AnimatePresence>
            {merging && (
              <motion.div
                key="halo"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.8, 0.6], scale: [0.6, 1.15, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 560,
                  height: 560,
                  background: 'radial-gradient(ellipse at center, rgba(30,38,114,0.12) 0%, rgba(34,95,76,0.1) 35%, rgba(250,168,64,0.06) 60%, transparent 80%)'
                }}
              />
            )}
          </AnimatePresence>

          {/* THE MERGED CK LOGO: appears at the collision moment */}
          <AnimatePresence>
            {merging && (
              <motion.img
                key="ck-merged"
                src="/ck-logo.png"
                alt="CK Marketing"
                initial={{ opacity: 0, scale: 0.2, filter: 'blur(24px)', rotateY: 60 }}
                animate={{
                  opacity: [0, 1, 1, 1],
                  scale: [0.2, 1.25, 1, 1],
                  filter: ['blur(24px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
                  rotateY: [60, 0, 0, 0],
                  transition: {
                    duration: 1.3,
                    delay: 1.15,
                    times: [0, 0.35, 0.75, 1],
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
                className="relative z-10"
                style={{ maxHeight: 200, maxWidth: 480 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Tagline + attribution: auto-cascade after the merge settles (no clicks) */}
        <div className="mt-6 text-center min-h-[160px] flex flex-col items-center justify-start">
          <AnimatePresence>
            {merging && (
              <motion.h1
                key="tagline"
                initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[58px] leading-[1.02] text-[var(--color-navy)]"
              >
                Two legacies.{' '}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.9 }}
                  className="italic"
                  style={{ color: 'var(--color-ck-green)' }}
                >
                  One
                </motion.span>{' '}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 3.2 }}
                  style={{ color: 'var(--color-concord)' }}
                >
                  company.
                </motion.span>
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {merging && (
              <motion.div
                key="attribution"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 3.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 flex flex-col items-center gap-3"
              >
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-[var(--color-muted)]">
                  <span>PerformanceLabs.AI</span>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="text-[var(--color-orange)] inline-block"
                  >
                    ×
                  </motion.span>
                  <span>Aplora.AI</span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: [0, 6, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: 4.2 },
                    x: { duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 4.5 }
                  }}
                  className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-orange)] font-semibold mt-3"
                >
                  Press → to begin
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
