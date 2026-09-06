# HANDOFF — Theos Logos (living)

Last beat: 2026-09-06 02:42 UTC  
Branch: `scholar-desk`  
Promote: Rardo standing go — merge/promote on QC PASS, no second ask.  
Skip: BUG-4 until product call.

This file used to live only on the other agent box
(`/home/box/agent-data/projects/theos-logos/HANDOFF.md`). That path is
not mounted here. The board now lives in the repo so any AI can continue cold.

## Current

Bug polish pack **IMPLEMENTING**.

Order: **BUG-1 → 6 → 7,8 → 2 → 3 → 9**

| # | Status | Note |
|---|---|---|
| 1 | **PASS** | Retap sole verse clears. `4c6adfd` + tests. |
| 6 | **PASS** | Library verse grid uses reader tap grammar. This beat. |
| 7,8 | queued | PWA chrome pair. Oxblood `theme-color` `#821111` is already in `__root` + manifest. Verify, don't reopen the Day/Night fight. |
| 2 | **PASS** | Treatise `1.` / `a)` outline was posing as John 1:1. `11b8a51`. |
| 3 | queued | Reception desk: mid scroll, chrome-only drag, peek follow. |
| 9 | queued | Selection still hard to read vs lamplight ends. |
| 4 | **SKIP** | Product call. Do not touch. |
| 5 | not in order | Leave. |

## QC

- `node --experimental-strip-types --test src/lib/bible/range.test.ts src/lib/study-selection.test.ts src/lib/reception/retrieve.test.ts src/lib/reception/synthesize.test.ts`
- Push `scholar-desk`. Promote the Vercel preview when that suite is green.

## Do not

- Do not index more commentary waves unless a bug requires a catalog row.
- Do not invent BUG-4.
- Do not switch `theme-color` back to light/dark pair — user asked oxblood for both.

See `BUGS-PLAN.md` for fixtures and files.
