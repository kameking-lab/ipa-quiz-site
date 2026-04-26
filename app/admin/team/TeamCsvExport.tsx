"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeamMockData, TeamMember, ExamProgress } from "@/lib/team/mock-data";
import { examLabel } from "@/lib/utils";

interface Props {
  team: TeamMockData;
}

function csvEscape(value: string | number): string {
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function rowToCsv(row: Array<string | number>): string {
  return row.map(csvEscape).join(",");
}

function buildMembersCsv(members: TeamMember[]): string {
  const header = [
    "メンバーID",
    "氏名",
    "部署",
    "目標試験",
    "総解答数",
    "正答率(%)",
    "学習時間(分)",
    "登録日",
    "最終ログイン",
  ];
  const rows = members.map((m) => [
    m.id,
    m.name,
    m.department,
    examLabel(m.targetExam),
    m.totalAnswered,
    m.accuracy.toFixed(1),
    m.studyMinutes,
    m.joinedAt,
    m.lastLoginAt,
  ]);
  return [header, ...rows].map(rowToCsv).join("\r\n");
}

function buildExamProgressCsv(progress: ExamProgress[]): string {
  const header = ["試験コード", "試験名", "受験予定者数", "総解答数", "平均正答率(%)"];
  const rows = progress.map((p) => [
    p.exam,
    p.label,
    p.targetUsers,
    p.answered,
    p.accuracy.toFixed(1),
  ]);
  return [header, ...rows].map(rowToCsv).join("\r\n");
}

function buildMonthlySummaryCsv(team: TeamMockData): string {
  const header = ["項目", "値"];
  const today = new Date("2026-04-26");
  const yyyymm = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const rows: Array<Array<string | number>> = [
    ["対象月", yyyymm],
    ["チーム名", team.teamName],
    ["利用席数", `${team.memberCount} / ${team.seatsTotal}`],
    ["今週アクティブメンバー", team.activeThisWeek],
    ["総解答数", team.totalAnswered],
    ["総学習時間(分)", team.totalStudyMinutes],
    ["平均正答率(%)", team.avgAccuracy.toFixed(1)],
  ];
  return [header, ...rows].map(rowToCsv).join("\r\n");
}

function downloadCsv(filename: string, body: string) {
  const blob = new Blob(
    ["\ufeff" + body],
    { type: "text/csv;charset=utf-8;" },
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function TeamCsvExport({ team }: Props) {
  const today = new Date("2026-04-26").toISOString().slice(0, 10);

  const onExportMembers = () => {
    downloadCsv(`team-members_${today}.csv`, buildMembersCsv(team.members));
  };
  const onExportExams = () => {
    downloadCsv(`team-exam-progress_${today}.csv`, buildExamProgressCsv(team.examProgress));
  };
  const onExportSummary = () => {
    downloadCsv(`team-monthly-summary_${today}.csv`, buildMonthlySummaryCsv(team));
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={onExportMembers} type="button">
        <Download className="h-4 w-4" />
        メンバー一覧 CSV
      </Button>
      <Button variant="outline" size="sm" onClick={onExportExams} type="button">
        <Download className="h-4 w-4" />
        試験別進捗 CSV
      </Button>
      <Button variant="outline" size="sm" onClick={onExportSummary} type="button">
        <Download className="h-4 w-4" />
        月次サマリ CSV
      </Button>
    </div>
  );
}
