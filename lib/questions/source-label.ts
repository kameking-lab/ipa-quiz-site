import type { Question } from "./types";
import { examLabelAt } from "@/lib/exam-naming/history";
import { formatYearSeason } from "@/lib/utils";

/** exam is the learning filter; the shared AM1 paper is not that exam's AM2. */
export function questionSourceExam(q: Pick<Question, "exam" | "year" | "season" | "session">): string {
  return q.session === "am1" && q.exam !== "kenchiku-setsubishi" ? "高度試験共通" : examLabelAt(q.exam, q.year, q.season);
}

/** 公式冊子の表紙で照合した回次・実施年。保存年や既存URLは年度/実施年が混在するため表示に使わない。 */
const VERIFIED_MEDICAL_EDITIONS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  tp220421: {
    "02": "第115回（2022年実施）",
    "06": "第74回（2022年実施）",
    "08": "第57回（2022年実施）",
  },
  tp230524: {
    "02": "第116回（2023年実施）",
    "06": "第75回（2023年実施）",
    "08": "第58回（2023年実施）",
  },
  tp240424: {
    "02": "第117回（2024年実施）",
    "06": "第76回（2024年実施）",
    "08": "第59回（2024年実施）",
  },
  tp250428: {
    "05": "第114回（2025年実施）",
    "06": "第77回（2025年実施）",
    "07": "第71回（2025年実施）",
    "08": "第60回（2025年実施）",
    "09": "第60回（2025年実施）",
    "10": "第55回（2025年実施）",
  },
  tp260424: {
    "05": "第115回（2026年実施）",
    "06": "第78回（2026年実施）",
    "07": "第72回（2026年実施）",
    "08": "第61回（2026年実施）",
    "09": "第61回（2026年実施）",
    "10": "第56回（2026年実施）",
  },
};

