import "server-only";
import { aiAccessPolicy, aiNormalUsePolicy } from "./access-config";
import { aiPolicyReady } from "./access-policy";
import { normalUsePolicyReady } from "./normal-use-policy";
import { AI_QUOTA_COPY } from "@/lib/constants/ai-quota";

export const AI_ACCESS_DESCRIPTION = `${AI_QUOTA_COPY} 無料枠はAI機能で共通で、ログインなしでも使えます。毎日0時（日本時間）に更新します。`;
export const AI_COUNTING_DESCRIPTION = "AIの回答が表示されると1回分を使います。";
export const BROWSER_AUDIO_DESCRIPTION = "対応ブラウザーの読み上げと音声入力は無料です。";
export const LEGACY_AI_COPY = "AIコパイロットは無料で質問できます。連続利用や大量送信には適正利用制限があります。";

export function aiAccessClaimsEnabled(now = Date.now()) {
  const policy = aiAccessPolicy();
  return aiPolicyReady(policy, now) && normalUsePolicyReady(aiNormalUsePolicy(), policy.version, now);
}
