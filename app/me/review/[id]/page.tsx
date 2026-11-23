import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { findQuestionById } from "@/lib/questions/pool-server";
import { questionPagePath } from "@/lib/seo/question-url";

export const metadata: Metadata = { title: "学習の記録", robots: { index: false, follow: false } };

export default async function RecordedQuestionPage({ params }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = id.length <= 1000 ? await findQuestionById(id) : undefined;
  if (!question) notFound();
  redirect(questionPagePath(question));
}
