// POST /api/stripe/checkout
//
// 認証済みユーザー向け Stripe Checkout Session 作成エンドポイント。
// Body: { plan: "premium" | "team" }
// Response: { url: string } — クライアントはこの URL にリダイレクト
//
// - 未ログインなら 401
// - Stripe 未設定なら 503
// - User に stripeCustomerId が無ければ新規作成して DB に保存
// - ログイン中ユーザーが既に same plan なら 400 を返す（重複課金防止）

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripe, isStripeConfigured } from "@/lib/stripe/client";
import { PRICE_CATALOG, getPriceId, type PriceKey } from "@/lib/stripe/plans";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

const APP_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://kakomon-ai.jp");

function isPriceKey(s: unknown): s is PriceKey {
  return s === "premium" || s === "team";
}

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 });
  }

  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { plan?: unknown };
  if (!isPriceKey(body.plan)) {
    return NextResponse.json({ error: "invalid_plan" }, { status: 400 });
  }

  const priceId = getPriceId(body.plan);
  if (!priceId) {
    return NextResponse.json({ error: "price_not_configured" }, { status: 503 });
  }

  const stripe = getStripe();
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "user_not_found" }, { status: 404 });
  }

  if (user.plan === PRICE_CATALOG[body.plan].plan) {
    return NextResponse.json({ error: "already_on_plan" }, { status: 400 });
  }

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? session.user.email,
      name: user.name ?? session.user.name ?? undefined,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${APP_URL}/account?checkout=success`,
    cancel_url: `${APP_URL}/account?checkout=canceled`,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: { userId: user.id, plan: PRICE_CATALOG[body.plan].plan },
    },
    metadata: { userId: user.id, plan: PRICE_CATALOG[body.plan].plan },
  });

  if (!checkout.url) {
    return NextResponse.json({ error: "checkout_url_missing" }, { status: 500 });
  }

  return NextResponse.json({ url: checkout.url });
}
