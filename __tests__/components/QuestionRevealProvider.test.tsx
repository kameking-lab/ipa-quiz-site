import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QuestionRevealProvider, QuestionExplanationDetails } from "@/components/quiz/QuestionRevealProvider";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { DescriptiveAnswerCard } from "@/components/quiz/DescriptiveAnswerCard";
import { createHistoryStore } from "@/lib/storage/history";
import type { Question } from "@/lib/questions/types";

const question: Question = {
  id: "ip-2024s-am-q1", exam: "ip", session: "am", year: 2024,
  season: "spring", qNumber: 1, type: "multiple-choice", category: "テクノロジ",
  topicTags: [], difficulty: 2, question: "設問の本文",
  choices: { ア: "選択肢A", イ: "選択肢B", ウ: "選択肢C", エ: "選択肢D" }, answer: "イ",
  explanation: "正答の根拠です。", hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html", license: "IPA-public",
};

function renderInlineAnswer() {
  const view = render(<QuestionRevealProvider>
    <QuestionAnswerCard
      question={question} questionId={question.id} choices={question.choices}
      answerKey={question.answer} exam={question.exam} year={question.year}
      season={question.season} session={question.session} qNumber={question.qNumber}
    />
    <section id="explanation" aria-label="解説">
      <QuestionExplanationDetails>
        <summary>解説</summary>
        <p>正答の根拠です。</p>
      </QuestionExplanationDetails>
    </section>
  </QuestionRevealProvider>);
  const details = view.container.querySelector("#explanation details") as HTMLDetailsElement;
  return { ...view, details };
}

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(null, "", "/q/ip/2024-spring/am/q1");
});

describe("/q inline solve and read", () => {
  it("hides the explanation while solving and opens it with the answer action", async () => {
    const { details } = renderInlineAnswer();
    expect(details.open).toBe(false);
    fireEvent.click(screen.getByRole("radio", { name: /^選択肢 イ:/ }));
    await waitFor(() => expect(details.open).toBe(true));
    expect(screen.getByText("正答の根拠です。")).toBeVisible();
  });

  it("opens the same explanation for the existing ungraded reading action without recording an answer", async () => {
    const { details } = renderInlineAnswer();
    fireEvent.click(screen.getByRole("button", { name: "採点せずに答えだけ見る" }));
    await waitFor(() => expect(details.open).toBe(true));
    expect(createHistoryStore().getAllEntries()).toEqual([]);
  });

  it("keeps a direct #explanation reading link open", async () => {
    window.history.replaceState(null, "", "/q/ip/2024-spring/am/q1#explanation");
    const { details } = renderInlineAnswer();
    await waitFor(() => expect(details.open).toBe(true));
    expect(screen.getByText("正答の根拠です。")).toBeVisible();
  });

  it("closes the next question's explanation on client-side question navigation", async () => {
    const page = (id: string) => <QuestionRevealProvider key={id}>
      <QuestionAnswerCard
        question={question} questionId={id} choices={question.choices}
        answerKey={question.answer} exam={question.exam} year={question.year}
        season={question.season} session={question.session} qNumber={question.qNumber}
      />
      <section id="explanation"><QuestionExplanationDetails><summary>解説</summary><p>正答の根拠です。</p></QuestionExplanationDetails></section>
    </QuestionRevealProvider>;
    const view = render(page(question.id));
    fireEvent.click(screen.getByRole("radio", { name: /^選択肢 イ:/ }));
    await waitFor(() => expect(view.container.querySelector("#explanation details")).toHaveAttribute("open"));
    view.rerender(page("ip-2024s-am-q2"));
    expect(view.container.querySelector("#explanation details")).not.toHaveAttribute("open");
  });

  it("hides a descriptive model answer until requested, then opens the surrounding explanation too", async () => {
    const descriptive: Question = {
      ...question, id: "chosashi-2025a-am-q11", exam: "chosashi", type: "descriptive",
      answer: "模範解答", modelAnswer: "根拠を示す模範解答", choices: undefined,
      sourcePdfUrl: "https://www.moj.go.jp/content/001450010.pdf", license: "MOJ-attributed",
    };
    const view = render(<QuestionRevealProvider>
      <DescriptiveAnswerCard question={descriptive} />
      <section id="explanation">
        <QuestionExplanationDetails><summary>解説</summary><p>記述の補足解説</p></QuestionExplanationDetails>
      </section>
    </QuestionRevealProvider>);
    const details = view.container.querySelectorAll("details");
    expect(details[0]?.open).toBe(false);
    expect(details[1]?.open).toBe(false);
    fireEvent.click(details[0]!.querySelector("summary")!);
    await waitFor(() => expect(details[1]?.open).toBe(true));
    expect(screen.getByText("記述の補足解説")).toBeVisible();
  });
});
