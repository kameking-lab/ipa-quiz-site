import type { ExamCode } from "@/lib/questions/types";

export type QualificationDomain =
  | "information-technology"
  | "finance"
  | "electrical"
  | "construction"
  | "real-estate"
  | "pharmacy"
  | "legal"
  | "safety"
  | "accounting"
  | "welfare";

export type PublicationStatus =
  | "live"
  | "notification-required"
  | "ready-to-ingest"
  | "permission-required"
  | "terms-review-required";

export interface QualificationCatalogEntry {
  slug: string;
  examCode?: ExamCode;
  shortName: string;
  fullName: string;
  domain: QualificationDomain;
  administrator: string;
  officialQuestionsUrl: string;
  officialReuseTermsUrl: string;
  status: PublicationStatus;
  reuseSummary: string;
  attributionTemplate?: string;
  /** 公開前に完了させる作業。空配列は公開可能を意味しない。 */
  remainingWork: string[];
}

/**
 * 外部資格を追加するときの単一の判断台帳。
 * 「公式に問題と正答がある」だけでは live にせず、転載条件まで確認する。
 */
export const QUALIFICATION_CATALOG: readonly QualificationCatalogEntry[] = [
  {
    slug: "fp3",
    examCode: "fp3",
    shortName: "FP3級",
    fullName: "3級ファイナンシャル・プランニング技能検定",
    domain: "finance",
    administrator: "日本ファイナンシャル・プランナーズ協会",
    officialQuestionsUrl: "https://www.jafp.or.jp/exam/mohan/",
    officialReuseTermsUrl: "https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf",
    status: "live",
    reuseSummary: "公式に公表された学科・実技の問題と正答を、年度ごとに収録。",
    attributionTemplate: "出典：日本FP協会 3級ファイナンシャル・プランニング技能検定 学科試験（公表年月）",
    remainingWork: ["2026年公表問題の追加", "法改正影響を受ける問題の失効管理"],
  },
  {
    slug: "fp2",
    examCode: "fp2",
    shortName: "FP2級",
    fullName: "2級ファイナンシャル・プランニング技能検定",
    domain: "finance",
    administrator: "日本ファイナンシャル・プランナーズ協会",
    officialQuestionsUrl: "https://www.jafp.or.jp/exam/mohan/",
    officialReuseTermsUrl: "https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf",
    status: "live",
    reuseSummary: "日本FP協会・金融財政事情研究会が公表した学科・実技の問題を収録。",
    attributionTemplate: "出典：日本FP協会 2級ファイナンシャル・プランニング技能検定（公表年月）",
      remainingWork: ["2026年5月公表の問11〜60の追加", "法改正影響の継続確認"],
  },
  {
    slug: "denken3",
    examCode: "denken3",
    shortName: "電験三種",
    fullName: "第三種電気主任技術者試験",
    domain: "electrical",
    administrator: "電気技術者試験センター",
    officialQuestionsUrl: "https://www.shiken.or.jp/chief/third/qa/",
    officialReuseTermsUrl: "https://www.shiken.or.jp/shiken/faq/faq08/000082.html",
    status: "live",
    reuseSummary: "公式に公表された過去問題と正答を、年度・科目ごとに収録。",
    attributionTemplate: "出典：令和○年度○期第三種電気主任技術者試験 ○○科目",
    remainingWork: ["一般解説のみの2問について全肢解説を独立確認", "数式・図のアクセシビリティを継続改善"],
  },
  {
    slug: "denken2",
    examCode: "denken2",
    shortName: "電験二種",
    fullName: "第二種電気主任技術者試験 一次試験",
    domain: "electrical",
    administrator: "電気技術者試験センター",
    officialQuestionsUrl: "https://www.shiken.or.jp/chief/second/qa/",
    officialReuseTermsUrl: "https://www.shiken.or.jp/shiken/faq/faq08/000082.html",
    status: "live",
    reuseSummary: "令和8年度一次試験の電力・法規（各7問・空欄35）を収録。空欄ごとに公式の解答群15肢から選び、全肢の解説を確認できます。",
    attributionTemplate: "出典：令和○年度第二種電気主任技術者一次試験○○科目○問題問○",
    remainingWork: ["令和8年度一次試験の理論・機械の追加", "過年度（令和7年度以前）の一次試験の追加"],
  },
  {
    slug: "denko2",
    examCode: "denko2",
    shortName: "第二種電気工事士",
    fullName: "第二種電気工事士試験",
    domain: "electrical",
    administrator: "電気技術者試験センター",
    officialQuestionsUrl: "https://www.shiken.or.jp/construction/second/qa/",
    officialReuseTermsUrl: "https://www.shiken.or.jp/shiken/faq/faq08/000082.html",
    status: "live",
    reuseSummary: "公式に公表された過去問題と正答を、年度ごとに収録。",
    attributionTemplate: "出典：令和○年度○期第二種電気工事士学科試験",
    remainingWork: ["令和8年度上期学科の問11〜50の追加"],
  },
  {
    slug: "denko1",
    examCode: "denko1",
    shortName: "第一種電気工事士",
    fullName: "第一種電気工事士試験",
    domain: "electrical",
    administrator: "電気技術者試験センター",
    officialQuestionsUrl: "https://www.shiken.or.jp/construction/first/qa/",
    officialReuseTermsUrl: "https://www.shiken.or.jp/shiken/faq/faq08/000082.html",
    status: "live",
    reuseSummary: "令和8年度上期学科試験(CBT)で公表された出題例の全50問(一般問題40問・配線図問題10問)と各選択肢の解説を収録。",
    attributionTemplate: "出典：令和○年度第一種電気工事士○期学科試験",
    remainingWork: ["令和7年度下期など過去の学科試験の追加", "技能試験(候補問題・欠陥判断基準)の掲載検討"],
  },
  {
    slug: "sekou-doboku2",
    examCode: "civil2",
    shortName: "2級土木施工管理",
    fullName: "2級土木施工管理技術検定",
    domain: "construction",
    administrator: "全国建設研修センター",
    officialQuestionsUrl: "https://www.jctc.jp/mondai/",
    officialReuseTermsUrl: "https://www.jctc.jp/mondai/",
    status: "live",
    reuseSummary: "令和8年度前期と令和7年度10月実施分の第一次検定（土木）各全66問と各選択肢の解説を収録。",
    attributionTemplate: "出典：全国建設研修センター ○年度2級土木施工管理技術検定 第一次検定（土木）",
    remainingWork: ["他年度・後期の追加", "工事仕様書の改定に伴う解説更新"],
  },
  {
    slug: "sekou-kankoji2",
    examCode: "kankoji2",
    shortName: "2級管工事施工管理",
    fullName: "2級管工事施工管理技術検定",
    domain: "construction",
    administrator: "全国建設研修センター",
    officialQuestionsUrl: "https://www.jctc.jp/mondai/",
    officialReuseTermsUrl: "https://www.jctc.jp/mondai/",
    status: "live",
    reuseSummary: "令和8年度前期と令和7年度後期の第一次検定を各全52問、各選択肢の解説付きで収録。",
    attributionTemplate: "出典：全国建設研修センター ○年度2級管工事施工管理技術検定 第一次検定（前期／後期）",
    remainingWork: ["他年度の追加", "公共建築工事標準仕様書の改定に伴う解説更新"],
  },
  {
    slug: "kaigo",
    examCode: "kaigo",
    shortName: "介護福祉士",
    fullName: "介護福祉士国家試験",
    domain: "welfare",
    administrator: "社会福祉振興・試験センター",
    officialQuestionsUrl: "https://www.sssc.or.jp/kaigo/past_exam/index.html",
    officialReuseTermsUrl: "https://www.sssc.or.jp/pastissues/index.html",
    status: "live",
    reuseSummary: "第38回（令和7年度）の全125問（総合問題・図の問題を含む）と全選択肢の解説を収録。",
    attributionTemplate: "出典：公益財団法人社会福祉振興・試験センター 第○回介護福祉士国家試験 問題○",
    remainingWork: ["第37回・第36回の追加", "法改正で成立しなくなった問題の失効管理"],
  },
  {
    slug: "shakai",
    examCode: "shakai",
    shortName: "社会福祉士",
    fullName: "社会福祉士国家試験",
    domain: "welfare",
    administrator: "社会福祉振興・試験センター",
    officialQuestionsUrl: "https://www.sssc.or.jp/shakai/past_exam/index.html",
    officialReuseTermsUrl: "https://www.sssc.or.jp/pastissues/index.html",
    status: "live",
    reuseSummary: "第38回（令和7年度）の全129問（共通科目84問・専門科目45問）と全選択肢の解説を収録。",
    attributionTemplate: "出典：公益財団法人社会福祉振興・試験センター 第○回社会福祉士国家試験 問題○",
    remainingWork: ["第37回・第36回の追加", "法改正で成立しなくなった問題の失効管理"],
  },
  {
    slug: "seishin",
    examCode: "seishin",
    shortName: "精神保健福祉士",
    fullName: "精神保健福祉士国家試験",
    domain: "welfare",
    administrator: "社会福祉振興・試験センター",
    officialQuestionsUrl: "https://www.sssc.or.jp/seishin/past_exam/index.html",
    officialReuseTermsUrl: "https://www.sssc.or.jp/pastissues/index.html",
    status: "live",
    reuseSummary: "第28回（令和7年度）の専門科目48問と共通科目84問、全選択肢の解説を収録。",
    attributionTemplate: "出典：公益財団法人社会福祉振興・試験センター 第○回精神保健福祉士国家試験 問題○",
    remainingWork: ["第27回・第26回の追加", "法改正で成立しなくなった問題の失効管理"],
  },
  {
    slug: "sekou-kenchiku1",
    shortName: "1級建築施工管理",
    fullName: "1級建築施工管理技術検定",
    domain: "construction",
    administrator: "建設業振興基金",
    officialQuestionsUrl: "https://www.fcip-shiken.jp/about/",
    officialReuseTermsUrl: "https://www.fcip-shiken.jp/about/",
    status: "permission-required",
    reuseSummary: "公式ページは問題・正答肢を公開する一方、掲載記事・写真・図表の転載を禁止。",
    remainingWork: ["試験実施機関からWeb問題集への転載許諾を取得", "許諾条件に従い出典表記を確定"],
  },
  {
    slug: "sekou-denki1",
    shortName: "1級電気工事施工管理",
    fullName: "1級電気工事施工管理技術検定",
    domain: "construction",
    administrator: "建設業振興基金",
    officialQuestionsUrl: "https://www.fcip-shiken.jp/about/",
    officialReuseTermsUrl: "https://www.fcip-shiken.jp/about/",
    status: "permission-required",
    reuseSummary: "建築施工管理と同じページに転載禁止表示がある。",
    remainingWork: ["試験実施機関からWeb問題集への転載許諾を取得"],
  },
  {
    slug: "sekou-doboku1",
    shortName: "1級土木施工管理",
    fullName: "1級土木施工管理技術検定",
    domain: "construction",
    administrator: "全国建設研修センター",
    officialQuestionsUrl: "https://www.jctc.jp/mondai/",
    officialReuseTermsUrl: "https://www.jctc.jp/mondai/",
    status: "terms-review-required",
    reuseSummary: "問題と正答肢の公式公開は確認済み。二次利用を認める明示条件は未確認。",
    remainingWork: ["転載可否と必要な申請を実施機関へ照会", "公開期間が1年の資料を恒久掲載できるか確認"],
  },
  {
    slug: "takken",
    examCode: "takken",
    shortName: "宅建",
    fullName: "宅地建物取引士資格試験",
    domain: "real-estate",
    administrator: "不動産適正取引推進機構",
    officialQuestionsUrl: "https://www.retio.or.jp/exam/past_ques_ans/other/",
    officialReuseTermsUrl: "https://www.retio.or.jp/copyright/",
    status: "live",
    reuseSummary: "2024・2025年度の公式問題・正解番号表を掲載し、各年度の解説に法令基準日を表示。",
    remainingWork: [],
  },
  {
    slug: "tohan-kansai",
    examCode: "tohan",
    shortName: "登録販売者（関西）",
    fullName: "登録販売者試験（関西広域連合：滋賀・京都・大阪・兵庫・和歌山・奈良・徳島）",
    domain: "pharmacy",
    administrator: "関西広域連合",
    officialQuestionsUrl: "https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/touroku/7607.html",
    officialReuseTermsUrl: "https://www.kouiki-kansai.jp/site/221.html",
    status: "live",
    reuseSummary: "令和7年度（2025年8月23日実施）の全120問と各選択肢の解説を収録。",
    attributionTemplate: "出典：関西広域連合 令和○年度 登録販売者試験（前半／後半）問○",
    remainingWork: ["令和8年度は公式の「正答(例)」のみで確定正答の公表待ち", "他の年度（令和元〜6年度）の追加", "東京都・神奈川県など他ブロックは個別に確認"],
  },
  {
    slug: "gyoseishoshi",
    shortName: "行政書士",
    fullName: "行政書士試験",
    domain: "legal",
    administrator: "行政書士試験研究センター",
    officialQuestionsUrl: "https://www.gyosei-shiken.or.jp/",
    officialReuseTermsUrl: "https://gyosei-shiken.or.jp/doc/about/copyright.html",
    status: "permission-required",
    reuseSummary: "書籍・ホームページ等への掲載にはセンターの許諾が必要。",
    remainingWork: ["掲載許諾を申請", "第三者著作物により非公開の設問を除外"],
  },
  {
    slug: "eisei1",
    shortName: "第一種衛生管理者",
    fullName: "第一種衛生管理者免許試験",
    domain: "safety",
    administrator: "安全衛生技術試験協会",
    officialQuestionsUrl: "https://www.exam.or.jp/lckohyo/",
    officialReuseTermsUrl: "https://www.exam.or.jp/",
    status: "terms-review-required",
    reuseSummary: "公表試験問題と正答は確認済み。再掲載条件の明示を追加確認する。",
    remainingWork: ["再掲載条件を協会へ確認", "安全AIとの重複コンテンツ方針を決定"],
  },
  {
    slug: "boki3",
    shortName: "日商簿記3級",
    fullName: "日商簿記検定3級",
    domain: "accounting",
    administrator: "日本商工会議所",
    officialQuestionsUrl: "https://www.kentei.ne.jp/bookkeeping/sample",
    officialReuseTermsUrl: "https://www.kentei.ne.jp/bookkeeping/sample",
    status: "permission-required",
    reuseSummary: "過去問は非公開。サンプル問題も無断転載・無断営利利用を禁止。",
    remainingWork: ["利用許諾を取得できない限り問題本文を収録しない"],
  },
] as const;

export function getQualificationByExamCode(exam: ExamCode): QualificationCatalogEntry | undefined {
  return QUALIFICATION_CATALOG.find((item) => item.examCode === exam);
}

/** Public routes and question registries must call this gate before exposing external data. */
export function isExamPublished(exam: ExamCode): boolean {
  return getQualificationByExamCode(exam)?.status === "live" || !getQualificationByExamCode(exam);
}
