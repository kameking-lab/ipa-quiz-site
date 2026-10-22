import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { QuestionBody } from "@/components/quiz/QuestionBody";
import { KANRI_QUESTIONS } from "@/data/questions/kanri";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

function question(number: number) {
  const found = KANRI_QUESTIONS.find((q) => q.year === 2024 && q.qNumber === number);
  if (!found) throw new Error(`Missing 2024 question ${number}`);
  return found;
}

describe("管理業務主任者2024の原本表表示", () => {
  it("原問50問を各年度の練習対象に含める", () => {
    for (const year of [2024, 2025]) {
      const ready = KANRI_QUESTIONS.filter((q) => q.year === year && isPracticeReadyQuestion(q));
      expect(ready.map((q) => q.qNumber), String(year))
        .toEqual(Array.from({ length: 50 }, (_, index) => index + 1));
    }
  });

  it("問10の資産・負債の対応と原本の金額を表のセルで読める", () => {
    render(<QuestionBody text={question(10).question} />);
    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row").slice(1);
    expect(rows.map((row) => within(row).getAllByRole("cell").map((cell) => cell.textContent)))
      .toEqual([
        ["現金預金", "300,000円", "預り金", "100,000円"],
        ["（A）", "100,000円", "（C）", "300,000円"],
        ["（B）", "200,000円", "（D）", "100,000円"],
        ["什器及び備品", "400,000円", "次期繰越金", "500,000円"],
        ["合計", "1,000,000円", "合計", "1,000,000円"],
      ]);
    expect(within(table).getAllByRole("columnheader")).toHaveLength(4);
    for (const header of within(table).getAllByRole("columnheader")) {
      expect(header).toHaveAttribute("scope", "col");
    }
  });

  it("問29のア・イ・ウとA列・B列を混同せずに表示する", () => {
    render(<QuestionBody text={question(29).question} />);
    const rows = within(screen.getByRole("table")).getAllByRole("row").slice(1);
    expect(rows.map((row) => within(row).getAllByRole("cell").map((cell) => cell.textContent)))
      .toEqual([
        ["ア", "マンション周辺の清掃活動に要する費用", "各住戸の玄関扉の改良工事の費用"],
        ["イ", "住戸から発生した火災により変質・損傷した外壁等の修繕費用", "一定期間ごとに計画的に行うバルコニー床の防水工事費用"],
        ["ウ", "管理計画認定制度の認定手数料", "機械式駐車場の一部を平置き駐車場に変更する工事費用"],
      ]);
  });

  it("描画できる表のない参照問題は引き続き練習対象から除く", () => {
    const original = question(10);
    const dangling = { ...original, question: original.question.split("\n")[0] };
    expect(isPracticeReadyQuestion(dangling)).toBe(false);
  });
});
