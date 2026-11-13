import { test } from "node:test";
import assert from "node:assert/strict";
import { calendarExamDates } from "../../scripts/export-home-exam-calendar.mjs";

test("mixed practical/written ranges do not turn their first day into an exam date", () => {
  const dates = calendarExamDates({ sessions: [
    { session_label: "第54回", exam_date: "2026-08-01", exam_date_end: "2026-09-06", source_url: "https://www.rbc.or.jp/exam/guide/" },
    { session_label: "第55回・実技開始", exam_date: "2027-02-01", source_url: "https://www.rbc.or.jp/exam/guide/" },
    { session_label: "第55回・筆記", exam_date: "2027-03-07", source_url: "https://www.rbc.or.jp/exam/guide/" },
  ] });
  assert.deepEqual(dates.map(row => row.date), ["2027-03-07"]);
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
