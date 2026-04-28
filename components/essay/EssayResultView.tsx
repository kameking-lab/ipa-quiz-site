"use client";

import { CheckCircle2, AlertTriangle, XCircle, Sparkles, MinusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type {
  EssayGradingResult,
  EssayQuestion,
  EssayRank,
  EssaySubResult,
} from "@/lib/essay/types";
import { INDUSTRY_LABELS } from "@/lib/essay/types";

const RANK_META: Record<EssayRank, { label: string; sub: string; classes: string; ring: string }> = {
  A: {
    label: "A",
    sub: "合格濃厚（70%+）",
    classes: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100",
    ring: "ring-emerald-500/30",
  },
  B: {
    label: "B",
    sub: "ボーダー（40-70%）",
    classes: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",
    ring: "ring-amber-500/30",
  },
  C: {
    label: "C",
    sub: "不合格濃厚（40%未満）",
    classes: "bg-orange-100 text-orange-900 dark:bg-orange-900/40 dark:text-orange-100",
    ring: "ring-orange-500/30",
  },
  fail: {
    label: "不合格",
    sub: "設問理解不足",
    classes: "bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-100",
    ring: "ring-red-500/30",
  },
};

interface Props {
  result: EssayGradingResult;
  question: EssayQuestion;
}

export function EssayResultView({ result, question }: Props) {
  const meta = RANK_META[result.rank];
  return (
    <div className="space-y-5">
      <Card className={`ring-4 ${meta.ring}`}>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
            <div
              className={`flex h-24 w-24 flex-col items-center justify-center rounded-2xl text-4xl font-bold ${meta.classes}`}
            >
              {meta.label}
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                AI 総合判定 — {INDUSTRY_LABELS[result.industry]}
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {meta.sub}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline">合格率予測: {result.passProbability}%</Badge>
                {result.model && (
                  <Badge variant="outline" className="text-[10px]">
                    model: {result.model}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {result.overallAdvice && (
            <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200">
              <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                <Sparkles className="h-3 w-3" /> 全体的な改善アドバイス
              </p>
              {result.overallAdvice}
            </div>
          )}
        </CardContent>
      </Card>

      {result.subResults.map((sub) => (
        <SubResultCard key={sub.key} sub={sub} question={question} />
      ))}

      {result.unnecessaryElements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MinusCircle className="h-4 w-4 text-zinc-500" />
              不要だった要素
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm">
              {result.unnecessaryElements.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                  <span className="text-zinc-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {result.improvedExample && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-sky-500" />
              改善版論述例（設問アの冒頭）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-relaxed text-sky-900 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100">
              {result.improvedExample}
            </p>
          </CardContent>
        </Card>
      )}

      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        ※ AI 採点は学習補助です。実際の合否判定とは異なる場合があります。
      </p>
    </div>
  );
}

function SubResultCard({ sub, question }: { sub: EssaySubResult; question: EssayQuestion }) {
  const subPrompt = question.subPrompts.find((p) => p.key === sub.key);
  const scoreColor =
    sub.score >= 70
      ? "text-emerald-600 dark:text-emerald-400"
      : sub.score >= 50
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">設問{sub.key}</CardTitle>
          <span className={`text-2xl font-bold tabular-nums ${scoreColor}`}>{sub.score}</span>
        </div>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {sub.charCount} 字 / 目安 {subPrompt?.targetChars ?? "—"} 字
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <AxisBars axes={sub.axes} />

        {sub.goodPoints.length > 0 && (
          <Section
            title="良かった点"
            icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            items={sub.goodPoints}
            tone="good"
          />
        )}

        {sub.improvements.length > 0 && (
          <Section
            title="改善すべき点"
            icon={<AlertTriangle className="h-4 w-4 text-amber-500" />}
            items={sub.improvements}
            tone="warn"
          />
        )}

        {sub.missingElements.length > 0 && (
          <Section
            title="もっと書くべきだった内容"
            icon={<XCircle className="h-4 w-4 text-red-500" />}
            items={sub.missingElements}
            tone="bad"
          />
        )}
      </CardContent>
    </Card>
  );
}

function Section({
  title,
  icon,
  items,
  tone,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  tone: "good" | "warn" | "bad";
}) {
  const bg =
    tone === "good"
      ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
      : tone === "warn"
        ? "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30"
        : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30";
  return (
    <div className={`rounded-xl border p-3 ${bg}`}>
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
        {icon}
        {title}
      </p>
      <ul className="space-y-1.5 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-0.5 text-zinc-400">•</span>
            <span className="text-zinc-800 dark:text-zinc-100">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AxisBars({ axes }: { axes: EssaySubResult["axes"] }) {
  const items: Array<{ key: keyof EssaySubResult["axes"]; label: string }> = [
    { key: "relevance", label: "適合度" },
    { key: "logic", label: "論理性" },
    { key: "concreteness", label: "具体性" },
    { key: "industryFit", label: "業種事例の適切さ" },
  ];
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((it) => {
        const v = axes[it.key];
        const barColor =
          v >= 70 ? "bg-emerald-500" : v >= 50 ? "bg-amber-500" : "bg-red-500";
        return (
          <div key={it.key} className="text-xs">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">{it.label}</span>
              <span className="tabular-nums font-medium">{v}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className={`h-full ${barColor} transition-all`}
                style={{ width: `${v}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
