import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const dbAvailable = !!process.env.DATABASE_URL;

const CreateSchema = z.object({
  questionId: z.string(),
  examCode: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
      quickAction: z.string().optional(),
      createdAt: z.string(),
    }),
  ),
});

export async function GET(req: NextRequest) {
  if (!dbAvailable) {
    return NextResponse.json({ sessions: [] });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prisma } = await import("@/lib/db/prisma");
  const sessions = await prisma.chatSession.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    take: 50,
    select: {
      id: true,
      questionId: true,
      examCode: true,
      isPublic: true,
      shareToken: true,
      createdAt: true,
      updatedAt: true,
      messages: true,
    },
  });

  return NextResponse.json({ sessions });
}

export async function POST(req: NextRequest) {
  if (!dbAvailable) {
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });
  }

  const session = await auth();
  const body = await req.json();
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { prisma } = await import("@/lib/db/prisma");
  const record = await prisma.chatSession.create({
    data: {
      userId: session?.user?.id ?? null,
      questionId: parsed.data.questionId,
      examCode: parsed.data.examCode,
      messages: parsed.data.messages,
    },
  });

  return NextResponse.json({ id: record.id });
}
