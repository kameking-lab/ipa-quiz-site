import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { streamHistory } from "@/lib/sync/history-server";

export const runtime = "nodejs";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 });
  }
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id, email, plan } = session.user;
  return streamHistory(id, { exportedAt: new Date().toISOString(), user: { id, email, plan } }, false, {
    "Content-Disposition": `attachment; filename="ipa-quiz-history-${Date.now()}.json"`,
  });
}
