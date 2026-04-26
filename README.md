# CK Marketing Revenue Intelligence Briefing

**Client:** CK Marketing (Clayton Kendall + Concord Marketing, post-merger)
**Delivered by:** PerformanceLabs.AI × Aplora
**Audience:** The Board of Directors
**Format:** Interactive 7-slide web presentation (Vite + React)
**Status:** Production. Deployed via Vercel on push to `main`.

---

## What this is

A live, click-through board presentation built as a Vite + React single-page app. Each slide is composed of bespoke animated visualizations driven by a step-by-step reveal system, so the presenter controls pacing in real time during the meeting.

This is not a slide deck exported to images or PDF — every chart, every transformation, every typographic morph is rendered live in the browser at 60fps via Framer Motion + SVG.

---

## Narrative arc

The deck argues a single thesis in four moves: **the data is unified, the product is real, the patterns are responses, the roadmap is concrete.** Each move is exactly one slide.

| # | Slide | Hero | What it does |
|---|---|---|---|
| 0 | Cover | `Revenue Intelligence.` | Brand opener: CK logo, partnership strap, prepared-for footer |
| 1 | How it works | `Three systems, one source of truth.` | Animated convergence diagram: HubSpot · Finance · Sales Data → "One Source of Truth" box, lines drawing in over 3 seconds |
| 2 | Live product | `Live now.` | Real product proof: HubSpot dashboard demo (pipeline by stage, monthly revenue trend) → click → Executive Advisor chat with two named-account Q&A turns powered by Claude |
| 3 | Patterns + Shifts | `Three patterns. Three operational shifts.` | The argument's center of gravity. Three paired diagnosis→response beats, one click reveals each pattern, second click transforms it into the operational response on the same canvas |
| 4 | Roadmap | `From insight to deployment.` | Interactive Dynamic Revenue Calendar showing buying-window peaks across both motions + two-card roadmap (Market Intelligence / Rep Specialization) |
| 5 | Engagement | (mic-drop sentence) | "The revenue target doesn't change. The confidence in hitting it does." Single-sentence resting state |
| 6 | Thank you | `Thank you.` | Partnership closer with PerformanceLabs.AI + Aplora.AI lockup |

End-to-end: ~13 clicks, 5–6 minutes of presenter time.

---

## The Patterns + Shifts middle section (Slide 3)

The deck's load-bearing slide. Six clicks across three beats; each beat shows the pattern, then transforms into the shift on the same canvas:

**Beat 01 — Two motions, one blended forecast → Each motion gets its own scorecard**
- Two horizontal cycle bars (Corporate Store · 203 days · concord blue, Multi-Location · 80 days · CK green)
- Pattern: a dashed white "Blended forecast · 142 days" line cuts between them
- Shift (click): blended line dissolves; each bar gains motion-specific scorecard metrics (Win rate / Cycle / Expansion) inline

**Beat 02 — Deal size alone is one dimension → Win rate and speed to close shape the year**
- Five tier rows (T1–T5, $1.2M → $48K) ordered by deal size
- Pattern: only the Deal Size column is visible
- Shift (click): two new columns slide in (Win Rate, Cycle Days). Tier order never changes — no inversion drama.
- A 120-day cutoff line in the cycle column with green/red coloring on either side delivers the punchline: *cycles over 120 days don't book this year*

**Beat 03 — Buying rhythms are predictable → Outreach syncs to the wave**
- 12-month seasonality wave with peak markers at Jan, Apr, May, Oct
- Shift (click): four orange "Fire" markers slide in 60–90 days before each peak, anchored to the wave's geometry
- Caption: *Reps coach to cycle · Marketing fires 60-90d ahead*

The visual echo across beats — same data shapes the pattern AND the response — is deliberate. The audience reads the diagnosis and the response in the same coordinate system, on the same canvas.

---

## Brand system

| Element | Spec |
|---|---|
| Primary canvas | Dark navy `#0A0F1A` (DarkBackdrop), navy radial accents on Live product slide |
| Signal accent | Orange `#FAA840` (used sparingly: ● dot, "TO" labels, peak markers, headline period) |
| Concord brand | Blue `#1E2672` / soft `#2B35A0` (Corporate Store motion) |
| Clayton Kendall brand | Green `#225F4C` / soft `#2E8066` (Multi-Location motion) |
| Headline font | DM Serif Display (44–88px on hero slides) |
| Body font | DM Sans (11–24px) |
| Slide aspect | 16:9 (locked via CSS `aspect-ratio`) |
| Em dashes | None (brand standard, enforced by `npm run lint:emdash`) |

---

## Data anchors used in the deck

| Metric | Value | Where it appears |
|---|---|---|
| 2026 revenue target | $97.1M | Implied in Engagement closer |
| Active pipeline | $7.1M | Slide 2 dashboard hero |
| Active deals | 96 | Slide 2 dashboard hero |
| Corporate Store cycle | 203 days | Slide 3 Beat 01 |
| Multi-Location cycle | 80 days | Slide 3 Beat 01 |
| Blended forecast (averaged) | 142 days | Slide 3 Beat 01 |
| Tier composite scores | 18% – 86% win rate, 60d – 240d cycle | Slide 3 Beat 02 |
| Cycle cutoff for current-year recognition | 120 days | Slide 3 Beat 02 callout |
| Seasonality peaks | Jan · Apr · May · Oct | Slide 3 Beat 03, Slide 4 calendar |
| Fire-window timing | 60–90 days ahead of peak | Slide 3 Beat 03, Slide 4 calendar |
| Named example accounts | Herc Rentals · Country Financial · Wetzels | Slide 2 Executive Advisor demo |

---

## Tech stack

