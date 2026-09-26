import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DENKEN2_QUESTIONS } from "@/data/questions/denken2";
import manifest from "@/scripts/denken2-source-manifest.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { getSessionNeighbors } from "@/lib/questions/related";
import { choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { getChoiceKeys } from "@/lib/questions/answers";
import { findQuestionByRoute, parseQuestionRoute, questionPagePath } from "@/lib/seo/question-url";

type Row = {
  examDate: string; subject: string; questionNumber: number; blank: number; question: string;
  choices: Record<string, string>; officialAnswer: string; explanation: string;
  choiceExplanations: Record<string, string>; sourceQuestionPdfUrl: string; sourceAnswerPdfUrl: string;
  figureUrls: string[]; officialReferenceUrls: string[]; sourceAttribution: string; lawReferenceDate: string | null;
};
type Assessment = { unitKey: string; status: string } & Record<string, unknown>;
type Receipt = {
  resolvedModel: string; modelUsage: Record<string, { provider?: string }>; rawResponse: string; rawResponseSha256: string;
  inputHashes: { candidateSha256: Record<string, string>; officialBlanks: string[]; questionPdfSha256: string; answerPdfSha256: string };
  assessment: Assessment[];
};

const IROHA = ["イ", "ロ", "ハ", "ニ", "ホ", "ヘ", "ト", "チ", "リ", "ヌ", "ル", "ヲ", "ワ", "カ", "ヨ"];
const KEYS = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ"];
const ISSUES = ["textIssues", "choiceIssues", "answerIssues", "explanationIssues", "figureIssues", "sourceIssues"];
const root = process.cwd();
const reviewedDir = join(root, "data", "questions", "denken2", "reviewed");

/** Python の json.dumps(row, ensure_ascii=False, sort_keys=True) と同じ直列化。 */
function pythonJson(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return `[${value.map(pythonJson).join(", ")}]`;
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}: ${pythonJson(v)}`).join(", ")}}`;
  }
  return JSON.stringify(value);
}
const sha256 = (data: string | Buffer) => createHash("sha256").update(data).digest("hex");

const session = manifest.sessions[0]!;
const papers = session.subjects;
const files = readdirSync(reviewedDir).filter((name) => name.endsWith(".json")).sort();
const rowsByFile = new Map(files.map((name) => [name.replace(/\.json$/, ""), JSON.parse(readFileSync(join(reviewedDir, name), "utf8")) as Row[]]));

