import { AnimatePresence, motion } from 'framer-motion'
import Slide0 from './slides/Slide0.jsx'
import Slide1 from './slides/Slide1.jsx'
import Slide2 from './slides/Slide2.jsx'
import Slide3 from './slides/Slide3.jsx'
import Slide4 from './slides/Slide4.jsx'
import Slide5 from './slides/Slide5.jsx'
import DeckFooter from './components/DeckFooter.jsx'
import HUD from './components/HUD.jsx'
import DataSpineChrome from './components/DataSpineChrome.jsx'
import { useDeckState } from './hooks/useDeckState.js'
import { deck } from './data.js'

const SLIDES = [
  { id: 0, label: 'Two legacies, one company', component: Slide0, steps: 1, hideFooter: true, hideSpine: true },
  { id: 1, label: 'How we did it',              component: Slide1, steps: 5, showSpine: true },
  { id: 2, label: 'What it told us',            component: Slide2, steps: 6 },
  { id: 3, label: 'How we make it actionable',  component: Slide3, steps: 6 },
  { id: 4, label: 'What comes next',            component: Slide4, steps: 6 },
  { id: 5, label: 'Thank you',                  component: Slide5, steps: 1, hideFooter: true, hideSpine: true }
]

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
    scale: 0.98,
    filter: 'blur(10px)'
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)'
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    scale: 0.98,
    filter: 'blur(10px)'
  })
}

export default function App() {
  const { slideIndex, step, direction, next, prev, jumpSlide, restartSlide, fillSlide } = useDeckState(SLIDES)
  const Current = SLIDES[slideIndex].component
  const section = SLIDES[slideIndex].label

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-6 relative">
      {/* Global ambient page backdrop */}
      <div className="fixed inset-0 bg-[#05101F]" />
      <div
        className="fixed inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(250,168,64,0.08), transparent 60%)'
        }}
      />

      <div className="slide-stage relative shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden rounded-sm">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Current step={step} />
            {!SLIDES[slideIndex].hideFooter && (
              <DeckFooter
                authors={deck.authors}
                section={section}
                page={slideIndex}
                total={SLIDES.length - 1}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* DataSpine chrome: only appears on Slide 1, which is "how the data comes together".
            It's the proof for that slide's arc; subsequent slides use the canvas fully. */}
        <DataSpineChrome
          visible={!!SLIDES[slideIndex].showSpine}
          introPlayed={!!SLIDES[slideIndex].showSpine}
        />
      </div>

      <HUD
        slides={SLIDES}
        slideIndex={slideIndex}
        step={step}
        onNext={next}
        onPrev={prev}
        onRestart={restartSlide}
        onFill={fillSlide}
        onJump={jumpSlide}
      />
    </div>
  )
}
