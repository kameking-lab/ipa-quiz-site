import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  KIKAI_HOZEN_OFFICIAL_ANSWERS as officialAnswers,
  KIKAI_HOZEN_STAGED_QUESTIONS as questions,
  KIKAI_HOZEN_STAGING_MANIFEST as manifest,
  type KikaiHozenStagedQuestion,
} from "@/data/qualification-staging/kikai-hozen";

const DIR = path.join(process.cwd(), "data", "qualification-staging", "kikai-hozen");
const YEARS = [2024, 2025] as const;

// Independently transcribed from the rendered JIPM answer sheets (正解PDF), not from question JSON.
const ANSWER_ROWS: Record<(typeof YEARS)[number], string> = {
  2024: "〇××〇〇××〇×〇××〇〇×〇××〇〇〇〇〇×〇" + "アウアイアエアウウイエアエエエアウイウエエアエイア",
  2025: "×〇××〇×〇〇××〇××〇×〇×〇〇〇×〇×〇〇" + "ウイウエアイウエエイイウアエイアエイウイアエアイア",
};

const sha256 = (buf: Buffer | string) => createHash("sha256").update(buf).digest("hex");
const byYear = (year: number) => questions.filter((q) => q.year === year);
const textSha = (q: Pick<KikaiHozenStagedQuestion, "question" | "choices">) =>
  sha256(JSON.stringify({ question: q.question, choices: q.choices }).normalize("NFC"));

describe("機械保全技能検定 2級 機械系保全作業 学科 private staging", () => {
  it("has exactly 50 questions per sitting with unique ids and numbers 1-50", () => {
    expect(questions).toHaveLength(100);
    expect(new Set(questions.map((q) => q.id)).size).toBe(100);
    for (const year of YEARS) {
      const round = byYear(year);
      expect(round).toHaveLength(50);
      expect(round.map((q) => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
      for (const q of round) {
        expect(q.id).toBe(`kikai-hozen-${year}-kikai2-gakka-q${q.qNumber}`);
        expect(q).toMatchObject({ slug: "kikai-hozen", season: "annual", session: "gakka", grade: "2級", work: "機械系保全作業", type: "multiple-choice" });
      }
    }
    expect(manifest.counts).toMatchObject({ "2024": 50, "2025": 50, total: 100 });
  });

  it("matches the official answer sheets", () => {
    for (const year of YEARS) {
      const key = String(year) as "2024" | "2025";
      expect(officialAnswers.answers[key].join("")).toBe(ANSWER_ROWS[year]);
      expect(byYear(year).map((q) => q.officialAnswer).join("")).toBe(ANSWER_ROWS[year]);
    }
    const audit = JSON.parse(readFileSync(path.join(DIR, "source-audit.json"), "utf8")) as {
      questions: { id: string; answerMatch: boolean; sourceTextSha256: string }[];
    };
    expect(audit.questions).toHaveLength(100);
    for (const row of audit.questions) {
      const q = questions.find((x) => x.id === row.id);
      expect(q, row.id).toBeDefined();
      expect(row.answerMatch).toBe(true);
      expect(row.sourceTextSha256).toBe(q!.sourceTextSha256);
    }
  });

  it("uses 真偽法 for No.1-25 and 四肢択一 for No.26-50", () => {
    for (const q of questions) {
      if (q.qNumber <= 25) {
        expect(q.answerFormat).toBe("true-false");
        expect(q.choices).toEqual({ "〇": "正しい", "×": "誤り" });
      } else {
        expect(q.answerFormat).toBe("four-choice");
        expect(Object.keys(q.choices)).toEqual(["ア", "イ", "ウ", "エ"]);
        for (const text of Object.values(q.choices)) expect(text!.length).toBeGreaterThan(0);
      }
      expect(Object.keys(q.choices)).toContain(q.officialAnswer);
    }
  });

  it("explains every choice with original text and marks only the official answer", () => {
    for (const q of questions) {
      expect(Object.keys(q.choiceExplanations)).toEqual(Object.keys(q.choices));
      for (const [key, text] of Object.entries(q.choiceExplanations)) {
        expect(text!.length, `${q.id} ${key}`).toBeGreaterThan(15);
        expect(text!.includes("公式正答"), `${q.id} ${key}`).toBe(key === q.officialAnswer);
      }
      expect(q.explanation.startsWith(`公式正答は${q.officialAnswer}です。`)).toBe(true);
      expect(q.explanationAuthorship).toBe("original");
      expect(q.sourceAttribution).toContain(`${q.year}年度 2級 機械系保全作業 学科 No.${q.qNumber}`);
      expect(q.question.length).toBeGreaterThan(10);
    }
  });

  it("stays private: publicAllowed false, staging, needsReview", () => {
    expect(manifest.publicAllowed).toBe(false);
    expect(manifest.publicationStatus).toBe("staging");
    expect(manifest.independentReview).toBe("pending");
    for (const q of questions) {
      expect(q.publicAllowed).toBe(false);
      expect(q.publicationStatus).toBe("staging");
      expect(q.needsReview).toBe(true);
    }
  });

  it("keeps original figure crops whose files exist and match sha256", () => {
    const referenced = new Set<string>();
    for (const q of questions) {
      expect(q.hasImage).toBe(q.images.length > 0);
      for (const img of q.images) {
        const file = path.join(DIR, img.path);
        expect(existsSync(file), img.path).toBe(true);
        expect(sha256(readFileSync(file)), img.path).toBe(img.sha256);
        expect(img.alt.length).toBeGreaterThan(10);
        referenced.add(img.path);
      }
    }
    expect(referenced.size).toBe(10);
    const onDisk = readdirSync(path.join(DIR, "images")).map((f) => `images/${f}`);
    expect(onDisk.sort()).toEqual([...referenced].sort());
  }, 60_000);

  it("recomputes sourceTextSha256 from question and choices", () => {
    for (const q of questions) expect(textSha(q), q.id).toBe(q.sourceTextSha256);
    const q = questions[0]!;
    expect(textSha({ ...q, question: `${q.question}変更` })).not.toBe(q.sourceTextSha256);
  });

  it("is not imported by any public registry or runtime module", () => {
    const roots = ["app", "lib", "components", "data/questions"].map((p) => path.join(process.cwd(), p)).filter(existsSync);
    const importRe = /(from\s+|import\s*\(|require\s*\()\s*["'][^"']*qualification-staging\/kikai-hozen/;
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        if (name === "node_modules" || name.startsWith(".")) continue;
        const full = path.join(dir, name);
        if (statSync(full).isDirectory()) walk(full);
        else if (/\.(ts|tsx|js|mjs|cjs)$/.test(name) && importRe.test(readFileSync(full, "utf8"))) offenders.push(full);
      }
    };
    roots.forEach(walk);
    expect(offenders).toEqual([]);
    expect(existsSync(path.join(process.cwd(), "public", "images", "kikai-hozen"))).toBe(false);
  }, 120_000);
});
