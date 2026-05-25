"use client";

import * as React from "react";
import Link from "next/link";
import {
  Network,
  Database,
  Shield,
  Code2,
  Cog,
  Briefcase,
  Compass,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

interface TopicCardDef {
  id: string;
  label: string;
  blurb: string;
  icon: React.ComponentType<{ className?: string }>;
  // categoryGroup values are matched 1:1 against q.category on the server,
  // so they must echo the canonical strings stored in data/questions/**.
  categoryGroup: string[];
}

const TOPIC_CARDS: TopicCardDef[] = [
  {
    id: "network",
    label: "ネットワーク",
    blurb: "TCP/IP・ルーティング・ゼロトラスト",
    icon: Network,
    categoryGroup: ["ネットワーク", "ネットワーク設計・ゼロトラスト"],
  },
  {
    id: "database",
    label: "データベース",
    blurb: "SQL・正規化・トランザクション",
    icon: Database,
    categoryGroup: ["データベース", "概念データモデル・正規化"],
  },
  {
    id: "security",
    label: "セキュリティ",
    blurb: "認証・暗号・Web 攻撃対策",
    icon: Shield,
    categoryGroup: [
      "セキュリティ",
      "情報セキュリティ",
      "Webアプリケーションセキュリティ",
    ],
  },
  {
    id: "programming",
    label: "プログラミング / アルゴリズム",
    blurb: "計算量・データ構造・実装",
    icon: Code2,
    categoryGroup: ["アルゴリズムとプログラミング", "プログラミング"],
  },
  {
    id: "system-dev",
    label: "システム開発",
    blurb: "アーキテクチャ・組込み・コンピュータ構成",
    icon: Cog,
    categoryGroup: [
      "システムアーキテクチャ",
      "システムアーキテクチャ設計",
      "コンピュータシステム",
      "リアルタイム制御・組込みシステム設計",
    ],
  },
  {
    id: "management",
    label: "マネジメント",
    blurb: "プロジェクト・サービス・監査",
    icon: Briefcase,
    categoryGroup: [
      "プロジェクトマネジメント",
      "プロジェクト計画・リスクマネジメント",
      "サービスマネジメント",
      "ITサービスマネジメント",
      "システム監査",
    ],
  },
  {
    id: "strategy",
    label: "ストラテジ",
    blurb: "経営・事業・IT 戦略",
    icon: Compass,
    categoryGroup: ["経営戦略", "事業戦略・IT戦略", "システム戦略"],
  },
];

export function HomeTopicGrid() {
  // Collapsed by default to cut decision overload on the home page (13 exam
  // cards already compete above). Session-only state — no persistence. The
  // grid stays in the DOM (hidden attribute, not conditional render) so the
  // cross-exam category links remain crawlable for SEO.
  const [open, setOpen] = React.useState(false);

  return (
    <section aria-labelledby="topic-grid-heading" className="mb-6">
      <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
        <button
          type="button"
          id="topic-grid-heading"
          aria-expanded={open}
          aria-controls="topic-grid-panel"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 rounded-lg py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          分野で探す
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div id="topic-grid-panel" hidden={!open} className="mt-3">
      <p className="mb-3 text-xs text-muted-foreground sm:text-sm">
        試験区分をまたいで「ネットワーク」「データベース」など分野ごとに
        横断演習できます。応用情報（AP）の問題が表示されます。
      </p>
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {TOPIC_CARDS.map((t) => {
          const Icon = t.icon;
          const href = `/quiz?mode=random&exam=ap&categoryGroup=${encodeURIComponent(t.categoryGroup.join(","))}`;
          return (
            <li key={t.id}>
              <Link
                href={href}
                className="group flex h-full min-h-[88px] flex-col gap-1.5 rounded-2xl border border-border bg-card p-3 shadow-sm transition motion-safe:hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-3.5"
                aria-label={`${t.label} を横断演習する`}
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-foreground leading-tight">
                    {t.label}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground sm:text-xs">
                  {t.blurb}
                </p>
                <span className="mt-auto inline-flex items-center gap-0.5 text-[11px] font-medium text-primary opacity-80 group-hover:opacity-100">
                  今すぐ解く <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      </div>
    </section>
  );
}
