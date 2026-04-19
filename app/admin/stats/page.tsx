import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "アナリティクス（管理画面）",
  description: "IPA Quiz の内部アナリティクスダッシュボード。Basic Auth 保護。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminStatsPage() {
  const totalQuestions = ALL_QUESTIONS.length;
  const examEntries = Object.entries(QUESTIONS_BY_EXAM) as Array<
    [ExamCode, typeof ALL_QUESTIONS | undefined]
  >;
  const examStats = examEntries
    .map(([code, qs]) => ({
      code,
      label: examLabel(code),
      count: qs?.length ?? 0,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline">管理画面</Badge>
            <Badge variant="success">Basic Auth 保護</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            アナリティクス
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Vercel Analytics で DAU / WAU / MAU・ページビュー・カスタムイベントを追跡します。
          </p>
        </div>
      </div>

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          label="DAU / WAU / MAU"
          value="Vercel"
          sub="Vercel Analytics ダッシュボードで確認"
        />
        <KpiCard label="総問題数" value={totalQuestions.toLocaleString()} sub="全試験合計" />
        <KpiCard
          label="試験区分"
          value={`${examStats.filter((e) => e.count > 0).length}`}
          sub={`/ ${examStats.length} 区分 公開済み`}
        />
        <KpiCard label="カスタムイベント" value="9種" sub="lib/analytics/events.ts 参照" />
      </section>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">試験別コンテンツ収録状況</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3">試験区分</th>
                  <th className="py-2 pr-3">収録問数</th>
                  <th className="py-2 pr-3">状態</th>
                </tr>
              </thead>
              <tbody>
                {examStats.map((e) => (
                  <tr
                    key={e.code}
                    className="border-b border-zinc-100 dark:border-zinc-900"
                  >
                    <td className="py-2 pr-3 font-medium">
                      <span className="mr-2 inline-block rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] uppercase text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {e.code}
                      </span>
                      {e.label}
                    </td>
                    <td className="py-2 pr-3">{e.count.toLocaleString()}</td>
                    <td className="py-2 pr-3">
                      {e.count > 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400">公開中</span>
                      ) : (
                        <span className="text-zinc-500 dark:text-zinc-400">未収録</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">トラッキング対象イベント</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400">
            以下のイベントは <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">lib/analytics/events.ts</code> の{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">trackEvent()</code>{" "}
            経由で Vercel Analytics に送信されます。実数は Vercel Dashboard でご確認ください。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3">イベント名</th>
                  <th className="py-2 pr-3">用途</th>
                  <th className="py-2 pr-3">主要プロパティ</th>
                </tr>
              </thead>
              <tbody>
                {EVENT_DOCS.map((e) => (
                  <tr
                    key={e.name}
                    className="border-b border-zinc-100 align-top dark:border-zinc-900"
                  >
                    <td className="py-2 pr-3 font-mono text-xs">{e.name}</td>
                    <td className="py-2 pr-3">{e.purpose}</td>
                    <td className="py-2 pr-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                      {e.props}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">確認先</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>
              <strong>Vercel Analytics</strong>: Vercel Dashboard の当プロジェクト →
              Analytics タブで PV / UV / 国別 / カスタムイベントを確認
            </li>
            <li>
              <strong>Web Vitals</strong>: 同ダッシュボードの Speed Insights タブで LCP/CLS/INP を確認
            </li>
            <li>
              <strong>ログ</strong>: Vercel Logs でエラー率と API レスポンスタイム
            </li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}

function KpiCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
        <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
        {sub && <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">{sub}</div>}
      </CardContent>
    </Card>
  );
}

const EVENT_DOCS: Array<{ name: string; purpose: string; props: string }> = [
  { name: "quiz_start", purpose: "クイズ開始", props: "exam, mode" },
  { name: "quiz_answer", purpose: "個別解答", props: "exam, correct" },
  { name: "quiz_complete", purpose: "セッション完了", props: "exam, total, accuracy" },
  { name: "copilot_send", purpose: "AI 送信", props: "exam, premium, actionId?" },
  { name: "copilot_limit_reached", purpose: "上限到達", props: "remaining=0" },
  { name: "pricing_view", purpose: "料金ページ表示", props: "source" },
  { name: "email_signup", purpose: "メアド登録", props: "source, plan?" },
  { name: "streak_milestone", purpose: "ストリーク達成", props: "days" },
  { name: "exam_select", purpose: "試験区分選択", props: "exam" },
];
