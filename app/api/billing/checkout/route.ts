import { z } from "zod";
import { billingFailure, billingIdentity, billingRuntime, json, sameOrigin } from "@/lib/billing/runtime";
import { monthlySelected } from "@/lib/billing/subscription/config";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    const { terms } = z.object({ terms: z.string().length(64) }).strict().parse(await request.json());
    if (monthlySelected()) {
      const { service, provider } = (await import("@/lib/billing/subscription/runtime")).monthlyRuntime(true);
      return json(await service.checkout(userId, terms, provider));
    }
    const { service, provider } = billingRuntime();
    return json(await service.checkout(userId, terms, provider));
  } catch (error) { return billingFailure(error); }
}
