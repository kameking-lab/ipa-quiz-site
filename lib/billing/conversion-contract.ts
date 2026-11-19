export const CONVERSION_METRICS = ["guest_answered", "guest_limited", "offer_viewed", "plan_clicked", "signin_viewed", "checkout_created", "payment_completed", "checkout_canceled", "feedback_used"] as const;
export type ConversionMetric = typeof CONVERSION_METRICS[number];
export const CONVERSION_CHANNELS = ["web", "ios", "unknown"] as const;
export type ConversionChannel = typeof CONVERSION_CHANNELS[number];
export const CONVERSION_LABELS: Record<ConversionMetric, string> = {
  guest_answered: "①回答ゲスト数", guest_limited: "②上限429ゲスト数", offer_viewed: "③月額案内表示", plan_clicked: "④月額ボタン押下", signin_viewed: "⑤購入ログイン遷移", checkout_created: "⑥Checkout作成", payment_completed: "⑦支払い完了", checkout_canceled: "⑧決済から戻る", feedback_used: "⑨追加10問利用者",
};
export const CLIENT_CONVERSIONS = ["guest_answered", "offer_viewed", "plan_clicked", "signin_viewed", "checkout_canceled"] as const satisfies readonly ConversionMetric[];
export type ClientConversion = typeof CLIENT_CONVERSIONS[number];
export const GUEST_ANSWER_HANDLED = "X-Kakomon-Guest-Answer-Handled";
export type ConversionCounts = Record<ConversionMetric, number>;
export interface ConversionRow { day: string; channel: ConversionChannel; counts: ConversionCounts; measured: boolean }
export const CONVERSION_STEPS = ["guest_answered", "guest_limited", "offer_viewed", "plan_clicked", "checkout_created", "payment_completed"] as const;
export function conversionRate(numerator: number, denominator: number): string {
  return denominator > 0 ? `${(100 * numerator / denominator).toFixed(1)}%` : "—";
}
