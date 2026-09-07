# Theos Logos — living handoff (updated 2026-09-07 ~10:44 ET)

**Grok: start here.** Repo `HANDOFF.md` + `BUGS-PLAN.md` on `scholar-desk`.

## Production (LIVE)
- SHA `d18ba5c` · https://theos-logos-official.vercel.app · dpl `dpl_7ZgVQAckC5QiHX4EP5ZdaAUZ31nV`
- GitHub `main` fast-forwarded 3908d51 → d18ba5c (Rardo: promote Wave-5B)
- Includes BUG-4 seats 9 + AUTO-APPROVE catalogs + BUG-11 + **Wave-5B**
- Oxblood `#821111` locked. John/1 200.

## Wave-5B — DONE (live)
Ryle, Godet, Haldane, Broadus, Hodge SI (Rom/1 Cor), Alford NT, Catena Luke+John long-pages, Chrysostom 2302–2310 verify.
Spare/interleave only. Desk stays 9. Wave-1 reserved seats stay. QC PASS 2026-09-06.

| Source | Rows |
|---|---|
| Ryle SI gospels (skip MAT 1–4, 16, 17, 28) | 82 |
| Godet SI LUK/JHN/ROM/1CO | 77 |
| Haldane Romans SI n=3–20 | 16 |
| Broadus SI Matthew | 28 |
| Hodge SI ROM/1CO (Eph skipped — CCEL) | 32 |
| Alford Bible Hub NT | 260 |
| Catena Luke + John Isidore LONG_PAGE | 2 |

Banned: Scofield / Darby / Kelly / Bellett / Pink / Stier = 0.

## BUG-11 — DONE (live)
Reception desk scroll-down no longer slides cards left/sticks.
Fix: `.tl-scroll` overflow-x hidden + overscroll-x none; SourceCard quote wrap; scrollLeft reset.
**Do not regress.**

## BUG-4 — DONE (live)
Desk seats 9.

## Lexicon Strong’s (Rom 8:28 love + Heb 1:1 spoke) — READY (preview, await QC)
- Fix SHAs `9d84530` (love→G25) · `342c0fc` (spoke→G2980) · tip `db50a6b` on `scholar-desk`
- Preview https://theos-logos-official-l16t9k4i3-castanedag2001-1468.vercel.app · dpl `dpl_H4oyBXRuCDjVxHwvKujW23XvisvM`
- Branch alias https://theos-logos-official-git-scholar-desk-castanedag2001-1468.vercel.app
**Rom 8:28 “love”:** was G26 ἀγάπη (noun); verse Greek is ἀγαπῶσιν → **G25 ἀγαπάω**. Gloss index maps “love”→G26; verb under “to love”.
**Heb 1:1 “spoke”:** was H2839 חִשֻּׁק (wheel spoke); verse Greek is ἐλάλησεν → **G2980 λαλέω**. Gloss index maps “spoke”→H2839; verb under “to speak”.
Fix: verse-scoped `REF_GREEK` in `src/lib/lexicon/local.ts` (same class). Regressions held: Rom 8:28 God→G2316; Mark 1:1 beginning→G746; empty chips; noun “love” elsewhere still G26; unscoped “spoke” still H2839.
**Await QC. Do not promote.** Production stays `d18ba5c` / `dpl_7ZgVQAckC5QiHX4EP5ZdaAUZ31nV`.

## Locked logo (header + PWA) — READY (preview, await QC)
Wired LOCKED Theos Logos mark into `scholar-desk` (header seal + favicon/PWA icons). Source: `/workspace/theos-logos-logo/LOCKED-header.png` + `exports/`.
- Header: `public/seal.png` ← cropped locked oxblood book mark (wordmark still “Theos Logos” + SCRIPTURE FIRST)
- Favicon/PWA: `favicon.png`, `favicon-48.png`, `apple-touch-icon.png`, `__grok/icon-180.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`
- SW cache bumped `theos-logos-icons-v1` → `theos-logos-icons-v2`
- Oxblood `#821111` unchanged. Manifest paths unchanged (`/icon-192`, `/icon-512`, maskable, apple-touch).
**Await QC. Do not promote.** Production stays `d18ba5c` / `dpl_7ZgVQAckC5QiHX4EP5ZdaAUZ31nV`.

## In this chapter — READY (preview)
Collapsed by default, label only (“In this chapter”). Opens as a folio: height ease + staggered heading rise. BUG-2 retap-clear stays. Do not promote unless Rardo says promote.

## Lectern polish — READY (preview, phone only)
Mobile (max-width 639px) Hairline Folio / Night Lectern: laid-paper grain, night lamp as a room, quieter verse lamps, first source-slip lands, oxblood hair on the sheet. Idle “Mark a verse.” on the reader was pulled (Rardo). Empty desk is unused paper. Desktop website left quiet. Do not promote unless Rardo says promote.

## Highlight — READY (preview, not live)
When a verse (or range) is selected, a highlighter sits in the desk chrome. Tap it to keep a dotted oxblood underline on that verse. Tap again to lift it. Persists in localStorage (`theos-logos-highlights-v1`). Does not steal reserved reception seats. Do not promote unless Rardo says promote.

## BUG-5 — ongoing

## STOP
Wave-5B is live. Lexicon Strong’s fixes (love→G25 + spoke→G2980) + Locked logo + Highlight + lectern polish are on scholar-desk preview — **do not promote** until Rardo says so.
Open the preview on a phone (or narrow the pane). Desktop website is intentionally quieter.
Next: BUG-5, or a new wave only if Rardo names it.
