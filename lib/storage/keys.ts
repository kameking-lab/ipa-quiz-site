export const LS_KEYS = {
  history: "ipa-quiz:history:v1",
  starred: "ipa-quiz:starred:v1",
  premium: "ipa-quiz:premium:v1",
  theme: "ipa-quiz:theme:v1",
  aiUsage: "ipa-quiz:ai-usage:v1",
  settings: "ipa-quiz:settings:v1",
  swipeHintShown: "ipa-quiz:swipe-hint-shown:v1",
  chatSessions: "ipa-quiz:chat-sessions:v1",
  motivation: "ipa-quiz:motivation:v1",
  studyDays: "ipa-quiz:study-days:v1",
  earnedBadges: "ipa-quiz:earned-badges:v1",
  premiumCoupon: "ipa-quiz:premium-coupon:v1",
} as const;

export type LSKey = (typeof LS_KEYS)[keyof typeof LS_KEYS];
