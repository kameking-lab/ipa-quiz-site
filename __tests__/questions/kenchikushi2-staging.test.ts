import { describe, expect, it } from "vitest";
import { KENCHIKUSHI2_SOURCE_MANIFEST as manifest } from "@/data/qualification-staging/kenchikushi2";
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

describe("LK5 source-only staging", () => {
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

  it("keeps both qualifications unpublished and records zero ingested questions", () => {
    expect(manifest.publicAllowed).toBe(false);
    expect(manifest.ingestionState).toBe("source-metadata-only");
    expect(manifest.ingestedQuestionCount).toBe(0);
    const home = getHomeDirectory().flatMap(d => [...d.featured, ...d.compact]);
    for (const slug of ["kenchikushi2", "mokuzo-kenchikushi"]) {
      const entry = QUALIFICATION_CATALOG.find(q => q.slug === slug);
      expect(entry?.status).toBe("ready-to-ingest");
      expect(entry?.examCode).toBeUndefined();
      expect(home.some(q => q.href === `/${slug}`)).toBe(false);
      expect(ALL_QUESTIONS.some(q => String(q.exam) === slug)).toBe(false);
    }
  });
});
