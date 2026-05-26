/**
 * Production sitemap 404 sampler. Fetches the live sitemap index, walks each
 * child sitemap, HEAD-samples URLs, and reports the status tally + any non-200.
 *
 * Usage:
 *   pnpm tsx scripts/sample-sitemap-404.ts [--base=https://www.kakomon-ai.jp] [--per=80]
 *
 * This is a monitoring/ops tool (not part of the app build). The deterministic
 * guarantee that the *generated* sitemap only emits resolvable URLs lives in
 * __tests__/seo/sitemap-resolvability.test.ts; this script verifies the live
 * deploy and helps watch the GSC 404 count drop after a recrawl.
 */
const BASE =
  process.argv.find((a) => a.startsWith("--base="))?.slice(7) ??
  "https://www.kakomon-ai.jp";
const PER = Number(process.argv.find((a) => a.startsWith("--per="))?.slice(6) ?? 80);

async function text(url: string): Promise<string> {
  const r = await fetch(url, { headers: { "user-agent": "kakomon-sitemap-audit" } });
  return r.text();
}

function locs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function sample<T>(arr: T[], n: number): T[] {
  if (arr.length <= n) return arr;
  const step = Math.ceil(arr.length / n);
  return arr.filter((_, i) => i % step === 0);
}

async function headStatus(url: string): Promise<number> {
  try {
    const r = await fetch(url, { method: "HEAD" });
    return r.status;
  } catch {
    return 0;
  }
}

async function main(): Promise<void> {
  const index = await text(`${BASE}/sitemap.xml`);
  const children = locs(index);
  console.log(`Sitemap index: ${children.length} child sitemaps`);

  const tally: Record<number, number> = {};
  const bad: string[] = [];
  for (const child of children) {
    const urls = locs(await text(child));
    const picked = sample(urls, PER);
    console.log(`  ${child} — ${urls.length} urls, sampling ${picked.length}`);
    for (const u of picked) {
      const s = await headStatus(u);
      tally[s] = (tally[s] ?? 0) + 1;
      if (s !== 200) bad.push(`${s} ${u}`);
    }
  }
  console.log("Status tally:", tally);
  if (bad.length > 0) {
    console.log("Non-200:");
    for (const b of bad.slice(0, 200)) console.log("  " + b);
    process.exitCode = 1;
  } else {
    console.log("All sampled URLs returned 200.");
  }
}

void main();
