# Theos Logos — living handoff (updated 2026-09-06 ~09:40 ET)

**Grok: start here.** Repo `HANDOFF.md` + `BUGS-PLAN.md` on `scholar-desk`.

## Production (LIVE)
- SHA `11caa01` · https://theos-logos-official.vercel.app · dpl `dpl_3ei8AwbXkG2pbSRpdRvkjoADEoBF`
- Promoted from preview `dpl_7ovjxJzx1xV6QF3ttgRHtyZha9ab` (BUG-11)
- Includes BUG-4 seats 9 + AUTO-APPROVE catalogs + BUG-11 horizontal stick fix
- Oxblood `#821111` locked. Wave-5B is **not** in production.
- **Do not promote WAVE-5B until Rardo says promote.** Vercel production branch is `main`.

## BUG-11 — DONE (live)
Reception desk scroll-down no longer slides cards left/sticks.
Fix: `.tl-scroll` overflow-x hidden + overscroll-x none; SourceCard quote wrap; scrollLeft reset on reception scroller.
**Do not regress.**

## Wave-5B — QC PASS (preview, not live)
- SHA `49b850b` · dpl `dpl_FipQn9ZWrXRVW2e61tK1iDudg41X` · target **null** (preview)
- Preview: https://theos-logos-official-a38blvazz-castanedag2001-1468.vercel.app
- Branch alias: https://theos-logos-official-git-scholar-desk-castanedag2001-1468.vercel.app
- Inspector: https://vercel.com/castanedag2001-1468/theos-logos-official/FipQn9ZWrXRVW2e61tK1iDudg41X
- 2026-09-06 QC: 124/124 core tests + 48/48 PWA. Row counts match. Sample hosts 200. Banned 0. Desk stays 9; wave-1 reserved seats held. **Not promoted.**

Catalog index only. Not preferred / not guaranteed. Spare interleave like Meyer/EGT. Desk seats stay 9. Wave-1 reserved seats stay.

| Source | Host / shape | Rows | Notes |
|---|---|---|---|
| J. C. Ryle | SI `/commentary/ryle-expository-thoughts/{MAT\|MRK\|LUK\|JHN}/{ch}/` | 82 | Skip MAT 1–4, 16, 17, 28 (404). Ignore BibliaPlus Ryle 52. MAT 5 SI starts at 5:21 (Beatitudes not on that page). |
| Frédéric Godet | SI `/commentary/godet/{LUK\|JHN\|ROM\|1CO}/{ch}/` | 77 | All chapters 200. Body present (John 1 lemma in HTML). |
| Robert Haldane | SI `/books/haldane-robert-exposition-on-the-epistle-to-the-romans/{n}/` | 16 | ch1→n3 (alt n4), ch2→n5, ch3→n6 (alt n7), chN→n=N+4 through 16→20. Omit n=1 preface, n=2 intro, n=21 conclusion. |
| John A. Broadus | SI `/commentary/broadus/MAT/{ch}/` | 28 | All 200. |
| Charles Hodge SI | SI `/commentary/hodge/{ROM\|1CO}/{ch}/` | 32 | Skip Eph — CCEL `hodge-eph-*` already indexed. SI Eph/1 is 200 and stays off the catalog. |
| Henry Alford | biblehub `/commentaries/alford/{slug}/{ch}.htm` | 260 | Full NT 200. |
| Chrysostom NA 2302–2310 | newadvent `fathers/2302xx–2310x` | verify only | PHP 15, COL 12, 1TH 11, 2TH 5 (23051–55), 1TI 18, 2TI 10, TIT 6 (23081–86), PHM 3 (23091–93), GAL 6 (23101–06). No fill of JHN/1CO/2CO/HEB gaps. |
| Catena Luke + John | `https://isidore.co/aquinas/CALuke.htm` + `CAJohn.htm` | 2 | LONG_PAGE. One row per gospel (`aquinas-catena-luke` / `-john`), chapters 1..N. No duplicate URL. CALuke 3.7MB / CAJohn 3.0MB — 600k cap still truncates late chapters. |

Hosts: `sermonindex.net` + `www.sermonindex.net`; `isidore.co` (+ www). SI + Isidore on LONG_PAGE.

Ranking: `WAVE5_RE` is `isWaveId` only. Not PREFERRED / not GUARANTEED. Non-desk `mapCatalog(limit 5)` skips WAVE-5B so Henry/Calvin tests stay. Named “Ryle” does not displace the nine reserved seats (same as Meyer/EGT).

Banned: Scofield / Darby / Kelly / Bellett / Pink / Stier = 0.

## BUG-5 — ongoing

## STOP
Wave-5B **QC PASS** on preview. **Do not promote. Do not push `main`.** Next: Rardo says **promote** = production.
