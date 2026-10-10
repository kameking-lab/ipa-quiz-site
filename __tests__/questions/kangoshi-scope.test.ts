import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";
import { EXAM_DESCRIPTIONS, examMetaDescription } from "@/lib/seo/exam-meta";

const evidence = path.join(process.cwd(), "docs/evidence/nurse10-20261010");
const evidenceQ6to10 = path.join(process.cwd(), "docs/evidence/nurse-q6-10-20261010");
const evidenceQ11to25 = path.join(process.cwd(), "docs/evidence/nurse-q11-25-20261010");
const evidenceQ26to50 = path.join(process.cwd(), "docs/evidence/nurse-q26-50-20261010");
const readJson = <T,>(file: string, dir = evidence): T => JSON.parse(readFileSync(path.join(dir, file), "utf8")) as T;

type Transcript = { round: number; session: string; qNumber: number; stem: string; choices: Record<string, string>; officialAnswer: string; pdfPage?: number; figure?: { kind: string; file?: string; files?: string[] } }[];
const ALL_KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const YEAR_OF_ROUND: Record<number, number> = { 115: 2025, 114: 2024 };
const SCOPE = "第115・114回 午前 問1〜75のうち149問収録";
const norm = (s: string) => s.normalize("NFKC").replace(/\s+/g, "");
const transcriptA = readJson<Transcript>("transcriptA.json");
const transcriptB = readJson<Transcript>("transcriptB.json");
const transcriptQ6to10 = readJson<Transcript>("transcript-q6-10.json", evidenceQ6to10);
const transcriptQ11to25 = readJson<Transcript>("transcript-q11-25.json", evidenceQ11to25);
const transcriptQ26to50 = readJson<Transcript>("transcript-q26-50.json", evidenceQ26to50);
const holdQ26to50 = readJson<{ round: number; qNumber: number; officialAnswerRow: string; notice: string }[]>("hold-115-am32.json", evidenceQ26to50);

