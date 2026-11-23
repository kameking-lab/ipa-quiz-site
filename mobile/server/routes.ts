import "server-only";
import { billingFailure, json, optionalBillingIdentity, sameOrigin } from "@/lib/billing/runtime";
import { BillingError } from "@/lib/billing/domain";
import { mobileEntitlement } from "./entitlement";
import { mobileConfig } from "./config";
import { examCatalog, examContent, catalogCodes } from "./catalog";
import { MONTHLY_PUBLIC_OFFER } from "@/lib/billing/subscription/public-offer";
export async function status(request: Request) {
  try {
    if (request.method === "POST") sameOrigin(request);
    const entitlement = await mobileEntitlement(await optionalBillingIdentity(), request.method === "POST");
    const c = mobileConfig();
    return json({ entitlement, configuration: { sdkKey: c.enabled ? c.sdkKey : "", productId: c.productId, offeringId: c.offeringId,
      entitlement: c.entitlement, expectedPriceYen: MONTHLY_PUBLIC_OFFER.priceYen, leasePublicKey: c.leasePublicKey } });
  } catch (error) { return statusFailure(error); }
}
/**
 * The app shows this code on screen, so an unexpected failure names its kind
 * (never its message, which could contain configuration) and is logged.
 */
export function statusFailure(error: unknown) {
  if (error instanceof BillingError) return billingFailure(error);
  const name = error instanceof Error ? error.name : typeof error;
  const code = error && typeof error === "object" && "code" in error && typeof error.code === "string" ? error.code : "";
  const detail = (code ? `${name}:${code}` : name).replace(/[^\w:.-]/g, "").slice(0, 60);
  console.error("[mobile/entitlement] failed", detail, error instanceof Error ? error.message.slice(0, 300) : "");
  return json({ error: "billing_unavailable", detail }, 503);
}
export async function catalog() {
  try {
    const entries = [];
    // Bound peak memory: do not serialize the entire question collection at once.
    for (const code of catalogCodes()) { const entry = await examCatalog(code); if (entry?.count) entries.push(entry); }
    return json({ exams: entries });
  } catch (error) { return billingFailure(error); }
}
export async function download(request: Request) {
  try {
    const entitlement = await mobileEntitlement(await optionalBillingIdentity());
    if (!entitlement.entitled || !entitlement.lease) throw new BillingError("premium_required", 403);
    const url = new URL(request.url), exam = url.searchParams.get("exam") ?? "", offset = Number(url.searchParams.get("offset") ?? "0");
    if (!Number.isSafeInteger(offset) || offset < 0) throw new BillingError("invalid_offset", 400);
    const entry = await examCatalog(exam), qs = await examContent(exam);
    if (!entry || !qs) throw new BillingError("not_found", 404);
    const expected = url.searchParams.get("revision");
    if (expected && entry.revision !== expected) throw new BillingError("content_changed", 409);
    // A small page stays well below the site's response size ceiling.
    const questions = qs.slice(offset, offset + 10);
    return json({ entry, questions, nextOffset: offset + questions.length < qs.length ? offset + questions.length : null, entitlement });
  } catch (error) { return billingFailure(error); }
}
