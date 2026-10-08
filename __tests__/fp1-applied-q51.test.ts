import { describe, expect, it } from "vitest";
import raw from "@/data/questions/fp1/applied-2026-may.json";
import { FP1_QUESTIONS } from "@/data/questions/fp1";
import { renderFpPracticalSitemapXml } from "@/lib/seo/sitemap-xml";
import { fp1AppliedEditionSchema, getFp1AppliedEdition } from "@/lib/fp1/applied";

describe("FP1 applied Q51 original format", () => {
  it("keeps all three original questions outside the 50-question basic pool", () => {
    const data = getFp1AppliedEdition("202605")!;
    expect(data.questions).toHaveLength(3);
    expect(data.questions[0]!.type).toBe("originalcloze");
    expect(data.questions[0]!.blanks!.map((item) => item.officialAnswer)).toEqual(["３分の２（以上）", "１（年間）", "１年６（カ月）", "イ"]);
    expect(data.questions[0]!.choicesForBlank4!.map((item) => item.label)).toEqual(["イ", "ロ", "ハ"]);
    expect(data.lawReferenceDate).toBe("2025-10-01");
    expect(FP1_QUESTIONS).toHaveLength(50);
    expect(FP1_QUESTIONS.some((item) => item.qNumber === 51)).toBe(false);
    expect(getFp1AppliedEdition("202609")).toBeNull();
  });

  it("rejects a fabricated fourth choice and incomplete or relabelled blanks", () => {
    const fourth = structuredClone(raw);
    fourth.questions[0]!.choicesForBlank4!.push({ ...fourth.questions[0]!.choicesForBlank4![2], label: "ニ" });
    expect(fp1AppliedEditionSchema.safeParse(fourth).success).toBe(false);
    const missing = structuredClone(raw);
    missing.questions[0]!.blanks!.pop();
    expect(fp1AppliedEditionSchema.safeParse(missing).success).toBe(false);
    const labels = structuredClone(raw);
    labels.questions[0]!.choicesForBlank4![1].label = "ウ";
    expect(fp1AppliedEditionSchema.safeParse(labels).success).toBe(false);
  });

  it("rejects a wrong blank4 binding or a changed law basis", () => {
    const wrong = structuredClone(raw);
    wrong.questions[0]!.blanks![3].officialAnswer = "ロ";
    expect(fp1AppliedEditionSchema.safeParse(wrong).success).toBe(false);
    const date = structuredClone(raw);
    date.lawReferenceDate = "2025-09-01";
    expect(fp1AppliedEditionSchema.safeParse(date).success).toBe(false);
  });
});

describe("FP1 applied discovery", () => {
  it("lists precisely the native index, edition and original question in the existing FP sitemap", () => {
    const xml = renderFpPracticalSitemapXml();
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    const paths = [...doc.querySelectorAll("loc")].map((item) => new URL(item.textContent!).pathname).filter((path) => path.startsWith("/fp1/applied"));
    expect(paths).toEqual(["/fp1/applied", "/fp1/applied/202605", "/fp1/applied/202605/51", "/fp1/applied/202605/52"]);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
