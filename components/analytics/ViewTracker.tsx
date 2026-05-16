"use client";

import { useEffect } from "react";
import { posthogCapture, type PostHogEventName, type PostHogEventProps } from "@/lib/posthog";

interface Props {
  event: PostHogEventName;
  props?: PostHogEventProps;
}

/** サーバーコンポーネントのページに埋め込むクライアント計測タグ。マウント時に1回だけ capture する。 */
export function ViewTracker({ event, props }: Props) {
  useEffect(() => {
    posthogCapture(event, props);
    // 初回マウント時のみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
