"use client";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BookmarkPlus,
  BookmarkCheck,
  Clock,
  History,
  Loader2,
  Play,
  Search as SearchIcon,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, examLabel, seasonLabel, formatYearSeason } from "@/lib/utils";
import { questionPagePath } from "@/lib/seo/question-url";
import { LS_KEYS } from "@/lib/storage/keys";
import { buildSearchPracticeUrl } from "@/lib/search/practice-url";
import { extractRecentlyViewedIds } from "@/lib/search/recently-viewed";
import {
  encodeExplicitPoolIds,
  MAX_EXPLICIT_POOL_IDS,
} from "@/lib/questions/explicit-pool";
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
const SORT_OPTIONS: { value: SearchSort; label: string }[] = [
  { value: "relevance", label: "関連度順" },
  { value: "year_desc", label: "年度新しい順" },
  { value: "category", label: "分野順" },
  { value: "random", label: "ランダム" },
];
const MAX_HISTORY = 15;
const MAX_SAVED = 20;
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

function queryLabel(q: ActiveQuery): string {
  const parts: string[] = [];
  if (q.q.trim()) parts.push(`"${q.q.trim()}"`);
  if (q.exam) parts.push(examLabel(q.exam));
  if (q.year) parts.push(`${q.year}年`);
  if (q.season) parts.push(seasonLabel(q.season));
  if (q.category) parts.push(q.category);
  if (q.difficulty) parts.push(`★${q.difficulty}`);
  if (q.calculationOnly) parts.push("計算問題");
  return parts.join(" · ") || "条件なし";
}

function loadSearchHistory(): SearchHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEYS.searchHistory) ?? "[]");
  } catch {
    return [];
  }
}

function saveSearchHistory(entries: SearchHistoryEntry[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEYS.searchHistory, JSON.stringify(entries));
}

function loadSavedSearches(): SavedSearch[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEYS.savedSearches) ?? "[]");
  } catch {
    return [];
  }
}

