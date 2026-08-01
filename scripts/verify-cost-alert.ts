/**
 * §0 のコスト上限通知が「本当に Slack へ届くか」を実際に到達させて確かめる。
 *
 * 閾値クロスの通知は、実際に ¥40,000 を使うまで一度も実行されない経路で、
 * 「書いてあるが動かない」ことに誰も気づけない。ここだけは本物の Webhook を
 * 叩いて確認する。
 *
 * 本番の KV は触らない。Upstash の REST API と同じ口を持つ in-memory スタブを
 * ローカルに立て、KV_REST_API_URL をそちらへ向ける。本番の ai_cost:YYYY-MM に
 * ¥40,000 を積むわけにはいかない（積んだ時点で本番の AI が止まる）ため。
 *
 * 使い方:
 *   tsx --env-file=<env> scripts/verify-cost-alert.ts            # 実際に Slack へ送る
 *   tsx --env-file=<env> scripts/verify-cost-alert.ts --dry-run  # 送信せず経路だけ検証
 *
 * 送信されるメッセージには【検証】を付ける（本物の警報と紛れないように）。
 */

import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

const DRY_RUN = process.argv.includes("--dry-run");

// ---- Upstash REST 互換の in-memory KV スタブ -------------------------------

const store = new Map<string, string>();

function handle(path: string): { result: string | number | null } {
  const parts = path.split("/").filter(Boolean).map(decodeURIComponent);
  const [op, key, arg] = parts;
  if (op === "get") {
    return { result: store.get(key) ?? null };
  }
  if (op === "incrbyfloat") {
    const next = Number(store.get(key) ?? 0) + Number(arg);
    store.set(key, String(next));
    return { result: String(next) };
  }
  if (op === "incr") {
    const next = Number(store.get(key) ?? 0) + 1;
    store.set(key, String(next));
    return { result: next };
  }
  if (op === "expire") {
    return { result: 1 };
  }
  throw new Error(`KV スタブが知らない操作です: ${op}`);
}

// ---- Slack 送信の捕捉 ------------------------------------------------------

interface SentMessage {
  text: string;
  status: number | "dry-run" | "error";
}

const sent: SentMessage[] = [];

function installSlackInterceptor(webhookUrl: string): void {
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url !== webhookUrl) {
      return realFetch(input, init);
    }
    const body = JSON.parse(String(init?.body ?? "{}")) as { text?: string };
    const text = `【検証・実運用の警報ではありません】${body.text ?? ""}`;
    if (DRY_RUN) {
      sent.push({ text, status: "dry-run" });
      return new Response("ok", { status: 200 });
    }
    try {
      const res = await realFetch(url, {
        ...init,
        body: JSON.stringify({ text }),
      });
      sent.push({ text, status: res.status });
      return res;
    } catch (err) {
      sent.push({ text, status: "error" });
      throw err;
    }
  }) as typeof fetch;
}

// ---- 検証本体 --------------------------------------------------------------

async function main(): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("SLACK_WEBHOOK_URL が未設定です。--env-file で本番 env を渡してください。");
    process.exit(1);
  }

  const server = createServer((req, res) => {
    try {
      const out = handle(req.url ?? "");
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(out));
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as AddressInfo).port;

  process.env.KV_REST_API_URL = `http://127.0.0.1:${port}`;
  process.env.KV_REST_API_TOKEN = "stub";

  installSlackInterceptor(webhookUrl);

  // env を差し替えてから読み込む（kvConfig は呼び出しごとに env を読むが、
  // 読み込み順に依存しない形にしておく）。
  const { recordAiCost, MONTHLY_COST_CAP_JPY, MONTHLY_COST_WARN_JPY, monthlyCostKey } =
    await import("@/lib/ai/cost-guard");
  const { costJpy } = await import("@/lib/ai/cost-tracker");

  /** ちょうど jpy 円ぶんになる出力トークン数（flash 単価から逆算）。 */
  const tokensFor = (jpy: number) => Math.round(jpy / costJpy("flash", 0, 1));
  const spend = (jpy: number) => recordAiCost({ tier: "flash", inputTokens: 0, outputTokens: tokensFor(jpy), label: "verify" });

  const step = async (name: string, jpy: number, expectDelta: number) => {
    const before = sent.length;
    await spend(jpy);
    const delta = sent.length - before;
    const ok = delta === expectDelta;
    console.log(
      `${ok ? "OK  " : "NG  "} ${name}: 通知 ${delta} 通（期待 ${expectDelta}）  累計 ¥${Math.round(Number(store.get(monthlyCostKey()) ?? 0)).toLocaleString()}`,
    );
    if (!ok) process.exitCode = 1;
  };

  console.log(`月バケット: ${monthlyCostKey()}（ローカルスタブ上）`);
  console.log(`警告 ¥${MONTHLY_COST_WARN_JPY.toLocaleString()} / 上限 ¥${MONTHLY_COST_CAP_JPY.toLocaleString()}`);
  console.log(DRY_RUN ? "モード: dry-run（Slack へは送りません）" : "モード: 実送信");
  console.log("");

  await step("警告ライン手前まで使う", MONTHLY_COST_WARN_JPY - 1, 0);
  await step("警告ラインを初めて超える", 2, 1);
  await step("警告ライン超過のまま使い続ける", 100, 0);
  await step("上限に初めて到達する", MONTHLY_COST_CAP_JPY - MONTHLY_COST_WARN_JPY, 1);
  await step("上限到達のまま使い続ける", 100, 0);

  console.log("");
  console.log(`Slack へ送った通知: ${sent.length} 通`);
  for (const m of sent) {
    console.log(`  [${m.status}] ${m.text.slice(0, 110)}`);
  }
  const delivered = sent.filter((m) => m.status === 200 || m.status === "dry-run").length;
  console.log("");
  if (sent.length === 2 && delivered === 2 && process.exitCode !== 1) {
    console.log("判定: 合格（警告・上限が各 1 回だけ発火し、Webhook に到達した）");
  } else {
    console.log("判定: 不合格");
    process.exitCode = 1;
  }

  server.close();
}

void main();
