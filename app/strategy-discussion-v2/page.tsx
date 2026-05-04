import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { Markdown } from "@/components/ui/markdown";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Strategy Discussion v2 (一時公開)",
  description: "IPA Quiz 戦略討議 v2 — 赤字試算 + 16項目再討議 + 最終戦略。一時公開・24時間後削除予定。",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: undefined },
};

function loadDoc(): string {
  const filePath = path.join(process.cwd(), "logs", "strategy-discussion-v2.md");
  return fs.readFileSync(filePath, "utf-8");
}

const CHARACTERS = [
  {
    name: "モモ",
    label: "甘口",
    src: "/characters/sweet.svg",
    desc: "励まし型・優しい・ポジティブ",
    accent: "border-pink-300 bg-pink-50 dark:border-pink-800 dark:bg-pink-950/30",
  },
  {
    name: "ハル",
    label: "普通",
    src: "/characters/normal.svg",
    desc: "バランス型・冷静・親切（デフォルト）",
    accent: "border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/30",
  },
  {
    name: "ザン",
    label: "辛口",
    src: "/characters/spicy.svg",
    desc: "厳しい・容赦ない・現実派",
    accent: "border-violet-300 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30",
  },
] as const;

export default function StrategyDiscussionV2Page() {
  const doc = loadDoc();
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        <div className="mb-1 flex items-center gap-2">
          <Badge variant="warn">一時公開</Badge>
          <span className="font-semibold">24時間後に削除予定</span>
        </div>
        <p className="text-xs leading-relaxed">
          このページは内部の戦略討議内容を一時的に共有するためのものです。検索エンジンには登録されません（noindex / nofollow）。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          AIキャラ プレビュー（プレースホルダー）
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {CHARACTERS.map((c) => (
            <div
              key={c.name}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 ${c.accent}`}
            >
              <Image
                src={c.src}
                alt={`${c.name} - ${c.label}`}
                width={120}
                height={120}
                className="rounded-lg"
              />
              <div className="text-center">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {c.name}
                  <span className="ml-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    ({c.label})
                  </span>
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          ※ HF_TOKEN 未設定のため SVG プレースホルダー実装。本番リリース時は FLUX.1-dev 等で本アセット差し替え予定。
        </p>
      </section>

      <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <Markdown>{doc}</Markdown>
      </article>
    </main>
  );
}
