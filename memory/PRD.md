# Home Shred — Product Requirements Document

## Problem Statement
A responsive mobile-first web app called "Home Shred" — a home workout tracker with dark theme (near-black background, orange/red accents). Works fully offline, storing all data locally in localStorage, no login required. Seeded with a 5-day training plan (Mon Push, Tue Pull, Thu Legs, Fri Cardio HIIT, Sat Full Body; Wed & Sun rest). Equipment: exercise mat, skipping rope, ab wheel, mini stepper + resistance bands, running shoes.

## Architecture
- Frontend: React 19 + CRA + Craco, Tailwind CSS, shadcn UI, lucide-react icons, Recharts, sonner toasts
- Storage: browser localStorage (`homeshred:sessions`, `homeshred:settings`)
- No backend — fully offline
- Fonts: Bebas Neue (headers) + Inter (body) via Google Fonts

## User Persona
Home lifter with limited equipment who wants to track reps/duration/band-level sessions and build a streak toward a "ripped" outcome. Trains in gym lighting — dark UI mandatory.

## Core Requirements (static)
- 4-tab bottom nav: Today, Week, History, Settings
- Data model: WorkoutDay → blocks → Exercise (strength/band/timed/cardio); SetLog per exercise/set; SessionLog keyed by date
- Per-set logging with rep-range/duration/band-level (light/medium/heavy) inputs and orange-fill checkmark buttons
- Per-exercise Skip toggle
- Rest timer overlay with +/- 15s, pause/resume, audible beep on completion
- Rest days (Wed, Sun) show recovery card, no logged sets
- History: Day Streak, X/5 This Week, Total Sessions, weekly dot tracker, Recharts reps-per-week line chart, recent sessions list
- Settings: Dark mode toggle, Rest Timer default, Home Shred info card, equipment list, Danger Zone Reset All Data with confirmation

## Implemented (Feb 2026)
- Complete 4-screen app with bottom nav (`BottomNav.jsx`)
- Today screen with hero banners per day, progress bar, per-set logging, band selector, timed inputs, single-cardio Mark Done, Skip toggle, inline rest button between blocks, and rest-day recovery card with 5 stretch suggestions
- Week screen: 7-day strip Mon-first with rest/training/worked indicators + "Now" badge, read-only exercise list per day grouped by muscle-group blocks with SHORT BREAK dividers
- History screen: 3 stat tiles, weekly dot tracker (rest days = moon icon), Recharts line chart of total reps per week (6-week window), recent sessions feed
- Settings screen: dark toggle, adjustable default rest seconds, Home Shred info card, 5-item equipment list, danger-zone reset with confirm/cancel
- localStorage persistence + derived streak/week/total/recent/chart calculations
- Rest Timer overlay with Web Audio API beep (triple chime)
- All interactive/UI elements carry `data-testid`

## Backlog (Prioritized)
- P1: Copy-forward previous session's reps as placeholders on Today for quick logging
- P1: Progression coach — auto-suggest next-session progression when top of rep range is hit 3× (rules already documented in plan)
- P2: Share/screenshot session summary card for social
- P2: Add-a-day custom workout builder for injury/travel days
- P2: Optional PWA install prompt + service worker for true offline install
- P2: Import/export JSON of all data
- P3: Barometer trend chart for ab-wheel rollouts (dedicated single-exercise progression view)

## Next Tasks
- Verify training-day logging flow live on a Mon/Tue/Thu/Fri/Sat (tester deferred because today = Wed)
- Add PWA manifest + service worker (would let users add-to-home-screen)