describe("Denken 2 first-stage launch data (2026 power + law)", () => {
  it("pins two official papers, 14 questions and 70 blank units", () => {
    expect(papers.map((paper) => paper.subject).sort()).toEqual(["law", "power"]);
    expect(papers.flatMap((paper) => paper.questions)).toHaveLength(14);
    expect(papers.flatMap((paper) => paper.questions.flatMap((q) => q.blanks))).toHaveLength(70);
    expect(files).toHaveLength(14);
    expect(DENKEN2_QUESTIONS).toHaveLength(70);
    expect(new Set(DENKEN2_QUESTIONS.map((q) => q.id)).size).toBe(70);
    expect(DENKEN2_QUESTIONS.filter(isPracticeReadyQuestion)).toHaveLength(70);
    for (const paper of papers) {
      expect(DENKEN2_QUESTIONS.filter((q) => q.session === paper.session)).toHaveLength(35);
      const pdf = join(root, "docs", "evidence", "denken2", "input", paper.url.split("/").pop()!);
      expect(sha256(readFileSync(pdf)), paper.url).toBe(paper.sha256);
    }
    const answerPdf = join(root, "docs", "evidence", "denken2", "input", session.officialAnswer.url.split("/").pop()!);
    expect(sha256(readFileSync(answerPdf))).toBe(session.officialAnswer.sha256);
  });

  it("binds every published unit to the official answer sheet and its reviewed row", () => {
    for (const q of DENKEN2_QUESTIONS) {
      const paper = papers.find((p) => p.subject === q.subject)!;
      const official = paper.questions.find((item) => item.question === q.qNumber)!;
      const blank = Number(q.part);
      const officialLabel = official.blanks[blank - 1]!;
      const row = rowsByFile.get(`20260830-${q.subject}-q${String(q.qNumber).padStart(2, "0")}`)![blank - 1]!;
      expect(q.id).toBe(`denken2-2026-${q.subject}-q${String(q.qNumber).padStart(2, "0")}-${blank}`);
      expect([q.exam, q.year, q.season, q.session]).toEqual(["denken2", 2026, "primary", paper.session]);
      expect(q.answer, q.id).toBe(KEYS[IROHA.indexOf(officialLabel)]);
      expect(q.officialAnswerNumber, q.id).toBe(officialLabel);
      expect(row.officialAnswer, q.id).toBe(officialLabel);
      expect(q.sourcePdfUrl).toBe(paper.url);
      expect(q.sourceAnswerUrl).toBe(session.officialAnswer.url);
      expect(q.question).toBe(row.question);
      expect(q.explanation).toBe(row.explanation);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourceAttribution).toMatch(/^出典：令和8年度第二種電気主任技術者一次試験(電力|法規)科目[AB]問題問\d\(\d\)。.*改変あり/);
      expect(getChoiceKeys(q.choices)).toEqual(KEYS);
      expect(q.choices).toEqual(Object.fromEntries(IROHA.map((label, i) => [KEYS[i], row.choices[label]])));
      expect(q.choiceExplanations).toEqual(Object.fromEntries(IROHA.map((label, i) => [KEYS[i], row.choiceExplanations[label]])));
      for (const key of KEYS) expect(q.choiceExplanations?.[key as keyof typeof q.choiceExplanations]?.trim().length, `${q.id} ${key}`).toBeGreaterThan(20);
      expect(q.choiceExplanations?.[q.answer as keyof typeof q.choiceExplanations]).toMatch(/^正しい。/);
      expect(q.question).toContain(`［(${blank})］`);
      expect(JSON.stringify(q)).not.toMatch(/\b(?:HOLD|FIX|TODO)\b|要確認|確認待ち|準備中|仮置き|\$/u);
      for (const url of q.imageUrls ?? []) expect(existsSync(join(root, "public", url.slice(1))), url).toBe(true);
      if (q.subject === "law") expect(q.lawReferenceDate).toBe("2026-04-01");
    }
  });

  it("requires a first-party Opus PASS receipt pinning each exact reviewed row", () => {
    for (const [stem, rows] of rowsByFile) {
      const receipt = JSON.parse(readFileSync(join(root, "docs", "evidence", "denken2", "receipts", `${stem}-opus.json`), "utf8")) as Receipt;
      expect(receipt.resolvedModel).toBe("claude-opus-5-5");
      expect(Object.keys(receipt.modelUsage).filter((name) => name.startsWith("claude-"))).toEqual(["claude-opus-5-5"]);
      expect(receipt.modelUsage["claude-opus-5-5"]?.provider).toBe("firstParty");
      const raw = readFileSync(join(root, receipt.rawResponse)).toString("utf8").replace(/\r\n/g, "\n");
      expect(sha256(raw), stem).toBe(receipt.rawResponseSha256);
      const paper = papers.find((p) => p.subject === rows[0]!.subject)!;
      expect(receipt.inputHashes.questionPdfSha256).toBe(paper.sha256);
      expect(receipt.inputHashes.answerPdfSha256).toBe(session.officialAnswer.sha256);
      expect(receipt.inputHashes.officialBlanks).toEqual(paper.questions.find((q) => q.question === rows[0]!.questionNumber)!.blanks);
      for (const row of rows) {
        const key = `q${String(row.questionNumber).padStart(2, "0")}-${row.blank}`;
        expect(receipt.inputHashes.candidateSha256[key], `${stem} ${key}`).toBe(sha256(pythonJson(row)));
        const assessment = receipt.assessment.find((a) => a.unitKey === key)!;
        expect(assessment.status, `${stem} ${key}`).toBe("PASS");
        for (const name of ISSUES) expect(assessment[name] ?? [], `${stem} ${key} ${name}`).toEqual([]);
      }
    }
  });

  it("gives each blank a distinct playable route and orders blanks within a question", () => {
    const paths = DENKEN2_QUESTIONS.map(questionPagePath);
    expect(new Set(paths).size).toBe(70);
    expect(paths).toContain("/q/denken2/2026-primary/houki/q1-3");
    for (const [index, path] of paths.entries()) {
      const [, , exam, yearSeason, section, qnum] = path.split("/");
      expect(findQuestionByRoute(DENKEN2_QUESTIONS, { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! })?.id, path).toBe(DENKEN2_QUESTIONS[index]!.id);
    }
    expect(parseQuestionRoute({ exam: "denken3", yearSeason: "2026-primary", section: "houki", qnum: "q1-3" })).toBeNull();
    expect(parseQuestionRoute({ exam: "denken2", yearSeason: "2026-primary", section: "houki", qnum: "q1a" })).toBeNull();
    const first = DENKEN2_QUESTIONS.find((q) => q.id === "denken2-2026-law-q01-1")!;
    const second = DENKEN2_QUESTIONS.find((q) => q.id === "denken2-2026-law-q01-2")!;
    expect(getSessionNeighbors(first, DENKEN2_QUESTIONS).next?.id).toBe(second.id);
    expect(getSessionNeighbors(second, DENKEN2_QUESTIONS).prev?.id).toBe(first.id);
    expect(questionNumberLabel(second)).toBe("1(2)");
  });

  it("shows the official iroha labels for all 15 choices", () => {
    expect(KEYS.map((key) => choiceDisplayLabel("denken2", key as never))).toEqual(IROHA.map((label) => `(${label})`));
    expect(choiceDisplayLabel("denken3", "ア")).toBe("(1)");
    expect(choiceDisplayLabel("ap", "サ")).toBe("サ");
  });
});