export function questionSourceEdition(q: Pick<Question, "year" | "season" | "sourcePdfUrl"> & Partial<Pick<Question, "exam" | "fiscalYear">>): string {
  if (q.exam === "flower2" && q.year === 2025 && q.season === "early") {
    return "2025年度前期（2025年9月7日実施）";
  }
  if (q.exam === "fujin-kodomofuku2" && q.year === 2025 && q.season === "early") {
    return "2025年度前期（2025年8月31日実施）";
  }
  if (q.exam === "toso2" && q.year === 2025 && q.season === "early") {
    return "2025年度前期（2025年8月24日実施）";
  }
  if ((q.exam === "insatsu2" || q.exam === "diecast2" || q.exam === "kagu2" || q.exam === "tekko2") && q.year === 2025 && q.season === "early") {
    return "2025年度前期（2025年8月31日実施）";
  }
  if (q.exam === "mekki2" && q.year === 2025 && q.season === "early") {
    return "2025年度前期（2025年8月31日実施）";
  }
  if (q.exam === "kinzoku-netsushori2" && q.year === 2025 && q.season === "early") {
    return "2025年度前期（2025年8月24日実施）";
  }
  if (q.exam === "junkango-kansai") {
    return q.fiscalYear !== undefined
      ? `令和${q.fiscalYear - 2018}年度（${q.year}年実施）`
      : `${q.year}年実施`;
  }

if (q.exam?.startsWith("jidosha-")) {
    if (q.year === 2026 && q.season === "first")
        return "令和8年度第1回（2026年10月4日実施）";
    if (q.year === 2025 && q.season === "second")
        return "令和7年度第2回（2026年3月22日実施）";
    if (q.year === 2025 && q.season === "first")
        return "令和7年度第1回（2025年10月5日実施）";
    if (q.year === 2024 && q.season === "second")
        return "令和6年度第2回（2025年3月23日実施）";
}
if (q.exam === "biyoshi" && q.year === 2026) {
    if (q.season === "first")
        return "第53回（2026年3月1日実施）";
    if (q.season === "second")
        return "第54回（2026年9月6日実施）";
}
if ((q.exam?.startsWith("kikenbutsu-") || q.exam?.startsWith("shobo-setsubishi-")) && q.season === "published")
    return "2026年6月公表版（個別の出題年・回は非公表）";
if (q.exam?.startsWith("jken-katsuyo")) {
    if (q.year === 2026 && q.season === "first" && /\/260621_mondaijk0[123]\.pdf$/.test(q.sourcePdfUrl))
        return "令和8年度前期（2026年6月21日実施）";
    if (q.year === 2025 && q.season === "second" && /\/251221_mondaijk0[123]\.pdf$/.test(q.sourcePdfUrl))
        return "令和7年度後期（2025年12月21日実施）";
}
if (q.exam === "shinrishi" && q.year === 2025)
    return "第8回（2025年3月2日実施）";
if (q.exam === "shinrishi" && q.year === 2026)
    return "第9回（2026年3月1日実施）";
if (q.year === 2024 && q.season === "annual" &&
    /^https:\/\/www\.meti\.go\.jp\/policy\/economy\/hyojun\/techno_infra\/[1-8]_R06(?:kanka|kanbutsu|kannou|kanon|houki|kanri|ichiki|keishitsu)\.pdf$/.test(q.sourcePdfUrl)) {
    return "第75回（令和6年12月実施）";
}
if (q.year === 2025 && q.season === "annual" &&
    /^https:\/\/www\.meti\.go\.jp\/policy\/economy\/hyojun\/techno_infra\/00_download\/[1-8]_R07(?:kanka|kanbutsu|kannou|kanon|houki|kanri|ichiki|keishitsu)\.pdf$/.test(q.sourcePdfUrl)) {
    return "第76回（令和7年12月実施）";
}
  if (q.exam === "chizai2" && q.year === 2026) {
    if (q.season === "spring") return "第53回（2026年3月8日実施）";
    if (q.season === "july") return "第54回（2026年7月12日実施）";
  }
  if (q.exam === "kisho" && q.year === 2026) return q.season === "second" ? "第65回（2026年1月25日）" : "第66回（2026年8月23日）";
  if (q.exam === "riku-tech1" && q.season === "july") return `${q.year}年7月試験`;
  if (q.exam === "shika-ishi" && q.season === "annual" && (q.year === 2025 || q.year === 2026)) {
    return `第${q.year - 1907}回（${q.year}年実施）`;
  }
  const judoPaper = /^https:\/\/www\.zaijusei\.com\/doc\/(2026_34|2025_33)_(?:gozen|gogo)\.pdf(?:#page=[1-9]\d*)?$/.exec(q.sourcePdfUrl);
  if (q.season === "annual" && judoPaper?.[1] === "2026_34" && q.year === 2025) {
    return "第34回（令和7年度・2026年実施）";
  }
  if (q.season === "annual" && judoPaper?.[1] === "2025_33" && q.year === 2024) {
    return "第33回（令和6年度・2025年実施）";
  }
  const gengoNotice = /^https:\/\/www\.mhlw\.go\.jp\/general\/sikaku\/successlist\/(2025|2026)\/siken21\/dl\/(27A40|28A(?:14|35|69|83))\.pdf(?:#page=[1-9]\d*)?$/.exec(q.sourcePdfUrl);
  if (q.season === "annual" && gengoNotice &&
      ((q.year === 2025 && gengoNotice[1] === "2025" && gengoNotice[2] === "27A40") ||
       (q.year === 2026 && gengoNotice[1] === "2026" && gengoNotice[2]?.startsWith("28A")))) {
    return `第${q.year === 2025 ? 27 : 28}回（${q.year}年実施）`;
  }
  const medical2025 = /^https:\/\/www\.mhlw\.go\.jp\/seisakunitsuite\/bunya\/kenkou_iryou\/iryou\/topics\/dl\/tp250428-(06[ab]|07b)_01\.pdf(?:#page=\d+)?$/.exec(q.sourcePdfUrl);
  if (q.year === 2025 && q.season === "annual" && medical2025) {
    return `第${medical2025[1] === "07b" ? 71 : 77}回（2025年実施）`;
  }
  if (q.exam === "riyoshi" && q.year === 2025 && q.season === "second" &&
      /^https:\/\/www\.rbc\.or\.jp\/wp-content\/uploads\/2025\/09\/52rhikki\.pdf(?:#page=[1-9]\d*)?$/.test(q.sourcePdfUrl)) {
    return "第52回（2025年実施）";
  }
  const riyoshiPaper = /^https:\/\/www\.rbc\.or\.jp\/wp-content\/uploads\/2026\/(03\/53rhikki-1|09\/54rhikki)\.pdf(?:#page=[1-9]\d*)?$/.exec(q.sourcePdfUrl);
  if (q.year === 2026 && riyoshiPaper?.[1] === "03/53rhikki-1") return "第53回（2026年3月1日実施）";
  if (q.year === 2026 && riyoshiPaper?.[1] === "09/54rhikki") return "第54回（2026年9月6日実施）";
  if (q.season === "annual") {
    const verifiedPaper = /^https:\/\/www\.mhlw\.go\.jp\/seisakunitsuite\/bunya\/kenkou_iryou\/iryou\/topics\/dl\/(tp220421|tp230524|tp240424|tp250428|tp260424)-(02a|05[abc]|(?:06[ab]|07b)|(?:08|09|10)[ab])_01\.pdf(?:#page=[1-9]\d*)?$/.exec(q.sourcePdfUrl);
    const edition = verifiedPaper
      ? VERIFIED_MEDICAL_EDITIONS[verifiedPaper[1] ?? ""]?.[verifiedPaper[2]?.slice(0, 2) ?? ""]
      : undefined;
    if (edition) return edition;
  }
  if (q.year === 2011 && /tokubetsu/.test(q.sourcePdfUrl)) return "2011年度 特別試験";
  if (q.year === 2020 && q.season === "autumn") return "令和2年度 10月試験";
  if (q.season === "published" || (q.season === "october" && (q.exam === "eisei1" || q.exam === "eisei2"))) {
    const officialUpload = /^https:\/\/www\.exam\.or\.jp\/wp-content\/uploads\/(20\d{2})\/(0[1-9]|1[0-2])\//.exec(q.sourcePdfUrl);
    if (officialUpload && Number(officialUpload[1]) === q.year) {
      return `${q.year}年${Number(officialUpload[2])}月公表問題`;
    }
    const jafpEdition = /^https:\/\/www\.jafp\.or\.jp\/exam\/mohan\/files\/g[23]_(20\d{2})(0[1-9]|1[0-2])_/.exec(q.sourcePdfUrl);
    if (jafpEdition && Number(jafpEdition[1]) === q.year) {
      return `${q.year}年${Number(jafpEdition[2])}月公表問題`;
    }
  }
  return formatYearSeason(q.year, q.season);
}
