import { describe, expect, it } from "vitest";

import { getAllBlogPosts } from "@/data/blog";

// CLAUDE.md §8 makes 出典 (source) links a core rule: explanations and articles
// must link back to the IPA original. Internal links are already guarded
// (scripts/audit-internal-links + nonblog-internal-link-resolvability), but the
// *outbound* links that blog bodies use as 出典 had no automated guard. IPA
// periodically reorganises its /shiken/ URLs, so a stale or typo'd path ships as
// a dead 出典 link — a credibility and SEO hit that no test would catch.
//
// CI cannot reach the network, so this enforces three cheap invariants:
//   1. every external link is https (never insecure http);
//   2. every host is on a small allowlist of vetted official domains;
//   3. the exact set of distinct external URLs matches a pinned allowlist.
// (3) is the "崩れたら落ちる" lever: adding a new external link — or editing an
// existing IPA path — fails this test until the author verifies the URL resolves
// (HTTP 200, no redirect) and updates EXPECTED_EXTERNAL_URLS below.
//
// Verified resolving (curl, HTTP 200, no redirect) on 2026-06-03:
const EXPECTED_EXTERNAL_URLS = [
  "https://www.ipa.go.jp/shiken/",
  "https://www.ipa.go.jp/shiken/2026/ap_koudo_sc-cbt.html",
  "https://www.ipa.go.jp/shiken/about/koudo_menjo.html",
  "https://www.ipa.go.jp/shiken/about/menjo-fe.html",
  "https://www.ipa.go.jp/shiken/goukaku/index.html",
  "https://www.ipa.go.jp/shiken/goukaku/shinsei_01.html",
  "https://www.ipa.go.jp/shiken/jitecinquiry_handicapped.html",
  "https://www.ipa.go.jp/shiken/kubun/list.html",
  "https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html",
] as const;

const ALLOWED_HOSTS = new Set(["www.ipa.go.jp"]);

// In markdown link form `[text](url)`, the URL ends at the closing paren, so the
// character class excludes `)`. Trailing sentence punctuation is stripped below.
const URL_RE = /https?:\/\/[^\s)\]"'<>]+/g;

function collectExternalUrls(): string[] {
  const urls = new Set<string>();
  for (const post of getAllBlogPosts()) {
    for (const raw of post.body.match(URL_RE) ?? []) {
      urls.add(raw.replace(/[.,、。]+$/, ""));
    }
  }
  return [...urls].sort();
}

describe("blog body outbound 出典 links", () => {
  const urls = collectExternalUrls();

  it("uses https for every external link (no insecure http)", () => {
    for (const u of urls) {
      expect(u.startsWith("https://"), `insecure or malformed: ${u}`).toBe(true);
    }
  });

  it("only links to allowlisted official hosts", () => {
    for (const u of urls) {
      const host = new URL(u).host;
      expect(
        ALLOWED_HOSTS.has(host),
        `unvetted external host ${host} (${u})`,
      ).toBe(true);
    }
  });

  it("matches the vetted external-URL allowlist exactly", () => {
    // If this fails, a blog body added or changed an external link. Verify the
    // new URL resolves (HTTP 200, no redirect) against the IPA site, then update
    // EXPECTED_EXTERNAL_URLS so future 出典 links stay vetted.
    expect(urls).toEqual([...EXPECTED_EXTERNAL_URLS].sort());
  });
});
