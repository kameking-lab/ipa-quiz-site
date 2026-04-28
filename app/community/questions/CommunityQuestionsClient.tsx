"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Filter, MessageSquare, Plus, Tag, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  appendCommunityDraft,
  deleteCommunityDraft,
  readCommunityDrafts,
} from "@/lib/storage/community";
import type {
  CommunityQuestionDraft,
  CommunityQuestionSeed,
  CommunityQuestionStatus,
} from "@/data/community";
import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";

const EXAM_FILTERS: Array<ExamCode | "all"> = [
  "all",
  "ip",
  "sg",
  "fe",
  "ap",
  "sc",
  "nw",
  "db",
  "st",
  "sa",
  "pm",
  "es",
  "sm",
  "au",
];

const STATUS_LABEL: Record<CommunityQuestionStatus, string> = {
  open: "回答募集中",
  answered: "回答あり",
  resolved: "解決済み",
};

const STATUS_VARIANT: Record<
  CommunityQuestionStatus,
  "default" | "primary" | "success"
> = {
  open: "primary",
  answered: "default",
  resolved: "success",
};

export function CommunityQuestionsClient({
  seedPosts,
}: {
  seedPosts: CommunityQuestionSeed[];
}) {
  const [drafts, setDrafts] = React.useState<CommunityQuestionDraft[]>([]);
  const [examFilter, setExamFilter] = React.useState<ExamCode | "all">("all");
  const [composing, setComposing] = React.useState(false);
  const [form, setForm] = React.useState({
    exam: "ap" as ExamCode,
    title: "",
    body: "",
    authorName: "",
    tags: "",
  });

  React.useEffect(() => {
    setDrafts(readCommunityDrafts());
  }, []);

  const merged = React.useMemo(() => {
    const draftPosts = drafts.map((d) => ({
      kind: "draft" as const,
      id: d.id,
      exam: d.exam,
      title: d.title,
      body: d.body,
      authorName: d.authorName,
      tags: d.tags,
      createdAt: d.createdAt,
    }));
    const seeded = seedPosts.map((s) => ({
      kind: "seed" as const,
      id: s.id,
      exam: s.exam,
      title: s.title,
      body: s.body,
      authorName: s.authorName,
      authorYearsExp: s.authorYearsExp,
      tags: s.tags,
      status: s.status,
      answerCount: s.answerCount,
      topAnswerSnippet: s.topAnswerSnippet,
      createdAt: s.createdAt,
    }));
    const all = [...draftPosts, ...seeded];
    if (examFilter === "all") return all;
    return all.filter((p) => p.exam === examFilter);
  }, [drafts, seedPosts, examFilter]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    const draft: CommunityQuestionDraft = {
      id: `cq-local-${Date.now()}`,
      exam: form.exam,
      title: form.title.trim().slice(0, 200),
      body: form.body.trim().slice(0, 4000),
      authorName: form.authorName.trim().slice(0, 60) || "匿名",
      tags: form.tags
        .split(/[,、\s]+/)
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 6),
      createdAt: new Date().toISOString(),
    };
    setDrafts(appendCommunityDraft(draft));
    setForm({ exam: form.exam, title: "", body: "", authorName: form.authorName, tags: "" });
    setComposing(false);
  }

  function handleDelete(id: string) {
    setDrafts(deleteCommunityDraft(id));
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-1.5">
            <Badge variant="primary">
              <MessageSquare className="mr-1 h-3 w-3" />
              コミュニティ
            </Badge>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            みんなの質問掲示板
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            勉強中につまずいたポイントを共有し、合格者・受験仲間と議論できる場です。
            投稿はあなたのブラウザにのみ保存され、サーバーには送信されません（β 版）。
          </p>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/community/stories">
              合格体験記へ
            </Link>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setComposing((v) => !v)}
          >
            {composing ? (
              <>
                <X className="h-4 w-4" />
                キャンセル
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                質問する
              </>
            )}
          </Button>
        </div>
      </header>

      {composing && (
        <Card className="mb-6 border-primary/40">
          <CardContent className="p-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm">
                  <span className="font-medium text-foreground">試験区分</span>
                  <select
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                    value={form.exam}
                    onChange={(e) =>
                      setForm({ ...form, exam: e.target.value as ExamCode })
                    }
                  >
                    {EXAM_FILTERS.filter((c) => c !== "all").map((c) => (
                      <option key={c} value={c}>
                        {examLabel(c)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="font-medium text-foreground">投稿者名（任意）</span>
                  <input
                    type="text"
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                    placeholder="匿名 or ニックネーム"
                    value={form.authorName}
                    maxLength={60}
                    onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-foreground">タイトル</span>
                <input
                  type="text"
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                  placeholder="例: 応用情報の午後選択は何が無難？"
                  value={form.title}
                  required
                  maxLength={200}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-foreground">本文</span>
                <textarea
                  rows={6}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm leading-relaxed"
                  placeholder="背景・現在の対策・困っているポイントを具体的に。"
                  value={form.body}
                  required
                  maxLength={4000}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-foreground">タグ（カンマ区切り、最大 6 個）</span>
                <input
                  type="text"
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                  placeholder="例: 午後選択, セキュリティ, 時間配分"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </label>
              <div className="mt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setComposing(false)}>
                  キャンセル
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  投稿する
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Filter className="h-3.5 w-3.5" />
          試験区分:
        </span>
        {EXAM_FILTERS.map((code) => {
          const active = examFilter === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setExamFilter(code)}
              className={
                active
                  ? "rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
                  : "rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
              }
            >
              {code === "all" ? "すべて" : examLabel(code)}
            </button>
          );
        })}
      </div>

      <ul className="flex flex-col gap-3">
        {merged.map((post) => (
          <li key={post.id}>
            <Card className="overflow-hidden">
              <CardContent className="p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-md bg-primary-soft px-2 py-0.5 font-mono font-semibold uppercase text-primary-soft-foreground">
                    {post.exam}
                  </span>
                  <span className="font-medium text-foreground">{examLabel(post.exam)}</span>
                  {post.kind === "seed" && (
                    <Badge variant={STATUS_VARIANT[post.status]}>
                      {post.status === "resolved" && (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      )}
                      {post.status === "answered" && (
                        <MessageSquare className="mr-1 h-3 w-3" />
                      )}
                      {post.status === "open" && <Clock className="mr-1 h-3 w-3" />}
                      {STATUS_LABEL[post.status]}
                    </Badge>
                  )}
                  {post.kind === "draft" && (
                    <Badge variant="default">あなたの投稿（端末ローカル）</Badge>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatRelative(post.createdAt)}
                  </span>
                </div>
                <h2 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                  {post.title}
                </h2>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {post.body}
                </p>

                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {post.kind === "seed" && post.topAnswerSnippet && (
                  <div className="mt-4 rounded-xl border border-border bg-muted/40 p-3 text-sm leading-relaxed">
                    <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                      <MessageSquare className="h-3 w-3" />
                      ベストアンサー（要約・{post.answerCount} 件中）
                    </div>
                    <p className="text-foreground">{post.topAnswerSnippet}</p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>by {post.authorName}{post.kind === "seed" && post.authorYearsExp ? ` ／ ${post.authorYearsExp}` : ""}</span>
                  {post.kind === "draft" && (
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="inline-flex items-center gap-1 text-destructive hover:underline"
                    >
                      <Trash2 className="h-3 w-3" />
                      削除
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-xs text-muted-foreground">
        ※ β 版のためサーバー保存・通報・削除依頼機能はまだありません。投稿時は実名・連絡先・所属先など個人情報を含めないでください。
      </p>
    </main>
  );
}

function formatRelative(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diffMs = Date.now() - t;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "たった今";
  if (minutes < 60) return `${minutes}分前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  if (days < 14) return `${days}日前`;
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}
