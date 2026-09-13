"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { posthogCapture } from "@/lib/posthog";

export type NoteLinkSource =
  | "footer"
  | "operator"
  | "exam_sa"
  | "exam_st"
  | "exam_nw"
  | "exam_au"
  | "exam_sc"
  | "exam_pm"
  | "exam_pm_paid"
  | "exam_db"
  | "exam_sm"
  | "exam_es"
  | "exam_sg"
  | "exam_ap"
  | "exam_fe"
  | "exam_ip"
  // 公表問題ライブラリ (data/exam-library/official-catalog.json の noteLinks) 用。
  // ExamCode 単位の source ではなく、免許試験/作業環境測定士/労働安全衛生コンサルタントの
  // 全 group (lckohyo/emkohyo/cskohyo) に共通する1値。個別 group ごとの source は
  // 実測ニーズが出るまで作らない。
  | "exam_library";

/** note_outbound_click / posthogCapture の account として許可する値の唯一の情報源。 */
export const KNOWN_NOTE_ACCOUNTS = ["ipa_quiz_ai", "sikaku_rakutoru", "anzen_ai_jp"] as const;
export type NoteAccount = (typeof KNOWN_NOTE_ACCOUNTS)[number];

/**
 * note.com の記事URLからアカウントを判定する。未知のホスト/パスは null を返し、
 * 呼び出し側は「計測なしの生リンク」にフォールバックすること
 * (計測を追加するために既存リンクを壊さないための安全側デフォルト)。
 */
export function deriveNoteAccountFromUrl(url: string): NoteAccount | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "note.com") return null;
    const segment = parsed.pathname.split("/")[1] ?? "";
    return (KNOWN_NOTE_ACCOUNTS as readonly string[]).includes(segment)
      ? (segment as NoteAccount)
      : null;
  } catch {
    return null;
  }
}

interface TrackedNoteLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  source: NoteLinkSource;
  account: NoteAccount;
}
export function TrackedNoteLink({
  href,
  source,
  account,
  onClick,
  ...props
}: TrackedNoteLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent({ name: "note_outbound_click", source, account });
    posthogCapture("note_outbound_click", { source, account });
    onClick?.(event);
  }

  return <a {...props} href={href} onClick={handleClick} />;
}
