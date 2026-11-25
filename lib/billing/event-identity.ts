/**
 * Whether a redelivered Stripe event matches the one already processed.
 * A stored pre-v2 raw-body digest cannot be compared with a v2 content digest
 * of the same event, so such a pair is treated as the same delivery.
 */
export function sameEventDigest(stored: string, incoming: string) {
  return stored === incoming || (incoming.startsWith("v2:") && !stored.startsWith("v2:"));
}
