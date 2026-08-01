import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

/**
 * Codegen scripts that persist essay / 午後 (afternoon) question data must NOT
 * write dead `jitec.ipa.go.jp` 出典 URLs at rest. That host is decommissioned
 * (NXDOMAIN as of 2026-06), so every stored value pointing there is a dead
 * 出典 link. The serve-time gate (getSafePdfUrl, s106/s107) degrades these to
 * the live IPA index, but the generators must do the same so a re-run does not
 * re-inject dead links into the data layer — matching CLAUDE.md §8.
 *
 * The local URL builders still construct a jitec deep URL (kept so the path can
 * be deep-remapped under HD-14), so this pin asserts the builder output is
 * always wrapped in getSafePdfUrl. A revert that emits the raw jitec URL fails.
 *
 * NOTE: scripts/fetch-ipa-pdfs.ts intentionally uses the raw deep URL to
 * *download* PDFs and is out of scope (it must not be gated).
 */
const GATED_CODEGEN = [
  "scripts/generate-essays-new-year.ts",
  "scripts/parse-afternoon/parse-ap-afternoon.ts",
] as const;

describe("essay/afternoon codegen gates persisted 出典 PDF URLs", () => {
  for (const rel of GATED_CODEGEN) {
    const src = readFileSync(join(process.cwd(), rel), "utf-8");

    it(`${rel} imports getSafePdfUrl from @/lib/exam-config`, () => {
      expect(src).toMatch(
        /import\s*\{[^}]*\bgetSafePdfUrl\b[^}]*\}\s*from\s*"@\/lib\/exam-config"/,
      );
    });

    it(`${rel} routes the persisted pdfUrl through getSafePdfUrl`, () => {
      // The jitec deep URL builder result must be wrapped, not stored raw.
      expect(src).toMatch(/getSafePdfUrl\(\s*(?:pdfUrlFor|buildPdfUrl)\(/);
    });
  }
});
