import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const dbAvailable = !!process.env.DATABASE_URL;

type Params = { params: Promise<{ id: string }> };

function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(18)))
    .map((b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 24);
}

/** POST — 公開URL生成 */
export async function POST(_req: NextRequest, { params }: Params) {
  if (!dbAvailable) {
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });
  }

  const { id } = await params;
  const session = await auth();

  const { prisma } = await import("@/lib/db/prisma");
  const record = await prisma.chatSession.findUnique({ where: { id } });
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (record.userId && record.userId !== session?.user?.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const token = record.shareToken ?? generateToken();
  const updated = await prisma.chatSession.update({
    where: { id },
    data: { isPublic: true, shareToken: token },
  });

  return NextResponse.json({ shareToken: updated.shareToken });
}

/** DELETE — 公開解除 */
export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!dbAvailable) {
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });
  }

  const { id } = await params;
  const session = await auth();

  const { prisma } = await import("@/lib/db/prisma");
  const record = await prisma.chatSession.findUnique({ where: { id } });
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (record.userId && record.userId !== session?.user?.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.chatSession.update({
    where: { id },
    data: { isPublic: false },
  });

  return NextResponse.json({ ok: true });
}
