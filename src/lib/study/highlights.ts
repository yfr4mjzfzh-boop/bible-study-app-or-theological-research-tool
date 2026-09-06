const KEY = "theos-logos-highlights-v1";

type Store = Record<string, number[]>;

export function chapterKey(bookId: string, chapter: number): string {
  return `${bookId}:${chapter}`;
}

function storage(): Storage | null {
  try {
    if (typeof globalThis.localStorage === "undefined") return null;
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

function read(): Store {
  const s = storage();
  if (!s) return {};
  try {
    const raw = s.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Store;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function write(store: Store) {
  const s = storage();
  if (!s) return;
  try {
    s.setItem(KEY, JSON.stringify(store));
  } catch {
    /* private mode / quota */
  }
}

function cleanVerses(verses: number[]): number[] {
  return [
    ...new Set(
      verses.filter((n) => Number.isInteger(n) && n > 0 && n < 200),
    ),
  ].sort((a, b) => a - b);
}

export function highlightedVerses(bookId: string, chapter: number): number[] {
  return cleanVerses(read()[chapterKey(bookId, chapter)] ?? []);
}

export function isHighlighted(
  bookId: string,
  chapter: number,
  verse: number,
): boolean {
  return highlightedVerses(bookId, chapter).includes(verse);
}

export function rangeIsHighlighted(
  bookId: string,
  chapter: number,
  start: number,
  end: number,
): boolean {
  if (end < start) return false;
  const set = new Set(highlightedVerses(bookId, chapter));
  for (let v = start; v <= end; v++) {
    if (!set.has(v)) return false;
  }
  return true;
}

/**
 * If every verse is already highlighted, remove them. Otherwise add them.
 * Returns whether the verses are highlighted after the toggle.
 */
export function toggleHighlights(
  bookId: string,
  chapter: number,
  verses: number[],
): boolean {
  const unique = cleanVerses(verses);
  if (!unique.length) return false;
  const store = read();
  const key = chapterKey(bookId, chapter);
  const set = new Set(store[key] ?? []);
  const allOn = unique.every((v) => set.has(v));
  if (allOn) unique.forEach((v) => set.delete(v));
  else unique.forEach((v) => set.add(v));
  if (set.size) store[key] = [...set].sort((a, b) => a - b);
  else delete store[key];
  write(store);
  return !allOn;
}

/** Test helper. */
export function clearAllHighlights() {
  write({});
}
