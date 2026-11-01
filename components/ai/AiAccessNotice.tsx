"use client";

import { useState, useCallback } from "react";
import { AI_ACCESS_DESCRIPTION, AI_ATTEMPT_DESCRIPTION, BROWSER_AUDIO_DESCRIPTION, aiAccessClaimsEnabled, aiResponseNotice, hasAiQuotaContinuation } from "./ai-access-copy";

/** Last response evidence is displayed as such; it never establishes current membership or gates a request. */
export function useAiAccessNotice(contextKey: string) {
  const [last, setLast] = useState<{key:string; message:string} | null>(null);
  const begin = useCallback(() => setLast(null), []);
  const response = useCallback((value: Pick<Response,"status"|"headers">) => setLast({key:contextKey,message:aiResponseNotice(value)}), [contextKey]);
  const uncertain = useCallback(() => setLast({key:contextKey,message:"通信結果が不明なため、今回のAI回数の消費は確認できません。"}), [contextKey]);
  return {
    begin, response, uncertain,
    message: last?.key === contextKey ? last.message : null,
  };
}

export function AiAccessNotice({message}: {message?:string|null}) {
  if (!aiAccessClaimsEnabled()) return null;
  return <aside aria-label="AIの利用条件" className="my-2 space-y-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
    <details>
      <summary className="cursor-pointer">無料AI：1日3回（全機能共通）・ブラウザー音声無料／利用条件</summary>
      <p>{AI_ACCESS_DESCRIPTION}</p>
      <p>{AI_ATTEMPT_DESCRIPTION}</p>
      <p>{BROWSER_AUDIO_DESCRIPTION}</p>
    </details>
    {message ? <p role="status" aria-live="polite">{message}</p> : null}
    {hasAiQuotaContinuation(message) ? <nav aria-label="無料AI枠の上限後の選択肢" className="flex flex-wrap gap-x-4 gap-y-2">
      <a className="underline underline-offset-2" href="/search">無料の問題検索へ</a>
      <a className="underline underline-offset-2" href="/review">保存済み履歴の復習へ</a>
      <a className="underline underline-offset-2" href="/billing">有料プランの条件・受付状況を確認</a>
    </nav> : null}
  </aside>;
}
