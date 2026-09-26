import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { trackEvent, posthogCapture } = vi.hoisted(() => ({
  trackEvent: vi.fn(),
  posthogCapture: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));

import { ExamNoteGuide } from "@/components/exam/ExamNoteGuide";

describe("ExamNoteGuide", () => {
  // IPA 13区分すべてに無料ガイドを結線したので (2026-09-13)、「ガイドが無い試験区分」を
  // 実在のExamCodeで表現できなくなった。分岐そのものは残っている(将来ガイドが失効・
  // 削除されたときに空カードを出さないための防波堤)ので、getNoteGuide を差し替えて
  // 未登録の状態を作り、挙動を今までどおり検証する。
  it("renders nothing when no guide is registered for the exam", async () => {
    vi.resetModules();
    vi.doMock("@/lib/note-guides", async () => {
      const actual = await vi.importActual<typeof import("@/lib/note-guides")>(
        "@/lib/note-guides",
      );
      return { ...actual, getNoteGuide: () => undefined };
    });
    const { ExamNoteGuide: ExamNoteGuideWithNoGuide } = await import(
      "@/components/exam/ExamNoteGuide"
    );
    const { container } = render(<ExamNoteGuideWithNoGuide exam="ip" />);
    expect(container).toBeEmptyDOMElement();
    vi.doUnmock("@/lib/note-guides");
    vi.resetModules();
  });

  it("registers a free guide for every one of the 13 IPA exam codes", async () => {
    const { EXAM_NOTE_GUIDES, getNoteGuide } = await import("@/lib/note-guides");
    const allExamCodes = [
      "ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au",
    ] as const;
    // 13区分が全部埋まっていることが不変条件。civil2 等の非IPA区分の追加は許す。
    for (const exam of allExamCodes) expect(Object.keys(EXAM_NOTE_GUIDES), exam).toContain(exam);
    for (const exam of allExamCodes) {
      const guide = getNoteGuide(exam);
      expect(guide, exam).toBeDefined();
      expect(guide!.kind, exam).toBe("free");
      // account はURLの実際のパスセグメントと一致していること
      // (計測ラベルだけ別垢になる取り違えを防ぐ)。
      expect(new URL(guide!.href).pathname.split("/")[1], exam).toBe(guide!.account);
    }
  });

  it("renders the existing free-guide copy and link for sa unchanged", () => {
    render(<ExamNoteGuide exam="sa" />);
    expect(screen.getByText("noteの無料ガイド")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /無料ガイドを読む/ })).toHaveAttribute(
      "href",
      "https://note.com/sikaku_rakutoru/n/n9e207dfe4421",
    );
    expect(screen.getByLabelText("無料の答案ガイド")).toBeInTheDocument();
  });

  it("renders the verified AU guide with the exam_au source and fires a labelled click", () => {
    render(<ExamNoteGuide exam="au" />);
    expect(screen.getByText("noteの無料ガイド")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /無料ガイドを読む/ });
    expect(link).toHaveAttribute(
      "href",
      "https://note.com/sikaku_rakutoru/n/n573e38ac5dea",
    );
    // 択一のAU記事でも「記述」だけを名指しした誤解を招く表現になっていないこと。
    expect(screen.queryByText(/記述答案の組み立て方/)).not.toBeInTheDocument();

    fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith({
      name: "note_outbound_click",
      source: "exam_au",
      account: "sikaku_rakutoru",
    });
    expect(posthogCapture).toHaveBeenCalledWith("note_outbound_click", {
      source: "exam_au",
      account: "sikaku_rakutoru",
    });
  });

  it("shows the pm paid worksheet as a supplement below the free guide (both visible)", () => {
    render(<ExamNoteGuide exam="pm" />);
    // 無料記事は隠れない。
    const freeLink = screen.getByRole("link", { name: /無料ガイドを読む/ });
    expect(freeLink).toHaveAttribute("href", "https://note.com/sikaku_rakutoru/n/n20f719f019ac");
    // 有料の補助リンクも同じカードに出る。
    const paidLink = screen.getByRole("link", { name: /有料記事を読む/ });
    expect(paidLink).toHaveAttribute("href", "https://note.com/sikaku_rakutoru/n/nb57e5dd70d62");
    expect(screen.getByText("noteの無料ガイド")).toBeInTheDocument();
    expect(screen.getByText("noteの有料記事")).toBeInTheDocument();

    fireEvent.click(paidLink);
    expect(trackEvent).toHaveBeenCalledWith({
      name: "note_outbound_click",
      source: "exam_pm_paid",
      account: "sikaku_rakutoru",
    });
  });

  it("renders no supplement block for exams without an approved paid pairing", () => {
    render(<ExamNoteGuide exam="sa" />);
    expect(screen.queryByText("noteの有料記事")).not.toBeInTheDocument();
  });

  it("never shows free-guide wording when a guide's kind is paid", async () => {
    vi.resetModules();
    vi.doMock("@/lib/note-guides", async () => {
      const actual = await vi.importActual<typeof import("@/lib/note-guides")>(
        "@/lib/note-guides",
      );
      return {
        ...actual,
        getNoteGuide: (exam: string) =>
          exam === "ip"
            ? {
                kind: "paid" as const,
                href: "https://note.com/sikaku_rakutoru/n/test-paid",
                label: "テスト用の有料ガイド",
                source: "exam_sa" as const,
                account: "sikaku_rakutoru" as const,
              }
            : actual.getNoteGuide(exam as never),
      };
    });
    const { ExamNoteGuide: ExamNoteGuideWithPaidMock } = await import(
      "@/components/exam/ExamNoteGuide"
    );
    render(<ExamNoteGuideWithPaidMock exam="ip" />);
    expect(screen.getByText("noteの有料記事")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /有料記事を読む/ })).toBeInTheDocument();
    expect(screen.queryByText(/無料/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /無料ガイドを読む/ })).not.toBeInTheDocument();
    vi.doUnmock("@/lib/note-guides");
  });
});
