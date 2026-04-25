import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Trash2, Minimize2, Send, Sparkles } from 'lucide-react'
import Typewriter from './Typewriter.jsx'

const QUESTION_1 = 'How much revenue do we generate during our peak share of wallet months?'
const QUESTION_2 = 'Which 3 accounts need attention right now?'

const RESPONSE_1_SEGMENTS = [
  'Good. I have monthly revenue data across your top 15 accounts, which span both CK Multi-location and CMS Corporate. ',
  { text: 'Peak revenue months are June, August, September, and October. ', bold: true, color: '#0B1A38' },
  'June and October are the clearest high-water marks.'
]

const RESPONSE_2_SEGMENTS = [
  'Three accounts trigger right now, each for a different reason:\n\n',
  { text: '1. Herc Rentals', bold: true, color: '#0B1A38' },
  ' · Store · August peak of $755K historically. QBR timing is critical. Fire the window now or miss the season.\n\n',
  { text: '2. Country Financial', bold: true, color: '#0B1A38' },
  ' · Store · silently declining. Pacing at 17.7% YoY below trend. Recommend executive intervention this month.\n\n',
  { text: '3. Wetzels', bold: true, color: '#0B1A38' },
  ' · Multi-Location · historical trough in June. Marketing and rep activity in May lifts share of wallet through the dip.'
]

export default function ExecutiveAdvisorChat({ revealed, typing }) {
  const [phase, setPhase] = useState(0)
  // 0: nothing. 1: Q1 visible, thinking dots.
  // 2: Q1 + R1 typing. 3: Q1 + R1 done.
  // 4: Q2 visible, thinking. 5: Q2 + R2 typing.

  useEffect(() => {
    if (!typing) { setPhase(0); return }
    const timers = []
    timers.push(setTimeout(() => setPhase(1), 200))   // Q1
    timers.push(setTimeout(() => setPhase(2), 1100))  // R1 typing
    timers.push(setTimeout(() => setPhase(3), 4500))  // R1 done
    timers.push(setTimeout(() => setPhase(4), 5200))  // Q2
    timers.push(setTimeout(() => setPhase(5), 6100))  // R2 typing
    return () => timers.forEach(clearTimeout)
  }, [typing])

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={revealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.97 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="h-full rounded-sm overflow-hidden border border-white/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#E6EAF0] bg-white">
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-sm flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1E9FFF, #3FA9F5)' }}
          >
            <Bot size={12} color="white" strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#0B1A38] leading-none">Executive Advisor</div>
            <div className="flex items-center gap-1 mt-1">
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-[#22C55E]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="text-[8px] uppercase tracking-[0.2em] text-[#22C55E] font-semibold">Ready</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#5A6B7D]">
          <Trash2 size={12} />
          <Minimize2 size={12} />
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 p-4 bg-[#F6F9FC] overflow-hidden flex flex-col gap-3">
        {/* Q1 */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              key="q1"
              initial={{ opacity: 0, x: 24, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-end gap-2"
            >
              <div
                className="max-w-[75%] rounded-[10px] rounded-br-sm px-3.5 py-2.5 text-[12px] text-white shadow-sm"
                style={{ background: '#1E9FFF' }}
              >
                {QUESTION_1}
              </div>
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center shrink-0"
                style={{ background: '#EFF7FF', border: '1px solid #D6E8FA' }}
              >
                <span className="text-[11px] font-bold text-[#1E9FFF]">T</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* R1 */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              key="r1"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-2 items-start"
            >
              <div
                className="h-7 w-7 rounded-sm flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #1E9FFF, #3FA9F5)' }}
              >
                <Bot size={13} color="white" strokeWidth={2.2} />
              </div>
              <div className="max-w-[85%] rounded-[10px] rounded-bl-sm px-3.5 py-2.5 bg-white border border-[#E6EAF0] text-[12px] text-[#0B1A38] leading-[1.55] shadow-sm">
                {phase >= 2 ? (
                  <Typewriter segments={RESPONSE_1_SEGMENTS} active speedMs={14} />
                ) : (
                  <ThinkingDots />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Q2 */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              key="q2"
              initial={{ opacity: 0, x: 24, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-end gap-2 mt-2"
            >
              <div
                className="max-w-[75%] rounded-[10px] rounded-br-sm px-3.5 py-2.5 text-[12px] text-white shadow-sm"
                style={{ background: '#1E9FFF' }}
              >
                {QUESTION_2}
              </div>
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center shrink-0"
                style={{ background: '#EFF7FF', border: '1px solid #D6E8FA' }}
              >
                <span className="text-[11px] font-bold text-[#1E9FFF]">T</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* R2 */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              key="r2"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-2 items-start"
            >
              <div
                className="h-7 w-7 rounded-sm flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #1E9FFF, #3FA9F5)' }}
              >
                <Bot size={13} color="white" strokeWidth={2.2} />
              </div>
              <div className="max-w-[85%] rounded-[10px] rounded-bl-sm px-3.5 py-2.5 bg-white border border-[#E6EAF0] text-[12px] text-[#0B1A38] leading-[1.55] shadow-sm whitespace-pre-line">
                {phase >= 5 ? (
                  <Typewriter segments={RESPONSE_2_SEGMENTS} active speedMs={9} />
                ) : (
                  <ThinkingDots />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input + Powered by Claude badge */}
      <div className="px-3 py-2.5 border-t border-[#E6EAF0] bg-white flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center gap-2 px-2 py-1 bg-[#F6F9FC] border border-[#E6EAF0] rounded-sm">
          <div className="text-[10px] text-[#8A96A6]">Ask your advisor...</div>
        </div>
        <div className="h-6 w-6 rounded-sm flex items-center justify-center" style={{ background: '#1E9FFF' }}>
          <Send size={11} color="white" strokeWidth={2.2} />
        </div>
        <div className="flex items-center gap-1 text-[#C17A5A]">
          <Sparkles size={10} strokeWidth={2} />
          <span className="text-[8px] uppercase tracking-[0.15em] font-semibold">Claude</span>
        </div>
      </div>
    </motion.div>
  )
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#1E9FFF]"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
