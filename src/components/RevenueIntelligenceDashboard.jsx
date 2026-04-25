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
        <div className="text-[9px] text-[#5A6B7D] font-semibold">Kevin</div>
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
        className="relative px-6 py-5 text-white overflow-hidden"
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
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#7BB8F0] font-semibold">
              Good afternoon
            </div>
            <div className="font-bold text-[36px] leading-none mt-2 tracking-tight">
              Hello, Kevin.
            </div>
            <div className="text-[13px] text-white/65 mt-2 max-w-[360px]">
              Here's what your HubSpot data is telling you about your best customers
            </div>
            <div className="mt-4 flex items-baseline gap-2 text-[14px]">
              <TrendingUp size={14} color="#22C55E" strokeWidth={2.5} />
              <span className="font-bold text-[#22C55E] text-[18px]">
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
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/8 border border-white/15 rounded-sm backdrop-blur-sm">
            <Calendar size={12} color="rgba(255,255,255,0.7)" strokeWidth={2} />
            <span className="text-[11px] text-white/80 font-medium">Friday, April 24, 2026</span>
          </div>
        </div>
      </div>

      {/* Body: Pipeline by stage + Monthly trend */}
      <div className="grid grid-cols-2 gap-0 bg-[#F8FAFC] border-t border-[#E6EAF0]">
        <PipelineByStage revealed={revealed} />
        <MonthlyTrend revealed={revealed} />
      </div>
    </motion.div>
  )
}

const STAGES = [
  { name: 'Discovery', count: 38, color: '#94A3B8' },
  { name: 'Demo', count: 24, color: '#60A5FA' },
  { name: 'Proposal', count: 18, color: '#3B82F6' },
  { name: 'Negotiation', count: 11, color: '#1E40AF' },
  { name: 'Won', count: 5, color: '#22C55E' }
]

function PipelineByStage({ revealed }) {
  const total = STAGES.reduce((s, x) => s + x.count, 0)
  return (
    <div className="px-5 py-4 border-r border-[#E6EAF0]">
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[#5A6B7D] font-semibold">Pipeline by stage</div>
        <div className="text-[10px] text-[#5A6B7D]">{total} deals</div>
      </div>

      <div className="flex h-3 rounded-sm overflow-hidden bg-[#E6EAF0]">
        {STAGES.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ width: 0 }}
            animate={revealed ? { width: `${(s.count / total) * 100}%` } : { width: 0 }}
            transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: s.color }}
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-5 gap-1">
        {STAGES.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0 }}
            animate={revealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
          >
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ background: s.color }} />
              <span className="text-[8px] uppercase tracking-wider text-[#5A6B7D] font-semibold truncate">{s.name}</span>
            </div>
            <div className="text-[14px] font-bold text-[#0B1A38] mt-0.5 leading-none">{s.count}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const TREND = [320, 280, 410, 460, 520, 380, 260, 410, 540, 720, 590, 480]
const MONTH_LABELS = ['J','F','M','A','M','J','J','A','S','O','N','D']

function MonthlyTrend({ revealed }) {
  const max = Math.max(...TREND)
  const min = Math.min(...TREND)
  const W = 320
  const H = 80
  const pad = 4
  const stepX = (W - pad * 2) / (TREND.length - 1)
  const points = TREND.map((v, i) => {
    const x = pad + i * stepX
    const y = pad + (1 - (v - min) / (max - min)) * (H - pad * 2)
    return { x, y, v }
  })
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const fillPath = `${linePath} L ${points[points.length - 1].x} ${H - pad} L ${points[0].x} ${H - pad} Z`

  return (
    <div className="px-5 py-4">
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[#5A6B7D] font-semibold">Monthly revenue · trailing 12</div>
        <div className="text-[10px] text-[#22C55E] font-semibold">+18% YoY</div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }}>
        <defs>
          <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1E9FFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1E9FFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={fillPath}
          fill="url(#trend-fill)"
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="#1E9FFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={revealed ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {points.map((p, i) => {
          const isPeak = i === 9 || i === 0 || i === 3
          if (!isPeak) return null
          return (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3}
              fill="#1E9FFF"
              initial={{ scale: 0, opacity: 0 }}
              animate={revealed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: 1.4 + i * 0.05 }}
            />
          )
        })}
      </svg>

      <div className="mt-1 grid grid-cols-12 text-[8px] uppercase tracking-wider text-[#94A3B8] font-semibold text-center">
        {MONTH_LABELS.map((m, i) => (
          <div key={i} className={i === 9 || i === 0 || i === 3 ? 'text-[#1E9FFF] font-bold' : ''}>{m}</div>
        ))}
      </div>
    </div>
  )
}

