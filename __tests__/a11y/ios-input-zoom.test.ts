import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// iOS zooms into a focused field whose text is under 16px and stays zoomed.
// /search (14px), its sort select (12px), /review (14px), the feedback-unlock
// form and several textareas inherited text-sm. A single unlayered rule covers
// them and any future field.
const css = readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");

/** Brace depth at an offset: 0 means top level, i.e. not inside @layer { ... }. */
function depthAt(source: string, offset: number): number {
  let depth = 0;
  for (const ch of source.slice(0, offset)) { if (ch === "{") depth++; else if (ch === "}") depth--; }
  return depth;
}

describe("touch-screen text fields are at least 16px", () => {
  const media = /@media \(hover: none\) and \(pointer: coarse\)\s*\{([\s\S]*?)\}\s*\}/.exec(css);
  it("has an unlayered touch-only rule", () => {
    expect(media).not.toBeNull();
    expect(depthAt(css, media!.index)).toBe(0);
  });
  it("covers text inputs, selects and textareas at 16px", () => {
    const body = media![1];
    expect(body).toMatch(/input:not\(/);
    expect(body).toMatch(/\bselect\b/);
    expect(body).toMatch(/\btextarea\b/);
    expect(body).toMatch(/font-size:\s*16px/);
  });
  it("does not resize checkboxes, radios or buttons", () => {
    const body = media![1];
    for (const type of ["checkbox", "radio", "range", "file", "button", "submit"]) expect(body).toContain(`[type="${type}"]`);
  });
});
