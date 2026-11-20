"use client";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Loader2,
  Search as SearchIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QualificationSelect } from "@/components/qualifications/QualificationSelect";
import { examLabel, seasonLabel, formatYearSeason } from "@/lib/utils";
import { questionPagePath } from "@/lib/seo/question-url";
import { LS_KEYS } from "@/lib/storage/keys";
import { extractRecentlyViewedIds } from "@/lib/search/recently-viewed";
import { MAX_EXPLICIT_POOL_IDS } from "@/lib/questions/explicit-pool";
import type {
  ExamCode,
  QuestionPart,
  Season,
  Session,
  Difficulty,
} from "@/lib/questions/types";

type SearchSort = "relevance" | "year_desc" | "category" | "random";

const EXAM_OPTIONS = ALL_QUIZ_EXAM_CODES;
const SEASON_OPTIONS: Season[] = ["spring", "autumn", "cbt", "published", "first", "second", "early", "may", "september", "january", "october", "late", "annual", "july", "primary", "kansai", "february", "june", "august", "march", "round1", "round2"];
const DIFFICULTY_OPTIONS: Difficulty[] = [1, 2, 3, 4, 5];
const DEBOUNCE_MS = 300;

interface SearchHit {
  id: string;
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  qNumber: number;
  officialQuestionLabel?: string;
  sourceEdition?: string;
  part?: QuestionPart;
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
  sort: SearchSort;
}

export interface SearchHistoryEntry {
  id: string;
  label: string;
  params: string; // serialized URLSearchParams
  savedAt: number;
}

export interface SavedSearch {
  id: string;
  label: string;
  params: string;
  savedAt: number;
}

const EMPTY_QUERY: ActiveQuery = {
  q: "",
  exam: "",
  year: "",
  season: "",
  category: "",
  difficulty: "",
  calculationOnly: false,
  sort: "relevance",
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
    sort: (sp.get("sort") as SearchSort) ?? "relevance",
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
  if (q.sort && q.sort !== "relevance") sp.set("sort", q.sort);
  return sp;
}

function hasAnyFilter(q: ActiveQuery): boolean {
  return Boolean(
    q.q.trim() || q.exam || q.year || q.season || q.category || q.difficulty || q.calculationOnly,
  );
}

function loadRecentlyViewedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(LS_KEYS.history) ?? "[]");
    return new Set(extractRecentlyViewedIds(raw));
  } catch {
    return new Set();
  }
}

// ─── Keyword highlight ───────────────────────────────────────────────────────

