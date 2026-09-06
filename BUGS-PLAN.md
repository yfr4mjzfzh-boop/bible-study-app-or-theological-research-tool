# Theos Logos — BUGS-PLAN (Chief Boss numbering — authoritative)

Updated 2026-09-05 ~23:45 ET · scholar-desk

**Grok:** Trust symptoms + Chief numbers.

Order remaining: **BUG-4** seating landed (await QC/Chief); NEW PD sources same PR when Chief lists them. Prior UI pack DONE on prod `6c8ac5f`.

## BUG-1 — DONE
Retap sole verse clears. `applyVerseTap` / `tapVerse`. SHA `4c6adf`.

## BUG-6 — DONE — tap outside drawer
`.tl-dim[data-open="true"]` → `pointer-events: auto`. Backdrop onClick + Escape closes library.

## BUG-7 — DONE — mobile dismiss
Drawer `w-[min(28rem,calc(100%-2.75rem))]` leaves a dim peek strip + Escape (+ X).

## BUG-8 — DONE — drawer motion
`--motion-drawer: 500ms` open **and** close; slide-first (no opacity pop); `prefers-reduced-motion` includes `.tl-drawer`.

## BUG-2 — DONE — TOC toggle
“In this chapter” headings: clear-if-same (retap sole clears; jump via `setVerse`, no range grow).

## BUG-3 — DONE — marked chips toggle
Empty-desk marked `v. N` chips: same clear grammar.

## BUG-9 — DONE — type menu exit
`type-menu.tsx` stays mounted ~320ms; `data-open` drives exit; backdrop + Escape.

## BUG-10 — DONE — reception exit
xl desk uses `deskShown`/`deskOpen` so sheet exits before unmount; mobile sheet delay ~320ms.

## BUG-4 — DONE (on scholar-desk; no promote yet)
Desk seat budget **7 → 9**. Reserve/interleave **Ellicott** + **Kretzmann** with wave-1 (Gill/Geneva/Lange) + wave-2 (Barnes/MacLaren/VWS) + Cambridge. Verse-true / prefer-empty. Scofield/Darby **0**. Waiting Chief/Librarian NEW PD list for same PR; **no promote** until QC + Chief go. Prod still `6c8ac5f`.

## BUG-5 — ongoing
Wrong-neighbor → fixture → tighten.

## Motion guide
Micro ~150ms · Panels ~450–520ms · Enter = exit · Dim clickable when open.
