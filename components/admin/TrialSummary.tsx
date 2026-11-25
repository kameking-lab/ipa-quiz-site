import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { Account } from "@/lib/billing/subscription/domain";
import { monthlyConfig } from "@/lib/billing/subscription/config";
import { trialStats, type TrialStats } from "@/lib/billing/subscription/trial-stats";

async function load(): Promise<TrialStats | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const c = monthlyConfig();
    const rows = await prisma.$queryRawUnsafe<{ payload: Account }[]>(
      "SELECT payload FROM billing_subscription_account WHERE source_instance=$1 AND mode=$2", c.sourceInstance, c.mode);
    return trialStats(rows.map(r => r.payload));
  } catch {
    return null;
  }
}

export async function TrialSummary() {
  const s = await load();
  if (!s) return <section role="status" className="mb-6 rounded-xl border border-amber-300 p-5"><h2 className="font-semibold">無料期間の集計は未取得です</h2><p className="mt-2 text-sm">課金データベースの接続設定を確認してください。</p></section>;
  const cards = [
    ["決済画面を開いた", s.offered],
    ["無料期間を開始", s.started],
    ["無料期間中", s.trialing],
    ["無料期間中に解約", s.canceledInTrial],
    ["1か月目を支払い", s.converted],
    ["使用済みカードで即課金", s.revoked],
  ] as const;
  return <section className="mb-8 space-y-3" aria-label="初回無料期間の集計">
    <div><h2 className="text-lg font-semibold">初回7日間無料（Web・開始以降の累計）</h2><p className="mt-1 text-sm text-muted-foreground">課金データベースの契約記録から数えた件数です。個人を特定する情報は表示しません。</p></div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{cards.map(([label, value]) => <div key={label} className="rounded-xl border p-4"><p className="text-sm">{label}</p><p className="mt-1 text-2xl font-bold tabular-nums">{value.toLocaleString("ja-JP")}</p></div>)}</div>
  </section>;
}
