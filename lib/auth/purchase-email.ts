import "server-only";

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
