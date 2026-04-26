// Single source of truth for every data anchor in the deck.
// Board-ready discipline: anchor stats only earn their place when they reinforce strategy.

export const deck = {
  client: 'CK Marketing',
  clientLong: 'Clayton Kendall + Concord Marketing, post-merger',
  authors: 'PerformanceLabs.AI × Aplora',
  deliveryDate: '4. 27. 26',
  audience: 'The Board of Directors',
  quarter: 'Q2 2026',
  revenueTarget: '$97.1M',
  revenueTargetLong: '$97,114,598',
  activePipeline: '$7.1M',
  activeDeals: 96,
  contactsUnified: '65K'
}

// Two motions, kept lean. Calendar reads `peaks`. Slide 1 reads `cycleDays` + `label` for proof.
// Other former motion fields (avgDeal, deals, volume, lift, liftBase, legacy) intentionally removed -
// no slide references them in the board-cut deck.
export const motions = {
  store: {
    key: 'store',
    label: 'Corporate Store',
    cycleDays: 203,
    peaks: ['Jan', 'Apr', 'Oct']
  },
  transactional: {
    key: 'transactional',
    label: 'Multi-Location',
    cycleDays: 80,
    peaks: ['Mar', 'May', 'Aug', 'Oct']
  }
}

// Slide 2 - sample-style narrative findings. No metrics in card bodies.
export const findings3 = [
  {
    id: '01',
    title: 'Two sales motions, one blended forecast.',
    body: 'Clayton Kendall + Concord Marketing run two fundamentally different sales motions, but operate under one blended forecast that obscures both.'
  },
  {
    id: '02',
    title: 'Efficiency hides behind deal size.',
    body: 'A small number of industries deliver outsized results when scored on efficiency, not just deal size.'
  },
  {
    id: '03',
    title: 'Buying rhythms are predictable.',
    body: "Customers buy on predictable rhythms. CK's outreach cadence isn't aligned to them."
  }
]

// Slide 3 - three operational shifts. FROM is current state (struck through), TO is the change.
export const shifts = [
  {
    verb: 'SEPARATE',
    headline: 'Two motions, two scorecards.',
    from: 'One blended scorecard',
    to: 'Distinct scorecards so each motion is managed on its own terms.'
  },
  {
    verb: 'SCORE',
    headline: 'Composite over deal size.',
    from: 'Deal-size tiering',
    to: 'Composite scoring: win rate, cycle speed, rep efficiency, expansion potential.'
  },
  {
    verb: 'SEQUENCE',
    headline: 'Match the buying window.',
    from: 'Internal quarterly cadence',
    to: 'Outreach sequenced to customer buying windows.'
  }
]

// Slide 3 - rep + marketing detail revealed under the SEQUENCE row.
// Three short bullets per side, zero numbers - speaker fills in specifics verbally.
export const cadenceDetail = {
  reps: [
    'Store-cycle reps coached to multi-stakeholder patience.',
    'Multi-Location reps coached to volume cadence.',
    'Pursuit hours concentrated on top composite verticals.'
  ],
  marketing: [
    'QBRs fire 60-90 days ahead of each peak.',
    'Spend weighted to peak months.',
    'Cross-sell campaigns trigger on motion signals.'
  ]
}

// Beat 02 - tier table. Deal size alone is one dimension; win rate + cycle days
// reveal the multi-dimensional picture. The 120-day cutoff in `cycleDays` is the
// board's punchline: cycles past 120 days don't book in the current year.
export const dealTiers = [
  { id: 'T1', sizeLabel: '$1.2M', size: 1200, winRate: 18, cycleDays: 240, label: 'Mid-market enterprise' },
  { id: 'T2', sizeLabel: '$680K', size: 680,  winRate: 32, cycleDays: 180, label: 'Enterprise renewal' },
  { id: 'T3', sizeLabel: '$340K', size: 340,  winRate: 54, cycleDays: 140, label: 'Strategic expansion' },
  { id: 'T4', sizeLabel: '$140K', size: 140,  winRate: 71, cycleDays: 95,  label: 'Multi-loc growth' },
  { id: 'T5', sizeLabel: '$48K',  size: 48,   winRate: 86, cycleDays: 60,  label: 'High-velocity' }
]
export const CYCLE_CUTOFF_DAYS = 120

// Slide 4 - two-card roadmap (sample's framing).
export const roadmap = [
  {
    label: 'Market Intelligence',
    question: 'Where should we fish?',
    body: 'The AI identifies which industries, segments, and named accounts CK should pursue based on actual win patterns across the combined data.'
  },
  {
    label: 'Rep Specialization',
    question: 'Who should fish where?',
    body: 'The AI matches individual rep strengths to verticals where they close fastest, shortening deal cycles across the org.'
  }
]

// Slide 1 - 3-step architecture flow (sample replaces 4-step Connect/Vectorize/Interrogate/Deliver).
export const architectureFlow = [
  { n: '01', verb: 'CONNECT', title: 'Ingestion', body: 'Three revenue systems wired into one pipeline.' },
  { n: '02', verb: 'UNIFY', title: 'One record per entity', body: 'Every account, contact, and deal becomes one computable object.' },
  { n: '03', verb: 'ANALYZE', title: 'Continuous intelligence', body: 'AI detects patterns across every domain, always on, always learning.' }
]

// Slide 1 - three revenue systems converging into "One Source of Truth".
export const sources = [
  { name: 'HubSpot', detail: 'Pipeline & activity' },
  { name: 'Finance', detail: 'Budget, forecast, actuals' },
  { name: 'Sales Data', detail: 'Historical orders & accounts' }
]

export const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
