import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

// Question totals must come from lib/constants/question-counts.ts, never as
// literals. These raw/stale values caused the drift the empirical reviews
// flagged: the 3-way home/meta drift (12,652 / 14,402 / 14,082) and the
// blog↔exam-LP mismatch (a stale "2,398" in a blog article vs the SSOT /ip
// count). Guard against regressions.
const FORBIDDEN = [
  "14,402",
  "14402",
  "14,082",
  "14082",
  "12,652",
  "12652",
  "2,398",
  "2398",
];

// The SSOT itself documents the history in comments; exempt it.
const EXEMPT = new Set([
  join("lib", "constants", "question-counts.ts"),
]);

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx)$/.test(entry)) acc.push(p);
  }
  return acc;
}

describe("no hardcoded question-count literals", () => {
  it("uses the SSOT instead of raw/stale count numbers in source", () => {
    const files = [
      ...walk("app"),
      ...walk("components"),
      ...walk("lib"),
      // Blog content is generated in data/blog and was the source of the stale
      // "2,398" count — scan it too (question data under data/questions is not
      // scanned: those files legitimately contain arbitrary numbers).
      ...walk(join("data", "blog")),
    ].filter((f) => !EXEMPT.has(f));

    const offenders: string[] = [];
    for (const f of files) {
      const text = readFileSync(f, "utf8");
      for (const bad of FORBIDDEN) {
        if (text.includes(bad)) offenders.push(`${f} contains "${bad}"`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
