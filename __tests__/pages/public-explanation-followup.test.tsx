import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import { FAQS } from "@/data/faq";
import { FaqItem } from "@/components/faq/FaqItem";
import { ExamOfficialResources } from "@/components/exam/ExamOfficialResources";
import { examMetaDescription } from "@/lib/seo/exam-meta";
import { RINSHO_KENSAGISHI_QUESTIONS } from "@/data/questions/rinsho-kensagishi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

vi.mock("@/components/ShareButtons", () => ({ ShareButtons: () => null }));
vi.mock("@/lib/posthog", () => ({ posthogCapture: vi.fn() }));

function faq(question: string) {
  const item = FAQS.find((entry) => entry.question === question);
  if (!item) throw new Error(`Missing FAQ: ${question}`);
  return item;
}

describe("bounded public explanation follow-up", () => {
  it("qualifies account-field omission and warns that entered data remains in questions and conversation history", () => {
    render(<AboutPage />);
    expect(screen.getByText(/質問文・直近の会話履歴・該当問題のコンテキスト/)).toBeInTheDocument();
    const warning = screen.getByText(/アカウントの氏名・メールアドレスを問題コンテキストに自動付加しません/);
    expect(warning).toHaveTextContent("質問や会話履歴に含めた個人情報は送信される");
    expect(warning).toHaveTextContent("質問に入力しないでください");
    expect(screen.queryByText("個人を特定する情報は送信しません。")).not.toBeInTheDocument();
    const privacy = readFileSync("app/privacy/page.tsx", "utf8");
    expect(privacy).toContain("アカウントの氏名・メールアドレスを問題コンテキストに自動付加しません");
    expect(privacy).toContain("ご自身が質問に入力した個人情報は質問内容として送信される");
  });

  it("distinguishes qualification-specific official sources from independently edited explanations", () => {
    const source = faq("過去問の出典とライセンスは？");
    expect(source.answer).toContain("資格ごとに異なり");
    expect(source.answer).toContain("日本FP協会");
    expect(source.answer).toContain("厚生労働省");
    expect(source.answer).not.toContain("すべての問題は IPA");
    const pending = faq("解説が『準備中』と表示される問題があるのはなぜですか？");
    expect(pending.answer).toContain("試験実施団体の公式解説ではありません");
    expect(pending.answer).not.toContain("順次、公式な解説を整備");
  });

  it("uses the published 2026 general CBT application windows and keeps special measures separate", () => {
    const application = faq("IPA 情報処理技術者試験の受験申込はどこから行いますか？");
    for (const text of ["2026年10月6日", "11月7日17時", "10月24日17時", "2027年1月27日", "2月16日", "2月27日", "特別措置筆記"]) expect(application.answer).toContain(text);
    expect(application.answer).not.toContain("約 2 ヶ月前");
    const results = faq("合格発表はいつですか？");
    expect(results.answer).toContain("科目B群は後日の成績照会");
    expect(results.answer).toContain("前期2027年2月頃");
    expect(results.answer).toContain("後期6月頃");
    expect(results.answer).not.toContain("ペーパー方式の試験（AP・高度）");
    const venue = faq("試験会場はどこですか？");
    expect(venue.answer).toContain("一般受験はCBT");
    expect(venue.answer).toContain("会場は指定できず");
  });

  it("renders clickable primary-source references for the application and venue explanations", () => {
    const item = faq("試験会場はどこですか？");
    const { container } = render(<FaqItem index={62} {...item} />);
    const links = [...container.querySelectorAll("a")].map((link) => link.getAttribute("href"));
    expect(links).toEqual([
      "https://www.ipa.go.jp/shiken/2026/ap_koudo_sc_kikan.html",
      "https://www.ipa.go.jp/shiken/2026/r08zenki_tokubetsusochi.html",
      "https://www.ipa.go.jp/shiken/2026/r08kouki_tokubetsusochi.html",
    ]);
  });

  it("describes both existing clinical-laboratory rounds while retaining partial coverage and their exact sources", () => {
    const questions = RINSHO_KENSAGISHI_QUESTIONS.filter(isPracticeReadyQuestion);
    expect(questions).toHaveLength(28);
    expect(questions.filter((question) => question.year === 2026)).toHaveLength(18);
    expect(questions.filter((question) => question.year === 2025)).toHaveLength(10);
    const description = examMetaDescription("rinsho-kensagishi", questions.length);
    expect(description).toContain("第72回（2026年実施）・第71回（2025年実施）");
    expect(description).toContain("28原問");
    expect(description).toContain("部分収録");
    expect(description).toContain("全問は未完備");
    const { container } = render(<ExamOfficialResources exam="rinsho-kensagishi" />);
    const sourceUrls = new Set(questions.flatMap((question) => [question.sourcePdfUrl, question.sourceAnswerUrl]).filter(Boolean));
    const hrefs = [...container.querySelectorAll("a")].map((link) => link.getAttribute("href"));
    expect(new Set(hrefs)).toEqual(sourceUrls);
    expect(hrefs).toHaveLength(4);
  });
});
