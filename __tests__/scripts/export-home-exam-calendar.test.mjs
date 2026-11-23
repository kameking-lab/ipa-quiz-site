import { test } from "node:test";
import assert from "node:assert/strict";
import { calendarExamDates, mergeOfficialExams } from "../../scripts/export-home-exam-calendar.mjs";

test("mixed practical/written ranges do not turn their first day into an exam date", () => {
  const dates = calendarExamDates({ sessions: [
    { session_label: "第54回", exam_date: "2026-08-01", exam_date_end: "2026-09-06", source_url: "https://www.rbc.or.jp/exam/guide/" },
    { session_label: "第55回・実技開始", exam_date: "2027-02-01", source_url: "https://www.rbc.or.jp/exam/guide/" },
    { session_label: "第55回・筆記", exam_date: "2027-03-07", source_url: "https://www.rbc.or.jp/exam/guide/" },
  ] });
  assert.deepEqual(dates.map(row => row.date), ["2027-03-07"]);
});

test("bounded CBT preserves both ends while practical dates stay excluded", () => {
  assert.deepEqual(calendarExamDates({ sessions: [
    { exam_date: "2026-11-24", exam_date_end: "2026-12-06", session_label: "科目B・CBT", source_url: "https://www.ipa.go.jp/shiken/" },
    { exam_date: "2026-12-12", session_label: "技能試験", source_url: "https://www.shiken.or.jp/" },
  ] }), [{ date: "2026-11-24", endDate: "2026-12-06", sourceUrl: "https://www.ipa.go.jp/shiken/" }]);
});

test("newer official counts win, future calendar statistics survive and schedule updates are independent", () => {
  const calendar = [
    { key: "fe", candidates: 133732, candidatesPeriod: "2024", dates: [] },
    { key: "ap", candidates: 90000, candidatesPeriod: "2027", dates: [] },
    { key: "unknown", candidates: null, dates: [] },
  ];
  const official = [
    { key: "fe", candidates: 147186, candidatesPeriodEnd: "2026-03-31", candidatesPeriod: "2025年度", scheduleMode: "ondemand", dates: [] },
    { key: "ap", candidates: 82668, candidatesPeriodEnd: "2026-03-31", candidatesPeriod: "2025年度", dates: [{ date: "2026-11-24", endDate: "2026-12-06", sourceUrl: "https://www.ipa.go.jp/" }] },
    { key: "new", candidates: 10, candidatesPeriodEnd: "2026-03-31" },
  ];
  const merged = mergeOfficialExams(calendar, official);
  assert.equal(merged.exams.find(row => row.key === "fe").candidates, 147186);
  assert.equal(merged.exams.find(row => row.key === "ap").candidates, 90000);
  assert.equal(merged.exams.find(row => row.key === "ap").dates[0].endDate, "2026-12-06");
  assert.equal(merged.exams.find(row => row.key === "unknown").candidates, null);
  assert.deepEqual(merged.conflicts.map(row => row.selected), ["official", "calendar"]);
});

test("calendar dates use the date year, not fiscal year, and retain regional scope", () => {
  const dates = calendarExamDates({ sessions: [
    { fiscal_year: 2026, session_label: "関東センター", exam_date: "2027-02-08", source_url: "https://www.exam.or.jp/schedule/h_nittei611" },
    { exam_date: "2027-02-09", source_url: "https://example.go.jp", is_ondemand: true },
    { exam_date: "2027-02-10", source_url: "https://example.go.jp", date_evidence: { status: "unannounced" } },
    { exam_date: "2027-02-11" },
  ] });
  assert.deepEqual(dates, [{ date: "2027-02-08", sourceUrl: "https://www.exam.or.jp/schedule/h_nittei611", note: "関東" }]);
});

test("statistics from later in the same month win in either source", () => {
  const calendar = [{ key: "fp1", candidates: 5000, candidatesPeriod: "2026年9月27日", dates: [] }];
  const official = [{ key: "fp1", candidates: 2996, candidatesPeriodEnd: "2026-09-13", dates: [] }];
  assert.equal(mergeOfficialExams(calendar, official).exams[0].candidates, 5000);
  calendar[0].candidatesPeriod = "2026年9月1日";
  assert.equal(mergeOfficialExams(calendar, official).exams[0].candidates, 2996);
});

test("reviewed schedules retain future calendar sessions without reviving replaced dates", () => {
  const sourceUrl = "https://example.go.jp/exams";
  const calendar = [{ key: "ap", candidates: 1, dates: [
    { date: "2026-11-01", sourceUrl },
    { date: "2027-03-10", sourceUrl },
    { date: "2027-10-01", sourceUrl },
  ] }];
  const official = [{ key: "ap", candidates: 1, dates: [
    { date: "2026-11-24", endDate: "2026-12-06", sourceUrl },
    { date: "2027-03-03", endDate: "2027-03-15", sourceUrl },
  ] }];
  assert.deepEqual(mergeOfficialExams(calendar, official).exams[0].dates.map(row => row.date),
    ["2026-11-24", "2027-03-03", "2027-10-01"]);
  official[0].dates = [{ date: "2026-05-13", sourceUrl }];
  official[0].checkedAt = "2026-11-13";
  assert.deepEqual(mergeOfficialExams(calendar, official).exams[0].dates.map(row => row.date),
    ["2026-05-13", "2027-03-10", "2027-10-01"]);
  official[0].scheduleMode = "ondemand";
  official[0].dates = [];
  assert.deepEqual(mergeOfficialExams(calendar, official).exams[0].dates, []);
});

test("reviewed calendar note lists retain December and resolve January in the next calendar year", () => {
  const diver = { id: "sensuishi", sessions: [{ fiscal_year: 2026, source_url: "https://www.exam.or.jp/schedule/h_nittei611", notes: "令和8年度は関東センター(市原・東京)で4/23,6/3,7/16,9/24,12/14,2/8の6回実施" }] };
  assert.deepEqual(calendarExamDates(diver).slice(-2).map(row => row.date), ["2026-12-14", "2027-02-08"]);
  const crane = { id: "idoshiki-crane-untenshi", sessions: [{ fiscal_year: 2026, source_url: "https://www.exam.or.jp/schedule/h_nittei232", notes: "学科試験は北海道・東北・関東(市原)・中部・中国四国・九州の各センターで令和8年度は5/21,7/3,9/2,11/4,1/15,3/11に実施" }] };
  assert.deepEqual(calendarExamDates(crane).slice(-2).map(row => row.date), ["2027-01-15", "2027-03-11"]);
  diver.sessions[0].fiscal_year = 2027;
  assert.deepEqual(calendarExamDates(diver), []);
  crane.id = "unreviewed";
  assert.deepEqual(calendarExamDates(crane), []);
});
