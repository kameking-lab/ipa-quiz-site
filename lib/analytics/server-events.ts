// サーバー側で発火する CVR / 課金関連イベント。
//
// Vercel Analytics の `track()` はブラウザ前提のため、サーバーからは
// 構造化 JSON ログとして stdout に流す。Vercel Logs でフィルタ可能で、
// Datadog/Better Stack 等への外部転送はインフラ側で行う想定。
//
// イベントは「発生事実」を捕捉する。ユーザー特定情報は userId のみで、
// メールアドレスや決済額は含めない（PII 最小化）。

export type ServerEvent =
  | {
      name: "subscription_started";
      userId: string;
      plan: "premium" | "team";
      stripeSubId: string;
      trialing: boolean;
    }
  | {
      name: "subscription_renewed";
      userId: string;
      plan: "premium" | "team";
      stripeSubId: string;
    }
  | {
      name: "subscription_canceled";
      userId: string;
      plan: "premium" | "team";
      stripeSubId: string;
      cancelAtPeriodEnd: boolean;
    }
  | {
      name: "payment_succeeded";
      userId: string;
      stripeSubId?: string;
      amountJpy?: number;
    }
  | {
      name: "payment_failed";
      userId: string;
      stripeSubId?: string;
      attempt?: number;
    }
  | {
      name: "trial_started";
      userId: string;
      plan: "premium" | "team";
      stripeSubId: string;
      trialDays: number;
    };

export function logServerEvent(event: ServerEvent): void {
  // Vercel/Cloudwatch が JSON を優先パースする形式に揃える。
  const payload = {
    type: "billing_event",
    event: event.name,
    ts: new Date().toISOString(),
    ...event,
  };
  try {
    // stdout にそのまま流す。失敗してもアプリには影響を出さない。

    console.log(JSON.stringify(payload));
  } catch {
    /* noop */
  }
}
