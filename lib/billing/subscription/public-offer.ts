import "server-only";
import { PLAN_OFFER } from "../plan-offer";

/** Approved public offer; sales activation and stored billing facts are separate. */
export const MONTHLY_PUBLIC_OFFER = PLAN_OFFER;

/** Direct mailbox delivery and manual response workflow approved by the owner. */
export function monthlySellerDisclosure() {
  return { method: "on-request" as const, ready: true,
    email: "kenshi.ycc@gmail.com",
    requestPath: "mailto:kenshi.ycc@gmail.com?subject=" + encodeURIComponent("過去問AI 事業者情報の開示請求") };
}
