import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw, FastForward, HelpCircle, X } from 'lucide-react'

export default function HUD({ slides, slideIndex, step, onNext, onPrev, onRestart, onFill, onJump }) {
  const [helpOpen, setHelpOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '?') setHelpOpen((o) => !o)
      if (e.key === 'Escape') setHelpOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const currentSteps = slides[slideIndex].steps

  return (
    <>
      {/* Slide dots at top */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {slides.map((s, i) => {
          const active = i === slideIndex
          return (
            <button
              key={s.id}
              onClick={() => onJump(i)}
              className="group flex items-center gap-1.5"
              title={s.label}
            >
              <motion.span
                className="block rounded-full"
                animate={{
                  width: active ? 28 : 6,
                  height: 6,
                  backgroundColor: active ? '#FAA840' : 'rgba(255,255,255,0.35)'
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
          )
        })}
      </div>

      {/* Step dots + controls bottom-right */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
          {Array.from({ length: currentSteps + 1 }, (_, i) => {
            const active = i === step
            return (
              <motion.span
                key={i}
                className="block rounded-full"
                animate={{
                  width: active ? 18 : 5,
                  height: 5,
                  backgroundColor: i <= step ? '#FAA840' : 'rgba(255,255,255,0.25)'
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )
          })}
        </div>

        <div className="flex items-center gap-1 px-2 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
          <HudButton onClick={onPrev} title="Previous (←)"><ChevronLeft size={16} /></HudButton>
          <HudButton onClick={onRestart} title="Restart slide (R)"><RotateCcw size={14} /></HudButton>
          <HudButton onClick={onFill} title="Fill slide (F)"><FastForward size={14} /></HudButton>
          <HudButton onClick={onNext} title="Next (→ / space)"><ChevronRight size={16} /></HudButton>
          <HudButton onClick={() => setHelpOpen(true)} title="Keyboard help (?)"><HelpCircle size={14} /></HudButton>
        </div>
      </div>

      <AnimatePresence>
        {helpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center"
            onClick={() => setHelpOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[var(--color-navy)] border border-white/10 rounded-sm p-8 min-w-[420px] text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-serif text-[24px]">Presenter Controls</div>
                <button onClick={() => setHelpOpen(false)} className="text-white/60 hover:text-white"><X size={18} /></button>
              </div>
              <div className="space-y-2 text-[13px]">
                {[
                  ['→ · Space · Enter', 'Next build / next slide'],
                  ['← · Backspace', 'Previous build / previous slide'],
                  ['1-5', 'Jump directly to slide'],
                  ['Home · End', 'First / last slide'],
                  ['R', 'Restart current slide'],
                  ['F', 'Fill (reveal all builds)'],
                  ['?', 'Toggle this help']
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-1.5 border-b border-white/5">
                    <kbd className="text-[var(--color-orange)] font-mono text-[12px]">{k}</kbd>
                    <span className="text-white/70">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function HudButton({ children, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-[var(--color-orange)] hover:bg-white/5 transition-colors"
    >
      {children}
    </button>
  )
}
