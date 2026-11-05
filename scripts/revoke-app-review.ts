// Run only with the intended server's existing KV environment loaded securely.
import { revokeReviewSessions } from "../lib/auth/app-review-revocation";

revokeReviewSessions().then(() => {
  console.info("App Review sessions revoked. A fresh random review code is required before re-enabling.");
}).catch(() => {
  console.error("App Review revocation failed. Keep login disabled and check the target KV configuration.");
  process.exitCode = 1;
});
