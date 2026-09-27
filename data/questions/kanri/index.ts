import type { Question } from "@/lib/questions/types";
import { KANRI_BATCH_02 } from "./2025-batch-02";
import { KANRI_BATCH_03 } from "./2025-batch-03";
import { KANRI_BATCH_04 } from "./2025-batch-04";
import { KANRI_BATCH_05 } from "./2025-batch-05";
import { KANRI_BATCH_06 } from "./2025-batch-06";
import { KANRI_BATCH_07 } from "./2025-batch-07";
import { KANRI_BATCH_08 } from "./2025-batch-08";
import { KANRI_BATCH_09 } from "./2025-batch-09";
import { KANRI_BATCH_10 } from "./2025-batch-10";
import { KANRI_COMMON_PROPERTY_QUESTIONS } from "./2025-common-property";
import { KANRI_CONDOMINIUM_CASE_QUESTIONS } from "./2025-condominium-cases";
import { KANRI_POLICY_GUIDELINE_QUESTIONS } from "./2025-policy-guideline";
import { KANRI_REPAIR_GUIDELINE_QUESTIONS } from "./2025-repair-guideline";

const sourcePdfUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";
const civilCodeUrl = "https://laws.e-gov.go.jp/law/129AC0000000089?occasion_date=20250401";
const standardContractUrl = "https://www.mlit.go.jp/tochi_fudousan_kensetsugyo/const/content/001630188.pdf";
const unfinishedBuildingPrecedentUrl = "https://www.courts.go.jp/assets/hanrei/hanrei-pdf-6997.pdf";

