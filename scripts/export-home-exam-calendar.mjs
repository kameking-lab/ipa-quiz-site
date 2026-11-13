/** Offline snapshot of committed calendar origin/main, never its working tree.
 * node scripts/export-home-exam-calendar.mjs --calendar C:/path/to/calendar */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

export function calendarExamDates(entry) {
  const dates = (entry.sessions ?? []).flatMap(row => {
    // A range may mix practical/written stages or represent a CBT window.
    // Its first day is not necessarily the date of the practice exam.
    if (row.is_ondemand || !/^\d{4}-\d{2}-\d{2}$/.test(row.exam_date ?? "") || !row.source_url ||
        (row.exam_date_end && row.exam_date_end !== row.exam_date) ||
        /実技|口述|二次/.test(row.session_label ?? "") || row.date_evidence?.status === "unannounced") return [];
    const note = /東京都|東京.*代表/.test(row.session_label) ? "東京" : /関東/.test(row.session_label) ? "関東" : undefined;
    return [{ date: row.exam_date, sourceUrl: row.source_url, ...(note ? { note } : {}) }];
  });
  // These three calendar notes enumerate the Ichihara written-exam schedule.
  // Checked against their official tables on 2026-11-13. Parse only the
  // explicitly labelled fiscal-year list, never unrelated dates in prose.
  const notePatterns = {
    sensuishi: /令和(\d+)年度は関東センター\(市原・東京\)で([\d/,]+)の6回実施/,
    "idoshiki-crane-untenshi": /学科試験は北海道・東北・関東\(市原\)・中部・中国四国・九州の各センターで令和(\d+)年度は([\d/,]+)に実施/,
    "crane-derrick-untenshi": /「限定なし」区分の学科試験は関東センター\(市原\)で月1回程度\(令和(\d+)年度は([\d/,]+)等\)実施/,
  };
  const pattern = notePatterns[entry.id];
  if (pattern) for (const row of entry.sessions ?? []) {
    const match = pattern.exec(row.notes ?? "");
    if (!match || !row.source_url || row.fiscal_year !== 2018 + Number(match[1])) continue;
    for (const part of match[2].split(",")) {
      const [month, day] = part.split("/").map(Number);
      const year = row.fiscal_year + (month < 4 ? 1 : 0);
      const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      if (month < 1 || month > 12 || day < 1 || day > 31 || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) continue;
      dates.push({ date, sourceUrl: row.source_url, note: "関東" });
    }
  }
  return [...new Map(dates.map(row => [`${row.date}:${row.note ?? ""}`, row])).values()]
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function exportCalendar(repository) {
const git = (...args) => execFileSync("git", ["-C", repository, ...args], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
const revision = git("rev-parse", "origin/main").trim();
const read = path => JSON.parse(git("show", `${revision}:${path}`));
const mappingFile = "data/generated/kakomon-crosslink-audit.json";
const factsFile = "data/calibration/difficulty-facts-20261103.json";
const mappings = read(mappingFile).candidates.filter(row => row.available && row.questionCount > 0 && !row.holdReason);
const facts = new Map(read(factsFile).records.filter(row => row.candidates > 0).map(row => [row.id, row]));
// Reviewed notes explicitly quote actual test takers. Never use applicants,
// passes or estimated counts. Numbers are extracted, not retyped here.
const noteSources = {
  biyoushi: "https://www.rbc.or.jp/exam/about_result/",
  riyoushi: "https://www.rbc.or.jp/exam/about_result/",
  fp1: "https://www.kinzai.or.jp/fp/48802.html",
  sensuishi: "https://www.exam.or.jp/h_gokakuritsu/",
  kashikin: "https://www.j-fsa.or.jp/chief/qualifying_exam/exam_result/20th/announce1.php",
  "shobo-setsubishi-kou1": "https://www.shoubo-shiken.or.jp/result/7/",
  "crane-derrick-untenshi": "https://www.exam.or.jp/h_gokakuritsu/",
  "idoshiki-crane-untenshi": "https://www.exam.or.jp/h_gokakuritsu/",
  "energy-kanrishi": "https://www.eccj.or.jp/mgr1/",
};
// Counts retain their reported period and population; do not annualize a
// single sitting or mistake a new-candidate subset for all test takers.
const countScopes = {
  biyoushi: "第53回・全受験者",
  riyoushi: "第53回・全受験者",
  fp1: "2025年9月・1級学科",
  sensuishi: "年度計・学科",
  kashikin: "第20回・全受験者",
  "crane-derrick-untenshi": "年度計・限定なし（限定解除を含む）学科",
  "idoshiki-crane-untenshi": "年度計・学科",
  "energy-kanrishi": "年度計・新規受験者",
};
const exams = [];
for (const mapping of mappings) {
  const path = `data/entries/${mapping.qualificationId}.json`;
  const entry = read(path);
  const fact = facts.get(entry.id);
  const notes = (entry.sessions ?? []).map(row => row.notes ?? "").join("\n");
  const count = noteSources[entry.id] ? /受[験検]者([\d,]+)(?:人|名)/.exec(notes)?.[1] : undefined;
  const candidates = fact?.candidates ?? (count ? Number(count.replaceAll(",", "")) : null);
  // Unknown popularity is not zero popularity. Keep these out of the popular
  // selection until calendar has a sourced test-taker count.
  if (candidates === null) continue;
  const dates = calendarExamDates(entry);
  exams.push({ key: mapping.sourceKey, qualificationId: entry.id, candidates,
    ...(candidates !== null ? { candidatesSourceUrl: fact?.officialUrls[0] ?? noteSources[entry.id], candidatesSourceFile: fact ? factsFile : path } : {}),
    candidatesPeriod: fact?.year ?? entry.pass_rate_year,
    candidatesScope: fact ? "年度計・受験者" : countScopes[entry.id],
    dates, sourceFile: path });
}
exams.sort((a, b) => a.key.localeCompare(b.key, "en") || a.qualificationId.localeCompare(b.qualificationId, "en"));
const output = { sourceRepository: "calendar", sourceRevision: revision, mappingFile, exams };
writeFileSync(fileURLToPath(new URL("../lib/home/featured-calendar.generated.json", import.meta.url)), JSON.stringify(output, null, 2) + "\n");
console.log(`Exported ${exams.length} rows (${exams.filter(row => row.candidates !== null).length} with sourced test-taker counts) from ${revision}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const index = process.argv.indexOf("--calendar");
  if (index < 0 || !process.argv[index + 1]) throw new Error("--calendar <repository path> is required");
  exportCalendar(process.argv[index + 1]);
}
