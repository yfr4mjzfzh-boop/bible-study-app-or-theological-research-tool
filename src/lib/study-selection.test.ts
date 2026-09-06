import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyVerseTap } from "./bible/range.ts";

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
});
