import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page, { generateMetadata, generateStaticParams } from "@/app/fp1/applied/[edition]/[number]/page";

describe("FP1 applied native reader", () => {
  it("renders the complete shared case, all answers and all original choices", async () => {
    render(await Page({ params: Promise.resolve({ edition: "202605", number: "51" }) }));
    expect(screen.getByRole("heading", { name: "2026年5月試験 学科応用編 問51" })).toBeInTheDocument();
    const context = screen.getByRole("region", { name: "共通設例" });
    expect(within(context).getByText("1978年６月20日生まれ、47歳")).toBeInTheDocument();
    expect(within(context).getByText("1981年７月10日生まれ、44歳")).toBeInTheDocument();
    expect(within(context).getByText(/上記以外の条件は考慮せず/)).toBeInTheDocument();
    const choices = screen.getByLabelText("空欄④の選択肢");
    expect(within(choices).getAllByRole("term")).toHaveLength(3);
    expect(within(choices).getByText("イ")).toBeInTheDocument();
    expect(within(choices).getByText("ロ")).toBeInTheDocument();
    expect(within(choices).getByText("ハ")).toBeInTheDocument();
    const answer = screen.getByLabelText("公式模範解答");
    expect(within(answer).getAllByRole("definition", { hidden: true })).toHaveLength(4);
    expect(within(answer).getByText("１年６（カ月）")).toBeInTheDocument();
    expect(screen.getByLabelText("空欄ごとの独自解説")).toHaveTextContent("空欄④");
    expect(screen.getByLabelText("空欄④の全3肢の理由")).toHaveTextContent("この設例では誤り");
    expect(screen.getByText(/法令基準日 2025-10-01/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "公式問題PDF（問51）" })).toHaveAttribute("href", "https://www.kinzai.or.jp/uploads/lib/question/202605/fp01_g_oyo.pdf#page=4");
    expect(screen.getByLabelText("出典")).toHaveTextContent("解説は独自制作");
  });

  it("exposes questions51,52 and53 and uses its own canonical rather than the MCQ route", async () => {
    expect(generateStaticParams().filter(({ edition }) => edition === "202605")).toEqual(Array.from({ length: 15 }, (_, i) => ({ edition: "202605", number: String(51 + i) })));
    const metadata = await generateMetadata({ params: Promise.resolve({ edition: "202605", number: "51" }) });
    expect(metadata.alternates?.canonical).toBe("/fp1/applied/202605/51");
    expect(metadata.description).toContain("2025-10-01");
    const absent = await generateMetadata({ params: Promise.resolve({ edition: "202605", number: "66" }) });
    expect(absent.robots).toEqual({ index: false });
  });
});
