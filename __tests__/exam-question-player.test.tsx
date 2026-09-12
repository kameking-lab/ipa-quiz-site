import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import type { ExamQuestion } from "@/lib/exam-library-model";
import { examProgressKey } from "@/lib/exam-library-progress";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";

const EXAM_ID = "lckohyo-TEST01";
const PDF_URL = "https://www.exam.or.jp/wp-content/uploads/2026/04/TEST01.pdf";

function question(number: number, overrides: Partial<ExamQuestion> = {}): ExamQuestion {
  return {
    id: `${EXAM_ID}-q${number}`,
    number,
    text: `問 ${number} テキスト版`,
    images: [`/exam-library/${EXAM_ID}/q${number}.webp`],
    correctChoice: 3,
    choiceCount: 5,
    answerAuthority: "official",
    sourcePages: [number + 1],
    ...overrides,
  };
}

const questions: ExamQuestion[] = [
  question(1, { explanation: "問1の解説本文" }),
  question(2),
  question(3, { correctChoice: null, answerAuthority: "unconfirmed" }),
  question(4, { correctChoice: null, choiceCount: 0, answerAuthority: "descriptive" }),
];

function renderPlayer(items: readonly ExamQuestion[] = questions) {
  return render(
    <ExamQuestionPlayer
      examId={EXAM_ID}
      examTitle="テスト試験 令和8年4月掲載"
      pdfUrl={PDF_URL}
      indexUrl="https://www.exam.or.jp/lckohyo/"
      questions={items}
    />,
  );
}

function answer(choice: number) {
  fireEvent.click(screen.getByRole("radio", { name: new RegExp(`^選択肢 ${choice}:`) }));
}

function next() {
  fireEvent.click(screen.getAllByRole("button", { name: /次の問題|結果を見る|スキップして次へ/ })[0]);
}

