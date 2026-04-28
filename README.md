# CK Marketing Revenue Intelligence Briefing

**Client:** CK Marketing (Clayton Kendall + Concord Marketing, post-merger)
**Delivered by:** PerformanceLabs.AI × Aplora
**Audience:** The Board of Directors
**Format:** Interactive 8-slide web presentation (Vite + React)
**Status:** Production. Deployed via Vercel on push to `main`.

---

## What this is

A live, click-through board presentation built as a Vite + React single-page app. Each slide is composed of bespoke animated visualizations driven by a step-by-step reveal system, so the presenter controls pacing in real time during the meeting.

This is not a slide deck exported to images or PDF — every chart, every transformation, every typographic morph is rendered live in the browser at 60fps via Framer Motion + SVG.

---

## Narrative arc

The deck argues a single thesis in four moves: **the data is unified, the product is real, the patterns are responses, the roadmap is concrete.** Each move is exactly one slide. An intro/load screen sits in front of the cover so the audience presses **Start** to begin — the deck never auto-plays into Slide 1.

| # | Slide | Hero | What it does |
|---|---|---|---|
| 0 | Intro (load screen) | (no headline) | PerformanceLabs.AI + Aplora.AI partner-logo lockup with an orange-outlined **Lets Get Started →** button. HUD hidden so it reads as a true splash. |
| 1 | Cover | `What Our AI Told Us About Your Revenue Operations in Under 8 Weeks.` | Brand opener: CK logo, partnership strap, board-update headline (52px serif with "Revenue Operations" italic-orange), prepared-for footer |
| 2 | How it works | `Three systems, one source of truth.` | Animated convergence diagram: HubSpot · Finance · Sales Data → "One Source of Truth" box, lines drawing in over 3 seconds |
| 3 | Live product | `Live now.` | Real product proof: HubSpot dashboard demo (pipeline by stage, monthly revenue trend) → click → Executive Advisor chat with two named-account Q&A turns powered by Claude |
| 4 | Patterns + Shifts | `Three patterns. Three operational shifts.` | The argument's center of gravity. Three paired diagnosis→response beats, one click reveals each pattern, second click transforms it into the operational response on the same canvas |
| 5 | Roadmap | `From insight to deployment.` | Interactive Dynamic Revenue Calendar showing buying-window peaks across both motions + two-card roadmap (Market Intelligence / Rep Specialization) |
| 6 | Engagement | (mic-drop sentence) | "The revenue target doesn't change. The confidence in hitting it does." Single-sentence resting state |
| 7 | Thank you | `Thank you.` | Partnership closer with PerformanceLabs.AI + Aplora.AI lockup |

End-to-end: ~17 clicks (1 to leave intro + 16 across the deck), 5–6 minutes of presenter time.

---

## The Patterns + Shifts middle section (Slide 4)

The deck's load-bearing slide. Six clicks across three beats; each beat shows the pattern, then transforms into the shift on the same canvas:

**Beat 01 — Two motions, one blended forecast → Each motion gets its own scorecard**
- Two horizontal cycle bars (Corporate Store · 203 days · concord blue, Multi-Location · 80 days · CK green)
- Pattern: a dashed white "Blended forecast · 142 days" line cuts between them
- Shift (click): blended line dissolves; each bar gains a motion-specific trait list (accent dot + phrase, three columns) that contrasts how each motion actually sells:
  - Corporate Store: Larger buying committee · Higher deal value · Solution complexity & customization
  - Multi-Location: Single buyer or small committee · Lower price point · Self-evident value

**Beat 02 — Deal size alone is one dimension → Win rate and speed to close shape the year**
- Five tier rows (T1–T5, $1.2M → $48K) ordered by deal size
- Pattern: only the Deal Size column is visible
- Shift (click): two new columns slide in (Win Rate, Cycle Days). Tier order never changes — no inversion drama.
- A 120-day cutoff line in the cycle column with green/red coloring on either side delivers the punchline: *cycles over 120 days don't book this year*

**Beat 03 — Buying rhythms are predictable → Outreach syncs to the wave**
- 12-month seasonality wave with peak markers at Jan, Apr, May, Oct
- Shift (click): three orange "Fire" markers slide in 60–90 days ahead of the peaks (Nov for Jan, mid-Feb/Mar for the Apr+May pair, Aug for Oct). Apr and May are adjacent peaks so their fire windows overlap in calendar time — they share one consolidated marker rather than crowd two.
- Wave is normalized to span the full vertical canvas (raw values 0.28–0.95 → [0, 1] via min/max stretch) so peaks reach the top and valleys reach the bottom
- All text labels (peak letters, FIRE labels, month ruler) live in HTML overlays positioned at the SVG's x-percentages, not inside the SVG — this is the only way to keep glyphs crisp when the SVG uses `preserveAspectRatio="none"`
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
| Active pipeline | $7.1M | Slide 3 dashboard hero |
| Active deals | 96 | Slide 3 dashboard hero |
| Corporate Store cycle | 203 days | Slide 4 Beat 01 |
| Multi-Location cycle | 80 days | Slide 4 Beat 01 |
| Blended forecast (averaged) | 142 days | Slide 4 Beat 01 |
| Tier composite scores | 18% – 86% win rate, 60d – 240d cycle | Slide 4 Beat 02 |
| Cycle cutoff for current-year recognition | 120 days | Slide 4 Beat 02 callout |
| Seasonality peaks | Jan · Apr · May · Oct | Slide 4 Beat 03, Slide 5 calendar |
| Fire-window timing | 60–90 days ahead of peak | Slide 4 Beat 03, Slide 5 calendar |
| Named example accounts | Herc Rentals · Country Financial · Wetzels | Slide 3 Executive Advisor demo |

