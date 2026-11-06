import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "data", "qualification-staging", "sokuryoshiho");
const readJson = <T>(name: string): T => JSON.parse(readFileSync(path.join(DIR, name), "utf8")) as T;
const sha256 = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");

interface StagedImage { path: string; sha256: string; alt: string }
interface StagedQuestion {
  id: string; slug: string; year: number; season: string; session: string; qNumber: number;
  publicationStatus: string; publicAllowed: boolean; needsReview: boolean; type: string;
  question: string; choices: Record<string, string>; officialAnswerNumber: number;
  sourcePdfUrl: string; sourceAnswerUrl: string; sourcePage: number;
  hasImage: boolean; images?: StagedImage[];
  sourceAttribution: string; lawReferenceDate: string | null; legalContextDate: string;
  lastUpdated: string; explanationAuthorship: string; sourceTextSha256: string;
  choiceExplanations: Record<string, string>; explanation: string; category: string; transcriptionNote: string;
  referenceOnly?: boolean; scoringNote?: string; computedAnswerNumber?: number;
}
interface Manifest {
  slug: string; name: string; administrator: string; publicAllowed: boolean; independentReview: string;
  counts: { "2025": number; "2026": number; total: number };
  files: { name: string; url: string; sha256: string; status: number }[];
}
interface OfficialAnswers { answers: Record<"2025" | "2026", number[]> }
interface SourceAudit { questions: { id: string; sourcePage: number; sourceTextSha256: string; officialAnswerNumber: number; answerMatch: boolean }[] }

const rounds = { 2025: readJson<StagedQuestion[]>("2025.json"), 2026: readJson<StagedQuestion[]>("2026.json") } as const;
const all = [...rounds[2025], ...rounds[2026]];
const manifest = readJson<Manifest>("manifest.json");
const official = readJson<OfficialAnswers>("official-answers.json");
const audit = readJson<SourceAudit>("source-audit.json");

// Independently read from the rendered official answer sheets (令和7年/令和8年測量士補試験解答), not from question JSON.
const answerRows = {
  2025: "2323411554" + "1213223135" + "45145344",
  2026: "3412214435" + "3344315552" + "42513413",
} as const;

// Same stable serialization as the Python receipt: {"choices": {...}, "question": ...}, keys sorted, NFC text.
const textSha = (q: StagedQuestion) => {
  const choices = Object.keys(q.choices).sort()
    .map((k) => `${JSON.stringify(k)}: ${JSON.stringify(q.choices[k]!.normalize("NFC"))}`).join(", ");
  return sha256(`{"choices": {${choices}}, "question": ${JSON.stringify(q.question.normalize("NFC"))}}`);
};

