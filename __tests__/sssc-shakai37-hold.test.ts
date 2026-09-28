import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { SHAKAI_QUESTIONS } from "@/data/questions/shakai";
import { EXAM_CONFIGS } from "@/lib/exam-config";

const report = path.join(process.cwd(), "reports/sssc-shakai37-20260928");
const readJson = <T,>(name: string): T => JSON.parse(readFileSync(path.join(report, name), "utf8")) as T;
type SourceQuestion = {
  number: number;
  subject: string;
  half: "am" | "pm";
  stem: string;
  choices: string[];
  pdfFile: string;
  pdfPage: number;
};
type Source = {
  exam: string;
  sourceFiles: Record<string, string>;
  htmlFiles: Record<string, string>;
  normalizations: Array<{ op: string; pdf?: string; html?: string; rendered?: string; file?: string; page?: number }>;
  questions: SourceQuestion[];
};

describe("第37回社会福祉士: 一次資料の準備と公開HOLD", () => {
  const source = readJson<Source>("source-transcription.json");
  const keys = readJson<{ sourceFile: { sha256: string }; answers: Record<string, number[]> }>("answer-keys.json");
  const manifest = readJson<{ files: Record<string, { url: string; sha256: string }>; examDate: string; round: number; fiscalYear: number }>("sources.json");

  it("19科目・全129問・全5肢が公式PDFと読み上げHTMLの文字照合を通る", () => {
    expect(source.exam).toBe("shakai37");
    expect(source.questions.map((q) => q.number)).toEqual(Array.from({ length: 129 }, (_, i) => i + 1));
    expect(new Set(source.questions.map((q) => q.subject)).size).toBe(19);
    expect(source.questions.filter((q) => q.half === "am")).toHaveLength(84);
    expect(source.questions.filter((q) => q.half === "pm")).toHaveLength(45);
    expect(Object.keys(source.sourceFiles)).toHaveLength(19);
    expect(Object.keys(source.htmlFiles)).toHaveLength(2);
    for (const [file, hash] of Object.entries(source.sourceFiles)) {
      expect(manifest.files[file]?.sha256, file).toBe(hash);
      expect(manifest.files[file]?.url, file).toBe(`https://www.sssc.or.jp/shakai/past_exam/pdf/no37/${file}`);
    }
    for (const [file, hash] of Object.entries(source.htmlFiles)) {
      expect(manifest.files[file]?.sha256, file).toBe(hash);
    }
    for (const q of source.questions) {
      expect(q.choices, String(q.number)).toHaveLength(5);
      expect(q.pdfFile in source.sourceFiles, String(q.number)).toBe(true);
      expect(q.pdfPage, String(q.number)).toBeGreaterThan(0);
      expect(q.stem, String(q.number)).toContain(`${keys.answers[String(q.number)]?.length}つ選びなさい`);
    }
    expect(source.normalizations).toEqual([
      { op: "pdf-glyph-map", pdf: "伷", html: "梗", rendered: "梗", file: "ss_pm_01_37.pdf", page: 5 },
      { op: "stem-continuation-in-dd", number: 120 },
    ]);
  });

  it("公式正答129件・二肢選択32件を照合し、未承認の年度は公開しない", () => {
    expect(manifest).toMatchObject({ round: 37, fiscalYear: 2024, examDate: "2025-02-02" });
    expect(keys.sourceFile.sha256).toBe(manifest.files["s_kijun_seitou.pdf"]?.sha256);
    expect(Object.keys(keys.answers)).toHaveLength(129);
    expect(Object.values(keys.answers).filter((answer) => answer.length === 2)).toHaveLength(32);
    for (const [number, answer] of Object.entries(keys.answers)) {
      expect(answer.every((choice) => Number.isInteger(choice) && choice >= 1 && choice <= 5), number).toBe(true);
      expect(new Set(answer).size, number).toBe(answer.length);
    }
    expect(SHAKAI_QUESTIONS).toHaveLength(129);
    expect(SHAKAI_QUESTIONS.every((question) => question.year === 2025)).toBe(true);
    expect(EXAM_CONFIGS.shakai.yearRange).toEqual({ start: 2025, end: 2025 });
  });
});
