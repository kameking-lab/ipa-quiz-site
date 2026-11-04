"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { examLabel } from "@/lib/utils";
import {
  getMockScores,
  getNickname,
  setNickname,
} from "@/lib/learning/mock-scores";
import type { MockScore } from "@/lib/learning/mock-scores";
import type { ExamCode } from "@/lib/questions/types";

export function MockScoreHistory() {
  const [exam, setExam] = React.useState<ExamCode>("ap");
  const [nickname, setNicknameState] = React.useState("");
  const [scores, setScores] = React.useState<MockScore[]>([]);

  React.useEffect(() => {
    setNicknameState(getNickname());
    setScores(getMockScores());
  }, []);

  function persistNickname(value: string) {
    setNicknameState(value);
    setNickname(value);
  }

  const examScores = scores.filter((s) => s.exam === exam);
  const latest = examScores[examScores.length - 1];
  const latestPct = latest ? Math.round((latest.score / latest.total) * 100) : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">プロフィール</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">表示名（匿名OK）</span>
              <input
                type="text"
                value={nickname}
                placeholder="名無しの受験者"
                maxLength={20}
                onChange={(e) => persistNickname(e.target.value)}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              />
            </label>
            <label className="flex-1">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">対象試験</span>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value as ExamCode)}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              >
                {ALL_QUIZ_EXAM_CODES.map((c) => (
                  <option key={c} value={c}>
                    {examLabel(c)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">あなたのスコア</CardTitle>
        </CardHeader>
        <CardContent>
          {latest ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="最新スコア" value={`${latest.score}/${latest.total}`} />
              <Stat
                label="得点率"
                value={`${latestPct}%`}
                highlight={(latestPct ?? 0) >= 60}
              />

            </div>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              この試験の模試スコアはまだ記録されていません。模試モードを完了するとここに反映されます。
            </p>
          )}
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            この端末に保存された模試結果です。全国順位や合格可能性を示すものではありません。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">スコア履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {examScores.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              履歴はまだありません。
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {[...examScores].reverse().map((s) => {
                const pct = Math.round((s.score / s.total) * 100);
                return (
                  <li
                    key={s.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(s.takenAt).toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}
                    </span>
                    <span className="font-medium">
                      {s.score}/{s.total}
                    </span>
                    <Badge variant="outline">{pct}%</Badge>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            ※ 模試スコアはこの端末に保存されます。
          </p>
        </CardContent>
      </Card>

    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
      <div
        className={
          highlight
            ? "text-2xl font-bold text-sky-700 dark:text-sky-300"
            : "text-2xl font-bold"
        }
      >
        {value}
      </div>
    </div>
  );
}
