import type { Question } from "@/lib/questions/types";

const examUrl = "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf";
const standardRulesUrl = "https://www.mansion-info.mlit.go.jp/wp-content/uploads/2025/03/01_%E7%AE%A1%E7%90%86%E8%A6%8F%E7%B4%84%EF%BC%88%E5%8D%98%E6%A3%9F%E5%9E%8B%EF%BC%89.pdf";

/** 試験時点の令和6年6月改正版マンション標準管理規約と公式正答を照合した3問。 */
export const KANRI_BATCH_05: Question[] = [
  {
    id: "kanri-2025-annual-gakka-q29", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 29, officialAnswerNumber: "2", type: "multiple-choice",
    category: "標準管理規約", topicTags: ["所在不明区分所有者", "管理費", "探索費用"], difficulty: 3,
    question: "区分所有者Aへ管理費の請求書が届かず、所在が不明になった。標準管理規約（単棟型）による次の説明のうち、不適切なものはいくつあるか。\nア　理事長は、理事会の決議を経ずに区分所有者の所在等を探索できる。\nイ　探索で所有者がBに変更されていたと判明したが、Bは取得届出書を出すまで組合員ではない。\nウ　探索のため取得した登記事項証明書の交付費用は、管理費とともにBへ請求できる。\nエ　Bが払わないため理事長が管理組合を代表して訴訟を起こすには、理事会の決議が必要である。",
    choices: { ア: "一つ", イ: "二つ", ウ: "三つ", エ: "四つ" },
    answer: "イ", explanation: "正解は2。アとイが不適切。所在等の探索には理事会決議が必要で、組合員資格は届出ではなく区分所有者となった時に取得する。登記事項証明書の交付費用を探索費として請求でき、管理費回収訴訟には理事会決議を要する。",
    choiceExplanations: {
      ア: "一つではない。理事会決議のない探索と、届出までBが組合員でないとする説明の二つが不適切。",
      イ: "正しい。標準管理規約30条・54条・67条の2に照らすと、アとイの二つが不適切である。",
      ウ: "三つではない。登記事項証明書の交付費用は探索費用に含めてBへ請求できるため、ウは適切。",
      エ: "四つではない。管理費回収の訴訟は60条4項により理事会決議を経て行うため、エは適切。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問29を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [standardRulesUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q30", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 30, officialAnswerNumber: "3", type: "multiple-choice",
    category: "標準管理規約", topicTags: ["組合員名簿", "居住者名簿", "個人情報"], difficulty: 2,
    question: "組合員等の情報に関する次の記述のうち、標準管理規約（単棟型）によれば、最も不適切なものはどれか。",
    choices: {
      ア: "専有部分を第三者に譲渡した場合のみならず、相続によって区分所有権を取得した場合においても、当該包括承継人は、その旨の届出を管理組合に提出する必要がある。",
      イ: "理事長は、組合員から届け出られた内容について、毎年1回以上、届出事項や名簿記載内容等に変更が生じた場合は届け出る必要があることを周知する等して、名簿記載内容が最新の情報となっていることを確認しなければならない。",
      ウ: "理事長は、組合員名簿を作成、保管すれば足り、その他に、賃借人を含む現にマンションに居住している者の居住者名簿は作成、保管する必要はない。",
      エ: "理事長は、組合員から相当の理由を付した書面による請求があったときでも、組合員名簿等に記載されている内容のうち、閲覧等の請求の理由に照らして不要と思われる項目については、開示しないことも可能である。",
    },
    answer: "ウ", explanation: "正解は3。標準管理規約64条の2は、組合員名簿と居住者名簿の両方の作成・保管を理事長に求める。賃借人等の現居住者も対象となる。",
    choiceExplanations: {
      ア: "適切。相続による区分所有権取得も組合員資格の取得であり、31条の届出が必要である。",
      イ: "適切。64条の2は名簿内容を毎年1回以上確認する義務を定め、周知はその方法の一つである。",
      ウ: "不適切。64条の2は組合員名簿に加えて、賃借人等を含む居住者名簿の作成・保管も求める。",
      エ: "適切。64条の2のコメントはプライバシーを考慮し、請求理由に不要な項目を開示しないことを認める。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問30（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [standardRulesUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
  {
    id: "kanri-2025-annual-gakka-q31", exam: "kanri", session: "gakka", year: 2025,
    season: "annual", qNumber: 31, officialAnswerNumber: "1", type: "multiple-choice",
    category: "標準管理規約", topicTags: ["収支予算", "通常総会", "理事会"], difficulty: 3,
    question: "会計年度が5月1日から翌年4月30日までの管理組合における理事長の行為について、標準管理規約（単棟型）によれば、不適切なものはいくつあるか。\nア　通常総会の期日を新会計年度開始後の6月17日として招集した。\nイ　監事の会計監査を経ずに通常総会へ収支予算案を提出し、承認を得た。\nウ　予算承認前に理事会の承認を得て、5月10日に経常的な管理員人件費を支払った。\nエ　通常総会で承認済みの収支予算を、理事会の承認で変更し、次年度の通常総会で報告した。",
    choices: { ア: "一つ", イ: "二つ", ウ: "三つ", エ: "四つ" },
    answer: "ア", explanation: "正解は1。エだけが不適切。標準管理規約58条2項では、収支予算の変更案は臨時総会へ提出して承認を得る。理事会だけの承認と翌年度の報告では足りない。",
    choiceExplanations: {
      ア: "正しい。エのみ不適切。通常総会、予算案、承認前の経常費支出は各条項の条件を満たす。",
      イ: "二つではない。監事の会計監査は収支決算案の会計報告に必要で、収支予算案には要求されない。",
      ウ: "三つではない。通常総会は新会計年度開始後2か月以内の6月17日に開き、経常費は理事会承認で支出できる。",
      エ: "四つではない。誤りは予算変更を理事会承認と翌年度報告だけで済ませたエの一つである。",
    },
    explanationCoverage: "full", hasImage: false, sourcePdfUrl: examUrl, sourceAnswerUrl: examUrl,
    sourceAttribution: "出典：令和7年度 管理業務主任者試験問題 問31を改題（一般社団法人マンション管理業協会）",
    officialReferenceUrls: [standardRulesUrl], license: "KANRIKYO-educational-reuse", needsReview: false,
    lastUpdated: "2026-09-27", lawReferenceDate: "2025-04-01",
  },
];
