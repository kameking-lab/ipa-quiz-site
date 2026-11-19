import { monthlySelected } from "@/lib/billing/subscription/config";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
import { notifyOpsInBackground } from "@/lib/notify/ops-alert";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET) return Response.json({ ok: false }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`)
    return Response.json({ ok: false }, { status: 401 });
  if (!monthlySelected()) return Response.json({ ok: true, checked: 0 });

  let checked = 0, failed = 0;
  const scanTime = Date.now();
  const end = scanTime + 40_000;
  let backlog = false;
  const scanned: string[] = [];
  try {
    const { config, store, service, provider } = monthlyRuntime(false, AbortSignal.timeout(48_000));
    while (Date.now() < end) {
      const orders = await store.examEndsToReconcile(config.mode, scanTime / 1000, scanned);
      if (!orders.length) break;
      for (let start = 0; start < orders.length && Date.now() < end; start += 4) {
        const batch = orders.slice(start, start + 4);
        scanned.push(...batch.map(order => order.signup_id));
        const results = await Promise.allSettled(batch.map(order =>
          service.runExamEndCheck(order.user_id, order.signup_id, provider)));
        checked += results.length;
        failed += results.filter(result => result.status === "rejected").length;
      }
    }
    backlog = Date.now() >= end;
  } catch { failed++; }
  if (failed || backlog) notifyOpsInBackground({ key: "billing:exam-end-reconcile",
    text: `[過去問AI] 自動終了の照合を確認してください。処理 ${checked} 件、失敗 ${failed} 件${backlog ? "、未処理あり" : ""}` });
  return Response.json({ ok: failed === 0, checked, failed, backlog }, { status: failed ? 503 : 200 });
}