function saveSavedSearches(entries: SavedSearch[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEYS.savedSearches, JSON.stringify(entries));
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

  // History & saved searches — client-only state
  const [searchHistory, setSearchHistoryState] = useState<SearchHistoryEntry[]>([]);
  const [savedSearches, setSavedSearchesState] = useState<SavedSearch[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<Set<string>>(new Set());
  const [showHistory, setShowHistory] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [recentOnly, setRecentOnly] = useState(false);

  useEffect(() => {
    setSearchHistoryState(loadSearchHistory());
    setSavedSearchesState(loadSavedSearches());
    setRecentlyViewedIds(loadRecentlyViewedIds());
  }, []);

  // Sync query from URL params
  useEffect(() => {
    const q = readFromParams(new URLSearchParams(searchParams.toString()));
    setQuery(q);
    setInputText(q.q);
    setRecentOnly(searchParams.get("recent") === "1");
  }, [searchParams]);

  // Fetch results
  const fetchResults = useCallback(async (q: ActiveQuery) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);
    const queryKey = toParams(q).toString();
    try {
      const sp = toParams(q);
      sp.set("limit", String(MAX_EXPLICIT_POOL_IDS));
      const res = await fetch(`/api/search/questions?${sp.toString()}`, {
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data: SearchResponse = await res.json();
      if (abortRef.current !== ctrl) return;
      setResult(data);
      setResultQueryKey(queryKey);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError("検索に失敗しました。時間をおいて再度お試しください。");
      setResult(null);
      setResultQueryKey(null);
    } finally {
      if (abortRef.current === ctrl) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults]);

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

  // Persist successful searches to history
  useEffect(() => {
    if (!result || result.total === 0 || !hasAnyFilter(query)) return;
    const paramsStr = toParams(query).toString();
    const label = queryLabel(query);
    setSearchHistoryState((prev) => {
      const deduped = prev.filter((e) => e.params !== paramsStr);
      const next: SearchHistoryEntry[] = [
        { id: Date.now().toString(), label, params: paramsStr, savedAt: Date.now() },
        ...deduped,
      ].slice(0, MAX_HISTORY);
      saveSearchHistory(next);
      return next;
    });
  }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

  const clearAll = useCallback(() => {
    router.replace("/search", { scroll: false });
  }, [router]);

  const applyHistoryEntry = useCallback(
    (params: string) => {
      router.replace(params ? `/search?${params}` : "/search", { scroll: false });
      setShowHistory(false);
      setShowSaved(false);
    },
    [router],
  );

  const deleteHistoryEntry = useCallback((id: string) => {
    setSearchHistoryState((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveSearchHistory(next);
      return next;
    });
  }, []);

  const toggleSaveSearch = useCallback(() => {
    const paramsStr = toParams(query).toString();
    const existing = savedSearches.find((s) => s.params === paramsStr);
    if (existing) {
      setSavedSearchesState((prev) => {
        const next = prev.filter((s) => s.id !== existing.id);
        saveSavedSearches(next);
        return next;
      });
    } else {
      const entry: SavedSearch = {
        id: Date.now().toString(),
        label: queryLabel(query),
        params: paramsStr,
        savedAt: Date.now(),
      };
      setSavedSearchesState((prev) => {
        const next = [entry, ...prev].slice(0, MAX_SAVED);
        saveSavedSearches(next);
        return next;
      });
    }
  }, [query, savedSearches]);

  const deleteSavedSearch = useCallback((id: string) => {
    setSavedSearchesState((prev) => {
      const next = prev.filter((s) => s.id !== id);
      saveSavedSearches(next);
      return next;
    });
  }, []);

  const toggleRecentOnly = useCallback(() => {
    const params = toParams(query);
    if (!recentOnly) params.set("recent", "1");
    const qs = params.toString();
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
  }, [query, recentOnly, router]);

  const currentParamsStr = toParams(query).toString();
  const isCurrentSaved = savedSearches.some((s) => s.params === currentParamsStr);
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

  const practiceHits = useMemo(() => {
    const hits = filteredHits?.hits ?? [];
    const encoded = encodeExplicitPoolIds(hits.map((hit) => hit.id));
    if (!encoded) return [];
    const included = new Set(encoded.split(","));
    return hits.filter((hit) => included.has(hit.id));
  }, [filteredHits]);
  const practiceUrl = useMemo(
    () => {
      const params = toParams(query);
      if (recentOnly) params.set("recent", "1");
      return buildSearchPracticeUrl(params.toString(), practiceHits);
    },
    [query, practiceHits, recentOnly],
  );

  return (
    <div className="space-y-4">
      {/* Search Form (full-width on every viewport) */}
      <SearchForm
        inputText={inputText}
        query={query}
        onInputChange={setInputText}
        onSubmit={() => updateQuery({ q: inputText })}
        onFilterChange={updateQuery}
      />

      {/* History & Saved quick access */}
      <HistoryBar
        history={searchHistory}
        saved={savedSearches}
        showHistory={showHistory}
        showSaved={showSaved}
        onToggleHistory={() => { setShowHistory((v) => !v); setShowSaved(false); }}
        onToggleSaved={() => { setShowSaved((v) => !v); setShowHistory(false); }}
        onApply={applyHistoryEntry}
        onDeleteHistory={deleteHistoryEntry}
        onDeleteSaved={deleteSavedSearch}
      />

      {/* PC: facet panel sits in a left rail (≈18rem) while the right */}
      {/* column carries toolbar + results; mobile keeps the prior stacked */}
      {/* layout so the chip row never competes with vertical real-estate. */}
      <div className="md:grid md:grid-cols-[14rem_minmax(0,1fr)] md:gap-6 md:items-start">
        <div className="md:sticky md:top-20">
          <FacetPanel
            facets={result?.facets}
            query={query}
            onChange={updateQuery}
            onClear={clearAll}
          />
        </div>
        <div className="mt-4 md:mt-0">
          <SearchToolbar
            isCurrentSaved={isCurrentSaved}
            onToggleSave={toggleSaveSearch}
            recentOnly={recentOnly}
            onToggleRecentOnly={toggleRecentOnly}
            hasRecentlyViewed={recentlyViewedIds.size > 0}
            sort={query.sort}
            onSortChange={(sort) => updateQuery({ sort })}
            practiceUrl={practiceUrl}
            practiceCount={practiceHits.length}
            searchTotal={filteredHits?.total ?? 0}
            loading={loading || !resultIsCurrent}
          />
          <div className="mt-4">
            <ResultsPanel
              loading={loading}
              error={error}
              result={filteredHits}
              tokens={tokens}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SearchForm ───────────────────────────────────────────────────────────────

interface SearchFormProps {
  inputText: string;
  query: ActiveQuery;
  onInputChange: (text: string) => void;
  onSubmit: () => void;
  onFilterChange: (patch: Partial<ActiveQuery>) => void;
}

function SearchForm({ inputText, query, onInputChange, onSubmit, onFilterChange }: SearchFormProps) {
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
            placeholder="例) TCP/IP、正規化、SQLインジェクション"
            className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 sm:h-12"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            enterKeyHint="search"
          />
          {inputText && (
            <button
              type="button"
              aria-label="入力をクリア"
              className="absolute right-0 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted"
              onClick={() => onInputChange("")}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" size="md" className="flex-1 sm:flex-none min-h-11 min-w-11 h-auto whitespace-normal py-2.5">
            検索
          </Button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={query.calculationOnly}
            onChange={(e) => onFilterChange({ calculationOnly: e.target.checked })}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          計算問題のみ
        </label>
      </div>
    </form>
  );
}

// ─── HistoryBar ───────────────────────────────────────────────────────────────

interface HistoryBarProps {
  history: SearchHistoryEntry[];
  saved: SavedSearch[];
  showHistory: boolean;
  showSaved: boolean;
  onToggleHistory: () => void;
  onToggleSaved: () => void;
  onApply: (params: string) => void;
  onDeleteHistory: (id: string) => void;
  onDeleteSaved: (id: string) => void;
}

function HistoryBar({
  history, saved, showHistory, showSaved,
  onToggleHistory, onToggleSaved, onApply, onDeleteHistory, onDeleteSaved,
}: HistoryBarProps) {
  if (history.length === 0 && saved.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {history.length > 0 && (
          <button
            type="button"
            onClick={onToggleHistory}
            aria-expanded={showHistory}
            className={cn(
              "inline-flex min-h-11 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs transition-colors",
              showHistory
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted",
            )}
          >
            <History className="h-3 w-3" aria-hidden="true" />
            履歴 ({history.length}件)
          </button>
        )}
        {saved.length > 0 && (
          <button
            type="button"
            onClick={onToggleSaved}
            aria-expanded={showSaved}
            className={cn(
              "inline-flex min-h-11 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs transition-colors",
              showSaved
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted",
            )}
          >
            <Star className="h-3 w-3" aria-hidden="true" />
            保存済み ({saved.length})
          </button>
        )}
      </div>

      {showHistory && (
        <HistoryList items={history} onApply={onApply} onDelete={onDeleteHistory} />
      )}
      {showSaved && (
        <HistoryList items={saved} onApply={onApply} onDelete={onDeleteSaved} />
      )}
    </div>
  );
}

function HistoryList({
  items,
  onApply,
  onDelete,
}: {
  items: (SearchHistoryEntry | SavedSearch)[];
  onApply: (params: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      role="list"
      aria-label="検索条件一覧"
      className="rounded-xl border border-border bg-card/80 p-2 shadow-sm"
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="listitem"
          className="group flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted"
        >
          <button
            type="button"
            className="min-h-11 min-w-0 flex-1 break-words text-left text-sm text-foreground"
            onClick={() => onApply(item.params)}
          >
            {item.label}
          </button>
          <button
            type="button"
            aria-label={`${item.label}を削除`}
            onClick={() => onDelete(item.id)}
            className="grid min-h-11 min-w-11 shrink-0 place-items-center rounded text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Trash2 className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── SearchToolbar ────────────────────────────────────────────────────────────

interface SearchToolbarProps {
  isCurrentSaved: boolean;
  onToggleSave: () => void;
  recentOnly: boolean;
  onToggleRecentOnly: () => void;
  hasRecentlyViewed: boolean;
  sort: SearchSort;
  onSortChange: (s: SearchSort) => void;
  practiceUrl: string;
  practiceCount: number;
  searchTotal: number;
  loading: boolean;
}

function SearchToolbar({
  isCurrentSaved, onToggleSave,
  recentOnly, onToggleRecentOnly, hasRecentlyViewed,
  sort, onSortChange,
  practiceUrl, practiceCount, searchTotal, loading,
}: SearchToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Save current search */}
      <button
        type="button"
        aria-pressed={isCurrentSaved}
        aria-label={isCurrentSaved ? "検索条件の保存を解除" : "この検索条件を保存"}
        onClick={onToggleSave}
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs transition-colors",
          isCurrentSaved
            ? "border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-500 dark:bg-amber-950/30 dark:text-amber-400"
            : "border-border bg-background text-muted-foreground hover:border-amber-400/60 hover:bg-muted",
        )}
      >
        {isCurrentSaved ? (
          <BookmarkCheck className="h-3 w-3" aria-hidden="true" />
        ) : (
          <BookmarkPlus className="h-3 w-3" aria-hidden="true" />
        )}
        {isCurrentSaved ? "条件保存済み" : "この検索条件を保存"}
      </button>

      {/* Recently viewed filter */}
      {hasRecentlyViewed && (
        <button
          type="button"
          aria-pressed={recentOnly}
          onClick={onToggleRecentOnly}
          className={cn(
            "inline-flex min-h-11 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs transition-colors",
            recentOnly
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted",
          )}
        >
          <Clock className="h-3 w-3" aria-hidden="true" />
          最近見た問題のみ
        </button>
      )}

      {/* Sort selector */}
      <label className="sr-only" htmlFor="sort-select">並び順</label>
      <select
        id="sort-select"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SearchSort)}
        className="min-h-11 rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* Practice mode CTA */}
      {practiceCount > 0 && !loading && (
        <Link
          href={practiceUrl}
          className="ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-primary bg-primary px-3 py-1 text-xs text-primary-foreground transition-opacity hover:opacity-90"
          aria-label={`${practiceCount.toLocaleString("ja-JP")}件の検索結果を連続演習する${searchTotal > practiceCount ? `（全${searchTotal.toLocaleString("ja-JP")}件中）` : ""}`}
        >
          <Play className="h-3 w-3 fill-current" aria-hidden="true" />
          {loading ? "..." : `${practiceCount.toLocaleString("ja-JP")}件を演習`}
        </Link>
      )}
    </div>
  );
}

// ─── FacetPanel ───────────────────────────────────────────────────────────────

interface FacetPanelProps {
  facets: FacetCounts | undefined;
  query: ActiveQuery;
  onChange: (patch: Partial<ActiveQuery>) => void;
  onClear: () => void;
}

function FacetPanel({ facets, query, onChange, onClear }: FacetPanelProps) {
  const fields = [
    {key: "exam", label: "資格", options: EXAM_OPTIONS.filter(code => (facets?.exam[code] ?? 0) > 0 || query.exam === code).map(code => [code, examLabel(code), facets?.exam[code] ?? 0])},
    {key: "year", label: "年度", options: Object.entries(facets?.year ?? {}).sort((a,b) => Number(b[0])-Number(a[0])).map(([v,n]) => [v, v+"年", n])},
    {key: "season", label: "実施回", options: SEASON_OPTIONS.filter(v => (facets?.season[v] ?? 0) > 0 || query.season === v).map(v => [v, seasonLabel(v), facets?.season[v] ?? 0])},
    {key: "category", label: "分野", options: Object.entries(facets?.category ?? {}).sort((a,b) => b[1]-a[1]).map(([v,n]) => [v,v,n])},
    {key: "difficulty", label: "難度", options: DIFFICULTY_OPTIONS.filter(v => (facets?.difficulty[String(v)] ?? 0) > 0 || query.difficulty === String(v)).map(v => [String(v), "★".repeat(v), facets?.difficulty[String(v)] ?? 0])},
  ] as const;
  return (
    <section aria-label="絞り込み" className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-2"><h2 className="text-sm font-semibold">絞り込み</h2><Button className="min-h-11 min-w-11 h-auto whitespace-normal py-2.5" type="button" variant="ghost" size="sm" onClick={onClear} aria-label="すべての条件をクリア">クリア</Button></div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
        {fields.map(field => <label key={field.key} className="min-w-0 text-xs font-medium text-muted-foreground">
          {field.label}
          <select value={query[field.key]} onChange={e => onChange({[field.key]:e.target.value})} className="mt-1 block min-h-11 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
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
