import { z } from "zod";
import { billingFailure, billingIdentity, json, sameOrigin } from "@/lib/billing/runtime";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    z.object({}).strict().parse(await request.json());
    const { service, provider } = monthlyRuntime(); // Existing members can manage/cancel while new sales are disabled.
    return json(await service.portal(userId, provider));
  } catch (error) { return billingFailure(error); }
}
