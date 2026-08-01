// 運用者が気づく必要のある異常だけを Slack へ上げる。
//
// 「ログには残っているが誰も見ない」状態を潰すための経路。とくに採点系の
// mock-fallback は、AI 呼び出しの課金は発生しているのに利用者へ返るのは
// 字数ベースの簡易判定という状態で、200 を返して静かに壊れ続ける。
// 利用者側には gradingMode:"simplified" で開示されるが、運用側には何も届かない。
//
// 逆に、鳴りすぎる通知は無視されるようになり、鳴らない通知と同じくらい悪い。
// そこで同一事象は cooldown の間 1 回しか送らない。抑制は Upstash KV の
// incr + expire（cost-guard の firstCrossing と同じ手口。SET NX は REST の
// エンコードが曖昧なので使わない）。
//
// 通知しないもの:
// - rate_limited: 無料枠・IP 制限は正常動作であって異常ではない。件数が多く、
//   通知すると他の警報が埋もれる。件数は X-RateLimit-* と KV で追える。
// - cost_capped: ¥50,000 到達時に cost-guard が 1 回通知済み。以後の 503 は
//   その帰結なので、二重に鳴らす必要がない。

import { after } from "next/server";

import { sendSlackMessage } from "@/lib/notify/slack";
import type { StreamCompletion } from "@/lib/ai/provider";

const KV_TIMEOUT_MS = 1_500;

/** 同一事象の通知間隔の既定（1 時間）。 */
export const DEFAULT_ALERT_COOLDOWN_SEC = 3_600;

function kvConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL?.replace(/\/$/, "");
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function kvFetch<T>(path: string): Promise<T | null> {
  const cfg = kvConfig();
  if (!cfg) return null;
  try {
    const res = await fetch(`${cfg.url}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.token}` },
      signal: AbortSignal.timeout(KV_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * cooldown 内で最初の 1 回かどうか。
 *
 * KV が無い（ローカル / CI）ときは true を返して通知を試みる。そこには
 * SLACK_WEBHOOK_URL も無いのが普通なので、実際には console.error に落ちる。
 * KV が一時的に落ちているときも true 側（通知する）に倒す。異常を握り潰す
 * よりは、重複してでも届くほうがよい。
 */
async function isFirstInWindow(key: string, cooldownSec: number): Promise<boolean> {
  if (!kvConfig()) return true;
  const data = await kvFetch<{ result: number }>(`/incr/${encodeURIComponent(key)}`);
  const n = data?.result;
  if (typeof n !== "number") return true;
  if (n === 1) {
    await kvFetch(`/expire/${encodeURIComponent(key)}/${cooldownSec}`);
    return true;
  }
  return false;
}

export interface OpsAlertInput {
  /** 事象の識別子。同じ事象は同じ値にする（例: "scoring:mock-fallback"）。 */
  key: string;
  /** Slack に流す本文。 */
  text: string;
  /** 同一 key を再通知しない秒数。既定 1 時間。 */
  cooldownSec?: number;
}

/**
 * 運用アラートを送る。同一 key は cooldown の間 1 回だけ。
 * 決して throw しない（通知の失敗で利用者向けの処理を壊さない）。
 *
 * @returns 実際に Slack へ送ったか（抑制された場合は false）
 */
export async function notifyOpsOnce(input: OpsAlertInput): Promise<boolean> {
  try {
    const cooldownSec = input.cooldownSec ?? DEFAULT_ALERT_COOLDOWN_SEC;
    if (!(await isFirstInWindow(`ops_alert:${input.key}`, cooldownSec))) {
      return false;
    }
    return await sendSlackMessage(input.text);
  } catch (err) {
    console.error("[ops-alert] failed", err, "key:", input.key);
    return false;
  }
}

/**
 * 利用者への応答をブロックせずに運用アラートを送る。
 *
 * 通知は利用者の待ち時間を伸ばす理由がないので after() でレスポンス送出後に
 * 回す（contact ルートと同じ作法）。ただし after() はリクエストスコープ外で
 * 呼ぶと throw するため、素の void へ落とす経路を必ず用意する。ここで throw
 * すると「通知の都合で採点そのものが 500 になる」という最悪の失敗になる。
 */
export interface GradingFallbackAlertInput {
  /** 発生したルート（例: "/api/scoring"）。 */
  route: string;
  questionId: string;
  model: string;
  usage: StreamCompletion | undefined;
  rawChars: number;
}

/**
 * 採点が簡易判定に落ちたことを伝える本文を組み立てる。
 *
 * 原因の切り分けに要るものだけを載せる。とくに finishReason と思考トークンは
 * 「出力上限を思考が食い潰して JSON が切れた」という過去の事故そのものの
 * 指紋なので、通知だけ見て次の手が決まるようにする。
 */
export function buildGradingFallbackAlert(input: GradingFallbackAlertInput): string {
  const { usage } = input;
  const cause = usage?.truncated
    ? "出力上限で応答が途中終了（truncated）"
    : "AI 応答の解析に失敗";
  return [
    `⚠️ [過去問AI] ${input.route} が簡易判定にフォールバックしました（課金は発生済み・利用者には simplified と開示）。`,
    `原因: ${cause}`,
    `問題: ${input.questionId} / モデル: ${input.model}`,
    `finishReason=${usage?.finishReason ?? "不明"} outputTokens=${usage?.outputTokens ?? "不明"} thoughtsTokens=${usage?.thoughtsTokens ?? "不明"} 応答文字数=${input.rawChars}`,
    `※ 同じ事象は 1 時間に 1 回だけ通知します。`,
  ].join("\n");
}

export function notifyOpsInBackground(input: OpsAlertInput): void {
  const run = () => notifyOpsOnce(input);
  try {
    after(run);
  } catch {
    void run();
  }
}
