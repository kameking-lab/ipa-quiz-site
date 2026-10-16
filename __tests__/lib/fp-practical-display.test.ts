import { describe, expect, it } from "vitest";
import practical2026 from "@/data/questions/fp3/practical-2026-05.json";
import { formatPracticalProse, isIncorrectChoiceQuestion } from "@/lib/fp/practical-display";

describe("formatPracticalProse", () => {
  it("PDFの長い文中改行をつなぎ、資料の見出しと表の行を残す", () => {
    const text = "キャッシュフロー表の空欄（ア）～（ウ）にあてはまる数値として、誤っているものは\nどれか。なお、計算に当たっては表中の整数を使用すること。\n\n＜資料＞\n金融資産\n普通預金\n300\n定期預金\n1,000";
    expect(formatPracticalProse(text)).toBe(
      "キャッシュフロー表の空欄（ア）～（ウ）にあてはまる数値として、誤っているものはどれか。なお、計算に当たっては表中の整数を使用すること。\n\n＜資料＞\n金融資産\n普通預金\n300\n定期預金\n1,000",
    );
  });

  it("箇条書きと注記の改行を残す", () => {
    const text = "ファイナンシャル・プランニング技能検定の資料を確認し、次の事項を選びなさい。\n※年齢は各年12月31日現在\n・収入合計\n・支出合計";
    expect(formatPracticalProse(text)).toContain("\n※年齢");
    expect(formatPracticalProse(text)).toContain("\n・収入合計\n・支出合計");
  });

  it("2026年FP3実技問2は誤った記述を選ぶ設問として判定する", () => {
    const question = practical2026["202605"].questions[1]!;
    expect(question.answer).toBe(3);
    expect(isIncorrectChoiceQuestion(question.stem)).toBe(true);
    expect(formatPracticalProse(question.stem)).toContain("キャッシュフロー表中に記載の整数");
    expect(formatPracticalProse(question.stem)).toContain("＜東条家のキャッシュフロー表は下の原典画像に掲載＞\n\n※年齢");
    expect(isIncorrectChoiceQuestion(practical2026["202605"].questions[2]!.stem)).toBe(false);
  });

  it("原データ問3の資料表と見出しを残して導入文だけ整える", () => {
    const stem = practical2026["202605"].questions[2]!.stem;
    const displayed = formatPracticalProse(stem);
    expect(displayed).toContain("バランスシートの空欄");
    expect(displayed).toContain("[保有財産(時価)]\n(単位:万円)\n金融資産\n普通預金\n300");
  });

  it("長い表の行、文末で区切られた段落、番号つき行を結合しない", () => {
    const table = "項目名    とても長い説明が続く資料の行であっても、空白で分かれた列は維持する必要がある\n次の行    別の金額と説明";
    expect(formatPracticalProse(table)).toBe(table);
    const paragraphs = "この文は十分に長いので、表示上の折り返しと誤認してはならない。\nこの文は独立した別の段落である。";
    expect(formatPracticalProse(paragraphs)).toBe(paragraphs);
    const numbered = "設問の条件が長く続いていても、以下の選択肢は別の行に表示する必要があります\n１．第一の選択肢";
    expect(formatPracticalProse(numbered)).toBe(numbered);
  });
});
