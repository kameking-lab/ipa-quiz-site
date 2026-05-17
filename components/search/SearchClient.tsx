"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, Search as SearchIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, examLabel, seasonLabel, formatYearSeason } from "@/lib/utils";
import { questionPagePath } from "@/lib/seo/question-url";
import type {
  ExamCode,
  Season,
  Session,
  Difficulty,
} from "@/lib/questions/types";

const EXAM_OPTIONS: ExamCode[] = [
  "ip",
  "sg",
  "fe",
  "ap",
  "st",
  "sa",
  "pm",
  "nw",
  "db",
  "es",
  "sc",
  "sm",
  "au",
];

const SEASON_OPTIONS: Season[] = ["spring", "autumn", "cbt"];
const DIFFICULTY_OPTIONS: Difficulty[] = [1, 2, 3, 4, 5];

interface SearchHit {
  id: string;
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  qNumber: number;
  category: string;
  topicTags: string[];
  difficulty: Difficulty;
  snippet: string;
  score: number;
}

interface FacetCounts {
  exam: Record<string, number>;
  year: Record<string, number>;
  season: Record<string, number>;
  category: Record<string, number>;
  difficulty: Record<string, number>;
}

interface SearchResponse {
  total: number;
  hits: SearchHit[];
  facets: FacetCounts;
  limit: number;
  offset: number;
}

interface ActiveQuery {
  q: string;
  exam: ExamCode | "";
  year: string;
  season: Season | "";
  category: string;
  difficulty: string;
  calculationOnly: boolean;
}

const EMPTY_QUERY: ActiveQuery = {
  q: "",
  exam: "",
  year: "",
  season: "",
  category: "",
  difficulty: "",
  calculationOnly: false,
};

function readFromParams(sp: URLSearchParams): ActiveQuery {
  return {
    q: sp.get("q") ?? "",
    exam: (sp.get("exam") as ExamCode) ?? "",
    year: sp.get("year") ?? "",
    season: (sp.get("season") as Season) ?? "",
    category: sp.get("category") ?? "",
    difficulty: sp.get("difficulty") ?? "",
    calculationOnly: sp.get("calc") === "1",
  };
}

function toParams(q: ActiveQuery): URLSearchParams {
  const sp = new URLSearchParams();
  if (q.q.trim()) sp.set("q", q.q.trim());
  if (q.exam) sp.set("exam", q.exam);
  if (q.year) sp.set("year", q.year);
  if (q.season) sp.set("season", q.season);
  if (q.category) sp.set("category", q.category);
  if (q.difficulty) sp.set("difficulty", q.difficulty);
  if (q.calculationOnly) sp.set("calc", "1");
  return sp;
}

function hasAnyFilter(q: ActiveQuery): boolean {
  return Boolean(
    q.q.trim() ||
      q.exam ||
      q.year ||
      q.season ||
      q.category ||
      q.difficulty ||
      q.calculationOnly,
  );
}

export function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState<ActiveQuery>(EMPTY_QUERY);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setQuery(readFromParams(new URLSearchParams(searchParams.toString())));
  }, [searchParams]);

  const fetchResults = useCallback(async (q: ActiveQuery) => {
    if (!hasAnyFilter(q)) {
      setResult(null);
      setError(null);
      return;
    }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);
    try {
      const sp = toParams(q);
      const res = await fetch(`/api/search/questions?${sp.toString()}`, {
        signal: ctrl.signal,
      });
      if (!res.ok) {
        throw new Error(`status ${res.status}`);
      }
      const data: SearchResponse = await res.json();
      setResult(data);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError("検索に失敗しました。時間をおいて再度お試しください。");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults]);

  const updateQuery = useCallback(
    (patch: Partial<ActiveQuery>) => {
      const next: ActiveQuery = { ...query, ...patch };
      const sp = toParams(next);
      const qs = sp.toString();
      router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
    },
    [query, router],
  );

  const clearAll = useCallback(() => {
    router.replace("/search", { scroll: false });
  }, [router]);

  const filterActive = hasAnyFilter(query);

  return (
    <div className="space-y-6">
      <SearchForm
        query={query}
        onChange={updateQuery}
        onClear={clearAll}
      />

      {filterActive && (
        <FacetPanel
          facets={result?.facets}
          query={query}
          onChange={updateQuery}
        />
      )}

      <ResultsPanel
        loading={loading}
        error={error}
        result={result}
        query={query}
      />
    </div>
  );
}

