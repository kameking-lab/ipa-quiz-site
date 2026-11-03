import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { KISHO_CANDIDATES } from "@/data/questions/kisho";
import { KishoCandidateSchema } from "@/data/questions/kisho/schema";
import { KISHO_PRIVATE_QUESTIONS, KISHO_SOURCE_MANIFEST, gradeKishoAcademic } from "@/lib/kisho-private";

// Pinned official answers from the already independently accepted source packet.
const fixedAnswers = {
  "65-ippan": "334421544223155",
  "65-senmon": "342112355225444",
  "66-ippan": "534422425315432",
  "66-senmon": "522213341524514"
};

describe("kisho latest two official rounds", () => {
  it("validates all 78 originals, all 300 choice explanations, and distinct session numbering", () => {
    expect(KISHO_CANDIDATES).toHaveLength(78);
    for (const q of KISHO_CANDIDATES) expect(KishoCandidateSchema.safeParse(q).success, q.id).toBe(true);
    expect(new Set(KISHO_CANDIDATES.map(q => q.id)).size).toBe(78);
    for (const [round, expected] of [[65, 40], [66, 38]]) {
      expect(KISHO_CANDIDATES.filter(q => q.id.startsWith(`kisho-${round}-`))).toHaveLength(expected);
      for (const session of ["ippan", "senmon"]) {
        const qs = KISHO_CANDIDATES.filter(q => q.id.startsWith(`kisho-${round}-${session}-`));
        expect(qs.map(q => q.qNumber)).toEqual(Array.from({length: 15}, (_, i) => i + 1));
        expect(qs.map(q => q.officialAnswerNumber).join("")).toBe(fixedAnswers[`${round}-${session}` as keyof typeof fixedAnswers]);
      }
    }
  });
  it("retains 237 practical fields and hashes all 130 bound images", () => {
    expect(KISHO_SOURCE_MANIFEST.answerFields).toHaveLength(237);
    expect(KISHO_SOURCE_MANIFEST.assets).toHaveLength(130);
    for (const asset of KISHO_SOURCE_MANIFEST.assets) {
      const bytes = readFileSync(`private-assets/kisho-65-66/${asset.assetId}`);
      expect(createHash("sha256").update(bytes).digest("hex"), asset.assetId).toBe(asset.sha256);
    }
    expect(KISHO_SOURCE_MANIFEST.answerFields.filter(f => f.officialAnswerImageAssetId)).toHaveLength(12);
  });
  it("grades all academic choices and leaves practical answers for field review", () => {
    for (const q of KISHO_PRIVATE_QUESTIONS) {
      expect(q.publicationAllowed).toBe(false);
      if (q.raw.type === "descriptive") expect(gradeKishoAcademic(q, q.raw.answer)).toBeNull();
      else for (const key of Object.keys(q.raw.choices!)) {
        expect(gradeKishoAcademic(q, key)).toBe(key === q.raw.answer);
      }
    }
  });
  it("applies the accepted Q04 overlay and rejects incomplete explanations", () => {
    const q = KISHO_CANDIDATES.find(q => q.id === "kisho-65-senmon-q04")!;
    const raw = JSON.parse(readFileSync("data/qualification-staging/kisho-65-66-private/raw-combined.json", "utf8")).questions.find((q: {id: string}) => q.id === "kisho-65-senmon-q04");
    expect(q.explanation).not.toBe(raw.explanation);
    expect(KishoCandidateSchema.safeParse({...q, choiceExplanations: {ア: "理由"}}).success).toBe(false);
  });
});
