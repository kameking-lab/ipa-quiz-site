import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, ExternalLink } from "lucide-react";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/utils";
import { examLabel, formatYearSeason } from "@/lib/utils";
import type { ChatMessage } from "@/lib/chat/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

async function getPublicSession(id: string) {
  if (!process.env.DATABASE_URL) return null;
  const { prisma } = await import("@/lib/db/prisma");
  const record = await prisma.chatSession.findUnique({
    where: { shareToken: id },
    select: {
      id: true,
      questionId: true,
      examCode: true,
      messages: true,
      isPublic: true,
      createdAt: true,
    },
  });
  if (!record || !record.isPublic) return null;
  return record;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const record = await getPublicSession(id);
  if (!record) {
    return { title: "Not Found" };
  }
  const msgs = record.messages as ChatMessage[];
  const firstAssistant = msgs.find((m) => m.role === "assistant");
  const description = firstAssistant
    ? firstAssistant.content.slice(0, 100).replace(/\s+/g, " ")
    : "AIと一緒に解いたIPA過去問の会話記録です。";

  return {
    title: `AIと一緒に解いたIPA過去問 | 過去問AI`,
    description,
    openGraph: {
      title: `AIと一緒に解いたIPA過去問 — ${examLabel(record.examCode)}`,
      description,
      url: `https://ipa-quiz-site.vercel.app/chat/share/${id}`,
      siteName: "過去問AI",
    },
    twitter: {
      card: "summary",
      title: `AIと一緒に解いたIPA過去問 — ${examLabel(record.examCode)}`,
      description,
    },
  };
}

export default async function DBChatSharePage({ params }: Params) {
  const { id } = await params;
  const record = await getPublicSession(id);
  if (!record) notFound();

  const messages = record.messages as ChatMessage[];

  // Reconstruct display info from questionId: "ap-2024spring-am-q42"
  const [examCode, rest] = [record.examCode, record.questionId.replace(`${record.examCode}-`, "")];
  const yearMatch = rest.match(/^(\d{4})(spring|autumn|cbt)/);
  const year = yearMatch ? parseInt(yearMatch[1]) : 0;
  const season = yearMatch ? yearMatch[2] : "";
  const qMatch = record.questionId.match(/q(\d+)$/);
  const qNumber = qMatch ? parseInt(qMatch[1]) : 0;

  const examName = examLabel(examCode);
  const yearSeason = year ? formatYearSeason(year, season) : "";

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950">
          <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
        </div>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">過去問AI との会話</p>
          <h1 className="text-base font-bold">
            {examName} {yearSeason}{qNumber ? ` 問${qNumber}` : ""}
          </h1>
        </div>
      </div>

      {/* Conversation */}
      <section className="mb-8 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">AIとの会話</h2>
        {messages.length === 0 ? (
          <p className="text-sm text-zinc-400">会話はありません。</p>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl px-3 py-2",
                m.role === "user"
                  ? "ml-6 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100"
                  : "mr-2 bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-800",
              )}
            >
              <p className="mb-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                {m.role === "user" ? "ユーザー" : "過去問AI"}
              </p>
              {m.role === "assistant" ? (
                <Markdown>{m.content}</Markdown>
              ) : (
                <p className="text-sm leading-relaxed">{m.content}</p>
              )}
            </div>
          ))
        )}
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-center dark:border-sky-900/50 dark:bg-sky-950/30">
        <p className="mb-1 text-sm font-semibold text-sky-900 dark:text-sky-200">
          あなたもこの問題に挑戦しませんか？
        </p>
        <p className="mb-4 text-xs text-sky-700 dark:text-sky-400">
          過去問AI で全 IPA 試験区分の過去問をAIと一緒に解けます。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
        >
          <Sparkles className="h-4 w-4" />
          過去問AI を試す
          <ExternalLink className="h-3 w-3 opacity-70" />
        </Link>
      </div>

      <footer className="mt-8 text-center text-[11px] text-zinc-400 dark:text-zinc-600">
        出典: IPA 情報処理技術者試験 ／ 過去問AI — https://ipa-quiz-site.vercel.app
      </footer>
    </main>
  );
}
