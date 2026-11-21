import khkPublication from "@/data/qualification-staging/khk-kagaku/manifest.json";

import { DENKEN1_NATIVE_FIELD_COUNT, DENKEN1_NATIVE_QUESTIONS, DENKEN1_NATIVE_YEARS_LABEL, DENKEN1_PUBLISHED_ORIGINAL_COUNT } from "@/lib/denken1/native";


import type { ExamCode } from "@/lib/questions/types";


import { canonicalExamCode } from "@/lib/questions/exam-aliases";

export type QualificationDomain =

  "information-technology" | "finance" | "business" | "electrical" | "construction" | "real-estate" | "pharmacy" | "legal" | "safety" | "accounting" | "welfare" | "personal-services" | "automotive";

export type PublicationStatus =

  | "live"

  | "notification-required"

  | "ready-to-ingest"

  | "permission-required"

  | "terms-review-required"
  | "unpublished";

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

  stagingDataPath?: string;

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
  {"slug": "eikenp2", "examCode": "eikenp2", "shortName": "英検準2級", "fullName": "実用英語技能検定 準2級", "domain": "personal-services", "administrator": "公益財団法人日本英語検定協会", "officialQuestionsUrl": "https://www.eiken.or.jp/eiken/exam/grade_p2/", "officialReuseTermsUrl": "https://www.eiken.or.jp/eiken/exam/grade_p2/", "status": "live", "reuseSummary": "英検準2級の2026年度第2回・第1回と2025年度第3回、計183問を収録。各回の読解29問・記述2問・リスニング30問を公式問題・正答・音源と独自解説で学べます。", "attributionTemplate": "出典：公益財団法人日本英語検定協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "zensho-calc-1", "examCode": "zensho-calc-1", "shortName": "全商ビジネス計算実務検定 1級", "fullName": "全商ビジネス計算実務検定 1級", "domain": "accounting", "administrator": "全国商業高等学校協会", "officialQuestionsUrl": "https://zensho.or.jp/examination/pastexams/calculating/", "officialReuseTermsUrl": "https://zensho.or.jp/examination/pastexams/calculating/", "status": "live", "reuseSummary": "第153回の1級普通計算部門から乗算・除算・見取算30問と公式解答を収録。", "remainingWork": []},
  {"slug": "suken-11", "examCode": "suken-11", "shortName": "算数検定 11級", "fullName": "実用数学技能検定 算数検定11級", "domain": "personal-services", "administrator": "日本数学検定協会", "officialQuestionsUrl": "https://www.su-gaku.net/suken/support/past_questions/", "officialReuseTermsUrl": "https://www.su-gaku.net/suken/support/past_questions/", "status": "live", "reuseSummary": "2020年公表の計算技能・算数技能20問と公式解答を収録。", "remainingWork": []},
  {"slug": "suken-jun1", "examCode": "suken-jun1", "shortName": "数学検定 準1級", "fullName": "実用数学技能検定 数学検定準1級", "domain": "personal-services", "administrator": "日本数学検定協会", "officialQuestionsUrl": "https://www.su-gaku.net/suken/support/past_questions/", "officialReuseTermsUrl": "https://www.su-gaku.net/suken/support/past_questions/", "status": "live", "reuseSummary": "2024年公表の2次検定7問と公式解答を収録。", "remainingWork": []},
  {"slug": "jlpt-n3", "examCode": "jlpt-n3", "shortName": "日本語能力試験 N3", "fullName": "日本語能力試験（JLPT）N3", "domain": "personal-services", "administrator": "国際交流基金・日本国際教育支援協会", "officialQuestionsUrl": "https://www.jlpt.jp/e/samples/sampleindex.html", "officialReuseTermsUrl": "https://www.jlpt.jp/e/samples/sampleindex.html", "status": "live", "reuseSummary": "2012年版の文字・語彙、文法、読解12大問と公式正答を収録。", "remainingWork": []},
  {"slug": "jlpt-n5", "examCode": "jlpt-n5", "shortName": "日本語能力試験 N5", "fullName": "日本語能力試験（JLPT）N5", "domain": "personal-services", "administrator": "国際交流基金・日本国際教育支援協会", "officialQuestionsUrl": "https://www.jlpt.jp/e/samples/sampleindex.html", "officialReuseTermsUrl": "https://www.jlpt.jp/e/samples/sampleindex.html", "status": "live", "reuseSummary": "2018年版の文字・語彙、文法、読解10大問と公式正答を収録。", "remainingWork": []},
  {
    slug: "kanken-3", examCode: "kanken-3", shortName: "漢検3級", fullName: "日本漢字能力検定 3級",
    domain: "personal-services", administrator: "日本漢字能力検定協会",
    officialQuestionsUrl: "https://www.kanken.or.jp/kanken/grades/sample/", officialReuseTermsUrl: "https://www.kanken.or.jp/kanken/grades/sample/", status: "live",
    reuseSummary: "2026年度第1回の問題120問と標準解答を収録。",
    remainingWork: [],
  },
  {"slug": "zensho-eco-77", "examCode": "zensho-eco-77", "shortName": "商業経済検定・ビジネス基礎", "fullName": "商業経済検定・ビジネス基礎", "domain": "accounting", "administrator": "公益財団法人全国商業高等学校協会", "officialQuestionsUrl": "https://zensho.or.jp/examination/pastexams/economics/", "officialReuseTermsUrl": "https://zensho.or.jp/examination/pastexams/economics/", "status": "live", "reuseSummary": "商業経済検定ビジネス基礎の令和7・6年度（第40・39回）を各50問、計100問収録。公式問題・模範解答と独自解説で学べます。", "attributionTemplate": "出典：公益財団法人全国商業高等学校協会「商業経済検定試験 ビジネス基礎」。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-18", "examCode": "kogai-18", "shortName": "公害防止管理者・水質関係技術特論", "fullName": "公害防止管理者・水質関係技術特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者等国家試験の2026年度「水質関係技術特論」全20問を収録。公式問題・正答と全100肢の独自解説で学べます。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-13", "examCode": "kogai-13", "shortName": "公害防止管理者・ばいじん・一般粉じん特論", "fullName": "公害防止管理者・ばいじん・一般粉じん特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者等国家試験の2026年度「ばいじん・一般粉じん特論」全10問を収録。公式問題・正答と全50肢の独自解説で学べます。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "concrete-assou1", "examCode": "concrete-assou1", "shortName": "コンクリート圧送施工技能士 1級", "fullName": "技能検定 1級コンクリート圧送施工（コンクリート圧送工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "コンクリート圧送施工技能士1級の学科試験を、公式正答・全肢の独自解説・原本図付きで収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "zensho-eco-80", "examCode": "zensho-eco-80", "shortName": "商業経済検定（ビジネス法規）", "fullName": "商業経済検定・ビジネス法規", "domain": "finance", "administrator": "公益財団法人全国商業高等学校協会", "officialQuestionsUrl": "https://zensho.or.jp/examination/pastexams/economics/", "officialReuseTermsUrl": "https://zensho.or.jp/examination/pastexams/economics/", "status": "live", "reuseSummary": "商業経済検定の第39・40回（令和6・7年度）ビジネス法規全100問を、公式正答・原文画像・独自解説付きで収録。", "attributionTemplate": "出典：公益財団法人全国商業高等学校協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-08", "examCode": "kogai-08", "shortName": "公害防止管理者（汚水処理）", "fullName": "公害防止管理者・汚水処理特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者等国家試験の2026年度「汚水処理特論」全25問を収録。公式正答・原図・全125肢の独自解説で学べます。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-04", "examCode": "kogai-04", "shortName": "公害防止管理者（ばいじん・粉じん）", "fullName": "公害防止管理者・ばいじん・粉じん特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者等国家試験の2026年度「ばいじん・粉じん特論」全15問を、公式正答・原図・全75肢の独自解説付きで収録。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "aigan-kangoshi", "examCode": "aigan-kangoshi", "shortName": "愛玩動物看護師", "fullName": "愛玩動物看護師国家試験", "domain": "welfare", "administrator": "一般財団法人動物看護師統一認定機構", "officialQuestionsUrl": "https://www.ccrvn.jp/aigan.shiken.mondai.kakoshiken.html", "officialReuseTermsUrl": "https://www.ccrvn.jp/aigan.shiken.mondai.kakoshiken.html", "status": "live", "reuseSummary": "愛玩動物看護師国家試験の第3・4回の必須・一般問題、計300問を収録。公式正答と全1500肢の独自解説で学べます。", "attributionTemplate": "出典：一般財団法人動物看護師統一認定機構。解説は過去問AIの独自作成。", "remainingWork": ["第3・4回の実地問題各50問（公式公開版では全100問の図が省略されている）"]},
  {"slug": "concrete-assou2", "examCode": "concrete-assou2", "shortName": "コンクリート圧送施工技能士 2級", "fullName": "技能検定 2級コンクリート圧送施工（コンクリート圧送工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B50&v4=%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%88%E5%9C%A7%E9%80%81%E6%96%BD%E5%B7%A5%EF%BC%88%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%88%E5%9C%A7%E9%80%81%E5%B7%A5%E4%BA%8B%E4%BD%9C%E6%A5%AD%EF%BC%89", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "コンクリート圧送施工技能士2級（コンクリート圧送工事作業）学科の2024・2025年度後期100問を収録。公式正答と全肢の独自解説、原本図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kawarabuki1", "examCode": "kawarabuki1", "shortName": "かわらぶき技能士 1級", "fullName": "技能検定 1級かわらぶき（かわらぶき作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B43&v4=%E3%81%8B%E3%82%8F%E3%82%89%E3%81%B6%E3%81%8D%EF%BC%88%E3%81%8B%E3%82%8F%E3%82%89%E3%81%B6%E3%81%8D%E4%BD%9C%E6%A5%AD%EF%BC%89", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "かわらぶき技能士1級（かわらぶき作業）学科の2024・2025年度後期100問を収録。公式正答、全肢の独自解説、原本の図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "zensho-marketing", "examCode": "zensho-marketing", "shortName": "商業経済検定・マーケティング", "fullName": "商業経済検定試験・マーケティング", "domain": "accounting", "administrator": "公益財団法人全国商業高等学校協会", "officialQuestionsUrl": "https://zensho.or.jp/examination/pastexams/economics/", "officialReuseTermsUrl": "https://zensho.or.jp/examination/pastexams/economics/", "status": "live", "reuseSummary": "商業経済検定・マーケティングの2024・2025年度（第39・40回）全100問を収録。公式問題・模範解答、選択式の全肢解説と用語記入の解説で学べます。", "attributionTemplate": "出典：公益財団法人全国商業高等学校協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-11", "examCode": "kogai-11", "shortName": "公害防止管理者・騒音・振動概論", "fullName": "公害防止管理者等国家試験・騒音・振動概論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者等国家試験の2026年度「騒音・振動概論」全25問を収録。公式問題・正答と全選択肢の独自解説で学べます。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-14", "examCode": "kogai-14", "shortName": "公害防止管理者・ダイオキシン類概論", "fullName": "公害防止管理者等国家試験・ダイオキシン類概論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者等国家試験の2026年度「ダイオキシン類概論」全15問を収録。公式問題・正答と全選択肢の独自解説で学べます。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "technical-illustration-cad1", "examCode": "technical-illustration-cad1", "shortName": "テクニカルイラストレーション技能士1級（CAD作業）", "fullName": "技能検定 1級テクニカルイラストレーション（テクニカルイラストレーションCAD作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B58&v4=%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%EF%BC%88%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%EF%BC%A3%EF%BC%A1%EF%BC%A4%E4%BD%9C%E6%A5%AD%EF%BC%89", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "テクニカルイラストレーション技能士1級（CAD作業）の2025年度後期、学科試験全50問を収録。真偽法・多肢択一法の公式正答、全150肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kawarabuki2", "examCode": "kawarabuki2", "shortName": "かわらぶき技能士2級", "fullName": "技能検定 2級かわらぶき（かわらぶき作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2024・2025年度後期の学科全100問を収録。真偽法と多肢択一法を、公式正答・全肢の独自解説・原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "zensho-eco-79", "examCode": "zensho-eco-79", "shortName": "商業経済検定・商品開発と流通", "fullName": "商業経済検定・商品開発と流通", "domain": "finance", "administrator": "公益財団法人全国商業高等学校協会", "officialQuestionsUrl": "https://zensho.or.jp/examination/pastexams/economics/", "officialReuseTermsUrl": "https://zensho.or.jp/examination/pastexams/economics/", "status": "live", "reuseSummary": "商業経済検定「商品開発と流通」の2025・2024年度（第40・39回）、全100小問を収録。公式の共通本文・図表・模範解答と独自解説で学べます。", "attributionTemplate": "出典：公益財団法人全国商業高等学校協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "career-gino-1", "examCode": "career-gino-1", "shortName": "キャリアコンサルティング技能検定1級", "fullName": "キャリアコンサルティング技能検定1級（学科）", "domain": "welfare", "administrator": "特定非営利活動法人キャリアコンサルティング協議会", "officialQuestionsUrl": "https://www.career-kentei.org/about/learninfo/", "officialReuseTermsUrl": "https://www.career-kentei.org/about/learninfo/", "status": "live", "reuseSummary": "キャリアコンサルティング技能検定1級の2025・2024年度後期、学科試験全100問を収録。公式問題・正答と全500肢の独自解説で学べます。", "attributionTemplate": "出典：特定非営利活動法人キャリアコンサルティング協議会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-12", "examCode": "kogai-12", "shortName": "公害防止管理者 騒音・振動特論", "fullName": "公害防止管理者等国家試験 騒音・振動特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者等国家試験の2026年度「騒音・振動特論」全30問を収録。公式問題・正答、原図・数式、全150肢の独自解説で科目別に学べます。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-15", "examCode": "kogai-15", "shortName": "公害防止管理者 ダイオキシン類特論", "fullName": "公害防止管理者等国家試験 ダイオキシン類特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者等国家試験の2026年度「ダイオキシン類特論」全25問を収録。公式問題・正答、原図・数式、全125肢の独自解説で科目別に学べます。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "dekyo-charge-1", "examCode": "dekyo-charge-1", "shortName": "工事担任者 第一級アナログ通信", "fullName": "電気通信設備工事担任者試験 第一級アナログ通信", "domain": "electrical", "administrator": "一般財団法人日本データ通信協会", "officialQuestionsUrl": "https://www.dekyo.or.jp/shiken/charge/exam", "officialReuseTermsUrl": "https://www.dekyo.or.jp/shiken/charge/exam", "status": "live", "reuseSummary": "2026年度第1回・2025年度第1回と第2回の全3科目、45大問216解答欄を公式問題・正答と独自解説で収録。", "attributionTemplate": "出典：一般財団法人日本データ通信協会「工事担任者試験 第一級アナログ通信」。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "cfp-3", "examCode": "cfp-3", "shortName": "CFP® ライフプランニング・リタイアメントプランニング", "fullName": "CFP® ライフプランニング・リタイアメントプランニング", "domain": "finance", "administrator": "NPO法人日本FP協会", "officialQuestionsUrl": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "officialReuseTermsUrl": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "status": "live", "reuseSummary": "2026年度第1・2回の問題1〜5を各5問、計10問と全40肢の独自解説で部分収録。", "attributionTemplate": "出典：NPO法人日本FP協会。解説は過去問AIの独自作成。", "remainingWork": ["2026年度第1・2回の問題6〜50、計90問の補充"]},
  {"slug": "dekyo-charge-2", "examCode": "dekyo-charge-2", "shortName": "工事担任者 第二級アナログ通信", "fullName": "工事担任者 第二級アナログ通信", "domain": "electrical", "administrator": "一般財団法人日本データ通信協会", "officialQuestionsUrl": "https://www.dekyo.or.jp/shiken/charge/exam", "officialReuseTermsUrl": "https://www.dekyo.or.jp/shiken/charge/exam", "status": "live", "reuseSummary": "2026年度第1回・2025年度第1・2回の基礎・技術及び理論・法規186問を収録。公式正答と全肢の独自解説付き。", "attributionTemplate": "出典：一般財団法人日本データ通信協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-16", "examCode": "kogai-16", "shortName": "公害防止管理者・大気・水質概論", "fullName": "公害防止管理者・大気・水質概論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "2026年度の大気・水質概論全10問と全50肢の独自解説を収録。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "building-cleaning2", "examCode": "building-cleaning2", "shortName": "ビルクリーニング技能検定2級（学科）", "fullName": "ビルクリーニング技能検定2級（学科）", "domain": "safety", "administrator": "公益社団法人全国ビルメンテナンス協会", "officialQuestionsUrl": "https://www.j-bma.or.jp/qualification-training/building-cleaning", "officialReuseTermsUrl": "https://www.j-bma.or.jp/qualification-training/building-cleaning", "status": "live", "reuseSummary": "2024・2025年度の学科100問（各年度A群25題・B群25題）を公式正答・全300肢の独自解説付きで収録。", "attributionTemplate": "出典：公益社団法人全国ビルメンテナンス協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-taiki-yugai", "examCode": "kogai-taiki-yugai", "shortName": "公害防止管理者 大気有害物質特論", "fullName": "公害防止管理者 大気有害物質特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "2026年度の大気有害物質特論・全10問を公式正答・全50肢の独自解説付きで収録。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "dekyo-digital2", "examCode": "dekyo-digital2", "shortName": "工事担任者 第二級デジタル通信", "fullName": "工事担任者 第二級デジタル通信", "domain": "electrical", "administrator": "一般財団法人日本データ通信協会 電気通信国家試験センター", "officialQuestionsUrl": "https://www.dekyo.or.jp/shiken/charge/exam", "officialReuseTermsUrl": "https://www.dekyo.or.jp/shiken/charge/exam", "status": "live", "reuseSummary": "2025年度第1回・第2回と2026年度第1回の3科目・全39大問186解答欄を原本画像・公式正答・全肢解説付きで収録。", "attributionTemplate": "出典：一般財団法人日本データ通信協会 電気通信国家試験センター。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "sakui-rotary1", "examCode": "sakui-rotary1", "shortName": "さく井技能士1級（ロータリー式）", "fullName": "さく井技能検定1級（ロータリー式さく井工事作業）", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "さく井技能検定1級（ロータリー式さく井工事作業）の2025・2024年度後期各50問、計100問を、公式正答と全肢解説付きで収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kouku-kanseikan", "examCode": "kouku-kanseikan", "shortName": "航空管制官（基礎能力）", "fullName": "航空管制官採用試験（基礎能力試験）", "domain": "legal", "administrator": "人事院", "officialQuestionsUrl": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_24.html", "officialReuseTermsUrl": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_24.html", "status": "live", "reuseSummary": "航空管制官採用試験の2026年度基礎能力から、判断推理・数的推理・資料解釈・時事・情報を公式正答・全肢解説・原図付きで学べます。", "attributionTemplate": "出典：人事院。解説は過去問AIの独自作成。", "remainingWork": ["2025年度基礎能力と適性・外国語試験の補充"]},
  {"slug": "cfp-realestate", "examCode": "cfp-realestate", "shortName": "CFP®不動産運用設計", "fullName": "CFP®資格審査試験（不動産運用設計）", "domain": "finance", "administrator": "NPO法人日本FP協会", "officialQuestionsUrl": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "officialReuseTermsUrl": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "status": "live", "reuseSummary": "2026年度第1回・第2回の不動産運用設計各50問、計100問を公式正答・独自解説・原本の設例と図表付きで収録。", "attributionTemplate": "出典：NPO法人日本FP協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "building-cleaning3", "examCode": "building-cleaning3", "shortName": "ビルクリーニング技能士3級", "fullName": "ビルクリーニング技能士3級", "domain": "safety", "administrator": "公益社団法人全国ビルメンテナンス協会", "officialQuestionsUrl": "https://www.j-bma.or.jp/qualification-training/building-cleaning", "officialReuseTermsUrl": "https://www.j-bma.or.jp/qualification-training/building-cleaning", "status": "live", "reuseSummary": "2022〜2025年度の学科試験各25問、計100問を公式正答と独自解説付きで収録。", "attributionTemplate": "出典：公益社団法人全国ビルメンテナンス協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-taiki-gairon", "examCode": "kogai-taiki-gairon", "shortName": "公害防止管理者・大気概論", "fullName": "公害防止管理者・大気概論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "2026年度の大気概論・全10問を公式正答と全肢の独自解説付きで収録。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "restaurant-1", "examCode": "restaurant-1", "shortName": "レストランサービス技能検定1級（学科）", "fullName": "レストランサービス技能検定1級（学科）", "domain": "personal-services", "administrator": "一般社団法人日本ホテル・レストランサービス技能協会", "officialQuestionsUrl": "https://hrs.or.jp/restaurant/certificate/index.html", "officialReuseTermsUrl": "https://hrs.or.jp/restaurant/certificate/index.html", "status": "live", "reuseSummary": "2025・2026年度の学科試験を各100問、計200問収録。公式問題・正答と独自解説で、料飲サービス・食品衛生・国際儀礼を学べます。", "attributionTemplate": "出典：一般社団法人日本ホテル・レストランサービス技能協会「レストランサービス技能検定」。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "cfp-souzoku", "examCode": "cfp-souzoku", "shortName": "CFP®・相続・事業承継設計", "fullName": "CFP®・相続・事業承継設計", "domain": "finance", "administrator": "NPO法人日本FP協会", "officialQuestionsUrl": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "officialReuseTermsUrl": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "status": "live", "reuseSummary": "2026年度第1・2回の相続・事業承継設計を全100問収録。公式問題・正答と独自解説で、相続・遺言・財産評価・事業承継を学べます。", "attributionTemplate": "出典：NPO法人日本FP協会「CFP®資格審査試験 相続・事業承継設計」。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-taiki-tokuron", "examCode": "kogai-taiki-tokuron", "shortName": "公害防止管理者・大気特論", "fullName": "公害防止管理者（大気特論）", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者の2026年度大気特論を全15問収録。燃料・燃焼、排煙処理、測定・分析を公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "telecom-chief-denso", "examCode": "telecom-chief-denso", "shortName": "電気通信主任技術者・伝送交換", "fullName": "電気通信主任技術者（伝送交換設備及び設備管理）", "domain": "electrical", "administrator": "一般財団法人日本データ通信協会 電気通信国家試験センター", "officialQuestionsUrl": "https://www.dekyo.or.jp/shiken/chief/exam", "officialReuseTermsUrl": "https://www.dekyo.or.jp/shiken/chief/exam", "status": "live", "reuseSummary": "電気通信主任技術者の伝送交換設備及び設備管理から、2026年度第1回・2025年度第1回と第2回の全180解答欄を収録。公式問題・正答と独自解説で、伝送・交換・無線・電源・設備管理・情報セキュリティを学べます。", "attributionTemplate": "出典：一般財団法人日本データ通信協会 電気通信国家試験センター。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "eiken2", "examCode": "eiken2", "shortName": "英検2級", "fullName": "実用英語技能検定2級", "domain": "personal-services", "administrator": "公益財団法人日本英語検定協会", "officialQuestionsUrl": "https://www.eiken.or.jp/eiken/exam/grade_2/", "officialReuseTermsUrl": "https://www.eiken.or.jp/eiken/exam/grade_2/", "status": "live", "reuseSummary": "2026年度第1・2回、2025年度第3回の一次試験189問を収録。公式正答と全選択肢の独自解説、公式音声、英文の独自解答例付き。", "attributionTemplate": "出典：公益財団法人日本英語検定協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "restaurant-2", "examCode": "restaurant-2", "shortName": "レストランサービス技能士 2級", "fullName": "レストランサービス技能検定2級（学科）", "domain": "personal-services", "administrator": "一般社団法人日本ホテル・レストランサービス技能協会", "officialQuestionsUrl": "https://hrs.or.jp/restaurant/certificate/index.html", "officialReuseTermsUrl": "https://hrs.or.jp/restaurant/certificate/index.html", "status": "live", "reuseSummary": "2025・2026年度の学科各100問を、公式正答と全肢の独自解説付きで収録。", "attributionTemplate": "出典：一般社団法人日本ホテル・レストランサービス技能協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-17", "examCode": "kogai-17", "shortName": "公害防止管理者・大気関係技術特論", "fullName": "公害防止管理者・大気関係技術特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者等国家試験の2026年度・大気関係技術特論全20問を収録。公式問題・正答と全肢の独自解説で、燃焼・排ガス処理・集じん・大気拡散を学べます。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "dekyo-chief-3", "examCode": "dekyo-chief-3", "shortName": "電気通信主任技術者・法規", "fullName": "電気通信主任技術者・法規", "domain": "electrical", "administrator": "一般財団法人日本データ通信協会 電気通信国家試験センター", "officialQuestionsUrl": "https://www.dekyo.or.jp/shiken/chief/exam", "officialReuseTermsUrl": "https://www.dekyo.or.jp/shiken/chief/exam", "status": "live", "reuseSummary": "電気通信主任技術者の2025・2026年度・法規を3回92解答欄、公式正答と独自解説で学べます。伝送交換・線路共通の問題です。", "attributionTemplate": "出典：一般財団法人日本データ通信協会 電気通信国家試験センター。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "eiken3", "examCode": "eiken3", "shortName": "英検3級", "fullName": "実用英語技能検定3級", "domain": "personal-services", "administrator": "公益財団法人日本英語検定協会", "officialQuestionsUrl": "https://www.eiken.or.jp/eiken/exam/grade_3/", "officialReuseTermsUrl": "https://www.eiken.or.jp/eiken/exam/grade_3/", "status": "live", "reuseSummary": "2026年度第2回・第1回、2025年度第3回の全186問を収録。読解・リスニングの全肢解説、公式音声・原図、英作文の公式解答例付き。", "attributionTemplate": "出典：公益財団法人日本英語検定協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "restaurant-3", "examCode": "restaurant-3", "shortName": "レストランサービス技能検定3級", "fullName": "レストランサービス技能検定3級", "domain": "personal-services", "administrator": "一般社団法人日本ホテル・レストランサービス技能協会", "officialQuestionsUrl": "https://hrs.or.jp/restaurant/certificate/index.html", "officialReuseTermsUrl": "https://hrs.or.jp/restaurant/certificate/index.html", "status": "live", "reuseSummary": "2026・2025年度の学科各100問、計200問を公式正答・正誤の独自解説付きで収録。", "attributionTemplate": "出典：一般社団法人日本ホテル・レストランサービス技能協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "eiken4", "examCode": "eiken4", "shortName": "英検4級", "fullName": "実用英語技能検定4級", "domain": "personal-services", "administrator": "公益財団法人日本英語検定協会", "officialQuestionsUrl": "https://www.eiken.or.jp/eiken/exam/grade_4/", "officialReuseTermsUrl": "https://www.eiken.or.jp/eiken/exam/grade_4/", "status": "live", "reuseSummary": "2026年度第1・2回、2025年度第3回の筆記105問・リスニング90問。公式正答と全750肢の独自解説、公式音源・放送原稿を収録。", "attributionTemplate": "出典：公益財団法人日本英語検定協会。解説は過去問AI独自作成。", "remainingWork": []},
  {"slug": "nyukoku-keibikan", "examCode": "nyukoku-keibikan", "shortName": "入国警備官", "fullName": "入国警備官採用試験", "domain": "legal", "administrator": "人事院", "officialQuestionsUrl": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_27.html", "officialReuseTermsUrl": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_27.html", "status": "live", "reuseSummary": "2025年度基礎能力試験40問を全問収録。公式正答・全200肢の独自解説と原本図表。", "attributionTemplate": "出典：人事院。解説は過去問AIの独自作成。", "remainingWork": ["作文試験等の補充"]},
  {"slug": "chizai3", "examCode": "chizai3", "shortName": "知的財産管理技能検定3級", "fullName": "知的財産管理技能検定3級", "domain": "legal", "administrator": "知的財産教育協会", "officialQuestionsUrl": "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon/", "officialReuseTermsUrl": "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon/", "status": "live", "reuseSummary": "第54回・第53回の学科各30問、計60問を公式正答と全肢解説付きで収録。", "attributionTemplate": "出典：知的財産教育協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "dekyo-chief-2", "examCode": "dekyo-chief-2", "shortName": "電気通信主任技術者（線路）", "fullName": "電気通信主任技術者・線路設備及び設備管理", "domain": "electrical", "administrator": "一般財団法人日本データ通信協会", "officialQuestionsUrl": "https://www.dekyo.or.jp/shiken/chief/exam", "officialReuseTermsUrl": "https://www.dekyo.or.jp/shiken/chief/exam", "status": "live", "reuseSummary": "2026年度第1回・2025年度第1回／第2回の全180解答欄を収録。公式正答と全肢の独自解説付き。", "attributionTemplate": "出典：一般財団法人日本データ通信協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-06", "examCode": "kogai-06", "shortName": "公害防止管理者（大規模大気特論）", "fullName": "公害防止管理者・大規模大気特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "2026年度の大規模大気特論10問を公式正答・全肢解説・原図付きで収録。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogai-large-water", "examCode": "kogai-large-water", "shortName": "公害防止管理者・大規模水質特論", "fullName": "公害防止管理者・大規模水質特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "2026年度大規模水質特論の全10問を公式正答・独自解説付きで収録。", "attributionTemplate": "出典：産業環境管理協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "dekyo-chief-system", "examCode": "dekyo-chief-system", "shortName": "電気通信主任技術者・電気通信システム", "fullName": "電気通信主任技術者・電気通信システム", "domain": "electrical", "administrator": "一般財団法人日本データ通信協会 電気通信国家試験センター", "officialQuestionsUrl": "https://www.dekyo.or.jp/shiken/chief/exam", "officialReuseTermsUrl": "https://www.dekyo.or.jp/shiken/chief/exam", "status": "live", "reuseSummary": "2026年度第1回・2025年度第1回と第2回の電気通信システム全60問を収録。", "attributionTemplate": "出典：日本データ通信協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "eiken5", "examCode": "eiken5", "shortName": "英検5級", "fullName": "実用英語技能検定5級（リーディング）", "domain": "personal-services", "administrator": "公益財団法人日本英語検定協会", "officialQuestionsUrl": "https://www.eiken.or.jp/eiken/exam/grade_5/", "officialReuseTermsUrl": "https://www.eiken.or.jp/eiken/exam/grade_5/", "status": "live", "reuseSummary": "英検5級の2025年度第3回・2026年度第1回・第2回リーディング75問を収録。公式正答と全300肢の独自解説で、語彙・文法、会話表現、語句整序を学べます。", "attributionTemplate": "出典：公益財団法人日本英語検定協会。解説は過去問AIが独自作成。", "remainingWork": ["3回分のリスニング75問の補充"]},
  {"slug": "rodo-kijun-kantokukan", "examCode": "rodo-kijun-kantokukan", "shortName": "労働基準監督官", "fullName": "労働基準監督官採用試験（基礎能力）", "domain": "legal", "administrator": "人事院", "officialQuestionsUrl": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_23.html", "officialReuseTermsUrl": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_23.html", "status": "live", "reuseSummary": "労働基準監督官採用試験の2025・2026年度基礎能力から公開本文48問を収録。公式正答・全240肢の独自解説と原図で，文章理解，判断推理，数的推理，資料解釈，時事を学べます。", "attributionTemplate": "出典：人事院。解説は過去問AIが独自作成。", "remainingWork": ["専門試験等の補充"]},
  {"slug": "chizai1", "examCode": "chizai1", "shortName": "知的財産管理技能検定1級", "fullName": "知的財産管理技能検定1級（特許専門業務・実技）", "domain": "legal", "administrator": "一般財団法人知的財産研究教育財団 知的財産教育協会", "officialQuestionsUrl": "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon/", "officialReuseTermsUrl": "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon/", "status": "live", "reuseSummary": "知的財産管理技能検定1級・特許専門業務の第53回実技試験を全5問・15設問収録。公式正解と独自の理由解説で知財経営、国内外の特許出願、特許権の行使を学べます。", "attributionTemplate": "出典：知的財産教育協会。理由の解説は過去問AIが独自作成。", "remainingWork": []},
  {"slug": "kogai-09", "examCode": "kogai-09", "shortName": "公害防止管理者・水質有害物質特論", "fullName": "公害防止管理者・水質有害物質特論", "domain": "safety", "administrator": "一般社団法人産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "公害防止管理者の2026年度「水質有害物質特論」全15問を、公式正答・原図・全選択肢の独自解説付きで収録。", "attributionTemplate": "出典：一般社団法人産業環境管理協会。解説は過去問AIが独自作成。", "remainingWork": []},
  {"slug": "webdesign2", "examCode": "webdesign2", "shortName": "ウェブデザイン技能検定2級", "fullName": "ウェブデザイン技能検定2級（学科）", "domain": "information-technology", "administrator": "特定非営利活動法人インターネットスキル認定普及協会", "officialQuestionsUrl": "https://www.webdesign.gr.jp/measures/publication/", "officialReuseTermsUrl": "https://www.webdesign.gr.jp/measures/publication/", "status": "live", "reuseSummary": "ウェブデザイン技能検定2級の2025年度第4回・2026年度第1回・第2回の学科各40問、計120問を公式正答と全選択肢の独自解説付きで収録。", "attributionTemplate": "出典：インターネットスキル認定普及協会。解説は過去問AIが独自作成。", "remainingWork": []},
  {"slug":"glass-sekou1","examCode":"glass-sekou1","shortName":"ガラス施工技能士 1級","fullName":"技能検定 1級ガラス施工（ガラス工事作業）学科試験","domain":"construction","administrator":"中央職業能力開発協会","officialQuestionsUrl":"https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%BE%8C%E6%9C%9F&v3=B56&v4=%E3%82%AC%E3%83%A9%E3%82%B9%E6%96%BD%E5%B7%A5%EF%BC%88%E3%82%AC%E3%83%A9%E3%82%B9%E5%B7%A5%E4%BA%8B%E4%BD%9C%E6%A5%AD%EF%BC%89","officialReuseTermsUrl":"https://www.kentei.javada.or.jp/","status":"live","reuseSummary":"ガラス施工技能検定1級の2024・2025年度後期、学科100問を収録。公式正答と全肢の独自解説で、真偽法・多肢択一法を学べます。","attributionTemplate":"出典：中央職業能力開発協会。解説は過去問AIの独自作成。","remainingWork":[]},
  {"slug":"eikenp1","examCode":"eikenp1","shortName":"英検準1級","fullName":"実用英語技能検定 準1級","domain":"personal-services","administrator":"公益財団法人日本英語検定協会","officialQuestionsUrl":"https://www.eiken.or.jp/eiken/exam/grade_p1/","officialReuseTermsUrl":"https://www.eiken.or.jp/eiken/exam/grade_p1/","status":"live","reuseSummary":"英検準1級の2025年度第3回・2026年度第1回・第2回、全186問を収録。リーディング・リスニングを公式正答と独自解説で学び、英作文は公式解答例と照合できます。","attributionTemplate":"出典：公益財団法人日本英語検定協会。解説は過去問AIの独自作成。","remainingWork":[]},
  {"slug":"zensho-eco-81","examCode":"zensho-eco-81","shortName":"商業経済検定 ビジネス・マネジメント","fullName":"商業経済検定試験 ビジネス・マネジメント","domain":"finance","administrator":"公益財団法人全国商業高等学校協会","officialQuestionsUrl":"https://zensho.or.jp/examination/pastexams/economics/","officialReuseTermsUrl":"https://zensho.or.jp/examination/pastexams/economics/","status":"live","reuseSummary":"商業経済検定ビジネス・マネジメントの2024年度第39回・2025年度第40回、全100問を収録。択一84問・用語記入16問を、公式模範解答・全253肢の解説・原図とともに学べます。","attributionTemplate":"出典：公益財団法人全国商業高等学校協会。解説は過去問AIの独自作成。","remainingWork":[]},
  {"slug":"kogai-07","examCode":"kogai-07","shortName":"公害防止管理者・水質概論","fullName":"公害防止管理者等国家試験・水質概論","domain":"safety","administrator":"一般社団法人産業環境管理協会","officialQuestionsUrl":"https://www.jemai.or.jp/polconman/examination/past.html","officialReuseTermsUrl":"https://www.jemai.or.jp/polconman/examination/past.html","status":"live","reuseSummary":"公害防止管理者等国家試験の2026年度「水質概論」全10問を、公式正答・原図と各選択肢の解説付きで収録。水質汚濁防止法、環境基準、水環境を学べます。","attributionTemplate":"出典：一般社団法人産業環境管理協会。解説は過去問AIの独自作成。","remainingWork":[]},
  {"slug":"webdesign-3","examCode":"webdesign-3","shortName":"ウェブデザイン技能検定3級","fullName":"ウェブデザイン技能検定3級（学科）","domain":"information-technology","administrator":"インターネットスキル認定普及協会","officialQuestionsUrl":"https://www.webdesign.gr.jp/measures/publication/","officialReuseTermsUrl":"https://www.webdesign.gr.jp/measures/publication/","status":"live","reuseSummary":"ウェブデザイン技能検定3級の2025年度第4回・2026年度第1回と第2回の学科75問を収録。公式問題・正答と各選択肢の解説で、HTML・CSS・JavaScript・アクセシビリティを学べます。","attributionTemplate":"出典：インターネットスキル認定普及協会。解説は過去問AIの独自作成。","remainingWork":[]},
  {"slug":"kokka-ippan-dai", "examCode":"kokka-ippan-dai", "shortName":"国家一般職（大卒程度）", "fullName":"国家公務員採用一般職試験（大卒程度試験）", "domain":"legal", "administrator":"人事院", "officialQuestionsUrl":"https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_15.html", "officialReuseTermsUrl":"https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_15.html", "status":"live", "reuseSummary": "国家一般職（大卒程度）の2026年度基礎能力試験から、問11〜20・30の11問を部分収録。公式問題・正答、全55肢の独自解説と原図で判断推理・数的推理を学べます。", "attributionTemplate":"出典：人事院。解説は過去問AIの独自作成。", "remainingWork": ["基礎能力の残り19問と専門試験等の補充", "基礎能力の未収録20問と専門試験等の補充", "基礎能力の残り17問と専門試験等の補充", "2026年度基礎能力試験の残り17問と専門試験等の補充", "基礎能力の未収録17問と専門試験等の補充", "基礎能力試験の未収録17問と専門試験等の補充", "2026年度基礎能力の残り17問と専門試験等の補充"]},
  {"slug": "kokka-sogo-in", "examCode": "kokka-sogo-in", "shortName": "国家総合職（院卒者）", "fullName": "国家公務員採用総合職試験（院卒者試験）", "domain": "legal", "administrator": "人事院", "officialQuestionsUrl": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_11.html", "officialReuseTermsUrl": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_11.html", "status": "live", "reuseSummary": "国家総合職（院卒者試験）の2026年度基礎能力試験から、問11〜16・18〜20の9問を部分収録。大卒程度と共通の公式問題・正答、全45肢の独自解説と原図を収録しています。", "attributionTemplate": "出典：人事院。解説は過去問AIの独自作成。", "remainingWork": ["基礎能力の残り21問と専門試験等の補充", "基礎能力の未収録16問と専門試験等の補充", "基礎能力の残り16問と専門試験等の補充", "基礎能力試験の未収録16問と専門試験等の補充", "2026年度基礎能力の残り16問と専門試験等の補充"]},
  {"slug": "toukei1", "examCode": "toukei1", "shortName": "統計検定1級", "fullName": "統計検定1級", "domain": "information-technology", "administrator": "一般財団法人統計質保証推進協会", "officialQuestionsUrl": "https://www.toukei-kentei.jp/preparation/kakomon/", "officialReuseTermsUrl": "https://www.toukei-kentei.jp/preparation/kakomon/", "status": "live", "reuseSummary": "2025年11月・統計数理の全5原問25小問を公式略解・独自解説とともに収録。統計応用は未収録。", "attributionTemplate": "出典：一般財団法人統計質保証推進協会。解説は過去問AIの独自作成。", "remainingWork": ["統計応用の補充"]},
  {"slug": "literas", "examCode": "literas", "shortName": "リテラス論理言語力検定", "fullName": "Literas（リテラス）論理言語力検定", "domain": "personal-services", "administrator": "ベネッセコーポレーション", "officialQuestionsUrl": "https://literas.benesse.ne.jp/image.html", "officialReuseTermsUrl": "https://literas.benesse.ne.jp/image.html", "status": "live", "reuseSummary": "公式問題イメージ・社会理解力の2級2問、3級1問を全肢解説付きで部分収録。実施年度不明。", "attributionTemplate": "出典：ベネッセコーポレーション「Literas 論理言語力検定」。解説は過去問AIの独自作成。", "remainingWork": ["社会理解力の図表付き残例題と他領域の補充"]},
  {"slug": "kogai-01", "examCode": "kogai-01", "shortName": "公害防止管理者 公害総論", "fullName": "公害防止管理者 公害総論", "domain": "safety", "administrator": "産業環境管理協会", "officialQuestionsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "officialReuseTermsUrl": "https://www.jemai.or.jp/polconman/examination/past.html", "status": "live", "reuseSummary": "令和8年度の公害総論15問を公式正答・解説付きで収録。", "remainingWork": []},
  {"slug": "cfp", "examCode": "cfp", "shortName": "CFP®資格審査試験", "fullName": "CFP®資格審査試験", "domain": "finance", "administrator": "NPO法人日本FP協会", "officialQuestionsUrl": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "officialReuseTermsUrl": "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml", "status": "live", "reuseSummary": "2026年度第1・2回のリスクと保険100問と、第1回・金融資産運用設計14問を全肢解説付きで収録。", "attributionTemplate": "出典：NPO法人日本FP協会「CFP®資格審査試験」。解説は過去問AIの独自作成。", "remainingWork": ["金融資産運用設計の残り36問と他課目の補充"]},
  {"slug": "kokka-sogo-dai", "examCode": "kokka-sogo-dai", "shortName": "国家総合職（大卒程度）", "fullName": "国家公務員採用総合職試験（大卒程度・教養区分以外）", "domain": "legal", "administrator": "人事院", "officialQuestionsUrl": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_13.html", "officialReuseTermsUrl": "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_13.html", "status": "live", "reuseSummary": "2026年度基礎能力試験の問11～16・18～20の9問を全肢解説・原図付きで部分収録。", "attributionTemplate": "出典：人事院「2026年度 総合職試験（大卒程度試験）教養区分以外 基礎能力試験」。解説は過去問AIの独自作成。", "remainingWork": ["基礎能力の未収録21問と専門試験等の補充"]},
  {"slug": "boueki-c", "examCode": "boueki-c", "shortName": "貿易実務検定C級", "fullName": "貿易実務検定C級", "domain": "personal-services", "administrator": "日本貿易実務検定協会", "officialQuestionsUrl": "https://www.boujitsu.com/introduction/questionstrend/qt-c/c2", "officialReuseTermsUrl": "https://www.boujitsu.com/introduction/questionstrend/qt-c/c2", "status": "live", "reuseSummary": "公式出題例の貿易実務英語1・2から7問を全肢解説付きで部分収録。実施年度は未確認。", "attributionTemplate": "出典：日本貿易実務検定協会。解説は過去問AIの独自作成。", "remainingWork": ["貿易実務の語群選択10設問の補充"]},
  {"slug": "service2", "examCode": "service2", "shortName": "サービス接遇検定2級", "fullName": "サービス接遇検定2級", "domain": "personal-services", "administrator": "公益財団法人実務技能検定協会", "officialQuestionsUrl": "https://jitsumu-ginou-kentei.jp/SV/example", "officialReuseTermsUrl": "https://jitsumu-ginou-kentei.jp/SV/example", "status": "live", "reuseSummary": "公式公開例題の択一3問を全肢解説付きで部分収録。実施年度は未確認。", "attributionTemplate": "出典：公益財団法人実務技能検定協会。解説は過去問AIの独自作成。", "remainingWork": ["2級の記述式例題2題の補充"]},
  {

    slug: "apef3", examCode: "apef3", shortName: "仏検3級", fullName: "実用フランス語技能検定試験3級",

    domain: "personal-services", administrator: "公益財団法人フランス語教育振興協会",

    officialQuestionsUrl: "https://apefdapf.org/dapf/presentation/exemples",

    officialReuseTermsUrl: "https://apefdapf.org/dapf/presentation/exemples", status: "live",

    reuseSummary: "2015年度秋季の公式公開サンプルから、筆記問題3・4・6の12設問を全肢解説付きで部分収録。",

    attributionTemplate: "出典：公益財団法人フランス語教育振興協会『2015年度秋季 実用フランス語技能検定試験3級』公式公開サンプル。解説は過去問AIの独自作成。",

    remainingWork: ["筆記の残り29回答欄と聞き取り3大問の補充"],

  },
  {
    slug: "koku-hoan-daigakko",
    examCode: "koku-hoan-daigakko",
    shortName: "航空保安大学校学生",
    fullName: "航空保安大学校学生採用試験（基礎能力）",
    domain: "legal",
    administrator: "人事院",
    officialQuestionsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_29.html",
    officialReuseTermsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_29.html",
    status: "live",
    reuseSummary: "2025年度の航空保安大学校学生採用試験から、基礎能力試験の公式問題・正答40問を収録。",
    attributionTemplate: "出典：人事院。",
    remainingWork: [],
  },
  {
    slug: "cfp-5",
    examCode: "cfp-5",
    shortName: "CFP® タックスプランニング",
    fullName: "CFP®資格審査試験 タックスプランニング",
    domain: "finance",
    administrator: "日本FP協会",
    officialQuestionsUrl: "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml",
    officialReuseTermsUrl: "https://www.jafp.or.jp/aim/cfp/cfp_exam/mohan.shtml",
    status: "live",
    reuseSummary: "2026年度第2回のタックスプランニング50問を収録。",
    attributionTemplate: "出典：日本FP協会。",
    remainingWork: [],
  },
  {
    slug: "eiken1",
    examCode: "eiken1",
    shortName: "英検1級",
    fullName: "実用英語技能検定 1級",
    domain: "personal-services",
    administrator: "日本英語検定協会",
    officialQuestionsUrl: "https://www.eiken.or.jp/eiken/exam/grade_1/",
    officialReuseTermsUrl: "https://www.eiken.or.jp/eiken/exam/grade_1/",
    status: "live",
    reuseSummary: "2026年度第2回のリーディング35問とライティング2題を収録。",
    attributionTemplate: "出典：公益財団法人日本英語検定協会「実用英語技能検定 1級一次試験」。",
    remainingWork: [],
  },
  {

    slug: "ishi", examCode: "ishi", shortName: "医師国家試験", fullName: "医師国家試験",

    domain: "welfare", administrator: "厚生労働省",

    officialQuestionsUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/tp260424-01.html",

    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html", status: "live",

    reuseSummary: "第120回（2026年）問題Aの問1〜15を、公式問題・正答と全肢の独自解説付きで部分収録。",

    attributionTemplate: "出典：厚生労働省『第120回医師国家試験』問題・正答。解説は過去問AIの独自作成。",

    remainingWork: ["問題Aの問16〜75と問題B〜Fの補充", "問題A・B・D・E・Fの補充", "問題A・B・C・E・Fの補充", "他の回・区分の補充"],

  },
  {
    slug: "kanken-j1",
    examCode: "kanken-j1",
    shortName: "漢検 準1級",
    fullName: "日本漢字能力検定 準1級",
    domain: "personal-services",
    administrator: "日本漢字能力検定協会",
    officialQuestionsUrl: "https://www.kanken.or.jp/kanken/grades/sample/",
    officialReuseTermsUrl: "https://www.kanken.or.jp/kanken/grades/sample/",
    status: "live",
    reuseSummary: "2026年度第1回の準1級から、読み、書き取り、四字熟語などの公式問題と標準解答130問を収録。",
    attributionTemplate: "出典：日本漢字能力検定協会。",
    remainingWork: [],
  },
  {
    slug: "zensho-bc", examCode: "zensho-bc", shortName: "全商ビジネスコミュニケーション検定", fullName: "全商ビジネスコミュニケーション検定",
    domain: "personal-services", administrator: "全国商業高等学校協会",
    officialQuestionsUrl: "https://zensho.or.jp/examination/pastexams/bc/", officialReuseTermsUrl: "https://zensho.or.jp/examination/pastexams/bc/", status: "live",
    reuseSummary: "第14回の公式問題と模範解答50問を収録。",
    remainingWork: [],
  },
  {"slug": "kanken-4", "examCode": "kanken-4", "shortName": "漢検4級", "fullName": "日本漢字能力検定4級", "domain": "welfare", "administrator": "公益財団法人日本漢字能力検定協会", "officialQuestionsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "officialReuseTermsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "status": "live", "reuseSummary": "2026年度第1回4級（A）を全120問収録。", "remainingWork": []},
  {"slug": "kounin", "examCode": "kounin", "shortName": "高等学校卒業程度認定試験", "fullName": "高等学校卒業程度認定試験", "domain": "welfare", "administrator": "文部科学省", "officialQuestionsUrl": "https://www.mext.go.jp/a_menu/koutou/shiken/kakomon/1411255_00018.htm", "officialReuseTermsUrl": "https://www.mext.go.jp/a_menu/koutou/shiken/kakomon/1411255_00018.htm", "status": "live", "reuseSummary": "2025年度の国語（第1回・第2回）と、第1回の化学基礎・歴史を収録。", attributionTemplate: "出典：文部科学省。", "remainingWork": []},
  {"slug": "kanken-10", "examCode": "kanken-10", "shortName": "漢検10級", "fullName": "漢検10級", "domain": "personal-services", "administrator": "日本漢字能力検定協会", "officialQuestionsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "officialReuseTermsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "status": "live", "reuseSummary": "公式の問題と正答を収録。", "remainingWork": []},
  {"slug": "kanken-9", "examCode": "kanken-9", "shortName": "漢検9級", "fullName": "漢検9級", "domain": "personal-services", "administrator": "日本漢字能力検定協会", "officialQuestionsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "officialReuseTermsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "status": "live", "reuseSummary": "公式の問題と正答を収録。", "remainingWork": []},
  {
    slug: "eju",
    examCode: "eju",
    shortName: "日本留学試験",
    fullName: "日本留学試験",
    domain: "personal-services",
    administrator: "日本学生支援機構",
    officialQuestionsUrl: "https://www.jasso.go.jp/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2021_1.html",
    officialReuseTermsUrl: "https://www.jasso.go.jp/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2021_1.html",
    status: "live",
    reuseSummary: "2021年度第1回の数学と理科を収録。数学はコース1・2、理科は物理・化学・生物を科目別に演習できます。",
    remainingWork: [],
  },
  {"slug": "zensho-english", "examCode": "zensho-english", "shortName": "全商英語検定", "fullName": "全商英語検定", "domain": "personal-services", "administrator": "全国商業高等学校協会", "officialQuestionsUrl": "https://zensho.or.jp/examination/pastexams/english/", "officialReuseTermsUrl": "https://zensho.or.jp/examination/pastexams/english/", "status": "live", "reuseSummary": "第75回の1級一次試験12大問を収録。", "remainingWork": []},
  {"slug": "kanken-j2", "examCode": "kanken-j2", "shortName": "日本漢字能力検定 準2級", "fullName": "日本漢字能力検定 準2級", "domain": "personal-services", "administrator": "日本漢字能力検定協会", "officialQuestionsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "officialReuseTermsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "status": "live", "reuseSummary": "2026年度第1回の準2級120問を収録。", "remainingWork": []},
  {"slug": "zensho-bido", "examCode": "zensho-bido", "shortName": "全商ビジネス文書実務検定", "fullName": "全商ビジネス文書実務検定", "domain": "accounting", "administrator": "公益財団法人全国商業高等学校協会", "officialQuestionsUrl": "https://zensho.or.jp/examination/pastexams/bido/", "officialReuseTermsUrl": "https://zensho.or.jp/examination/pastexams/bido/", "status": "live", "reuseSummary": "第76回1級と第74回3級の筆記問題を収録。", "remainingWork": []},
  {"slug": "kanken-6", "examCode": "kanken-6", "shortName": "日本漢字能力検定6級", "fullName": "日本漢字能力検定6級", "domain": "personal-services", "administrator": "日本漢字能力検定協会", "officialQuestionsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "officialReuseTermsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "status": "live", "reuseSummary": "公式問題・正答と学習用の解説を収録。", "remainingWork": []},
  {"slug": "kanken-7", "examCode": "kanken-7", "shortName": "日本漢字能力検定7級", "fullName": "日本漢字能力検定7級", "domain": "personal-services", "administrator": "日本漢字能力検定協会", "officialQuestionsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "officialReuseTermsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "status": "live", "reuseSummary": "2026年度第1回の7級を収録。", "remainingWork": []},
  {
    slug: "kanken-8",
    examCode: "kanken-8",
    shortName: "日本漢字能力検定8級",
    fullName: "日本漢字能力検定8級",
    domain: "personal-services",
    administrator: "日本漢字能力検定協会",
    officialQuestionsUrl: "https://www.kanken.or.jp/kanken/grades/sample/",
    officialReuseTermsUrl: "https://www.kanken.or.jp/kanken/grades/sample/",
    status: "live",
    reuseSummary: "2026年度第1回8級の100問を公式標準解答付きで収録。",
    remainingWork: [],
  },
  {
    slug: "zensho-info", examCode: "zensho-info", shortName: "全商情報処理検定", fullName: "全商情報処理検定",
    domain: "information-technology", administrator: "全国商業高等学校協会",
    officialQuestionsUrl: "https://zensho.or.jp/examination/pastexams/information/",
    officialReuseTermsUrl: "https://zensho.or.jp/examination/pastexams/information/", status: "live",
    reuseSummary: "第75回の1級ビジネス情報7大問を収録。",
    remainingWork: [],
  },
  {"slug": "kanken-2", "examCode": "kanken-2", "shortName": "日本漢字能力検定 2級", "fullName": "日本漢字能力検定 2級", "domain": "personal-services", "administrator": "日本漢字能力検定協会", "officialQuestionsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "officialReuseTermsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "status": "live", "reuseSummary": "2026年度第1回の2級120問を、125欄の標準解答付きで収録。", "remainingWork": []},
  {"slug": "kanken-5", "examCode": "kanken-5", "shortName": "日本漢字能力検定 5級", "fullName": "日本漢字能力検定 5級", "domain": "personal-services", "administrator": "日本漢字能力検定協会", "officialQuestionsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "officialReuseTermsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "status": "live", "reuseSummary": "2026年度第1回5級の公式問題120問を収録。", "remainingWork": []},
  {"slug": "zensho-boki", "examCode": "zensho-boki", "shortName": "全商簿記実務検定", "fullName": "全商簿記実務検定", "domain": "accounting", "administrator": "全国商業高等学校協会", "officialQuestionsUrl": "https://zensho.or.jp/examination/pastexams/bookkeeping/", "officialReuseTermsUrl": "https://zensho.or.jp/examination/pastexams/bookkeeping/", "status": "live", "reuseSummary": "1級原価計算と3級商業簿記の公式問題を収録。", "remainingWork": []},
  {"slug": "kounin-geography", "examCode": "kounin-geography", "shortName": "高卒認定 地理", "fullName": "高等学校卒業程度認定試験 地理", "domain": "personal-services", "administrator": "文部科学省", "officialQuestionsUrl": "https://www.mext.go.jp/a_menu/koutou/shiken/kakomon/1411255_00019.htm", "officialReuseTermsUrl": "https://www.mext.go.jp/a_menu/koutou/shiken/kakomon/1411255_00019.htm", "status": "live", "reuseSummary": "令和7年度第2回の地理20問と公式正答を収録。", "remainingWork": []},
  {"slug": "kanken-1", "examCode": "kanken-1", "shortName": "漢検 1級", "fullName": "日本漢字能力検定 1級", "domain": "personal-services", "administrator": "日本漢字能力検定協会", "officialQuestionsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "officialReuseTermsUrl": "https://www.kanken.or.jp/kanken/grades/sample/", "status": "live", "reuseSummary": "2026年度第1回の1級130解答欄を公式標準解答とともに収録。", "remainingWork": []},
  {"slug": "kounin-civics", "examCode": "kounin-civics", "shortName": "高卒認定 公共", "fullName": "高等学校卒業程度認定試験 公共", "domain": "personal-services", "administrator": "文部科学省", "officialQuestionsUrl": "https://www.mext.go.jp/a_menu/koutou/shiken/kakomon/1411255_00019.htm", "officialReuseTermsUrl": "https://www.mext.go.jp/a_menu/koutou/shiken/kakomon/1411255_00019.htm", "status": "live", "reuseSummary": "令和7年度第2回の公共24問と公式正答を収録。", "remainingWork": []},
  {"slug": "kounin-science", "examCode": "kounin-science", "shortName": "高卒認定 科学と人間生活", "fullName": "高等学校卒業程度認定試験 科学と人間生活", "domain": "personal-services", "administrator": "文部科学省", "officialQuestionsUrl": "https://www.mext.go.jp/a_menu/koutou/shiken/kakomon/1411255_00018.htm", "officialReuseTermsUrl": "https://www.mext.go.jp/a_menu/koutou/shiken/kakomon/1411255_00018.htm", "status": "live", "reuseSummary": "令和7年度第1回の科学と人間生活を、選択問題の両方を含む40問で収録。", "remainingWork": []},
  {"slug": "kounin-physics", "examCode": "kounin-physics", "shortName": "高卒認定 物理基礎", "fullName": "高等学校卒業程度認定試験 物理基礎", "domain": "personal-services", "administrator": "文部科学省", "officialQuestionsUrl": "https://www.mext.go.jp/a_menu/koutou/shiken/kakomon/1411255_00018.htm", "officialReuseTermsUrl": "https://www.mext.go.jp/a_menu/koutou/shiken/kakomon/1411255_00018.htm", "status": "live", "reuseSummary": "令和7年度第1回の物理基礎20問と公式正答を収録。", "remainingWork": []},
  {
    slug: "zensho-boki-2",
    examCode: "zensho-boki-2",
    shortName: "全商簿記2級",
    fullName: "全商簿記実務検定2級",
    domain: "accounting",
    administrator: "全国商業高等学校協会",
    officialQuestionsUrl: "https://zensho.or.jp/examination/pastexams/bookkeeping/",
    officialReuseTermsUrl: "https://zensho.or.jp/examination/pastexams/bookkeeping/",
    status: "live",
    reuseSummary: "全商簿記実務検定の第102回2級の公式問題・解答全6大問を収録。",
    attributionTemplate: "出典：全国商業高等学校協会。",
    remainingWork: [],
  },
  {"slug": "zensho-calc", "examCode": "zensho-calc", "shortName": "全商ビジネス計算実務検定", "fullName": "全商ビジネス計算実務検定", "domain": "accounting", "administrator": "全国商業高等学校協会", "officialQuestionsUrl": "https://zensho.or.jp/examination/pastexams/calculating/", "officialReuseTermsUrl": "https://zensho.or.jp/examination/pastexams/calculating/", "status": "live", "reuseSummary": "第151回の3級普通計算を収録。", attributionTemplate: "出典：全国商業高等学校協会。", "remainingWork": []},
  {"slug": "suken", "examCode": "suken", "shortName": "実用数学技能検定", "fullName": "実用数学技能検定", "domain": "welfare", "administrator": "日本数学検定協会", "officialQuestionsUrl": "https://www.su-gaku.net/suken/support/past_questions/", "officialReuseTermsUrl": "https://www.su-gaku.net/suken/support/past_questions/", "status": "live", "reuseSummary": "公式公表問題を収録。", attributionTemplate: "出典：日本数学検定協会。", "remainingWork": []},
  {"slug": "gijutsushi1-kiso", "examCode": "gijutsushi1-kiso", "shortName": "技術士第一次・基礎科目", "fullName": "技術士第一次試験・基礎科目", "domain": "construction", "administrator": "公益社団法人日本技術士会", "officialQuestionsUrl": "https://www.engineer.or.jp/c_categories/index02021.html", "officialReuseTermsUrl": "https://www.engineer.or.jp/c_categories/index02021.html", "status": "live", "reuseSummary": "令和5年度の基礎科目を全5群30問収録。", "remainingWork": []},
  {"slug": "jlpt", "examCode": "jlpt", "shortName": "日本語能力試験（JLPT）", "fullName": "日本語能力試験（JLPT）", "domain": "welfare", "administrator": "国際交流基金・日本国際教育支援協会", "officialQuestionsUrl": "https://www.jlpt.jp/e/samples/sampleindex.html", "officialReuseTermsUrl": "https://www.jlpt.jp/e/samples/sampleindex.html", "status": "live", "reuseSummary": "2018年発行の公式問題集から言語知識・読解を収録。", attributionTemplate: "出典：国際交流基金・日本国際教育支援協会。", "remainingWork": []},
  {
    slug: "career-gino-2", examCode: "career-gino-2", shortName: "キャリアコンサルティング技能検定2級", fullName: "キャリアコンサルティング技能検定2級",
    domain: "welfare", administrator: "キャリアコンサルティング協議会",
    officialQuestionsUrl: "https://www.career-kentei.org/about/learninfo/",
    officialReuseTermsUrl: "https://www.career-kentei.org/about/learninfo/", status: "live",
    reuseSummary: "2025年度前期（第34回）の2級学科試験50問を収録。",
    remainingWork: [],
  },
  {"slug": "gijutsushi1-kensetsu", "examCode": "gijutsushi1-kensetsu", "shortName": "技術士第一次試験（建設部門）", "fullName": "技術士第一次試験（建設部門）", "domain": "construction", "administrator": "日本技術士会", "officialQuestionsUrl": "https://www.engineer.or.jp/c_categories/index02021.html", "officialReuseTermsUrl": "https://www.engineer.or.jp/c_categories/index02021.html", "status": "live", "reuseSummary": "2023年度の建設部門・専門科目を収録。", "remainingWork": []},
  {"slug": "building-cleaning-1", "examCode": "building-cleaning-1", "shortName": "ビルクリーニング技能検定1級", "fullName": "ビルクリーニング技能検定1級", "domain": "personal-services", "administrator": "全国ビルメンテナンス協会", "officialQuestionsUrl": "https://www.j-bma.or.jp/qualification-training/building-cleaning", "officialReuseTermsUrl": "https://www.j-bma.or.jp/qualification-training/building-cleaning", "status": "live", "reuseSummary": "2024・2025年度の学科試験を計100問収録。", "remainingWork": []},
  {"slug": "gijutsushi1-tekisei", "examCode": "gijutsushi1-tekisei", "shortName": "技術士第一次試験（適性科目）", "fullName": "技術士第一次試験（適性科目）", "domain": "construction", "administrator": "日本技術士会", "officialQuestionsUrl": "https://www.engineer.or.jp/c_categories/index02021.html", "officialReuseTermsUrl": "https://www.engineer.or.jp/c_categories/index02021.html", "status": "live", "reuseSummary": "2021年度の適性科目を収録。", "remainingWork": []},
  {"slug": "juishi", "examCode": "juishi", "shortName": "獣医師国家試験", "fullName": "獣医師国家試験", "domain": "welfare", "administrator": "農林水産省", "officialQuestionsUrl": "https://www.maff.go.jp/j/syouan/tikusui/zyui/shiken/shiken.html", "officialReuseTermsUrl": "https://www.maff.go.jp/j/use/", "status": "live", "reuseSummary": "第77回の必須問題と学説試験 問題A・Bを収録。", "remainingWork": []},
  {
    slug: "dekyo-charge-3",
    examCode: "dekyo-charge-3",
    shortName: "工事担任者 第一級デジタル通信",
    fullName: "電気通信設備工事担任者試験 第一級デジタル通信",
    domain: "electrical",
    administrator: "一般財団法人日本データ通信協会",
    officialQuestionsUrl: "https://www.dekyo.or.jp/shiken/charge/exam",
    officialReuseTermsUrl: "https://www.dekyo.or.jp/shiken/charge/exam",
    status: "live",
    reuseSummary: "令和8年度第1回の全3科目・72問を収録。",
    attributionTemplate: "出典：日本データ通信協会 工事担任者試験 第一級デジタル通信。",
    remainingWork: [],
  },
  {
    slug: "zensho-eco-78",
    examCode: "zensho-eco-78",
    shortName: "全商商業経済検定 マーケティング",
    fullName: "全商商業経済検定 マーケティング",
    domain: "accounting",
    administrator: "全国商業高等学校協会",
    officialQuestionsUrl: "https://zensho.or.jp/examination/pastexams/economics/",
    officialReuseTermsUrl: "https://zensho.or.jp/examination/pastexams/economics/",
    status: "live",
    reuseSummary: "第38回のマーケティング50問を、公式模範解答と解説付きで収録。",
    remainingWork: [],
  },
  {
    slug: "dekyo-charge-5",
    examCode: "dekyo-charge-5",
    shortName: "工事担任者 総合通信",
    fullName: "工事担任者 総合通信",
    domain: "electrical",
    administrator: "一般財団法人日本データ通信協会 電気通信国家試験センター",
    officialQuestionsUrl: "https://www.dekyo.or.jp/shiken/charge/exam",
    officialReuseTermsUrl: "https://www.dekyo.or.jp/shiken/charge/exam",
    status: "live",
    reuseSummary: "2025年度第2回の基礎22問、技術及び理論50問、法規25問を公式正答と原本図版付きで収録。",
    remainingWork: [],
  },
  {"slug": "eikenp2plus", "examCode": "eikenp2plus", "shortName": "実用英語技能検定 準2級プラス", "fullName": "実用英語技能検定 準2級プラス", "domain": "personal-services", "administrator": "公益財団法人 日本英語検定協会", "officialQuestionsUrl": "https://www.eiken.or.jp/eiken/exam/grade_p2plus/index.html", "officialReuseTermsUrl": "https://www.eiken.or.jp/eiken/exam/grade_p2plus/index.html", "status": "live", "reuseSummary": "2026年度第1回の一次筆記を収録。", attributionTemplate: "出典：公益財団法人 日本英語検定協会。", "remainingWork": []},
  {
    slug: "kokuzei-senmonkan",
    examCode: "kokuzei-senmonkan",
    shortName: "国税専門官",
    fullName: "国税専門官採用試験",
    domain: "legal",
    administrator: "人事院",
    officialQuestionsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_21.html",
    officialReuseTermsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_21.html",
    status: "live",
    reuseSummary: "令和8年度の国税専門Aから、問題文と正答を確認できる47問を収録。",
    attributionTemplate: "出典：人事院。",
    remainingWork: [],
  },
  {"slug": "sasshi1", "examCode": "sasshi1", "shortName": "サッシ施工技能士 1級", "fullName": "技能検定 1級サッシ施工（ビル用サッシ施工作業）学科試験", "domain": "safety", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "sasshi2", "examCode": "sasshi2", "shortName": "サッシ施工技能士 2級", "fullName": "技能検定 2級サッシ施工（ビル用サッシ施工作業）学科試験", "domain": "safety", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kyoka-plastic2", "examCode": "kyoka-plastic2", "shortName": "強化プラスチック成形技能士 2級", "fullName": "技能検定 2級強化プラスチック成形（手積み積層成形作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "chikuro2", "examCode": "chikuro2", "shortName": "築炉技能士 2級", "fullName": "技能検定 2級築炉（築炉作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "chikuro1", "examCode": "chikuro1", "shortName": "築炉技能士 1級", "fullName": "技能検定 1級築炉（築炉作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kagaku-bunseki1", "examCode": "kagaku-bunseki1", "shortName": "化学分析技能士 1級", "fullName": "技能検定 1級化学分析（化学分析作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kagaku-bunseki3", "examCode": "kagaku-bunseki3", "shortName": "化学分析技能士 3級", "fullName": "技能検定 3級化学分析（化学分析作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "futsu-senban3", "examCode": "futsu-senban3", "shortName": "機械加工技能士 3級（普通旋盤作業）", "fullName": "技能検定 3級機械加工（普通旋盤作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期・後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "shashutsu3", "examCode": "shashutsu3", "shortName": "プラスチック成形技能士 3級（射出成形作業）", "fullName": "技能検定 3級プラスチック成形（射出成形作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-kensa3", "examCode": "kikai-kensa3", "shortName": "機械検査技能士 3級", "fullName": "技能検定 3級機械検査（機械検査作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-kensa1", "examCode": "kikai-kensa1", "shortName": "機械検査技能士 1級", "fullName": "技能検定 1級機械検査（機械検査作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "tekkin-zumen1", "examCode": "tekkin-zumen1", "shortName": "鉄筋施工技能士 1級（鉄筋施工図作成作業）", "fullName": "技能検定 1級鉄筋施工（鉄筋施工図作成作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "katawaku1", "examCode": "katawaku1", "shortName": "型枠施工技能士 1級", "fullName": "技能検定 1級型枠施工（型枠工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "tekkin-zumen2", "examCode": "tekkin-zumen2", "shortName": "鉄筋施工技能士 2級（鉄筋施工図作成作業）", "fullName": "技能検定 2級鉄筋施工（鉄筋施工図作成作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "katawaku2", "examCode": "katawaku2", "shortName": "型枠施工技能士 2級", "fullName": "技能検定 2級型枠施工（型枠工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogyo-hoso1", "examCode": "kogyo-hoso1", "shortName": "工業包装技能士 1級", "fullName": "技能検定 1級工業包装（工業包装作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-kensa2", "examCode": "kikai-kensa2", "shortName": "機械検査技能士 2級", "fullName": "技能検定 2級機械検査（機械検査作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogyo-hoso2", "examCode": "kogyo-hoso2", "shortName": "工業包装技能士 2級", "fullName": "技能検定 2級工業包装（工業包装作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "haiden-seigyo1", "examCode": "haiden-seigyo1", "shortName": "電気機器組立て技能士 1級", "fullName": "技能検定 1級電気機器組立て（配電盤・制御盤組立て作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "sequence1", "examCode": "sequence1", "shortName": "シーケンス制御技能士 1級", "fullName": "技能検定 1級シーケンス制御（シーケンス制御作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kuukiatsu-kumitate1", "examCode": "kuukiatsu-kumitate1", "shortName": "空気圧装置組立て技能士 1級", "fullName": "技能検定 1級空気圧装置組立て（空気圧装置組立て作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kuukiatsu-kumitate2", "examCode": "kuukiatsu-kumitate2", "shortName": "空気圧装置組立て技能士 2級", "fullName": "技能検定 2級空気圧装置組立て（空気圧装置組立て作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "chuzo2", "examCode": "chuzo2", "shortName": "鋳造技能士 2級（鋳鉄鋳物鋳造作業）", "fullName": "技能検定 2級鋳造（鋳鉄鋳物鋳造作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "reito-seko2", "examCode": "reito-seko2", "shortName": "冷凍空気調和機器施工技能士 2級（冷凍空気調和機器施工作業）", "fullName": "技能検定 2級冷凍空気調和機器施工（冷凍空気調和機器施工作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "chuzo1", "examCode": "chuzo1", "shortName": "鋳造技能士 1級（鋳鉄鋳物鋳造作業）", "fullName": "技能検定 1級鋳造（鋳鉄鋳物鋳造作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "reito-seko1", "examCode": "reito-seko1", "shortName": "冷凍空気調和機器施工技能士 1級（冷凍空気調和機器施工作業）", "fullName": "技能検定 1級冷凍空気調和機器施工（冷凍空気調和機器施工作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kaiten-denki2", "examCode": "kaiten-denki2", "shortName": "電気機器組立て技能士 2級（回転電機巻線製作作業）", "fullName": "技能検定 2級電気機器組立て（回転電機巻線製作作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kaiten-denki1", "examCode": "kaiten-denki1", "shortName": "電気機器組立て技能士 1級（回転電機巻線製作作業）", "fullName": "技能検定 1級電気機器組立て（回転電機巻線製作作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "sequence3", "examCode": "sequence3", "shortName": "シーケンス制御技能士 3級", "fullName": "技能検定 3級シーケンス制御（シーケンス制御作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "chuzo3", "examCode": "chuzo3", "shortName": "鋳造技能士 3級（鋳鉄鋳物鋳造作業）", "fullName": "技能検定 3級鋳造（鋳鉄鋳物鋳造作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "reito-seko3", "examCode": "reito-seko3", "shortName": "冷凍空気調和機器施工技能士 3級（冷凍空気調和機器施工作業）", "fullName": "技能検定 3級冷凍空気調和機器施工（冷凍空気調和機器施工作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "sequence2", "examCode": "sequence2", "shortName": "シーケンス制御技能士 2級", "fullName": "技能検定 2級シーケンス制御（シーケンス制御作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "haiden-seigyo3", "examCode": "haiden-seigyo3", "shortName": "電気機器組立て技能士 3級", "fullName": "技能検定 3級電気機器組立て（配電盤・制御盤組立て作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kenchiku-bankin2", "examCode": "kenchiku-bankin2", "shortName": "建築板金技能士 2級", "fullName": "技能検定 2級建築板金（内外装板金作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kensetsu-kikai-seibi1", "examCode": "kensetsu-kikai-seibi1", "shortName": "建設機械整備技能士 1級", "fullName": "技能検定 1級建設機械整備（建設機械整備作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "sakan3", "examCode": "sakan3", "shortName": "左官技能士 3級", "fullName": "技能検定 3級左官（左官作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "zoen-gino3", "examCode": "zoen-gino3", "shortName": "造園技能士 3級", "fullName": "技能検定 3級造園（造園工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "sakan2", "examCode": "sakan2", "shortName": "左官技能士 2級", "fullName": "技能検定 2級左官（左官作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "sakan1", "examCode": "sakan1", "shortName": "左官技能士 1級", "fullName": "技能検定 1級左官（左官作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "zoen-gino1", "examCode": "zoen-gino1", "shortName": "造園技能士 1級", "fullName": "技能検定 1級造園（造園工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "zoen-gino2", "examCode": "zoen-gino2", "shortName": "造園技能士 2級", "fullName": "技能検定 2級造園（造園工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "bousui-urethane2", "examCode": "bousui-urethane2", "shortName": "防水施工技能士 2級（ウレタン）", "fullName": "技能検定 2級防水施工（ウレタンゴム系塗膜防水工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "bousui-frp2", "examCode": "bousui-frp2", "shortName": "防水施工技能士 2級（FRP防水工事作業）", "fullName": "技能検定 2級防水施工（FRP防水工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "pan-seizo1", "examCode": "pan-seizo1", "shortName": "パン製造技能士 1級", "fullName": "技能検定 1級パン製造（パン製造作業）学科試験", "domain": "personal-services", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "pan-seizo2", "examCode": "pan-seizo2", "shortName": "パン製造技能士 2級", "fullName": "技能検定 2級パン製造（パン製造作業）学科試験", "domain": "personal-services", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-shiage1", "examCode": "kikai-shiage1", "shortName": "仕上げ技能士 1級（機械組立仕上げ作業）", "fullName": "技能検定 1級仕上げ（機械組立仕上げ作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "plant-haikan-seizu1", "examCode": "plant-haikan-seizu1", "shortName": "機械・プラント製図技能士 1級（プラント配管製図作業）", "fullName": "技能検定 1級機械・プラント製図（プラント配管製図作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-seizu3", "examCode": "kikai-seizu3", "shortName": "機械・プラント製図技能士 3級（機械製図手書き作業）", "fullName": "技能検定 3級機械・プラント製図（機械製図手書き作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-seizu-cad3", "examCode": "kikai-seizu-cad3", "shortName": "機械・プラント製図技能士 3級（機械製図CAD作業）", "fullName": "技能検定 3級機械・プラント製図（機械製図CAD作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-seizu2", "examCode": "kikai-seizu2", "shortName": "機械・プラント製図技能士 2級（機械製図手書き作業）", "fullName": "技能検定 2級機械・プラント製図（機械製図手書き作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-seizu-cad2", "examCode": "kikai-seizu-cad2", "shortName": "機械・プラント製図技能士 2級（機械製図CAD作業）", "fullName": "技能検定 2級機械・プラント製図（機械製図CAD作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-shiage3", "examCode": "kikai-shiage3", "shortName": "仕上げ技能士 3級（機械組立仕上げ作業）", "fullName": "技能検定 3級仕上げ（機械組立仕上げ作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-shiage2", "examCode": "kikai-shiage2", "shortName": "仕上げ技能士 2級（機械組立仕上げ作業）", "fullName": "技能検定 2級仕上げ（機械組立仕上げ作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "naiso-carpet2", "examCode": "naiso-carpet2", "shortName": "内装仕上げ施工技能士 2級（カーペット系床）", "fullName": "技能検定 2級内装仕上げ施工（カーペット系床仕上げ工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "naiso-plastic1", "examCode": "naiso-plastic1", "shortName": "内装仕上げ施工技能士 1級（プラスチック系床）", "fullName": "技能検定 1級内装仕上げ施工（プラスチック系床仕上げ工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "naiso-plastic2", "examCode": "naiso-plastic2", "shortName": "内装仕上げ施工技能士 2級（プラスチック系床）", "fullName": "技能検定 2級内装仕上げ施工（プラスチック系床仕上げ工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "naiso-kosei2", "examCode": "naiso-kosei2", "shortName": "内装仕上げ施工技能士 2級（鋼製下地）", "fullName": "技能検定 2級内装仕上げ施工（鋼製下地工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kinzoku-press1", "examCode": "kinzoku-press1", "shortName": "金属プレス加工技能士 1級", "fullName": "技能検定 1級金属プレス加工（金属プレス作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "plant-haikan2", "examCode": "plant-haikan2", "shortName": "配管技能士 2級（プラント配管作業）", "fullName": "技能検定 2級配管（プラント配管作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "haikan-kenchiku3", "examCode": "haikan-kenchiku3", "shortName": "配管技能士 3級（建築配管作業）", "fullName": "技能検定 3級配管（建築配管作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "plant-haikan1", "examCode": "plant-haikan1", "shortName": "配管技能士 1級（プラント配管作業）", "fullName": "技能検定 1級配管（プラント配管作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kinzoku-press2", "examCode": "kinzoku-press2", "shortName": "金属プレス加工技能士 2級", "fullName": "技能検定 2級金属プレス加工（金属プレス作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "tekkin-zumen3", "examCode": "tekkin-zumen3", "shortName": "鉄筋施工技能士 3級（鉄筋施工図作成作業）", "fullName": "技能検定 3級鉄筋施工（鉄筋施工図作成作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "katawaku3", "examCode": "katawaku3", "shortName": "型枠施工技能士 3級", "fullName": "技能検定 3級型枠施工（型枠工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kyoka-plastic1", "examCode": "kyoka-plastic1", "shortName": "強化プラスチック成形技能士 1級", "fullName": "技能検定 1級強化プラスチック成形（手積み積層成形作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "engei-soshoku2", "examCode": "engei-soshoku2", "shortName": "園芸装飾技能士 2級", "fullName": "技能検定 2級園芸装飾（室内園芸装飾作業）学科試験", "domain": "welfare", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "futsu-senban1", "examCode": "futsu-senban1", "shortName": "機械加工技能士 1級（普通旋盤作業）", "fullName": "技能検定 1級機械加工（普通旋盤作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "shashutsu1", "examCode": "shashutsu1", "shortName": "プラスチック成形技能士 1級（射出成形作業）", "fullName": "技能検定 1級プラスチック成形（射出成形作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "tekkin3", "examCode": "tekkin3", "shortName": "鉄筋施工技能士 3級（鉄筋組立て作業）", "fullName": "技能検定 3級鉄筋施工（鉄筋組立て作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "tekkin2", "examCode": "tekkin2", "shortName": "鉄筋施工技能士 2級（鉄筋組立て作業）", "fullName": "技能検定 2級鉄筋施工（鉄筋組立て作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-seizu-tegaki1", "examCode": "kikai-seizu-tegaki1", "shortName": "機械・プラント製図技能士 1級（機械製図手書き作業）", "fullName": "技能検定 1級機械・プラント製図（機械製図手書き作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "henatsuki-kumitate2", "examCode": "henatsuki-kumitate2", "shortName": "電気機器組立て技能士 2級（変圧器組立て作業）", "fullName": "技能検定 2級電気機器組立て（変圧器組立て作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "henatsuki-kumitate1", "examCode": "henatsuki-kumitate1", "shortName": "電気機器組立て技能士 1級（変圧器組立て作業）", "fullName": "技能検定 1級電気機器組立て（変圧器組立て作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-seizu-cad1", "examCode": "kikai-seizu-cad1", "shortName": "機械・プラント製図技能士 1級（機械製図CAD作業）", "fullName": "技能検定 1級機械・プラント製図（機械製図CAD作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "plant-haikan-seizu2", "examCode": "plant-haikan-seizu2", "shortName": "機械・プラント製図技能士 2級（プラント配管製図作業）", "fullName": "技能検定 2級機械・プラント製図（プラント配管製図作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "netsuzetsuen2", "examCode": "netsuzetsuen2", "shortName": "熱絶縁施工技能士 2級（保温保冷工事作業）", "fullName": "技能検定 2級熱絶縁施工（保温保冷工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "hiseshoku-jokyo1", "examCode": "hiseshoku-jokyo1", "shortName": "非接触除去加工技能士 1級（数値制御形彫り放電加工作業）", "fullName": "技能検定 1級非接触除去加工（数値制御形彫り放電加工作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "tategu1", "examCode": "tategu1", "shortName": "建具製作技能士 1級（木製建具手加工作業）", "fullName": "技能検定 1級建具製作（木製建具手加工作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "shohin-soshoku1", "examCode": "shohin-soshoku1", "shortName": "商品装飾展示技能士 1級", "fullName": "技能検定 1級商品装飾展示（商品装飾展示作業）学科試験", "domain": "welfare", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kogaku-glass1", "examCode": "kogaku-glass1", "shortName": "光学機器製造技能士 1級（光学ガラス研磨作業）", "fullName": "技能検定 1級光学機器製造（光学ガラス研磨作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "sangyo-sharyo1", "examCode": "sangyo-sharyo1", "shortName": "産業車両整備技能士 1級", "fullName": "技能検定 1級産業車両整備（産業車両整備作業）学科試験", "domain": "automotive", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "yogashi1", "examCode": "yogashi1", "shortName": "菓子製造技能士 1級（洋菓子製造作業）", "fullName": "技能検定 1級菓子製造（洋菓子製造作業）学科試験", "domain": "welfare", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "block-kenchiku3", "examCode": "block-kenchiku3", "shortName": "ブロック建築技能士 3級（コンクリートブロック工事作業）", "fullName": "技能検定 3級ブロック建築（コンクリートブロック工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "block-kenchiku1", "examCode": "block-kenchiku1", "shortName": "ブロック建築技能士 1級（コンクリートブロック工事作業）", "fullName": "技能検定 1級ブロック建築（コンクリートブロック工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "shuzo1", "examCode": "shuzo1", "shortName": "酒造技能士 1級（清酒製造作業）", "fullName": "技能検定 1級酒造（清酒製造作業）学科試験", "domain": "personal-services", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "fraise1", "examCode": "fraise1", "shortName": "機械加工技能士 1級（フライス盤作業）", "fullName": "技能検定 1級機械加工（フライス盤作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "fraise2", "examCode": "fraise2", "shortName": "機械加工技能士 2級（フライス盤作業）", "fullName": "技能検定 2級機械加工（フライス盤作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "fraise3", "examCode": "fraise3", "shortName": "機械加工技能士 3級（フライス盤作業）", "fullName": "技能検定 3級機械加工（フライス盤作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "bousui-frp1", "examCode": "bousui-frp1", "shortName": "防水施工技能士 1級（FRP防水工事作業）", "fullName": "技能検定 1級防水施工（FRP防水工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "naiso-carpet1", "examCode": "naiso-carpet1", "shortName": "内装仕上げ施工技能士 1級（カーペット系床仕上げ工事作業）", "fullName": "技能検定 1級内装仕上げ施工（カーペット系床仕上げ工事作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "shashutsu2", "examCode": "shashutsu2", "shortName": "プラスチック成形技能士 2級（射出成形作業）", "fullName": "技能検定 2級プラスチック成形（射出成形作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kagaku-bunseki2", "examCode": "kagaku-bunseki2", "shortName": "化学分析技能士 2級", "fullName": "技能検定 2級化学分析（化学分析作業）学科試験", "domain": "safety", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "engei-soshoku1", "examCode": "engei-soshoku1", "shortName": "園芸装飾技能士 1級", "fullName": "技能検定 1級園芸装飾（室内園芸装飾作業）学科試験", "domain": "welfare", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "engei-soshoku3", "examCode": "engei-soshoku3", "shortName": "園芸装飾技能士 3級", "fullName": "技能検定 3級園芸装飾（室内園芸装飾作業）学科試験", "domain": "welfare", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "insatsu1", "examCode": "insatsu1", "shortName": "印刷技能士 1級", "fullName": "技能検定 1級印刷（オフセット印刷作業）学科試験", "domain": "safety", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "insatsu2", "examCode": "insatsu2", "shortName": "印刷技能士 2級", "fullName": "技能検定 2級印刷（オフセット印刷作業）学科試験", "domain": "safety", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "fujin-kodomofuku2", "examCode": "fujin-kodomofuku2", "shortName": "婦人子供服製造技能士 2級", "fullName": "技能検定 2級婦人子供服製造（婦人子供注文服製作作業）学科試験", "domain": "welfare", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "fujin-kodomofuku1", "examCode": "fujin-kodomofuku1", "shortName": "婦人子供服製造技能士 1級", "fullName": "技能検定 1級婦人子供服製造（婦人子供注文服製作作業）学科試験", "domain": "welfare", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科のA群真偽法・B群多肢択一法を収録。公式正答、全肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "toso1", "examCode": "toso1", "shortName": "塗装技能士 1級", "fullName": "技能検定 1級塗装（建築塗装作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024年度前期の学科100問。公式正答・全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-hozen3", "examCode": "kikai-hozen3", "shortName": "機械保全技能士 3級（機械系）", "fullName": "機械保全技能検定 3級（機械系保全作業 学科）", "domain": "safety", "administrator": "公益社団法人日本プラントメンテナンス協会", "officialQuestionsUrl": "https://www.kikaihozenshi.jp/questions/", "officialReuseTermsUrl": "https://www.kikaihozenshi.jp/questions/", "status": "live", "reuseSummary": "2023年度・2024年度 第2回の計60問を収録。公式正答と全肢の独自解説、原本図で学べます。", "attributionTemplate": "出典：日本プラントメンテナンス協会 機械保全技能検定 3級（機械系保全作業 学科）。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-hozen1", "examCode": "kikai-hozen1", "shortName": "機械保全技能士 1級（機械系）", "fullName": "機械保全技能検定 1級（機械系保全作業 学科）", "domain": "safety", "administrator": "公益社団法人日本プラントメンテナンス協会", "officialQuestionsUrl": "https://www.kikaihozenshi.jp/questions/", "officialReuseTermsUrl": "https://www.kikaihozenshi.jp/questions/", "status": "live", "reuseSummary": "2023年度 第2回50問・2024年度 第2回49問の計99問を収録。公式正答と全肢の独自解説、原本図で学べます。", "attributionTemplate": "出典：日本プラントメンテナンス協会 機械保全技能検定 1級（機械系保全作業 学科）。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-hozen-setsubi1", "examCode": "kikai-hozen-setsubi1", "shortName": "機械保全技能士 1級（設備診断）", "fullName": "機械保全技能検定 1級（設備診断作業 学科）", "domain": "safety", "administrator": "公益社団法人日本プラントメンテナンス協会", "officialQuestionsUrl": "https://www.kikaihozenshi.jp/questions/", "officialReuseTermsUrl": "https://www.kikaihozenshi.jp/questions/", "status": "live", "reuseSummary": "2025年度 第2回の50問を収録。公式正答と全肢の独自解説、原本図で学べます。", "attributionTemplate": "出典：日本プラントメンテナンス協会 機械保全技能検定 1級（設備診断作業 学科）。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-hozen-denki1", "examCode": "kikai-hozen-denki1", "shortName": "機械保全技能士 1級（電気系）", "fullName": "機械保全技能検定 1級（電気系保全作業 学科）", "domain": "electrical", "administrator": "公益社団法人日本プラントメンテナンス協会", "officialQuestionsUrl": "https://www.kikaihozenshi.jp/questions/", "officialReuseTermsUrl": "https://www.kikaihozenshi.jp/questions/", "status": "live", "reuseSummary": "2024年度・2025年度 第2回の計100問を収録。公式正答と全肢の独自解説、原本図で学べます。", "attributionTemplate": "出典：日本プラントメンテナンス協会 機械保全技能検定 1級（電気系保全作業 学科）。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kikai-hozen-denki3", "examCode": "kikai-hozen-denki3", "shortName": "機械保全技能士 3級（電気系）", "fullName": "機械保全技能検定 3級（電気系保全作業 学科）", "domain": "electrical", "administrator": "公益社団法人日本プラントメンテナンス協会", "officialQuestionsUrl": "https://www.kikaihozenshi.jp/questions/", "officialReuseTermsUrl": "https://www.kikaihozenshi.jp/questions/", "status": "live", "reuseSummary": "2023年度 第1回・第2回、2024年度・2025年度 第2回、2026年度 第1回の計150問を収録。公式正答と全肢の独自解説、原本図で学べます。", "attributionTemplate": "出典：日本プラントメンテナンス協会 機械保全技能検定 3級（電気系保全作業 学科）。解説は過去問AIの独自作成。", "remainingWork": []},
  {

    slug: "kenchiku-daiku1", examCode: "kenchiku-daiku1", shortName: "建築大工技能士 1級", fullName: "技能検定 1級建築大工（大工工事作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/", officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。",

    attributionTemplate: "出典：中央職業能力開発協会 技能検定 1級建築大工（大工工事作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

  },
  {

    slug: "kenchiku-daiku3", examCode: "kenchiku-daiku3", shortName: "建築大工技能士 3級", fullName: "技能検定 3級建築大工（大工工事作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/", officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。",

    attributionTemplate: "出典：中央職業能力開発協会 技能検定 3級建築大工（大工工事作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

  },
  {

    slug: "kenchiku-daiku2", examCode: "kenchiku-daiku2", shortName: "建築大工技能士 2級", fullName: "技能検定 2級建築大工（大工工事作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/", officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。",

    attributionTemplate: "出典：中央職業能力開発協会 技能検定 2級建築大工（大工工事作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

  },
  {

    slug: "tobi3", examCode: "tobi3", shortName: "とび技能士 3級", fullName: "技能検定 3級とび（とび作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/", officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "とび技能士3級（とび作業）学科の2023・2025年度前期60問を収録。公式正答と全肢の独自解説で学べます。",

    attributionTemplate: "出典：中央職業能力開発協会 技能検定 3級とび（とび作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

  },
  {

    slug: "tobi1", examCode: "tobi1", shortName: "とび技能士 1級", fullName: "技能検定 1級とび（とび作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/", officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。",

    attributionTemplate: "出典：中央職業能力開発協会 技能検定 1級とび（とび作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

  },
  {"slug": "tetsudo-sharyo1", "examCode": "tetsudo-sharyo1", "shortName": "鉄道車両製造・整備技能士 1級", "fullName": "技能検定 1級鉄道車両製造・整備（機器ぎ装作業）学科試験", "domain": "safety", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "diecast1", "examCode": "diecast1", "shortName": "ダイカスト技能士 1級", "fullName": "技能検定 1級ダイカスト（ホットチャンバダイカスト作業）学科試験", "domain": "safety", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "flower3", "examCode": "flower3", "shortName": "フラワー装飾技能士 3級", "fullName": "技能検定 3級フラワー装飾（フラワー装飾作業）学科試験", "domain": "welfare", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "flower1", "examCode": "flower1", "shortName": "フラワー装飾技能士 1級", "fullName": "技能検定 1級フラワー装飾（フラワー装飾作業）学科試験", "domain": "welfare", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kojo-bankin1", "examCode": "kojo-bankin1", "shortName": "工場板金技能士 1級", "fullName": "技能検定 1級工場板金（曲げ板金作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科のA群真偽法・B群多肢択一法を収録。公式正答、全肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kenchiku-bankin1", "examCode": "kenchiku-bankin1", "shortName": "建築板金技能士 1級（ダクト板金作業）", "fullName": "技能検定 1級建築板金（ダクト板金作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科のA群真偽法・B群多肢択一法を収録。公式正答、全肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kinzoku-netsushori3", "examCode": "kinzoku-netsushori3", "shortName": "金属熱処理技能士 3級", "fullName": "技能検定 3級金属熱処理（一般熱処理作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の真偽法を収録。公式正答、全肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kojo-bankin3", "examCode": "kojo-bankin3", "shortName": "工場板金技能士 3級", "fullName": "技能検定 3級工場板金（曲げ板金作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の真偽法を収録。公式正答、全肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kojo-bankin2", "examCode": "kojo-bankin2", "shortName": "工場板金技能士 2級", "fullName": "技能検定 2級工場板金（曲げ板金作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科のA群真偽法・B群多肢択一法を収録。公式正答、全肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "mekki2", "examCode": "mekki2", "shortName": "めっき技能士 2級", "fullName": "技能検定 2級めっき（電気めっき作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kagu3", "examCode": "kagu3", "shortName": "家具製作技能士 3級", "fullName": "技能検定 3級家具製作（家具手加工作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "後期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kagu1", "examCode": "kagu1", "shortName": "家具製作技能士 1級", "fullName": "技能検定 1級家具製作（家具手加工作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kagu2", "examCode": "kagu2", "shortName": "家具製作技能士 2級", "fullName": "技能検定 2級家具製作（家具手加工作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "mekki3", "examCode": "mekki3", "shortName": "めっき技能士 3級", "fullName": "技能検定 3級めっき（電気めっき作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問・公式正答と全肢の独自解説を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "mekki1", "examCode": "mekki1", "shortName": "めっき技能士 1級", "fullName": "技能検定 1級めっき（電気めっき作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科のA群真偽法・B群多肢択一法を収録。公式正答、全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kinzoku-netsushori1", "examCode": "kinzoku-netsushori1", "shortName": "金属熱処理技能士 1級", "fullName": "技能検定 1級金属熱処理（一般熱処理作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科のA群真偽法・B群多肢択一法を収録。公式正答、全肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "tekko1", "examCode": "tekko1", "shortName": "鉄工技能士 1級", "fullName": "技能検定 1級鉄工（製缶作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科のA群真偽法・B群多肢択一法を収録。公式正答、全肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "denshi-kiki-kumitate1", "examCode": "denshi-kiki-kumitate1", "shortName": "電子機器組立て技能士 1級", "fullName": "技能検定 1級電子機器組立て（電子機器組立て作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科（A群 真偽法・B群 多肢択一法）。公式過去問を全肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "denshi-kiki-kumitate3", "examCode": "denshi-kiki-kumitate3", "shortName": "電子機器組立て技能士 3級", "fullName": "技能検定 3級電子機器組立て（電子機器組立て作業）学科試験", "domain": "electrical", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "学科（真偽法）。公式過去問を全肢の独自解説と原図で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "toso2", "examCode": "toso2", "shortName": "塗装技能士 2級", "fullName": "技能検定 2級塗装（建築塗装作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {

  "slug": "tobi2",

  "examCode": "tobi2",

  "shortName": "とび技能士 2級",

  "fullName": "技能検定 2級とび（とび作業）学科試験",

  "domain": "safety",

  "administrator": "中央職業能力開発協会",

  "officialQuestionsUrl": "https://www.kentei.javada.or.jp/",

  "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/",

  "status": "live",

  "reuseSummary": "2023・2024年度前期の2級とび（とび作業）学科100問（各年度A群25問・B群25問）を収録。公式問題・正答、全肢の独自解説と原図6点を確認できます。",

  "remainingWork": []

},
  {"slug": "junkango-kansai", "examCode": "junkango-kansai", "shortName": "准看護師", "fullName": "准看護師", "domain": "welfare", "administrator": "関西広域連合", "officialQuestionsUrl": "https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/junan_top/jyunkangosisiken/9022.html", "officialReuseTermsUrl": "https://www.kouiki-kansai.jp/about_site.html", "status": "live", "stagingDataPath": "data/qualification-staging/junkango-kansai", "reuseSummary": "2025・2026年の公式問題・正答・独自解説と原本図表を収録。300原問中、公式全員正解1問を除く299問を演習。2026年問139は2または4の単独選択を正解とします。問題・正答は公式原本、解説は過去問AIの独自作成です。", "remainingWork": []},
  {"slug": "sokuryoshi", "examCode": "sokuryoshi", "shortName": "測量士", "fullName": "測量士", "domain": "construction", "administrator": "国土地理院", "officialQuestionsUrl": "https://www.gsi.go.jp/LAW/SHIKEN/past.html", "officialReuseTermsUrl": "https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html", "status": "live", "stagingDataPath": "data/qualification-staging/sokuryoshi", "reuseSummary": "2025・2026年の公式問題・正答・独自解説と原本図表を収録。午前56問・午後10大問。午後は必須1題と選択4題から2題。記述・作図は公式解答例で自己確認し、自動採点しません。問題・正答は公式原本、解説は過去問AIの独自作成です。", "remainingWork": []},
  {

    slug: "khk-kagaku",

    examCode: "khk-kagaku",

    shortName: "高圧ガス製造保安責任者（化学）",

    fullName: "高圧ガス製造保安責任者 甲種化学・乙種化学・丙種化学（液石）・丙種化学（特別）",

    domain: "safety",

    administrator: "高圧ガス保安協会 試験センター",

    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html",

    officialReuseTermsUrl: "https://www.khk.or.jp/condition.html",

    status: "live",

    reuseSummary: "2024・2025年度422原問（択一410・記述12）。全2050肢の独自解説と記述の独自解答・自己採点基準を収録。原図33・付録3・公式解答例13画像を表示。R6液石学識問20は公式採点と技術的留保を併記。記述答案の自動採点・公式合否判定は行いません。",

    attributionTemplate: "出典：高圧ガス保安協会 高圧ガス製造保安責任者試験 ○年度 ○種化学 ○科目 問○（問題・正答）。解説は過去問AIが独自作成。",

    remainingWork: [],

  },
  {
    slug: "kenchikushi1", examCode: "kenchikushi1", shortName: "一級建築士", fullName: "一級建築士試験",
    domain: "construction", administrator: "公益財団法人建築技術教育普及センター",
    officialQuestionsUrl: "https://www.jaeic.or.jp/shiken/1k/1k-mondai.html",
    officialReuseTermsUrl: "https://www.jaeic.or.jp/shiken/1k/1k-mondai.html",
    status: "live",
    reuseSummary: "令和7・8年の学科5科目250原問のうち、全員加点1問を除く249問。公式最終正答・独自全肢解説・必要図を収録。令和2年の学科Ⅲ（法規）30問と令和6年の設計製図「大学」の課題・標準解答例を収録。",
    remainingWork: [],
  },
  {

    slug: "benrishi", examCode: "benrishi", shortName: "弁理士（短答式）", fullName: "弁理士試験 短答式筆記試験（特許庁）",

    domain: "legal", administrator: "特許庁",

    officialQuestionsUrl: "https://www.jpo.go.jp/news/benrishi/shiken-mondai/2026tanto.html",

    officialReuseTermsUrl: "https://www.jpo.go.jp/toppage/about/index.html",

    status: "live", stagingDataPath: "data/qualification-staging/benrishi",

    reuseSummary: "2025・2026年の公式問題・正答・独自解説と原本図表を収録。問題・正答は公式原本、解説は過去問AIの独自作成です。",

    attributionTemplate: "出典：特許庁 弁理士試験短答式筆記試験。過去問AIがテキスト化・整形。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "dokugeki-chiba", examCode: "dokugeki-chiba", shortName: "毒物劇物取扱者", fullName: "毒物劇物取扱者試験 一般・農業用品目・特定品目",

    domain: "pharmacy", administrator: "千葉県",

    officialQuestionsUrl: "https://www.pref.chiba.lg.jp/yakumu/dokugeki/r8shikenzissikekka.html",

    officialReuseTermsUrl: "https://www.pref.chiba.lg.jp/homepage/about-site/link.html",

    status: "live", stagingDataPath: "data/qualification-staging/dokugeki-chiba",

    reuseSummary: "2025・2026年の公式問題・正答・独自解説と原本図表を収録。一般・農業用品目・特定品目の各回各80解答欄、計480欄。原文の用語の疑義は注記します。問題・正答は公式原本、解説は過去問AIの独自作成です。",

    attributionTemplate: "出典：千葉県 毒物劇物取扱者試験 問題・正答。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "jokaso-setsubishi", examCode: "jokaso-setsubishi", shortName: "浄化槽設備士（学科）", fullName: "浄化槽設備士試験（学科）",

    domain: "construction", administrator: "公益財団法人日本環境整備教育センター",

    officialQuestionsUrl: "https://www.jeces.or.jp/pages/27/",

    officialReuseTermsUrl: "https://www.jeces.or.jp/pages/132/", status: "live",

    stagingDataPath: "data/qualification-staging/jokaso-setsubishi",

    reuseSummary: "2025・2026年の公式問題・正答・独自解説と原本図表を収録。問題・正答は公式原本、解説は過去問AIの独自作成です。",

    attributionTemplate: "出典：公益財団法人日本環境整備教育センター 浄化槽設備士試験（学科）問題・正答。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "chiiki-ryoko", examCode: "chiiki-ryoko", shortName: "地域限定旅行業務取扱管理者", fullName: "地域限定旅行業務取扱管理者試験",

    domain: "personal-services", administrator: "観光庁",

    officialQuestionsUrl: "https://www.mlit.go.jp/kankocho/seisaku_seido/ryokogyoho/chiikigenteikanrisha.html",

    officialReuseTermsUrl: "https://www.mlit.go.jp/kankocho/site-policy.html", status: "live",

    stagingDataPath: "data/qualification-staging/chiiki-ryoko",

    reuseSummary: "2025・2026年の公式問題・正答・独自解説と原本図表を収録。全科目版118問。「すべて選ぶ」は全選択一致で採点します。問題・正答は公式原本、解説は過去問AIの独自作成です。",

    attributionTemplate: "出典：観光庁 地域限定旅行業務取扱管理者試験（全科目）問題・正解及び配点。原本画像化・文章整形・独自解説の追加は過去問AIによる加工。",

    remainingWork: [],

},
  {

    slug: "kukaku-seiri", examCode: "kukaku-seiri", shortName: "土地区画整理士（学科）", fullName: "土地区画整理士技術検定（学科試験）",

    domain: "construction", administrator: "一般財団法人全国建設研修センター",

    officialQuestionsUrl: "https://www.jctc.jp/mondai/", officialReuseTermsUrl: "https://www.jctc.jp/mondai/",

    status: "live", stagingDataPath: "data/qualification-staging/kukaku-seiri",

    reuseSummary: "2026年度のみ学科40問を収録。2025年度の問題本文は未収録です。実地試験は対象外です。問題・正答は公式原本、解説は過去問AIの独自作成です。",

    attributionTemplate: "出典：一般財団法人全国建設研修センター 令和○年度土地区画整理士技術検定 学科 No.○。解説は過去問AIの独自作成。",

    remainingWork: ["2025年度問題本文は未収録"],

},
  {

    slug: "dojo-osen", examCode: "dojo-osen", shortName: "土壌汚染調査技術管理者", fullName: "土壌汚染調査技術管理者試験",

    domain: "construction", administrator: "環境省",

    officialQuestionsUrl: "https://www.env.go.jp/water/dojo/kanri.html",

    officialReuseTermsUrl: "https://www.env.go.jp/mail.html", status: "live",

    stagingDataPath: "data/qualification-staging/dojo-osen",

    reuseSummary: "2024・2025年の公式問題・正答・独自解説と原本図表を収録。160原問中、2025年度調査問30の公式全員正解1問を除く159問を演習できます。問題・正答は公式原本、解説は過去問AIの独自作成です。",

    attributionTemplate: "出典：環境省 令和○年度土壌汚染調査技術管理者試験 ○科目 問○。原問題画像は公式PDFの切出し。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {"slug":"keiryoshi","examCode":"keiryoshi","shortName":"一般計量士","fullName":"一般計量士","domain":"construction","administrator":"経済産業省","officialQuestionsUrl":"https://www.meti.go.jp/policy/economy/hyojun/techno_infra/keiryoshi.html","officialReuseTermsUrl":"https://www.meti.go.jp/main/rules.html","status":"live","reuseSummary":"第76回（令和7年実施）のみ100問を収録。第75回は未収録で、2回分の全問収録ではありません。出題時点の法令・基準に基づく全肢解説を確認できます。","remainingWork":["第75回は未収録"]},
  {"slug":"keiryoshi-nodo","examCode":"keiryoshi-nodo","shortName":"環境計量士（濃度関係）","fullName":"環境計量士（濃度関係）","domain":"construction","administrator":"経済産業省","officialQuestionsUrl":"https://www.meti.go.jp/policy/economy/hyojun/techno_infra/keiryoshi.html","officialReuseTermsUrl":"https://www.meti.go.jp/main/rules.html","status":"live","reuseSummary":"第76回（令和7年実施）のみ100問を収録。第75回は未収録で、2回分の全問収録ではありません。出題時点の法令・基準に基づく全肢解説を確認できます。","remainingWork":["第75回は未収録"]},
  {"slug":"keiryoshi-soon","examCode":"keiryoshi-soon","shortName":"環境計量士（騒音・振動関係）","fullName":"環境計量士（騒音・振動関係）","domain":"construction","administrator":"経済産業省","officialQuestionsUrl":"https://www.meti.go.jp/policy/economy/hyojun/techno_infra/keiryoshi.html","officialReuseTermsUrl":"https://www.meti.go.jp/main/rules.html","status":"live","reuseSummary":"第76回（令和7年実施）のみ100問を収録。第75回は未収録で、2回分の全問収録ではありません。出題時点の法令・基準に基づく全肢解説を確認できます。","remainingWork":["第75回は未収録"]},
  {

    slug: "kanteishi", examCode: "kanteishi", shortName: "不動産鑑定士", fullName: "不動産鑑定士試験（短答式）",

    domain: "real-estate", administrator: "国土交通省",

    officialQuestionsUrl: "https://www.mlit.go.jp/totikensangyo/kanteishi/content/002001126.pdf",

    officialReuseTermsUrl: "https://www.mlit.go.jp/link.html", status: "live",

    reuseSummary: "令和7・8年度の短答式160原問を無料・回数制限なしで演習できます。原文・公式正答・全肢解説・原表を保持し、出典と加工内容を表示します。令和7年度行政法規問19は印刷原文と法令用語の違いを注記し、採点は公式正答5を使用します。",

    attributionTemplate: "出典：国土交通省 不動産鑑定士試験（短答式）問題・正答。公共データ利用規約に基づき過去問AIが加工。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "kaikeishi", examCode: "kaikeishi", shortName: "公認会計士", fullName: "公認会計士試験（短答式）",

    domain: "accounting", administrator: "公認会計士・監査審査会",

    officialQuestionsUrl: "https://www.fsa.go.jp/cpaaob/kouninkaikeishi-shiken/r8shiken/01.pdf",

    officialReuseTermsUrl: "https://www.fsa.go.jp/cpaaob/copyright.html", status: "live",

    reuseSummary: "令和8年試験第I回・第II回の短答式186原問を無料・回数制限なしで演習できます。原文・公式正答・実際の5肢または6肢の全解説と共通設例・図表を保持し、出典と加工内容を表示します。",

    attributionTemplate: "出典：公認会計士・監査審査会 令和8年公認会計士試験短答式問題・正答。公共データ利用規約に基づき過去問AIが加工。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "riku-tech2", examCode: "riku-tech2", shortName: "第二級陸上無線技術士", fullName: "第二級陸上無線技術士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年1月・7月の公表過去問190原問を保存し、189原問を無料で回数制限なく演習できます。確認中の1月無線工学B B5は演習対象外です。原問の番号・図・語群を保持し、B問題は原問単位で5枠を個別採点します。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第二級陸上無線技術士試験 公表過去問（日本語・非英語部分）。解説は過去問AI作成。",

    remainingWork: [],

},
  {

    slug: "amateur2", examCode: "amateur2", shortName: "第二級アマチュア無線技士", fullName: "第二級アマチュア無線技士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年5月・8月の公表過去問110原問を保存し、109原問を無料で回数制限なく演習できます。確認中の5月工学A17は演習対象外です。B問題は原問単位で5枠を個別採点します。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第二級アマチュア無線技士試験 公表過去問（日本語・非英語部分）。解説は過去問AI作成。",

    remainingWork: [],

},
  {

    slug: "maritime-radar", examCode: "maritime-radar", shortName: "レーダー級海上特殊無線技士", fullName: "レーダー級海上特殊無線技士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年2月・6月の公表過去問48原問を、無料で回数制限なく演習できます。原問番号・全肢解説と必要図を保持しています。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 レーダー級海上特殊無線技士試験 公表過去問（日本語・非英語部分）。解説は過去問AI作成。",

    remainingWork: [],

},
  {
    slug: "amateur1", examCode: "amateur1", shortName: "第一級アマチュア無線技士", fullName: "第一級アマチュア無線技士試験",
    domain: "electrical", administrator: "公益財団法人日本無線協会",
    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",
    reuseSummary: "2026年5月・8月・11月の工学・法規180原問を保存し、179原問を無料で回数制限なく演習できます。確認中の5月工学A19は演習対象外です。B問題は原問単位で5枠を個別採点します。法令は各実施回当時の内容です。",
    attributionTemplate: "出典：公益財団法人日本無線協会 第一級アマチュア無線技士試験 公表過去問（日本語・非英語部分）。解説は過去問AI作成。",
    remainingWork: [],
},
  {

    slug: "maritime-special1", examCode: "maritime-special1", shortName: "第一級海上特殊無線技士", fullName: "第一級海上特殊無線技士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年2月・6月の日本語の工学・法規48原問を、無料で回数制限なく演習できます。英語の筆記・口述、通信術は含みません。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第一級海上特殊無線技士試験 公表過去問（日本語・非英語部分）。解説は過去問AI作成。",

    remainingWork: [],

},
  {

    slug: "aviation-comm", examCode: "aviation-comm",

    shortName: "航空無線通信士", fullName: "航空無線通信士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年2月・8月の公表済み日本語筆記2回、各回の無線工学14問・法規20問、計68原問を収録。公式正答・全肢解説・本文や数式と語群を保持した原問題画像で、無料で回数制限なく演習できます。B問題は1原問の5枠を個別に採点します。英語の筆記・英会話・通信術は収録していません。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 航空無線通信士試験 ○年○月 法規・無線工学 A/B問○（問題・正答）。原問題画像の切出しと解説は過去問AIが作成・加工。",

    remainingWork: [],

},
  {

    slug: "maritime2", examCode: "maritime2",

    shortName: "第二級海上無線通信士", fullName: "第二級海上無線通信士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年3月・9月の無線工学の基礎・無線工学A・無線工学B各25問と法規各20問、計190原問を収録。公式正答・全肢の独自解説・原問題画像で無料、回数制限なく演習できます。B問題40原問は各5枠を個別に採点します。英語の筆記・会話と通信術は含みません。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第二級海上無線通信士試験 ○年○月 ○科目 A/B問○（問題・正答）。解説と原図の切出しは過去問AIが作成・加工。",

    remainingWork: ["英語・通信術は未収録", "現行法令との違いを学習時に確認"],

},
  {

    slug: "maritime1", examCode: "maritime1",

    shortName: "第一級海上無線通信士", fullName: "第一級海上無線通信士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年3月・9月の日本語筆記4科目190問を無料・回数制限なしで演習できます。公式問題画像と全肢解説を掲載し、B40問は各5枠を個別採点します。英語・通信術は未収録です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第一級海上無線通信士試験 科目別過去問。解説は過去問AIが作成・校閲。",

    remainingWork: ["英語・通信術は未収録"],

},
  {

    slug: "general1", examCode: "general1",

    shortName: "第一級総合無線通信士", fullName: "第一級総合無線通信士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年3月・9月の公表済み日本語筆記2回を収録。各回の無線工学の基礎・無線工学A・無線工学B・法規各25問、地理40問、計280原問を保存し、このうち270原問を無料で回数制限なく演習できます。A問題160原問・B問題40原問は原問番号と原問題画像を保持し、B問題は各5枠を個別採点します。地理80原問のうち70原問は選択式で演習でき、10原問は解説確認中のため保留です。英語の筆記・通信術（実技）は未収録です。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第一級総合無線通信士試験 ○年○月 無線工学の基礎・無線工学A・無線工学B・法規・地理 A/B問○（問題・正答）。原問題画像の切出しと解説は過去問AIが作成・加工。",

    remainingWork: ["英語の筆記・通信術（実技）は未収録", "現行法令との差を学習時に確認"],

},
  {

    slug: "general2", examCode: "general2",

    shortName: "第二級総合無線通信士", fullName: "第二級総合無線通信士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年3月・9月の公表済み日本語筆記2回を収録。各回の無線工学の基礎・無線工学A・無線工学B・法規各25問、地理40問、計280原問を無料で回数制限なく演習できます。A問題160原問・B問題40原問は原問番号と原問題画像を保持し、B問題は各5枠を個別採点します。地理80原問は選択式です。英語の筆記・通信術（実技）は未収録です。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第二級総合無線通信士試験 ○年○月 無線工学の基礎・無線工学A・無線工学B・法規・地理 A/B問○（問題・正答）。原問題画像の切出しと解説は過去問AIが作成・加工。",

    remainingWork: ["英語の筆記・通信術（実技）は未収録", "現行法令との差を学習時に確認"],

},
  {

    slug: "general3", examCode: "general3",

    shortName: "第三級総合無線通信士", fullName: "第三級総合無線通信士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年3月・9月の公表済み日本語筆記2回、各回の無線工学の基礎25問・無線工学25問・法規20問、計140原問を収録。公式正答と独自解説・原問題画像で無料、回数制限なく演習できます。B問題38原問は各5枠を個別に採点します。英語の筆記と通信術は未収録です。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第三級総合無線通信士試験 ○年○月 無線工学の基礎・無線工学・法規 A/B問○（問題・正答）。原問題画像の切出しと解説は過去問AIが作成・加工。",

    remainingWork: ["英語の筆記・通信術は未収録", "現行法令との差を学習時に確認"],

},
  {

    slug: "maritime3", examCode: "maritime3",

    shortName: "第三級海上無線通信士", fullName: "第三級海上無線通信士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年3月・9月の無線工学各15問・法規各20問、計70原問を収録。公式正答・全肢解説・原図で演習できます。B問題18原問は各5枠を個別に採点します。英語の筆記・会話と通信術は含みません。法令は実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第三級海上無線通信士試験 ○年○月 ○科目 問○（問題・正答）。解説と原図の切出しは過去問AIが作成・加工。",

    remainingWork: ["英語・通信術は未収録", "現行法令との差を学習時に確認"],

},
  {

    slug: "land-special2", examCode: "land-special2",

    shortName: "第二級陸上特殊無線技士", fullName: "第二級陸上特殊無線技士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "公表された2021年10月・2022年2月の歴史筆記2回を収録。各回の法規12問・無線工学12問、計48原問を公式正答・全肢解説・必要な原図で演習できます。現在のCBT例題は含みません。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第二級陸上特殊無線技士試験 ○年○月 ○科目 問○（問題・正答）。解説と原図の切出しは過去問AIが作成・加工。",

    remainingWork: ["現在のCBT例題は未収録", "現行法令との差を学習時に確認"],

},
  {

    slug: "land-special3", examCode: "land-special3",

    shortName: "第三級陸上特殊無線技士", fullName: "第三級陸上特殊無線技士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "公表された2021年10月・2022年2月の歴史筆記2回を収録。各回の法規12問・無線工学12問、計48原問を公式正答・全肢解説・必要な原図で演習できます。現在のCBT例題は含みません。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第三級陸上特殊無線技士試験 ○年○月 ○科目 問○（問題・正答）。解説と原図の切出しは過去問AIが作成・加工。",

    remainingWork: ["現在のCBT例題は未収録", "現行法令との差を学習時に確認"],

},
  {

    slug: "riku-toku-kokunai", examCode: "riku-toku-kokunai",

    shortName: "国内電信級陸上特殊無線技士", fullName: "国内電信級陸上特殊無線技士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "日本無線協会が公表した2026年2月・6月の筆記法規各12問、計24原問と公式正答、全選択肢の独自解説を収録。受験学習用の公表過去問であり、現在のCBT例題や独自問題は収録していません。法令は各試験当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 国内電信級陸上特殊無線技士試験 ○年○月 法規 問○（問題・正答）。解説は過去問AIが独自作成。",

    remainingWork: ["現行法令との違いを学習時に確認"],

},
  {

    slug: "riku-tech1", examCode: "riku-tech1",

    shortName: "第一級陸上無線技術士", fullName: "第一級陸上無線技術士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年1月・7月の2回、無線工学の基礎・無線工学A・無線工学B各25問と法規20問、計190原問を収録。公式正答・全肢解説・原図と解答群で演習できます。B問題は1原問の5枠を個別に採点します。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第一級陸上無線技術士試験 ○年○月 ○科目 問○（問題・正答）。解説と原図の切出しは過去問AIが作成・加工。",

    remainingWork: ["現行法令との差を学習時に確認"],

},
  {

    slug: "maritime4", examCode: "maritime4",

    shortName: "第四級海上無線通信士", fullName: "第四級海上無線通信士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年2月・8月の2回、各回の無線工学18問・法規20問、計76原問を収録。公式正答・全肢解説・原図と解答群で演習できます。A/Bは同じ問題冊子内の区分で、B問題は1原問の5枠を個別に採点します。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第四級海上無線通信士試験 ○年○月 法規・無線工学 問○（問題・正答）。解説と原図の切出しは過去問AIが作成・加工。",

    remainingWork: ["現行法令との差を学習時に確認"],

},
  {

    slug: "land-special1", examCode: "land-special1",

    shortName: "第一級陸上特殊無線技士", fullName: "第一級陸上特殊無線技士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "2026年2月09:30 A版・6月09:30 A版の2実施回を収録。各回の法規12問・無線工学24問、計72原問を公式正答・全肢の独自解説・必要な原図付きで演習できます。同じ2期の13:30 B版72問は未収録です。法令は各実施回当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第一級陸上特殊無線技士試験 ○年○月09:30 A版 法規・無線工学 問○（問題・正答）。解説と図の切出しは過去問AIが作成・加工。",

    remainingWork: ["2026年2月・6月13:30 B版は未収録の別実施回", "現行法令との差を学習時に確認"],

},
  {

    slug: "koku-toku", examCode: "koku-toku",

    shortName: "航空特殊無線技士", fullName: "航空特殊無線技士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "日本無線協会が公表した2026年2月・6月の筆記試験、各回法規12問・無線工学12問、計48原問と公式正答、全選択肢の独自解説を収録。原図は設問ごとに切り出して表示しています。英語科目は含みません。法令は各試験当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 航空特殊無線技士試験 ○年○月 法規・無線工学 問○（問題・正答）。解説と図の切出しは過去問AIが作成・加工。",

    remainingWork: ["現行法令との違いを学習時に確認"],

},
  {
    slug: "kai-toku2", examCode: "kai-toku2",
    shortName: "第二級海上特殊無線技士", fullName: "第二級海上特殊無線技士試験",
    domain: "electrical", administrator: "公益財団法人日本無線協会",
    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",
    reuseSummary: "日本無線協会が公表した2022年10月・2023年2月の旧筆記2回分、各回法規12問・無線工学12問の48原問を保存し、確認済み48原問を演習に収録。公式正答・全選択肢の独自解説・原図付きの過去問を無料で回数制限なく学習できます。現在のCBT例題、英語、独自問題は演習に含みません。法令は各試験当時の内容です。",
    attributionTemplate: "出典：公益財団法人日本無線協会 第二級海上特殊無線技士試験 ○年○月 法規・無線工学 問○（問題・正答）。解説は過去問AIが独自作成。",
    remainingWork: ["現行法令との違いを学習時に確認"],
},
  {

    slug: "kai-toku3", examCode: "kai-toku3",

    shortName: "第三級海上特殊無線技士", fullName: "第三級海上特殊無線技士試験",

    domain: "electrical", administrator: "公益財団法人日本無線協会",

    officialQuestionsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", officialReuseTermsUrl: "https://www.nichimu.or.jp/kshiken/siken/index.html", status: "live",

    reuseSummary: "日本無線協会が公表した2023年2月・2022年10月の筆記2回分、各回法規20問・無線工学10問、計60原問と公式正答、全選択肢の独自解説を収録。現在のCBT例題や独自問題は収録していません。法令は各試験当時の内容です。",

    attributionTemplate: "出典：公益財団法人日本無線協会 第三級海上特殊無線技士試験 ○年○月 法規・無線工学 問○（問題・正答）。解説は過去問AIが独自作成。",

    remainingWork: ["現行法令との違いを学習時に確認"],

},
  {

    slug: "chosashi",

    examCode: "chosashi",

    shortName: "土地家屋調査士",

    fullName: "土地家屋調査士試験",

    domain: "legal",

    administrator: "法務省",

    officialQuestionsUrl: "https://www.moj.go.jp/shikaku_saiyo_index5.html",

    officialReuseTermsUrl: "https://www.moj.go.jp/hisho06_00280.html",

    status: "live",

    reuseSummary: "令和7・6年度の午前各11問・午後各22問、計66原問を収録。択一60問は法務省の公式正答と全選択肢の独自解説を掲載。記述6問は公式問題に基づく独自解答例であり、法務省の公式解答ではありません。法務省の利用条件には第三者権利等の例外があります。",

    attributionTemplate: "出典：法務省 令和○年度土地家屋調査士試験 午前・午後 第○問。解説・記述解答例は過去問AIが独自作成。",

    remainingWork: ["法令改正の継続確認", "第三者権利等の例外条件は掲載者が確認"],

},
  {

    slug: "chusho-secondary", shortName: "中小企業診断士二次", fullName: "中小企業診断士第2次試験", domain: "accounting", administrator: "一般社団法人 日本中小企業診断士協会連合会",

    officialQuestionsUrl: "https://www.jf-cmca.jp/contents/010_c_/shikenmondai.html", officialReuseTermsUrl: "https://www.jf-cmca.jp/contents/017_houtekijikou.html", status: "live",

    reuseSummary: "2023〜2025年度の全12事例・50原問・88解答例を収録。公式問題・出題趣旨と、当サイトが作成した独自解答例・計算過程を確認できます。",

    attributionTemplate: "出典：日本中小企業診断士協会連合会 2023〜2025年度 中小企業診断士第2次試験", remainingWork: ["次年度公開資料の確認"],

},
  {

    slug: "fp1",

    examCode: "fp1",

    shortName: "FP1級",

    fullName: "1級ファイナンシャル・プランニング技能検定",

    domain: "finance",

    administrator: "一般社団法人金融財政事情研究会",

    officialQuestionsUrl: "https://products.kinzai.or.jp/exam-fp/model-answers/",

    officialReuseTermsUrl: "https://www.kinzai.or.jp/ginou/license_terms.html",

    status: "live",

    reuseSummary: "2026年1月学科の基礎全50問を収録。2026年5月学科は基礎50問・応用15原問62回答欄を収録。2026年9月学科は基礎全50問と応用全15原問57回答欄を収録。各原問の正答と全選択肢または回答欄の解説を掲載。",

    attributionTemplate: "出典：一般社団法人金融財政事情研究会 ファイナンシャル・プランニング技能検定1級 学科試験 基礎編（2026年1月・5月・9月）",

    remainingWork: ["法令改正内容の継続確認"],

},
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

    remainingWork: ["次回公表分の追加", "法改正影響の継続確認"],

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
    reuseSummary: "固有356原問を収録。2026年度上期・2025年度下期の4科目、2023年度上期の法規、2022年度下期の理論を原本画像と全肢解説で確認できます。",
    attributionTemplate: "出典：令和○年度○期第三種電気主任技術者試験 ○○科目",
    remainingWork: ["2026年度上期の未掲載原問と法規の保留問を一次根拠で確認", "数式・図のアクセシビリティを継続改善"],
},
  {
    slug: "denken1",
    examCode: "denken1",
    shortName: "電験一種",
    fullName: "第一種電気主任技術者試験",
    domain: "electrical",
    administrator: "電気技術者試験センター",
    officialQuestionsUrl: "https://www.shiken.or.jp/chief/first/qa/",
    officialReuseTermsUrl: "https://www.shiken.or.jp/shiken/faq/faq08/000082.html",
    status: "live",
    reuseSummary: "2026年度一次試験の従来5原問・25空欄を保持し、2024〜2026年度の理論・電力・機械43原問・245回答欄（2024年度理論は全7原問）を原問単位でも収録。重複2原問を除いた固有の掲載原問は46件です。公式原図・解答群と各欄の解説を確認できます。",
    attributionTemplate: "出典：令和○年度第一種電気主任技術者試験（試験区分・科目・問番号）",
    remainingWork: ["2024年度の理論以外と2025・2026年度の未収録原問", "一次試験の未収録原問", "二次試験の未収録年度・科目", "2025・2026年度一次の未収録原問", "2023年度電力・管理以外の二次試験"],
},
  {
    slug: "denken2",
    examCode: "denken2",
    shortName: "電験二種",
    fullName: "第二種電気主任技術者試験",
    domain: "electrical",
    administrator: "電気技術者試験センター",
    officialQuestionsUrl: "https://www.shiken.or.jp/chief/second/qa/",
    officialReuseTermsUrl: "https://www.shiken.or.jp/shiken/faq/faq08/000082.html",
    status: "live",
    reuseSummary: "2026年度一次試験は理論・電力・機械・法規の30原問・155回答欄、2025年度は理論・機械16原問・80回答欄と電力・法規11原問・55回答欄を収録。計57原問・290回答欄です。公式問題の図・数式・解答群と、各欄の正答・解説を確認できます。",
    attributionTemplate: "出典：令和○年度第二種電気主任技術者一次試験○○科目○問題問○",
    remainingWork: ["2024年度以前の一次試験の未収録原問の追加", "2025年度法規の未収録3原問、2024年度の電力・機械・法規、2023年度以前の一次試験の追加", "2023年度以前の二次試験の追加", "2025年度法規の未収録3原問と2024年度以前の未収録科目の追加", "2025年度法規の未収録3原問と、2024年度以前の未収録原問の追加", "2025・2024年度以外の二次試験の追加", "2025年度法規の未収録3原問と2024年度以前の未収録原問の追加", "2021年度機械・制御以外の二次試験の追加"],
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

    remainingWork: [],

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
    reuseSummary: "令和8年度上期の公表出題例、令和7年度下期、令和5年度午後の学科試験を各50問収録。配線図と選択肢ごとの解説付き。",
    attributionTemplate: "出典：令和○年度第一種電気工事士筆記試験／学科試験",
    remainingWork: ["令和5年度午前など過去の学科試験の追加", "過去の筆記・学科試験の追加", "令和6年度以前の学科試験の追加", "過去の学科試験の追加", "筆記・学科試験の過年度問題の追加", "技能試験(候補問題・欠陥判断基準)の掲載検討"],
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

    reuseSummary: "令和8年度後期・前期と令和7年度10月実施分の第一次検定（土木）各全66問と各選択肢の解説を収録。",

    attributionTemplate: "出典：全国建設研修センター ○年度2級土木施工管理技術検定 第一次検定（土木）",

    remainingWork: ["他年度の追加", "工事仕様書の改定に伴う解説更新"],

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
    slug: "sekou-zoen2",
    examCode: "zoen2",
    shortName: "2級造園施工管理",
    fullName: "2級造園施工管理技術検定",
    domain: "construction",
    administrator: "全国建設研修センター",
    officialQuestionsUrl: "https://www.jctc.jp/mondai/",
    officialReuseTermsUrl: "https://www.jctc.jp/mondai/",
    status: "live",
    reuseSummary: "令和8年度前期・後期と令和7年度後期の第一次検定を各40問、計120問収録。公式正答、図表、全選択肢の解説に対応。",
    attributionTemplate: "出典：全国建設研修センター ○年度2級造園施工管理技術検定 第一次検定（前期／後期）",
    remainingWork: ["他年度の追加"],
},
  {
    slug: "sekou-zoen1",
    examCode: "zoen1",
    shortName: "1級造園施工管理",
    fullName: "1級造園施工管理技術検定",
    domain: "construction",
    administrator: "全国建設研修センター",
    officialQuestionsUrl: "https://www.jctc.jp/mondai/",
    officialReuseTermsUrl: "https://www.jctc.jp/mondai/",
    status: "live",
    reuseSummary: "令和8年度の第一次検定を全65問（問題A36問・問題B29問）収録。公式問題・正答、図表、全選択肢の解説に対応。問題B No.24〜29は正答を全て選んで採点。",
    attributionTemplate: "出典：全国建設研修センター 令和8年度1級造園施工管理技術検定 第一次検定 試験問題A／B",
    remainingWork: ["令和7年度以前は公式問題PDFが公開終了（正答肢のみ残存）のため、令和9年度試験の公表後に2回目を追加"],
},
  {

    slug: "sekou-tsushin2",

    examCode: "tsushin2",

    shortName: "2級電気通信工事施工管理",

    fullName: "2級電気通信工事施工管理技術検定",

    domain: "construction",

    administrator: "全国建設研修センター",

    officialQuestionsUrl: "https://www.jctc.jp/mondai/",

    officialReuseTermsUrl: "https://www.jctc.jp/mondai/",

    status: "live",

    reuseSummary: "令和7年度後期・令和8年度前期・後期の第一次検定を各65問収録。通常採点194問と公式解答参照1問。",

    attributionTemplate: "出典：全国建設研修センター 令和7年度後期・令和8年度前期・後期 2級電気通信工事施工管理技術検定 第一次検定",

    remainingWork: ["第二次検定は未収録"],

},
  {

    slug: "sekou-tsushin1",

    examCode: "tsushin1",

    shortName: "1級電気通信工事施工管理",

    fullName: "1級電気通信工事施工管理技術検定",

    domain: "construction",

    administrator: "全国建設研修センター",

    officialQuestionsUrl: "https://www.jctc.jp/mondai/",

    officialReuseTermsUrl: "https://www.jctc.jp/mondai/",

    status: "live",

    reuseSummary: "2026・2025年度の第一次検定を各90原問（問題A55・B35）、全肢解説付きで収録。2025年度は公開保存コピーから取得し、公式サイトからの直接取得は未確認。",

    attributionTemplate: "出典：全国建設研修センター 令和○年度1級電気通信工事施工管理技術検定 第一次検定 試験問題A／B",

    remainingWork: [],

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

    reuseSummary: "第36〜38回（令和5〜7年度）の全375問（総合問題・図の問題を含む）と全選択肢の解説を収録。",

    attributionTemplate: "出典：公益財団法人社会福祉振興・試験センター 第○回介護福祉士国家試験 問題○",

    remainingWork: ["法改正で成立しなくなった問題の失効管理"],

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
    reuseSummary: "第38回129問、第37回126問、第36回150問を、全選択肢の解説付きで収録。",
    attributionTemplate: "出典：公益財団法人社会福祉振興・試験センター 第○回社会福祉士国家試験 問題○",
    remainingWork: ["法改正で成立しなくなった問題の失効管理"],
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
    reuseSummary: "第27回の専門科目48問・共通科目81問と、第28回の専門科目48問・共通科目84問を、全選択肢の解説付きで収録。",
    attributionTemplate: "出典：公益財団法人社会福祉振興・試験センター 第○回精神保健福祉士国家試験 問題○",
    remainingWork: ["第26回以前は旧カリキュラムのため収録方針の決定", "法改正で成立しなくなった問題の失効管理"],
},
  {
    slug: "sekou-kenchiku1", examCode: "sekou-1kenchiku",
    shortName: "1級建築施工管理",
    fullName: "1級建築施工管理技術検定",
    domain: "construction",
    administrator: "建設業振興基金",
    officialQuestionsUrl: "https://www.fcip-shiken.jp/about/",
    officialReuseTermsUrl: "https://www.fcip-shiken.jp/about/",
    status: "live",
    reuseSummary: "令和6〜8年度の第一次検定を各72問、計216問収録。全肢解説と原図付き。令和7年度No.57は公式訂正に従い3・4いずれも正答。",
    remainingWork: [],
},
  {
    slug: "sekou-doboku1",
    examCode: "civil1",
    shortName: "1級土木施工管理",
    fullName: "1級土木施工管理技術検定",
    domain: "construction",
    administrator: "全国建設研修センター",
    officialQuestionsUrl: "https://www.jctc.jp/mondai/",
    officialReuseTermsUrl: "https://www.jctc.jp/mondai/",
    status: "live",
    reuseSummary: "令和8年度（7月実施）の第一次検定から、試験問題A全66問と試験問題B全35問を各選択肢の解説付きで収録。",
    attributionTemplate: "出典：全国建設研修センター ○年度1級土木施工管理技術検定 第一次検定 試験問題A／B",
    remainingWork: ["令和7年度分の追加"],
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

    reuseSummary: "2023〜2025年度の公式問題150問・正解番号表を掲載し、各年度の解説に法令基準日を表示。",

    remainingWork: [],

},
  {

    slug: "tohan-kansai",

    examCode: "tohan",

    shortName: "登録販売者",

    fullName: "登録販売者試験",

    domain: "pharmacy",

    administrator: "関西広域連合・東京都",

    officialQuestionsUrl: "https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/touroku/7607.html",

    officialReuseTermsUrl: "https://www.kouiki-kansai.jp/site/221.html",

    status: "live",

    reuseSummary: "令和5年度の前半60問と令和6・7年度の各120問、計300問を収録。",

    attributionTemplate: "出典：関西広域連合・東京都保健医療局の公式問題と正答。",

    remainingWork: ["令和8年度は公式の「正答(例)」のみで確定正答の公表待ち", "令和元〜4年度と令和5年度前半の追加", "東京都の午後と他ブロックの収録", "東京都の他の回・午前、神奈川県などの追加"],

},
  {
    slug: "kanri",
    examCode: "kanri",
    shortName: "管理業務主任者",
    fullName: "管理業務主任者試験",
    domain: "real-estate",
    administrator: "一般社団法人マンション管理業協会",
    officialQuestionsUrl: "https://www.kanrikyo.or.jp/kanri/mondaiseikai/index.html",
    officialReuseTermsUrl: "https://www.kanrikyo.or.jp/kanri/pdf/kakomonshiyou.pdf",
    status: "live",
    reuseSummary: "令和5〜7年度の公式問題各50問を、公式正答と全選択肢の解説付きで演習できます。各年度の法令基準日を確認できます。",
    attributionTemplate: "出典：令和○年度 管理業務主任者試験問題 問○",
    remainingWork: ["令和5年度の公式問題を追加", "令和4・5年度の追加", "令和8年度試験の公表後に法令基準日を確認して追加"],
},
  {

    slug: "eisei1",

    examCode: "eisei1",

    shortName: "第一種衛生管理者",

    fullName: "第一種衛生管理者免許試験",

    domain: "safety",

    administrator: "安全衛生技術試験協会",

    officialQuestionsUrl: "https://www.exam.or.jp/lckohyo/",

    officialReuseTermsUrl: "https://www.exam.or.jp/lckohyo/",

    status: "live",

    reuseSummary: "2025年10月・2026年4月公表版各44問と、2026年10月公表版の労働生理10問を部分収録。計98問を公式問題・正答と照合。",

    attributionTemplate: "出典：安全衛生技術試験協会 令和8年4月公表 第一種衛生管理者免許試験",

    remainingWork: ["2026年1月以降に施行された法令を扱う問題は別途更新確認"],

},
  {

    slug: "eisei2",

    examCode: "eisei2",

    shortName: "第二種衛生管理者",

    fullName: "第二種衛生管理者免許試験",

    domain: "safety",

    administrator: "安全衛生技術試験協会",

    officialQuestionsUrl: "https://www.exam.or.jp/lckohyo/",

    officialReuseTermsUrl: "https://www.exam.or.jp/lckohyo/",

    status: "live",

    reuseSummary: "2025年10月・2026年4月公表版各30問と、2026年10月公表版の労働生理10問を部分収録。計70問を公式問題・正答と照合。",

    attributionTemplate: "出典：安全衛生技術試験協会 令和○年○月公表 第二種衛生管理者免許試験",

    remainingWork: ["2026年1月以降に施行された法令を扱う問題は別途更新確認"],

},
  {

    slug: "gijutsushi-soukan",

    examCode: "soukan",

    shortName: "技術士 総合技術監理部門",

    fullName: "技術士第二次試験 総合技術監理部門（必須科目Ⅰ－1 択一式）",

    domain: "construction",

    administrator: "公益社団法人日本技術士会",

    officialQuestionsUrl: "https://www.engineer.or.jp/c_categories/index02022241.html",

    officialReuseTermsUrl: "https://www.engineer.or.jp/c_categories/index02022241.html",

    status: "live",

    reuseSummary: "令和7年度・令和8年度の択一式を公式問題PDF・正答PDFと照合して収録。日本技術士会に明示の転載条件はなく、衛生管理者と同様に出典を明記し、解説が独自作成で同会と無関係であることを各問に表示する。",

    attributionTemplate: "出典：公益社団法人日本技術士会 令和○年度技術士第二次試験 総合技術監理部門 必須科目 択一式 Ⅰ－1－○",

    remainingWork: ["各年度の問題冊子が示す法令基準日（4月1日）より後の改正は別途更新確認", "記述式（Ⅰ－2）は模範解答が非公開のため収録しない"],

},
  {
    slug: "hoikushi",
    examCode: "hoikushi",
    shortName: "保育士試験",
    fullName: "保育士試験（筆記9科目）",
    domain: "welfare",
    administrator: "一般社団法人全国保育士養成協議会",
    officialQuestionsUrl: "https://www.hoyokyo.or.jp/exam/pasttest/past-test.html",
    officialReuseTermsUrl: "https://www.hoyokyo.or.jp/terms/",
    status: "live",
    reuseSummary: "令和8年度前期の筆記試験9科目・1回分157問を収録。",
    attributionTemplate: "出典：一般社団法人全国保育士養成協議会 令和○年度○期保育士試験 筆記試験「○○」問○",
    remainingWork: ["問題転載の許諾根拠を再確認", "令和7年度後期の残5科目・全肢解説・独立査読を準備", "法改正・指針改定の継続確認", "第三者の楽譜・図版の権利と再現性を設問単位で確認"],
},
  {
    slug: "mankan",
    examCode: "mankan",
    shortName: "マンション管理士",
    fullName: "マンション管理士試験",
    domain: "real-estate",
    administrator: "公益財団法人マンション管理センター",
    officialQuestionsUrl: "https://www.mankan.org/kakomondai.html",
    officialReuseTermsUrl: "https://www.mankan.org/kakomondai.html",
    status: "live",
    reuseSummary: "公式問題PDF・正答PDFと照合した問題を年度別に収録。出典を明記し、各問に過去問AIの独自解説を掲載。",
    attributionTemplate: "出典：令和○年度 マンション管理士試験 問○（公益財団法人マンション管理センター）",
    remainingWork: ["令和6年度問40（建築物省エネ法の増築届出基準）は公式正解の法的根拠に一次資料で到達できず保留", "令和8年度試験の公表後に追加を検討"],
},
  {

    slug: "kashikin",

    examCode: "kashikin",

    shortName: "貸金業務取扱主任者",

    fullName: "貸金業務取扱主任者資格試験",

    domain: "finance",

    administrator: "一般社団法人日本貸金業協会",

    officialQuestionsUrl: "https://www.j-fsa.or.jp/chief/qualifying_exam/exam_example/",

    officialReuseTermsUrl: "https://www.j-fsa.or.jp/chief/qualifying_exam/exam_example/",

    status: "live",

    reuseSummary: "第20回（令和7年度）・第19回（令和6年度）の全50問を公式問題PDF・正答PDFと照合して収録。日本貸金業協会に明示の転載条件はなく、衛生管理者・技術士総合技術監理部門と同様に出典を明記し、解説が独自作成で同協会と無関係であることを各問に表示する。",

    attributionTemplate: "出典：一般社団法人日本貸金業協会 令和○年度（第○回）貸金業務取扱主任者資格試験問題（問題・正答）問○",

    remainingWork: ["各回の問題冊子が示す基準日（試験実施日）より後の法改正は別途更新確認"],

},
  {
    slug: "chusho-kigyo-shindanshi",
    examCode: "chusho-kigyo-shindanshi",
    shortName: "中小企業診断士",
    fullName: "中小企業診断士 第1次試験",
    domain: "accounting",
    administrator: "一般社団法人 日本中小企業診断士協会連合会",
    officialQuestionsUrl: "https://www.jf-cmca.jp/contents/010_c_/shikenmondai.html",
    officialReuseTermsUrl: "https://www.jf-cmca.jp/contents/017_houtekijikou.html",
    status: "live",
    reuseSummary: "2025・2026年度の第1次試験全7科目と2024年度の財務・会計、経営情報システム、計465原問・504解答単位・2314選択肢を公式問題・正答に照合。問題と正答の出典は試験実施団体、解説は当サイトの独自作成。",
    attributionTemplate: "出典：一般社団法人 日本中小企業診断士協会連合会 令和○年度 中小企業診断士 第1次試験 ○科目 問○（問題・正答）",
    remainingWork: ["2024年度の経済学・経済政策、企業経営理論、運営管理、経営法務、中小企業経営・中小企業政策の補充"],
},
  {
    slug: "sharoushi",
    examCode: "sharoushi",
    shortName: "社会保険労務士",
    fullName: "社会保険労務士試験",
    domain: "legal",
    administrator: "全国社会保険労務士会連合会 試験センター",
    officialQuestionsUrl: "https://www.sharosi-siken.or.jp/results/",
    officialReuseTermsUrl: "https://www.sharosi-siken.or.jp/results/",
    status: "live",
    reuseSummary: "第58・57回の択一式130原問と、第56回（令和6年度）の労働基準法・労働安全衛生法全10原問を収録。択一式140原問・全700肢の解説、別掲載の選択式16原問・80空欄を演習できます。第56回は択一式70問中10問の部分収録で、基準日2024年4月12日の法令を確認しています。出典と試験時点を各問に表示し、解説は過去問AIの独自作成です。",
    attributionTemplate: "出典：全国社会保険労務士会連合会 試験センター 第○回（令和○年度）社会保険労務士試験 択一式・選択式（加工・解説）",
    remainingWork: ["未収録10原問（択一式のみ）の原典・正答・試験時点資料を確認", "第56回の労基・安衛に続く科目の原典・正答・試験時点資料を確認"],
  },
  {
    slug: "sagyo-ryohoshi",
    examCode: "sagyo-ryohoshi",
    shortName: "作業療法士",
    fullName: "作業療法士国家試験",
    domain: "welfare",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/tp260424-08_09.html",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "第61回午前99問（採点除外1問を除く全問）を含む364問を収録。第60・61回の午前・午後を学べます。公式問題・正答・全肢解説と原本図を確認できます。第60回午後98・第61回午前42は公式採点除外です。",
    remainingWork: ["第58回の午前と第61・60回の未収録問題の公式原本を確認"],
},
  {
    slug: "gengo-chokakushi",
    examCode: "gengo-chokakushi",
    shortName: "言語聴覚士",
    fullName: "言語聴覚士国家試験",
    domain: "welfare",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken21/about.html",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "厚生労働省の採点通知に掲載された第25・26回の部分収録です。複数正答は公式の正答表に従っています。",
    remainingWork: ["公式問題本冊の原文・図表と正答の照合"],
  },
  {
    slug: "shino-kunrenshi",
    examCode: "shino-kunrenshi",
    shortName: "視能訓練士",
    fullName: "視能訓練士国家試験",
    domain: "welfare",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/tp260424-10.html",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "第54回午前の採点対象74問と、第55・56回の午前・午後の計294問を収録。全肢解説付き。出典は厚生労働省。",
    remainingWork: ["第53回午後と第56・55回の未収録問題の原本・正答照合", "第56回午前と第55回の未収録問題の原文・別冊図・専門根拠を確認", "第56回の午前・午後と第55回の午前の残りを補充"],
},
  {
    slug: "rinsho-kogishi",
    examCode: "rinsho-kogishi",
    shortName: "臨床工学技士",
    fullName: "臨床工学技士国家試験",
    domain: "welfare",
    administrator: "公益財団法人 医療機器センター",
    officialQuestionsUrl: "https://www.jaame.or.jp/ce/past-test.html",
    officialReuseTermsUrl: "https://www.jaame.or.jp/privacy.html",
    status: "live",
    reuseSummary: "第35〜39回の午前・午後を計900問収録。医療機器センターの公式問題・正答と学習用解説を確認できます。",
    remainingWork: ["午前・午後の未収録問題と専門根拠・図の局所確認", "両回の未収録問題", "掲載可否はオーナー確認"],
},
  {
    slug: "hokenshi",
    examCode: "hokenshi",
    shortName: "保健師",
    fullName: "保健師国家試験",
    domain: "welfare",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/tp260424-03_04_05.html",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "第112・111回の午前・午後を各110問、計220問収録。過年度の問題も、公式原文・正答と各選択肢の解説で学べます。",
    remainingWork: ["第113回以降の公式公表資料を確認"],
},
  {
    slug: "josanshi",
    examCode: "josanshi",
    shortName: "助産師",
    fullName: "助産師国家試験",
    domain: "welfare",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/tp260424-03_04_05.html",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "第106回午前は採点除外1問を除く54問を収録。第107・105回の午前は各10問を部分収録。第109・108回の午前・午後、計220原問のうち採点対象219問を収録。第109回は午前55問・午後54問、第108回は午前55問・午後55問です。公式原文・正答、共通事例、全選択肢の理由と原本図を確認できます。第109回午後問31は厚生労働省が採点対象から除外したため、公式正答を設定せず演習から除外しています。",
    attributionTemplate: "出典：厚生労働省「第○回助産師国家試験」午前・午後 問○（問題・正答）。解説は独自作成です。",
    remainingWork: ["過年度の未収録問題は原文・正答・全肢解説・必要図の確認待ち", "第109回午後問31（採点除外）の未採点表示は未実装"],
},
  {
    slug: "rigaku-ryohoshi",
    examCode: "rigaku-ryohoshi",
    shortName: "理学療法士",
    fullName: "理学療法士国家試験",
    domain: "welfare",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-08a_01.pdf",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "第61回は午前の採点対象全99問と午後74問、第60回は午前25問と午後62問、第59〜57回は午前から各10問を収録。原文・公式正答・全五肢の解説付き。",
    attributionTemplate: "出典：厚生労働省「第○回理学療法士国家試験」午前・午後 問○（問題・正答）。解説は独自作成です。",
    remainingWork: ["未収録問の原文・公式正答・図表・説明根拠の確認", "第60回午後問31の公式代替正答の採点形式確認"],
},
  {
    slug: "kangoshi",
    examCode: "kangoshi",
    shortName: "看護師",
    fullName: "看護師国家試験",
    domain: "welfare",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/tp260424-03_04_05.html",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "第115・114回は計479原問を収録。第115回は午前119問・午後120問、第114回は午前120問・午後120問です。過年度の原問も収録しています。第115回午前 問32は厚生労働省が採点対象から除外したため収録していません。",
    attributionTemplate: "出典：厚生労働省「第○回看護師国家試験」午前 問○（問題・正答）",
    remainingWork: ["過年度の未収録問題は原文・正答・全肢解説・必要図の確認待ち", "第115回午前 問32（採点除外）は未採点表示の実装まで未収録"],
},
  {
    slug: "yakuzaishi",
    examCode: "yakuzaishi",
    shortName: "薬剤師",
    fullName: "薬剤師国家試験",
    domain: "pharmacy",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/content/001677927.pdf",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "第110回1日目③の薬学理論45問や第108回2日目②の薬学実践40問など、計407原問を収録。厚生労働省の公式問題・最終正答と全肢解説付き。",
    attributionTemplate: "出典：厚生労働省「第○回薬剤師国家試験」問○（問題・最終正答）",
    remainingWork: ["一般掲載可否のオーナー確認", "未収録問題の出典・図表・共通症例・計算の確認", "後着10問の根拠・解説差分を保持"],
},
  {
    slug: "ahaki-anma",
    examCode: "ahaki-anma",
    shortName: "あん摩マッサージ指圧師",
    fullName: "あん摩マッサージ指圧師国家試験",
    domain: "welfare",
    administrator: "公益財団法人東洋療法研修試験財団",
    officialQuestionsUrl: "https://ahaki.or.jp/wordpress/wp-content/uploads/mondai_34_anma_am.pdf",
    officialReuseTermsUrl: "https://ahaki.or.jp/wordpress/wp-content/uploads/mondai_34_anma_am.pdf",
    status: "live",
    reuseSummary: "第34回全160問、第33回159問の計319原問を収録。公式正答と全選択肢の独自解説を掲載。",
    attributionTemplate: "出典：公益財団法人東洋療法研修試験財団 第○回あん摩マッサージ指圧師国家試験 午前・午後 問○（問題・正答）",
    remainingWork: ["第34回の未掲載1原問の収録", "第34・33回の未収録2問と第32回午前の原文・正答を確認"],
},
  {
    slug: "ahaki-hari-kyu",
    examCode: "ahaki-hari-kyu",
    shortName: "はり師・きゅう師",
    fullName: "はり師・きゅう師国家試験",
    domain: "welfare",
    administrator: "公益財団法人東洋療法研修試験財団",
    officialQuestionsUrl: "https://ahaki.or.jp/wordpress/wp-content/uploads/mondai_34_harikyu_am.pdf",
    officialReuseTermsUrl: "https://ahaki.or.jp/wordpress/wp-content/uploads/mondai_34_harikyu_am.pdf",
    status: "live",
    reuseSummary: "第34・33回の午前・午後と第30回午前の公式問題を収録。午後の問161〜170ははり師専用、171〜180はきゅう師専用です。全肢解説付き。",
    attributionTemplate: "出典：公益財団法人東洋療法研修試験財団 第○回はり師・きゅう師国家試験 午前・午後 問○（問題・正答）",
    remainingWork: [],
},
  {
    slug: "shika-ishi",
    examCode: "shika-ishi",
    shortName: "歯科医師",
    fullName: "歯科医師国家試験",
    domain: "welfare",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/tp260424-02.html",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "第119回（2026年）・第118回（2025年）のA〜D、計720原問のうち採点対象696問を収録。第117回（2024年）のA問題は採点対象88問を収録し、公式採点除外2問の原文と取扱いを保存しています。第116・115回（2023・2022年）はA問題を各10問部分収録。公式原文・正答、全肢解説と原本図を確認できます。並べ替えと数値記入は原問の解答形式で採点します。",
    attributionTemplate: "出典：厚生労働省『第○回歯科医師国家試験』問題・正答。解説は当サイトの独自作成です。",
    remainingWork: ["次回公表分の追加", "公式訂正・診療指針改訂の継続確認"],
},
  {

    slug: "gas-kou", examCode: "gas-kou", shortName: "ガス主任技術者 甲種", fullName: "ガス主任技術者試験（甲種）",

    domain: "safety", administrator: "一般財団法人日本ガス機器検査協会",

    officialQuestionsUrl: "https://www.jia-page.or.jp/exam/examination/answer/",

    officialReuseTermsUrl: "https://www.jia-page.or.jp/exam/examination/answer/",

    status: "live",

    reuseSummary: "令和8・7年度の法令・基礎・ガス技術から原本・正答・全肢解説を確認した問題を収録。問題と正答の出典は日本ガス機器検査協会、解説は独自作成。",

    attributionTemplate: "出典：一般財団法人日本ガス機器検査協会 ガス主任技術者試験（甲種、年度・科目・問番号）",

    remainingWork: ["法令改正に伴う解説の継続確認"],

},
  {

    slug: "gas-otsu", examCode: "gas-otsu", shortName: "ガス主任技術者 乙種", fullName: "ガス主任技術者試験（乙種）",

    domain: "safety", administrator: "一般財団法人日本ガス機器検査協会",

    officialQuestionsUrl: "https://www.jia-page.or.jp/exam/examination/answer/",

    officialReuseTermsUrl: "https://www.jia-page.or.jp/exam/examination/answer/",

    status: "live",

    reuseSummary: "令和8・7年度の法令・基礎・ガス技術から原本・正答・全肢解説を確認した問題を収録。問題と正答の出典は日本ガス機器検査協会、解説は独自作成。",

    attributionTemplate: "出典：一般財団法人日本ガス機器検査協会 ガス主任技術者試験（乙種、年度・科目・問番号）",

    remainingWork: ["法令改正に伴う解説の継続確認"],

},
  {

    slug: "gas-hei", examCode: "gas-hei", shortName: "ガス主任技術者 丙種", fullName: "ガス主任技術者試験（丙種）",

    domain: "safety", administrator: "一般財団法人日本ガス機器検査協会",

    officialQuestionsUrl: "https://www.jia-page.or.jp/exam/examination/answer/",

    officialReuseTermsUrl: "https://www.jia-page.or.jp/exam/examination/answer/",

    status: "live",

    reuseSummary: "令和8・7年度の法令・基礎・ガス技術から原本・正答・全肢解説を確認した問題を収録。問題と正答の出典は日本ガス機器検査協会、解説は独自作成。",

    attributionTemplate: "出典：一般財団法人日本ガス機器検査協会 ガス主任技術者試験（丙種、年度・科目・問番号）",

    remainingWork: ["法令改正に伴う解説の継続確認"],

},
  {
    slug: "rinsho-kensagishi",
    examCode: "rinsho-kensagishi",
    shortName: "臨床検査技師",
    fullName: "臨床検査技師国家試験",
    domain: "welfare",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-07b_01.pdf",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "第71・72回（2025・2026年実施）の午前・午後から、原文・公式正答・全五肢の学習用解説と照合した115原問を部分収録。必要な公式原図も掲載しています。残りの未収録原問は出題対象外で、最新2回の全問は未完備です。解説は独自作成です。",
    remainingWork: ["第71回午後と第72回午前・午後の残問", "第68回の午後の補充", "第71・72回の午前・午後の残問"],
},
  {
    slug: "shinryo-hoshasengishi",
    examCode: "shinryo-hoshasengishi",
    shortName: "診療放射線技師",
    fullName: "診療放射線技師国家試験",
    domain: "welfare",
    administrator: "厚生労働省",
    officialQuestionsUrl: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-06b_01.pdf",
    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html",
    status: "live",
    reuseSummary: "第77・78回（2025・2026年実施）の午前・午後から、原文・公式正答・全五肢解説・必要図版を照合した398原問を収録。第77回は午前100・午後100問、第78回は午前98・午後100問です。第76回（2024年）の午前100問、第75・74回（2023・2022年）の午前各10問も収録しています。第78回午前23は公式に採点除外、午前15は公式別冊図が省略されているため出題対象に含めていません。解説は独自作成です。",
    remainingWork: ["第78回午前15の正規図版取得", "採点除外の第78回午前23は公式通知と原文を別保存"],
},
  {

    slug: "riyoshi", examCode: "riyoshi", shortName: "理容師", fullName: "理容師国家試験", domain: "personal-services",

    administrator: "公益財団法人理容師美容師試験研修センター",

    officialQuestionsUrl: "https://www.rbc.or.jp/exam/past_question/",

    officialReuseTermsUrl: "https://www.rbc.or.jp/exam/past_question/",

    status: "live",

    reuseSummary: "第52〜54回の筆記各55問、計165問・660肢解説と原図を保存。第52回は2025年、第53・54回は2026年実施。公式PDFの問題・正答を照合し、独自解説付きで収録しています。",

    attributionTemplate: "出典：公益財団法人理容師美容師試験研修センター 第○回理容師筆記試験 問○（問題・正答）。解説は独自作成。",

    remainingWork: [],

},
  {
    slug: "judo-seifukushi",
    examCode: "judo-seifukushi",
    shortName: "柔道整復師",
    fullName: "柔道整復師国家試験",
    domain: "welfare",
    administrator: "公益財団法人柔道整復研修試験財団",
    officialQuestionsUrl: "https://www.zaijusei.com/introduction_1_shiken.html",
    officialReuseTermsUrl: "https://www.zaijusei.com/introduction_1_shiken.html",
    status: "live",
    reuseSummary: "第34・33回の午前・午後各250問と、第32回の午前128問を収録。問題の出典は柔道整復研修試験財団、正答の出典は厚生労働省です。",
    attributionTemplate: "出典：公益財団法人柔道整復研修試験財団 第○回柔道整復師国家試験 午前・午後 問○（問題）／厚生労働省（最終正答）",
    remainingWork: ["第32回午前の原文と公式正答の照合", "法令・医療情報の改訂に伴う継続確認"],
  },
  {

    slug: "kenchikushi2", examCode: "kenchikushi2",

    shortName: "二級建築士",

    fullName: "二級建築士試験",

    domain: "construction",

    administrator: "公益財団法人建築技術教育普及センター",

    officialQuestionsUrl: "https://www.jaeic.or.jp/shiken/2k/2k-mondai.html",

    officialReuseTermsUrl: "https://www.jaeic.or.jp/shiken/2k/2k-mondai.html",

    status: "live",

    reuseSummary: "2025・2026年の学科I〜IV各年100問と、2024年の学科I（建築計画）全25問を収録。計225問の公式問題・正答と全肢の独自解説を確認できます。2024年は建築計画のみの収録で、法令の基準日は2024年1月1日です。問題・正答は公式原本、解説は過去問AIの独自作成です。",

    remainingWork: [],

  },
  {

    slug: "mokuzo-kenchikushi", examCode: "mokuzo-kenchikushi",

    shortName: "木造建築士（学科）",

    fullName: "木造建築士試験（学科の試験）",

    domain: "construction",

    administrator: "公益財団法人建築技術教育普及センター",

    officialQuestionsUrl: "https://www.jaeic.or.jp/shiken/mk/mk-mondai.html",

    officialReuseTermsUrl: "https://www.jaeic.or.jp/shiken/mk/mk-mondai.html",

    status: "live",

    reuseSummary: "2025・2026年の学科I〜IV各年100問と、2024年の学科I（建築計画）25問を収録。計225問の公式問題・正答と独自解説を確認できます。2024年の学科II〜IVと設計製図は対象外です。問題・正答は公式原本、解説は過去問AIの独自作成です。",

    remainingWork: [],

  },
  {
    slug: "zenkou-keisan-gijutsu",
    examCode: "zenkou-keisan-gijutsu",
    shortName: "計算技術検定",
    fullName: "計算技術検定試験",
    domain: "electrical",
    administrator: "公益社団法人全国工業高等学校長協会",
    officialQuestionsUrl: "https://zenkoukyo.or.jp/index_kentei/exam_result/",
    officialReuseTermsUrl: "https://zenkoukyo.or.jp/index_kentei/exam_result/",
    status: "live",
    reuseSummary: "第92〜94回の2〜4級、各級の全3種目198問を収録。公式の問題・正答と図表を使い、計算の手順を確認できます。",
    remainingWork: [],
  },
  {
    slug: "katei-shokumotsu",
    examCode: "katei-shokumotsu",
    shortName: "家庭科技術検定・食物調理",
    fullName: "全国高等学校家庭科食物調理技術検定",
    domain: "personal-services",
    administrator: "公益財団法人全国高等学校家庭科教育振興会",
    officialQuestionsUrl: "https://www.katei-ed.or.jp/past.html",
    officialReuseTermsUrl: "https://www.katei-ed.or.jp/past.html",
    status: "live",
    reuseSummary: "第61・62回の2級・準1級と第60回の旧3級・旧2級の筆記68大問を収録。公式の問題・正答と独自解説で学べます。",
    remainingWork: [],
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
  { slug: "kisho", examCode: "kisho", shortName: "気象予報士", fullName: "気象予報士試験",

    domain: "safety", administrator: "一般財団法人 気象業務支援センター",

    officialQuestionsUrl: "https://www.jmbsc.or.jp/jp/examination/examination-7.html",

    officialReuseTermsUrl: "https://www.jmbsc.or.jp/jp/examination/examination-7.html", status: "live",

    reuseSummary: "第65・66回の学科60問・全肢解説、実技18問・237回答欄を収録。実技は公式解答例・作図との手動照合です。",

    attributionTemplate: "出典：一般財団法人 気象業務支援センター 気象予報士試験問題・解答例。画像化・表記整理、解説は過去問AI作成。",

    remainingWork: [] },
  {

    slug: "kenchiku-setsubishi", examCode: "kenchiku-setsubishi", shortName: "建築設備士", fullName: "建築設備士試験（第一次試験）",

    domain: "construction", administrator: "公益財団法人建築技術教育普及センター",

    officialQuestionsUrl: "https://www.jaeic.or.jp/shiken/bmee/bmee-mondai.html",

    officialReuseTermsUrl: "https://www.jaeic.or.jp/shiken/bmee/bmee-mondai.html", status: "live",

    reuseSummary: "令和6年の建築一般知識27問と令和7・8年の第一次試験から236問を収録。全肢解説・原図付きで年度・科目別に演習できます。法令は各回の基準日時点の内容です。",

    attributionTemplate: "出典：公益財団法人建築技術教育普及センター 建築設備士第一次試験（年度・科目・問番号）。解説は当サイト独自作成。",

    remainingWork: ["令和8年建築法規問18の出題機関による訂正又は直接解釈の確認", "第二次試験は未収録"],

},
  {

    slug: "chizai2", examCode: "chizai2", shortName: "知的財産管理技能検定2級", fullName: "知的財産管理技能検定2級",

    domain: "legal", administrator: "知的財産教育協会",

    officialQuestionsUrl: "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon.html",

    officialReuseTermsUrl: "https://www.kentei-info-ip-edu.org/gakushujoho/kakomon.html",

    status: "live",

    reuseSummary: "第53回（2026年3月8日）・第54回（2026年7月12日）の学科・実技各40問、計160原問を収録。選択式158問の全651肢解説、数値記入2問と料金表を保持しています。法令は各試験回の基準日時点です。解説は独自作成です。",

    attributionTemplate: "出典：知的財産教育協会 第○回 知的財産管理技能検定2級 学科・実技 問○（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "jidosha-1-small-written", examCode: "jidosha-1-small-written", shortName: "一級小型自動車整備士（筆記）", fullName: "一級小型自動車整備士（筆記）", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和7年度第2回・令和6年度第2回の2回分、100原問を収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "jidosha-2-gasoline", examCode: "jidosha-2-gasoline", shortName: "二級ガソリン自動車整備士", fullName: "二級ガソリン自動車整備士", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和8年度第1回・令和7年度第2回の開催科目から、保存80原問中79問を部分収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。科目ごとの直近2回を揃えたものではありません。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: ["公式全員正解1原問は通常採点対象外"],

},
  {

    slug: "jidosha-2-diesel", examCode: "jidosha-2-diesel", shortName: "二級ジーゼル自動車整備士", fullName: "二級ジーゼル自動車整備士", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和8年度第1回・令和7年度第2回の開催科目から、保存80原問中80問を部分収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。科目ごとの直近2回を揃えたものではありません。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "jidosha-2-chassis", examCode: "jidosha-2-chassis", shortName: "二級自動車シャシ整備士", fullName: "二級自動車シャシ整備士", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和7年度第2回・令和6年度第2回の2回分、60原問を収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "jidosha-2-motorcycle", examCode: "jidosha-2-motorcycle", shortName: "二級二輪自動車整備士", fullName: "二級二輪自動車整備士", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和8年度第1回・令和7年度第1回の2回分、80原問を収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "jidosha-3-chassis", examCode: "jidosha-3-chassis", shortName: "三級自動車シャシ整備士", fullName: "三級自動車シャシ整備士", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和8年度第1回・令和7年度第2回の開催科目から、保存60原問中60問を部分収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。科目ごとの直近2回を揃えたものではありません。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "jidosha-3-gasoline", examCode: "jidosha-3-gasoline", shortName: "三級自動車ガソリン・エンジン整備士", fullName: "三級自動車ガソリン・エンジン整備士", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和8年度第1回・令和7年度第2回の開催科目から、保存60原問中60問を部分収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。科目ごとの直近2回を揃えたものではありません。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "jidosha-3-diesel", examCode: "jidosha-3-diesel", shortName: "三級自動車ジーゼル・エンジン整備士", fullName: "三級自動車ジーゼル・エンジン整備士", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和8年度第1回・令和7年度第2回の開催科目から、保存60原問中60問を部分収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。科目ごとの直近2回を揃えたものではありません。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "jidosha-3-motorcycle", examCode: "jidosha-3-motorcycle", shortName: "三級二輪自動車整備士", fullName: "三級二輪自動車整備士", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和7年度第2回・令和6年度第2回の2回分、60原問を収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "jidosha-body", examCode: "jidosha-body", shortName: "自動車車体整備士", fullName: "自動車車体整備士", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和8年度第1回・令和7年度第2回の開催科目から、保存80原問中79問を部分収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。科目ごとの直近2回を揃えたものではありません。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: ["未収録1原問の内容照合"],

},
  {

    slug: "jidosha-electrical", examCode: "jidosha-electrical", shortName: "自動車電気装置整備士", fullName: "自動車電気装置整備士", domain: "automotive",

    administrator: "一般社団法人日本自動車整備振興会連合会",

    officialQuestionsUrl: "https://www.jaspa.or.jp/mechanic/past/", officialReuseTermsUrl: "", status: "live",

    reuseSummary: "令和7年度第2回・令和6年度第2回の2回分、80原問を収録。公式問題・正答と全選択肢の解説、必要な原図を確認できます。法令は各試験日時点です。解説は独自作成です。",

    attributionTemplate: "出典：日本自動車整備振興会連合会 自動車整備技能登録試験（問題・正答）。解説は過去問AI独自作成。",

    remainingWork: [],

},
  {

    slug: "jokaso", examCode: "jokaso", shortName: "浄化槽管理士", fullName: "浄化槽管理士試験",

    domain: "construction", administrator: "公益財団法人日本環境整備教育センター",

    officialQuestionsUrl: "https://www.jeces.or.jp/pages/27/",

    officialReuseTermsUrl: "https://www.jeces.or.jp/pages/132/", status: "live",

    reuseSummary: "令和8・7年度の午前・午後各40問、計160問を収録。公式正答、全選択肢の独自解説と必要な図を確認できます。法令は出題時点の内容です。",

    attributionTemplate: "出典：公益財団法人日本環境整備教育センター 浄化槽管理士試験 問題・正答。解説は過去問AI作成。",

    remainingWork: [],

},
  {

    slug: "iji-shuzen", examCode: "iji-shuzen",

    shortName: "マンション維持修繕技術者", fullName: "マンション維持修繕技術者試験",

    domain: "real-estate", administrator: "一般社団法人マンション管理業協会",

    officialQuestionsUrl: "https://www.kanrikyo.or.jp/iji/siken.html",

    officialReuseTermsUrl: "https://www.kanrikyo.or.jp/kanri/pdf/kakomonshiyou.pdf",

    status: "live",

    reuseSummary: "第25回（2025年度）・第24回（2024年度）の各択一45問・記述2問、計94原問を収録。公式正答・全選択肢の独自解説・記述式の公式正解例を保持。法令は各年度4月1日時点。",

    attributionTemplate: "出典：一般社団法人マンション管理業協会 マンション維持修繕技術者試験 問題・正答。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {
    slug: "sekou-1denki", examCode: "denki1",
    shortName: "1級電気工事施工管理", fullName: "1級電気工事施工管理技術検定（第一次検定）",
    domain: "construction", administrator: "一般財団法人建設業振興基金",
    officialQuestionsUrl: "https://www.fcip-shiken.jp/about/index.html",
    officialReuseTermsUrl: "https://www.fcip-shiken.jp/about/index.html",
    status: "live",
    reuseSummary: "令和8・7・3年度の第一次検定を収録。公式正答、全肢の解説と原本図で学べます。",
    attributionTemplate: "出典：一般財団法人建設業振興基金 1級電気工事施工管理技術検定 第一次検定。解説は過去問AI作成。",
    remainingWork: [],
},
  {

    slug: "shuwa", examCode: "shuwa", shortName: "手話通訳士", fullName: "手話通訳士（学科試験）",

    domain: "welfare", administrator: "社会福祉法人聴力障害者情報文化センター",

    officialQuestionsUrl: "https://www.jyoubun-center.or.jp/slit/exam/past-exam/",

    officialReuseTermsUrl: "https://www.jyoubun-center.or.jp/slit/exam/past-exam/",

    status: "live",

    reuseSummary: "第37回（令和8年度）・第36回（令和7年度）の学科試験160問を収録。公式問題・正答と全選択肢の独自解説を確認できます。法令に関する設問は出題時点の法令に基づきます。",

    attributionTemplate: "出典：社会福祉法人聴力障害者情報文化センター 手話通訳技能認定試験（手話通訳士試験）学科試験問題・正答。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "jken-katsuyo3", examCode: "jken-katsuyo3", shortName: "J検 情報活用3級", fullName: "情報検定（J検）情報活用3級",

    domain: "information-technology", administrator: "一般財団法人職業教育・キャリア教育財団",

    officialQuestionsUrl: "https://www.jken.sgec.or.jp/docs/past_test.html",

    officialReuseTermsUrl: "https://www.jken.sgec.or.jp/docs/past_test.html",

    status: "live",

    reuseSummary: "令和8年度前期・令和7年度後期の公式問題・正答を収録。解答欄ごとに演習できます。解説は独自作成です。",

    attributionTemplate: "出典：一般財団法人職業教育・キャリア教育財団 情報検定（J検）情報活用試験。問題・正答は公式公表資料、解説は過去問AI作成。",

    remainingWork: [],

},
  {

    slug: "jken-katsuyo2", examCode: "jken-katsuyo2", shortName: "J検 情報活用2級", fullName: "情報検定（J検）情報活用2級",

    domain: "information-technology", administrator: "一般財団法人職業教育・キャリア教育財団",

    officialQuestionsUrl: "https://www.jken.sgec.or.jp/docs/past_test.html",

    officialReuseTermsUrl: "https://www.jken.sgec.or.jp/docs/past_test.html",

    status: "live",

    reuseSummary: "令和8年度前期・令和7年度後期の公式問題・正答を収録。解答欄ごとに演習できます。解説は独自作成です。",

    attributionTemplate: "出典：一般財団法人職業教育・キャリア教育財団 情報検定（J検）情報活用試験。問題・正答は公式公表資料、解説は過去問AI作成。",

    remainingWork: [],

},
  {
    slug: "jobpass3", examCode: "jobpass3", shortName: "ジョブパス 3級", fullName: "ビジネス能力検定 ジョブパス 3級",
    domain: "personal-services", administrator: "一般財団法人職業教育・キャリア教育財団",
    officialQuestionsUrl: "https://bken.sgec.or.jp/about/problem.html",
    officialReuseTermsUrl: "https://bken.sgec.or.jp/about/problem.html",
    status: "live",
    reuseSummary: "2025年度前期の公式問題35問と正答を収録。",
    attributionTemplate: "出典：一般財団法人職業教育・キャリア教育財団 令和7年度前期 ビジネス能力検定 ジョブパス 3級（ペーパー方式）",
    remainingWork: [],
  },
  {

    slug: "jken-katsuyo1", examCode: "jken-katsuyo1", shortName: "J検 情報活用1級", fullName: "情報検定（J検）情報活用1級",

    domain: "information-technology", administrator: "一般財団法人職業教育・キャリア教育財団",

    officialQuestionsUrl: "https://www.jken.sgec.or.jp/docs/past_test.html",

    officialReuseTermsUrl: "https://www.jken.sgec.or.jp/docs/past_test.html",

    status: "live",

    reuseSummary: "令和8年度前期・令和7年度後期の公式問題・正答を収録。解答欄ごとに演習できます。解説は独自作成です。",

    attributionTemplate: "出典：一般財団法人職業教育・キャリア教育財団 情報検定（J検）情報活用試験。問題・正答は公式公表資料、解説は過去問AI作成。",

    remainingWork: [],

},
  {
    slug: "jobpass",
    examCode: "jobpass",
    shortName: "ジョブパス2級",
    fullName: "ビジネス能力検定 ジョブパス2級",
    domain: "personal-services",
    administrator: "一般財団法人職業教育・キャリア教育財団",
    officialQuestionsUrl: "https://bken.sgec.or.jp/about/problem.html",
    officialReuseTermsUrl: "https://bken.sgec.or.jp/about/problem.html",
    status: "live",
    reuseSummary: "2025年度前期ペーパー方式の公式問題・正答30問を収録。",
    attributionTemplate: "出典：職業教育・キャリア教育財団。",
    remainingWork: [],
  },
  {

    slug: "jken-system", examCode: "jken-system", shortName: "J検 情報システム",

    fullName: "情報検定（J検）情報システム 基本スキル・プログラミングスキル・システムデザインスキル",

    domain: "information-technology", administrator: "一般財団法人職業教育・キャリア教育財団",

    officialQuestionsUrl: "https://www.jken.sgec.or.jp/docs/past_test.html",

    officialReuseTermsUrl: "https://www.jken.sgec.or.jp/docs/past_test.html",

    status: "live",

    reuseSummary: "令和8年度前期（2026年9月13日）・令和7年度後期（2026年2月8日）の3スキル全30大問・227解答欄を収録。問題と正答は公式PDFに基づき、解答欄ごとに演習できます。解説は独自作成です。",

    attributionTemplate: "出典：一般財団法人職業教育・キャリア教育財団 情報検定 情報システム試験（実施回・スキル・大問・解答欄）。解説は独自作成。",

    remainingWork: [],

},
  {
    slug: "zensho-financial-statement-analysis", examCode: "zensho-financial-statement-analysis",
    shortName: "全商財務諸表分析検定", fullName: "全商財務諸表分析検定試験",
    domain: "accounting", administrator: "公益財団法人全国商業高等学校協会",
    officialQuestionsUrl: "https://zensho.or.jp/examination/pastexams/accounting/",
    officialReuseTermsUrl: "https://zensho.or.jp/examination/pastexams/accounting/",
    status: "live", reuseSummary: "第17回の5問を収録。公式の解答で自己確認できます。",
    remainingWork: [],
  },
  {
    slug: "katei-hifuku", examCode: "katei-hifuku", shortName: "被服製作技術検定", fullName: "家庭科技術検定・被服製作",
    domain: "personal-services", administrator: "公益財団法人全国高等学校家庭科教育振興会",
    officialQuestionsUrl: "https://www.katei-ed.or.jp/past.html",
    officialReuseTermsUrl: "https://www.katei-ed.or.jp/past.html",
    status: "live",
    reuseSummary: "2025年度 第62回の2級筆記を全12大問・19演習単位で収録。公式正答と原本図表、選択肢ごとの独自解説を確認できます。",
    remainingWork: [],
  },
  {
    slug: "zenkou-joho", examCode: "zenkou-joho", shortName: "情報技術検定", fullName: "情報技術検定",
    domain: "information-technology", administrator: "公益社団法人全国工業高等学校長協会",
    officialQuestionsUrl: "https://zenkoukyo.or.jp/index_kentei/exam_result/",
    officialReuseTermsUrl: "https://zenkoukyo.or.jp/index_kentei/exam_result/",
    status: "live",
    reuseSummary: "第74〜76回の各1級2区分・2級・3級を収録。公式の標準解答と原本図表、選択肢ごとの独自解説を確認できます。",
    remainingWork: [],
  },
  {
    slug: "shinrishi", examCode: "shinrishi", shortName: "公認心理師", fullName: "公認心理師試験",
    domain: "welfare", administrator: "一般財団法人公認心理師試験研修センター",
    officialQuestionsUrl: "https://www.jccpp.or.jp/shiken/shikenjoho/",
    officialReuseTermsUrl: "https://www.jccpp.or.jp/policy.html", status: "live",
    reuseSummary: "第5〜9回の午前・午後を収録。回ごとに公式問題・正答と学習用解説を確認できます。",
    attributionTemplate: "出典：一般財団法人公認心理師試験研修センター 公認心理師試験。解説は過去問AI独自作成。",
    remainingWork: [],
},
  {

    slug: "hoshasen",

    shortName: "放射線取扱主任者（第一種・第二種）",

    fullName: "第一種・第二種放射線取扱主任者試験",

    domain: "safety",

    administrator: "公益財団法人原子力安全技術センター",

    officialQuestionsUrl: "https://www.nustec.or.jp/syunin/syunin05.html",

    officialReuseTermsUrl: "https://www.nustec.or.jp/syunin/syunin05.html",

    status: "ready-to-ingest",

    reuseSummary: "令和8・7年度の両種の公式問題16本・正答4本を取得。第一種は両年度各132原問が揃い、第二種令和8年度74原問・令和7年度75原問と合わせ413原問・5,920肢解説を収録。多肢択一式34原問の438空欄を原問数に加算していません。添付正誤票・全員正解指定を反映。残りは第二種令和8年度化学問9の内容保留1原問で、全414原問完成ではありません。",

    attributionTemplate: "出典：公益財団法人原子力安全技術センター 令和○年度 第○種放射線取扱主任者試験（科目・問番号）。問題・正答は公式PDF、解説は独自作成。",

    remainingWork: ["第二種令和8年度化学問9は公式正答5を維持して保留。公式訂正又は肢1を排除できる十分な一次根拠が得られた場合のみ解除", "公開用の試験区分・科目設定とローダーへの接続（別途公開指示が必要）"],

},
  {

    slug: "khk-reito", shortName: "高圧ガス 冷凍機械", fullName: "高圧ガス製造保安責任者 第一種冷凍機械・第二種冷凍機械・第三種冷凍機械",

    domain: "safety", administrator: "高圧ガス保安協会 試験センター",

    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html",

    officialReuseTermsUrl: "https://www.khk.or.jp/condition.html", status: "ready-to-ingest",

    reuseSummary: "3資格の親slug。令和7・6年度の国家試験を対象に、資格別の未公開データとして準備する。転載・複製禁止文言は監査記録に保存し、2026-11-04のオーナー判断に基づき収録する。",

    remainingWork: ["資格別ステージングの公開切替（本タスクでは公開しない）"],

},
  {

    slug: "khk-reito-1", examCode: "khk-reito-1", shortName: "第一種冷凍機械",

    fullName: "高圧ガス製造保安責任者試験（第一種冷凍機械）", domain: "safety",

    administrator: "高圧ガス保安協会 試験センター",

    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html",

    officialReuseTermsUrl: "https://www.khk.or.jp/condition.html",

    status: "live",

    reuseSummary: "令和7・6年度80問を収録。公式公表問題・正答を出典とし、法令・保安管理技術の選択式と学識の記述式を学習できます。記述答案は公式解答例と手動で照合し、自動採点しません。",

    attributionTemplate: "出典：高圧ガス保安協会 令和○年度 第一種冷凍機械 ○科目 問○。解説は過去問AI独自作成。法令は出題時点。",

    remainingWork: [],

},
  {

    slug: "khk-reito-2", examCode: "khk-reito-2", shortName: "第二種冷凍機械",

    fullName: "高圧ガス製造保安責任者試験（第二種冷凍機械）", domain: "safety",

    administrator: "高圧ガス保安協会 試験センター",

    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html",

    officialReuseTermsUrl: "https://www.khk.or.jp/condition.html",

    status: "live",

    reuseSummary: "令和7・6年度80問を収録。公式公表問題・正答、全選択肢の独自解説と必要な図を確認できます。法令は出題時点の内容です。",

    attributionTemplate: "出典：高圧ガス保安協会 令和○年度 第二種冷凍機械 ○科目 問○。解説は過去問AI独自作成。法令は出題時点。",

    remainingWork: [],

},
  {

    slug: "khk-reito-3", examCode: "khk-reito-3", shortName: "第三種冷凍機械",

    fullName: "高圧ガス製造保安責任者試験（第三種冷凍機械）", domain: "safety",

    administrator: "高圧ガス保安協会 試験センター",

    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html",

    officialReuseTermsUrl: "https://www.khk.or.jp/condition.html",

    status: "live",

    reuseSummary: "令和7・6年度70問を収録。公式公表問題・正答、全選択肢の独自解説と必要な図を確認できます。法令は出題時点の内容です。",

    attributionTemplate: "出典：高圧ガス保安協会 令和○年度 第三種冷凍機械 ○科目 問○。解説は過去問AI独自作成。法令は出題時点。",

    remainingWork: [],

},
  {
    slug: "sekou-kenchiku2",
    examCode: "sekou-kenchiku2",
    shortName: "2級建築施工管理（第一次検定）",
    fullName: "2級建築施工管理技術検定（第一次検定）",
    domain: "construction",
    administrator: "一般財団法人建設業振興基金",
    officialQuestionsUrl: "https://www.fcip-shiken.jp/about/",
    officialReuseTermsUrl: "https://www.fcip-shiken.jp/about/",
    status: "live",
    reuseSummary: "令和8年度前期・令和7年度後期・令和4年度後期の各50問、計150問。公式正答、全選択肢の解説、図を収録。",
    attributionTemplate: "出典：一般財団法人建設業振興基金 2級建築施工管理技術検定（第一次検定）令和○年度（前期／後期）No.○。解説は本サイト作成。",
    remainingWork: [],
},
  {
    slug: "sekou-2denki", examCode: "denki2",
    shortName: "2級電気工事施工管理", fullName: "2級電気工事施工管理技術検定（第一次検定）",
    domain: "construction", administrator: "一般財団法人建設業振興基金",
    officialQuestionsUrl: "https://www.fcip-shiken.jp/about/index.html",
    officialReuseTermsUrl: "https://www.fcip-shiken.jp/about/index.html",
    status: "live",
    reuseSummary: "令和8年度前期・後期と令和7年度後期の各62問を収録。公式正答、全選択肢の解説、問題の図を掲載。法令・規程は出題時点に基づく。",
    attributionTemplate: "出典：一般財団法人建設業振興基金 2級電気工事施工管理技術検定 第一次検定。解説は過去問AI作成。",
    remainingWork: ["監督役による独立レビュー", "依存パッケージ導入後のpnpm検証", "公開判定"],
},
  {

    slug: "sekou-1kankoji", examCode: "kankoji1",

    shortName: "1級管工事施工管理", fullName: "1級管工事施工管理技術検定（第一次検定）",

    domain: "construction", administrator: "一般財団法人全国建設研修センター",

    officialQuestionsUrl: "https://www.jctc.jp/mondai/", officialReuseTermsUrl: "https://www.jctc.jp/mondai/",

    status: "live",

    reuseSummary: "令和8年度の全73問（A44・B29）、訂正後公式正答、必要図、全肢解説を収録。令和7年度は公式掲載終了・旧URL404のため除外。",

    attributionTemplate: "出典：一般財団法人全国建設研修センター 令和8年度1級管工事施工管理技術検定 第一次検定 問題A／B。解説は過去問AI作成。",

    remainingWork: ["監督役による独立レビューと公開判断"],

},
  {

    slug: "yamaguchi-fugu", examCode: "yamaguchi-fugu", shortName: "ふぐ処理師（学科）", fullName: "ふぐ処理師（学科）",

    domain: "personal-services", administrator: "山口県 生活衛生課",

    officialQuestionsUrl: "https://www.pref.yamaguchi.lg.jp/site/syoku-anshin/320296.html",

    officialReuseTermsUrl: "https://www.pref.yamaguchi.lg.jp/soshiki/21/26951.html",

    status: "live",

    reuseSummary: "令和8・7年の公表問題・正答を保存。解説は独自作成、法令は各出題時点。",

    attributionTemplate: "出典：山口県 生活衛生課 ふぐ処理師（学科） 問題・正答。テキスト整形・図の切出し・解説は過去問AIが作成。",

    remainingWork: ["監督役による独立レビューと公開判断"],

},
  {

    slug: "yamaguchi-seika", examCode: "yamaguchi-seika", shortName: "製菓衛生師", fullName: "製菓衛生師",

    domain: "personal-services", administrator: "山口県 生活衛生課",

    officialQuestionsUrl: "https://www.pref.yamaguchi.lg.jp/site/syoku-anshin/320296.html",

    officialReuseTermsUrl: "https://www.pref.yamaguchi.lg.jp/soshiki/21/26951.html",

    status: "live",

    reuseSummary: "令和8・7年の公表問題・正答を保存。解説は独自作成、法令は各出題時点。",

    attributionTemplate: "出典：山口県 生活衛生課 製菓衛生師 問題・正答。テキスト整形・図の切出し・解説は過去問AIが作成。",

    remainingWork: ["監督役による独立レビューと公開判断"],

},
  {

    slug: "yamaguchi-chori", examCode: "yamaguchi-chori", shortName: "調理師", fullName: "調理師",

    domain: "personal-services", administrator: "山口県 生活衛生課",

    officialQuestionsUrl: "https://www.pref.yamaguchi.lg.jp/site/syoku-anshin/320296.html",

    officialReuseTermsUrl: "https://www.pref.yamaguchi.lg.jp/soshiki/21/26951.html",

    status: "live",

    reuseSummary: "令和8・7年の公表問題・正答を保存。解説は独自作成、法令は各出題時点。",

    attributionTemplate: "出典：山口県 生活衛生課 調理師 問題・正答。テキスト整形・図の切出し・解説は過去問AIが作成。",

    remainingWork: ["監督役による独立レビューと公開判断"],

},
  {

    slug: "kenki2", examCode: "kenki2", shortName: "2級建設機械施工管理",

    fullName: "2級建設機械施工管理技術検定（第一次検定）", domain: "construction",

    administrator: "一般社団法人日本建設機械施工協会",

    officialQuestionsUrl: "https://jcmanet-shiken.jp/kako-shiken-mondai/",

    officialReuseTermsUrl: "https://jcmanet.or.jp/kentei/", status: "live",

    reuseSummary: "令和8・7年度の共通各32問・第1〜6種各20問、計304問を非公開で準備。公式正答・全肢解説・必要図を保存。法規は出題時点の法令。",

    remainingWork: ["監督側による独立レビューと指摘修正後の合格確認"],

},
  {

    slug: "kenki1", examCode: "kenki1", shortName: "1級建設機械施工管理",

    fullName: "1級建設機械施工管理技術検定（第一次検定）", domain: "construction",

    administrator: "一般社団法人日本建設機械施工協会",

    officialQuestionsUrl: "https://jcmanet-shiken.jp/kako-shiken-mondai/",

    officialReuseTermsUrl: "https://jcmanet.or.jp/kentei/", status: "live",

    reuseSummary: "令和8・7年度の第一次検定各56問、計112問を非公開で準備。公式問題・正答と全肢解説・必要図を保存。法規は出題時点の法令。",

    remainingWork: ["監督側による独立レビューと指摘修正後の合格確認"],

},
  {
    slug: "gyosei", examCode: "gyosei", shortName: "行政書士", fullName: "行政書士試験",
    domain: "legal", administrator: "一般財団法人行政書士試験研究センター",
    officialQuestionsUrl: "https://gyosei-shiken.or.jp/doc/exam/",
    officialReuseTermsUrl: "https://gyosei-shiken.or.jp/doc/exam/",
    status: "live",
    reuseSummary: "令和5〜7年度の公式公開166問を収録。択一は全肢解説、多肢選択は全語群解説、記述式は公式正解例で自己確認できます。",
    remainingWork: [],
},
  {
    slug: "shihoshoshi", examCode: "shihoshoshi", shortName: "司法書士", fullName: "司法書士試験（午前・午後の多肢択一式）",
    domain: "legal", administrator: "法務省",
    officialQuestionsUrl: "https://www.moj.go.jp/shikaku_saiyo_index3.html",
    officialReuseTermsUrl: "https://www.moj.go.jp/hisho06_00280.html",
    status: "live",
    reuseSummary: "令和8・7年度の午前・午後の択一139問を保存。令和7年度午後第33問は公式に全員正解のため通常採点から除外。全選択肢の独自解説に差し替え、バッチ1の固定台帳どおり129問を演習できます。第3回レビュー時点の保留10問は公開・採点から除外したままです。",
    attributionTemplate: "出典：法務省 令和○年度司法書士試験 午前・午後 第○問。解説は過去問AIが独自作成。",
    remainingWork: ["バッチ1対象外の保留10問の公開範囲を別途判断", "令和7年度の公式法令基準日の確認（問題PDFは403で取得不能）", "公式PDFと問題文・図表の公開前最終照合", "独立レビューのFAIL指摘への修正内容の再レビュー合格", "指定の質問検証・型検査・関連テストの完了"],
},
  {
    slug: "khk-hanbai", examCode: "khk-hanbai", shortName: "高圧ガス販売主任者 第一種", fullName: "高圧ガス販売主任者 第一種",
    domain: "safety", administrator: "高圧ガス保安協会",
    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html", officialReuseTermsUrl: "https://www.khk.or.jp/condition.html",
    status: "live", reuseSummary: "2022〜2026年度の公式問題・正答200問を収録。全肢解説付き。", remainingWork: [],
  },
  {
    slug: "khk-hanbai2", examCode: "khk-hanbai2", shortName: "高圧ガス販売主任者 第二種", fullName: "高圧ガス販売主任者 第二種",
    domain: "safety", administrator: "高圧ガス保安協会",
    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html", officialReuseTermsUrl: "https://www.khk.or.jp/condition.html",
    status: "live", reuseSummary: "2022〜2026年度の公式問題・正答200問を収録。全肢解説付き。", remainingWork: [],
  },
  {

    slug: "khk-setsubishi", shortName: "液化石油ガス設備士（学科）", fullName: "液化石油ガス設備士試験（学科）",

    domain: "safety", administrator: "高圧ガス保安協会",

    officialQuestionsUrl: "https://shiken.khk.or.jp/shiken.html", officialReuseTermsUrl: "https://www.khk.or.jp/condition.html",

    status: "ready-to-ingest", stagingDataPath: "data/qualification-staging/khk-hanbai",

    reuseSummary: "令和7・6年度の法令30問・配管理論等40問、計70問を未公開stagingに保存。",

    remainingWork: ["publicAllowed=falseで維持", "公開する場合は別途統合・公開判断が必要（配管理論等は図・早見表の画像表示が必要）"],

},
  {

    slug: "kensetsu-kikai-seibi2", examCode: "kensetsu-kikai-seibi2", shortName: "建設機械整備技能士 2級", fullName: "技能検定 2級建設機械整備（建設機械整備作業）学科試験",

    domain: "construction", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説、図5問の原本画像11点を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 2級建設機械整備（建設機械整備作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "hyoso1", examCode: "hyoso1", shortName: "表装技能士 1級", fullName: "技能検定 1級表装（表具作業）学科試験",

    domain: "construction", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説、図3問の原本画像3点を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 1級表装（表具作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "tairu2", examCode: "tairu2", shortName: "タイル張り技能士 2級", fullName: "技能検定 2級タイル張り（タイル張り作業）学科試験",

    domain: "construction", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説、図5問の原本画像5点を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 2級タイル張り（タイル張り作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "sekizai1", examCode: "sekizai1", shortName: "石材施工技能士 1級", fullName: "技能検定 1級石材施工（石張り作業）学科試験",

    domain: "construction", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説、図4問の原本画像4点を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 1級石材施工（石張り作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "hyoso2", examCode: "hyoso2", shortName: "表装技能士 2級", fullName: "技能検定 2級表装（表具作業）学科試験",

    domain: "construction", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説、図6問の原本画像12点を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 2級表装（表具作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "shohin-soshoku3", examCode: "shohin-soshoku3", shortName: "商品装飾展示技能士 3級", fullName: "技能検定 3級商品装飾展示（商品装飾展示作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科30問（真偽法30問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 3級商品装飾展示（商品装飾展示作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "shashin1", examCode: "shashin1", shortName: "写真技能士 1級", fullName: "技能検定 1級写真（肖像写真デジタル作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 1級写真（肖像写真デジタル作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "sessaku-kensaku1", examCode: "sessaku-kensaku1", shortName: "切削工具研削技能士 1級", fullName: "技能検定 1級切削工具研削（工作機械用切削工具研削作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 1級切削工具研削（工作機械用切削工具研削作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "tatami1", examCode: "tatami1", shortName: "畳製作技能士 1級", fullName: "技能検定 1級畳製作（畳製作作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 1級畳製作（畳製作作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "funmatsu-yakin1", examCode: "funmatsu-yakin1", shortName: "粉末冶金技能士 1級", fullName: "技能検定 1級粉末冶金（成形・再圧縮作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 1級粉末冶金（成形・再圧縮作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "nunohaku1", examCode: "nunohaku1", shortName: "布はく縫製技能士 1級", fullName: "技能検定 1級布はく縫製（ワイシャツ製造作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 1級布はく縫製（ワイシャツ製造作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "kikinzoku-soshin1", examCode: "kikinzoku-soshin1", shortName: "貴金属装身具製作技能士 1級", fullName: "技能検定 1級貴金属装身具製作（貴金属装身具製作作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 1級貴金属装身具製作（貴金属装身具製作作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "shashin3", examCode: "shashin3", shortName: "写真技能士 3級", fullName: "技能検定 3級写真（肖像写真デジタル作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度後期の学科30問（真偽法30問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度後期 3級写真（肖像写真デジタル作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "kikinzoku-soshin3", examCode: "kikinzoku-soshin3", shortName: "貴金属装身具製作技能士 3級", fullName: "技能検定 3級貴金属装身具製作（貴金属装身具製作作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度後期の学科30問（真偽法30問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度後期 3級貴金属装身具製作（貴金属装身具製作作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "kikinzoku-soshin2", examCode: "kikinzoku-soshin2", shortName: "貴金属装身具製作技能士 2級", fullName: "技能検定 2級貴金属装身具製作（貴金属装身具製作作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 2級貴金属装身具製作（貴金属装身具製作作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "shashin2", examCode: "shashin2", shortName: "写真技能士 2級", fullName: "技能検定 2級写真（肖像写真デジタル作業）学科試験",

    domain: "safety", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2025年度前期の学科50問（真偽法25問・多肢択一法25問）、公式正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 令和7年度前期 2級写真（肖像写真デジタル作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {"slug": "kenchiku-bankin-duct2", "examCode": "kenchiku-bankin-duct2", "shortName": "建築板金技能士 2級（ダクト板金作業）", "fullName": "技能検定 2級建築板金（ダクト板金作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "前期学科の公式過去問、公式正答、全肢の独自解説と原図を収録。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "kinzoku-netsushori2", "examCode": "kinzoku-netsushori2", "shortName": "金属熱処理技能士 2級", "fullName": "技能検定 2級金属熱処理（一般熱処理作業）学科試験", "domain": "safety", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "flower2", "examCode": "flower2", "shortName": "フラワー装飾技能士 2級", "fullName": "技能検定 2級フラワー装飾（フラワー装飾作業）学科試験", "domain": "personal-services", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "tekko2", "examCode": "tekko2", "shortName": "鉄工技能士 2級", "fullName": "技能検定 2級鉄工（製缶作業）学科試験", "domain": "construction", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2023・2024・2025年度の学科150問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会。解説は過去問AIの独自作成。", "remainingWork": []},
  {

    slug: "denshi-kiki-kumitate2", examCode: "denshi-kiki-kumitate2", shortName: "電子機器組立て技能士 2級", fullName: "技能検定 2級電子機器組立て（電子機器組立て作業）学科試験",

    domain: "electrical", administrator: "中央職業能力開発協会",

    officialQuestionsUrl: "https://www.kentei.javada.or.jp/",

    officialReuseTermsUrl: "https://www.kentei.javada.or.jp/", status: "live",

    reuseSummary: "2023〜2025年度前期の学科150問。公式正答と全肢の独自解説、原本図を収録。",

    attributionTemplate: "出典：中央職業能力開発協会 前期 2級電子機器組立て（電子機器組立て作業）学科試験。解説は過去問AIの独自作成。",

    remainingWork: [],

},
  {

    slug: "kikai-hozen", examCode: "kikai-hozen", shortName: "機械保全技能士 2級（機械系）", fullName: "機械保全技能検定 2級 機械系保全作業 学科",

    domain: "safety", administrator: "公益社団法人日本プラントメンテナンス協会",

    officialQuestionsUrl: "https://www.kikaihozenshi.jp/questions/",

    officialReuseTermsUrl: "https://www.kikaihozenshi.jp/questions/", status: "live",

    reuseSummary: "2024年度第2回・2025年度第2回の2級機械系保全作業 学科（各50問：真偽法25・四肢択一25）を収録。問題・正答はJIPM公表PDF、解説は過去問AIの独自作成。",

    attributionTemplate: "出典：JIPM 機械保全技能検定 ○年度 2級 機械系保全作業 学科 No.○。解説は過去問AIの独自作成。",

    remainingWork: ["1級・電気系・設備診断作業の追加"],

},
  {

    slug: "tsukanshi", examCode: "tsukanshi", shortName: "通関士", fullName: "通関士試験",

    domain: "legal", administrator: "財務省関税局・税関",

    officialQuestionsUrl: "https://www.customs.go.jp/tsukanshi/",

    officialReuseTermsUrl: "https://www.customs.go.jp/kiyaku.htm",

    status: "live",

    reuseSummary: "第59回（2025年）65原問・105解答単位と、第58回（2024年）通関業法の全20原問・40解答単位を公式問題・公式正答どおりに保存。全空欄・全選択肢に独自解説。2024年の関税法等・通関実務と2025年の申告書作成式2問は未収録。第60回は問題文のみ転記し正答公表待ち。",

    attributionTemplate: "出典：税関 第○回通関士試験（○年）科目 第○問・同正答及び配点。解説は過去問AIの独自作成で税関とは関係ありません。",

    remainingWork: ["第60回の公式正答（2026-11-10以降）を確認して解答・解説を追加"],

},
  {

    slug: "career-consultant", examCode: "career-consultant", shortName: "キャリアコンサルタント（学科）", fullName: "国家資格キャリアコンサルタント試験 学科試験",

    domain: "welfare", administrator: "特定非営利活動法人キャリアコンサルティング協議会・特定非営利活動法人日本キャリア開発協会",

    officialQuestionsUrl: "https://www.career-shiken.org/about/learninfo/",

    officialReuseTermsUrl: "https://www.career-shiken.org/about/learninfo/", status: "live",

    reuseSummary: "第33回（2026年11月）・第32回（2026年7月）の学科試験各50問、計100問。公式問題・正答と全肢の独自解説を収録。",

    attributionTemplate: "出典：キャリアコンサルティング協議会・日本キャリア開発協会 2026年度第○回国家資格キャリアコンサルタント試験 学科試験 問○。解説は過去問AIの独自作成。",

    remainingWork: ["実技（論述・面接）は対象外"],

},
  {

    slug: "kanri-eiyoshi", examCode: "kanri-eiyoshi", shortName: "管理栄養士", fullName: "管理栄養士国家試験",

    domain: "welfare", administrator: "厚生労働省",

    officialQuestionsUrl: "https://www.mhlw.go.jp/stf/newpage_17056.html",

    officialReuseTermsUrl: "https://www.mhlw.go.jp/chosakuken/index.html", status: "live",

    reuseSummary: "第40回（令和8年3月1日）の全200問を収録。公式問題・正答、全肢の独自解説、表・図・構造式は原本ページ画像を併記。第39回は公式の問題PDFが削除済みのため未収録。",

    attributionTemplate: "出典：厚生労働省 第40回管理栄養士国家試験 午前／午後 問○。解説は過去問AIの独自作成。",

    remainingWork: ["第39回：問題PDFが公式で404。保存コピー利用はオーナー判断待ち"],

},
  {

    slug: "sogo-ryoko", examCode: "sogo-ryoko", shortName: "総合旅行業務取扱管理者", fullName: "総合旅行業務取扱管理者試験",

    domain: "personal-services", administrator: "一般社団法人日本旅行業協会",

    officialQuestionsUrl: "https://www.jata-net.or.jp/seminar/page-41637/exam_xaminationquestion/",

    officialReuseTermsUrl: "https://www.jata-net.or.jp/seminar/page-41637/exam_xaminationquestion/", status: "live",

    reuseSummary: "令和8・7年度の旅行業法令・約款110問を収録。「すべて選ぶ」は全選択一致で採点。国内旅行実務・海外旅行実務は未収録。問題・正答は公式原本、解説は過去問AIの独自作成です。",

    attributionTemplate: "出典：一般社団法人日本旅行業協会 令和○年度総合旅行業務取扱管理者試験 科目 問○。解説は過去問AIの独自作成。",

    remainingWork: ["国内旅行実務（各年32問）・海外旅行実務（各年52問）の転記・解説"],

},
  {

    slug: "shiho-tanto", examCode: "shiho-tanto", shortName: "司法試験（短答）", fullName: "司法試験 短答式（憲法・民法・刑法）",

    domain: "legal", administrator: "法務省",

    officialQuestionsUrl: "https://www.moj.go.jp/jinji/shihoushiken/jinji08_00295.html",

    officialReuseTermsUrl: "https://www.moj.go.jp/hisho06_00280.html",

    status: "live",

    reuseSummary: "令和8・7年の短答式（憲法・民法・刑法）各77問・109解答欄を公式問題・公式正解どおりに収録。各記述の個別解答・組合せ・順不同2個選択を解答欄単位で再現し、全記述・全選択肢に条文・判例を示した独自解説を付けています。",

    attributionTemplate: "出典：法務省 令和○年司法試験 短答式試験問題（科目）第○問・同正解及び配点。解説は過去問AIが独自作成。",

    remainingWork: ["部分点（2問正解で1点等）の表示方針の決定"],

},
  {

    slug: "yobi-tanto", examCode: "yobi-tanto", shortName: "予備試験（短答）", fullName: "司法試験予備試験 短答式（法律基本科目）",

    domain: "legal", administrator: "法務省",

    officialQuestionsUrl: "https://www.moj.go.jp/jinji/shihoushiken/jinji07_00317.html",

    officialReuseTermsUrl: "https://www.moj.go.jp/hisho06_00280.html",

    status: "live",

    reuseSummary: "令和8・7年の短答式・法律基本科目（憲法・行政法・民法・商法・民事訴訟法・刑法・刑事訴訟法）各95問・137解答欄を公式問題・公式正解どおりに収録。全記述・全選択肢に条文・判例を示した独自解説。一般教養科目は未収録。",

    attributionTemplate: "出典：法務省 令和○年司法試験予備試験 短答式試験問題（科目）第○問・同正解及び配点。解説は過去問AIが独自作成。",

    remainingWork: ["一般教養科目（各年44問中20問選択）の収録可否"],

},
  {

    slug: "sokuryoshiho", examCode: "sokuryoshiho", shortName: "測量士補", fullName: "測量士補",

    domain: "construction", administrator: "国土地理院",

    officialQuestionsUrl: "https://www.gsi.go.jp/LAW/SHIKEN/past.html",

    officialReuseTermsUrl: "https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html", status: "live",

    reuseSummary: "測量士補試験の令和6年全28問と、令和7・8年の各27問を収録。問題・正答は国土地理院公表PDF、解説は過去問AIの独自作成。令和8年No.12は公式正答と掲載数値の計算結果が一致しないため参考扱い（採点対象外）。",

    attributionTemplate: "出典：国土地理院 令和○年測量士補試験 No.○。解説は過去問AIの独自作成。",

    remainingWork: ["No.21の地形図（電子地形図25000）の測量法上の複製承認要否の確認"],

},
  {

    slug: "caremanager", examCode: "caremanager", shortName: "ケアマネ", fullName: "介護支援専門員実務研修受講試験",

    domain: "welfare", administrator: "都道府県（全国共通問題）",

    officialQuestionsUrl: "https://www.fukushi.metro.tokyo.lg.jp/kourei/shikaku/r7_seitoukijyun",

    officialReuseTermsUrl: "https://www.fukushi.metro.tokyo.lg.jp/kourei/shikaku/r7_seitoukijyun",

    status: "live",

    reuseSummary: "第27回（令和6年度）・第28回（令和7年度）の各60問と、第26回（令和5年度）の介護支援分野24問、計144問を、公式正答と全選択肢の解説付きで収録。",

    attributionTemplate: "出典：第○回介護支援専門員実務研修受講試験 問題○（○○掲載）",

    remainingWork: ["第29回（2026-10-11）は正答公表（合格発表 2026-11-24 予定）後に追加", "法改正・報酬改定で成立しなくなった問題の失効管理"],

},
  {"slug":"chintai","examCode":"chintai","shortName":"賃貸不動産経営管理士","fullName":"賃貸不動産経営管理士","domain":"real-estate","administrator":"賃貸不動産経営管理士協議会","officialQuestionsUrl":"https://www.chintaikanrishi.jp/exam/past","officialReuseTermsUrl":"https://www.chintaikanrishi.jp/exam/past","status":"live","reuseSummary":"2022・2024・2025年度の148問を演習できます。2022年度の問32と2025年度の問9は公式に全員正解です。","remainingWork":[]},
  {"slug":"kyusui","examCode":"kyusui","shortName":"給水装置工事主任技術者","fullName":"給水装置工事主任技術者","domain":"construction","administrator":"給水工事技術振興財団","officialQuestionsUrl":"https://www.kyuukou.or.jp/shiken/jyuken-kakomon.html","officialReuseTermsUrl":"https://www.kyuukou.or.jp/shiken/jyuken-kakomon.html","status":"live","reuseSummary":"2025・2026年度の学科と2024年度の学科試験2を収録。通常演習139問。2025年問18は公式全員正解のため通常採点対象外です。","remainingWork":[]},
  {"slug":"biru-kan","examCode":"biru-kan","shortName":"建築物環境衛生管理技術者","fullName":"建築物環境衛生管理技術者","domain":"construction","administrator":"日本建築衛生管理教育センター","officialQuestionsUrl":"https://www.jahmec.or.jp/kokka/","officialReuseTermsUrl":"https://www.jahmec.or.jp/kokka/","status":"live","reuseSummary":"第54〜56回（2024〜2026年度）540問。公式問題・公式正答・全肢解説・必要図を収録しています。","remainingWork":[]},
  {"slug":"gijutsushi1-kikai","examCode":"gijutsushi1-kikai","shortName":"技術士第一次試験・機械部門","fullName":"技術士第一次試験・機械部門","domain":"construction","administrator":"日本技術士会","officialQuestionsUrl":"https://www.engineer.or.jp/c_categories/index02021.html","officialReuseTermsUrl":"https://www.engineer.or.jp/c_categories/index02021.html","status":"live","reuseSummary":"2023年度の機械専門35問と、2024・2025年度の基礎・適性・機械専門158問を演習できます。","remainingWork":[]},
  {"slug":"hoshasen-1","examCode":"hoshasen-1","shortName":"第一種放射線取扱主任者","fullName":"第一種放射線取扱主任者","domain":"safety","administrator":"原子力安全技術センター","officialQuestionsUrl":"https://www.nustec.or.jp/syunin/","officialReuseTermsUrl":"https://www.nustec.or.jp/syunin/","status":"live","reuseSummary":"2025・2026年の受入済み原問を解答欄単位で演習。複数の解答欄を含む原問は全文を保持して欄ごとに表示します。公式全員正解1欄は通常採点対象外。","remainingWork":[]},
  {"slug":"hoshasen-2","examCode":"hoshasen-2","shortName":"第二種放射線取扱主任者","fullName":"第二種放射線取扱主任者","domain":"safety","administrator":"原子力安全技術センター","officialQuestionsUrl":"https://www.nustec.or.jp/syunin/","officialReuseTermsUrl":"https://www.nustec.or.jp/syunin/","status":"live","reuseSummary":"2025・2026年の受入済み原問を解答欄単位で演習。根拠不足の2026年化学問9は保留のまま公開しません。","remainingWork":[]},
  {"slug":"khk-kikai-kou","examCode":"khk-kikai-kou","shortName":"高圧ガス製造保安責任者 甲種機械","fullName":"高圧ガス製造保安責任者 甲種機械","domain":"safety","administrator":"高圧ガス保安協会","officialQuestionsUrl":"https://www.khk.or.jp/qualification/","officialReuseTermsUrl":"https://www.khk.or.jp/qualification/","status":"live","reuseSummary":"2024・2025年度80問。法令・保安管理技術は選択式、学識10問は公式解答例との手動照合です。記述答案は自動採点しません。","remainingWork":[]},
  {"slug":"khk-kikai-otsu","examCode":"khk-kikai-otsu","shortName":"高圧ガス製造保安責任者 乙種機械","fullName":"高圧ガス製造保安責任者 乙種機械","domain":"safety","administrator":"高圧ガス保安協会","officialQuestionsUrl":"https://www.khk.or.jp/qualification/","officialReuseTermsUrl":"https://www.khk.or.jp/qualification/","status":"live","reuseSummary":"2024・2025年度100問。公式正答・全肢解説・必要図を収録。","remainingWork":[]},
  {"slug":"energy-kanri","examCode":"energy-kanri","shortName":"エネルギー管理士","fullName":"エネルギー管理士","domain":"electrical","administrator":"省エネルギーセンター","officialQuestionsUrl":"https://www.eccj.or.jp/mgr1/test_past/","officialReuseTermsUrl":"https://www.eccj.or.jp/mgr1/test_past/","status":"live","reuseSummary":"第47・48回62原問・842公式解答欄を保存し、837設問を演習できます。順序不問4ペアは各1設問、全員正解1欄は通常採点対象外。","remainingWork":[]},
  {"slug":"reform-mgr","examCode":"reform-mgr","shortName":"マンションリフォームマネジャー","fullName":"マンションリフォームマネジャー","domain":"construction","administrator":"住宅リフォーム・紛争処理支援センター","officialQuestionsUrl":"https://www.chord.or.jp/","officialReuseTermsUrl":"https://www.chord.or.jp/","status":"live","reuseSummary":"2025・2026年度の学科100問を収録。設計製図試験は対象外。","remainingWork":[]},
  {"slug":"shohi-sodan","examCode":"shohi-sodan","shortName":"消費生活相談員","fullName":"消費生活相談員","domain":"legal","administrator":"国民生活センター","officialQuestionsUrl":"https://www.kokusen.go.jp/","officialReuseTermsUrl":"https://www.kokusen.go.jp/","status":"live","reuseSummary":"2022〜2025年度のマークシートを収録。原問番号・小問番号は出典に表示します。","remainingWork":[]},
  {"slug":"biyoshi","examCode":"biyoshi","shortName":"美容師","fullName":"美容師","domain":"personal-services","administrator":"理容師美容師試験研修センター","officialQuestionsUrl":"https://www.rbc.or.jp/exam/past_question/","officialReuseTermsUrl":"https://www.rbc.or.jp/exam/past_question/","status":"live","reuseSummary":"第53・54回各53問、106問を演習できます。図等の確認待ち4原問は保留のまま。","remainingWork":[]},
  {"slug":"kikenbutsu-otsu1","examCode":"kikenbutsu-otsu1","shortName":"危険物取扱者 乙種第1類","fullName":"危険物取扱者 乙種第1類","domain":"safety","administrator":"消防試験研究センター","officialQuestionsUrl":"https://www.shoubo-shiken.or.jp/","officialReuseTermsUrl":"https://www.shoubo-shiken.or.jp/","status":"live","reuseSummary":"公式公開の抜粋10問のみ。特定回の全問や2回分の全問を収録したものではありません。","remainingWork":[]},
  {"slug":"kikenbutsu-otsu2","examCode":"kikenbutsu-otsu2","shortName":"危険物取扱者 乙種第2類","fullName":"危険物取扱者 乙種第2類","domain":"safety","administrator":"消防試験研究センター","officialQuestionsUrl":"https://www.shoubo-shiken.or.jp/","officialReuseTermsUrl":"https://www.shoubo-shiken.or.jp/","status":"live","reuseSummary":"公式公開の抜粋10問のみ。特定回の全問や2回分の全問を収録したものではありません。","remainingWork":[]},
  {"slug":"kikenbutsu-otsu6","examCode":"kikenbutsu-otsu6","shortName":"危険物取扱者 乙種第6類","fullName":"危険物取扱者 乙種第6類","domain":"safety","administrator":"消防試験研究センター","officialQuestionsUrl":"https://www.shoubo-shiken.or.jp/","officialReuseTermsUrl":"https://www.shoubo-shiken.or.jp/","status":"live","reuseSummary":"公式公開の抜粋10問のみ。特定回の全問や2回分の全問を収録したものではありません。","remainingWork":[]},
  {"slug": "kikenbutsu-otsu4", "examCode": "kikenbutsu-otsu4", "shortName": "危険物取扱者 乙種第4類", "fullName": "危険物取扱者 乙種第4類", "domain": "safety", "administrator": "一般財団法人消防試験研究センター", "officialQuestionsUrl": "https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html", "officialReuseTermsUrl": "https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html", "status": "live", "stagingDataPath": "data/questions/kikenbutsu-otsu4", "reuseSummary": "2026年6月公表版の抜粋35問。公式問題画像・正答と全肢解説を収録。", "remainingWork": []},
  {"slug": "unko-kanrisha-kamotsu", "examCode": "unko-kanrisha-kamotsu", "shortName": "運行管理者（貨物）", "fullName": "運行管理者（貨物）", "domain": "safety", "administrator": "公益財団法人運行管理者試験センター", "officialQuestionsUrl": "https://www.unkan.or.jp/past.html", "officialReuseTermsUrl": "https://www.unkan.or.jp/past.html", "status": "live", "stagingDataPath": "data/questions/unko-kanrisha-kamotsu", "reuseSummary": "2023・2024年度CBT出題例60原問・86解答単位。公式問題画像・正答と全肢解説を収録。", "remainingWork": []},
  {"slug": "shobo-setsubishi-otsu6", "examCode": "shobo-setsubishi-otsu6", "shortName": "消防設備士 乙種第6類", "fullName": "消防設備士 乙種第6類", "domain": "safety", "administrator": "一般財団法人消防試験研究センター", "officialQuestionsUrl": "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", "officialReuseTermsUrl": "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", "status": "live", "stagingDataPath": "data/questions/shobo-setsubishi-otsu6", "reuseSummary": "2026年6月公表版の筆記14問・実技1大問（計16解答単位）。公式問題画像・正答と独自解説を収録。記述は解答例で自己確認できます。", "remainingWork": []},
  {"slug": "shobo-setsubishi-kou4", "examCode": "shobo-setsubishi-kou4", "shortName": "消防設備士 甲種第4類", "fullName": "消防設備士 甲種第4類", "domain": "safety", "administrator": "一般財団法人消防試験研究センター", "officialQuestionsUrl": "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", "officialReuseTermsUrl": "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", "status": "live", "stagingDataPath": "data/questions/shobo-setsubishi-kou4", "reuseSummary": "2026年6月公表版の筆記13問・実技2問。公式問題画像・正答と独自解説を収録。記述は解答例で自己確認できます。", "remainingWork": []},
  {"slug": "kikenbutsu-hei", "examCode": "kikenbutsu-hei", "shortName": "危険物取扱者 丙種", "fullName": "危険物取扱者 丙種", "domain": "safety", "administrator": "一般財団法人消防試験研究センター", "officialQuestionsUrl": "https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html", "officialReuseTermsUrl": "https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html", "status": "live", "stagingDataPath": "data/questions/kikenbutsu-hei", "reuseSummary": "2026年6月公表版の抜粋25問。公式問題画像・正答と全肢解説を収録。", "remainingWork": []},
  {"slug": "kikenbutsu-kou", "examCode": "kikenbutsu-kou", "shortName": "危険物取扱者 甲種", "fullName": "危険物取扱者 甲種", "domain": "safety", "administrator": "一般財団法人消防試験研究センター", "officialQuestionsUrl": "https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html", "officialReuseTermsUrl": "https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html", "status": "live", "stagingDataPath": "data/questions/kikenbutsu-kou", "reuseSummary": "2026年6月公表版の抜粋45問。公式問題画像・正答と全肢解説を収録。", "remainingWork": []},
  {"slug": "shobo-setsubishi-kou1", "examCode": "shobo-setsubishi-kou1", "shortName": "消防設備士 甲種第1類", "fullName": "消防設備士 甲種第1類", "domain": "safety", "administrator": "一般財団法人消防試験研究センター", "officialQuestionsUrl": "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", "officialReuseTermsUrl": "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", "status": "live", "stagingDataPath": "data/questions/shobo-setsubishi-kou1", "reuseSummary": "2026年6月公表版の筆記19問・実技2大問（計26解答単位）。公式問題画像・正答と独自解説を収録。記述は解答例で自己確認できます。", "remainingWork": []},
  {"slug": "unko-kanrisha-ryokaku", "examCode": "unko-kanrisha-ryokaku", "shortName": "運行管理者（旅客）", "fullName": "運行管理者（旅客）", "domain": "safety", "administrator": "公益財団法人運行管理者試験センター", "officialQuestionsUrl": "https://www.unkan.or.jp/past.html", "officialReuseTermsUrl": "https://www.unkan.or.jp/past.html", "status": "live", "stagingDataPath": "data/questions/unko-kanrisha-ryokaku", "reuseSummary": "2023・2024年度CBT出題例60原問・92解答単位。公式問題画像・正答と全肢解説を収録。", "remainingWork": []},
  {"slug": "diecast2", "examCode": "diecast2", "shortName": "ダイカスト技能士 2級", "fullName": "技能検定 2級ダイカスト（ホットチャンバダイカスト作業）学科試験", "domain": "safety", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%89%8D%E6%9C%9F&v3=B34&v4=%E3%83%80%E3%82%A4%E3%82%AB%E3%82%B9%E3%83%88%EF%BC%88%E3%83%9B%E3%83%83%E3%83%88%E3%83%81%E3%83%A3%E3%83%B3%E3%83%90%E3%83%80%E3%82%A4%E3%82%AB%E3%82%B9%E3%83%88%E4%BD%9C%E6%A5%AD%EF%BC%89", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2025年度の学科50問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会 令和7年度前期 2級ダイカスト（ホットチャンバダイカスト作業）学科試験。解説は過去問AIの独自作成。", "remainingWork": []},
  {"slug": "tetsudo-sharyo2", "examCode": "tetsudo-sharyo2", "shortName": "鉄道車両製造・整備技能士 2級", "fullName": "技能検定 2級鉄道車両製造・整備（機器ぎ装作業）学科試験", "domain": "safety", "administrator": "中央職業能力開発協会", "officialQuestionsUrl": "https://www.kentei.javada.or.jp/list02.html?v1=%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6&v2=%E5%89%8D%E6%9C%9F&v3=B43&v4=%E9%89%84%E9%81%93%E8%BB%8A%E4%B8%A1%E8%A3%BD%E9%80%A0%E3%83%BB%E6%95%B4%E5%82%99%EF%BC%88%E6%A9%9F%E5%99%A8%E3%81%8E%E8%A3%85%E4%BD%9C%E6%A5%AD%EF%BC%89", "officialReuseTermsUrl": "https://www.kentei.javada.or.jp/", "status": "live", "reuseSummary": "2025年度の学科50問を収録。公式問題・正答と全肢の独自解説で学べます。", "attributionTemplate": "出典：中央職業能力開発協会 令和7年度前期 2級鉄道車両製造・整備（機器ぎ装作業）学科試験。解説は過去問AIの独自作成。", "remainingWork": []},
  {
    slug: "saibansho-ippan-dai", examCode: "saibansho-ippan-dai", shortName: "裁判所事務官（大卒程度）", fullName: "裁判所職員採用一般職試験（裁判所事務官・大卒程度区分）",
    domain: "legal", administrator: "裁判所",
    officialQuestionsUrl: "https://www.courts.go.jp/saiyo/sikenjoho/siken/siken_mondai/index.html",
    officialReuseTermsUrl: "https://www.courts.go.jp/saiyo/sikenjoho/siken/siken_mondai/index.html",
    status: "live",
    reuseSummary: "2023～2026年度の基礎能力試験92問、2023～2026年度の専門試験180問を公式問題・正答と全肢の独自解説で収録。",
    attributionTemplate: "出典：裁判所 裁判所職員採用一般職試験（裁判所事務官・大卒程度区分）。解説は過去問AIの独自作成。",
    remainingWork: ["2022年度の問題・正答の確認"],
  },
  {
    slug: "katei-hoiku", examCode: "katei-hoiku", shortName: "高校家庭科保育技術検定", fullName: "全国高等学校家庭科保育技術検定",
    domain: "welfare", administrator: "公益財団法人全国高等学校家庭科教育振興会",
    officialQuestionsUrl: "https://www.katei-ed.or.jp/past.html",
    officialReuseTermsUrl: "https://www.katei-ed.or.jp/past.html",
    status: "live",
    reuseSummary: "準1級・1級の公式筆記問題と正答、独自の解説を収録。",
    attributionTemplate: "出典：公益財団法人全国高等学校家庭科教育振興会。解説は過去問AIが作成。",
    remainingWork: [],
  },
  {
    slug: "katei-shoku-chori", examCode: "katei-shoku-chori", shortName: "高校家庭科食物調理技術検定", fullName: "全国高等学校家庭科食物調理技術検定",
    domain: "personal-services", administrator: "公益財団法人全国高等学校家庭科教育振興会",
    officialQuestionsUrl: "https://www.katei-ed.or.jp/past.html",
    officialReuseTermsUrl: "https://www.katei-ed.or.jp/past.html",
    status: "live",
    reuseSummary: "2級・準1級・1級の公式筆記問題と正答、独自の解説を収録。",
    attributionTemplate: "出典：公益財団法人全国高等学校家庭科教育振興会。解説は過去問AIが作成。",
    remainingWork: [],
  },
  {
    slug: "mental-health-management", examCode: "mental-health-management", shortName: "メンタルヘルス・マネジメント検定", fullName: "メンタルヘルス・マネジメント検定試験",
    domain: "welfare", administrator: "大阪商工会議所",
    officialQuestionsUrl: "https://www.mental-health.ne.jp/procedure/",
    officialReuseTermsUrl: "https://www.mental-health.ne.jp/procedure/",
    status: "live",
    reuseSummary: "公式パンフレットに掲載されたI・II・III種の本試験問題抜粋と正答を収録。",
    attributionTemplate: "出典：大阪商工会議所。解説は過去問AIが作成。",
    remainingWork: [],
  },
  {
    slug: "building-cleaning-ssw1", examCode: "building-cleaning-ssw1", shortName: "ビルクリーニング特定技能1号", fullName: "ビルクリーニング分野特定技能1号評価試験",
    domain: "personal-services", administrator: "公益社団法人全国ビルメンテナンス協会",
    officialQuestionsUrl: "https://www.j-bma.or.jp/qualification-training/zairyu-1go",
    officialReuseTermsUrl: "https://www.j-bma.or.jp/qualification-training/zairyu-1go",
    status: "live",
    reuseSummary: "2019年に公表された判断試験の問題・正答と独自の全肢解説を収録。",
    attributionTemplate: "出典：公益社団法人全国ビルメンテナンス協会。解説は過去問AIが作成。",
    remainingWork: [],
  },
  {
    slug: "kyoin-osaka", examCode: "kyoin-osaka", shortName: "大阪府教員採用試験", fullName: "大阪府公立学校教員採用選考テスト",
    domain: "welfare", administrator: "大阪府教育委員会",
    officialQuestionsUrl: "https://kyoin-pref-osaka.com/test/r9results-2-2/",
    officialReuseTermsUrl: "https://kyoin-pref-osaka.com/test/r9results-2-2/",
    status: "live",
    reuseSummary: "2022～2026年度実施の第1次選考の筆答132問と、同5年度の教科専門（小学校等）115問を公式問題・正答と全肢の独自解説で収録。",
    attributionTemplate: "出典：大阪府教育委員会 大阪府公立学校教員採用選考テスト。解説は過去問AIの独自作成。",
    remainingWork: ["教科専門の未収録の校種・教科の筆答問題の収録"],
  },
  {
    slug: "kyoin-tokyo", examCode: "kyoin-tokyo", shortName: "東京都教員採用試験", fullName: "東京都公立学校教員採用候補者選考",
    domain: "welfare", administrator: "東京都教育委員会",
    officialQuestionsUrl: "https://www.kyoinsaiyopr.metro.tokyo.lg.jp/recruit/exam.html",
    officialReuseTermsUrl: "https://www.kyoinsaiyopr.metro.tokyo.lg.jp/policy.html",
    status: "live",
    reuseSummary: "2024～2026年度実施の教職教養75問と、2025・2026年度実施の専門教養（小学校全科）33問を公式問題・正答と全肢の独自解説で収録。",
    attributionTemplate: "出典：東京都教育委員会 東京都公立学校教員採用候補者選考。解説は過去問AIの独自作成。",
    remainingWork: ["他の校種・教科の専門教養の収録"],
  },
  {
    slug: "cg-creator-basic", examCode: "cg-creator-basic", shortName: "CGクリエイター検定 ベーシック", fullName: "CGクリエイター検定 ベーシック",
    domain: "information-technology", administrator: "公益財団法人画像情報教育振興協会（CG-ARTS）",
    officialQuestionsUrl: "https://www.cgarts.or.jp/kentei/past_download/",
    officialReuseTermsUrl: "https://www.cgarts.or.jp/termsofuse/",
    status: "live", reuseSummary: "公式問題・正答と全肢の独自解説を収録。",
    attributionTemplate: "出典：公益財団法人画像情報教育振興協会（CG-ARTS）CGクリエイター検定 ベーシック。",
    remainingWork: [],
  },
  {
    slug: "cg-creator-expert", examCode: "cg-creator-expert", shortName: "CGクリエイター検定 エキスパート", fullName: "CGクリエイター検定 エキスパート",
    domain: "information-technology", administrator: "公益財団法人画像情報教育振興協会（CG-ARTS）",
    officialQuestionsUrl: "https://www.cgarts.or.jp/kentei/past_download/",
    officialReuseTermsUrl: "https://www.cgarts.or.jp/termsofuse/",
    status: "live", reuseSummary: "公式問題・正答と全肢の独自解説を収録。",
    attributionTemplate: "出典：公益財団法人画像情報教育振興協会（CG-ARTS）CGクリエイター検定 エキスパート。",
    remainingWork: [],
  },
  {
    slug: "cg-engineer-basic", examCode: "cg-engineer-basic", shortName: "CGエンジニア検定 ベーシック", fullName: "CGエンジニア検定 ベーシック",
    domain: "information-technology", administrator: "公益財団法人画像情報教育振興協会（CG-ARTS）",
    officialQuestionsUrl: "https://www.cgarts.or.jp/kentei/past_download/",
    officialReuseTermsUrl: "https://www.cgarts.or.jp/termsofuse/",
    status: "live", reuseSummary: "公式問題・正答と全肢の独自解説を収録。",
    attributionTemplate: "出典：公益財団法人画像情報教育振興協会（CG-ARTS）CGエンジニア検定 ベーシック。",
    remainingWork: [],
  },
  {
    slug: "cg-engineer-expert", examCode: "cg-engineer-expert", shortName: "CGエンジニア検定 エキスパート", fullName: "CGエンジニア検定 エキスパート",
    domain: "information-technology", administrator: "公益財団法人画像情報教育振興協会（CG-ARTS）",
    officialQuestionsUrl: "https://www.cgarts.or.jp/kentei/past_download/",
    officialReuseTermsUrl: "https://www.cgarts.or.jp/termsofuse/",
    status: "live", reuseSummary: "公式問題・正答と全肢の独自解説を収録。",
    attributionTemplate: "出典：公益財団法人画像情報教育振興協会（CG-ARTS）CGエンジニア検定 エキスパート。",
    remainingWork: [],
  },
  {
    slug: "multimedia-kentei-basic", examCode: "multimedia-kentei-basic", shortName: "マルチメディア検定 ベーシック", fullName: "マルチメディア検定 ベーシック",
    domain: "information-technology", administrator: "公益財団法人画像情報教育振興協会（CG-ARTS）",
    officialQuestionsUrl: "https://www.cgarts.or.jp/kentei/past_download/",
    officialReuseTermsUrl: "https://www.cgarts.or.jp/termsofuse/",
    status: "live", reuseSummary: "公式問題・正答と全肢の独自解説を収録。",
    attributionTemplate: "出典：公益財団法人画像情報教育振興協会（CG-ARTS）マルチメディア検定 ベーシック。",
    remainingWork: [],
  },
  {
    slug: "multimedia-kentei-expert", examCode: "multimedia-kentei-expert", shortName: "マルチメディア検定 エキスパート", fullName: "マルチメディア検定 エキスパート",
    domain: "information-technology", administrator: "公益財団法人画像情報教育振興協会（CG-ARTS）",
    officialQuestionsUrl: "https://www.cgarts.or.jp/kentei/past_download/",
    officialReuseTermsUrl: "https://www.cgarts.or.jp/termsofuse/",
    status: "live", reuseSummary: "公式問題・正答と全肢の独自解説を収録。",
    attributionTemplate: "出典：公益財団法人画像情報教育振興協会（CG-ARTS）マルチメディア検定 エキスパート。",
    remainingWork: [],
  },
  {
    slug: "g-kentei", examCode: "g-kentei", shortName: "G検定", fullName: "G検定（ジェネラリスト検定）",
    domain: "information-technology", administrator: "一般社団法人日本ディープラーニング協会",
    officialQuestionsUrl: "https://www.jdla.org/certificate/general/issues/",
    officialReuseTermsUrl: "https://www.jdla.org/",
    status: "live", reuseSummary: "試験実施機関が公開した実際の出題と正答、全肢の独自解説を収録。",
    attributionTemplate: "出典：一般社団法人日本ディープラーニング協会「G検定の例題・過去問」。",
    remainingWork: [],
  },
  {
    slug: "kyoto-kentei3", examCode: "kyoto-kentei3", shortName: "京都検定 3級", fullName: "京都・観光文化検定試験 3級",
    domain: "personal-services", administrator: "京都商工会議所", status: "live",
    officialQuestionsUrl: "https://www.kyotokentei.ne.jp/news/119226.html",
    officialReuseTermsUrl: "https://www.kyotokentei.ne.jp/faq/",
    reuseSummary: "京都商工会議所が問題と正答を公開している3級の抜粋を収録。",
    attributionTemplate: "出典：京都商工会議所 京都・観光文化検定試験。解説は過去問AIの独自作成。",
    remainingWork: ["各回の問題冊子は公開抜粋のみ収録"],
  },
  {
    slug: "topik1", examCode: "topik1", shortName: "TOPIK I", fullName: "韓国語能力試験 TOPIK I",
    domain: "personal-services", administrator: "大韓民国 国立国際教育院", status: "live",
    officialQuestionsUrl: "https://www.topik.go.kr/TWSTDY/TWSTDY0080.do",
    officialReuseTermsUrl: "https://www.topik.go.kr/TWSTDY/TWSTDY0080.do",
    reuseSummary: "第83・91・96・102回の読解を収録。問題・正答は国立国際教育院の公開版を使用。",
    attributionTemplate: "出典：大韓民国 国立国際教育院 韓国語能力試験。解説は過去問AIの独自作成。",
    remainingWork: ["聞き取り（原本は音声で公開）"],
  },
  {
    slug: "apef4", examCode: "apef4", shortName: "仏検 4級", fullName: "実用フランス語技能検定試験 4級",
    domain: "personal-services", administrator: "公益財団法人フランス語教育振興協会", status: "live",
    officialQuestionsUrl: "https://apefdapf.org/dapf/presentation/exemples#4",
    officialReuseTermsUrl: "https://apefdapf.org/dapf/presentation/exemples",
    reuseSummary: "2011・2015年度秋季の公式問題・正答と独自解説を収録。聞き取りは公式原稿を読む形式で、公式音声も参照できます。",
    attributionTemplate: "出典：公益財団法人フランス語教育振興協会 実用フランス語技能検定試験。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "chuken3", examCode: "chuken3", shortName: "中国語検定 3級", fullName: "中国語検定試験 3級",
    domain: "personal-services", administrator: "一般財団法人日本中国語検定協会", status: "live",
    officialQuestionsUrl: "https://www.chuken.gr.jp/tcp/test.html",
    officialReuseTermsUrl: "https://www.chuken.gr.jp/tcp/test.html",
    reuseSummary: "第109～118回の公式問題・正答と独自解説を収録。リスニングは公式原稿を用いた読解形式です。",
    attributionTemplate: "出典：日本中国語検定協会 中国語検定試験。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "biz-career-logistics3", examCode: "biz-career-logistics3",
    shortName: "ビジネス・キャリア検定 3級ロジスティクス管理", fullName: "ビジネス・キャリア検定試験 3級ロジスティクス管理",
    domain: "personal-services", administrator: "中央職業能力開発協会", status: "live",
    officialQuestionsUrl: "https://www.javada.or.jp/jigyou/gino/business/gakusyu.html#mondai",
    officialReuseTermsUrl: "https://www.javada.or.jp/lib/rights.html",
    reuseSummary: "3級ロジスティクス管理の公式問題・正答と全選択肢の独自解説を収録。",
    attributionTemplate: "出典：中央職業能力開発協会 ビジネス・キャリア検定試験。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "kikenbutsu-otsu5", examCode: "kikenbutsu-otsu5", shortName: "危険物取扱者 乙種第5類", fullName: "危険物取扱者 乙種第5類",
    domain: "safety", administrator: "一般財団法人消防試験研究センター",
    officialQuestionsUrl: "https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html", officialReuseTermsUrl: "https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html",
    status: "live", reuseSummary: "2026年6月公表版の共通25問と類別10問を収録。公式正答に基づく全肢解説付き。", remainingWork: [],
  },
  {
    slug: "kikenbutsu-otsu3", examCode: "kikenbutsu-otsu3", shortName: "危険物取扱者 乙種第3類", fullName: "危険物取扱者 乙種第3類",
    domain: "safety", administrator: "一般財団法人消防試験研究センター",
    officialQuestionsUrl: "https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html", officialReuseTermsUrl: "https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html",
    status: "live", reuseSummary: "2026年6月公表版の共通25問と類別10問を収録。公式正答に基づく全肢解説付き。", remainingWork: [],
  },
  {
    slug: "shobo-setsubishi-otsu4", examCode: "shobo-setsubishi-otsu4", shortName: "消防設備士 乙種第4類", fullName: "消防設備士 乙種第4類",
    domain: "safety", administrator: "一般財団法人消防試験研究センター",
    officialQuestionsUrl: "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", officialReuseTermsUrl: "https://www.shoubo-shiken.or.jp/shoubou/exercise.html",
    status: "live", reuseSummary: "2026年6月公表版の筆記18問・実技2解答単位を収録。", remainingWork: [],
  },
  {
    slug: "shobo-setsubishi-otsu7", examCode: "shobo-setsubishi-otsu7", shortName: "消防設備士 乙種第7類", fullName: "消防設備士 乙種第7類",
    domain: "safety", administrator: "一般財団法人消防試験研究センター",
    officialQuestionsUrl: "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", officialReuseTermsUrl: "https://www.shoubo-shiken.or.jp/shoubou/exercise.html",
    status: "live", reuseSummary: "2026年6月公表版の筆記16問・実技1解答単位を収録。", remainingWork: [],
  },
  {
    slug: "shobo-setsubishi-kou3", examCode: "shobo-setsubishi-kou3", shortName: "消防設備士 甲種第3類", fullName: "消防設備士 甲種第3類",
    domain: "safety", administrator: "一般財団法人消防試験研究センター",
    officialQuestionsUrl: "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", officialReuseTermsUrl: "https://www.shoubo-shiken.or.jp/shoubou/exercise.html",
    status: "live", reuseSummary: "2026年6月公表版の筆記18問・実技4解答単位を収録。", remainingWork: [],
  },
  {
    slug: "shobo-setsubishi-kou2", examCode: "shobo-setsubishi-kou2", shortName: "消防設備士 甲種第2類", fullName: "消防設備士 甲種第2類",
    domain: "safety", administrator: "一般財団法人消防試験研究センター",
    officialQuestionsUrl: "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", officialReuseTermsUrl: "https://www.shoubo-shiken.or.jp/shoubou/exercise.html",
    status: "live", reuseSummary: "2026年6月公表版の筆記20問・実技4解答単位を収録。", remainingWork: [],
  },
  {
    slug: "shobo-setsubishi-kou5", examCode: "shobo-setsubishi-kou5", shortName: "消防設備士 甲種第5類", fullName: "消防設備士 甲種第5類",
    domain: "safety", administrator: "一般財団法人消防試験研究センター",
    officialQuestionsUrl: "https://www.shoubo-shiken.or.jp/shoubou/exercise.html", officialReuseTermsUrl: "https://www.shoubo-shiken.or.jp/shoubou/exercise.html",
    status: "live", reuseSummary: "2026年6月公表版の筆記12問・実技6解答単位を収録。", remainingWork: [],
  },
  {
    slug: "gesuido-3shu", examCode: "gesuido-3shu", shortName: "下水道技術検定 第3種", fullName: "下水道技術検定 第3種",
    domain: "construction", administrator: "日本下水道事業団",
    officialQuestionsUrl: "https://www.jswa.go.jp/kentei/goannai.html", officialReuseTermsUrl: "https://www.jswa.go.jp/kentei/goannai.html",
    status: "live", reuseSummary: "2023・2025・2026年度の公式問題・正答を各60問収録。公式に全員加点となった1問を含む。", remainingWork: [],
  },
  {
    slug: "zenkou-pc",
    examCode: "zenkou-pc",
    shortName: "パソコン利用技術検定",
    fullName: "パソコン利用技術検定試験",
    domain: "information-technology",
    administrator: "公益社団法人全国工業高等学校長協会",
    officialQuestionsUrl: "https://zenkoukyo.or.jp/index_kentei/exam_result/",
    officialReuseTermsUrl: "https://zenkoukyo.or.jp/index_kentei/exam_result/",
    status: "live",
    stagingDataPath: "data/questions/zenkou-pc",
    reuseSummary: "第51回の1級筆記全20大問と、同回2〜3級および第49・50回1〜3級の筆記を部分収録。公式問題・解答と図版を照合。",
    attributionTemplate: "出典：公益社団法人全国工業高等学校長協会。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "chori-center", examCode: "chori-center", shortName: "調理師試験（共通問題）", fullName: "調理師試験（共通問題）",
    domain: "personal-services", administrator: "公益社団法人調理技術技能センター",
    officialQuestionsUrl: "https://chouri-ggc.or.jp/chourishishiken/past_questions/", officialReuseTermsUrl: "https://chouri-ggc.or.jp/chourishishiken/past_questions/",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },
  {
    slug: "chori-gunma", examCode: "chori-gunma", shortName: "調理師試験（群馬県）", fullName: "調理師試験（群馬県）",
    domain: "personal-services", administrator: "群馬県",
    officialQuestionsUrl: "https://www.pref.gunma.jp/site/shokunoanzen/8244.html", officialReuseTermsUrl: "https://www.pref.gunma.jp/site/shokunoanzen/8244.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },
  {
    slug: "chori-hokkaido", examCode: "chori-hokkaido", shortName: "調理師試験（北海道）", fullName: "調理師試験（北海道）",
    domain: "personal-services", administrator: "北海道",
    officialQuestionsUrl: "https://www.pref.hokkaido.lg.jp/hf/kth/kak/tkh/sikaku/chourishi-shiken-home.html", officialReuseTermsUrl: "https://www.pref.hokkaido.lg.jp/hf/kth/kak/tkh/sikaku/chourishi-shiken-home.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },
  {
    slug: "chori-kanagawa", examCode: "chori-kanagawa", shortName: "調理師試験（神奈川県）", fullName: "調理師試験（神奈川県）",
    domain: "personal-services", administrator: "神奈川県",
    officialQuestionsUrl: "https://www.pref.kanagawa.jp/docs/e8z/cnt/f4501/", officialReuseTermsUrl: "https://www.pref.kanagawa.jp/docs/e8z/cnt/f4501/",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },
  {
    slug: "chori-kansai", examCode: "chori-kansai", shortName: "調理師試験（関西広域連合）", fullName: "調理師試験（関西広域連合）",
    domain: "personal-services", administrator: "関西広域連合",
    officialQuestionsUrl: "https://www.kouiki-kansai.jp/hodo/9257.html", officialReuseTermsUrl: "https://www.kouiki-kansai.jp/hodo/9257.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },
  {
    slug: "chori-nagano", examCode: "chori-nagano", shortName: "調理師試験（長野県）", fullName: "調理師試験（長野県）",
    domain: "personal-services", administrator: "長野県",
    officialQuestionsUrl: "https://www.pref.nagano.lg.jp/shokusei/sangyo/shiken/chorishi/ch_kakomon.html", officialReuseTermsUrl: "https://www.pref.nagano.lg.jp/shokusei/sangyo/shiken/chorishi/ch_kakomon.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },
  {
    slug: "chori-okinawa", examCode: "chori-okinawa", shortName: "調理師試験（沖縄県）", fullName: "調理師試験（沖縄県）",
    domain: "personal-services", administrator: "沖縄県",
    officialQuestionsUrl: "https://www.pref.okinawa.jp/kurashikankyo/shoku/1004023/1027370/1027372.html", officialReuseTermsUrl: "https://www.pref.okinawa.jp/kurashikankyo/shoku/1004023/1027370/1027372.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },
  {
    slug: "chori-shizuoka", examCode: "chori-shizuoka", shortName: "調理師試験（静岡県）", fullName: "調理師試験（静岡県）",
    domain: "personal-services", administrator: "静岡県",
    officialQuestionsUrl: "https://www.pref.shizuoka.jp/kenkofukushi/eiseiyakuji/shokuanzen/shokushiken/1024968.html", officialReuseTermsUrl: "https://www.pref.shizuoka.jp/kenkofukushi/eiseiyakuji/shokuanzen/shokushiken/1024968.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },
  {
    slug: "chori-tochigi", examCode: "chori-tochigi", shortName: "調理師試験（栃木県）", fullName: "調理師試験（栃木県）",
    domain: "personal-services", administrator: "栃木県",
    officialQuestionsUrl: "https://www.pref.tochigi.lg.jp/e07/life/shokuseikatsu/eisei/chourishi/shiken.html", officialReuseTermsUrl: "https://www.pref.tochigi.lg.jp/e07/life/shokuseikatsu/eisei/chourishi/shiken.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },
  {
    slug: "dokugeki-kansai", examCode: "dokugeki-kansai", shortName: "毒物劇物取扱者（関西広域連合）",
    fullName: "毒物劇物取扱者試験（関西広域連合）", domain: "pharmacy", administrator: "関西広域連合",
    officialQuestionsUrl: "https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/dokugeki_1/7605.html",
    officialReuseTermsUrl: "https://www.kouiki-kansai.jp/site/221.html",
    status: "live", stagingDataPath: "data/questions/dokugeki-kansai",
    reuseSummary: "2022～2025年度の一般・農業用品目・特定品目の公式問題・正答と全選択肢の独自解説を収録。",
    attributionTemplate: "出典：関西広域連合 毒物劇物取扱者試験。問題・選択肢をテキスト化。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "dokugeki-tokyo", examCode: "dokugeki-tokyo", shortName: "毒物劇物取扱者（東京都）",
    fullName: "毒物劇物取扱者試験（東京都）", domain: "pharmacy", administrator: "東京都",
    officialQuestionsUrl: "https://www.hokeniryo.metro.tokyo.lg.jp/anzen/iyaku/sonota/d_g/shiken",
    officialReuseTermsUrl: "https://www.hokeniryo.metro.tokyo.lg.jp/policy",
    status: "live", stagingDataPath: "data/questions/dokugeki-tokyo",
    reuseSummary: "2026年度の一般・農業用品目・特定品目の公式問題・正答、原本の構造式と全選択肢の独自解説を収録。",
    attributionTemplate: "出典：東京都 毒物劇物取扱者試験。問題・選択肢をテキスト化。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "homusho-senmonshokuin", examCode: "homusho-senmonshokuin", shortName: "法務省専門職員（人間科学）", fullName: "法務省専門職員（人間科学）採用試験",
    domain: "legal", administrator: "人事院",
    officialQuestionsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_19.html",
    officialReuseTermsUrl: "https://www.jinji.go.jp/shinsei/notice.html",
    status: "live",
    reuseSummary: "2026年度の矯正心理専門職の専門試験・必須問題のうち、公式冊子に本文がある19問を収録。",
    attributionTemplate: "出典：人事院「法務省専門職員（人間科学）採用試験 専門試験（多肢選択式）」。解説は過去問AIの独自作成。",
    remainingWork: ["2026年度の法務教官・保護観察官の必須部分と2025・2024年度の専門択一の補充"],
  },
  {
    slug: "junkango-b", examCode: "junkango-b", shortName: "准看護師（B日程）", fullName: "准看護師試験（B日程）",
    domain: "welfare", administrator: "実施都道府県",
    officialQuestionsUrl: "https://www.pref.kanagawa.jp/docs/t3u/cnt/f5510/documents/junkan.html",
    officialReuseTermsUrl: "https://www.pref.kanagawa.jp/master/sitepolicy.html",
    status: "live",
    reuseSummary: "神奈川・青森・福島・山口・高知・佐賀などの令和6・7年度B日程を、公式正答と全選択肢の解説付きで収録。",
    remainingWork: [],
  },
  {
    slug: "junkango-saitama", examCode: "junkango-saitama", shortName: "准看護師（埼玉県）", fullName: "埼玉県准看護師試験（A日程）",
    domain: "welfare", administrator: "埼玉県",
    officialQuestionsUrl: "https://www.pref.saitama.lg.jp/a0701/eiseishiken/eiseisikenkekka/h29/h29kekka.html",
    officialReuseTermsUrl: "https://www.pref.saitama.lg.jp/a0301/tyosaku-rinku.html",
    status: "live",
    reuseSummary: "埼玉県が公開した令和5年度A日程（休日用）150問を、公式正答と全選択肢の解説付きで収録。",
    remainingWork: [],
  },
  {
    slug: "kokka-ippan-kou", examCode: "kokka-ippan-kou", shortName: "国家一般職（高卒者）", fullName: "国家公務員採用一般職試験（高卒者試験）",
    domain: "legal", administrator: "人事院",
    officialQuestionsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_16.html",
    officialReuseTermsUrl: "https://www.jinji.go.jp/shinsei/notice.html",
    status: "live",
    reuseSummary: "2023～2025年度の基礎能力試験113問と事務区分の適性試験360問を、公式正答・全肢解説付きで収録。",
    attributionTemplate: "出典：人事院「一般職試験（高卒者試験） 基礎能力試験」。解説は過去問AIの独自作成。",
    remainingWork: ["専門試験の補充"],
  },
  {
    slug: "kyoin-gifu", examCode: "kyoin-gifu", shortName: "岐阜県教員採用試験", fullName: "岐阜県公立学校教員採用選考試験",
    domain: "welfare", administrator: "岐阜県教育委員会",
    officialQuestionsUrl: "https://www.pref.gifu.lg.jp/site/edu/415625.html",
    officialReuseTermsUrl: "https://www.pref.gifu.lg.jp/page/79328.html",
    status: "live",
    reuseSummary: "令和8年度採用（2025年度実施）の教職教養10問と小学校の教科専門15問を、公式正答と全肢の解説付きで収録。",
    attributionTemplate: "出典：岐阜県教育委員会 岐阜県公立学校教員採用選考試験。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "kyoin-gunma",
    examCode: "kyoin-gunma",
    shortName: "群馬県教員採用試験",
    fullName: "群馬県公立学校教員採用選考試験",
    domain: "welfare",
    administrator: "群馬県教育委員会",
    officialQuestionsUrl: "https://www.pref.gunma.jp/site/kyouiku/list70-400.html",
    officialReuseTermsUrl: "https://www.pref.gunma.jp/page/15257.html",
    status: "live",
    reuseSummary: "群馬県教員採用試験の一般教養・教職と教科専門の択一式を、公式問題・正答と全選択肢の解説で収録。",
    attributionTemplate: "出典：群馬県教育委員会 群馬県公立学校教員採用選考試験。解説は過去問AIの独自作成。",
    remainingWork: ["2026年度実施の公式問題と正答の確認", "収録済み以外の教科・年度の択一式の確認と追加"],
  },
  {
    slug: "kyoin-hiroshima", examCode: "kyoin-hiroshima", shortName: "広島県・広島市教員採用試験", fullName: "広島県・広島市公立学校教員採用候補者選考試験",
    domain: "welfare", administrator: "広島県・広島市教育委員会",
    officialQuestionsUrl: "https://www.pref.hiroshima.lg.jp/site/04file/r09shikenmondai1ji.html",
    officialReuseTermsUrl: "https://www.pref.hiroshima.lg.jp/site/04file/r09shikenmondai1ji.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。",
    attributionTemplate: "出典：広島県・広島市教育委員会 広島県・広島市公立学校教員採用候補者選考試験。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "kyoin-kobe", examCode: "kyoin-kobe", shortName: "神戸市教員採用試験", fullName: "神戸市立学校園教員採用選考試験",
    domain: "welfare", administrator: "神戸市教育委員会",
    officialQuestionsUrl: "https://www.city.kobe.lg.jp/a55153/shise/shokuinsaiyou/kyouiku/kyosaikako.html",
    officialReuseTermsUrl: "https://www.city.kobe.lg.jp/a57337/homepage/rule.html",
    status: "live",
    reuseSummary: "2023・2025～2027年度採用（2022・2024～2026年度実施）の教職・一般教養184問と、2027年度採用の小学校専門59問（英語コース独自問題2問を含む）を収録。2023年度採用の教職・一般教養の問16は市教委の訂正により全員正答。",
    attributionTemplate: "出典：神戸市教育委員会 神戸市立学校園教員採用選考試験。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "kyoin-kochi", examCode: "kyoin-kochi", shortName: "高知県教員採用試験", fullName: "高知県公立学校教員採用候補者選考審査",
    domain: "welfare", administrator: "高知県教育委員会",
    officialQuestionsUrl: "https://www.pref.kochi.lg.jp/doc/2019112600143/",
    officialReuseTermsUrl: "https://www.pref.kochi.lg.jp/doc/2019112600143/",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。",
    attributionTemplate: "出典：高知県教育委員会 高知県公立学校教員採用候補者選考審査。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "kyoin-nagano", examCode: "kyoin-nagano", shortName: "長野県教員採用試験", fullName: "長野県公立学校教員採用選考",
    domain: "welfare", administrator: "長野県教育委員会",
    officialQuestionsUrl: "https://www.pref.nagano.lg.jp/kyoiku/gimukyo/jukense/r7senkou.html",
    officialReuseTermsUrl: "https://www.pref.nagano.lg.jp/koho/kensei/koho/homepage/riyo.html",
    status: "live",
    reuseSummary: "令和9年度採用（2026年度実施）の教職教養を小・中・義務・特支15問、高校10問、専門教科を小学校26解答単位、中学校社会19解答単位、中学校数学14解答単位収録。令和7年度採用（2024年度実施）の高校一般教養30問も収録。令和9年度小・中・義務・特支の第13問は県教委の訂正により全員正答。",
    attributionTemplate: "出典：長野県教育委員会 長野県公立学校教員採用選考。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "kyoin-nagasaki", examCode: "kyoin-nagasaki", shortName: "長崎県教員採用試験", fullName: "長崎県公立学校教員採用選考試験",
    domain: "welfare", administrator: "長崎県教育委員会",
    officialQuestionsUrl: "https://www.pref.nagasaki.jp/doc/52353.html",
    officialReuseTermsUrl: "https://www.pref.nagasaki.jp/doc/52353.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。",
    attributionTemplate: "出典：長崎県教育委員会 長崎県公立学校教員採用選考試験。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "kyoin-okinawa", examCode: "kyoin-okinawa", shortName: "沖縄県教員採用試験", fullName: "沖縄県公立学校教員候補者選考試験",
    domain: "welfare", administrator: "沖縄県教育委員会",
    officialQuestionsUrl: "https://www.pref.okinawa.jp/kyoiku/edu/1008490/1008535/1008540/1037341/1040383.html",
    officialReuseTermsUrl: "https://www.pref.okinawa.lg.jp/about/index.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。",
    attributionTemplate: "出典：沖縄県教育委員会 沖縄県公立学校教員候補者選考試験。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "kyoin-shimane", examCode: "kyoin-shimane", shortName: "島根県教員採用試験", fullName: "島根県公立学校教員採用候補者選考試験",
    domain: "welfare", administrator: "島根県教育委員会",
    officialQuestionsUrl: "https://www.pref.shimane.lg.jp/admin/syokuin/saiyou/saiyou_info_tchr/kakomondai.html",
    officialReuseTermsUrl: "https://www.pref.shimane.lg.jp/cl.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。",
    attributionTemplate: "出典：島根県教育委員会 島根県公立学校教員採用候補者選考試験。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "kyotsu-joho1", examCode: "kyotsu-joho1", shortName: "大学入学共通テスト 情報Ⅰ",
    fullName: "大学入学共通テスト 情報Ⅰ", domain: "information-technology", administrator: "独立行政法人大学入試センター",
    officialQuestionsUrl: "https://www.dnc.ac.jp/kyotsu/kakomondai/",
    officialReuseTermsUrl: "https://www.dnc.ac.jp/kyotsu/kakomondai/",
    status: "live",
    reuseSummary: "大学入試センターの公式問題・正答と全選択肢の独自解説を部分収録。",
    attributionTemplate: "出典：独立行政法人大学入試センター「大学入学共通テスト 情報Ⅰ」。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "shokuhin-eisei-kanshiin", examCode: "shokuhin-eisei-kanshiin", shortName: "食品衛生監視員", fullName: "食品衛生監視員採用試験",
    domain: "pharmacy", administrator: "人事院",
    officialQuestionsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_22.html",
    officialReuseTermsUrl: "https://www.jinji.go.jp/shinsei/notice.html",
    status: "live",
    reuseSummary: "2024年度の基礎能力試験（専門職共通）30問を、公式正答と全肢解説付きで収録。",
    attributionTemplate: "出典：人事院「基礎能力試験（食品衛生監視員などの共通問題）」。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "tohan-chugoku-shikoku",
    examCode: "tohan-chugoku-shikoku",
    shortName: "登録販売者（中国・四国）",
    fullName: "登録販売者試験（中国・四国）",
    domain: "pharmacy",
    administrator: "広島県・香川県など",
    officialQuestionsUrl: "https://www.pref.hiroshima.lg.jp/site/tourokuhannbaisya/iyakuhintourokuhanbaisya.html",
    status: "live",
    reuseSummary: "令和7・8年度の中国・四国共通問題を、公式正答と全選択肢の解説付きで演習できます。",
    attributionTemplate: "出典：広島県 令和○年度登録販売者試験（午前／午後）問○",
    remainingWork: [],
    officialReuseTermsUrl: "https://www.pref.hiroshima.lg.jp/site/tourokuhannbaisya/iyakuhintourokuhanbaisya.html",
  },
  {
    slug: "tohan-hokkaido-tohoku",
    examCode: "tohan-hokkaido-tohoku",
    shortName: "登録販売者（北海道・東北）",
    fullName: "登録販売者試験（北海道・東北）",
    domain: "pharmacy",
    administrator: "北海道・宮城県",
    officialQuestionsUrl: "https://www.pref.hokkaido.lg.jp/hf/iyk/iry/yakuji/tourokuhannbaishashikenmondai.html",
    status: "live",
    reuseSummary: "令和7・8年度の北海道・東北共通問題を、公式正答と全選択肢の解説付きで演習できます。",
    attributionTemplate: "出典：北海道 令和○年度登録販売者試験（午前／午後）問○",
    remainingWork: [],
    officialReuseTermsUrl: "https://www.pref.hokkaido.lg.jp/hf/iyk/iry/yakuji/tourokuhannbaishashikenmondai.html",
  },
  {
    slug: "tohan-kitakanto-koshinetsu",
    examCode: "tohan-kitakanto-koshinetsu",
    shortName: "登録販売者（北関東・甲信越）",
    fullName: "登録販売者試験（北関東・甲信越）",
    domain: "pharmacy",
    administrator: "群馬県・栃木県・新潟県",
    officialQuestionsUrl: "https://www.pref.gunma.jp/page/3061.html",
    status: "live",
    reuseSummary: "令和7・8年度の北関東・甲信越共通問題を、公式正答と全選択肢の解説付きで演習できます。",
    attributionTemplate: "出典：群馬県 令和○年度登録販売者試験（第一部／第二部）問○",
    remainingWork: [],
    officialReuseTermsUrl: "https://www.pref.gunma.jp/page/3061.html",
  },
  {
    slug: "tohan-kyushu-okinawa",
    examCode: "tohan-kyushu-okinawa",
    shortName: "登録販売者（九州・沖縄）",
    fullName: "登録販売者試験（九州・沖縄）",
    domain: "pharmacy",
    administrator: "福岡県・沖縄県など",
    officialQuestionsUrl: "https://www.pref.fukuoka.lg.jp/contents/kakotorokuhanbaisyasiken.html",
    status: "live",
    reuseSummary: "令和6・7年度の九州・沖縄共通問題を、公式正答と全選択肢の解説付きで演習できます。",
    attributionTemplate: "出典：福岡県 令和○年度登録販売者試験（午前／午後）問○",
    remainingWork: [],
    officialReuseTermsUrl: "https://www.pref.fukuoka.lg.jp/contents/kakotorokuhanbaisyasiken.html",
  },
  {
    slug: "tohan-tokai-hokuriku",
    examCode: "tohan-tokai-hokuriku",
    shortName: "登録販売者（東海・北陸）",
    fullName: "登録販売者試験（東海・北陸）",
    domain: "pharmacy",
    administrator: "愛知県・静岡県・岐阜県・石川県",
    officialQuestionsUrl: "https://www.pref.aichi.jp/soshiki/iyaku/0000061464.html",
    status: "live",
    reuseSummary: "令和6〜8年度の東海・北陸共通問題を、公式正答と全選択肢の解説付きで演習できます。",
    attributionTemplate: "出典：愛知県 令和○年度登録販売者試験（前半／後半）問○",
    remainingWork: [],
    officialReuseTermsUrl: "https://www.pref.aichi.jp/soshiki/iyaku/0000061464.html",
  },

  {
    slug: "kaijo-hoan-gakko", examCode: "kaijo-hoan-gakko", shortName: "海上保安学校学生", fullName: "海上保安学校学生採用試験",
    domain: "legal", administrator: "人事院",
    officialQuestionsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_31.html",
    officialReuseTermsUrl: "https://www.jinji.go.jp/shinsei/notice.html",
    status: "live",
    reuseSummary: "2023～2026年度の特別試験、2023・2024年度の通常試験の基礎能力試験221問と、2023～2025年度の学科試験（数学・英語・物理）97問を公式正答・全肢解説付きで収録。",
    attributionTemplate: "出典：人事院「海上保安学校学生採用試験 基礎能力試験」。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "keimukan", examCode: "keimukan", shortName: "刑務官", fullName: "刑務官採用試験",
    domain: "legal", administrator: "人事院",
    officialQuestionsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_26.html",
    officialReuseTermsUrl: "https://www.jinji.go.jp/shinsei/notice.html",
    status: "live",
    reuseSummary: "2023～2025年度の刑務官採用試験の基礎能力試験112問を公式正答・全肢解説・原図付きで収録。",
    attributionTemplate: "出典：人事院「刑務官採用試験 基礎能力試験」。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "kokka-sogo-kyoyo", examCode: "kokka-sogo-kyoyo", shortName: "国家総合職（教養区分）", fullName: "国家公務員採用総合職試験（大卒程度試験・教養区分）",
    domain: "legal", administrator: "人事院",
    officialQuestionsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_14.html",
    officialReuseTermsUrl: "https://www.jinji.go.jp/shinsei/notice.html",
    status: "live",
    reuseSummary: "2023～2025年度秋試験の基礎能力試験Ⅰ・Ⅱ部153問と、2026年度春試験のⅡ部20問を公式正答・全肢解説付きで収録。",
    attributionTemplate: "出典：人事院「総合職試験（大卒程度試験・教養区分）」。解説は過去問AIの独自作成。",
    remainingWork: ["2026年度秋試験の問題・正答は人事院の問題例一覧への掲載後に確認"],
  },
  {
    slug: "zaimu-senmonkan", examCode: "zaimu-senmonkan", shortName: "財務専門官", fullName: "財務専門官採用試験",
    domain: "finance", administrator: "人事院",
    officialQuestionsUrl: "https://www.jinji.go.jp/saiyo/siken/mondairei/mondairei_20.html",
    officialReuseTermsUrl: "https://www.jinji.go.jp/shinsei/notice.html",
    status: "live",
    reuseSummary: "2024～2026年度の専門試験（多肢選択式）のうち、憲法、行政法、経済学、社会学の計28問を公式正答・全肢解説付きで収録。",
    attributionTemplate: "出典：人事院「財務専門官採用試験 専門試験（多肢選択式）」。解説は過去問AIの独自作成。",
    remainingWork: [],
  },
  {
    slug: "chori-ehime", examCode: "chori-ehime", shortName: "調理師試験（愛媛県）", fullName: "調理師試験（愛媛県）",
    domain: "personal-services", administrator: "愛媛県",
    officialQuestionsUrl: "https://www.pref.ehime.jp/page/55585.html", officialReuseTermsUrl: "https://www.pref.ehime.jp/page/55585.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },

  {
    slug: "chori-nara", examCode: "chori-nara", shortName: "調理師試験（奈良県）", fullName: "調理師試験（奈良県）",
    domain: "personal-services", administrator: "奈良県",
    officialQuestionsUrl: "https://www.pref.nara.lg.jp/n086/4687.html", officialReuseTermsUrl: "https://www.pref.nara.lg.jp/n086/4687.html",
    status: "live",
    reuseSummary: "公式問題・正答と全選択肢の独自解説を収録。法令・制度は出題時点。",
    remainingWork: [],
  },
] as const;

export function getQualificationByExamCode(exam: ExamCode): QualificationCatalogEntry | undefined {

  return QUALIFICATION_CATALOG.find((item) => item.examCode === canonicalExamCode(exam));

}

/** Public routes and question registries must call this gate before exposing external data. */
export function isExamPublished(exam: ExamCode): boolean {

  if (exam === "khk-kagaku" && !khkPublication.publicAllowed) return false;

  return getQualificationByExamCode(exam)?.status === "live" || !getQualificationByExamCode(exam);

}
