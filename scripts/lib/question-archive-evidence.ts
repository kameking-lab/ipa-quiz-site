import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Question } from "@/lib/questions/types";

const NICHIMU = ["nichimu.or.jp", "www.nichimu.or.jp"];
const JAFP = ["jafp.or.jp", "www.jafp.or.jp"];
const JEMAI = ["jemai.or.jp", "www.jemai.or.jp"];

export const OFFICIAL_ARCHIVE_HOSTS: Readonly<Record<string, readonly string[]>> = {
  amateur1: NICHIMU, amateur2: NICHIMU, general1: NICHIMU, general2: NICHIMU,
  "koku-toku": NICHIMU, maritime1: NICHIMU, maritime2: NICHIMU,
  "riku-tech1": NICHIMU, "riku-tech2": NICHIMU,
  "cfp-realestate": JAFP, "cfp-souzoku": JAFP, fp2: JAFP,
  "kogai-01": JEMAI, "kogai-taiki-gairon": JEMAI, "kogai-taiki-tokuron": JEMAI,
  "kogai-04": JEMAI, "kogai-taiki-yugai": JEMAI, "kogai-06": JEMAI,
  "kogai-07": JEMAI, "kogai-08": JEMAI, "kogai-09": JEMAI, "kogai-large-water": JEMAI,
  "kogai-11": JEMAI, "kogai-12": JEMAI, "kogai-13": JEMAI, "kogai-14": JEMAI,
  "kogai-15": JEMAI, "kogai-16": JEMAI, "kogai-17": JEMAI, "kogai-18": JEMAI,
  "khk-kikai-otsu": ["www.khk.or.jp", "shiken.khk.or.jp"],
  "rodo-kijun-kantokukan": ["www.jinji.go.jp"],
  "chori-center": ["www.pref.gifu.lg.jp"],
  "chori-gunma": ["www.pref.gunma.jp"],
  "chori-kanagawa": ["www.pref.kanagawa.jp"],
  "chori-nagano": ["www.pref.nagano.lg.jp"],
  "chori-nara": ["www.pref.nara.jp"],
  "chori-okinawa": ["www.pref.okinawa.jp"],
  "chori-shizuoka": ["www.pref.shizuoka.jp"],
};

interface OfficialPdf {
  originalUrl: string;
  archiveUrl?: string;
  sha256: string;
}

export interface ArchivePaperEvidence {
  exam: string;
  year: number;
  season: string;
  session: string;
  edition: string;
  question: OfficialPdf;
  answer: OfficialPdf;
  questions: {
    id: string;
    number: number;
    part?: string;
    label: string;
    answer: Question["answer"];
    nativeAnswers?: Record<string, string>;
    scoring?: "credit-for-all";
  }[];
}

export function indexArchiveEvidence(papers: readonly ArchivePaperEvidence[]) {
  const indexed = new Map<string, { paper: ArchivePaperEvidence; entry: ArchivePaperEvidence["questions"][number] }>();
  for (const paper of papers) {
    for (const entry of paper.questions) {
      if (indexed.has(entry.id)) throw new Error(`出典台帳で問題IDが重複しています (${entry.id})`);
      indexed.set(entry.id, { paper, entry });
    }
  }
  return indexed;
}

export type ArchiveEvidence = ReturnType<typeof indexArchiveEvidence>;

export function loadArchiveEvidence(root: string): ArchiveEvidence {
  const path = join(root, "docs", "question-sources", "verified-archive-papers.json");
  return indexArchiveEvidence(JSON.parse(readFileSync(path, "utf8")) as ArchivePaperEvidence[]);
}

function parseUrl(value: string | undefined): URL | undefined {
  if (!value || /[\s\\]/u.test(value)) return;
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || url.port) return;
    return url;
  } catch {
    return;
  }
}

function withoutFragment(url: string | undefined) {
  return url?.split("#", 1)[0];
}

function officialPdfUrl(raw: string | undefined, hosts: readonly string[]) {
  const url = parseUrl(raw);
  return Boolean(url && hosts.includes(url.hostname) && url.pathname.toLowerCase().endsWith(".pdf"));
}

function matchesCapture(raw: string | undefined, original: string) {
  const capture = /^https:\/\/web\.archive\.org\/web\/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\/(https?:\/\/.+)$/u.exec(raw ?? "");
  if (!capture || capture[7] !== original || !parseUrl(raw)) return false;
  const [, year, month, day, hour, minute, second] = capture;
  const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`;
  const date = new Date(iso);
  return Number.isFinite(date.getTime()) && date.toISOString() === iso;
}

function verifiedDocument(
  doc: OfficialPdf, original: string | undefined, archive: string | undefined, hosts: readonly string[],
) {
  return officialPdfUrl(original, hosts) && doc.originalUrl === withoutFragment(original) &&
    /^[a-f0-9]{64}$/u.test(doc.sha256) && doc.archiveUrl === withoutFragment(archive) &&
    (archive === undefined || matchesCapture(doc.archiveUrl, doc.originalUrl));
}

export function verifiedArchiveSource(
  q: Question, evidence: ArchiveEvidence | undefined, answerUrlRule?: string,
): boolean {
  const hosts = Object.hasOwn(OFFICIAL_ARCHIVE_HOSTS, q.exam) ? OFFICIAL_ARCHIVE_HOSTS[q.exam] : undefined;
  const verified = evidence?.get(q.id);
  if (!hosts || !verified || !q.sourceArchiveUrl || !q.sourceAttribution?.trim()) return false;
  const { paper, entry } = verified;
  const slots = q.type === "native-b" ? q.nativeB?.slots : undefined;
  const nativeAnswersMatch = slots && entry.nativeAnswers
    ? Object.keys(entry.nativeAnswers).length === slots.length &&
      slots.every(slot => entry.nativeAnswers?.[slot.label] === slot.answer)
    : q.type !== "native-b" && entry.nativeAnswers === undefined;
  return nativeAnswersMatch && entry.scoring === q.officialScoring?.kind &&
    paper.exam === q.exam && paper.year === q.year && paper.season === q.season &&
    paper.session === q.session && Boolean(paper.edition.trim()) &&
    entry.number === q.qNumber && entry.part === q.part && Boolean(entry.label.trim()) &&
    JSON.stringify(entry.answer) === JSON.stringify(q.answer) &&
    verifiedDocument(paper.question, q.sourcePdfUrl, q.sourceArchiveUrl, hosts) &&
    verifiedDocument(paper.answer, q.sourceAnswerUrl, q.sourceAnswerArchiveUrl, hosts) &&
    (Boolean(q.sourceAnswerArchiveUrl) || (q.sourceAnswerUrl?.startsWith("https://") === true && !answerUrlRule));
}
