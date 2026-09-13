import type { ExamCode } from "@/lib/questions/types";
import type { NoteLinkSource } from "@/components/analytics/TrackedNoteLink";

export type NoteGuideKind = "free" | "paid";
export type NoteGuideAccount = "ipa_quiz_ai" | "sikaku_rakutoru";

export interface NoteGuideLink {
  /**
   * 表示ラベル・CTA文言を決める唯一の情報源。"paid" を "free" 側の文言で
   * 出してはならない（逆も同様）。呼び出し側は必ずこの値で分岐すること。
   */
  kind: NoteGuideKind;
  href: string;
  label: string;
  source: NoteLinkSource;
  account: NoteGuideAccount;
}

// 出典: components/exam/ExamNoteGuide.tsx の既存 NOTE_GUIDES を 2026-09-13 に
// 移設したもの（href / label / source はバイト単位で同一）。
// 注意: これらのURLが note.com 上で現在も公開されているかは未確認。
// 新規追加も死リンク削除も、実際にURLを開いて確認してから行うこと。
export const EXAM_NOTE_GUIDES: Partial<Record<ExamCode, NoteGuideLink>> = {
  sa: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/n9e207dfe4421",
    label: "性能見積もりの根拠を4段階で書く",
    source: "exam_sa",
    account: "sikaku_rakutoru",
  },
  st: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/n6ebb89810300",
    label: "投資対効果を3手順と2指標で書く",
    source: "exam_st",
    account: "sikaku_rakutoru",
  },
  nw: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/n3a7c95159e7a",
    label: "冗長切替を3段階の答案型で整理する",
    source: "exam_nw",
    account: "sikaku_rakutoru",
  },
};

export function getNoteGuide(exam: ExamCode): NoteGuideLink | undefined {
  return EXAM_NOTE_GUIDES[exam];
}
