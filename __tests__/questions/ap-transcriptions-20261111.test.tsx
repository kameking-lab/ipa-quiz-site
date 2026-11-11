import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { AP_QUESTIONS } from "@/data/questions/ap";
import { AP_BY_YEAR_QUESTIONS } from "@/data/questions/ap/by-year";
import { AP_TRANSCRIPTION_RESTORATIONS } from "@/data/questions/corrections/ap-transcriptions-20261111";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { QuestionBody } from "@/components/quiz/QuestionBody";

const question = (id: string) => AP_QUESTIONS.find(q => q.id === id)!;

// Evaluate the stored notation rather than a second transcription of each choice.
function evaluate(text: string, values: Record<string, number>, mask = 1): number {
  let offset = 0;
  const precedence: Record<string, number> = { "→": 1, "∨": 2, "∪": 2, "∧": 3, "∩": 3, "・": 3, "−": 3 };
  function expression(min = 0): number {
    const token = text[offset++];
    let left: number;
    if (token === "¬") left = ~expression(4) & mask;
    else if (token === "(") {
      left = expression();
      expect(text[offset++]).toBe(")");
    } else {
      expect(values).toHaveProperty(token);
      left = values[token];
    }
    while (offset < text.length) {
      const op = text[offset];
      const priority = precedence[op];
      if (priority === undefined || priority < min) break;
      offset++;
      const right = expression(priority + (op === "→" ? 0 : 1));
      if (op === "→") left = ~left | right;
      else if (op === "∨" || op === "∪") left |= right;
      else if (op === "−") left &= ~right;
      else left &= right;
      left &= mask;
    }
    return left;
  }
  const result = expression();
  expect(offset).toBe(text.length);
  return result;
}

afterEach(cleanup);

describe("AP official-PDF transcription restorations", () => {
  it("retains all official answers and loads eight complete restorations through both loaders", async () => {
    const official: Record<string, string> = {
      "ap-2016a-am-q1": "ウ", "ap-2017a-am-q23": "ウ", "ap-2017h-am-q4": "エ",
      "ap-2018a-am-q30": "エ", "ap-2012a-am-q1": "ア", "ap-2013a-am-q4": "エ",
      "ap-2013h-am-q2": "ア", "ap-2013h-am-q28": "エ",
    };
    expect(Object.keys(AP_TRANSCRIPTION_RESTORATIONS).sort()).toEqual(Object.keys(official).sort());
    const originalAnswers = new Map(AP_BY_YEAR_QUESTIONS.map(q => [q.id, q.answer]));
    expect(AP_QUESTIONS).toHaveLength(AP_BY_YEAR_QUESTIONS.length);
    for (const [id, answer] of Object.entries(official)) {
      const q = question(id);
      expect(q.answer, id).toEqual(originalAnswers.get(id));
      expect(AP_TRANSCRIPTION_RESTORATIONS[id]).not.toHaveProperty("answer");
      expect(q.answer).toBe(answer);
      expect(Object.keys(q.choiceExplanations!).sort()).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(new Set(Object.values(q.choices!)).size).toBe(4);
      for (const [key, reason] of Object.entries(q.choiceExplanations!)) {
        expect(reason.startsWith(key === answer ? "正しいです。" : "誤りです。")).toBe(true);
        expect(reason.length).toBeGreaterThanOrEqual(60);
        expect(reason.length).toBeLessThanOrEqual(180);
      }
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.ipa\.go\.jp\/.*_qs\.pdf$/);
      expect(q.sourceAnswerUrl).toBe(q.sourcePdfUrl.replace("_qs.pdf", "_ans.pdf"));
    }
    expect(await getQuestionsForExam("ap")).toEqual(AP_QUESTIONS);
  });

  it("preserves the scope of negation for all 256 byte values", () => {
    const q = question("ap-2016a-am-q1");
    const matching = Object.entries(q.choices!).filter(([, text]) =>
      Array.from({ length: 256 }, (_, A) => A).every(A =>
        evaluate(text, { A, X: 0x0f, Y: 0xf0 }, 0xff) === ((A ^ 0x0f) & 0x0f)),
    );
    expect(matching.map(([key]) => key)).toEqual([q.answer]);
  });

  it("makes only the official set expressions equivalent for every membership combination", () => {
    for (const [id, target] of [
      ["ap-2012a-am-q1", "(¬A)∩(¬B)"],
      ["ap-2013h-am-q2", "¬((A∪B)∩((¬A)∪(¬B)))"],
    ]) {
      const q = question(id);
      expect(q.question).toContain(target);
      const matching = Object.entries(q.choices!).filter(([, text]) =>
        [0, 1].every(A => [0, 1].every(B =>
          evaluate(text, { A, B, S: 1 }) === evaluate(target, { A, B, S: 1 }))),
      );
      expect(matching.map(([key]) => key)).toEqual([q.answer]);
    }
  });

  it("makes only the official implication true for both values of R", () => {
    const q = question("ap-2013a-am-q4");
    const matching = Object.entries(q.choices!).filter(([, text]) =>
      [0, 1].every(R => evaluate(text, { P: 1, Q: 1, R }) === 1),
    );
    expect(matching.map(([key]) => key)).toEqual([q.answer]);
  });

  it("renders the lock tables with the official row/column orientation", () => {
    const grids = {
      ア: ["共用", "○", "○", "排他", "○", "×"],
      イ: ["共用", "○", "×", "排他", "○", "×"],
      ウ: ["共用", "○", "○", "排他", "×", "×"],
      エ: ["共用", "○", "×", "排他", "×", "×"],
    };
    for (const [key, text] of Object.entries(question("ap-2018a-am-q30").choices!)) {
      const { container, unmount } = render(<QuestionBody text={text} />);
      expect([...container.querySelectorAll("th")].map(cell => cell.textContent))
        .toEqual(["後続のアクセスモード", "先行：共用", "先行：排他"]);
      expect([...container.querySelectorAll("td")].map(cell => cell.textContent))
        .toEqual(grids[key as keyof typeof grids]);
      unmount();
    }
  });

  it("shows BNF alternatives and distinguishes gate types and relational keys", () => {
    const bnf = question("ap-2017h-am-q4");
    const { container } = render(<QuestionBody text={`${bnf.question}\n${bnf.choices!.エ}`} />);
    expect(container.textContent).toContain("<identifier> ::= a");
    expect(container.textContent).toContain("<letter> | <identifier><digit> | <identifier><letter>");
    expect(container.querySelector("table")).toBeNull();
    const gate = question("ap-2017a-am-q23");
    expect(gate.question).toContain("G=1のときはX=¬A、Y=¬B");
    expect(gate.choices!.ア).toContain("NAND");
    expect(gate.choices!.ウ).toContain("XOR");
    expect(gate.choices!.エ).toContain("Bと¬GのAND");
    const keys = question("ap-2013h-am-q28");
    expect(keys.choices!.ウ).toContain("プログラマ表の主キー：社員番号\n");
    expect(keys.choices!.エ).toContain("プログラマ表の主キー：社員番号とプログラム言語の組");
    for (const choice of [keys.choices!.ウ, keys.choices!.エ]) {
      expect(choice).toContain("プログラマ表の外部キー：社員番号");
    }
  });
});
