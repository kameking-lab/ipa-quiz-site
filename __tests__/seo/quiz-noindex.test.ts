import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * /quiz canonical / robots — source-level guard (構造的激辛 SEO-1 / 致命傷④).
 *
 * Pre-fix: `alternates: { canonical: "/quiz" }` + `robots: { index: true, ... }`
 * while next.config.ts permanently redirected bare /quiz to "/" — Google resolved
 * the declared canonical, followed the redirect to "/", and consolidated every
 * /quiz?mode=… page's signals into the homepage while `index: true` was dead.
 *
 * We scan the source rather than importing the metadata: the page transitively
 * imports pool-server.ts (`import "server-only"`), so a runtime import is gated
 * off in test environments. Behavioural confirmation that Next.js actually
 * emits these signals in rendered HTML lives in tests/e2e/quiz-canonical.spec.ts.
 */
describe("/quiz metadata — honest SEO signals (source guard)", () => {
  const src = readFileSync(join("app", "quiz", "page.tsx"), "utf8");

  // Extract the literal `export const metadata: Metadata = { ... };` block once
  // so all assertions share the same parsing logic.
  const block = src.match(
    /export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{([\s\S]*?)\n\}\s*;/,
  );

  it("exports a metadata object", () => {
    expect(block, "metadata = { ... } block must be present").not.toBeNull();
  });

  it("declares robots.index = false (noindex)", () => {
    expect(block![1]).toMatch(/robots\s*:\s*\{[^}]*index\s*:\s*false/);
  });

  it("declares robots.follow = true (link equity still flows out)", () => {
    expect(block![1]).toMatch(/robots\s*:\s*\{[^}]*follow\s*:\s*true/);
  });

  it("does NOT declare robots.index = true (the self-defeating pre-fix)", () => {
    expect(block![1]).not.toMatch(/robots\s*:\s*\{[^}]*index\s*:\s*true/);
  });

  it("canonical points to '/' (the 308 destination), not '/quiz' (self-redirect)", () => {
    // Match canonical: "/" exactly. Reject any /quiz path including /quiz with
    // a trailing char.
    expect(block![1]).toMatch(/canonical\s*:\s*["']\/["']/);
    expect(block![1]).not.toMatch(/canonical\s*:\s*["']\/quiz/);
  });
});
