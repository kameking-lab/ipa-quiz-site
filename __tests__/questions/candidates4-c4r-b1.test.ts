import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

const targets: [string, number, string, number][] = [
  ["tobi2", 2024, "early", 50], ["tobi3", 2024, "early", 30],
  ["tobi2", 2023, "early", 50], ["kenchiku-daiku1", 2024, "late", 50],
  ["kenchiku-daiku3", 2024, "early", 30], ["kenchiku-daiku3", 2024, "late", 30],
  ["kashikin", 2022, "annual", 50], ["kashikin", 2021, "annual", 50],
  ["kashikin", 2020, "annual", 50], ["kashikin", 2016, "annual", 50],
  ["yamaguchi-seika", 2023, "annual", 66], ["yamaguchi-seika", 2022, "annual", 66],
  ["kikai-hozen3", 2025, "round1", 30], ["kikai-hozen-denki3", 2025, "round1", 30],
  ["kikai-hozen3", 2025, "round2", 30],
];
const get = (exam: string, year: number, season: string, n: number) =>
  ALL_QUESTIONS.find((q) => q.exam === exam && q.year === year && q.season === season && q.qNumber === n)!;

describe("CANDIDATES4 c4r-B1 原本照合の回帰検証", () => {
  it("対象15セット662問を重複IDなしで演習へ接続する", () => {
    const questions = targets.flatMap(([exam, year, season, count]) => {
      const paper = ALL_QUESTIONS.filter((q) => q.exam === exam && q.year === year && q.season === season);
      expect(paper, `${exam}/${year}-${season}`).toHaveLength(count);
      expect(paper.every(isPracticeReadyQuestion)).toBe(true);
      return paper;
    });
    expect(questions).toHaveLength(662);
    expect(new Set(questions.map((q) => q.id)).size).toBe(662);
  });

  it("大工1級B6の選択肢を原本の順序で示す", () => {
    const q = get("kenchiku-daiku1", 2024, "late", 31);
    expect(q.choices?.イ).toBe("八幡造り");
    expect(q.choices?.ウ).toBe("春日造り");
    expect(q.answer).toBe("エ");
  });

  it("貸金2016問13の注番号以降も第四選択肢に保持する", () => {
    const q = get("kashikin", 2016, "annual", 13);
    expect(q.choices?.エ).toContain("非協会員(注1)に対しては");
    expect(q.choices?.エ).toContain("前四半期に出稿した広告等(注2)の写し");
    expect(q.choices?.エ).toMatch(/徴収するものとされている。$/u);
    expect(q.question).not.toContain("(注1)に対しては");
    expect(q.question).toContain("(注1)非協会員とは");
    expect(q.question).toContain("(注2)広告等とは");
    expect(q.answer).toBe("エ");
  });

  it("貸金2016問11は正しい肢をdとして数える", () => {
    const q = get("kashikin", 2016, "annual", 11);
    for (const text of [q.explanation, ...Object.values(q.choiceExplanations ?? {})]) {
      expect(text).toContain("適切なのはｄだけ");
      expect(text).toContain("作成後3年間");
      expect(text).toContain("最終の記載をした日から10年間");
    }
    expect(q.answer).toBe("ア");
    expect(q.officialAnswerNumber).toBe("1");
  });

  it("貸金2016問25の同意記録は信用情報保有中の保存と説明する", () => {
    const q = get("kashikin", 2016, "annual", 25);
    for (const text of [q.explanation, q.choiceExplanations?.イ]) {
      expect(text).toContain("信用情報を保有している間");
      expect(text).not.toContain("債権が消滅した日を基準");
    }
    expect(q.answer).toBe("イ");
  });

  it("製菓の選択肢のルビを問題文へ混入させない", () => {
    expect(get("yamaguchi-seika", 2023, "annual", 27).question).not.toContain("あんそくこうさん");
    expect(get("yamaguchi-seika", 2022, "annual", 37).question).not.toContain("しろざらとう");
  });
});
