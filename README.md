# skim this

Speed read any article using RSVP (rapid serial visual presentation).

## Overview

Paste a URL, read 2-3x faster. Words are displayed one at a time at a fixed focal point, eliminating eye movement and enabling faster reading without sacrificing comprehension.

## Tech stack

- [**Next.js**](https://nextjs.org/) – React framework with App Router
- [**Mozilla Readability**](https://github.com/mozilla/readability) – article extraction (same engine as Firefox Reader View)
- [**nuqs**](https://nuqs.47ng.com/) – URL state management for shareable links
- [**Tailwind CSS**](https://tailwindcss.com/) – styling
- [**shadcn/ui**](https://ui.shadcn.com/) – UI components

## Setup & running locally

```bash
git clone https://github.com/your-username/skim-this.git
cd skim-this
pnpm install
pnpm dev
```

No environment variables required.

## How it works

### The science

**RSVP (Rapid Serial Visual Presentation)** displays words sequentially at a single fixed point. Traditional reading is slow because your eyes physically jump across lines (saccades) and pause (fixations). RSVP eliminates this overhead entirely.

**ORP (Optimal Recognition Point)** is the character your eye naturally focuses on when viewing a word—typically slightly left of center. This app highlights the ORP in green and anchors it at screen center, so your eye never moves.

**Punctuation pausing** adds a 50% delay after sentences and clauses, giving your brain time to process complete thoughts.

### The flow

1. User pastes a URL
2. `/api/extract` fetches the page and extracts content using Mozilla Readability
3. Content is split into words and displayed one at a time
4. ORP is calculated per-word and highlighted at screen center
5. Playback advances at the selected WPM, pausing longer at punctuation

## Relevant code

- **article extraction** – [`src/app/api/extract/route.ts`](src/app/api/extract/route.ts)
- **RSVP display with ORP** – [`src/components/rsvp-display.tsx`](src/components/rsvp-display.tsx)
- **playback timing & punctuation pausing** – [`src/hooks/use-playback.ts`](src/hooks/use-playback.ts)
- **keyboard shortcuts** – [`src/hooks/use-keyboard-shortcuts.ts`](src/hooks/use-keyboard-shortcuts.ts)

## Learn more

- [RSVP on Wikipedia](https://en.wikipedia.org/wiki/Rapid_serial_visual_presentation)
- [Research on RSVP reading](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4620406/) – study on comprehension at high speeds
- [Mozilla Readability](https://github.com/mozilla/readability) – the extraction algorithm
