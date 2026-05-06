// Stripe SDK シングルトン
//
// 本番 / テスト鍵のどちらでも同じコードで動作する。
// STRIPE_SECRET_KEY が未設定の場合は getStripe() が例外を投げる。

import Stripe from "stripe";

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. See docs/AUTH_AND_BILLING_SETUP.md for setup.",
    );
  }
  cached = new Stripe(key, {
    typescript: true,
    appInfo: { name: "kakomon-ai", url: "https://kakomon-ai.jp" },
  });
  return cached;
}

export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}
