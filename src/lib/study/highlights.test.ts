import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  chapterKey,
  clearAllHighlights,
  highlightedVerses,
  isHighlighted,
  rangeIsHighlighted,
  toggleHighlights,
} from "./highlights.ts";

const mem = new Map<string, string>();

beforeEach(() => {
  mem.clear();
  const storage = {
    getItem: (k: string) => mem.get(k) ?? null,
    setItem: (k: string, v: string) => {
      mem.set(k, v);
    },
    removeItem: (k: string) => {
      mem.delete(k);
    },
    clear: () => mem.clear(),
    key: () => null,
    get length() {
      return mem.size;
    },
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: storage,
    configurable: true,
  });
  clearAllHighlights();
});

describe("verse highlights", () => {
  it("keys a chapter as book:chapter", () => {
    assert.equal(chapterKey("JHN", 1), "JHN:1");
  });

  it("toggles a single verse on, then off", () => {
    assert.equal(toggleHighlights("JHN", 1, [1]), true);
    assert.equal(isHighlighted("JHN", 1, 1), true);
    assert.deepEqual(highlightedVerses("JHN", 1), [1]);
    assert.equal(toggleHighlights("JHN", 1, [1]), false);
    assert.equal(isHighlighted("JHN", 1, 1), false);
    assert.deepEqual(highlightedVerses("JHN", 1), []);
  });

  it("highlights a range; mixed range turns all on", () => {
    toggleHighlights("JHN", 1, [1]);
    assert.equal(rangeIsHighlighted("JHN", 1, 1, 3), false);
    assert.equal(toggleHighlights("JHN", 1, [1, 2, 3]), true);
    assert.equal(rangeIsHighlighted("JHN", 1, 1, 3), true);
    assert.deepEqual(highlightedVerses("JHN", 1), [1, 2, 3]);
  });

  it("unhighlights a fully marked range", () => {
    toggleHighlights("ROM", 8, [28, 29, 30]);
    assert.equal(toggleHighlights("ROM", 8, [28, 29, 30]), false);
    assert.deepEqual(highlightedVerses("ROM", 8), []);
  });

  it("keeps other chapters untouched", () => {
    toggleHighlights("JHN", 1, [1]);
    toggleHighlights("JHN", 3, [16]);
    assert.deepEqual(highlightedVerses("JHN", 1), [1]);
    assert.deepEqual(highlightedVerses("JHN", 3), [16]);
  });
});
