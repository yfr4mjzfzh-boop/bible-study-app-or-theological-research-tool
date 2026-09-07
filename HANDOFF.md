# Theos Logos — living handoff (updated 2026-09-07 ~09:50 ET)

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

## Lexicon Strong’s (Rom 8:28 love) — READY (preview, await QC)
Chip “love” on Romans 8:28 was G26 ἀγάπη (noun); verse Greek is verb ἀγαπῶσιν → **G25 ἀγαπάω**.
Cause: STEPBible gloss index maps English “love”→G26; verb lives under “to love”. Not a lemma collapse.
Fix: verse-scoped local note in `src/lib/lexicon/local.ts` (REF_GREEK). Rom 8:28 God stays G2316; Mark 1:1 beginning stays G746; empty-chip hiding unchanged; noun “love” elsewhere still G26.
**Await QC. Do not promote.**

## Seal — READY (preview)
Leather cover stays the home-screen icon. In the bar it is a flat oxblood stamp with the gold TL-cross (no 3D leather, no shadow) so it sits with the type. Regen: `python3 scripts/render-cover-icons.py`. Do not promote unless Rardo says promote.

## In this chapter — READY (preview)
Collapsed by default, label only (“In this chapter”). Opens as a folio: height ease + staggered heading rise. BUG-2 retap-clear stays. Do not promote unless Rardo says promote.

## Lectern polish — READY (preview, phone only)
Mobile (max-width 639px) Hairline Folio / Night Lectern: laid-paper grain, night lamp as a room, quieter verse lamps, first source-slip lands, oxblood hair on the sheet. Idle “Mark a verse.” on the reader was pulled (Rardo). Empty desk is unused paper. Desktop website left quiet. Do not promote unless Rardo says promote.

## Highlight — READY (preview, not live)
When a verse (or range) is selected, a highlighter sits in the desk chrome. Tap it to keep a dotted oxblood underline on that verse. Tap again to lift it. Persists in localStorage (`theos-logos-highlights-v1`). Does not steal reserved reception seats. Do not promote unless Rardo says promote.

## BUG-5 — ongoing

## STOP
Wave-5B is live. Lexicon Strong’s fix + Highlight + lectern polish are on scholar-desk preview — **do not promote** until Rardo says so.
Open the preview on a phone (or narrow the pane). Desktop website is intentionally quieter.
Next: BUG-5, or a new wave only if Rardo names it.
