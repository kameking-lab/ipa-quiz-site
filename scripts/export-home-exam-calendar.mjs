/** Offline snapshot of committed calendar origin/main, never its working tree.
 * node scripts/export-home-exam-calendar.mjs --calendar C:/path/to/calendar */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const index = process.argv.indexOf("--calendar");
if (index < 0 || !process.argv[index + 1]) throw new Error("--calendar <repository path> is required");
const repository = process.argv[index + 1];
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
const exams = [];
for (const mapping of mappings) {
  const path = `data/entries/${mapping.qualificationId}.json`;
  const entry = read(path);
  const fact = facts.get(entry.id);
  const notes = (entry.sessions ?? []).map(row => row.notes ?? "").join("\n");
  const count = noteSources[entry.id] ? /受[験検]者([\d,]+)(?:人|名)/.exec(notes)?.[1] : undefined;
  const candidates = fact?.candidates ?? (count ? Number(count.replaceAll(",", "")) : null);
  const dates = (entry.sessions ?? []).flatMap(row => {
    // Never infer dates from prose, annual recurrence, tbd, on-demand windows
    // or range ends. Practical/oral dates do not represent written practice.
    if (row.is_ondemand || !/^\d{4}-\d{2}-\d{2}$/.test(row.exam_date ?? "") || !row.source_url ||
        /実技|口述|二次/.test(row.session_label ?? "") || row.date_evidence?.status === "unannounced") return [];
    const note = /東京都|東京.*代表/.test(row.session_label) ? "東京" : /関東/.test(row.session_label) ? "関東" : undefined;
    return [{ date: row.exam_date, sourceUrl: row.source_url, ...(note ? { note } : {}) }];
  });
  if (!dates.length && candidates === null) continue;
  exams.push({ key: mapping.sourceKey, qualificationId: entry.id, candidates,
    ...(candidates !== null ? { candidatesSourceUrl: fact?.officialUrls[0] ?? noteSources[entry.id], candidatesSourceFile: fact ? factsFile : path } : {}),
    dates, sourceFile: path });
}
exams.sort((a, b) => a.key.localeCompare(b.key, "en") || a.qualificationId.localeCompare(b.qualificationId, "en"));
const output = { sourceRepository: "calendar", sourceRevision: revision, mappingFile, exams };
writeFileSync(fileURLToPath(new URL("../lib/home/featured-calendar.generated.json", import.meta.url)), JSON.stringify(output, null, 2) + "\n");
console.log(`Exported ${exams.length} rows (${exams.filter(row => row.candidates !== null).length} with sourced test-taker counts) from ${revision}`);
