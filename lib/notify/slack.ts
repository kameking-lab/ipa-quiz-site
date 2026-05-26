// Shared Slack Incoming Webhook sender.
//
// Inbound user signals (feedback / question comments / question ratings /
// contact) are forwarded here so they actually reach the team instead of only
// landing in ephemeral Vercel logs. SLACK_WEBHOOK_URL is the same secret used by
// the cost cap (lib/ai/cost-guard) and the health-check cron.

const TIMEOUT_MS = 3_000;

/**
 * Post a plain-text message to Slack. Returns true on a 2xx response.
 * Never throws. When SLACK_WEBHOOK_URL is unset the message is logged via
 * console.error (so it is not silently lost) and false is returned.
 */
export async function sendSlackMessage(text: string): Promise<boolean> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    console.error("[slack] SLACK_WEBHOOK_URL unset; message not delivered:", text);
    return false;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return res.ok;
  } catch (err) {
    console.error("[slack] send failed", err);
    return false;
  }
}
