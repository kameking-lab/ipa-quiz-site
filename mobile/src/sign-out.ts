import { downloads } from "./downloads";
import { deviceMembership } from "./purchases";

export async function signOutDevice(membership = deviceMembership) {
  // Stop the online shell from restoring rights from an in-flight response.
  window.dispatchEvent(new Event("mobile:signing-out"));
  // Both operations must be attempted even when the store is unavailable.
  const results = await Promise.allSettled([downloads.invalidate(), membership.disconnect()]);
  const failure = results.find(result => result.status === "rejected");
  if (failure?.status === "rejected") throw failure.reason;
}
