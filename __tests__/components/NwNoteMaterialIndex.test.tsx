import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const { trackEvent, posthogCapture } = vi.hoisted(() => ({ trackEvent: vi.fn(), posthogCapture: vi.fn() }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));
import { ExamNoteMaterialIndex } from "@/components/exam/ExamNoteMaterialIndex";
import { NwNoteMaterialIndex } from "@/components/exam/NwNoteMaterialIndex";

beforeEach(() => { cleanup(); vi.clearAllMocks(); });

describe("matched paid article and free qualification index", () => {
  it.each([
    ["st", "ST", "nc9483a96082a", "m7dab1384f6bb", "ST・DX答案設計の無料部分を読む", "自分の事実を入れる空欄シート", "令和6年度春期ITストラテジスト午後Ⅱ・問1"],
    ["sa", "SA", "n3a2e2aa6c490", "mfd0e3cddd722", "SA・データ移行の段落修正を試す", "経験・要求対応・修正・自己点検の4シート", "令和7年度春期システムアーキテクト午後Ⅱ・問2"],
    ["nw", "NW", "n6628c0d46fbc", "mf8652f414646", "NW・記述の字数と解答骨子を確認する", "設問ごとの解答骨子と次に解く過去問", "【令和7年度春期・科目B-2】ネットワークスペシャリスト試験"],
  ] as const)("keeps %s's one priced article separate from its free index", (exam, label, articleKey, indexKey, cta, deliverable, title) => {
    const { container } = render(<ExamNoteMaterialIndex exam={exam} />);
    const card = screen.getByRole("complementary", { name: `${label}の補助教材` });
    const article = within(card).getByRole("link", { name: new RegExp(cta) });
    const index = within(card).getByRole("link", { name: new RegExp(`${label}教材の無料索引を見る`) });
    expect(container.querySelectorAll("a")).toHaveLength(2);
    expect(within(card).getAllByRole("link")[0]).toBe(article);
    expect(article).toHaveAttribute("href", `https://note.com/ipa_quiz_ai/n/${articleKey}`);
    expect(index).toHaveAttribute("href", `https://note.com/ipa_quiz_ai/m/${indexKey}`);
    for (const link of [article, index]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      link.focus();
      expect(link).toHaveFocus();
    }
    expect(card).toHaveTextContent("noteの有料教材・買い切り単品 1,280円");
    expect(card).toHaveTextContent("索引は無料で閲覧できます。");
    expect(card).toHaveTextContent("収録記事は個別購入です。");
    expect(card).toHaveTextContent("続きの購入は任意です。");
    expect(card).toHaveTextContent("無料サイトの選択式過去問・解説");
    expect(card).toHaveTextContent(deliverable);
    expect(within(card).getByRole("heading", { level: 3 })).toHaveTextContent(title);
    // One user activation must produce one event on each existing provider.
    fireEvent.click(article);
    expect(trackEvent).toHaveBeenCalledExactlyOnceWith({ name: "note_outbound_click", source: `exam_${exam}`, account: "ipa_quiz_ai" });
    expect(posthogCapture).toHaveBeenCalledExactlyOnceWith("note_outbound_click", { source: `exam_${exam}`, account: "ipa_quiz_ai" });
    vi.clearAllMocks();
    fireEvent.click(index);
    expect(trackEvent).toHaveBeenCalledExactlyOnceWith({ name: "note_outbound_click", source: `exam_${exam}`, account: "ipa_quiz_ai" });
    expect(posthogCapture).toHaveBeenCalledExactlyOnceWith("note_outbound_click", { source: `exam_${exam}`, account: "ipa_quiz_ai" });
  });

  it("does not add purchase cards to qualifications outside the approved three", () => {
    for (const exam of ["ip", "sg", "fe", "ap", "sc", "kanri", "eisei1"] as const) {
      const { container, unmount } = render(<ExamNoteMaterialIndex exam={exam} />);
      expect(container).toBeEmptyDOMElement();
      unmount();
    }
  });

  it("uses the same NW card through either entry point and gates NW on its exam", () => {
    const { container, unmount } = render(<ExamNoteMaterialIndex exam="nw" />);
    const delegated = container.innerHTML;
    unmount();
    expect(render(<NwNoteMaterialIndex exam="nw" />).container.innerHTML).toBe(delegated);
    expect(render(<NwNoteMaterialIndex exam="sa" />).container).toBeEmptyDOMElement();
  });
});