- **Framework:** Vite 5 + React 18
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation:** Framer Motion 12 (AnimatePresence, motion.path, springs)
- **Charts/diagrams:** raw SVG with framer-motion path-length animations (no chart library — recharts is removed)
- **Icons:** lucide-react
- **Dev server / HMR:** Vite at `http://localhost:5183`
- **Hosting:** Vercel (linked to `aplora-ai/ck-marketing-board-briefing`)

---

## Project structure

```
src/
├── App.jsx                        7-slide SLIDES array, AnimatePresence between slides
├── data.js                        Single source of truth: deck metadata, motions, dealTiers,
│                                  sources, roadmap, seasonality data
├── index.css                      Brand color CSS variables + slide-stage 16:9 utility
├── main.jsx
├── slides/
│   ├── Slide0.jsx                 Cover (CK logo + Revenue Intelligence headline)
│   ├── Slide1Unify.jsx            How it works (3-source convergence diagram)
│   ├── Slide1.jsx                 Live product (dashboard ↔ advisor swap)
│   ├── Slide2.jsx                 Patterns + Shifts (3 paired beats, all bespoke visuals)
│   ├── Slide3.jsx                 (legacy; not imported — kept on disk for reference)
│   ├── Slide4.jsx                 Roadmap (Dynamic Revenue Calendar + 2 cards)
│   ├── Slide5.jsx                 Engagement (mic-drop sentence)
│   └── SlideThankYou.jsx          Partnership closer
├── components/
│   ├── EyebrowStrap.jsx           Top-of-slide ● LABEL / CRUMB strap
│   ├── DarkBackdrop / NavyBackdrop / CreamBackdrop in AmbientBackdrop.jsx
│   ├── StepGate.jsx               Reveals children at step >= N with motion variants
│   ├── CountUp.jsx                Animated number counter ($7.1M-style strings)
│   ├── DataSpineChrome.jsx        Persistent left-rail (currently unused, kept for future)
│   ├── DeckFooter.jsx             PerformanceLabs.AI × Aplora · section · page-of-N
│   ├── HUD.jsx                    Presenter controls: slide dots, prev/next, restart, fill, help
│   ├── RevenueIntelligenceDashboard.jsx   Slide 2's HubSpot-style dashboard demo
│   └── ExecutiveAdvisorChat.jsx           Slide 2's Claude-powered advisor chat
└── hooks/
    └── useDeckState.js            Step machine, keyboard nav, slide jump, fill, restart
```

---

## Step / sub-step mechanics

Each slide declares a `steps` count in `App.jsx` (`steps: N` → 0 to N inclusive, so N+1 reveal states). Inside slides with multi-state cards (Slide 2 Beat 02 and Beat 03), a `SUB_STEPS` array maps clicks to phase changes within the active card. This lets the presenter pause on the *pattern* state, deliver their voice-over, then click to reveal the *shift* state on demand.

Click-driven phases in the current build:
- Slide 3 Beat 01: pattern → shift (1 click within the beat)
- Slide 3 Beat 02: pattern → shift (1 click)
- Slide 3 Beat 03: pattern → shift (1 click)

Auto-advances within slides (no click needed):
- Slide 1Unify: source pills fade in, lines draw, "One Source of Truth" box materializes (~3s)
- Slide 0, 5, 6: auto-cascade entries
- Slide 1 advisor chat: typing animations are time-based once Slide 1 step 1 is reached

---

## Running locally

```bash
npm install
npm run dev          # http://localhost:5183
npm run build        # production bundle (~350 KB JS gzipped)
npm run preview      # preview the production build
npm run lint:emdash  # brand check: zero em dashes in src/
```

### Presenter controls

- `→` / `Space` — next step
- `←` — previous step
- `R` — restart current slide
- `F` — fill current slide (jump to last step)
- `?` — keyboard help overlay
- Click any slide dot in the top strip to jump directly

---

## Deployment

Linked to Vercel project `aplora-ai/ck-marketing-board-briefing`. Pushing to `origin/main` auto-deploys to production. Build runtime ~7–9 seconds. Each deployment is immutable — share the URL hash from `vercel ls` for a permalink to a specific version.

Preview build artifacts (gzipped):
- HTML: ~0.4 KB
- CSS: ~6 KB
- JS: ~107 KB (Framer Motion + React + everything else)

---

## Source materials & decisions

- Pivoted from the original `pptxgenjs` PowerPoint deliverable to an interactive web app early in the engagement; the README and slide structure were rebuilt around the new format
- Middle of the deck went through three structural iterations:
  1. Two slides (Findings + Shifts) with identical card templates → felt PowerPoint-y
  2. Two slides with bespoke per-beat visuals → still 9 clicks
  3. **One merged slide with paired diagnosis→response beats** (current) → 6 clicks, single canvas per beat
- The `EfficiencyReorderViz` originally inverted tier order on the click (smallest deal jumped to first); replaced with the column-table approach to avoid distracting board questions about the inversion
- Cadence cards ("How reps spend time" / "How marketing fires") were absorbed into Beat 03's annotation row to tighten the deck

---

## Build notes for future iteration

- All hero headlines fit on one line at 44–56px serif; the `minHeight` on hero wrappers should be ~64–80px (not 120, which crowds the visual area below)
- SVG visualizations should use `preserveAspectRatio="none"` when the wave/curve is shape-tolerant, with month rulers / labels rendered as separate HTML positioned at calculated x-percentages so typography stays crisp
- Real client names (Herc Rentals, Country Financial, Wetzels) are wired through the Executive Advisor demo — update both the dashboard's Top Accounts copy AND the advisor's RESPONSE_2_SEGMENTS together if naming changes
- The 16:9 stage is locked via CSS, so all positioning math is relative to the stage dimensions, not the viewport. The deck looks correct from ~960px viewport up
