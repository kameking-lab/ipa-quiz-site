import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Regression guard for the per-book fragment anchors on
// app/recommended-books/[exam]/page.tsx.
//
// The page's JSON-LD advertises each book as a Product whose `@id` and `url`
// end in `#${book.id}` (e.g. /recommended-books/st#st-ronbun-okayama). For
// those fragment URLs to resolve to a real DOM element — and for an article
// to be able to deep-link straight at one 論文事例集 card — the rendered
// BookCard MUST carry `id={book.id}`. Without it the structured-data fragments
// are dead anchors (they scroll to the top of the page).
//
// We also pin `scroll-mt-20` on the card: SiteHeader is sticky h-14 (56px), so
// an anchor that lands at viewport top would otherwise be hidden under it
// (codebase convention, see #explanation / #apply / #essay-result).
describe("/recommended-books/[exam] — per-book fragment anchors resolve", () => {
  const source = readFileSync(
    join(process.cwd(), "app/recommended-books/[exam]/page.tsx"),
    "utf8",
  );

  it("BookCard renders id={book.id} so JSON-LD #book.id fragments resolve", () => {
    expect(source).toContain("<Card id={book.id}");
  });

  it("the anchored card carries scroll-mt-20 (lands below the sticky header)", () => {
    expect(source).toMatch(/<Card id=\{book\.id\}[^>]*scroll-mt-20/);
  });

  it("JSON-LD builds per-book #book.id fragment urls (the anchors' consumers)", () => {
    expect(source).toContain("#${book.id}`");
  });
});

describe("InlineBookHint — title deep-links to the book's card anchor", () => {
  const hintSource = readFileSync(
    join(process.cwd(), "components/quiz/InlineBookHint.tsx"),
    "utf8",
  );

  // The affiliate hint highlights one book; its title should link to that
  // book's full card (Amazon + 楽天 + 使い分け表), not the page top, now that
  // the cards carry id anchors. Pin the fragment-href wiring.
  it("builds /recommended-books/{exam}#{book.id} for the highlighted book", () => {
    expect(hintSource).toContain("`${allBooksHref}#${book.id}`");
  });

  it("renders the book title as a Link to that deep href", () => {
    expect(hintSource).toMatch(/<Link href=\{bookDetailHref\}[\s\S]*?\{book\.title\}/);
  });
});
