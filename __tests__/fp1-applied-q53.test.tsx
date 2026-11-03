import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import raw from "@/data/questions/fp1/applied-2026-may.json";
import { fp1AppliedEditionSchema, getFp1AppliedEdition } from "@/lib/fp1/applied";
import Page, { generateMetadata, generateStaticParams } from "@/app/fp1/applied/[edition]/[number]/page";

describe("FP1 May applied Q53 official numerical cloze", () => {
  it("retains seven distinct blanks, repeated first blank and masked parameters without fabricated choices", () => {
    const q = getFp1AppliedEdition("202605")!.questions[2];
    expect(q.type).toBe("originalnumericcloze");
    expect(q.blanks.map((b) => b.officialAnswer)).toEqual(["65（歳）", "30（日）", "60（日）", "93（日）", "10（日）", "67（％）", "２（カ月）"]);
    const source = q.sections.flatMap((s) => s.paragraphs).join(" ");
    expect(source.match(/（ ① ）/gu)).toHaveLength(2);
    expect(source.match(/□□□/gu)).toHaveLength(2);
    expect(q.references).toHaveLength(4);
    expect(q).not.toHaveProperty("choicesForBlank4");
    expect(generateStaticParams()).toContainEqual({ edition: "202605", number: "53" });
    expect(generateStaticParams()).not.toContainEqual({ edition: "202605", number: "66" });
  });

  it("rejects an eighth answer, duplicate label, invented choices and mismatched source page", () => {
    const extra = structuredClone(raw);
    extra.questions[2]!.blanks!.push({ ...extra.questions[2]!.blanks![6]!, label: "⑧" });
    expect(fp1AppliedEditionSchema.safeParse(extra).success).toBe(false);
    const duplicate = structuredClone(raw);
    duplicate.questions[2]!.blanks![6]!.label = "①";
    expect(fp1AppliedEditionSchema.safeParse(duplicate).success).toBe(false);
    const invented = structuredClone(raw);
    Object.assign(invented.questions[2]!, { choicesForBlank4: [] });
    expect(fp1AppliedEditionSchema.safeParse(invented).success).toBe(false);
    const wrongPage = structuredClone(raw);
    wrongPage.questions[2]!.sourcePages[1] = 5;
    expect(fp1AppliedEditionSchema.safeParse(wrongPage).success).toBe(false);
  });

  it("renders both source sections and all seven explanations with the question53 attribution and page", async () => {
    render(await Page({ params: Promise.resolve({ edition: "202605", number: "53" }) }));
    expect(screen.getByRole("heading", { name: "2026年5月試験 学科応用編 問53" })).toBeInTheDocument();
    const source = screen.getByLabelText("数値記入式の問題文");
    expect(within(source).getAllByRole("heading")).toHaveLength(2);
    expect(source).toHaveTextContent("□□□");
    expect(screen.queryByLabelText("空欄④の選択肢")).not.toBeInTheDocument();
    expect(within(screen.getByLabelText("公式模範解答")).getAllByRole("definition")).toHaveLength(7);
    expect(within(screen.getByLabelText("空欄ごとの独自解説")).getAllByRole("heading", { level: 3 })).toHaveLength(7);
    expect(screen.getByLabelText("出典")).toHaveTextContent("第１問・問53");
    expect(screen.getByRole("link", { name: "公式問題PDF（問53）" })).toHaveAttribute("href", "https://www.kinzai.or.jp/uploads/lib/question/202605/fp01_g_oyo.pdf#page=6");
    const metadata = await generateMetadata({ params: Promise.resolve({ edition: "202605", number: "53" }) });
    expect(metadata.alternates?.canonical).toBe("/fp1/applied/202605/53");
    expect(metadata.description).toContain("空欄①～⑦");
    expect(metadata.description).not.toContain("空欄④の3肢");
  });
});