describe("測量士補 private staging (sokuryoshiho)", () => {
  it("has 28 questions per sitting with unique, well-formed ids", () => {
    for (const year of [2025, 2026] as const) {
      const round = rounds[year];
      expect(round).toHaveLength(28);
      expect(round.map((q) => q.qNumber)).toEqual(Array.from({ length: 28 }, (_, i) => i + 1));
      for (const q of round) {
        expect(q.id).toBe(`sokuryoshiho-${year}-annual-gakka-q${q.qNumber}`);
        expect(q).toMatchObject({ slug: "sokuryoshiho", year, season: "annual", session: "gakka", type: "multiple-choice" });
      }
    }
    expect(new Set(all.map((q) => q.id)).size).toBe(56);
    expect(manifest).toMatchObject({ slug: "sokuryoshiho", name: "測量士補", administrator: "国土地理院", independentReview: "pending" });
    expect(manifest.counts).toMatchObject({ "2025": 28, "2026": 28, total: 56 });
  });

  it("keeps every answer equal to the official answer ledger and the rendered answer sheets", () => {
    for (const year of [2025, 2026] as const) {
      const keys = rounds[year].map((q) => q.officialAnswerNumber);
      expect(keys).toEqual(official.answers[String(year) as "2025" | "2026"]);
      expect(keys.join("")).toBe(answerRows[year]);
      const answerFile = manifest.files.find((f) => f.name === `${year}-answers`)!;
      for (const q of rounds[year]) expect(q.sourceAnswerUrl).toBe(answerFile.url);
    }
    for (const a of audit.questions) expect(a.answerMatch).toBe(true);
  });

  it("has five choices and five self-contained choice explanations for every question", () => {
    for (const q of all) {
      expect(Object.keys(q.choices)).toEqual(["1", "2", "3", "4", "5"]);
      expect(Object.keys(q.choiceExplanations)).toEqual(["1", "2", "3", "4", "5"]);
      for (const k of ["1", "2", "3", "4", "5"]) {
        expect(q.choices[k]!.trim().length).toBeGreaterThan(0);
        expect(q.choiceExplanations[k]!.length).toBeGreaterThanOrEqual(20);
      }
      expect(q.explanation.length).toBeGreaterThan(40);
      expect(q.question.length).toBeGreaterThan(30);
      expect(q.explanationAuthorship).toBe("original");
      expect(q.sourceAttribution).toMatch(/^出典：国土地理院 令和[78]年測量士補試験 No\.\d+。解説は過去問AIの独自作成。$/);
    }
  });

  it("is private everywhere", () => {
    expect(manifest.publicAllowed).toBe(false);
    for (const q of all) {
      expect(q.publicAllowed).toBe(false);
      expect(q.publicationStatus).toBe("staging");
      expect(q.needsReview).toBe(true);
    }
    expect(existsSync(path.join(ROOT, "public", "images", "sokuryoshiho"))).toBe(false);
  });

  it("stores only existing figure crops whose bytes match the recorded sha256", () => {
    const referenced = new Set<string>();
    for (const q of all) {
      expect(q.hasImage).toBe(Boolean(q.images?.length));
      for (const img of q.images ?? []) {
        const file = path.join(DIR, img.path);
        expect(existsSync(file), img.path).toBe(true);
        const bytes = readFileSync(file);
        expect(sha256(bytes), img.path).toBe(img.sha256);
        expect(bytes.length).toBeLessThan(300_000);
        expect(img.alt.length).toBeGreaterThan(10);
        referenced.add(path.basename(img.path));
      }
    }
    expect(readdirSync(path.join(DIR, "images")).sort()).toEqual([...referenced].sort());
    for (const name of referenced) expect(name).toMatch(/\.webp$/);
  });

  it("recomputes sourceTextSha256 and matches the source audit receipt", () => {
    const receipts = new Map(audit.questions.map((a) => [a.id, a]));
    for (const q of all) {
      expect(textSha(q), q.id).toBe(q.sourceTextSha256);
      const r = receipts.get(q.id)!;
      expect(r).toMatchObject({ sourcePage: q.sourcePage, sourceTextSha256: q.sourceTextSha256, officialAnswerNumber: q.officialAnswerNumber });
    }
    const changed = { ...rounds[2026][0]!, question: `${rounds[2026][0]!.question}変更` };
    expect(textSha(changed)).not.toBe(rounds[2026][0]!.sourceTextSha256);
  });

  it("flags only 2026 No.12 as reference-only without altering the official key", () => {
    const ref = all.filter((q) => q.referenceOnly);
    expect(ref.map((q) => q.id)).toEqual(["sokuryoshiho-2026-annual-gakka-q12"]);
    const q12 = ref[0]!;
    expect(q12.officialAnswerNumber).toBe(3);
    expect(q12.computedAnswerNumber).toBe(5);
    expect(q12.scoringNote).toContain("referenceOnly");
    expect(q12.question).toContain("2.5 mm√S");
  });

  it("is not imported by any public registry, loader or route", () => {
    const needle = "qualification-staging/sokuryoshiho";
    for (const file of [
      "data/questions/index.ts", "lib/questions/get-questions.ts", "lib/questions/load.ts", "lib/exam-config.ts",
      "lib/qualifications/catalog.ts", "lib/seo/exam-meta.ts", "lib/home/home-directory.ts", "lib/utils.ts",
    ]) {
      const full = path.join(ROOT, file);
      if (existsSync(full)) expect(readFileSync(full, "utf8"), file).not.toContain(needle);
    }
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (statSync(full).isDirectory()) walk(full);
        else if (/\.(ts|tsx|js|mjs)$/.test(entry) && readFileSync(full, "utf8").includes(needle)) offenders.push(full);
      }
    };
    for (const dir of ["app", "components", "lib", "data/questions"]) {
      if (existsSync(path.join(ROOT, dir))) walk(path.join(ROOT, dir));
    }
    expect(offenders).toEqual([]);
  });
});
