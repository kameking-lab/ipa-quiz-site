import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DOKUGEKI_CHIBA_REGISTRATION as corpus } from "@/data/qualification-staging/dokugeki-chiba";

/** Dedicated private schema: never coerce an unregistered slug into ExamCode. */
export function validateDokugekiChiba(): void {
  const fail = (message: string): never => { throw new Error(`dokugeki-chiba: ${message}`); };
  if (corpus.publicAllowed !== false || corpus.sources.publicAllowed !== false) fail("publication gate");
  if (corpus.questions.length !== 480 || new Set(corpus.questions.map(q => q.id)).size !== 480) fail("480 unique columns required");
  if (corpus.sources.downloadedSources.length !== 12 || corpus.sources.unavailablePdfUrls.length !== 0) fail("source inventory");
  for (const year of [2025, 2026]) for (const track of ["ippan", "nougyou", "tokutei"]) {
    const edition = corpus.questions.filter(q => q.year === year && q.track === track);
    const key = corpus.officialAnswers.find(t => t.year === year && t.track === track);
    if (!key || edition.length !== 80 || key.answers.length !== 80) fail(`${year}/${track} count`);
    for (const [i, q] of edition.entries()) {
      if (q.qNumber !== i+1 || q.id !== `dokugeki-chiba-${year}-${track}-${String(i+1).padStart(2,"0")}`) fail(q.id);
      if (q.officialAnswerNumber !== key!.answers[i] || q.scoring.correctChoice !== key!.answers[i]) fail(`${q.id} official answer`);
      if (q.sourceAnswerUrl !== key!.sourceAnswerUrl || q.sourceImages.length !== q.sourcePages.length) fail(`${q.id} provenance`);
      if (q.targetBlankNumber !== null && (q.targetBlankNumber !== q.qNumber || !q.sharedPrompt.match(new RegExp(`[（(]\\s*${q.qNumber}\\s*[）)]`)))) fail(`${q.id} cloze binding`);
      if (new Set(q.choiceExplanations).size !== 5) fail(`${q.id} repeated rationales`);
      for (const [j, note] of q.choiceExplanations.entries()) {
        if (!note.startsWith(j+1 === q.officialAnswerNumber ? "正解。" : "不正解。")) fail(`${q.id} choice ${j+1}`);
      }
      if (q.needsReview && !q.sourceIssue) fail(`${q.id} unexplained review flag`);
      const doc = corpus.sources.downloadedSources.find(d => d.url === q.sourcePdfUrl);
      if (!doc || doc.year !== year || doc.track !== track || doc.kind !== "mondai") fail(`${q.id} wrong source`);
      for (const [j, path] of q.sourceImages.entries()) {
        const asset = corpus.sources.assets.find(a => a.path === path);
        if (!asset || asset.pdfUrl !== q.sourcePdfUrl || asset.pdfPage !== q.sourcePages[j]) fail(`${q.id} page binding`);
      }
    }
  }
  const usedImages = new Set(corpus.questions.flatMap(q => q.sourceImages));
  if (usedImages.size !== 228 || corpus.sources.assets.length !== 228) fail("all 228 problem pages required");
  for (const asset of corpus.sources.assets) {
    if (!usedImages.has(asset.path)) fail(`${asset.path} unused`);
    const data = readFileSync(join(process.cwd(), asset.path));
    if (createHash("sha256").update(data).digest("hex") !== asset.sha256) fail(`${asset.path} hash`);
    if (data.toString("ascii",0,4) !== "RIFF" || data.toString("ascii",8,12) !== "WEBP") fail(`${asset.path} format`);
  }
  for (const doc of corpus.sources.downloadedSources) {
    if (doc.status !== 200 || doc.bytes <= 0 || !/^[a-f0-9]{64}$/.test(doc.sha256)) fail(`${doc.file} GET evidence`);
  }
  console.log(`Validated ${corpus.questions.length} private dokugeki-chiba questions; 6 editions, 2400 choice explanations, 228 source pages. publicAllowed=false`);
}
