# HANDOFF — Theos Logos (living)

Last beat: 2026-09-06 02:56 UTC  
Branch: `scholar-desk` (GitHub default). Vercel production branch is `main`.  
Promote: Rardo standing go — merge/promote on QC PASS, no second ask.  
Skip: BUG-4 until product call.

## Current

Bug polish pack **PASS** (except skipped 4). **Production LIVE** at
https://theos-logos-official.vercel.app — SHA `3908d51`
(`dpl_5UErYtv2PsTtTX1GDAAZNwmiqsWs`, target production).

Pushes to `scholar-desk` stay preview. Production ships when `main` is
updated to the same SHA (or via `vercel promote` if a CLI token is present).

Order: **BUG-1 → 6 → 7,8 → 2 → 3 → 9**

| # | Status | Note |
|---|---|---|
| 1 | **PASS** | Retap sole verse clears. `4c6adfd` |
| 6 | **PASS** | Library verse grid uses reader tap grammar. `020e8c3` |
| 7,8 | **PASS** | Oxblood `#821111` locked in meta + JS. No Day/Night pair. |
| 2 | **PASS** | Treatise outline no longer poses as John 1:1. `11b8a51` |
| 3 | **PASS** | Desk chrome drag snappier (COMMIT 56 / FLING 0.55). Mid still pan-y. |
| 9 | **PASS** | Stronger lamplight ends + slightly louder selected wash. |
| 4 | **SKIP** | Product call. |

## QC

- `node --experimental-strip-types --test src/lib/bible/range.test.ts src/lib/study-selection.test.ts src/lib/reception/retrieve.test.ts src/lib/reception/synthesize.test.ts`
- Pack SHA `3908d51` is production.

See `BUGS-PLAN.md`.
