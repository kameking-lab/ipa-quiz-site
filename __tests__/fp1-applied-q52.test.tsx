import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import raw from "@/data/questions/fp1/applied-2026-may.json";
import { fp1AppliedEditionSchema, getFp1AppliedEdition } from "@/lib/fp1/applied";
import Page, { generateMetadata } from "@/app/fp1/applied/[edition]/[number]/page";

describe("FP1 May applied Q52 original calculation", () => {
  it("retains the official two numerical answers and distinct disability/old-age periods", () => {
    const question = getFp1AppliedEdition("202605")!.questions[1];
    expect(question.type).toBe("originalcalculation");
    expect(question.answers.map((answer) => answer.officialAnswer)).toEqual(["642,672（円）", "1,064,921（円）"]);
    expect(question.conditions).toHaveLength(5);
    expect(question.conditions[0].lines[1]).toContain("278月");
    expect(question.conditions[0].lines[1]).toContain("275月");
    const disability = Math.round((220000 * 7.125 / 1000 * 24 + 400000 * 5.481 / 1000 * 275) * 300 / 299);
    const oldAge = Math.round(220000 * 7.125 / 1000 * 24 + 401000 * 5.481 / 1000 * 278);
    const extra = Math.round(1734 * 302 - 831700 * 302 / 480);
    expect(disability).toBe(642672);
    expect([oldAge, extra, oldAge + extra + 415900]).toEqual([648631, 390, 1064921]);
  });

  it("rejects a fabricated choice, third answer or wrong calculation-question source page", () => {
    const fabricated = { ...structuredClone(raw), questions: raw.questions.map((question) => ({ ...question })) };
    Object.assign(fabricated.questions[1]!, { choicesForBlank4: [] });
    expect(fp1AppliedEditionSchema.safeParse(fabricated).success).toBe(false);
    const third = structuredClone(raw);
    third.questions[1]!.answers!.push({ ...third.questions[1]!.answers![1]!, label: "③" });
    expect(fp1AppliedEditionSchema.safeParse(third).success).toBe(false);
    const wrongPage = structuredClone(raw);
    wrongPage.questions[1]!.sourcePages[1] = 6;
    expect(fp1AppliedEditionSchema.safeParse(wrongPage).success).toBe(false);
  });

  it("renders the shared case, all conditions and the two complete calculation solutions", async () => {
    render(await Page({ params: Promise.resolve({ edition: "202605", number: "52" }) }));
    expect(screen.getByRole("heading", { name: "2026年5月試験 学科応用編 問52" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "共通設例" })).toHaveTextContent("1978年６月20日");
    expect(within(screen.getByLabelText("計算問題")).getAllByRole("term")).toHaveLength(2);
    expect(screen.getByLabelText("計算条件")).toHaveTextContent("□□□");
    expect(screen.queryByLabelText("空欄④の選択肢")).not.toBeInTheDocument();
    const solutions = screen.getByLabelText("計算過程と独自解説");
    expect(solutions).toHaveTextContent("300月／299月");
    expect(solutions).toHaveTextContent("648,631円＋390円＝649,021円");
    expect(solutions).toHaveTextContent("配偶者加給年金415,900円");
    expect(screen.getByLabelText("出典")).toHaveTextContent("第1問・問52");
    expect(screen.getByRole("link", { name: "公式問題PDF（問52）" })).toHaveAttribute("href", "https://www.kinzai.or.jp/uploads/lib/question/202605/fp01_g_oyo.pdf#page=5");
    const metadata = await generateMetadata({ params: Promise.resolve({ edition: "202605", number: "52" }) });
    expect(metadata.alternates?.canonical).toBe("/fp1/applied/202605/52");
    expect(metadata.description).toContain("2つの計算問題");
    expect(metadata.description).not.toContain("空欄④");
  });
});
