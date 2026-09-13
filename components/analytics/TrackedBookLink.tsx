"use client";

import type { AnchorHTMLAttributes, MouseEvent, Ref } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { posthogCapture } from "@/lib/posthog";

interface TrackedBookLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /**
   * 推薦書ページでは <Button asChild>(Radix Slot) がこのコンポーネントを包み、
   * ref を子に渡してくる。AnchorHTMLAttributes は ref を含まないので明示する。
   * 宣言しないと Slot 経由の利用が型エラーになる(実行時は {...props} で <a> へ届く)。
   */
  ref?: Ref<HTMLAnchorElement>;
  exam: string;
  bookId: string;
  retailer: "amazon" | "rakuten";
  /** どの実配置からのクリックかを区別する。推薦書一覧ページとクイズ内インライン枠は
   * クリック傾向が別物になりうるため、計測時点で分けておく。 */
  placement: "recommended_books_page" | "quiz_inline_hint";
}

/**
 * 参考書アフィリエイトリンクのクリック計測。
 * TrackedNoteLink と同じ方針: クリックの成否に関わらずページ遷移は必ず起こす
 * (trackEvent/posthogCapture は失敗しても黙殺する。副作用ゼロで遷移だけが必須)。
 */
export function TrackedBookLink({
  href,
  exam,
  bookId,
  retailer,
  placement,
  onClick,
  ...props
}: TrackedBookLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent({ name: "book_click", exam, bookId, retailer, placement });
    posthogCapture("book_click", { exam, bookId, retailer, placement });
    onClick?.(event);
  }

  return <a {...props} href={href} onClick={handleClick} />;
}
