import { Browser } from "@capacitor/browser";
/** Existing customer portal only; product selection and checkout remain unavailable. */
export async function openSubscriptionManagement(url: string) {
  if (new URL(url).origin !== "https://billing.stripe.com") throw new Error("契約管理のリンクを確認できませんでした。");
  await Browser.open({url});
}
