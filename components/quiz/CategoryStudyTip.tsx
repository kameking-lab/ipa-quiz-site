import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { getCategoryTip } from "@/lib/seo/category-tips";
import { Badge } from "@/components/ui/badge";

export function CategoryStudyTip({
  category,
  exam,
  topicTags,
}: {
  category: string;
  exam: ExamCode;
  topicTags: string[];
}) {
  const tip = getCategoryTip(category);
  const keywords = Array.from(
    new Set([...topicTags.slice(0, 4), ...tip.relatedKeywords]),
  ).slice(0, 8);
  const categoryHref = `/${exam}/topic/${encodeURIComponent(category)}`;

  return (
    <section
      aria-label="この分野の学習ポイント"
      className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <GraduationCap className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            分野「{category}」の学習ポイント
          </h2>
          <p className="text-[11px] text-muted-foreground">
            この問題の理解を「分野全体の力」に広げるための足がかり
          </p>
        </div>
      </div>

      <dl className="space-y-3 text-sm leading-relaxed text-card-foreground">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            何が問われるか
          </dt>
          <dd className="mt-1">{tip.whatMatters}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            学習の進め方
          </dt>
          <dd className="mt-1">{tip.howToStudy}</dd>
        </div>
        {keywords.length > 0 && (
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              関連キーワード
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {keywords.map((k) => (
                <Badge key={k} variant="outline" className="text-[10px]">
                  {k}
                </Badge>
              ))}
            </dd>
          </div>
        )}
      </dl>

      <Link
        href={categoryHref}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        この分野の問題をもっと解く
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  );
}
