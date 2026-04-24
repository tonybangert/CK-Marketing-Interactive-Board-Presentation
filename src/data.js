// Single source of truth for every data anchor in the deck.
// Pulled directly from README.md "Key Data Anchors" table.
// Change a number here -> every slide updates.

export const deck = {
  client: 'CK Marketing',
  clientLong: 'Clayton Kendall + Concord, post-merger',
  authors: 'PerformanceLabs.AI × Aplora.AI',
  deliveryDate: 'April 24, 2026',
  revenueTarget: '$97.1M',
  revenueTargetLong: '$97,114,598',
  activePipeline: '$7.1M',
  activeDeals: 96,
  contactsUnified: '65K',
  inactiveContacts: '38K',
  inactivePct: '58%'
}

export const motions = {
  store: {
    key: 'store',
    label: 'Corporate Store',
    legacy: 'Concord legacy',
    avgDeal: '$609K',
    cycleDays: 203,
    deals: 224,
    volume: '$148.4M',
    peaks: ['Jan', 'Apr', 'Oct'],
    lift: '+$376K',
    liftBase: '$148.4M base'
  },
  transactional: {
    key: 'transactional',
    label: 'Multi-Location',
    legacy: 'Clayton Kendall legacy',
    avgDeal: '$37K',
    cycleDays: 80,
    deals: 530,
    volume: '$22.8M',
    peaks: ['Mar', 'May', 'Aug', 'Oct'],
    lift: '+$18.2K',
    liftBase: '$22.8M base'
  },
  combinedLift: '+$394.2K'
}

export const verticals = {
  composite: ['Construction', 'Financial', 'Consumer'],
  store: ['Construction', 'Financial', 'Insurance'],
  transactional: ['Real Estate', 'Consumer', 'Construction'],
  pursuedCount: 41,
  anchors: [
    { name: 'Accounting', winRate: '57%', note: 'highest yield per pursuit-hour' },
    { name: 'Construction', winRate: '41.7%', note: '$14.4M volume' }
  ]
}

// Finding 03: monthly net swings (positive = peak contribution, negative = trough drag).
// Anchored to README: Jan +$1.22M, Apr +$353K, Oct +$1.12M explicit peaks.
// Intermediate months modeled to total to the 43-peak / 43-trough rhythm.
// Values in thousands of dollars (net swing vs. monthly average).
export const seasonality = [
  { month: 'Jan', net: 1220, label: '+$1.22M' },
  { month: 'Feb', net: -420, label: '-$420K' },
  { month: 'Mar', net: 180, label: '+$180K' },
  { month: 'Apr', net: 353, label: '+$353K' },
  { month: 'May', net: 640, label: '+$640K' },
  { month: 'Jun', net: -280, label: '-$280K' },
  { month: 'Jul', net: -510, label: '-$510K' },
  { month: 'Aug', net: 290, label: '+$290K' },
  { month: 'Sep', net: -180, label: '-$180K' },
  { month: 'Oct', net: 1120, label: '+$1.12M' },
  { month: 'Nov', net: -340, label: '-$340K' },
  { month: 'Dec', net: -610, label: '-$610K' }
]

export const seasonalityMeta = {
  peaks: 43,
  troughs: 43,
  mayCluster: { accounts: 7, spend: '$3.4M annual' }
}

export const findings = [
  {
    id: '01',
    title: 'Two motions. One combined advantage.',
    frame: 'One roof. Two economic engines. Full-spectrum buyer coverage.'
  },
  {
    id: '02',
    title: 'Composite scoring. Cross-sell unlocked.',
    frame: 'Top 3 verticals per pipeline across 41 pursued.'
  },
  {
    id: '03',
    title: 'Buyers run on rhythms, not quarters.',
    frame: '43 peaks. 43 troughs. Calendar QBRs miss both.'
  },
  {
    id: '04',
    title: '38K sleeper contacts, visible across both legacies.',
    frame: '58% of 65K contacts inactive. T1 outreach / T2 nurture / T3 purge.'
  },
  {
    id: '05',
    title: 'Hygiene is where merger forecast risk lives.',
    frame: '5-10% stage & naming mismatch. 7-figure unattributed revenue.'
  },
  {
    id: '06',
    title: 'The merger thesis, evidenced.',
    frame: 'Two motions. Composite ICP. Timed to rhythm. Visible across both books. Measured on hygiene.',
    isSummary: true
  }
]

export const cadence = [
  { when: 'Weekly', what: 'Hygiene score as leadership KPI' },
  { when: 'Monthly', what: 'ICP reallocation across the combined book' },
  { when: 'Quarterly', what: 'Dual-pipeline forecast · seasonality-led QBRs' },
  { when: 'Annually', what: 'Territory & headcount modeled from composite map' }
]

export const qbrSteps = [
  { n: '01', title: 'Reads account history', body: 'Every buying pattern, across both legacy systems.' },
  { n: '02', title: 'Pulls market context', body: 'Segment-specific trends, competitor signals.' },
  { n: '03', title: 'Builds the QBR framework', body: 'Motion-aware. Corporate Store vs Multi-Location.' },
  { n: '04', title: 'Delivers 90 days ahead', body: 'To the rep, before the peak window opens.' }
]

export const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