---

## Tech stack

- **Framework:** Vite 5 + React 18
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation:** Framer Motion 12 (AnimatePresence, motion.path, springs)
- **Charts/diagrams:** raw SVG with framer-motion path-length animations (no chart library — recharts is removed)
- **Icons:** lucide-react
- **Dev server / HMR:** Vite at `http://localhost:5183` (auto-falls-back to 5184+ if taken)
- **Hosting:** Vercel (linked to `aplora-ai/ck-marketing-board-briefing`)

---

## Project structure

```
src/
├── App.jsx                        8-slide SLIDES array (Intro at index 0), AnimatePresence between slides
├── data.js                        Single source of truth: deck metadata, motions, dealTiers,
│                                  sources, roadmap, seasonality data
├── index.css                      Brand color CSS variables + slide-stage 16:9 utility
├── main.jsx
├── slides/
│   ├── SlideIntro.jsx             Intro/load screen (partner logos + Lets Get Started button)
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

Each slide declares a `steps` count in `App.jsx` (`steps: N` → 0 to N inclusive, so N+1 reveal states). Slides can also declare `hideHud: true` (intro slide does this so the load screen reads cleanly). Inside slides with multi-state cards (Slide 4 Beat 02 and Beat 03), a `SUB_STEPS` array maps clicks to phase changes within the active card. This lets the presenter pause on the *pattern* state, deliver their voice-over, then click to reveal the *shift* state on demand.

Click-driven phases in the current build:
- Slide 4 Beat 01: pattern → shift (1 click within the beat)
- Slide 4 Beat 02: pattern → shift (1 click)
- Slide 4 Beat 03: pattern → shift (1 click)

Auto-advances within slides (no click needed):
- Slide 2 (How it works): source pills fade in, lines draw, "One Source of Truth" box materializes (~3s)
- Slides 0, 1, 6, 7: auto-cascade entries
- Slide 3 advisor chat: typing animations are time-based once Slide 3 step 1 is reached

The `onStart` prop is passed to every slide via `<Current step={step} onStart={next} />`. Most slides ignore it; only `SlideIntro` uses it (wired to the **Lets Get Started** button) so a click advances to the cover.

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
- **All text inside an SVG that uses `preserveAspectRatio="none"` will be horizontally stretched along with the geometry.** Keep paths, dots, and lines inside the SVG; render every text label as an HTML overlay positioned at the SVG's x/y percentages. Use one shared `TEXT_CLASS` for every label that needs to align with another (e.g. peak letter and month letter under it) — same font-size, weight, and tracking, anchored at the same percentage, render with identical glyph metrics by construction. See `RhythmsBeatViz` for the canonical example.
- **State-dependent footer elements (callouts that appear only in shift state) belong in real flex children with reserved height, not absolute positioning.** Absolute `bottom: 0` looks like it should "just float at the bottom regardless of siblings" but it can't react to sibling overflow — if rows overflow their wrapper, the absolute callout stays put while overflowing content visually invades its space. A real flex child with `h-N shrink-0` participates in flex sizing and cannot be overlapped. See `EfficiencyBeatViz` after the 1280×720 layout fix.
- **Framer-motion takes ownership of the `transform` CSS property whenever it animates `x`, `y`, `scale`, or `rotate`.** Inline `transform: translate(...)` on a motion component will be silently overwritten on every frame. If you need a static positional offset on an animated element, animate opacity-only and anchor the element with `right`/`top`/`bottom` instead of `transform`. See the blended-forecast label in `MotionsBeatViz`.
- **At the standard 1280×720 stage size, `EfficiencyBeatViz` only gets ~180px of vertical real estate.** Tier rows are sized down (py-0, font-serif text-[16px]) to fit 5 rows + header + callout in that height. Don't restore larger row chrome without also expanding the BeatCard's available area.
- SVG visualizations should use `preserveAspectRatio="none"` when the wave/curve is shape-tolerant; pair with the HTML-overlay text pattern above
- Real client names (Herc Rentals, Country Financial, Wetzels) are wired through the Executive Advisor demo — update both the dashboard's Top Accounts copy AND the advisor's RESPONSE_2_SEGMENTS together if naming changes
- The 16:9 stage is locked via CSS, so all positioning math is relative to the stage dimensions, not the viewport. The deck looks correct from ~960px viewport up
