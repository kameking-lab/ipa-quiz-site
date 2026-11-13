import { isSelfReviewedDescriptiveQuestion } from "@/lib/questions/descriptive";
import { PAYWALLED_SELECTOR } from "@/lib/billing/paywall";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { questionPagePath } from "@/lib/seo/question-url";
import { recordedContentDate } from "@/lib/questions/last-updated";
import { formatNativeBAnswer } from "@/lib/questions/native-b";
import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";
import { formatNumericAnswer } from "@/lib/questions/numeric";
import { formatOrderingAnswer } from "@/lib/questions/ordering";
import { parsePracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";
import type { ChoiceKey, ExamCode, Question } from "@/lib/questions/types";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { ORG_ID, SITE_ID, STUDENT_AUDIENCE } from "@/lib/seo/structured-data";

/**
 * Qualify a date-only ISO string (`YYYY-MM-DD`) with the JST timezone so it
 * becomes a full ISO 8601 datetime (`YYYY-MM-DDT00:00:00+09:00`). The exam and
 * update dates are Japan-local, so +09:00 is the correct anchor. Inputs that
 * already carry a time component pass through unchanged.
 */
function toJstDateTimeISO(iso: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00+09:00` : iso;
}

/** Human-readable label for an exam session segment. */
export function sessionLabel(session: string, exam?: ExamCode): string {
  const parsed = parsePracticeSession(session);
  if (parsed && (exam === "kisho" || exam === "kenchiku-setsubishi" || exam === "chizai2" || exam === "kanteishi" || exam === "kaikeishi")) return practiceSessionLabel(parsed, exam);
  if (parsed && (exam === "kanteishi" || exam === "kaikeishi" || exam?.startsWith("khk-reito-"))) return practiceSessionLabel(parsed, exam);
  if (parsed && (exam === "kenki1" || exam === "kenki2" || exam === "kanteishi" || exam === "kaikeishi")) return practiceSessionLabel(parsed, exam);
  if (parsed && ["gyosei", "kanri", "kansa", "rousai", "koyou", "kenpo", "kounen", "kokunen", "ippan", "sentaku", "required", "theory", "practical", "kiso", "kogaku-a", "kogaku-b", "hoki", "tiri"].includes(parsed)) return practiceSessionLabel(parsed);
  const map: Record<string, string> = {
    "constitution": "憲法",
    "civil-law": "民法",
    "criminal-law": "刑法",
    "admin-law": "行政法",
    "commercial-law": "商法",
    "civil-procedure": "民事訴訟法",
    "criminal-procedure": "刑事訴訟法",
    "tsukan-law": "通関業法",
    "customs-law": "関税法等",
    "tsukan-practical": "通関実務",
    "patent": "特許・実用新案",
    "design": "意匠",
    "trademark": "商標",
    "treaty": "条約",
    "copyright": "著作権法・不正競争防止法",
    "dokugeki-ippan": "一般",
    "dokugeki-nougyou": "農業用品目",
    "dokugeki-tokutei": "特定品目",
    "gakka-I": "学科I（計画）",
    "gakka-II": "学科II（法規）",
    "gakka-III": "学科III（構造）",
    "gakka-IV": "学科IV（施工）",
    "yakkan": "旅行業約款",
    "jitsumu": "国内旅行実務",

    keikaku: "計画", "kankyo-setsubi": "環境・設備", kozo: "構造", sekou: "施工",
    gakushiki: "学識",
    hoan: "保安管理技術",
    am: "午前",
    am1: "午前I",
    am2: "午前II",
    pm: "午後",
    pm1: "午後I",
    pm2: "午後II",
    "kamoku-a": "科目A",
    "kamoku-b": "科目B",
    gakka: "学科",
    riron: "理論",
    denryoku: "電力",
    kikai: "機械",
    houki: "法規",
    kogaku: "無線工学",
    "gas-law": "法令",
    "gas-basic": "基礎",
    "khk-ax": "KHK AX",
    "khk-ay": "KHK AY",
    "khk-az": "KHK AZ",
    "khk-bx": "KHK BX",
    "khk-by": "KHK BY",
    "khk-bz": "KHK BZ",
    "khk-cx": "KHK CX",
    "khk-cy": "KHK CY",
    "khk-cz": "KHK CZ",
    "khk-dx": "KHK DX",
    "khk-dy": "KHK DY",
    "khk-dz": "KHK DZ",
    "gas-technology": "ガス技術",
    "jken-basic": "基本スキル", "jken-programming": "プログラミングスキル", "jken-design": "システムデザインスキル",
    wagashi: "和菓子（選択）", yogashi: "洋菓子（選択）", seipan: "製パン（選択）",
    "measurement-basic": "計量に関する基礎知識",
    "measurement-mass": "計量器概論及び質量の計量",
    "measurement-chemistry": "環境計量に関する基礎知識（化学）",
    "measurement-concentration": "化学分析概論及び濃度の計量",
    "measurement-physics": "環境計量に関する基礎知識（物理）",
    "measurement-sound": "音響・振動概論並びに音圧レベル及び振動加速度レベルの計量",
    "measurement-management": "計量管理概論",
    "kenki-type1": "第1種（ブルドーザ等）",
    "kenki-type2": "第2種（油圧ショベル等）",
    "kenki-type3": "第3種（モータグレーダ）",
    "kenki-type4": "第4種（締固め機械）",
    "kenki-type5": "第5種（舗装機械）",
    "kenki-type6": "第6種（基礎工事機械）",

    "mondai-a": "問題A",
    "mondai-b": "問題B",
  "mondai-c": "問題C",
  "mondai-d": "問題D",
    kyotsu: "共通科目",
    senmon: "専門科目",
    "hoiku-genri": "保育原理",
    "kyoiku-genri": "教育原理",
    "shakaiteki-yougo": "社会的養護",
    "kodomo-katei-fukushi": "子ども家庭福祉",
    "shakai-fukushi": "社会福祉",
    "hoiku-shinrigaku": "保育の心理学",
    "kodomo-hoken": "子どもの保健",
    "kodomo-shokueiyou": "子どもの食と栄養",
    "hoiku-jisshu-riron": "保育実習理論",
    "keizai": "経済学・経済政策",
    "zaimu": "財務・会計",
    "kigyo": "企業経営理論",
    "unei": "運営管理（オペレーション・マネジメント）",
    "keiei-houmu": "経営法務",
    "keiei-joho": "経営情報システム",
    "chusho-seisaku": "中小企業経営・中小企業政策",
  };
  return map[session] ?? session.toUpperCase();
}

export interface QuestionBreadcrumbItem { name: string; href: string }

/** One requested-context trail for visible navigation and BreadcrumbList. */
export function questionBreadcrumbItems(q: Question, requestedUrl = `${SITE_BASE_URL}${questionPagePath(q)}`): QuestionBreadcrumbItem[] {
  return [
    { name: "ホーム", href: "/" },
    { name: questionSourceExam(q), href: `/${q.exam}` },
    { name: questionSourceEdition(q), href: `/${q.exam}/${q.year}-${q.season}` },
    { name: `問${questionNumberLabel(q)}`, href: requestedUrl },
  ];
}

export interface QuestionJsonLdInput {
  question: Question;
  /** Absolute canonical URL of the question page. */
  pageUrlAbs: string;
  /** Page <title>, reused for the LearningResource name. */
  title: string;
  /** ISO timestamp of the last data update, used for dateModified. */
  lastUpdatedISO?: string;
  /** Requested breadcrumb context may differ from the canonical resource. */
  requestedPageUrlAbs?: string;
  breadcrumbItems?: QuestionBreadcrumbItem[];

}

/**
 * Build the structured-data graph for a single question page.
 *
 * Schema set: LearningResource (containing a Question) + BreadcrumbList.
 *
 * This is an editorial practice problem with a published correct answer. It is
 * not a user-generated Q&A page and visitors cannot submit answers for public
 * display, so QAPage would misrepresent both the page and Google's eligibility
 * rules. Distractors are rendered in the HTML UI, but are deliberately not
 * emitted as suggestedAnswer: a wrong multiple-choice option is not a proposed
 * answer authored by a user.
 */
export function buildQuestionJsonLd({
  question: q,
  pageUrlAbs,
  title,
  lastUpdatedISO,
  requestedPageUrlAbs = pageUrlAbs,
  breadcrumbItems = questionBreadcrumbItems(q, requestedPageUrlAbs),
}: QuestionJsonLdInput) {
  const answerKeys = q.type === "ordering" ? [q.answer] : Array.isArray(q.answer) ? q.answer : [q.answer];

  // The administering body authored the question; this site authored the
  // learning explanation. Keep the author inline so the node is self-contained.
  const releaseSource = ["plant-haikan-seizu1", "kikai-seizu3", "kikai-seizu2", "kikai-shiage1", "kikai-shiage3", "kikai-shiage2", "pan-seizo2", "pan-seizo1", "bousui-frp2", "naiso-plastic2", "naiso-plastic1", "naiso-carpet2", "haikan-kenchiku3", "plant-haikan2", "tekkin-zumen3", "fraise1", "fraise2", "fraise3", "funmatsu-yakin1", "tatami1", "sessaku-kensaku1", "nunohaku1", "shashin3", "shashin1", "kikinzoku-soshin3", "kikinzoku-soshin1", "shohin-soshoku3", "sekizai1", "tairu2", "hyoso1", "haiden-seigyo1", "haiden-seigyo3", "kenchiku-bankin2", "kensetsu-kikai-seibi1", "sakan3", "sakan2", "bousui-urethane2", "naiso-kosei2", "kinzoku-press1", "plant-haikan1", "kinzoku-press2", "kikai-kensa3", "kogyo-hoso2", "kikai-kensa2", "tekkin-zumen1", "katawaku1", "tekkin-zumen2", "katawaku2", "kogyo-hoso1", "kikai-kensa1", "katawaku3", "futsu-senban3", "shashutsu3", "chikuro1", "chikuro2", "kagaku-bunseki3", "kagaku-bunseki1", "kyoka-plastic1", "kyoka-plastic2", "sasshi1", "sasshi2", "engei-soshoku3", "engei-soshoku1", "insatsu2", "flower1", "flower3", "flower2", "kagu3", "kagu1", "kagu2", "mekki1", "mekki3", "kinzoku-netsushori3", "kinzoku-netsushori1", "kinzoku-netsushori2", "kojo-bankin3", "kojo-bankin1", "fujin-kodomofuku1", "fujin-kodomofuku2", "toso1", "benrishi", "sokuryoshi", "dokugeki-chiba", "jokaso-setsubishi", "chiiki-ryoko", "junkango-kansai", "kukaku-seiri", "dojo-osen", "kenchikushi2", "mokuzo-kenchikushi", "kenchikushi1", "khk-kagaku", "sekou-1kenchiku", "chintai", "kyusui", "biru-kan", "gijutsushi1-kikai", "hoshasen-1", "hoshasen-2", "energy-kanri", "career-consultant", "kanri-eiyoshi", "sogo-ryoko", "shiho-tanto", "yobi-tanto", "sokuryoshiho", "caremanager", "kikai-hozen", "denshi-kiki-kumitate1", "denshi-kiki-kumitate3", "tekko2", "tekko1", "denshi-kiki-kumitate2", "kojo-bankin2", "kensetsu-kikai-seibi2", "hyoso2", "tobi1", "tobi3", "kenchiku-daiku1", "kenchiku-daiku3", "kenchiku-daiku2", "shashin2", "kikinzoku-soshin2", "tsukanshi"].includes(q.exam) ? getQualificationByExamCode(q.exam) : undefined;
  const questionAuthor = releaseSource
    ? { "@type": "Organization", name: releaseSource.administrator, url: new URL(releaseSource.officialQuestionsUrl).origin }
    : q.exam === "kisho"
    ? { "@type": "Organization", name: "一般財団法人気象業務支援センター", url: "https://www.jmbsc.or.jp/" }
    : q.exam === "kenchiku-setsubishi"
    ? { "@type": "Organization", name: "公益財団法人建築技術教育普及センター", url: "https://www.jaeic.or.jp/" }
    : q.exam === "chizai2"
    ? { "@type": "Organization", name: "知的財産教育協会", url: "https://www.kentei-info-ip-edu.org/" }
    : q.license === "SGEC-owner-authorized"
    ? { "@type": "Organization", name: "一般財団法人職業教育・キャリア教育財団", url: "https://www.jken.sgec.or.jp/" }
    : q.exam === "kanteishi"
    ? { "@type": "GovernmentOrganization", name: q.sourcePresentation?.originalAuthor ?? "国土交通省", url: "https://www.mlit.go.jp/" }
    : q.exam === "kaikeishi"
    ? { "@type": "GovernmentOrganization", name: q.sourcePresentation?.originalAuthor ?? "公認会計士・監査審査会", url: "https://www.fsa.go.jp/cpaaob/" }
    : q.license === "KHK-owner-decision"
    ? { "@type": "Organization", name: "高圧ガス保安協会", url: "https://www.khk.or.jp/" }
    : q.license === "METI-attributed"
    ? { "@type": "GovernmentOrganization", name: "経済産業省", url: "https://www.meti.go.jp/" }
    : (q.license === "NICHIMU-educational-reuse" || q.license === "NICHIMU-past-question-study-use")
    ? { "@type": "Organization", name: "公益財団法人日本無線協会", url: "https://www.nichimu.or.jp/" }
    : q.exam === "kenki1" || q.exam === "kenki2"
    ? { "@type": "Organization", name: "一般社団法人日本建設機械施工協会", url: "https://jcmanet.or.jp/" }
    : q.exam === "chosashi"
    ? { "@type": "GovernmentOrganization", name: "法務省", url: "https://www.moj.go.jp/" }
    : q.exam === "fp1"
    ? {
        "@type": "Organization",
        name: "一般社団法人金融財政事情研究会",
        url: "https://www.kinzai.or.jp/",
      }
    : (q.exam === "fp2" || q.exam === "fp3")
    ? {
        "@type": "Organization",
        name: "日本ファイナンシャル・プランナーズ協会",
        url: "https://www.jafp.or.jp/",
      }
    : q.exam === "gas-kou" || q.exam === "gas-otsu" || q.exam === "gas-hei"
      ? { "@type": "Organization", name: "一般財団法人日本ガス機器検査協会", url: "https://www.jia-page.or.jp/" }
    : q.exam === "takken"
      ? {
          "@type": "Organization",
          name: "一般財団法人 不動産適正取引推進機構",
          url: "https://www.retio.or.jp/",
        }
    : q.exam === "denki1" || q.exam === "denki2"
      ? { "@type": "Organization", name: "一般財団法人建設業振興基金", url: "https://www.fcip-shiken.jp/" }
    : q.exam === "civil2" || q.exam === "kankoji2" || q.exam === "civil1" || q.exam === "zoen2" || q.exam === "zoen1" || q.exam === "tsushin2" || q.exam === "tsushin1"
      ? {
          "@type": "Organization",
          name: "一般財団法人全国建設研修センター",
          url: "https://www.jctc.jp/",
        }
    : q.exam === "kaigo" || q.exam === "shakai" || q.exam === "seishin"
      ? {
          "@type": "Organization",
          name: "公益財団法人社会福祉振興・試験センター",
          url: "https://www.sssc.or.jp/",
        }
    : q.exam === "tohan"
      ? {
          "@type": "GovernmentOrganization",
          name: "関西広域連合",
          url: "https://www.kouiki-kansai.jp/",
        }
    : q.exam === "soukan"
      ? {
          "@type": "Organization",
          name: "公益社団法人日本技術士会",
          url: "https://www.engineer.or.jp/",
        }
    : q.exam === "hoikushi"
      ? {
          "@type": "Organization",
          name: "一般社団法人全国保育士養成協議会",
          url: "https://www.hoyokyo.or.jp/",
        }
    : q.exam === "kanri"
      ? {
          "@type": "Organization",
          name: "一般社団法人マンション管理業協会",
          url: "https://www.kanrikyo.or.jp/",
        }
    : q.exam === "mankan"
      ? {
          "@type": "Organization",
          name: "公益財団法人マンション管理センター",
          url: "https://www.mankan.org/",
        }
    : q.exam === "kashikin"
      ? {
          "@type": "Organization",
          name: "一般社団法人日本貸金業協会",
          url: "https://www.j-fsa.or.jp/",
        }
    : q.exam === "chusho-kigyo-shindanshi"
      ? {
          "@type": "Organization",
          name: "一般社団法人 日本中小企業診断士協会連合会",
          url: "https://www.jf-cmca.jp/",
        }
    : q.exam === "sharoushi"
      ? {
          "@type": "Organization",
          name: "全国社会保険労務士会連合会 試験センター",
          url: "https://www.sharosi-siken.or.jp/",
        }
    : q.exam === "judo-seifukushi"
      ? {
          "@type": "Organization",
          name: "公益財団法人柔道整復研修試験財団",
          url: "https://www.zaijusei.com/",
        }
    : q.exam === "shinrishi"
      ? {
          "@type": "Organization",
          name: "一般財団法人公認心理師試験研修センター",
          url: "https://www.jccpp.or.jp/",
        }
    : q.exam === "kangoshi" || q.exam === "yakuzaishi" || q.exam === "shika-ishi" || q.exam === "rigaku-ryohoshi" || q.exam === "rinsho-kensagishi"
      ? {
          "@type": "Organization",
          name: "厚生労働省",
          url: "https://www.mhlw.go.jp/",
        }
    : q.exam === "denken3" || q.exam === "denken2" || q.exam === "denken1" || q.exam === "denko2" || q.exam === "denko1"
      ? {
          "@type": "Organization",
          name: "一般財団法人 電気技術者試験センター",
          url: "https://www.shiken.or.jp/",
        }
      : {
          "@type": "Organization",
          name: "情報処理推進機構 (IPA)",
          url: "https://www.ipa.go.jp/",
        };
  const licenseUrl = releaseSource || q.exam === "chizai2" || q.exam === "kisho" || q.exam === "kenchiku-setsubishi"
    || q.license === "SGEC-owner-authorized"
    ? undefined
    : (q.exam === "kanteishi" || q.exam === "kaikeishi")
    ? q.sourcePresentation?.licenseUrl
    : q.license === "KHK-owner-decision"
    ? undefined
    : q.license === "METI-attributed"
    ? "https://www.meti.go.jp/main/rules.html"
    : (q.license === "NICHIMU-educational-reuse" || q.license === "NICHIMU-past-question-study-use")
    ? "https://www.nichimu.or.jp/kshiken/siken/index.html"
    : q.exam === "rigaku-ryohoshi" || q.exam === "rinsho-kensagishi"
    ? "https://www.mhlw.go.jp/chosakuken/index.html"
    : q.exam === "chosashi"
    ? "https://www.moj.go.jp/hisho06_00280.html"
    : q.exam === "shinrishi"
    ? "https://www.jccpp.or.jp/policy.html"
    : q.exam === "fp1"
    ? "https://www.kinzai.or.jp/ginou/license_terms.html"
    : (q.exam === "fp2" || q.exam === "fp3")
    ? "https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf"
    : q.exam === "gas-kou" || q.exam === "gas-otsu" || q.exam === "gas-hei"
      ? undefined
    : q.exam === "denki1" || q.exam === "denki2" || q.exam === "kenki1" || q.exam === "kenki2" || q.exam === "takken" || q.exam === "civil1" || q.exam === "civil2" || q.exam === "kankoji2" || q.exam === "zoen2" || q.exam === "zoen1" || q.exam === "tsushin2" || q.exam === "tsushin1" || q.exam === "kaigo" || q.exam === "denken2" || q.exam === "denken1" || q.exam === "denko1" || q.exam === "shakai" || q.exam === "seishin" || q.exam === "tohan" || q.exam === "kanri" || q.exam === "soukan" || q.exam === "hoikushi" || q.exam === "mankan" || q.exam === "kashikin" || q.exam === "sharoushi" || q.exam === "chusho-kigyo-shindanshi" || q.exam === "kangoshi" || q.exam === "yakuzaishi" || q.exam === "shika-ishi" || q.exam === "judo-seifukushi"
      ? undefined
    : q.exam === "denken3" || q.exam === "denko2"
      ? "https://www.shiken.or.jp/shiken/faq/faq08/000082.html"
      : "https://www.ipa.go.jp/shiken/faq.html";
  const siteAuthor = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_BASE_URL,
  };
  const recordedDate = recordedContentDate(lastUpdatedISO);
  const lastUpdatedDateTimeISO = recordedDate ? toJstDateTimeISO(recordedDate) : undefined;

  // The accepted answer links to the in-page explanation anchor (#explanation).
  const acceptedAnswers = answerKeys.map(answerKey => ({
    "@type": "Answer",
    text: q.type === "native-b" ? formatNativeBAnswer(q.nativeB!) : q.type === "ordering" ? formatOrderingAnswer(q.exam, q.answer as ChoiceKey[]) : q.type === "numeric" ? formatNumericAnswer(q, String(answerKey)) : q.choices?.[answerKey as ChoiceKey] ? `${(q.exam === "kikai-kensa3" || q.exam === "kinzoku-press1" || q.exam === "plant-haikan2" || q.exam === "haikan-kenchiku3" || q.exam === "plant-haikan1" || q.exam === "kinzoku-press2" || q.exam === "bousui-frp2" || q.exam === "pan-seizo1" || q.exam === "kikai-shiage1" || q.exam === "plant-haikan-seizu1" || q.exam === "kikai-seizu2" || q.exam === "kikai-shiage2" || q.exam === "pan-seizo2" || q.exam === "naiso-carpet2" || q.exam === "naiso-plastic1" || q.exam === "naiso-plastic2" || q.exam === "naiso-kosei2" || q.exam === "bousui-urethane2" || q.exam === "sakan2" || q.exam === "sakan3" || q.exam === "kikai-shiage3" || q.exam === "kikai-seizu3" || q.exam === "kensetsu-kikai-seibi1" || q.exam === "kenchiku-bankin2" || q.exam === "haiden-seigyo3" || q.exam === "haiden-seigyo1" || q.exam === "kogyo-hoso2" || q.exam === "kikai-kensa2" || q.exam === "tekkin-zumen1" || q.exam === "katawaku1" || q.exam === "tekkin-zumen2" || q.exam === "katawaku2" || q.exam === "kogyo-hoso1" || q.exam === "kikai-kensa1" || q.exam === "tekkin-zumen3" || q.exam === "katawaku3" || q.exam === "engei-soshoku3" || q.exam === "flower3" || q.exam === "insatsu2" || q.exam === "sasshi2" || q.exam === "sasshi1" || q.exam === "kyoka-plastic2" || q.exam === "chikuro2" || q.exam === "chikuro1" || q.exam === "kagaku-bunseki1" || q.exam === "futsu-senban3" || q.exam === "shashutsu3" || q.exam === "kagaku-bunseki3" || q.exam === "kyoka-plastic1" || q.exam === "engei-soshoku1" || q.exam === "insatsu1" || q.exam === "flower1" || q.exam === "flower2" || q.exam === "kagu2" || (q.exam === "kagu1" || (q.exam === "kagu3" || q.exam === "mekki1"))) ? formatQuestionAnswerForDisplay(q, answerKey) : choiceDisplayLabel(q.exam, answerKey as ChoiceKey)}: ${q.choices[answerKey as ChoiceKey]}` : String(answerKey),
    inLanguage: "ja",
    url: `${pageUrlAbs}#explanation`,
    author: siteAuthor,
    upvoteCount: 0,
  }));
  const acceptedAnswer = acceptedAnswers.length === 1 ? acceptedAnswers[0] : acceptedAnswers;

  const questionEntity = {
    "@type": "Question",
    "@id": `${pageUrlAbs}#question`,
    name: q.question.slice(0, 120),
    text: q.question,
    inLanguage: "ja",
    author: questionAuthor,
    upvoteCount: 0,
    url: pageUrlAbs,
    ...(isSelfReviewedDescriptiveQuestion(q) ? { suggestedAnswer: { ...acceptedAnswers[0], text: q.modelAnswer ?? String(q.answer) } } : { acceptedAnswer }),
  };

  const learningResource = {
    "@type": "LearningResource",
    "@id": `${pageUrlAbs}#learning-resource`,
    name: title,
    url: pageUrlAbs,
    ...(lastUpdatedDateTimeISO ? { dateModified: lastUpdatedDateTimeISO } : {}),
    inLanguage: "ja",
    learningResourceType: "Practice problem",
    educationalLevel: "Professional",
    educationalUse: "Self-study",
    audience: STUDENT_AUDIENCE,
    teaches: q.category,
    educationalAlignment: [
      {
        "@type": "AlignmentObject",
        alignmentType: "educationalSubject",
        targetName: q.category,
      },
    ],
    keywords: [
      questionSourceExam(q),
      questionSourceExam(q),
      q.category,
      ...q.topicTags,
    ].join(", "),
    isAccessibleForFree: true,
    hasPart: questionEntity,
    isPartOf: {
      "@type": "WebSite",
      "@id": SITE_ID,
      name: SITE_NAME,
      url: SITE_BASE_URL,
    },
    // RETIO, JCTC and 関西広域連合 entries carry no license URL here.
    ...(licenseUrl ? { license: licenseUrl } : {}),
    creator: q.exam === "kanteishi" || q.exam === "kaikeishi" ? siteAuthor : questionAuthor,
    // Self-resolving @id reference: like the QAPage's `isPartOf` WebSite (and
    // unlike a bare stub), the publisher carries name/url inline so Google
    // resolves it within this page. The /q surface does not embed the full
    // `buildOrgNode()` Organization node, so the @id alone would dangle — the
    // same defect class fixed for the exam-hub `Course.provider` (S115).
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: SITE_BASE_URL,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      learningResource,
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.href.startsWith("/") ? `${SITE_BASE_URL}${item.href}` : item.href,
        })),
      },
    ],
  };
}

/**
 * The daily free quota is active: a person past it sees the limit screen in
 * place of the element matching PAYWALLED_SELECTOR. Declared as paywalled
 * content (Google flexible sampling), so the crawler's full view is not cloaking.
 */
export function withQuotaPaywall(jsonLd: ReturnType<typeof buildQuestionJsonLd>) {
  return { ...jsonLd, "@graph": jsonLd["@graph"].map(node => "hasPart" in node
    ? { ...node, isAccessibleForFree: false, hasPart: [node.hasPart, { "@type": "WebPageElement", isAccessibleForFree: false, cssSelector: PAYWALLED_SELECTOR }] }
    : node) };
}
