import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { benrishiPaperSchema, BENRISHI_CATEGORIES, BENRISHI_SUBJECTS } from "../../data/qualification-staging/benrishi/schema";

export function validateBenrishiPaper(input: unknown, keys: Record<string, number[]>) {
  const paper = benrishiPaperSchema.parse(input);
  let offset = 0;
  for (const [si, subject] of BENRISHI_SUBJECTS.entries()) {
    const count = si === 0 ? 20 : 10;
    if (keys[subject]?.length !== count) throw new Error(`Missing official keys: ${subject}`);
    for (let i = 0; i < count; i++) {
      const q = paper.questions[offset + i];
      const base = `https://www.jpo.go.jp/news/benrishi/shiken-mondai/`;
      if (q.id !== `benrishi-${paper.year}-${subject}-${String(i + 1).padStart(2, "0")}` || q.number !== i + 1 || q.category !== BENRISHI_CATEGORIES[si]) throw new Error(`Question identity/order: ${q.id}`);
      if (q.correctChoice !== keys[subject][i] || q.officialAnswerNumber !== String(q.correctChoice)) throw new Error(`Official answer mismatch: ${q.id}`);
      if (q.choices.some((c, i) => c.number !== i + 1) || q.choiceExplanations.some((c, i) => c.number !== i + 1)) throw new Error(`Choice order: ${q.id}`);
      if (new Set(q.choices.map(c => c.text)).size !== 5 || new Set(q.choiceExplanations.map(c => c.explanation)).size !== 5) throw new Error(`Duplicate choice/rationale: ${q.id}`);
      if (q.sourceQuestionUrl !== `${base}document/${paper.year}tanto/question.pdf` || q.sourcePdfUrl !== q.sourceQuestionUrl || q.sourceAnswerUrl !== `${base}document/${paper.year}tanto/answer.pdf` || q.sourcePageUrl !== `${base}${paper.year}tanto.html`) throw new Error(`Source mismatch: ${q.id}`);
      if ((paper.year === 2026) !== (q.lawReferenceDate === "2026-05-17")) throw new Error(`Law date evidence mismatch: ${q.id}`);
      const expectedImages = q.sourcePages.map(p => `data/qualification-staging/benrishi/assets/${paper.year}-question-p${String(p).padStart(2,"0")}.png`);
      if (JSON.stringify(q.sourceImages) !== JSON.stringify(expectedImages)) throw new Error(`Page image coverage: ${q.id}`);
      const labels = [...q.text.matchAll(/\(([ｲﾛﾊﾆﾎ])\)/g)].map(m => m[1].normalize("NFKC"));
      if (labels.length && (!q.statementExplanations.length || ["イ","ロ","ハ","ニ","ホ"].some(label => !q.statementExplanations.some(s => s.label === label)))) throw new Error(`Missing statement rationale: ${q.id}`);
    }
    offset += count;
  }
  const pages = [...new Set(paper.questions.flatMap(q => q.sourcePages))].sort((a,b) => a-b);
  if (pages.length !== 64 || pages.some((p,i) => p !== i+2)) throw new Error("Missing source pages");
  return paper;
}

const digest = (data: string | Buffer) => createHash("sha256").update(data).digest("hex");
const canonical = (text: string) => text.normalize("NFKC").replace(/\s+/g, "");
export function validateBenrishiStaging(root = process.cwd()): number {
  const dir = join(root, "data/qualification-staging/benrishi");
  const read = (file: string) => JSON.parse(readFileSync(join(dir,file), "utf8"));
  const keys = read("official-answer-keys.json");
  const manifest = read("source-manifest.json");
  const proof = read("source-audit.json");
  if (manifest.publicAllowed !== false || manifest.unavailablePdfUrls.length || proof.mismatches.length) throw new Error("Invalid source/gate audit");
  let count = 0;
  for (const year of [2025,2026]) {
    const paper = validateBenrishiPaper(read(`${year}.json`), keys[year]);
    for (const [kind, hash] of [["question",paper.sourceQuestionSha256],["answer",paper.sourceAnswerSha256]]) {
      const doc = manifest.downloadedSources.find((d: { year: number; kind: string }) => d.year === year && d.kind === kind);
      if (!doc || doc.status !== 200 || doc.method !== "GET" || doc.sha256 !== hash) throw new Error(`PDF provenance: ${year}/${kind}`);
    }
    for (const q of paper.questions) {
      const record = proof.questions.find((p: { id: string }) => p.id === q.id);
      const content = q.text + q.choices.map(c => c.number + c.text).join("");
      if (!record || record.canonicalSha256 !== digest(canonical(content))) throw new Error(`Independent transcription drift: ${q.id}`);
    }
    count += paper.questions.length;
  }
  if (manifest.downloadedSources.length !== 4 || manifest.assets.length !== 130 || new Set(manifest.assets.map((a: {path:string}) => a.path)).size !== 130) throw new Error("Incomplete source inventory");
  for (const a of manifest.assets) {
    if (!/^data\/qualification-staging\/benrishi\/assets\/[0-9-]+(?:question|answer)-p[0-9]+\.png$/.test(a.path)) throw new Error(`Invalid asset path: ${a.path}`);
    const bytes = readFileSync(join(root,a.path));
    if (digest(bytes) !== a.sha256 || bytes.subarray(0,8).toString("hex") !== "89504e470d0a1a0a") throw new Error(`Asset drift: ${a.path}`);
  }
  return count;
}
