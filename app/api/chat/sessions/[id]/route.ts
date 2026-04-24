import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const dbAvailable = !!process.env.DATABASE_URL;

type Params = { params: Promise<{ id: string }> };

const PatchSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
        quickAction: z.string().optional(),
        createdAt: z.string(),
      }),
    )
    .optional(),
});

export async function GET(_req: NextRequest, { params }: Params) {
  if (!dbAvailable) {
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });
  }

  const { id } = await params;
  const { prisma } = await import("@/lib/db/prisma");
  const record = await prisma.chatSession.findUnique({ where: { id } });

  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const session = await auth();
  if (record.userId && record.userId !== session?.user?.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ session: record });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!dbAvailable) {
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });
  }

  const { id } = await params;
  const session = await auth();
  const body = await req.json();
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { prisma } = await import("@/lib/db/prisma");
  const record = await prisma.chatSession.findUnique({ where: { id } });
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (record.userId && record.userId !== session?.user?.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.chatSession.update({
    where: { id },
    data: {
      ...(parsed.data.messages ? { messages: parsed.data.messages } : {}),
    },
  });

  return NextResponse.json({ session: updated });
}

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

  await prisma.chatSession.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
