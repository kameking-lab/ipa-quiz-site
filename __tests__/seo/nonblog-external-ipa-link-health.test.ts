import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * CLAUDE.md §8 makes 出典 (source) links a core rule. blog bodies are already
 * guarded (blog-external-link-allowlist), but the *non-blog* crawlable surfaces
 * — the sitewide footer, /about copyright notice, and the JSON-LD on every /q
 * page — also emit outbound IPA links, and those had no automated guard. IPA
 * reorganises its /shiken/ URLs, so a stale path ships as a dead 出典 link on
 * thousands of indexed pages with no test to catch it.
 *
 * Two such links were found dead (HTTP 404, curl 2026-06-03) and fixed:
 *   - lib/seo/question-jsonld.ts  license: /shiken/mondai-kaiotu.html → faq.html
 *   - app/about/page.tsx          copyright: /shiken/kakomondai/copyright.html → faq.html
 * (faq.html is the live IPA page stating 過去問題の使用 terms — verified 200.)
 *
 * This pins the repair so neither dead path can return, and bans the
 * decommissioned jitec.ipa.go.jp host from any rendered (non-gate) surface.
 */

// Crawlable source roots whose string literals reach HTML / JSON-LD.
const SCAN_ROOTS = ["app", "components", "lib"];

// The gate module legitimately references the dead jitec host inside the URL
// builder (whose output is always wrapped by getSafePdfUrl) — it is the
// definition of the gate, not a render site, so it is exempt from the host ban.
const GATE_MODULE = "lib/exam-config.ts";

// Past IPA paths that now 404 — must never reappear in crawlable source.
const DEAD_IPA_PATHS = [
  "/shiken/mondai-kaiotu.html",
  "/shiken/kakomondai/copyright.html",
];

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (/\.(ts|tsx)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

function scanFiles(): { rel: string; text: string }[] {
  const root = process.cwd();
  const files: { rel: string; text: string }[] = [];
  for (const r of SCAN_ROOTS) {
    for (const full of walk(join(root, r))) {
      files.push({ rel: relative(root, full).replace(/\\/g, "/"), text: readFileSync(full, "utf-8") });
    }
  }
  return files;
}

describe("non-blog crawlable surfaces: outbound IPA 出典 link health", () => {
  const files = scanFiles();

  it("contains none of the known-dead IPA paths", () => {
    for (const { rel, text } of files) {
      for (const dead of DEAD_IPA_PATHS) {
        expect(text.includes(dead), `${rel} references dead IPA path ${dead}`).toBe(false);
      }
    }
  });

  it("renders no decommissioned jitec.ipa.go.jp host outside the gate module", () => {
    for (const { rel, text } of files) {
      if (rel === GATE_MODULE) continue;
      expect(text.includes("jitec.ipa.go.jp"), `${rel} emits dead jitec host`).toBe(false);
    }
  });

  it("points the JSON-LD license and /about copyright link at the live faq.html terms", () => {
    const byRel = new Map(files.map((f) => [f.rel, f.text]));
    expect(byRel.get("lib/seo/question-jsonld.ts")).toContain(
      "https://www.ipa.go.jp/shiken/faq.html",
    );
    expect(byRel.get("app/about/page.tsx")).toContain(
      "https://www.ipa.go.jp/shiken/faq.html",
    );
  });
});
