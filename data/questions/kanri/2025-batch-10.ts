import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";

/** 公式問題・正答と国交省告示、公共建築仕様書、内閣府・電気協会資料を全肢照合。 */
export const KANRI_BATCH_10: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q19", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 19, officialAnswerNumber: "3", type: "multiple-choice",
    category: "建築設備", topicTags: ["換気設備", "排水トラップ", "直結増圧給水"], difficulty: 3,
    question: "建築設備について、最も不適切なものはどれか。",
    choices: {
      ア: "住宅の居室のホルムアルデヒド対策では、原則として居室容積の0.5倍以上の有効換気量を1時間当たりに確保する。",
      イ: "阻集器を兼ねない排水トラップの封水深さは、5cm以上10cm以下とする。",
      ウ: "直結増圧給水方式の給水立て管頂部には、排気弁だけを設置すればよい。",
      エ: "内線規程では、地震時の電気火災リスク解消に取り組むべき地域の住宅等に、感震遮断機能付き住宅用分電盤の設置を勧告している。",
    },
    answer: "ウ", explanation: "正解は3。直結増圧給水方式では、給水立て管頂部に吸排気弁や適切な空気抜き設備を設ける。排気のみと断定するのは不適切。停電等で立て管が落水した後の再始動時には吸気・排気双方への配慮が必要となる。",
    choiceExplanations: {
      ア: "適切。国交省のシックハウス対策資料は、住宅の居室で換気回数0.5回/時以上を原則とする。",
      イ: "適切。国交省の排水設備告示は、阻集器兼用でない排水トラップの封水深さを5～10cmと定める。",
      ウ: "不適切。国交省の機械設備仕様書は直結増圧方式の配管の空気だまりに吸排気弁を示し、立て管頂部を排気弁だけに限定しない。",
      エ: "適切。内閣府の普及資料と日本電気協会の改定概要は、対象地域の住宅等への感震遮断機能付き分電盤を勧告事項としている。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問19を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: ["https://www.mlit.go.jp/jutakukentiku/build/sickhouse.files/sickhouse_2.pdf", "https://www.mlit.go.jp/notice/noticedata/pdf/201703/00006620.pdf", "https://www.mlit.go.jp/common/001108577.pdf", "https://www.bousai.go.jp/jishin/syuto/denkikasaitaisaku/missyuu/index.html", "https://www.denki.or.jp/wp-content/uploads/2025/05/%E5%86%85%E7%B7%9A%E8%A6%8F%E7%A8%8B%EF%BC%88%E6%94%B9%E5%AE%9A%E6%A6%82%E8%A6%81%EF%BC%89.pdf"],
    license: "KANRIKYO-educational-reuse", needsReview: false, lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
