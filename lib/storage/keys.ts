export const LS_KEYS = {
  history: "ipa-quiz:history:v1",
  starred: "ipa-quiz:starred:v1",
  premium: "ipa-quiz:premium:v1",
  theme: "ipa-quiz:theme:v1",
  aiUsage: "ipa-quiz:ai-usage:v1",
  settings: "ipa-quiz:settings:v1",
  swipeHintShown: "ipa-quiz:swipe-hint-shown:v1",
  feedbackSubmitted: "ipa-quiz:feedback-submitted:v1",
  feedbackGateShown: "ipa-quiz:feedback-gate-shown:v1",
  questionFeedback: "ipa-quiz:question-feedback:v1",
  publicFeedback: "ipa-quiz:public-feedback:v1",
} as const;

export type LSKey = (typeof LS_KEYS)[keyof typeof LS_KEYS];
