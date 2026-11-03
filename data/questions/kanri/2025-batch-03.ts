import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";
const taxUrl = "https://www.nta.go.jp/law/shitsugi/shohi/02/26.htm";
const taxThresholdUrl = "https://www.nta.go.jp/law/tsutatsu/kihon/shohi/01/05.htm";
const landLeaseUrl = "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shohi/6225.htm";
const accountingUrl = "https://www.mlit.go.jp/jutakukentiku/house/content/001710452.pdf";
const elevatorUrl = "https://www.mlit.go.jp/jutakukentiku/build/jutakukentiku_house_tk_000105.html";
const fireLawUrl = "https://laws.e-gov.go.jp/law/323AC1000000186?occasion_date=20250401";
const fireAgencyUrl = "https://www.fdma.go.jp/singi_kento/singi/items/h25_01_shiryo2.pdf";

/** 令和7年度公式正答と国税庁・国交省・消防庁の一次資料を照合した7問。 */
export const KANRI_BATCH_03: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q9", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 9, officialAnswerNumber: "1", type: "multiple-choice",
    category: "消費税", topicTags: ["管理組合", "課税売上高", "特定期間"], difficulty: 3,
    question: "次の記述のうち、消費税法によれば、管理組合が当課税期間において、必ず消費税の課税事業者となるものはいくつあるか。\nア　基準期間における甲管理組合の敷地の一部貸出による組合員以外の第三者からの賃料収入は980万円、その他、組合員以外の第三者からの駐車場使用料収入は120万円であり、特定期間における当該敷地の一部貸出による組合員以外の第三者からの賃料収入は460万円、その他、組合員以外の第三者からの駐車場使用料収入は42万円であったが、特定期間における甲管理組合採用の職員に対する給与等支払額は1,050万円であった。\nイ　基準期間における乙管理組合の全収入は2,974万円であり、その内訳は、管理費等収入が2,400万円、駐車場使用料収入が550万円（組合員以外の第三者からのもの120万円を含む。）、専用庭使用料収入が24万円であったが、基準期間以降についても同額の収入構成であった。\nウ　基準期間における丙管理組合の課税売上高は980万円であり、特定期間における課税売上高は1,050万円であったが、特定期間における丙管理組合採用の職員に対する給与等支払額は550万円であった。\nエ　基準期間における丁管理組合の課税売上高は850万円、特定期間における課税売上高は1,450万円であったが、特定期間における丁管理組合採用の職員に対する給与等支払額は1,250万円であった。",
    choices: { ア: "一つ", イ: "二つ", ウ: "三つ", エ: "四つ" },
    answer: "ア", explanation: "正解は1。必ず課税事業者となるのはエ（丁管理組合）だけ。アの敷地の一部貸出980万円は土地の貸付けとして原則非課税で、甲の基準期間の課税売上高は第三者への駐車場使用料120万円にとどまる。イの乙も組合員向け収入を除くと第三者向け120万円。ウの丙は特定期間の給与等支払額550万円で判定を選べる。一方、丁は特定期間の課税売上高1,450万円・給与等支払額1,250万円のどちらも1,000万円を超える。",
    choiceExplanations: {
      ア: "正しい。エのみ。丁は特定期間の課税売上高と給与等支払額の両方が1,000万円超である。甲の土地賃料は原則非課税。",
      イ: "二つではない。甲の土地の貸付け980万円は非課税であり、丙は特定期間の給与等支払額550万円を基準に判定できる。",
      ウ: "三つではない。乙の管理費等や組合員向け駐車場使用料は対価性がなく不課税で、第三者向けの駐車場使用料は120万円。",
      エ: "四つではない。全収入が課税売上高になるわけではなく、甲・乙・丙は必ず課税事業者になるとはいえない。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問9（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [taxUrl, taxThresholdUrl, landLeaseUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q10", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 10, officialAnswerNumber: "3", type: "multiple-choice",
    category: "管理組合会計", topicTags: ["貸借対照表", "資産", "負債"], difficulty: 2,
    question: "甲管理組合の一般（管理費）会計の貸借対照表に、次の9科目が配置されている。資産の部：現金預金100万円、未収入金22万円、預り金6万円、前払保険料1.2万円、什器及び備品50万円。負債・繰越金の部：未払金23.2万円、前払金4.5万円、仮払金1.5万円、次期繰越金150万円。不適切な配置の科目はいくつあるか。",
    choices: { ア: "一つ", イ: "二つ", ウ: "三つ", エ: "四つ" },
    answer: "ウ", explanation: "正解は3。預り金は返還・支払義務があるため負債、前払金と仮払金は将来精算される資産に当たる。誤配置はこの三つ。表形式の原問を文章形式に改題した。",
    choiceExplanations: {
      ア: "一つではない。預り金は負債、前払金と仮払金は資産であり、誤配置は三つある。",
      イ: "二つではない。負債側の前払金・仮払金の二つに加え、資産側の預り金も誤り。",
      ウ: "正しい。預り金、前払金、仮払金の三科目だけが貸借対照表の反対側に計上されている。",
      エ: "四つではない。未払金は負債、未収入金・前払保険料・什器及び備品は資産、次期繰越金は負債・繰越金側でよい。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問10を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [accountingUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q11", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 11, officialAnswerNumber: "2", type: "multiple-choice",
    category: "管理組合会計", topicTags: ["発生主義", "前払費用", "未払金"], difficulty: 3,
    question: "甲管理組合は4月1日から翌年3月31日までを会計年度とし、毎月発生主義で処理する。令和7年3月31日に、4月分管理委託費250万円、2月分水道光熱費36万円、4月工事予定の修繕費着手金64万円を普通預金から合計350万円支払った。3月分の仕訳として最も適切なものはどれか。",
    choices: {
      ア: "借方：管理委託費250万円・水道光熱費36万円・前払金64万円／貸方：普通預金350万円",
      イ: "借方：前払費用250万円・未払金36万円・前払金64万円／貸方：普通預金350万円",
      ウ: "借方：管理委託費250万円・水道光熱費36万円・修繕費64万円／貸方：普通預金350万円",
      エ: "借方：前払費用250万円・未払金36万円・修繕費64万円／貸方：普通預金350万円",
    },
    answer: "イ", explanation: "正解は2。4月分の管理委託費は3月末では前払費用、2月分の水道光熱費は計上済み未払金の決済、4月工事の着手金は前払金。原問の仕訳表を文章形式に改題した。",
    choiceExplanations: {
      ア: "誤り。4月分委託費を3月の費用、2月分光熱費を再度費用としている。",
      イ: "正しい。翌月の役務の対価は前払費用、前月の債務決済は未払金の借方、未施工の着手金は前払金とする。",
      ウ: "誤り。支払った三費目を全て3月費用にすると、発生主義による期間帰属と合わない。",
      エ: "誤り。4月に実施する修繕工事の着手金64万円は3月の修繕費でなく前払金。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問11を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [accountingUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q12", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 12, officialAnswerNumber: "4", type: "multiple-choice",
    category: "管理組合会計", topicTags: ["発生主義", "前受金", "未収入金"], difficulty: 4,
    question: "甲管理組合は4月1日から翌年3月31日までを会計年度とし、毎月発生主義で処理する。令和7年3月分の管理費270万円・修繕積立金70万円は2月末までに前受けした。3月中には管理費295万円（2月以前分12万円・3月分3万円・4月分280万円）と修繕積立金100万円（2月以前分4万円・3月分1万円・4月分95万円）が入金した。3月末には3月分管理費3万円・修繕積立金1万円が未収である。3月の仕訳として最も適切なものはどれか。",
    choices: {
      ア: "普通預金395万円を借方、管理費収入295万円・修繕積立金収入100万円を貸方に計上する。",
      イ: "普通預金395万円・未収入金4万円を借方、管理費収入286万円・修繕積立金収入97万円・未収入金16万円を貸方に計上する。",
      ウ: "普通預金395万円・前受金340万円を借方、管理費収入285万円・修繕積立金収入75万円・前受金375万円を貸方に計上する。",
      エ: "普通預金395万円・前受金340万円・未収入金4万円を借方、管理費収入276万円・修繕積立金収入72万円・前受金375万円・未収入金16万円を貸方に計上する。",
    },
    answer: "エ", explanation: "正解は4。3月収入は管理費270＋3＋3＝276万円、修繕積立金70＋1＋1＝72万円。前月に受け取った3月分340万円を前受金から振り替え、4月分375万円を前受金に計上する。2月以前分未収16万円を消し込み、3月末未収4万円を計上する。原問の仕訳表を文章形式に改題した。",
    choiceExplanations: {
      ア: "誤り。現金主義の収入額であり、4月分前受と過去分未収の回収を3月収入に混ぜている。",
      イ: "誤り。前受金の旧340万円の振替と新375万円の計上がなく、管理費・修繕積立金の当月収入額も一致しない。",
      ウ: "誤り。前受金の振替はあるが、過去分未収16万円の消込みと当月末未収4万円の計上がない。",
      エ: "正しい。借方395＋340＋4＝739万円、貸方276＋72＋375＋16＝739万円となり、期間帰属と未収・前受の精算が一致する。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問12を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [accountingUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q13", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 13, officialAnswerNumber: "3", type: "multiple-choice",
    category: "建築設備", topicTags: ["エレベーター", "定期検査", "戸開走行保護"], difficulty: 3,
    question: "エレベーターに関する次の記述のうち、最も不適切なものはどれか。",
    choices: {
      ア: "建築物に設ける昇降機は、建築基準法において建築設備として定義されている。",
      イ: "エレベーターの管理者は、当該エレベーターの保守点検業者の保守点検が適切に行われているかどうかを専門的知見を有する第三者に現場で調査させることができる。",
      ウ: "建築基準法に基づき建築設備検査員資格者証の交付を受けている者は、昇降機について建築基準法第12条第3項に規定する検査を行うことができる。",
      エ: "エレベーターの戸開走行保護装置とは、駆動装置又は制御器に故障が生じ、かご及び昇降路のすべての出入口の戸が閉じる前にかごが昇降した場合などに、自動的にかごを制止する装置をいう。",
    },
    answer: "ウ", explanation: "正解は3。昇降機の定期検査を行えるのは昇降機等検査員または建築士であり、建築設備検査員資格者証だけでは足りない。",
    choiceExplanations: {
      ア: "適切。建築基準法は昇降機を建築設備に含める。",
      イ: "適切。国交省の昇降機維持管理指針では、保守点検状況について専門知識のある第三者による調査を活用できる。",
      ウ: "正しい。設問の不適切な記述。昇降機の法定検査は昇降機等検査員資格者証等が必要で、建築設備検査員だけでは行えない。",
      エ: "適切。戸が閉じる前の走行や停止位置の著しい移動を検知し、かごを自動で制止する装置である。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問13（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [elevatorUrl, "https://www.mlit.go.jp/report/press/content/001321962.pdf"], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q14", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 14, officialAnswerNumber: "2", type: "multiple-choice",
    category: "消防法", topicTags: ["防火管理者", "消防計画", "共同住宅"], difficulty: 2,
    question: "居住者が50人の共同住宅の防火管理者に関する次の記述のうち、消防法によれば、最も不適切なものはどれか。ただし、『管理権原者』とは共同住宅の管理について権原を有する者をいう。",
    choices: {
      ア: "管理権原者は、防火管理者を定める必要がある。",
      イ: "管理権原者は、消防計画を自ら作成しなければならない。",
      ウ: "管理権原者は、防火管理者に、消防の用に供する設備、消防用水又は消火活動上必要な施設の点検及び整備を行わせなければならない。",
      エ: "管理権原者は、防火管理者を定めたときは、遅滞なくその旨を所轄消防長又は消防署長に届け出なければならない。",
    },
    answer: "イ", explanation: "正解は2。消防法8条では管理権原者が防火管理者を定め、その防火管理者に消防計画の作成などの業務を行わせる。管理権原者自身が作成する義務とはしていない。",
    choiceExplanations: {
      ア: "適切。共同住宅で収容人員50人以上の場合、防火管理者を定める対象となる。",
      イ: "正しい。設問の不適切な記述。消防計画は選任された防火管理者に作成させる。",
      ウ: "適切。消防用設備等の点検・整備を防火管理者に行わせることは消防法8条の業務に含まれる。",
      エ: "適切。防火管理者を選任したときは、所轄消防長又は消防署長への遅滞ない届出が必要。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問14（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [fireLawUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q15", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 15, officialAnswerNumber: "4", type: "multiple-choice",
    category: "消防法", topicTags: ["自衛消防組織", "防炎", "避難施設"], difficulty: 2,
    question: "次の記述のうち、消防法によれば、最も不適切なものはどれか。ただし、『管理権原者』とは共同住宅の管理について権原を有する者をいう。",
    choices: {
      ア: "住宅の関係者は、住宅用防災機器を政令で定める設置及び維持に関する基準に従って設置し、及び維持しなければならない。",
      イ: "高さ31メートルを超える共同住宅において使用するカーテンは、政令で定める基準以上の防炎性能を有するものでなければならない。",
      ウ: "管理権原者は、共同住宅の廊下、階段、避難口その他の避難上必要な施設について避難の支障になる物件が放置され、又はみだりに存置されないように管理しなければならない。",
      エ: "管理権原者は、共同住宅の規模にかかわらず、政令に定めるところにより自衛消防組織を置かなければならない。",
    },
    answer: "エ", explanation: "正解は4。消防法上の自衛消防組織の設置義務は一定の大規模・高層の防火対象物に限られ、共同住宅は消防庁が示す義務対象の用途から除かれる。規模にかかわらず必要という記述は誤り。",
    choiceExplanations: {
      ア: "適切。住宅用防災機器には法令に定める設置・維持義務がある。",
      イ: "適切。高さ31メートル超の高層共同住宅では防炎性能のあるカーテンが必要。",
      ウ: "適切。廊下、階段、避難口等を避難の支障となる物件から守る管理義務がある。",
      エ: "正しい。設問の不適切な記述。共同住宅は自衛消防組織の義務対象から除かれ、少なくとも『規模にかかわらず』は成立しない。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問15（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [fireLawUrl, fireAgencyUrl, "https://www.fdma.go.jp/pressrelease/houdou/assets/261104_1houdou_01_houdoushiryou.pdf"],
    license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
