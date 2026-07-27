import { LS_KEYS } from "./keys";
import { FREE_AI_DAILY_LIMIT, POST_FEEDBACK_AI_DAILY_LIMIT } from "@/lib/constants/ai-quota";

interface UsageData {
  date: string;
  count: number;
}

function jstDateString(d: Date = new Date()): string {
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

export function readAiUsage(): UsageData {
  if (typeof window === "undefined") return { date: jstDateString(), count: 0 };
  try {
    const raw = window.localStorage.getItem(LS_KEYS.aiUsage);
    if (!raw) return { date: jstDateString(), count: 0 };
    const parsed = JSON.parse(raw) as UsageData;
    const today = jstDateString();
    if (parsed.date !== today) return { date: today, count: 0 };
    return parsed;
  } catch {
    return { date: jstDateString(), count: 0 };
  }
}

export function incrementAiUsage(): UsageData {
  const current = readAiUsage();
  const next: UsageData = { date: current.date, count: current.count + 1 };
  try {
    window.localStorage.setItem(LS_KEYS.aiUsage, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

/**
 * Initial free quota before the feedback gate triggers.
 * After feedback is submitted, the limit effectively becomes unlimited.
 */
export const FREE_DAILY_LIMIT_CLIENT = FREE_AI_DAILY_LIMIT;
export const POST_FEEDBACK_DAILY_LIMIT_CLIENT = POST_FEEDBACK_AI_DAILY_LIMIT;

export function readFeedbackSubmitted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(LS_KEYS.feedbackSubmitted) === "true";
  } catch {
    return false;
  }
}

export function setFeedbackSubmitted(value = true): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.feedbackSubmitted, value ? "true" : "false");
  } catch {
    // ignore
  }
}

export function effectiveDailyLimit(): number {
  return readFeedbackSubmitted() ? POST_FEEDBACK_DAILY_LIMIT_CLIENT : FREE_DAILY_LIMIT_CLIENT;
}

/**
 * ローカルの解除フラグをサーバの実際の枠と同期する（移行用）。
 *
 * 無料枠解除の判定根拠が「クライアントの自己申告ヘッダ」から「サーバ署名済み
 * Cookie」に変わったため、旧方式で解除済みのユーザーは localStorage だけが
 * true でサーバ側の証跡を持たない状態になる。放置すると、UI は「解除済み」の
 * ままなのに実際は 10 回で止まる＝ユーザーから見て原因不明の頭打ちになる。
 *
 * そこで成功レスポンスの X-RateLimit-Limit を見て、サーバが無料枠のままだと
 * 分かったらローカルの解除フラグを落とす。次の枠到達でフィードバックゲートが
 * 一度だけ再表示され、ワンクリックの再投稿で正規の Cookie を受け取れる。
 * （解除そのものは失われず、証跡の取り直しが 1 回入るだけ）
 *
 * 成功レスポンスのみを見るのは、429 の分次制限が別の limit 値を返しうるため。
 */
export function syncFeedbackUnlockFromResponse(res: {
  ok: boolean;
  headers: { get(name: string): string | null };
}): void {
  if (!res.ok) return;
  if (!readFeedbackSubmitted()) return;
  const limit = Number(res.headers.get("X-RateLimit-Limit"));
  if (!Number.isFinite(limit) || limit <= 0) return;
  if (limit >= POST_FEEDBACK_DAILY_LIMIT_CLIENT) return; // サーバも解除済み
  setFeedbackSubmitted(false);
}
