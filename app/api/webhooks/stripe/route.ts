// POST /api/webhooks/stripe
//
// Stripe Webhook 受信口。署名検証 → イベント種別ごとに DB 反映。
//
// 対応イベント:
//   - checkout.session.completed     → Subscription 新規作成 / User.plan 更新
//   - invoice.paid                    → Subscription.status を active に
//   - invoice.payment_failed          → Subscription.status 反映
//   - customer.subscription.updated   → currentPeriodEnd / status / cancelAtPeriodEnd
//   - customer.subscription.deleted   → User.plan を free に戻す
//
// Stripe API v2025+ では Subscription.current_period_end がトップレベルから削除され、
// 各 SubscriptionItem の current_period_end を使うようになった。
// 本ハンドラは最初の item の current_period_end を Subscription 全体の期末とみなす。

import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, isStripeConfigured } from "@/lib/stripe/client";
import { planFromPriceId } from "@/lib/stripe/plans";
import { prisma } from "@/lib/db/prisma";
import { captureException } from "@/lib/monitoring/sentry";

export const runtime = "nodejs";

function firstItemPeriodEnd(sub: Stripe.Subscription): Date | null {
  const ts = sub.items.data[0]?.current_period_end;
  return typeof ts === "number" ? new Date(ts * 1000) : null;
}

async function upsertSubscription(sub: Stripe.Subscription) {
  const userId = (sub.metadata?.userId as string | undefined) ?? null;
  if (!userId) return;

  const priceId = sub.items.data[0]?.price.id;
  if (!priceId) return;
  const plan = planFromPriceId(priceId);
  if (!plan) return;

  const currentPeriodEnd = firstItemPeriodEnd(sub);

  await prisma.subscription.upsert({
    where: { stripeSubId: sub.id },
    create: {
      userId,
      stripeSubId: sub.id,
      stripePriceId: priceId,
      status: sub.status,
      plan,
      currentPeriodEnd,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
    update: {
      stripePriceId: priceId,
      status: sub.status,
      plan,
      currentPeriodEnd,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  });

  const newUserPlan = sub.status === "active" || sub.status === "trialing" ? plan : "free";
  await prisma.user.update({
    where: { id: userId },
    data: { plan: newUserPlan },
  });
}

function subscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  const details = invoice.parent?.subscription_details;
  if (!details) return null;
  const sub = details.subscription;
  if (!sub) return null;
  return typeof sub === "string" ? sub : sub.id;
}

export async function POST(req: Request) {
  // 署名の有無は最優先で評価する（DB 未接続でも署名なしのリクエストは即 400 で弾く）。
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "webhook_secret_missing" }, { status: 503 });
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("[stripe webhook] signature verification failed", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  // 署名検証は通過。DB 未接続なら永続化はスキップして 200 を返し、Stripe の Retry を回避する。
  if (!process.env.DATABASE_URL) {
    console.warn("[stripe webhook] DATABASE_URL not set — skipping persistence", event.type);
    return NextResponse.json({ received: true, persisted: false });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const sess = event.data.object as Stripe.Checkout.Session;
        if (sess.subscription && typeof sess.subscription === "string") {
          const sub = await stripe.subscriptions.retrieve(sess.subscription);
          await upsertSubscription(sub);
        }
        break;
      }
      case "invoice.paid":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = subscriptionIdFromInvoice(invoice);
        if (subId) {
          const sub = await stripe.subscriptions.retrieve(subId);
          await upsertSubscription(sub);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const sub = event.data.object as Stripe.Subscription;
        await upsertSubscription(sub);
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await prisma.subscription.updateMany({
          where: { stripeSubId: sub.id },
          data: { status: "canceled" },
        });
        const userId = sub.metadata?.userId as string | undefined;
        if (userId) {
          await prisma.user.update({ where: { id: userId }, data: { plan: "free" } });
        }
        break;
      }
      default:
        // 明示的に無視（将来の拡張で追加）
        break;
    }
  } catch (err) {
    console.error("[stripe webhook] handler error", event.type, err);
    await captureException(err, {
      route: "/api/webhooks/stripe",
      extra: { eventType: event.type, eventId: event.id },
    });
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
