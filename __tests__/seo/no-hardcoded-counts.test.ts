import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

// Question totals must come from lib/constants/question-counts.ts, never as
// literals. These raw/stale values caused the 3-way drift the empirical review
// flagged (12,652 / 14,402 / 14,082). Guard against regressions.
const FORBIDDEN = ["14,402", "14402", "14,082", "14082", "12,652", "12652"];

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
