"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { posthogCapture } from "@/lib/posthog";
// KNOWN_NOTE_ACCOUNTS / deriveNoteAccountFromUrl は lib/note-accounts.ts にある。
// サーバーコンポーネントからも呼ぶ必要があり、"use client" の付いたこのファイルに
// 置くとサーバー側の呼び出しが実行時に落ちるため。
import type { NoteAccount } from "@/lib/note-accounts";

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