/** 2025年の公式50問から、原文・正答・全肢の根拠を確認した設問のみ公開。 */
const KANRI_PILOT_QUESTIONS: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q1", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 1, officialAnswerNumber: "4", type: "multiple-choice",
    category: "民法", topicTags: ["注意義務", "事務管理", "相続放棄"], difficulty: 3,
    question: "次の事例のうち、民法の規定によれば、善良な管理者としての注意義務まで求められないものはどれか。",
    choices: {
      ア: "Ａは、隣人Ｂが一週間ほど留守宅にしていることを知っていたので、Ｂ宅に届いた宅配品甲を、Ｂに無断で宅配業者から預かった。この場合におけるＡの甲についての注意義務。",
      イ: "Ａは、Ａが修理したＢ所有の自動車甲の修理代金をＢが支払わないので、支払がされるまで、甲の引渡しを拒絶した。この場合におけるＡの甲についての注意義務。",
      ウ: "Ａは、友人Ｂ所有の自動車甲を無償で移転登録手続することを約し、Ｂから甲の引渡しを受けた。この場合におけるＡの甲についての注意義務。",
      エ: "Ａが、同居していたＡの父Ｂが生前所有していた家屋甲にＢの死亡後も継続居住しているが相続は放棄している。この場合における、相続人又は相続財産の清算人に引き渡すまでのＡの甲についての注意義務。",
    },
    answer: "エ", explanation: "正解は4。相続放棄後に相続財産を現に占有する者は、引渡しまで自己の財産におけるのと同一の注意で保存すれば足りる（民法940条1項）。",
    choiceExplanations: {
      ア: "事務管理には民法697条の本人の利益に適合する方法で管理する義務があり、相続放棄者についての民法940条とは規律が異なる。",
      イ: "留置権者は、留置物について善良な管理者の注意をもって占有する義務を負う（民法298条1項）。",
      ウ: "無償の委任でも、受任者は委任の本旨に従い善良な管理者の注意をもって事務を処理する（民法644条）。",
      エ: "正しい。相続放棄者が相続財産を現に占有するときの保存義務は、自己の財産におけるのと同一の注意が基準となる（民法940条1項）。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl, sourceAnswerUrl: sourcePdfUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問1（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [civilCodeUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q2", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 2, officialAnswerNumber: "2", type: "multiple-choice",
    category: "民法", topicTags: ["委任", "寄託", "復受任者"], difficulty: 3,
    question: "委任契約と寄託契約との異同に関する次の記述のうち、民法の規定によれば、最も適切なものはどれか。",
    choices: {
      ア: "委任契約は当事者間の合意のみで成立する諾成契約であるが、寄託契約は寄託物の引渡しを伴う要物契約である。",
      イ: "受任者も受寄者も、契約の相手方の許諾（承諾）を得たとき、又はやむを得ない事由があるときでなければ、第三者に当該契約を履行させることはできない。",
      ウ: "委任契約も寄託契約も、当該契約が有償か否かによって、受任者や受寄者の注意義務の程度が異なる。",
      エ: "委任者も寄託者も、やむを得ない事情の有無や書面による契約か否かにかかわらず、相手方の損害を賠償すれば当該契約をいつでも解除することができる。",
    },
    answer: "イ", explanation: "正解は2。復受任者の選任と寄託物の再寄託は、相手方の許諾・承諾か、やむを得ない事由がある場合に限られる（民法644条の2、658条）。",
    choiceExplanations: {
      ア: "誤り。現行民法657条の寄託は、物の保管を約し相手方が承諾することで成立する諾成契約である。引渡しは成立要件ではない。",
      イ: "正しい。受任者の復受任者選任は民法644条の2、受寄者の再寄託は658条により、許諾・承諾かやむを得ない事由が必要となる。",
      ウ: "誤り。受任者は有償・無償を問わず善良な管理者の注意を負う（644条）。寄託は有償か否かで注意義務が異なる（659条）。",
      エ: "誤り。委任の解除（651条）と寄託者による返還請求（662条）では規律が異なる。両者を一律に『損害を賠償すればいつでも解除できる』とは整理できない。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl, sourceAnswerUrl: sourcePdfUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問2（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [civilCodeUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q3", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 3, officialAnswerNumber: "3", type: "multiple-choice",
    category: "民法", topicTags: ["請負", "危険負担", "未完成建物"], difficulty: 4,
    question: "1から4までのうち、Ａと建設会社Ｂとの間で建物甲の建築工事の請負契約が締結された場合に関し、民法の規定によれば、適切な記述のみを全て含むものはどれか。\nア　Ｂは、甲が完成しない間は、Ａに損害を賠償して当該契約を解除することができる。\nイ　建築中の甲の所有権の帰属は、原則として、材料の所有者によって定まる。\nウ　落雷による森林火災が原因で建築中の甲が焼失し、完成が不能となってしまった場合には、Ａは、Ｂの報酬請求を拒むことができる。",
    choices: { ア: "ア", イ: "ア・イ", ウ: "イ・ウ", エ: "ア・イ・ウ" },
    answer: "ウ", explanation: "正解は3。注文者が完成前に解除できる民法641条は請負人Ｂの権利ではない。材料提供者による未完成建物の帰属と、履行不能時に注文者が反対給付を拒める民法536条を合わせるとイ・ウとなる。",
    choiceExplanations: {
      ア: "誤り。アは請負人Ｂが解除できるとする点で誤る。民法641条の完成前解除権は注文者Ａにある。",
      イ: "誤り。イは正しいがアが誤りなので、この組合せにはならない。",
      ウ: "正しい。イは未完成建物の原則的な所有権帰属、ウは双方の責めに帰せない履行不能での反対給付拒絶（民法536条）に対応する。",
      エ: "誤り。イ・ウは正しいが、請負人の完成前解除権を述べたアが誤りである。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl, sourceAnswerUrl: sourcePdfUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問3（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [civilCodeUrl, unfinishedBuildingPrecedentUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q6", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 6, officialAnswerNumber: "4", type: "multiple-choice",
    category: "標準管理委託契約書", topicTags: ["管理委託契約", "契約更新", "免責"], difficulty: 3,
    question: "次の記述のうち、標準管理委託契約書によれば、最も適切なものはどれか。",
    choices: {
      ア: "マンション管理業者及びその従業員は、正当な理由なく、管理事務に関して知り得た管理組合及び当該管理組合の組合員等の秘密を漏らしてはならないが、管理委託契約が終了した後はこの限りではない。",
      イ: "マンション管理業者は、管理事務を受託しているマンションにおける滅失、き損、瑕疵等の事実を知った場合は、速やかにその状況を管理組合に通知しなければならないが、管理組合は、これらの事実を知った場合は、マンション管理業者にその状況を速やかに通知する必要はない。",
      ウ: "管理組合又はマンション管理業者は、管理委託契約を更新しようとする場合、同契約の有効期間が満了する日の三月前までに、その相手方に対し、その旨を書面又は口頭で申し出る必要がある。",
      エ: "マンション管理業者は、自己の責めによらない火災の発生により、管理組合又は管理組合の組合員等が損害を受けたときは、その損害を賠償する責任を負わない。",
    },
    answer: "エ", explanation: "正解は4。標準管理委託契約書19条は、管理業者の責めによらない火災等で管理組合・組合員等に生じた損害を免責対象とする。契約終了後も秘密保持は続き、契約更新の申出には書面を要する。",
    choiceExplanations: {
      ア: "誤り。同契約書29条により、17条の秘密保持義務は契約終了後も存続する。",
      イ: "誤り。同契約書13条1項は、滅失・き損・瑕疵等を知った管理組合と管理業者の双方に相手方への速やかな通知を求める。",
      ウ: "誤り。同契約書23条1項の更新申出は、有効期間満了日の三月前までに書面で行う。口頭だけでは足りない。",
      エ: "正しい。同契約書19条は、管理業者の責めによらない火災等による損害について賠償責任を負わないと定める。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl, sourceAnswerUrl: sourcePdfUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問6（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [standardContractUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q8", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 8, officialAnswerNumber: "3", type: "multiple-choice",
    category: "標準管理委託契約書", topicTags: ["管理員業務", "滞納報告", "点検"], difficulty: 3,
    question: "次の記述のうち、標準管理委託契約書によれば、最も不適切なものはどれか。",
    choices: {
      ア: "マンション管理業者は、管理組合に対し、管理事務の処理状況及び管理組合の会計の収支状況について報告を行う場合に、管理組合は、マンション管理業者に対し、それらに係る関係書類の提示を求めることができる。",
      イ: "管理員業務のうちの点検業務には、建物の外観目視点検、無断駐車等の確認が含まれる。",
      ウ: "マンション管理業者は、年に一度、管理組合の組合員の管理費等の滞納状況を、当該管理組合に報告する。",
      エ: "マンション管理業者は、管理対象部分に係る各種の点検、検査等の結果を管理組合に報告するとともに、改善等の必要がある事項については、具体的な方策を当該管理組合に助言するが、この報告及び助言は、書面をもって行う。",
    },
    answer: "ウ", explanation: "正解は3。標準管理委託契約書別表第1の出納業務は、管理費等の滞納状況を毎月管理組合に報告する。年1回では足りない。",
    choiceExplanations: {
      ア: "適切。同契約書10条4項により、管理組合は管理事務・会計の関係書類の提示を求められる。",
      イ: "適切。別表第2の管理員業務には建物等の外観目視点検と無断駐車等の確認が含まれる。",
      ウ: "不適切。別表第1の出納業務では、組合員の管理費等の滞納状況を毎月報告する。",
      エ: "適切。別表第1の点検・検査等に基づく助言は、具体策を示し、報告・助言を書面で行う。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl, sourceAnswerUrl: sourcePdfUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問8（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [standardContractUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];

export const KANRI_QUESTIONS: Question[] = [...KANRI_PILOT_QUESTIONS, ...KANRI_BATCH_02, ...KANRI_BATCH_03, ...KANRI_BATCH_04, ...KANRI_BATCH_05, ...KANRI_BATCH_06, ...KANRI_BATCH_07, ...KANRI_BATCH_08, ...KANRI_BATCH_09, ...KANRI_BATCH_10, ...KANRI_REPAIR_GUIDELINE_QUESTIONS, ...KANRI_POLICY_GUIDELINE_QUESTIONS, ...KANRI_COMMON_PROPERTY_QUESTIONS, ...KANRI_CONDOMINIUM_CASE_QUESTIONS]
  .sort((a, b) => a.qNumber - b.qNumber);
