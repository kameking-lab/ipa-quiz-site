import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";
const guidelineUrl = "https://www.mlit.go.jp/jutakukentiku/house/content/001747006.pdf";

/** 国土交通省の令和6年6月改定ガイドラインと照合した公式過去問。 */
export const KANRI_REPAIR_GUIDELINE_QUESTIONS: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q20", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 20, officialAnswerNumber: "4", type: "multiple-choice",
    category: "長期修繕計画", topicTags: ["調査診断", "計画見直し", "推定修繕工事"], difficulty: 3,
    question: "次の記述のうち、長期修繕計画作成ガイドラインによれば、不適切なものはいくつあるか。\nア　計画修繕工事の実施の要否、内容等は、事前に調査・診断を行い、その結果に基づいて判断する。\nイ　長期修繕計画は、将来実施する計画修繕工事の内容、時期、費用等を確定するものではなく、一定期間（5 年程度）ごとに見直すことを前提としている。\nウ　推定修繕工事は、建物及び設備の性能・機能を新築時と同等水準に維持、回復させる修繕工事を基本とする。\nエ　推定修繕工事の内容の設定、概算の費用の算出は、新築マンションの場合、設計図書、工事請負契約書による請負代金内訳書及び数量計算書等を参考にして行う。",
    choices: { "ア": "一つ", "イ": "二つ", "ウ": "三つ", "エ": "なし" },
    answer: "エ", explanation: "正解は4。アは事前の調査・診断、イはおおむね5年ごとの見直し、ウは新築時の水準の維持・回復、エは新築マンションの設計図書等を参考にした算出について、それぞれガイドラインと一致する。不適切な記述はない。",
    choiceExplanations: {
      "ア": "一つではない。アの調査・診断を含め、イ・ウ・エも全て長期修繕計画作成ガイドラインに沿っている。",
      "イ": "二つではない。計画は確定見積りではなく約5年ごとに見直すなど、四つの記述はいずれも適切。",
      "ウ": "三つではない。性能・機能の維持・回復と新築時の資料を参考にする考え方も正しい。",
      "エ": "正しい。事前診断、定期的見直し、維持・回復の基本、新築時資料の参照は全て同ガイドラインに記されている。",
    },
    explanationCoverage: "full", hasImage: false,
    sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問20（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [guidelineUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q21", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 21, officialAnswerNumber: "2", type: "multiple-choice",
    category: "長期修繕計画", topicTags: ["推定修繕工事費", "単価", "地域差"], difficulty: 3,
    question: "次の記述のうち、長期修繕計画作成ガイドラインによれば、適切なものはいくつあるか。\nア　既存マンションにおける推定修繕工事費の単価の設定に当たっては、過去の計画修繕工事の契約実績を参考にする。\nイ　単価の設定に当たっては、労務費の地域差を考慮する必要はない。\nウ　推定修繕工事費を算出するための部位別の項目ごとの具体的な単価の設定については、作成者に委ねられており、何に基づき、どのような構成の単価を設定したかを明示する。\nエ　現場管理費について、見込まれる推定修繕工事ごとの総額に応じた比率の額を単価に含めて設定してはならない。",
    choices: { "ア": "一つ", "イ": "二つ", "ウ": "三つ", "エ": "なし" },
    answer: "イ", explanation: "正解は2。適切なのはア・ウ。既存マンションでは過去の工事契約実績等を単価の参考にし、具体的な単価の根拠と構成を示す。イは地域差の考慮を否定し、エは現場管理費等を比率で単価に含める方法を否定しており、いずれもガイドラインと異なる。",
    choiceExplanations: {
      "ア": "一つではない。既存マンションの契約実績を参考にするアに加え、単価の根拠と構成を明示するウも適切。",
      "イ": "正しい。ア・ウの二つが適切。地域差の考慮は重要で、現場管理費等を比率で単価に含める方法も認められる。",
      "ウ": "三つではない。イは地域差を無視し、エは諸経費を単価に含める方法を否定しているため不適切。",
      "エ": "なしではない。ガイドラインはアの過去の契約実績とウの単価根拠の明示を認めている。",
    },
    explanationCoverage: "full", hasImage: false,
    sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問21（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [guidelineUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q22", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 22, officialAnswerNumber: "2", type: "multiple-choice",
    category: "長期修繕計画", topicTags: ["専有部分", "改良工事", "修繕積立金"], difficulty: 3,
    question: "次の記述のうち、長期修繕計画作成ガイドラインによれば、最も不適切なものはどれか。",
    choices: {
      "ア": "長期修繕計画の見直し等の業務を受託した専門家は、その成果物に関して管理組合に説明を行うことが必要である。",
      "イ": "共用部分の修繕工事及び改修工事に伴う専有部分の修繕工事は、長期修繕計画の対象には含まれないため、管理組合がその費用を負担することはない。",
      "ウ": "長期修繕計画には、区分所有者が負担する修繕積立金の額の根拠として、その使途となる将来の修繕工事及び改修工事の内容等を明示する。",
      "エ": "長期修繕計画の作成に当たっては、区分所有者の要望など、必要に応じて、建物及び設備の耐震性や断熱性などの性能を新築時の水準から向上させる改良工事を設定することが望ましい。",
    },
    answer: "イ", explanation: "正解は2。共用部分の排水管取替えのため専有部分の壁を一時撤去・復旧する例のように、共用部分の工事に伴う専有部分の修繕工事は管理組合が費用を負担し、長期修繕計画の対象に含む。",
    choiceExplanations: {
      "ア": "適切。見直し等を受託した専門家には、成果物を管理組合に説明することが求められる。",
      "イ": "正しい。設問の不適切な記述。共用部分の工事に伴う専有部分の修繕は、管理組合が費用を負担し、計画の対象になる。",
      "ウ": "適切。長期修繕計画には、修繕積立金の使途となる将来の修繕・改修工事を示す。",
      "エ": "適切。必要に応じ、耐震性や断熱性などを新築時より向上させる改良工事を設定することが望ましい。",
    },
    explanationCoverage: "full", hasImage: false,
    sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問22（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [guidelineUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q23", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 23, officialAnswerNumber: "1", type: "multiple-choice",
    category: "長期修繕計画", topicTags: ["計画期間", "修繕周期", "費用"], difficulty: 3,
    question: "次の記述のうち、長期修繕計画作成ガイドラインによれば、最も不適切なものはどれか。",
    choices: {
      "ア": "計画期間を25年以上かつ大規模修繕工事が2 回含まれる期間以上としている。",
      "イ": "推定修繕工事項目の設定に当たって、修繕周期が計画期間に含まれないために推定修繕工事費を計上していない項目がある場合は、その旨を明示する。",
      "ウ": "修繕周期は、劣化する建物の部位や設備の性能・機能を実用上支障がない水準まで経済的に回復させることができなくなるまでの期間をいう。",
      "エ": "修繕周期の設定に当たっては、経済性等を考慮し、推定修繕工事の集約等を検討する。",
    },
    answer: "ア", explanation: "正解は1。国交省の令和6年6月改定ガイドラインでは計画期間を30年以上、かつ大規模修繕工事が2回含まれる期間以上とする。25年以上というアが不適切で、未計上項目の明示、修繕周期の定義と集約の検討はガイドラインに沿う。",
    choiceExplanations: {
      "ア": "正しい。設問の不適切な記述。計画期間は25年以上ではなく30年以上、かつ大規模修繕工事を2回含む期間以上とする。",
      "イ": "適切。周期が期間外のため費用を計上しない項目は、その旨を明示する。",
      "ウ": "適切。実用上支障のない水準へ経済的に回復できなくなるまで、という修繕周期の定義に沿う。",
      "エ": "適切。経済性を考え、推定修繕工事の時期の集約等を検討する。",
    },
    explanationCoverage: "full", hasImage: false,
    sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問23（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [guidelineUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
