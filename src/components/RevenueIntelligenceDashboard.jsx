import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, TrendingUp, Calendar } from 'lucide-react'
import CountUp from './CountUp.jsx'

// Faithful recreation of the live Revenue Intelligence Dashboard product.
// Used as Slide 1's primary proof-of-work: board sees actual UI chrome, not a mock.

const TABS = [
  'Dashboard', 'Data Health', 'Intelligence', 'Insights',
  'Segmentation', 'ICP & Personas', 'Revenue', 'Performance', 'Team'
]

const CHIPS = ['Composite', 'Store', 'Transactional']

export default function RevenueIntelligenceDashboard({ revealed, cycleChips }) {
  const [activeChip, setActiveChip] = useState(0)

  useEffect(() => {
    if (!cycleChips) { setActiveChip(2); return }
    setActiveChip(0)
    const t1 = setTimeout(() => setActiveChip(1), 900)
    const t2 = setTimeout(() => setActiveChip(2), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [cycleChips])

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={revealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.97 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-sm overflow-hidden border border-white/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      {/* Top tab bar */}
      <div className="flex items-center gap-0 px-3 pt-2 pb-0 bg-white border-b border-[#E6EAF0]">
        {TABS.map((tab, i) => {
          const active = i === 0
          return (
            <div
              key={tab}
              className={`relative px-2.5 py-1.5 text-[9px] font-semibold tracking-wide flex items-center gap-1 ${
                active ? 'text-[#1E9FFF]' : 'text-[#5A6B7D]'
              }`}
            >
              {tab}
              {active && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#1E9FFF]"
                />
              )}
            </div>
          )
        })}
        <div className="flex-1" />
        <div className="text-[9px] text-[#5A6B7D] font-semibold">Tony</div>
      </div>

      {/* Sub-header row */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F6F9FC]">
        <div className="flex items-center gap-2">
          <div
            className="h-7 w-7 rounded-sm flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1E9FFF, #3FA9F5)' }}
          >
            <Activity size={14} color="white" strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-[12px] font-bold text-[#0B1A38]">Dashboard</div>
            <div className="text-[8px] text-[#5A6B7D] -mt-0.5">Performance Labs Revenue Intelligence</div>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white border border-[#E6EAF0] rounded-sm p-0.5">
          <span className="text-[8px] text-[#5A6B7D] uppercase tracking-widest px-2">Pipeline</span>
          {CHIPS.map((chip, i) => {
            const active = i === activeChip
            return (
              <div key={chip} className="relative">
                {active && (
                  <motion.div
                    layoutId="pipeline-chip"
                    className="absolute inset-0 bg-[#EFF7FF] rounded-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <div
                  className={`relative px-2.5 py-1 text-[9px] font-semibold ${
                    active ? 'text-[#1E9FFF]' : 'text-[#5A6B7D]'
                  }`}
                >
                  {chip}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hero card */}
      <div
        className="relative px-5 py-4 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B1A38 0%, #0F2449 100%)'
        }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(30,159,255,0.18), transparent 60%)'
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative flex items-start justify-between">
          <div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-[#7BB8F0] font-semibold">
              Good afternoon
            </div>
            <div className="font-bold text-[28px] leading-none mt-2 tracking-tight">
              Hello, Tony.
            </div>
            <div className="text-[11px] text-white/65 mt-1.5 max-w-[280px]">
              Here's what your HubSpot data is telling you about your best customers
            </div>
            <div className="mt-3 flex items-baseline gap-1.5 text-[12px]">
              <TrendingUp size={12} color="#22C55E" strokeWidth={2.5} />
              <span className="font-bold text-[#22C55E] text-[15px]">
                {revealed ? <CountUp value="$7.1M" duration={1.4} /> : '$7.1M'}
              </span>
              <span className="text-white/60">in pipeline across</span>
              <span className="font-bold text-white">
                {revealed ? <CountUp value="96" duration={1.2} /> : '96'}
              </span>
              <span className="text-white/60">active deals</span>
            </div>
          </div>

          {/* Date pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/8 border border-white/15 rounded-sm backdrop-blur-sm">
            <Calendar size={11} color="rgba(255,255,255,0.7)" strokeWidth={2} />
            <span className="text-[10px] text-white/80 font-medium">Friday, April 24, 2026</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
