import { describe, expect, it } from "vitest";
import { KENCHIKUSHI2_SOURCE_MANIFEST as manifest, KENCHIKUSHI2_STAGED_QUESTIONS as staged } from "@/data/qualification-staging/kenchikushi2";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { ALL_QUESTIONS } from "@/data/questions";
import { getHomeDirectory } from "@/lib/home/home-directory";

// Independently transcribed from the four official answer-table page images.
// Each digit is the official choice number for questions 1 through 25.
const officialRows = {
  "kenchikushi2-2026": [
    "4154542132325452451343132", "5534324253332141214241532",
    "3411243231451145245353542", "1435243235451115352225412",
  ],
  "kenchikushi2-2025": [
    "3214245134214552233144551", "1414414235223513524125332",
    "1322215345312513123425454", "4425215353514332521134544",
  ],
  "mokuzo-kenchikushi-2026": [
    "5443332442255514551314322", "3533451425235243124521412",
    "5241222554145433433123112", "5352253331143424152121314",
  ],
  "mokuzo-kenchikushi-2025": [
    "1254555213341143413225123", "5214442352144232231351154",
    "5341242132355354532214411", "1335142334541433522551152",
  ],
} as const;

describe("LK5C unpublished staging", () => {
  it("pins all 400 answers to the official tables across four distinct rounds", () => {
    expect(manifest.rounds.map(r => `${r.qualificationSlug}-${r.year}`).sort()).toEqual(Object.keys(officialRows).sort());
    for (const round of manifest.rounds) {
      const fixture = officialRows[`${round.qualificationSlug}-${round.year}` as keyof typeof officialRows];
      expect(round.round).toBe(`${round.year}-annual`);
      expect(round.expectedQuestionCount).toBe(100);
      for (const [index, subject] of (["I", "II", "III", "IV"] as const).entries()) {
        expect(round.officialAnswers[subject], `${round.qualificationSlug} ${round.year} ${subject}`).toEqual([...fixture[index]].map(Number));
      }
      expect(round.questionDocuments.map(d => d.subjects)).toEqual([["I", "II"], ["III", "IV"]]);
      for (const doc of [...round.questionDocuments, round.answerDocument]) {
        expect(new URL(doc.url).hostname).toBe("www.jaeic.or.jp");
        expect(doc.status, doc.url).toBe("acquired");
        expect(doc.httpStatus).toBe(200);
        expect(doc.sha256).toMatch(/^[a-f0-9]{64}$/);
        expect(doc.pages).toBeGreaterThan(0);
      }
      expect(round.lawReferenceDate).toBe(`${round.year}-01-01`);
      expect(round.lawReferenceExceptions).toHaveLength(round.year === 2025 ? 1 : 0);
      if (round.year === 2025) expect(round.lawReferenceExceptions[0].date).toBe("2025-04-01");
    }
  });

  it("keeps both qualifications unpublished while recording the actual ingestion progress", () => {
    expect(manifest.publicAllowed).toBe(false);
    expect(manifest.ingestionState).toBe("in-progress");
    expect(manifest.ingestedQuestionCount).toBe(staged.length);
    expect(manifest.batches.reduce((sum, batch) => sum + batch.questionCount, 0)).toBe(staged.length);
    expect(manifest.nextResume).toEqual({ qualificationSlug: "kenchikushi2", year: 2026, subject: "II", qNumber: 1 });
    const home = getHomeDirectory().flatMap(d => [...d.featured, ...d.compact]);
    for (const slug of ["kenchikushi2", "mokuzo-kenchikushi"]) {
      const entry = QUALIFICATION_CATALOG.find(q => q.slug === slug);
      expect(entry?.status).toBe("ready-to-ingest");
      expect(entry?.examCode).toBeUndefined();
      expect(home.some(q => q.href === `/${slug}`)).toBe(false);
      expect(ALL_QUESTIONS.some(q => String(q.exam) === slug)).toBe(false);
    }
  });

  it("contains exactly the first complete subject, with 125 explanations and pinned official answers", () => {
    const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;
    expect(staged).toHaveLength(25);
    expect(new Set(staged.map(q => q.id)).size).toBe(25);
    expect(staged.map(q => q.qNumber)).toEqual(Array.from({ length: 25 }, (_, i) => i + 1));
    expect(staged.map(q => q.officialAnswerNumber).join("")).toBe(officialRows["kenchikushi2-2026"][0]);
    for (const q of staged) {
      expect(q.id).toBe(`kenchikushi2-2026-annual-I-q${q.qNumber}`);
      expect(q.exam).toBe("kenchikushi2");
      expect(q.session).toBe("gakka-I");
      expect(q.year).toBe(2026);
      expect(q.season).toBe("annual");
      expect(q.subject).toBe("学科Ⅰ（建築計画）");
      expect(q.question.length).toBeGreaterThan(20);
      expect(Object.keys(q.choices ?? {})).toEqual(keys);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(keys);
      for (const key of keys) {
        expect(q.choices?.[key]?.trim().length).toBeGreaterThan(0);
        expect(q.choiceExplanations?.[key]?.trim().length).toBeGreaterThan(20);
      }
      expect(q.answer).toBe(keys[Number(q.officialAnswerNumber) - 1]);
      expect(q.explanation.length).toBeGreaterThan(40);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(manifest.rounds[0].questionDocuments[0].url);
      expect(q.sourceAnswerUrl).toBe(manifest.rounds[0].answerDocument.url);
      expect(q.sourceAttribution).toContain("建築技術教育普及センター");
      expect(q.lawReferenceDate).toBe("2026-01-01");
      expect(q.sourcePage).toBeGreaterThanOrEqual(2);
      expect(q.sourcePage).toBeLessThanOrEqual(10);
      expect(q.publicAllowed).toBe(false);
      expect(q.needsReview).toBe(true);
    }
  });

  it("retains the source table, fraction, ruby readings, and deliberately incorrect propositions", () => {
    const q6 = staged[5];
    expect(staged.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([6]);
    expect(q6.originalContent?.tables?.[0].rows).toEqual([
      ["記号", "部位", "面積", "熱貫流率"],
      ["イ", "屋根（天井）", "16 m²", "0.2 W／（m²・K）"],
      ["ロ", "外壁（窓を除く）", "22 m²", "0.3 W／（m²・K）"],
      ["ハ", "窓", "18 m²", "2.0 W／（m²・K）"],
      ["ニ", "床", "16 m²", "0.2 W／（m²・K）"],
    ]);
    expect(q6.imageUrls).toHaveLength(1);
    expect(q6.imageAltTexts).toHaveLength(1);
    for (const file of q6.imageUrls ?? []) {
      expect(file.startsWith("data/qualification-staging/kenchikushi2/assets/")).toBe(true);
      const bytes = readFileSync(resolve(file));
      expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(bytes.readUInt32BE(16)).toBeGreaterThan(600);
      expect(bytes.readUInt32BE(20)).toBeGreaterThan(200);
    }
    expect(staged[14].choices?.ウ).toContain("本勾配を1/8とし");
    expect(staged[0].sourceRubies).toContainEqual({ base: "繫虹梁", reading: "つなぎこうりょう" });
    expect(staged[4].sourceRubies).toContainEqual({ base: "稠", reading: "ちゅう" });
    expect(staged[16].choices?.エ).toContain("25 cm");
    expect(staged[21].choices?.ウ).toContain("20 ℃上昇");
    expect(staged[23].choices?.ウ).toContain("再充塡ができる");
  });

  it("records the supplied files separately from the agent's earlier download cache", () => {
    expect(manifest.ownerProvidedSource.documents).toHaveLength(12);
    expect(manifest.ownerProvidedSource.readme).toContain("owner-provided/kenchikushi2/README.md");
    const docs = manifest.rounds.flatMap(r => [...r.questionDocuments, r.answerDocument]);
    expect(manifest.ownerProvidedSource.documents.map(d => d.sourceUrl).sort()).toEqual(docs.map(d => d.url).sort());
    for (const file of manifest.ownerProvidedSource.documents) {
      const original = docs.find(d => d.url === file.sourceUrl);
      expect(file.sha256).toBe(original?.sha256);
      expect(file.pages).toBe(original?.pages);
    }
  });
});
