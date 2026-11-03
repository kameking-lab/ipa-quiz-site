import { mkdir, writeFile } from "node:fs/promises";
import { IP_QUESTIONS_2024_CBT_AM } from "../../data/questions/ip/by-year/2024-cbt-am";
import { FE_QUESTIONS_2025_CBT_KAMOKU_A } from "../../data/questions/fe/by-year/2025-cbt-kamoku-a";
import { PackSchema, QuestionSchema, packHash } from "../src/domain";

const output = new URL("../src/packs/", import.meta.url);
await mkdir(output, { recursive: true });
const inventory = [];
for (const [id, source, sourceFile] of [
  ["ip", IP_QUESTIONS_2024_CBT_AM, "data/questions/ip/by-year/2024-cbt-am.ts"],
  ["fe", FE_QUESTIONS_2025_CBT_KAMOKU_A, "data/questions/fe/by-year/2025-cbt-kamoku-a.ts"],
] as const) {
  const questions = source.filter(q => !q.needsReview && !q.hasImage && !q.imageUrls?.length)
    .filter(q => !/(次の図|次の表|図に示|表に示|下図|下表|!\[|<img|https?:\/\/)/.test(q.question + JSON.stringify(q.choices)))
    .flatMap(q => {
      const parsed = QuestionSchema.safeParse(q);
      if (!parsed.success) return [];
      return [{ ...parsed.data,
        sourcePdfUrl: id === "ip"
          ? "https://www3.jitec.ipa.go.jp/JitesCbt/html/openinfo/pdf/questions/2024r06_ip_qs.pdf"
          : "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/tbl5kb0000005r9r-att/2025r07_fe_kamoku_a_qs.pdf",
        sourceAnswerUrl: id === "ip"
          ? "https://www3.jitec.ipa.go.jp/JitesCbt/html/openinfo/pdf/questions/2024r06_ip_ans.pdf"
          : "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/tbl5kb0000005r9r-att/2025r07_fe_kamoku_a_ans.pdf",
      }];
    }).slice(0, 20).sort((a, b) => a.id.localeCompare(b.id, "en"));
  if (questions.length < 10) throw new Error(`Insufficient self-contained questions: ${id}`);
  const pack = PackSchema.parse({
    schema: 1, id, version: 1, updatedAt: "2026-11-03",
    attribution: "出典: IPA 情報処理技術者試験。固定解説は過去問AIが作成した学習用解説で、IPAの公式解説ではありません。",
    rightsUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/", questions,
  });
  await writeFile(new URL(`${id}.json`, output), JSON.stringify(pack, null, 2) + "\n");
  inventory.push({ id, version: 1, count: questions.length, sha256: await packHash(pack),
    sourceFile, sourceQuestionIds: questions.map(q => q.id),
    importedAt: "2026-11-03", rights: "IPA-public", images: "excluded",
    sourceReviewEvidence: "mobile/content-review.json",
    releaseReview: "Original PDF and answer comparison recorded. Owner editorial and distribution review required before submission" });
}
await writeFile(new URL("inventory.json", output), JSON.stringify(inventory, null, 2) + "\n");
console.log(inventory.map(p => `${p.id}: ${p.count} questions`).join("\n"));
