import { motion } from 'framer-motion'

export default function DeckFooter({ authors, section, page, total }) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 px-10 pb-3 z-20"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="h-px mb-2 origin-left"
        style={{ background: 'currentColor', opacity: 0.25 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-medium">
        <span>{authors}</span>
        <span>{section}</span>
        <span>{String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
    </motion.div>
  )
}