describe("看護師国家試験（第115回・第114回 午前 問1〜75。第115回問32は採点除外のため未収録）", () => {
  it("範囲: 午前 問1〜75から149問・600肢を収録（第115回問32は未収録）", () => {
    const keys = KANGOSHI_QUESTIONS.map((q) => `${q.year}-${q.session}-${q.qNumber}`).sort();
    expect(keys).toEqual([2024, 2025].flatMap((y) => Array.from({ length: 75 }, (_, i) => `${y}-am-${i + 1}`)).filter((k) => k !== "2025-am-32").sort());
    expect(KANGOSHI_QUESTIONS.reduce((sum, q) => sum + Object.keys(q.choices ?? {}).length, 0)).toBe(600);
    expect(ALL_QUESTIONS.filter((q) => q.exam === "kangoshi")).toHaveLength(149);
    expect(new Set(KANGOSHI_QUESTIONS.map((q) => q.id)).size).toBe(149);
    const fiveChoice = KANGOSHI_QUESTIONS.filter((q) => Object.keys(q.choices ?? {}).length === 5).map((q) => q.id).sort();
    expect(fiveChoice).toEqual(["kangoshi-2025-annual-am-q24", "kangoshi-2025-annual-am-q25", "kangoshi-2025-annual-am-q74", "kangoshi-2025-annual-am-q75"]);
    expect(EXAM_CONFIGS.kangoshi.yearRange).toEqual({ start: 2024, end: 2025 });
  });

  it("転記: 独立2転記（A・B）が本文・全肢・正答で一致し、公開文面はB稿と一致する", () => {
    expect(transcriptA).toHaveLength(10);
    expect(transcriptB).toHaveLength(10);
    for (const b of transcriptB) {
      const a = transcriptA.find((x) => x.round === b.round && x.qNumber === b.qNumber && x.session === b.session)!;
      expect(a, `${b.round}-${b.qNumber}`).toBeDefined();
      expect(norm(a.stem)).toBe(norm(b.stem));
      for (const c of ["1", "2", "3", "4"] as const) expect(norm(a.choices[c])).toBe(norm(b.choices[c]));
      expect(a.officialAnswer).toBe(b.officialAnswer);

      const q = KANGOSHI_QUESTIONS.find((x) => x.year === YEAR_OF_ROUND[b.round] && x.qNumber === b.qNumber)!;
      expect(q.question).toBe(b.stem);
      KEYS.forEach((k, i) => expect(q.choices?.[k]).toBe(b.choices[String(i + 1) as "1"]));
      expect(q.answer).toBe(KEYS[Number(b.officialAnswer) - 1]);
      expect(q.officialAnswerNumber).toBe(b.officialAnswer);
    }
  });

  it("転記（問6〜10）: 公開文面・正答・ページ位置が証跡の転記と一致する", () => {
    expect(transcriptQ6to10).toHaveLength(10);
    for (const t of transcriptQ6to10) {
      expect(t.qNumber).toBeGreaterThanOrEqual(6);
      const q = KANGOSHI_QUESTIONS.find((x) => x.year === YEAR_OF_ROUND[t.round] && x.qNumber === t.qNumber)!;
      expect(q.question).toBe(t.stem);
      KEYS.forEach((k, i) => expect(q.choices?.[k]).toBe(t.choices[String(i + 1) as "1"]));
      expect(q.answer).toBe(KEYS[Number(t.officialAnswer) - 1]);
      expect(q.officialAnswerNumber).toBe(t.officialAnswer);
      expect(q.sourcePdfUrl.endsWith(`#page=${t.pdfPage}`)).toBe(true);
      expect(q.sourceAttribution).toContain(`問題PDF ${t.pdfPage}ページ`);
    }
  });

  it("転記（問11〜25）: 公開文面・正答・ページ位置・図が証跡の転記と一致する", () => {
    expect(transcriptQ11to25).toHaveLength(30);
    expect(transcriptQ11to25.reduce((sum, t) => sum + Object.keys(t.choices).length, 0)).toBe(122);
    for (const t of transcriptQ11to25) {
      expect(t.qNumber).toBeGreaterThanOrEqual(11);
      const q = KANGOSHI_QUESTIONS.find((x) => x.year === YEAR_OF_ROUND[t.round] && x.qNumber === t.qNumber)!;
      const keys = ALL_KEYS.slice(0, Object.keys(t.choices).length);
      expect(q.question).toBe(t.stem);
      keys.forEach((k, i) => expect(q.choices?.[k]).toBe(t.choices[String(i + 1)]));
      expect(Object.keys(q.choices ?? {})).toHaveLength(keys.length);
      expect(q.answer).toBe(keys[Number(t.officialAnswer) - 1]);
      expect(q.officialAnswerNumber).toBe(t.officialAnswer);
      expect(q.sourcePdfUrl.endsWith(`#page=${t.pdfPage}`)).toBe(true);
      expect(q.sourceAttribution).toContain(`問題PDF ${t.pdfPage}ページ`);
      const figureFiles = t.figure ? (t.figure.files ?? [t.figure.file!]) : [];
      const urls = [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {})];
      expect(urls.map((u) => path.basename(u!)).sort()).toEqual([...figureFiles].sort());
      for (const u of urls) expect(existsSync(path.join(process.cwd(), "public", u!)), u).toBe(true);
    }
    const fig = (round: number, n: number) => transcriptQ11to25.find((t) => t.round === round && t.qNumber === n)!;
    expect([fig(115, 13), fig(115, 16), fig(115, 22), fig(114, 13)].map((t) => t.officialAnswer)).toEqual(["1", "2", "4", "4"]);
    expect(KANGOSHI_QUESTIONS.find((q) => q.id === "kangoshi-2024-annual-am-q13")!.officialReferenceUrls).toContain(
      "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-05a_02.pdf#page=4",
    );
  });

  it("転記（問26〜50）: 49問の公開文面・正答・ページ位置・図が証跡と一致し、第115回問32はHOLDのまま未収録", () => {
    expect(transcriptQ26to50).toHaveLength(49);
    expect(transcriptQ26to50.reduce((sum, t) => sum + Object.keys(t.choices).length, 0)).toBe(196);
    for (const t of transcriptQ26to50) {
      const q = KANGOSHI_QUESTIONS.find((x) => x.year === YEAR_OF_ROUND[t.round] && x.qNumber === t.qNumber)!;
      expect(q.question).toBe(t.stem);
      KEYS.forEach((k, i) => expect(q.choices?.[k]).toBe(t.choices[String(i + 1)]));
      expect(q.answer).toBe(KEYS[Number(t.officialAnswer) - 1]);
      expect(q.officialAnswerNumber).toBe(t.officialAnswer);
      expect(q.sourcePdfUrl.endsWith(`#page=${t.pdfPage}`)).toBe(true);
      const figureFiles = t.figure ? (t.figure.files ?? [t.figure.file!]) : [];
      const urls = [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {})];
      expect(urls.map((u) => path.basename(u!)).sort()).toEqual([...figureFiles].sort());
      for (const u of urls) expect(existsSync(path.join(process.cwd(), "public", u!)), u).toBe(true);
    }
    const fig = (round: number, n: number) => transcriptQ26to50.find((t) => t.round === round && t.qNumber === n)!;
    expect([fig(115, 34), fig(114, 30), fig(114, 39), fig(114, 41)].map((t) => t.officialAnswer)).toEqual(["3", "3", "1", "2"]);
    expect(holdQ26to50).toEqual([expect.objectContaining({ round: 115, qNumber: 32, officialAnswerRow: "A032: blank" })]);
    expect(holdQ26to50[0].notice).toMatch(/kangoshi_am32\.pdf$/);
    expect(KANGOSHI_QUESTIONS.some((q) => q.year === 2025 && q.qNumber === 32)).toBe(false);
  });

  it("解説・出典: 全肢に理由があり、正答肢だけが「正しい」。出典と加工表示を各問に持つ", () => {
    for (const q of KANGOSHI_QUESTIONS) {
      const round = q.year === 2025 ? 115 : 114;
      const keys = Object.keys(q.choices ?? {}) as ChoiceKey[];
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual([...keys].sort());
      for (const k of keys) {
        const text = q.choiceExplanations![k]!;
        expect(text.startsWith(k === q.answer ? "正しい" : "誤り"), `${q.id} ${k}`).toBe(true);
        expect(text.length).toBeGreaterThan(30);
      }
      expect(q.sourceAttribution).toContain(`第${round}回看護師国家試験`);
      expect(q.sourceAttribution).toContain(`午前 問${q.qNumber}`);
      expect(q.sourceAttribution).toContain("加工");
      expect(q.sourceAttribution).toContain("厚生労働省とは関係ありません");
      expect(q.sourcePdfUrl).toMatch(round === 115 ? /tp260424-05a_01\.pdf(#page=\d+)?$/ : /tp250428-05a_01\.pdf(#page=\d+)?$/);
      expect(q.sourceAnswerUrl).toMatch(round === 115 ? /tp260424-05seitou\.pdf(#page=1)?$/ : /tp250428-05seitou\.pdf(#page=1)?$/);
      expect(q.license).toBe("MHLW-attributed");
      expect(isPracticeReadyQuestion(q)).toBe(true);
    }
  });

  it("表示: 選択肢は原本どおり 1〜5 の番号で示す", () => {
    expect(ALL_KEYS.map((k) => choiceDisplayLabel("kangoshi", k))).toEqual(["1", "2", "3", "4", "5"]);
    expect(usesNumberedChoices("kangoshi")).toBe(true);
  });

  it("収録範囲の表示: 午前 問1〜75のうち149問であることと採点除外問題の未収録を明示し、全試験対応をうたわない", () => {
    const entry = getQualificationByExamCode("kangoshi")!;
    expect(entry.status).toBe("live");
    expect(entry.reuseSummary).toContain(SCOPE);
    expect(entry.reuseSummary).not.toMatch(/許諾(を)?取得済み/);
    const copies = [entry.reuseSummary, EXAM_DESCRIPTIONS.kangoshi ?? "", examMetaDescription("kangoshi", 149)];
    for (const text of copies) {
      expect(text).not.toMatch(/全\s*240\s*問|全問(収録|対応)|全試験対応|全回分/);
    }
    expect(EXAM_DESCRIPTIONS.kangoshi).toContain(SCOPE);
    expect(EXAM_DESCRIPTIONS.kangoshi).toContain("問32は厚生労働省が採点対象から除外したため収録していません");
  });

  it("査読: 独立一次資料査読がPASSで、blockingの未解決指摘はない", () => {
    const review = readJson<{ verdict: string; findings: { severity: string; resolution?: string }[] }>("review.json");
    expect(review.verdict).toBe("PASS");
    expect(review.findings.filter((f) => f.severity === "blocking" && !f.resolution)).toHaveLength(0);
  });
});
