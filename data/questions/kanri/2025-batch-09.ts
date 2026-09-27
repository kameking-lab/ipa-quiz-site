import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";

/** 公式問題・正答、排水設備の国交省告示・国立研究所資料、試験時点の区分所有法を全肢照合。 */
export const KANRI_BATCH_09: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q18", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 18, officialAnswerNumber: "1", type: "multiple-choice",
    category: "排水設備", topicTags: ["排水横管", "勾配", "排水トラップ"], difficulty: 3,
    question: "排水設備について、最も不適切なものはどれか。",
    choices: {
      ア: "排水横管の最小勾配は、管径が大きくなるほど大きくとる。",
      イ: "雨水排水立て管を除く雨水排水管を汚水配管へ連結するときは、雨水排水管にトラップを設ける。",
      ウ: "特殊継手排水システムは通気性能と許容排水流量を高め、別の通気立て管を要しない方式である。",
      エ: "吸気だけを行う排水用通気弁は、排水通気管内が負圧になる位置に設置する。",
    },
    answer: "ア", explanation: "正解は1。排水横管は管径が大きいほど最小勾配の数値を緩くできる。例として管径65mm以下は1/50、75・100mmは1/100、125mmは1/150、150mm以上は1/200が目安。『大きくとる』は逆である。",
    choiceExplanations: {
      ア: "不適切。国立研究所の排水横管の最小勾配表では、管径が増すほど必要な勾配は緩くなる。",
      イ: "適切。国土交通省の排水設備告示は、雨水排水立て管を除く雨水管を汚水配管につなぐときのトラップ設置を定める。",
      ウ: "適切。国交省の排水改良資料は、特殊継手で排水立て管の芯を通気層とする方式を示す。別の通気立て管を省ける。",
      エ: "適切。吸気だけの通気弁は負圧時に外気を取り込み、正圧を排出する機能はない。負圧が生じる位置で用いる。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問18を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: ["https://www.nilim.go.jp/lab/bcg/siryou/tnn/tnn0615pdf/ks0615.pdf", "https://www.mlit.go.jp/notice/noticedata/pdf/201703/00006620.pdf", "https://www.mlit.go.jp/common/001064901.pdf"],
    license: "KANRIKYO-educational-reuse", needsReview: false, lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q28", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 28, officialAnswerNumber: "3", type: "multiple-choice",
    category: "区分所有法", topicTags: ["過料", "管理組合法人", "区分所有者名簿"], difficulty: 4,
    question: "2025年の試験時点に適用される区分所有法71条の過料について、最も不適切なものはどれか。",
    choices: {
      ア: "規約の保管者が、利害関係人の適法な閲覧請求を正当な理由なく拒んだ場合は過料の対象となる。",
      イ: "議長が、議事の結果だけで議事の経過の要領を記載・記録しない議事録を作った場合は過料の対象となる。",
      ウ: "管理組合法人の理事が区分所有者名簿の変更を怠った場合は、71条の過料の対象となる。",
      エ: "監事が集会で理事の業務執行状況の監査報告を怠っても、71条の過料の対象とはならない。",
    },
    answer: "ウ", explanation: "正解は3。試験時点の48条の2第2項には区分所有者名簿の更新義務があるが、当時の71条が過料対象として引用するのは48条の2第1項の財産目録の作成・備置き等であり、第2項の名簿更新義務違反は列挙されていない。法改正後の条文と混同しないこと。",
    choiceExplanations: {
      ア: "適切。規約の適法な閲覧を正当な理由なく拒むことは、試験時点の71条の過料対象。",
      イ: "適切。集会議事録には議事の経過の要領と結果の両方が必要で、その義務違反は71条の過料対象。",
      ウ: "不適切。48条の2第2項の名簿更新義務は存在するが、試験時点の71条は同条第1項のみを過料対象として引用する。",
      エ: "適切。監事の監査報告の懈怠自体は、試験時点の71条に過料対象として列挙されていない。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問28を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: ["https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20250401"],
    license: "KANRIKYO-educational-reuse", needsReview: false, lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
