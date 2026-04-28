/**
 * Single-flag toggle for the (currently dormant) paid mode.
 *
 * The codebase keeps Stripe / Premium / Team scaffolding intact so that
 * the educational-contribution project can revive monetization in a
 * single deploy by setting `NEXT_PUBLIC_PAID_MODE=true`.
 *
 * - When false (default): all pricing / billing / team / upsell UI is hidden.
 * - When true: existing paid flows light up again.
 *
 * Use this helper in both server and client components.
 */
export const PAID_MODE = process.env.NEXT_PUBLIC_PAID_MODE === "true";

export function isPaidModeEnabled(): boolean {
  return PAID_MODE;
}