function HighlightedSnippet({ text, tokens }: { text: string; tokens: string[] }) {
  if (tokens.length === 0) return <span>{text}</span>;
  const pattern = new RegExp(
    `(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        tokens.some((t) => t.toLowerCase() === part.toLowerCase()) ? (
          <mark key={i} className="rounded bg-yellow-200/70 px-0.5 text-foreground dark:bg-yellow-500/30">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState<ActiveQuery>(EMPTY_QUERY);
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [resultQueryKey, setResultQueryKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<Set<string>>(new Set());
  const recentOnly = searchParams.get("recent") === "1";

  useEffect(() => {
    if (recentOnly) setRecentlyViewedIds(loadRecentlyViewedIds());
  }, [recentOnly]);

  // Sync query from URL params
  useEffect(() => {
    const q = readFromParams(new URLSearchParams(searchParams.toString()));
    setQuery(q);
    setInputText(q.q);
  }, [searchParams]);

  // Fetch results
  const fetchResults = useCallback(async (q: ActiveQuery, facetsOnly = false) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);
    const queryKey = toParams(q).toString();
    try {
      const sp = toParams(q);
      sp.set("limit", facetsOnly ? "1" : String(MAX_EXPLICIT_POOL_IDS));
      const res = await fetch(`/api/search/questions?${sp.toString()}`, {
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data: SearchResponse = await res.json();
      if (abortRef.current !== ctrl) return;
      setResult(data);
      setResultQueryKey(queryKey);
    } catch (err) {
      if (abortRef.current !== ctrl || (err as Error).name === "AbortError") return;
      setError("検索に失敗しました。もう一度「検索」を押してください。");
      setResult(null);
      setResultQueryKey(null);
    } finally {
      if (abortRef.current === ctrl) setLoading(false);
    }
  }, []);

  const showResults = hasAnyFilter(query) || recentOnly || query.sort !== "relevance";
  const loadFacetsOnly = filterOpen && !showResults;
  useEffect(() => {
    if (showResults || loadFacetsOnly) void fetchResults(query, loadFacetsOnly);
    return () => abortRef.current?.abort();
  }, [query, showResults, loadFacetsOnly, fetchResults]);

  const updateQuery = useCallback(
    (patch: Partial<ActiveQuery>) => {
      const next: ActiveQuery = { ...query, ...patch };
      const sp = toParams(next);
      if (recentOnly) sp.set("recent", "1");
      const qs = sp.toString();
      router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
    },
    [query, recentOnly, router],
  );

  // Debounce text input → URL update
  useEffect(() => {
    if (inputText === query.q) return;
    const timer = setTimeout(() => {
      updateQuery({ q: inputText });
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [inputText, query.q, updateQuery]);

  const clearAll = useCallback(() => {
    setInputText("");
    router.replace("/search", { scroll: false });
  }, [router]);

  const tokens = useMemo(
    () => query.q.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [query.q],
  );

  const currentQueryKey = toParams(query).toString();
  const resultIsCurrent = resultQueryKey === currentQueryKey;
  const filteredHits = useMemo(() => {
    if (!result || !resultIsCurrent) return null;
    if (!recentOnly) return result;
    const filtered = result.hits.filter((h) => recentlyViewedIds.has(h.id));
    return { ...result, hits: filtered, total: filtered.length };
  }, [result, resultIsCurrent, recentOnly, recentlyViewedIds]);

  return (
    <div className="space-y-4">
      {/* Search Form (full-width on every viewport) */}
      <SearchForm
        inputText={inputText}
        onInputChange={setInputText}
        onSubmit={() => { if (inputText !== query.q) updateQuery({ q: inputText }); else if (showResults) void fetchResults(query); }}
        onClear={clearAll}
      />

      <details className="rounded-xl border border-border px-3" onToggle={(event) => setFilterOpen(event.currentTarget.open)}>
        <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">絞り込み</summary>
        <FacetPanel facets={result?.facets} query={query} onChange={updateQuery} />
      </details>
      {showResults && <ResultsPanel loading={loading || (!resultIsCurrent && !error)} error={error} result={filteredHits} tokens={tokens} />}
    </div>
  );
}

// ─── SearchForm ───────────────────────────────────────────────────────────────

interface SearchFormProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

function SearchForm({ inputText, onInputChange, onSubmit, onClear }: SearchFormProps) {
  return (
    <form
      role="search"
      aria-label="問題検索"
      className="rounded-2xl border border-border bg-card p-4 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="search-input" className="sr-only">キーワード</label>
      <div className="flex items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <SearchIcon
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="search-input"
            type="search"
            inputMode="search"
            placeholder="キーワード"
            className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-12 text-base text-foreground sm:text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 sm:h-12 [&::-webkit-search-cancel-button]:appearance-none"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            enterKeyHint="search"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" size="md" className="flex-1 sm:flex-none min-h-11 min-w-11 h-auto whitespace-normal py-2.5">
            検索
          </Button>
          <Button type="button" variant="ghost" size="sm" className="min-h-11 min-w-11 h-auto whitespace-normal py-2.5" onClick={onClear} aria-label="すべての条件をクリア">クリア</Button>
        </div>
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
  const fieldClass = "mt-1 block min-h-11 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-base text-foreground sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const exams = EXAM_OPTIONS.filter(code => (facets?.exam[code] ?? 0) > 0 || query.exam === code || !facets)
    .map(code => ({ key: code, name: examLabel(code), count: facets?.exam[code] ?? 0 }));
  const fields = [
    {key: "year", label: "年度", options: Object.entries(facets?.year ?? {}).sort((a,b) => Number(b[0])-Number(a[0])).map(([v,n]) => [v, v+"年", n])},
    {key: "season", label: "実施回", options: SEASON_OPTIONS.filter(v => (facets?.season[v] ?? 0) > 0 || query.season === v).map(v => [v, seasonLabel(v), facets?.season[v] ?? 0])},
    {key: "category", label: "分野", options: Object.entries(facets?.category ?? {}).sort((a,b) => b[1]-a[1]).map(([v,n]) => [v,v,n])},
    {key: "difficulty", label: "難度", options: DIFFICULTY_OPTIONS.filter(v => (facets?.difficulty[String(v)] ?? 0) > 0 || query.difficulty === String(v)).map(v => [String(v), "★".repeat(v), facets?.difficulty[String(v)] ?? 0])},
  ] as const;
  return (
    <section aria-label="絞り込み" className="pb-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
        {(exams.length > 0 || query.exam) && <QualificationSelect items={exams} label="資格" emptyLabel="すべて" value={query.exam} onChange={value => onChange({ exam: EXAM_OPTIONS.find(code => code === value) ?? "" })} className="col-span-full min-w-0 text-xs font-medium text-muted-foreground" fieldClass={fieldClass} />}
        {fields.filter(field => field.options.length > 0 || query[field.key]).map(field => <label key={field.key} className="min-w-0 text-xs font-medium text-muted-foreground">
          {field.label}
          <select value={query[field.key]} onChange={e => onChange({[field.key]:e.target.value})} className={fieldClass}>
            <option value="">すべて</option>
            {query[field.key] && !field.options.some(([v]) => v === query[field.key]) && <option value={query[field.key]}>{query[field.key]}</option>}
            {field.options.map(([value,label,count]) => <option key={String(value)} value={value}>{label} ({count})</option>)}
          </select>
        </label>)}
      </div>
    </section>
  );
}

// ─── ResultsPanel ─────────────────────────────────────────────────────────────

interface ResultsPanelProps {
  loading: boolean;
  error: string | null;
  result: SearchResponse | null;
  tokens: string[];
}

function ResultsPanel({ loading, error, result, tokens }: ResultsPanelProps) {
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
      {/* Announce only the concise result count to screen readers. The previous
          implementation made the whole <section> (including the <ul> of up to
          ~20 hits) a live region, so each debounced keystroke re-read every
          result item — a verbose anti-pattern. A dedicated sr-only status keeps
          the count announcement without re-reading the entire list. */}
      <p role="status" aria-live="polite" className="sr-only">
        {result.total.toLocaleString("ja-JP")} 件の検索結果が見つかりました。
      </p>
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-foreground">
          検索結果
          <span className="ml-2 text-muted-foreground">
            {result.total.toLocaleString("ja-JP")} 件
          </span>
        </h2>
        {loading && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground" aria-live="polite">
            <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
            更新中
          </span>
        )}
      </div>

      <ul className="space-y-2">
        {result.hits.map((hit) => (
          <li key={hit.id}>
            <ResultItem hit={hit} tokens={tokens} />
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

function ResultItem({ hit, tokens }: { hit: SearchHit; tokens: string[] }) {
  const href = questionPagePath(hit);
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="soft" className="text-[10px]">
              {examLabel(hit.exam)}
            </Badge>
            <span className="text-[11px] font-medium text-muted-foreground">
              {hit.sourceEdition ?? formatYearSeason(hit.year, hit.season)} {hit.officialQuestionLabel ?? `問${hit.qNumber}`}
            </span>
            <span className="text-[10px] text-muted-foreground">★{hit.difficulty}</span>
          </div>
          <p className="mt-2 text-sm text-foreground line-clamp-2">
            <HighlightedSnippet text={hit.snippet} tokens={tokens} />
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
