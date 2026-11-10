import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

// configure-ios.rb records that builds 12 and 13 reached TestFlight. Require a
// fresh ASC result instead of treating an empty/stale response as a new app.
export const LAST_KNOWN_UPLOADED_BUILD = 13;

export function nextBuildNumber(latest) {
  const value = latest?.trim();
  if (!value || !/^\d+$/.test(value)) throw new Error("A numeric latest TestFlight build number is required.");
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < LAST_KNOWN_UPLOADED_BUILD || !Number.isSafeInteger(number + 1)) {
    throw new Error("Latest TestFlight build number is stale or out of range; build stopped.");
  }
  return number + 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(nextBuildNumber(process.argv[2])); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
