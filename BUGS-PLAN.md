# Theos Logos — BUGS-PLAN (Chief Boss numbering — authoritative)

Updated 2026-09-05 ~23:20 ET · Prod ~`3908d51`

**Grok:** If another `BUGS-PLAN.md` remapped IDs overnight, ignore those numbers. Use **symptoms** below.

Order remaining: **6 → 7 → 8 → 2 → 3 → 9 → 10**. Skip **4**. **1** done.

## BUG-1 — DONE
Retap sole verse clears. `applyVerseTap` / `tapVerse`. SHA `4c6adf`.

## BUG-6 — OPEN — tap outside drawer
`.tl-dim[data-open="true"]` must be `pointer-events: auto` (currently `none` in `src/styles.css`). Backdrop already has onClick. Add Escape to close.

## BUG-7 — OPEN — mobile dismiss
Drawer is `w-full` on phone — no outside. Peek dim strip **or** swipe + Escape (+ X).

## BUG-8 — OPEN — drawer motion
~480–520ms open **and** close; slide-first exit (don’t opacity-pop); `prefers-reduced-motion`.

## BUG-2 — OPEN — TOC toggle
“In this chapter” headings: clear-if-same / `tapVerse` (not only `setVerse`).

## BUG-3 — OPEN — marked chips toggle
Empty-desk marked `v. N` chips: same clear grammar.

## BUG-9 — OPEN — type menu exit
`type-menu.tsx` still `if (!open) return null`. Keep mounted for exit; backdrop + Escape; ~250–350ms.

## BUG-10 — OPEN — reception exit
Keep sheet for exit transition before unmount on X.

## BUG-4 — HELD
Desk seat diversity — product call.

## BUG-5 — ongoing
Wrong-neighbor → fixture → tighten.

## Motion guide
Micro ~150ms · Panels ~450–520ms · Enter = exit · Dim clickable when open.