interface SearchFormProps {
  query: ActiveQuery;
  onChange: (patch: Partial<ActiveQuery>) => void;
  onClear: () => void;
}

function SearchForm({ query, onChange, onClear }: SearchFormProps) {
  const [local, setLocal] = useState(query.q);

  useEffect(() => {
    setLocal(query.q);
  }, [query.q]);

  return (
    <form
      role="search"
      aria-label="問題検索"
      className="rounded-2xl border border-border bg-card p-4 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        onChange({ q: local });
      }}
    >
      <label htmlFor="search-input" className="sr-only">
        キーワード
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="search-input"
            type="search"
            inputMode="search"
            placeholder="例) TCP 輻輳制御、データベース正規化、SQL注入"
            className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 sm:h-12"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            enterKeyHint="search"
          />
          {local && (
            <button
              type="button"
              aria-label="入力をクリア"
              className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted"
              onClick={() => {
                setLocal("");
                onChange({ q: "" });
              }}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" size="md" className="flex-1 sm:flex-none">
            検索
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onClear}
            aria-label="すべての条件をクリア"
          >
            クリア
          </Button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={query.calculationOnly}
            onChange={(e) => onChange({ calculationOnly: e.target.checked })}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          計算問題のみ
        </label>
      </div>
    </form>
  );
}

interface FacetPanelProps {
  facets: FacetCounts | undefined;
  query: ActiveQuery;
  onChange: (patch: Partial<ActiveQuery>) => void;
}

function FacetPanel({ facets, query, onChange }: FacetPanelProps) {
  const examEntries = useMemo(
    () =>
      EXAM_OPTIONS.map((code) => ({
        code,
        count: facets?.exam[code] ?? 0,
      })).filter((e) => e.count > 0 || query.exam === e.code),
    [facets, query.exam],
  );

  const yearEntries = useMemo(() => {
    const map = facets?.year ?? {};
    return Object.keys(map)
      .map((y) => ({ year: y, count: map[y] }))
      .sort((a, b) => Number(b.year) - Number(a.year));
  }, [facets]);

  const seasonEntries = useMemo(
    () =>
      SEASON_OPTIONS.map((s) => ({ season: s, count: facets?.season[s] ?? 0 })).filter(
        (e) => e.count > 0 || query.season === e.season,
      ),
    [facets, query.season],
  );

  const categoryEntries = useMemo(() => {
    const map = facets?.category ?? {};
    return Object.keys(map)
      .map((c) => ({ category: c, count: map[c] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }, [facets]);

  const difficultyEntries = useMemo(
    () =>
      DIFFICULTY_OPTIONS.map((d) => ({
        difficulty: d,
        count: facets?.difficulty[String(d)] ?? 0,
      })).filter((e) => e.count > 0 || String(query.difficulty) === String(e.difficulty)),
    [facets, query.difficulty],
  );

  return (
    <section
      aria-label="絞り込み"
      className="rounded-2xl border border-border bg-card p-4 shadow-sm"
    >
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        絞り込み
      </h2>
      <div className="space-y-4">
        <FacetGroup label="試験区分">
          {examEntries.length === 0 ? (
            <span className="text-xs text-muted-foreground">該当なし</span>
          ) : (
            examEntries.map(({ code, count }) => (
              <FacetChip
                key={code}
                active={query.exam === code}
                onClick={() =>
                  onChange({ exam: query.exam === code ? "" : code })
                }
                label={examLabel(code)}
                count={count}
              />
            ))
          )}
        </FacetGroup>

        {yearEntries.length > 0 && (
          <FacetGroup label="年度">
            {yearEntries.map(({ year, count }) => (
              <FacetChip
                key={year}
                active={query.year === year}
                onClick={() =>
                  onChange({ year: query.year === year ? "" : year })
                }
                label={`${year}年`}
                count={count}
              />
            ))}
          </FacetGroup>
        )}

        {seasonEntries.length > 0 && (
          <FacetGroup label="季節">
            {seasonEntries.map(({ season, count }) => (
              <FacetChip
                key={season}
                active={query.season === season}
                onClick={() =>
                  onChange({ season: query.season === season ? "" : season })
                }
                label={seasonLabel(season)}
                count={count}
              />
            ))}
          </FacetGroup>
        )}

        {categoryEntries.length > 0 && (
          <FacetGroup label="分野">
            {categoryEntries.map(({ category, count }) => (
              <FacetChip
                key={category}
                active={query.category === category}
                onClick={() =>
                  onChange({
                    category: query.category === category ? "" : category,
                  })
                }
                label={category}
                count={count}
              />
            ))}
          </FacetGroup>
        )}

        {difficultyEntries.length > 0 && (
          <FacetGroup label="難度">
            {difficultyEntries.map(({ difficulty, count }) => (
              <FacetChip
                key={difficulty}
                active={String(query.difficulty) === String(difficulty)}
                onClick={() =>
                  onChange({
                    difficulty:
                      String(query.difficulty) === String(difficulty)
                        ? ""
                        : String(difficulty),
                  })
                }
                label={`★${difficulty}`}
                count={count}
              />
            ))}
          </FacetGroup>
        )}
      </div>
    </section>
  );
}

function FacetGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FacetChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
          active ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground",
        )}
      >
        {count.toLocaleString("ja-JP")}
      </span>
    </button>
  );
}

