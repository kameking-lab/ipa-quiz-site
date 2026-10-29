import { billingFailure, billingIdentity, billingRuntime, json } from "@/lib/billing/runtime";
import { monthlySelected } from "@/lib/billing/subscription/config";
export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    const userId = await billingIdentity();
    if (monthlySelected()) return json(await (await import("@/lib/billing/subscription/runtime")).monthlyRuntime().service.status(userId, new URL(request.url).searchParams.get("order") ?? undefined));
    return json(await billingRuntime().service.status(userId, new URL(request.url).searchParams.get("order") ?? undefined));
  } catch (error) { return billingFailure(error); }
}
