import { writeFileSync } from "node:fs";
import { getAllBlogPosts } from "../data/blog";
import { FEATURE_LANDING_PAGES } from "../data/features";
import { KEYWORD_PAGES } from "../data/keywords";

// Triage only: calculation examples, historical data and editorial plans can
// legitimately match. A hit is not a policy violation or an automatic removal.
const patterns = [
  /全[試験機能・\s]+.{0,12}無料/gu,
  /\d+(?:[〜～~－-]\d+)?\s*倍/gu,
  /\d+(?:[〜～~－-]\d+)?[%％].{0,25}(?:短縮|改善|向上|削減)/gu,
  /(?:学習効率|理解速度|読解スピード|合格率予測).{0,60}/gu,
  /(?:年収|資格手当|運営費).{0,60}/gu,
  /月\s*300\s*円|月\s*3\s*回|AI.{0,20}無制限/gu,
];
const documents = [
  ...getAllBlogPosts().map(p => ({ path: `/blog/${p.slug}`, text: `${p.title}\n${p.description}\n${p.body}` })),
  ...FEATURE_LANDING_PAGES.map(p => ({ path: `/features/${p.slug}`, text: JSON.stringify(p) })),
  ...KEYWORD_PAGES.map(p => ({ path: `/keywords/${p.slug}`, text: JSON.stringify(p) })),
];
const rows = documents.flatMap(document => {
  const matches = [...new Set(patterns.flatMap(pattern => [...document.text.matchAll(pattern)].map(m => m[0])))];
  return matches.length ? [{ path: document.path, matches }] : [];
});
const result = { scope: "All generated blog posts, feature definitions and keyword pages; candidate text requires contextual editorial review.", documentCount: documents.length, candidates: rows };
if (!process.argv[2]) throw new Error("Provide an output JSON path outside the public tree");
writeFileSync(process.argv[2], JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ documentCount: documents.length, candidateDocuments: rows.length }));
