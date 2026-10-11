// Bounded observations from the independent Astra production review delivered
// on 2026-10-11. These are not evidence of all-question or specialist review.
export const EDITORIAL_REVIEW_SAMPLES = [
  { label: "FP3級 2026年公開 学科 問11", path: "/q/fp3/2026-published/gakka/q11", checked: "公開解説の売り・買いオペの対比と選択肢別理由を確認。", limit: "この記録では公式正答の再照合を実施していません。分野分類には訂正が必要です。" },
  { label: "歯科 第119回 A問5", path: "/q/shika-ishi/2026-annual/mondai-a/q5", checked: "図版・5肢の理由・採点動作を確認。厚生労働省正答表のA005=Aと掲載正答aを照合。", limit: "医学的説明全体の専門家監修や全696問の確認を示す記録ではありません。" },
  { label: "柔道整復師 第34回 午前問107", path: "/q/judo-seifukushi/2025-annual/am/q107", checked: "原本由来の図版と各肢の学習用解説が表示されることを確認。", limit: "この記録は公式正答・医学的説明の全件確認ではありません。" },
  { label: "土地家屋調査士 2025年 午前問11", path: "/q/chosashi/2025-autumn/am/q11", checked: "公式問題・答案用紙と、独自解答例・SVG作図例が区別され、同じ問題へ演習遷移することを確認。", limit: "独自例の数値・作図を公式唯一解答や専門家監修済みとして認定していません。" },
  { label: "電験二種 2025年 二次 機械・制御問3", path: "/denken2/secondary/2025/machine-control/q3", checked: "原本2ページ、6小問、式・単位・瞬間値と平均値の説明、公式標準解答への導線を確認。", limit: "全小問の計算正確性・全20原問の内容査読を示す記録ではありません。" },
] as const;

export const EDITORIAL_REVIEW_OBSERVED_AT = "2026-10-11";
