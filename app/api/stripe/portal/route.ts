// POST /api/stripe/portal
//
// Stripe Customer Portal のセッションを作成し URL を返す。
// 解約・支払い方法変更・請求書閲覧に利用。

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripe, isStripeConfigured } from "@/lib/stripe/client";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

const APP_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://kakomon-ai.jp");

export async function POST() {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: "no_customer" }, { status: 400 });
  }

  const stripe = getStripe();
  const portal = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${APP_URL}/account`,
  });

  return NextResponse.json({ url: portal.url });
}
