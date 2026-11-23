import "server-only";
import { sendSlackMessage } from "@/lib/notify/slack";
import { SITE_BASE_URL } from "@/lib/seo/config";
import { IMPROVEMENT_CHOICES, type FeedbackExport } from "./unlock-contract";

type Notification = Pick<FeedbackExport, "receivedAt" | "choices" | "requestedQualifications" | "commentMasked">;

const escapeSlack = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** Receives only the masked fields persisted for the benefit, without identity metadata. */
export async function notifyFeedbackUnlock(feedback: Notification): Promise<void> {
  if (!process.env.SLACK_WEBHOOK_URL) return;
  try {
    const choices = IMPROVEMENT_CHOICES.filter(choice => feedback.choices.includes(choice.id)).map(choice => choice.label);
    const delivered = await sendSlackMessage([
      "[過去問AI] フィードバックで+10問 受信",
      `受信日時: ${feedback.receivedAt}`,
      `選ばれた改善点: ${choices.join(" / ") || "(選択なし)"}`,
      `ほしい資格: ${feedback.requestedQualifications.map(escapeSlack).join(" / ") || "(未記入)"}`,
      `コメント: ${escapeSlack(feedback.commentMasked) || "(コメントなし)"}`,
      `管理画面: ${SITE_BASE_URL}/admin/feedback`,
    ].join("\n"));
    if (!delivered) console.error("[feedback-unlock] Slack notification failed");
  } catch {
    // Do not log the exception, webhook, original text or account identifiers.
    console.error("[feedback-unlock] Slack notification failed");
  }
}
