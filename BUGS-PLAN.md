# BUGS-PLAN — polish pack

Source of the numbered list: overnight Grok Bot notes, reconstructed here
because `/home/box/agent-data/projects/theos-logos/BUGS-PLAN.md` is not on
this sandbox. Update this file on every beat.

Order: **1 → 6 → 7,8 → 2 → 3 → 9**. Skip **4**.

## BUG-1 — retap sole verse does not clear

- **Want:** tap v.3 → selected; tap v.3 again → `selectedVerse === null`, desk X equivalent.
- **Files:** `src/lib/bible/range.ts` `applyVerseTap`, `src/lib/study-store.ts` `tapVerse`, `src/components/study/reader.tsx`.
- **Fixture:** `src/lib/study-selection.test.ts`, `src/lib/bible/range.test.ts` "BUG-1".
- **Status:** PASS (`4c6adfd`). Library sole-retap also wired.

## BUG-6 — library verse grid ignores reader tap grammar

- **Want:** same `applyVerseTap` as the reader (grow, trim, retap-clear, jump-if-too-long). Shift still grows. A plain tap on another verse must not `jumpTo` past the grammar.
- **Files:** `src/components/study/library-drawer.tsx` `VerseSelector.onPick`.
- **Fixture:** extend `src/lib/study-selection.test.ts`.
- **Status:** PASS this beat. Library `onPick` is `extend ? pickVerse : tapVerse(..., jump)`.


## BUG-7 / BUG-8 — PWA chrome pair

- **Want:** installed app fills the screen; status bar is oxblood `#821111` in both modes; no black→white flicker when Control Center drops.
- **Files:** `src/routes/__root.tsx`, `scripts/grok-pwa-shared.mjs`, `src/lib/pwa.ts`, `src/styles.css`.
- **Do not:** restore light/dark `theme-color` media queries. User rejected that.
- **Status:** queued. Spot-check only; oxblood meta already set.

## BUG-2 — treatise outline dumped as John 1:1

- **Want:** `a) The Word is not a creature` is not a verse-1 extract. `1.` is a section, not verse 1. Inquire writes prose.
- **Files:** `src/lib/reception/retrieve-html.ts`, `src/lib/reception/synthesize.ts`, `src/lib/reception/catalog.ts` (tighter chapter score).
- **Fixture:** `retrieve.test.ts` "does not treat a treatise '1.' / 'a)' outline as John 1:1".
- **Status:** PASS (`11b8a51`).

## BUG-3 — reception desk motion

- **Want:** one card, three detents (peek / mid / full). Drag follows the finger on the chrome. Scrolling sources in mid does not collapse the desk. Mid remains scrollable.
- **Files:** `src/components/study/workspace.tsx`, `src/components/study/reception-panel.tsx`, `src/styles.css`.
- **Status:** queued. Earlier session landed chrome-only listeners + per-detent height; re-verify against 3358.mp4 if it still fails.

## BUG-9 — selected verses hard to distinguish

- **Want:** no red fill. Subtle lamplight on each end of the selected run. Middle verses quieter.
- **Files:** `src/components/study/reader.tsx`, `src/styles.css` `.tl-verse`.
- **Status:** queued.

## BUG-4 — SKIP until product call

Do not implement. Do not guess.

## Beat log

- 2026-09-06 02:04 BUG-1 shipped `4c6adfd`.
- 2026-09-06 02:32 BUG-2 shipped `11b8a51` (outline dump, numbered as 2 to match pack).
- 2026-09-06 02:42 Boards moved into the repo. BUG-6 next.
- 2026-09-06 02:45 BUG-6 shipped. Suite 117 pass. Next: 7,8.

