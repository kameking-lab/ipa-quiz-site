import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_TEAM } from "@/lib/team/mock-data";
import { TEAM_PLAN, formatPlanPrice } from "@/lib/plans";
import { ExamProgressChart } from "./ExamProgressChart";

export const metadata: Metadata = {
  title: "法人ダッシュボード（プロトタイプ）",
  description:
    "法人向け Team プランのダッシュボードプロトタイプ。メンバー進捗・試験別解答数・正答率を一元可視化。",
  robots: { index: false, follow: false },
};

function formatHours(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}分`;
  return `${h}時間${m > 0 ? `${m}分` : ""}`;
}

function lastLoginLabel(iso: string): string {
  const today = new Date("2026-04-19");
  const d = new Date(iso);
  const diff = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "今日";
  if (diff === 1) return "昨日";
  if (diff < 7) return `${diff}日前`;
  return `${diff}日前`;
}

export default function AdminTeamPage() {
  const team = MOCK_TEAM;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline">プロトタイプ</Badge>
            <Badge variant="warn">Team プラン 2026年6月公開予定</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {team.teamName}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {TEAM_PLAN.name} プラン / {formatPlanPrice(TEAM_PLAN)}
            {" — "}
            {team.memberCount} 名 / 席数無制限
          </p>
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          ※ 本ページは営業デモ用のモックデータです
        </div>
      </div>

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="登録メンバー" value={`${team.memberCount}名`} sub={`今週 ${team.activeThisWeek}名 が学習`} />
        <StatCard label="総解答数" value={team.totalAnswered.toLocaleString()} sub="全メンバー累計" />
        <StatCard label="総学習時間" value={formatHours(team.totalStudyMinutes)} sub="今月累計" />
        <StatCard label="平均正答率" value={`${team.avgAccuracy.toFixed(1)}%`} sub="全試験平均" />
      </section>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">試験別進捗</CardTitle>
        </CardHeader>
        <CardContent>
          <ExamProgressChart data={team.examProgress} />
          <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            解答数（青）と正答率（緑）を 2 軸で表示。受験目標ユーザー数は下表参照。
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3">試験</th>
                  <th className="py-2 pr-3">受験予定</th>
                  <th className="py-2 pr-3">解答数</th>
                  <th className="py-2 pr-3">正答率</th>
                </tr>
              </thead>
              <tbody>
                {team.examProgress.map((p) => (
                  <tr
                    key={p.exam}
                    className="border-b border-zinc-100 dark:border-zinc-900"
                  >
                    <td className="py-2 pr-3 font-medium">{p.label}</td>
                    <td className="py-2 pr-3">{p.targetUsers}名</td>
                    <td className="py-2 pr-3">{p.answered.toLocaleString()}</td>
                    <td className="py-2 pr-3">{p.accuracy.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">部署別サマリー</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {team.departments.map((d) => (
              <div
                key={d.name}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{d.name}</div>
                <div className="mt-1 text-xl font-bold">{d.memberCount}名</div>
                <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  平均正答率 {d.avgAccuracy.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">メンバー一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3">氏名</th>
                  <th className="py-2 pr-3">部署</th>
                  <th className="py-2 pr-3">目標試験</th>
                  <th className="py-2 pr-3">解答数</th>
                  <th className="py-2 pr-3">正答率</th>
                  <th className="py-2 pr-3">学習時間</th>
                  <th className="py-2 pr-3">最終ログイン</th>
                </tr>
              </thead>
              <tbody>
                {team.members.map((m) => {
                  const accuracyColor =
                    m.accuracy >= 75
                      ? "text-emerald-600 dark:text-emerald-400"
                      : m.accuracy >= 60
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-rose-600 dark:text-rose-400";
                  return (
                    <tr
                      key={m.id}
                      className="border-b border-zinc-100 dark:border-zinc-900"
                    >
                      <td className="py-2 pr-3 font-medium">{m.name}</td>
                      <td className="py-2 pr-3 text-zinc-600 dark:text-zinc-400">
                        {m.department}
                      </td>
                      <td className="py-2 pr-3 uppercase text-zinc-600 dark:text-zinc-400">
                        {m.targetExam}
                      </td>
                      <td className="py-2 pr-3">{m.totalAnswered.toLocaleString()}</td>
                      <td className={`py-2 pr-3 font-semibold ${accuracyColor}`}>
                        {m.accuracy.toFixed(1)}%
                      </td>
                      <td className="py-2 pr-3">{formatHours(m.studyMinutes)}</td>
                      <td className="py-2 pr-3 text-zinc-600 dark:text-zinc-400">
                        {lastLoginLabel(m.lastLoginAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
        <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
        {sub && <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{sub}</div>}
      </CardContent>
    </Card>
  );
}
