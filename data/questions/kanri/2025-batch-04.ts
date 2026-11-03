import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";
const reserveGuideUrl = "https://www.mlit.go.jp/report/press/house03_hh_000204.html";
const condoLawUrl = "https://laws.e-gov.go.jp/law/337AC0000000069?occasion_date=20250401";
const lawHistoryUrl = "https://www.moj.go.jp/content/001386321.pdf";

/** 令和7年度公式正答と国交省・法務省・e-Gov の一次資料を照合した3問。 */
export const KANRI_BATCH_04: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q24", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 24, officialAnswerNumber: "2", type: "multiple-choice",
    category: "修繕積立金", topicTags: ["段階増額積立方式", "引上げ幅", "長期修繕計画"], difficulty: 3,
    question: "修繕積立金ガイドラインの『段階増額積立方式における適切な引上げの考え方』では、計画の初期額は均等積立方式の基準額の0.6倍以上、最終額は同1.1倍以内とする。Aを計画期間の月あたり最高額、Bを同平均額、Cを同最低額とした場合、適切な不等式はどれか。",
    choices: {
      ア: "0.6×B≦A、かつ、1.1×B≧C",
      イ: "0.6×B≦C、かつ、1.1×B≧A",
      ウ: "0.6×C≦B、かつ、1.1×B≧A",
      エ: "0.6×A≦B、かつ、1.1×B≧C",
    },
    answer: "イ", explanation: "正解は2。初期の最低額Cは平均額Bの0.6倍以上、最終の最高額Aは平均額Bの1.1倍以下とする。したがって0.6×B≦C、かつ、A≦1.1×B。",
    choiceExplanations: {
      ア: "誤り。最高額Aに下限、最低額Cに上限を設けても、初期額の下限と最終額の上限を確認できない。",
      イ: "正しい。最低額Cが平均額Bの0.6倍以上で、最高額Aが平均額Bの1.1倍以下になる。",
      ウ: "誤り。最高額Aの上限は示すが、最低額Cが平均額Bの0.6倍以上という条件を欠く。",
      エ: "誤り。最高額Aと最低額Cを反対側の条件に置き、必要な最低額の下限・最高額の上限を表していない。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問24を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [reserveGuideUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q25", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 25, officialAnswerNumber: "4", type: "multiple-choice",
    category: "区分所有法", topicTags: ["敷地利用権", "区分所有", "管理団体"], difficulty: 3,
    question: "区分所有法に関する次の記述のうち、最も適切なものはどれか。",
    choices: {
      ア: "数人によって、一棟の建物を区分し各その一部を所有する形態の建物は、区分所有法の制定によって初めて認められた。",
      イ: "一棟の建物に構造上区分された数個の部分で独立している部分を所有権の対象とするには、住居としての用途であれば区分所有権の対象となるが、駐車場としての用途に供する場合は区分所有権の対象にはならない。",
      ウ: "区分所有者は、全員で、建物並びにその敷地及び附属施設の管理を行うための団体を構成するが、借地上の区分所有建物については、このような団体は構成されない。",
      エ: "敷地利用権とは、専有部分を所有するための建物の敷地に関する権利のことを指し、所有権、地上権、賃借権のほか使用借権の場合も含まれる。",
    },
    answer: "エ", explanation: "正解は4。区分所有法2条6項は敷地利用権を専有部分の所有のための敷地に関する権利と定義し、所有権・地上権・賃借権に限らず使用借権も含む。",
    choiceExplanations: {
      ア: "誤り。区分所有法制定前にも旧民法208条に建物の区分所有に関する規定があり、制度創設が初出ではない。",
      イ: "誤り。区分所有法1条は住居以外の建物としての用途も認める。駐車場も独立性などを満たせば対象となり得る。",
      ウ: "誤り。区分所有法3条の管理団体は、建物が借地上にある場合にも区分所有者全員で構成する。",
      エ: "正しい。敷地利用権は所有権や借地権に限定されず、専有部分の所有を支える使用借権も含む。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問25（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [condoLawUrl, lawHistoryUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q27", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 27, officialAnswerNumber: "1", type: "multiple-choice",
    category: "区分所有法", topicTags: ["集会", "招集手続", "規約"], difficulty: 3,
    question: "集会に関する次の記述のうち、区分所有法によれば、最も適切なものはどれか。",
    choices: {
      ア: "区分所有者全員の同意があるときは、会議の目的たる事項や議案の要領を通知しなくても、集会を開くことができる。",
      イ: "一部の区分所有者による集会の招集権の濫用を防ぐため、『区分所有者の4分の1以上で議決権の4分の1以上を有するものは、管理者に対し、会議の目的たる事項を示して、集会の招集を請求することができる。』と、規約を変更することができる。",
      ウ: "専有部分の賃借人が規約に従ってペット飼育をしていた場合、ペット飼育禁止の規約変更がなされるときは、当該賃借人は、賃貸人である区分所有者の同意を得なければ、集会に出席して意見を述べることができない。",
      エ: "規約及び集会の決議は、専有部分を区分所有者からその内容を知らずに買い受けた者に対しては、当該部分についてはその効力が生じない。",
    },
    answer: "ア", explanation: "正解は1。区分所有法36条は、区分所有者全員の同意があるとき、通常の招集手続を経ずに集会を開くことを認める。会議目的・議案要領の事前通知も不要になる。",
    choiceExplanations: {
      ア: "正しい。区分所有者全員が同意すれば、区分所有法36条により招集手続を省略して集会を開ける。",
      イ: "誤り。同法34条3項の招集請求定数は原則5分の1で、規約で減らせるが4分の1へ引き上げられない。",
      ウ: "誤り。同法44条1項は利害関係のある占有者に集会で意見を述べる権利を認め、賃貸人の同意を要件としない。",
      エ: "誤り。同法46条1項により規約と集会決議は特定承継人にも効力が及び、買主の不知は免責条件にならない。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問27（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [condoLawUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
