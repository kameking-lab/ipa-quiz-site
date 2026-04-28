// Stripe プラン定義
//
// 価格は Stripe ダッシュボードで定義済みの Price ID を環境変数経由で参照。
// 本 PR ではテストモードでの課金検証用。
//
// 参考: lib/plans/index.ts
//   - FREE: 月0円    / 1日15回のAIコパイロット
//   - PRO:  月1,480円 / 1日200回 + 弱点克服・類題生成・論述添削
//   - TEAM: 月2,980円/席（最低5席）/ 法人ダッシュボード

import type { Plan } from "@prisma/client";

export interface PriceEntry {
  plan: Plan;
  amountJpy: number;
  priceIdEnv: string;
  label: string;
}

export const PRICE_CATALOG: Readonly<Record<"premium" | "team", PriceEntry>> = {
  premium: {
    plan: "premium",
    amountJpy: 1480,
    priceIdEnv: "STRIPE_PRICE_ID_PREMIUM",
    label: "PRO",
  },
  team: {
    plan: "team",
    amountJpy: 2980,
    priceIdEnv: "STRIPE_PRICE_ID_TEAM",
    label: "TEAM",
  },
} as const;

export type PriceKey = keyof typeof PRICE_CATALOG;

export function getPriceId(key: PriceKey): string | null {
  return process.env[PRICE_CATALOG[key].priceIdEnv] ?? null;
}

export function planFromPriceId(priceId: string): Plan | null {
  for (const [, entry] of Object.entries(PRICE_CATALOG)) {
    if (process.env[entry.priceIdEnv] === priceId) return entry.plan;
  }
  return null;
}
