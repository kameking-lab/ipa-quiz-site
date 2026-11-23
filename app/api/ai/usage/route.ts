import { AI_FEATURES, type AiFeature } from "@/lib/ai/access-policy";
import { readAiUsageStatus } from "@/lib/ai/usage-server";

export const runtime = "nodejs";

export function GET(request: Request) {
  const feature = new URL(request.url).searchParams.get("feature") ?? "copilot";
  if (!AI_FEATURES.includes(feature as AiFeature)) return new Response(null, { status: 400 });
  return readAiUsageStatus(request, feature as AiFeature);
}
