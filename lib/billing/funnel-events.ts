/**
 * Purchase funnel steps counted per JST day (shared by the server counter,
 * the browser beacon and the admin view). Order follows the user's path.
 */
export const FUNNEL_EVENTS = [
  "free_limit_reached", // the free-10 limit screen was shown
  "paywall_plan_click", // the monthly plan button was tapped
  "purchase_signin_view", // sign-in shown on the way to checkout
  "billing_page_view", // /billing was opened
  "checkout_started", // a Stripe Checkout session was created (server)
  "checkout_canceled", // the user came back from Checkout without paying
  "checkout_completed", // Stripe confirmed the subscription checkout (webhook, server)
  "purchase_returned", // the paid user landed back on the question
] as const;
export type FunnelEvent = (typeof FUNNEL_EVENTS)[number];

/** Steps a browser may report. Server-confirmed steps can never be sent by a client. */
export const CLIENT_FUNNEL_EVENTS = [
  "free_limit_reached", "paywall_plan_click", "purchase_signin_view", "billing_page_view", "checkout_canceled", "purchase_returned",
] as const satisfies readonly FunnelEvent[];
export type ClientFunnelEvent = (typeof CLIENT_FUNNEL_EVENTS)[number];

export function isClientFunnelEvent(value: unknown): value is ClientFunnelEvent {
  return typeof value === "string" && (CLIENT_FUNNEL_EVENTS as readonly string[]).includes(value);
}
