import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";
const parkingCaseUrl = "https://www.courts.go.jp/app/files/hanrei_jp/584/052584_hanrei.pdf";
const balconyCaseUrl = "https://www.courts.go.jp/assets/hanrei/hanrei-pdf-62143.pdf";
const resortCaseUrl = "https://www.courts.go.jp/app/files/hanrei_jp/582/052582_hanrei.pdf";
const associationCaseUrl = "https://www.courts.go.jp/app/files/hanrei_jp/595/062595_hanrei.pdf";
const unitOwnershipActUrl = "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20250401";

/** 四つの裁判所判決原文と公式正答を独立に照合。 */
export const KANRI_CONDOMINIUM_CASE_QUESTIONS: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q38", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 38, officialAnswerNumber: "1", type: "multiple-choice",
    category: "区分所有法", topicTags: ["専用使用権", "バルコニー", "リゾートマンション", "自治会"], difficulty: 4,
    question: "マンションに関する次の記述のうち、区分所有法及び最高裁判所の判決によれば、最も不適切なものはどれか。",
    choices: {
      ア: "マンション分譲業者Ａが、一部の区分所有者に対し敷地に係る駐車場専用使用権を分譲した場合、管理組合の管理者である理事長Ｂは、Ａに対し、当該駐車場専用使用権の対価が当該管理組合に帰属することを主張することができる。",
      イ: "区分所有者Ａがバルコニーについて外気と遮断された独立の部屋とする工事をした場合、そのバルコニーは、管理組合の管理する共有物であり、区分所有者間で定めた規約ないし建築協定に違反するので、管理者Ｂは、Ａに対し、当該工事部分の撤去を請求することができる。",
      ウ: "売主Ａと買主Ｂとの間でテニスコートやプール等のスポーツ施設の利用を主要な目的としたリゾートマンションの売買契約が締結された場合、Ａがスポーツ施設の引渡しを遅延したときは、Ｂは、履行遅滞を理由として当該売買契約の全部を解除することができる。",
      エ: "区分所有法第3条の団体は、建物並びにその敷地及び附属施設の管理を行うための団体であり、区分所有者は、その構成員とはならない旨の意思表示をすることはできないが、自治会は、会員相互の親ぼくや当該地域の快適な環境の維持管理を図ることを目的とする団体であり、その会員は、入会及び退会が任意である。",
    },
    answer: "ア", explanation: "正解は1。最高裁は、分譲業者が自己の利益のために駐車場専用使用権を分譲し、対価を受領した事案で、その対価は契約上の合意に従い分譲業者に帰属するとした。管理組合に帰属するとはいえない。ほかの三肢は、それぞれバルコニー改築の撤去、密接に結びついたリゾートマンション契約の解除、自治会からの任意退会に関する最高裁判例に沿う。",
    choiceExplanations: {
      ア: "不適切。最高裁判例は、専用使用権の分譲対価が契約の合意に従い分譲業者に帰属すると判断した。管理組合が当然に受け取るものではない。",
      イ: "適切。最高裁は、バルコニーを温室にする改築が規約・建築協定に違反し、工事部分の撤去・復旧を命じた原審判断を是認した。",
      ウ: "適切。最高裁は、スポーツ施設の利用が購入目的と密接に関係し、その施設完成の遅延で目的を達成できなくなったとき、売買契約の解除を認めた。",
      エ: "適切。区分所有者は区分所有法3条の団体を構成する。一方、最高裁は強制加入団体ではない自治会から一方的な意思表示で退会できると判断した。",
    },
    explanationCoverage: "full", hasImage: false,
    sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問38（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [parkingCaseUrl, balconyCaseUrl, resortCaseUrl, associationCaseUrl, unitOwnershipActUrl],
    license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
