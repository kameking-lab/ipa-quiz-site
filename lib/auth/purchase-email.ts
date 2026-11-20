import "server-only";

// PostgreSQL btrim defaults to ASCII spaces; use the same whitespace set as JS trim().
export const PURCHASE_EMAIL_WHITESPACE = "\t\n\v\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff";
export function normalizedPurchaseEmail(value: string): string { return value.trim().toLowerCase(); }
export function privateRelayEmail(value: string): boolean { return normalizedPurchaseEmail(value).endsWith("@privaterelay.appleid.com"); }

/** Called only after Auth.js has authenticated the OAuth response and resolved its owner. */
export async function rememberVerifiedPurchaseEmail(
  user: { id?: string; email?: string | null },
  account: { provider: string },
  profile: { email?: unknown; email_verified?: unknown },
  save: (id: string, email: string) => Promise<unknown>,
) {
  if (!user.id || !user.email || !["google", "apple"].includes(account.provider)) return;
  // Apple returns this claim as either a boolean or a string. Google requires a boolean.
  const verified = profile.email_verified === true || account.provider === "apple" && profile.email_verified === "true";
  if (!verified || typeof profile.email !== "string" || normalizedPurchaseEmail(profile.email) !== normalizedPurchaseEmail(user.email)) return;
  await save(user.id, user.email);
}
