import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";
const unitOwnershipActUrl = "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20250401";
const supremeCourtUrl = "https://www.courts.go.jp/app/files/hanrei_jp/849/055849_hanrei.pdf";
const mlitBoundaryUrl = "https://www.mlit.go.jp/jutakukentiku/house/content/001747006.pdf";

/** 法定共用部分と規約共用部分の区別を法令・判例・国交省資料で照合。 */
export const KANRI_COMMON_PROPERTY_QUESTIONS: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q26", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 26, officialAnswerNumber: "2", type: "multiple-choice",
    category: "区分所有法", topicTags: ["法定共用部分", "規約共用部分", "管理人室", "給水管"], difficulty: 4,
    question: "次に掲げるもののうち、区分所有法及び判例によれば、法定共用部分はいくつあるか。\nア　区分所有建物の一住戸を区分所有者全員で使用する集会室\nイ　区分所有建物の管理員が共用部分である管理事務室と一体として利用するための管理員休憩室\nウ　区分所有建物が建っている敷地\nエ　水道本管から専有部分のメーターまでの水道管",
    choices: { ア: "一つ", イ: "二つ", ウ: "三つ", エ: "四つ" },
    answer: "イ", explanation: "正解は2。法定共用部分はイとエの二つ。管理事務室と機能的に一体で独立使用できない管理員用の室は最高裁判例上、専有部分に当たらない。メーターまでの共用給水管も専有部分に属さない建物の附属物である。一住戸を転用した集会室は規約共用部分になり得るが法定共用部分ではなく、敷地は建物の共用部分とは別の概念。",
    choiceExplanations: {
      ア: "一つではない。管理事務室と一体の管理員用の室に加え、各戸メーターまでの給水管も法定共用部分に当たる。",
      イ: "正しい。イは最高裁平成5年2月12日判決が示す管理事務室との機能的一体性、エは専有部分に属さない建物附属物という区分所有法2条4項により、二つが法定共用部分となる。",
      ウ: "三つではない。一住戸を転用した集会室は規約で共用部分とする対象であり、建物が建つ敷地は法定共用部分の数に含めない。",
      エ: "四つではない。アは構造上独立した住戸を転用したもので規約共用部分の対象、ウは建物の敷地であり、法定共用部分ではない。",
    },
    explanationCoverage: "full", hasImage: false,
    sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問26（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [unitOwnershipActUrl, supremeCourtUrl, mlitBoundaryUrl],
    license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
