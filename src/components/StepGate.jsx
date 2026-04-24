import { AnimatePresence, motion } from 'framer-motion'

// Reveals children when `step >= show`. Exits cleanly if presenter retreats.
// Supports stagger by accepting a `delay` prop.
export default function StepGate({ show, step, delay = 0, children, className = '', variant = 'up', as = 'div' }) {
  const visible = step >= show

  const variants = {
    up: {
      hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
      visible: { opacity: 1, scale: 1, filter: 'blur(0px)' }
    },
    slideLeft: {
      hidden: { opacity: 0, x: -32 },
      visible: { opacity: 1, x: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: 32 },
      visible: { opacity: 1, x: 0 }
    },
    drawX: {
      hidden: { opacity: 0, scaleX: 0 },
      visible: { opacity: 1, scaleX: 1 }
    }
  }

  const MotionComp = motion[as] || motion.div

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <MotionComp
          key={`gate-${show}`}
          className={className}
          variants={variants[variant]}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay
          }}
          style={variant === 'drawX' ? { transformOrigin: 'left' } : undefined}
        >
          {children}
        </MotionComp>
      )}
    </AnimatePresence>
  )
}
