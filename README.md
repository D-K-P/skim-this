# skim this

Speed read any article using RSVP (rapid serial visual presentation).

## Overview

Paste a URL, read 2-3x faster. Words are displayed one at a time at a fixed focal point, eliminating eye movement and enabling faster reading without sacrificing comprehension.

## Tech stack

- [**Next.js**](https://nextjs.org/) – React framework with App Router
- [**Mozilla Readability**](https://github.com/mozilla/readability) – article extraction (same engine as Firefox Reader View)
- [**nuqs**](https://nuqs.47ng.com/) – URL state management for shareable links
- [**canvas-confetti**](https://github.com/catdad/canvas-confetti) – celebration on completion
- [**Tailwind CSS**](https://tailwindcss.com/) – styling
- [**shadcn/ui**](https://ui.shadcn.com/) – UI components

## Setup & running locally

```bash
git clone https://github.com/D-K-P/skim-this.git
cd skim-this
pnpm install
pnpm dev
```

No environment variables required.

## Features

- **Shareable links** – URL state preserved, share any article with `?url=`
- **Focus mode** – UI fades during playback for distraction-free reading
- **Keyboard shortcuts** – space (play/pause), arrows (skip/speed), R (restart)
- **Progress scrubbing** – click anywhere on progress bar to jump
- **Confetti** – celebrate when you finish an article
- **Dark mode** – automatic theme detection with manual toggle
- **Mobile responsive** – works on all screen sizes

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
- **focus mode context** – [`src/contexts/focus-context.tsx`](src/contexts/focus-context.tsx)
- **playback controls & restart** – [`src/components/playback-controls.tsx`](src/components/playback-controls.tsx)

## Learn more

- [RSVP on Wikipedia](https://en.wikipedia.org/wiki/Rapid_serial_visual_presentation)
- [Research on RSVP reading](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4620406/) – study on comprehension at high speeds
- [Mozilla Readability](https://github.com/mozilla/readability) – the extraction algorithm
