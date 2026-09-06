import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyVersePick, applyVerseTap } from "./bible/range.ts";

/**
 * Mirrors study-store tapVerse → selectedVerse mapping so BUG-1 stays
 * covered without loading the zustand store (which uses @/ aliases).
 */
function selectedVerseAfterTap(
  selectedVerse: number | null,
  selectedEndVerse: number | null,
  verse: number,
): number | null {
  const current =
    selectedVerse == null
      ? null
      : { start: selectedVerse, end: selectedEndVerse ?? selectedVerse };
  const outcome = applyVerseTap(current, verse);
  if (outcome.refused) return selectedVerse;
  return outcome.range?.start ?? null;
}

describe("study selection tap (BUG-1)", () => {
  it("select v.3 → tap v.3 → selectedVerse === null", () => {
    let selectedVerse: number | null = null;
    let selectedEndVerse: number | null = null;

    selectedVerse = selectedVerseAfterTap(selectedVerse, selectedEndVerse, 3);
    selectedEndVerse = null;
    assert.equal(selectedVerse, 3);

    selectedVerse = selectedVerseAfterTap(selectedVerse, selectedEndVerse, 3);
    assert.equal(selectedVerse, null);
  });

  it("keeps passage ranges when tapping outside the sole-verse clear path", () => {
    let selectedVerse: number | null = 3;
    let selectedEndVerse: number | null = null;
    // extend to 5
    const mid = applyVerseTap(
      { start: selectedVerse, end: selectedVerse },
      5,
    ).range;
    assert.deepEqual(mid, { start: 3, end: 5 });
    selectedVerse = mid!.start;
    selectedEndVerse = mid!.end;
    // retap sole is only for single; range retap of end trims
    const trimmed = applyVerseTap(
      { start: selectedVerse, end: selectedEndVerse },
      5,
    ).range;
    assert.deepEqual(trimmed, { start: 3, end: 4 });
  });

  it("BUG-6: library plain tap uses applyVerseTap, not a jump that skips trim/clear", () => {
    // Mirror library-drawer onPick: extend → pick (grow); else tap (grammar).
    function libraryPick(
      selectedVerse: number | null,
      selectedEndVerse: number | null,
      verse: number,
      extend: boolean,
    ): { start: number; end: number } | null {
      const current =
        selectedVerse == null
          ? null
          : { start: selectedVerse, end: selectedEndVerse ?? selectedVerse };
      if (extend) {
        return applyVersePick(current, verse);
      }
      const outcome = applyVerseTap(current, verse, { ifTooLong: "jump" });
      if (outcome.refused) return current;
      return outcome.range;
    }

    assert.deepEqual(libraryPick(null, null, 3, false), { start: 3, end: 3 });
    assert.equal(libraryPick(3, null, 3, false), null);
    assert.deepEqual(libraryPick(3, null, 5, false), { start: 3, end: 5 });
    assert.deepEqual(libraryPick(3, 5, 5, false), { start: 3, end: 4 });
  });
});

describe("TOC / marked chip clear-if-same (BUG-2 / BUG-3)", () => {
  /** Mirrors reader TOC + empty-desk chip handlers: clear sole, else setVerse. */
  function tocOrChipTap(
    selectedVerse: number | null,
    selectedEndVerse: number | null,
    n: number,
  ): number | null {
    if (
      selectedVerse === n &&
      (selectedEndVerse == null || selectedEndVerse === n)
    ) {
      return null;
    }
    return n;
  }

  it("BUG-2: retap same TOC heading clears selection", () => {
    assert.equal(tocOrChipTap(null, null, 12), 12);
    assert.equal(tocOrChipTap(12, null, 12), null);
    assert.equal(tocOrChipTap(12, null, 18), 18);
  });

  it("BUG-3: retap same marked chip clears selection", () => {
    assert.equal(tocOrChipTap(3, null, 3), null);
    assert.equal(tocOrChipTap(3, null, 7), 7);
  });

  it("does not treat multi-verse range start as sole clear", () => {
    assert.equal(tocOrChipTap(3, 5, 3), 3);
  });
});
