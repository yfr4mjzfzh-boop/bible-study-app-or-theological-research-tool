# Theos Logos — living handoff (updated 2026-09-05 ~23:30 ET)

**Grok / any AI: start here.** Also at repo root: `HANDOFF.md` + `BUGS-PLAN.md` on `scholar-desk`.
Box copy (Chief Boss): `/home/box/agent-data/projects/theos-logos/HANDOFF.md`
Skill: `theos-logos-handoff`

## Pipeline
Librarian → Chief Boss analyzes → Rardo approves → DEV BRO / Grok codes.
Ban Scofield/Darby. Standing promote: QC PASS → promote (Rardo trust).

## Status beat ~23:30 ET
UI pack landed on `scholar-desk` (BUG-6→7→8→2→3→9→10). **NEXT=QC.** No promote.

## Production (LIVE)
- `main` ≈ `3908d51` · https://theos-logos-official.vercel.app
- `scholar-desk` tip ahead — await QC before promote

## CRITICAL — bug ID remap
Overnight Grok **renumbered** bugs. **Chief Boss numbers below are authoritative.** Map by *symptom*, not by Grok’s HANDOFF table.

| ID | Symptom (do this) | Status |
|----|-------------------|--------|
| BUG-1 | Retap selected verse clears selection | **DONE** `4c6adf` |
| BUG-6 | Tap outside library drawer closes it (fix dim `pointer-events`) | **DONE** `1db4965` |
| BUG-7 | Mobile: way to dismiss drawer without only X (dim peek or swipe+Escape) | **DONE** |
| BUG-8 | Drawer open/close ~480–520ms, slide-out not opacity pop | **DONE** |
| BUG-2 | Chapter “In this chapter” TOC retap clears | **DONE** |
| BUG-3 | Marked-verse chips in empty desk retap clears | **DONE** |
| BUG-9 | Appearance/type menu exit animation (don’t `return null` instantly) | **DONE** |
| BUG-10 | Reception desk X exit slide before unmount | **DONE** |
| BUG-4 | More wave-3 voices on 7-seat desk | **HELD** (product) |
| BUG-5 | Live neighbor-bleed → fixtures | ongoing |

**Ship remaining:** none in this pack. Then QC → promote.

## Already shipped (extras — keep)
Treatise outline ≠ John 1:1 · wave-4 Pulpit/Meyer/EGT · library grid `tapVerse` · oxblood PWA lock · desk drag / lamplight polish

## Plans
See `BUGS-PLAN.md` (same folder / repo root). Prefer Chief Boss symptom text over any remapped overnight board.

## If picking up cold
1. Read **this** `HANDOFF.md` first (repo root or box path above)
2. Read `BUGS-PLAN.md`
3. Continue first **OPEN** row in the table
4. Update both files every beat
5. Don’t implement BUG-4 without Rardo

## Agents
Chief `6cb083e0-3dcc-447a-b4ae-5926ffd27b69` · DEV BRO `6cb78f64-9c3c-4e88-ad43-47ab14d8762d` · Librarian `ebaa57c2-233a-4351-89f1-3b44132e8df7` · Quintilius `bc147065-b693-4f40-913c-202caed80a1d`