describe("ExamQuestionPlayer", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it("shows selectable question text and answer controls without a whole-question screenshot", () => {
    renderPlayer();
    expect(screen.getByRole("heading", { name: /問1/ })).toBeTruthy();
    expect(screen.queryAllByRole("img")).toHaveLength(0);
    expect(screen.queryByRole("button", { name: "原図で読む" })).toBeNull();
    for (let choice = 1; choice <= 5; choice += 1) {
      expect(screen.getByRole("radio", { name: new RegExp(`^選択肢 ${choice}:`) })).toBeTruthy();
    }
    expect(screen.getByText("テキスト版")).toBeTruthy();
  });

  it("immediately grades the selected choice with the official answer and shows the explanation", () => {
    renderPlayer();
    expect(screen.queryByRole("button", { name: "回答する" })).toBeNull();

    answer(3);
    expect(screen.getByRole("heading", { name: "正解" })).toBeTruthy();
    expect(screen.getByText(/あなたの回答 （3） ／ 公式正答 （3）/)).toBeTruthy();
    expect(screen.getByText("問1の解説本文")).toBeTruthy();
  });

  it("renders complete source choices and supports immediate keyboard answers", () => {
    renderPlayer([question(1, { text: "問 1 正しいものはどれか。\n（1）最初の文章\n（2）次の文章\n（3）正しい文章\n（4）四番目\n（5）五番目" }), question(2)]);
    expect(screen.getByRole("radio", { name: /^選択肢 3: 正しい文章/ })).toBeTruthy();
    fireEvent.keyDown(window, { key: "1" });
    expect(screen.getByRole("heading", { name: "不正解" })).toBeTruthy();
    expect(screen.getByRole("radio", { name: /^選択肢 1:/ }).getAttribute("data-state")).toBe("wrong");
    expect(screen.getByRole("radio", { name: /^選択肢 3:/ }).getAttribute("data-state")).toBe("revealed-correct");
    fireEvent.keyDown(window, { key: "Enter" });
    expect(screen.getByRole("heading", { name: /問2/ })).toBeTruthy();
  });

  it("shows transcription and the dedicated diagram together without a reading-mode switch", () => {
    const diagram = `/exam-library/${EXAM_ID}/text-q1-p1-fig1.webp`;
    renderPlayer([question(1, {
      presentation: {
        sourceHash: "verified-in-loader",
        prompt: "下図の装置に関する説明を選べ。",
        choices: ["一", "二", "三", "四", "五"].map((text, index) => ({ number: index + 1, text })),
        figures: [{ src: diagram, alt: "問1の装置の図", width: 500, height: 300 }],
      },
    })]);
    expect(screen.getByText("下図の装置に関する説明を選べ。")).toBeTruthy();
    expect(screen.getByRole("radio", { name: /^選択肢 1: 一/ })).toBeTruthy();
    expect(screen.getByRole("img", { name: "問1の装置の図" }).getAttribute("src")).toBe(diagram);
    expect(screen.queryByRole("button", { name: "文字で読む" })).toBeNull();
    expect(screen.queryByRole("button", { name: "原図で読む" })).toBeNull();
  });

  it("does not change an already submitted answer with another choice", () => {
    renderPlayer();
    answer(3);
    answer(1);
    expect(screen.getByRole("heading", { name: "正解" })).toBeTruthy();
    expect(screen.getByRole("radio", { name: /^選択肢 3:/ }).getAttribute("aria-checked")).toBe("true");
  });

  it("says the explanation is pending with an official source link when none exists", () => {
    renderPlayer();
    next();
    answer(1);
    expect(screen.getByRole("heading", { name: "不正解" })).toBeTruthy();
    expect(screen.getByText(/公式正答 （3）/)).toBeTruthy();
    expect(screen.getByText(/この問題の解説は準備中です/)).toBeTruthy();
    const source = screen.getByRole("link", { name: /公式PDFで問2を確認/ });
    expect(source.getAttribute("href")).toBe(`${PDF_URL}#page=3`);
  });

  it("does not grade unconfirmed or descriptive questions", () => {
    renderPlayer();
    fireEvent.click(screen.getByText(/問題一覧・進捗/));
    fireEvent.click(screen.getByRole("button", { name: "問3（未回答）" }));
    answer(2);
    expect(screen.getByRole("radio", { name: /^選択肢 2:/ }).getAttribute("data-state")).toBe("selected");
    expect(document.querySelector('[data-state="wrong"], [data-state="revealed-correct"]')).toBeNull();
    expect(screen.getByRole("heading", { name: "回答を記録しました（採点なし）" })).toBeTruthy();
    expect(screen.getByText(/公式正答が未登録のため、正誤を表示しません/)).toBeTruthy();
    expect(screen.queryByText("正解")).toBeNull();
    expect(screen.queryByText("不正解")).toBeNull();

    next();
    expect(screen.queryByRole("radio")).toBeNull();
    fireEvent.change(screen.getByLabelText("解答メモ（下書き・任意）"), {
      target: { value: "記述の下書き" },
    });
    fireEvent.click(screen.getByRole("button", { name: "模範解答を見る" }));
    expect(screen.getByRole("heading", { name: "確認済み（採点なし）" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "模範解答・解説（学習用）" })).toBeTruthy();
    expect(screen.getByText(/記述式のため、このサイトでは正誤を判定しません/)).toBeTruthy();
  });

  it("reviews answers and retries only the wrong ones", () => {
    renderPlayer();
    answer(3);
    next();
    answer(1);
    next();
    next();
    next();
    const summary = screen.getByRole("heading", { name: "結果と見直し" });
    expect(summary).toBeTruthy();
    const review = screen.getByRole("heading", { name: "回答の見直し" }).nextElementSibling as HTMLElement;
    expect(within(review).getAllByRole("listitem")).toHaveLength(4);
    expect(within(review).getByText(/あなたの回答 （1） ／ 公式正答 （3）/)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "間違えた1問を解き直す" }));
    expect(screen.getByText(/解き直し 1問目／1問/)).toBeTruthy();
    expect(screen.getByRole("heading", { name: /問2/ })).toBeTruthy();
    answer(3);
    expect(screen.getByRole("heading", { name: "正解" })).toBeTruthy();
    next();
    expect(screen.getByRole("heading", { name: "解き直しの結果" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /間違えた\d+問を解き直す/ })).toBeNull();
  });

  it("never writes to the device until the user opts in, and deletes on opt-out", () => {
    renderPlayer();
    answer(3);
    expect(window.localStorage.getItem(examProgressKey(EXAM_ID))).toBeNull();

    const toggle = screen.getByRole("checkbox", { name: "この端末に保存する" }) as HTMLInputElement;
    expect(toggle.checked).toBe(false);
    act(() => {
      fireEvent.click(toggle);
    });
    const stored = JSON.parse(window.localStorage.getItem(examProgressKey(EXAM_ID)) ?? "null");
    expect(stored.answers[`${EXAM_ID}-q1`]).toEqual({ choice: 3, memo: "", submitted: true });

    act(() => {
      fireEvent.click(toggle);
    });
    expect(window.localStorage.getItem(examProgressKey(EXAM_ID))).toBeNull();
  });

  it("keeps answers across same-tab navigation without opting into long-term storage", () => {
    const first = renderPlayer();
    answer(3);
    next();
    first.unmount();
    renderPlayer();
    expect(screen.getByRole("heading", { name: /問2/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "結果を見る" }));
    expect(screen.getByText(/あなたの回答 （3） ／ 公式正答 （3）/)).toBeTruthy();
    expect(window.localStorage.getItem(examProgressKey(EXAM_ID))).toBeNull();
  });

  it("offers to resume saved progress only on explicit action", () => {
    window.localStorage.setItem(
      examProgressKey(EXAM_ID),
      JSON.stringify({
        version: 1,
        examId: EXAM_ID,
        lastQuestionId: `${EXAM_ID}-q2`,
        updatedAt: "2026-09-11T00:00:00.000Z",
        answers: { [`${EXAM_ID}-q1`]: { choice: 2, memo: "", submitted: true } },
      }),
    );
    renderPlayer();
    expect(screen.getByRole("heading", { name: /問1/ })).toBeTruthy();
    expect(screen.getByText("この端末に保存した進捗があります")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "続きから再開" }));
    expect(screen.getByRole("heading", { name: /問2/ })).toBeTruthy();
    fireEvent.click(screen.getByText(/問題一覧・進捗/));
    expect(screen.getByRole("button", { name: "問1（不正解）" })).toBeTruthy();
    expect((screen.getByRole("checkbox", { name: "この端末に保存する" }) as HTMLInputElement).checked).toBe(true);
  });
});
