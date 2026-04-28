import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Headphones, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listPodcastEpisodes } from "@/lib/podcast/episodes";
import { examLabel } from "@/lib/utils";
import { PodcastPlayer } from "./PodcastPlayer";

export const metadata: Metadata = {
  title: "ポッドキャスト | 通勤・家事中に聞き流して覚える",
  description:
    "IPA 情報処理技術者試験の頻出テーマを 5〜10 分で耳から学べるオーディオエピソード集。",
};

export default function PodcastPage() {
  const episodes = listPodcastEpisodes();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" /> ホームに戻る
        </Link>
      </Button>

      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-200">
          <Headphones className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            耳学ポッドキャスト
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            通勤・家事・運動中に聞き流して覚える、IPA 試験向け短時間エピソード集
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {episodes.map((ep) => (
          <article
            key={ep.id}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-sky-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="outline">{examLabel(ep.exam)}</Badge>
              <Badge variant="default">{ep.category}</Badge>
              <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                <Clock className="h-3 w-3" />
                約{ep.durationMin}分
              </span>
              <span className="text-zinc-400 dark:text-zinc-500">{ep.publishedAt}</span>
            </div>
            <h2 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {ep.title}
            </h2>
            <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">{ep.description}</p>
            <PodcastPlayer text={ep.script} />
            <details className="mt-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <summary className="cursor-pointer px-3 py-2 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                <BookOpen className="mr-1 inline h-3 w-3" />
                台本を表示
              </summary>
              <div className="border-t border-zinc-200 px-3 py-2 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                {ep.script.split("\n").map((line, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
            </details>
          </article>
        ))}
      </div>

      <p className="mt-6 px-2 text-xs text-zinc-500 dark:text-zinc-400">
        ※ 音声はあなたのブラウザの音声合成（Web Speech API）でその場で生成しています。
        端末や OS によって声質や対応状況が異なります。
      </p>
    </main>
  );
}
