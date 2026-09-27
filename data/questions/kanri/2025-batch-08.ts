import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";

/** 公式問題・正答と試験時点の国交省資料・法令を全肢照合。 */
export const KANRI_BATCH_08: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q43", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 43, officialAnswerNumber: "2", type: "multiple-choice",
    category: "マンション統計", topicTags: ["2023年末", "高経年", "長期修繕計画"], difficulty: 2,
    question: "国土交通省が公表した2023年末の分譲マンション統計と令和5年度マンション総合調査について、最も適切なものはどれか。",
    choices: {
      ア: "築40年以上のマンションは2023年末で約137万戸で、20年後に約274万戸へ増える見込みである。",
      イ: "2023年末のマンションストックは700万戸を超え、国民の1割超が居住している推計である。",
      ウ: "令和5年度調査で、70歳以上の世帯主は全体の4割を超えた。",
      エ: "令和5年度調査で、長期修繕計画を作成している管理組合は7割以下であった。",
    },
    answer: "イ", explanation: "正解は2。国交省の2023年末推計は約704.3万戸で、約1,500万人、国民の1割超が居住する。約137万戸の高経年マンションが約274万戸になるのは10年後の推計である。",
    choiceExplanations: {
      ア: "不適切。約137万戸から約274万戸への増加は20年後ではなく10年後の推計。20年後は約464万戸。",
      イ: "適切。2023年末のストックは約704.3万戸。1世帯当たり平均人員を掛けた居住者推計は国民の1割超。",
      ウ: "不適切。令和5年度調査の70歳以上の世帯主割合は全体で25.9％。築年数の古い物件では高いが全体の4割超ではない。",
      エ: "不適切。同調査で長期修繕計画を作成した管理組合の割合は88.4％。7割以下ではない。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問43を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: ["https://www.mlit.go.jp/policy/shingikai/content/001860136.pdf", "https://www.mlit.go.jp/policy/shingikai/content/001842038.pdf", "https://www.mlit.go.jp/report/press/content/001750092.pdf"],
    license: "KANRIKYO-educational-reuse", needsReview: false, lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q44", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 44, officialAnswerNumber: "2", type: "multiple-choice",
    category: "賃貸住宅管理業法", topicTags: ["管理受託契約", "重要事項説明", "再委託"], difficulty: 3,
    question: "賃貸住宅管理業法に基づく業務について、最も不適切なものはどれか。",
    choices: {
      ア: "賃貸住宅の維持保全をせず、家賃・敷金など金銭の管理だけをする業務は、同法上の管理業務に当たらない。",
      イ: "管理受託契約の締結前に、相手の承諾を得て重要事項説明書を電子提供すれば、内容の説明も省略できる。",
      ウ: "賃貸住宅管理業者は、委託を受けた管理業務の全部を他者へ再委託してはならない。",
      エ: "賃貸住宅管理業者は従業者に従業者証明書を携帯させる必要があり、違反には罰則がある。",
    },
    answer: "イ", explanation: "正解は2。賃貸住宅管理業法13条2項は、承諾を得た電子提供を紙の書面交付に代える規定であり、締結前の重要事項の説明自体を免除しない。",
    choiceExplanations: {
      ア: "適切。同法2条2項は維持保全、又は維持保全と併せて行う金銭管理を対象とし、金銭管理のみは対象外。",
      イ: "不適切。同法13条1項の締結前説明は必要。2項の電子提供は書面交付の代替であって説明の免除ではない。",
      ウ: "適切。同法15条は受託した管理業務の全部の再委託を禁止する。一部の再委託とは区別する。",
      エ: "適切。同法17条の従業者証明書携帯義務に違反した場合は罰則の対象となる。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問44を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: ["https://laws.e-gov.go.jp/law/502AC0000000060?occasion_date=20250401", "https://www.mlit.go.jp/tochi_fudousan_kensetsugyo/pm_portal/administrator_duties.html"],
    license: "KANRIKYO-educational-reuse", needsReview: false, lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q45", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 45, officialAnswerNumber: "4", type: "multiple-choice",
    category: "宅建業法", topicTags: ["重要事項説明", "管理費用", "石綿"], difficulty: 3,
    question: "宅建業者が自ら売主となり、非宅建業者へマンションを販売するときの宅建業法35条の重要事項説明について、最も適切なものはどれか。",
    choices: {
      ア: "管理委託先の商号のほか、その主たる事務所にいる専任の管理業務主任者の氏名も説明する。",
      イ: "通常の管理費用の額は売買とは無関係なので説明しなくてよい。",
      ウ: "石綿の使用の有無を宅建業者自身が新たに調査し、その結果を説明しなければならない。",
      エ: "損害賠償額の予定又は違約金に関する事項があれば、その内容を説明しなければならない。",
    },
    answer: "エ", explanation: "正解は4。宅建業法35条は損害賠償額の予定又は違約金に関する事項を重要事項説明の対象とする。マンション管理費用や石綿使用調査結果の記録に関する説明も要件に応じて必要だが、業者自身に新規の石綿調査を義務付けるものではない。",
    choiceExplanations: {
      ア: "不適切。管理委託先の名称等は説明対象だが、専任管理業務主任者の氏名まで説明する義務はない。",
      イ: "不適切。区分所有建物の所有者が負担する通常の管理費用の額は重要事項説明の対象。",
      ウ: "不適切。石綿使用調査結果の記録がある場合、その内容が説明対象となる。宅建業者自らの新規調査までは求めない。",
      エ: "適切。損害賠償額の予定又は違約金に関する事項は宅建業法35条の説明対象。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問45を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: ["https://laws.e-gov.go.jp/law/327AC1000000176?occasion_date=20250401", "https://www.mlit.go.jp/totikensangyo/const/content/001855526.pdf"],
    license: "KANRIKYO-educational-reuse", needsReview: false, lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
