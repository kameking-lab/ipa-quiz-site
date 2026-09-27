import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";
const policyUrl = "https://www.mlit.go.jp/jutakukentiku/house/content/001979635.pdf";

/** 公式試験の正答と国土交通省の基本方針本文を照合した設問。 */
export const KANRI_POLICY_GUIDELINE_QUESTIONS: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q46", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 46, officialAnswerNumber: "3", type: "multiple-choice",
    category: "マンション管理適正化法", topicTags: ["基本方針", "推進計画", "管理委託契約"], difficulty: 3,
    question: "次の記述のうち、『マンションの管理の適正化の推進を図るための基本的な方針』（令和3年9月28日国土交通省告示第1286号）によれば、最も不適切なものはどれか。",
    choices: {
      ア: "管理組合は、マンション管理適正化指針及び都道府県等マンション管理適正化指針の定めるところに留意して、マンションを適正に管理するよう自ら努めなければならない。",
      イ: "国は、マンションの管理水準の維持向上と管理状況が市場において評価される環境整備を図るためにマンションの管理の適正化の推進に関する施策を講じていくよう努める必要がある。",
      ウ: "地方公共団体は、マンション管理適正化推進計画を作成し、マンションの管理水準の維持向上と管理状況が市場において評価される環境整備を図っていくことが望ましいが、当該マンション管理適正化推進計画には、作成する都道府県等の区域内におけるマンションの管理の適正化に関する目標までは定める必要はなく、具体的な施策に関する事項を記載していれば足りる。",
      エ: "マンション管理業者が、管理委託契約を電磁的方法により締結する場合は、管理組合の管理者など契約の相手方の承諾を得る必要がある。",
    },
    answer: "ウ", explanation: "正解は3。基本方針は、マンション管理適正化推進計画について、区域内の状況に応じた明確な目標を設定し、その進捗を施策に反映させることが望ましいと定める。具体的な施策だけで足りるというウが不適切。",
    choiceExplanations: {
      ア: "適切。基本方針の『管理組合及び区分所有者の役割』は、両指針に留意した自主的な適正管理を求めている。",
      イ: "適切。基本方針の『国の役割』は、管理水準の維持向上と市場評価の環境整備に向けた施策を述べている。",
      ウ: "不適切。推進計画には、区域内のマンションの状況に応じて明確な管理適正化の目標を設定することが望ましい。施策の記載だけでは方針に沿わない。",
      エ: "適切。管理委託契約を電磁的方法で締結する際には、管理組合の管理者等又は区分所有者等の承諾を得ることが基本方針に記されている。",
    },
    explanationCoverage: "full", hasImage: false,
    sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問46（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [policyUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