interface ResultsPanelProps {
  loading: boolean;
  error: string | null;
  result: SearchResponse | null;
  query: ActiveQuery;
}

function ResultsPanel({ loading, error, result, query }: ResultsPanelProps) {
  const filterActive = hasAnyFilter(query);

  if (!filterActive) {
    return (
      <section
        aria-live="polite"
        className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground"
      >
        キーワードまたは絞り込み条件を指定すると、過去問が検索できます。
      </section>
    );
  }

  if (error) {
    return (
      <section
        role="alert"
        className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
      >
        {error}
      </section>
    );
  }

  if (loading && !result) {
    return (
      <section
        aria-live="polite"
        className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground"
      >
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        検索中...
      </section>
    );
  }

  if (!result) return null;

  if (result.total === 0) {
    return (
      <section
        aria-live="polite"
        className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground"
      >
        該当する問題は見つかりませんでした。条件を変えてお試しください。
      </section>
    );
  }

  return (
    <section aria-label="検索結果" className="space-y-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-foreground">
          検索結果
          <span className="ml-2 text-muted-foreground">
            {result.total.toLocaleString("ja-JP")} 件
          </span>
        </h2>
        {loading && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
            更新中
          </span>
        )}
      </div>

      <ul className="space-y-2">
        {result.hits.map((hit) => (
          <li key={hit.id}>
            <ResultItem hit={hit} />
          </li>
        ))}
      </ul>

      {result.total > result.hits.length && (
        <p className="pt-2 text-center text-xs text-muted-foreground">
          上位 {result.hits.length} 件を表示しています。条件を絞り込んでさらに精度を上げてください。
        </p>
      )}
    </section>
  );
}

function ResultItem({ hit }: { hit: SearchHit }) {
  const href = questionPagePath({
    exam: hit.exam,
    year: hit.year,
    season: hit.season,
    session: hit.session,
    qNumber: hit.qNumber,
  });
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="soft" className="text-[10px]">
              {examLabel(hit.exam)}
            </Badge>
            <span className="text-[11px] font-medium text-muted-foreground">
              {formatYearSeason(hit.year, hit.season)} 問{hit.qNumber}
            </span>
            <span className="text-[10px] text-muted-foreground">
              ★{hit.difficulty}
            </span>
          </div>
          <p className="mt-2 text-sm text-foreground line-clamp-2">
            {hit.snippet}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {hit.category}
            </span>
            {hit.topicTags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
        <ArrowRight
          className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
