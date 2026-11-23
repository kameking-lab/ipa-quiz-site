/** Tiny, dependency-free hand-off between the pet runtime and the layout-level
 * cloud sync. Guests never signal, so they never load the sync code or call
 * the cloud API. */
export const PET_ACCOUNT_OWNER_EVENT = "pet-v1:account-owner";
let last: string | null = null;
export function signalPetAccountOwner(ownerScope: string) {
  if (!ownerScope.startsWith("user:")) return;
  last = ownerScope;
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(PET_ACCOUNT_OWNER_EVENT, { detail: { ownerScope } }));
}
export function lastPetAccountOwner() { return last; }
