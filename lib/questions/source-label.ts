import type { Question } from "./types";
import { examLabelAt } from "@/lib/exam-naming/history";
import { formatYearSeason } from "@/lib/utils";

/** exam is the learning filter; the shared AM1 paper is not that exam's AM2. */
export function questionSourceExam(q: Pick<Question, "exam" | "year" | "season" | "session">): string {
  return q.session === "am1" ? "高度試験共通" : examLabelAt(q.exam, q.year, q.season);
}

/** 公式冊子の表紙で照合した回次・実施年。保存年や既存URLは年度/実施年が混在するため表示に使わない。 */
const VERIFIED_MEDICAL_EDITIONS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
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

export function questionSourceEdition(q: Pick<Question, "year" | "season" | "sourcePdfUrl">): string {
  const medical2025 = /^https:\/\/www\.mhlw\.go\.jp\/seisakunitsuite\/bunya\/kenkou_iryou\/iryou\/topics\/dl\/tp250428-(06|07)b_01\.pdf(?:#page=\d+)?$/.exec(q.sourcePdfUrl);
  if (q.year === 2025 && q.season === "annual" && medical2025) {
    return `第${medical2025[1] === "07" ? 71 : 77}回（2025年実施）`;
  }
  if (q.season === "annual") {
    const verifiedPaper = /^https:\/\/www\.mhlw\.go\.jp\/seisakunitsuite\/bunya\/kenkou_iryou\/iryou\/topics\/dl\/(tp250428|tp260424)-(05[abc]|(?:06|07)b|(?:08|09|10)[ab])_01\.pdf(?:#page=[1-9]\d*)?$/.exec(q.sourcePdfUrl);
    const edition = verifiedPaper
      ? VERIFIED_MEDICAL_EDITIONS[verifiedPaper[1] ?? ""]?.[verifiedPaper[2]?.slice(0, 2) ?? ""]
      : undefined;
    if (edition) return edition;
  }
  if (q.year === 2011 && /tokubetsu/.test(q.sourcePdfUrl)) return "2011年度 特別試験";
  if (q.year === 2020 && q.season === "autumn") return "令和2年度 10月試験";
  if (q.season === "published") {
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
