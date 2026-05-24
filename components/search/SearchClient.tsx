"use client";

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
import type {
  ExamCode,
  Season,
  Session,
  Difficulty,
} from "@/lib/questions/types";

type SearchSort = "relevance" | "year_desc" | "category" | "random";

const EXAM_OPTIONS: ExamCode[] = [
  "ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au",
];
const SEASON_OPTIONS: Season[] = ["spring", "autumn", "cbt"];
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

function buildPracticeUrl(q: ActiveQuery): string {
  const sp = new URLSearchParams();
  sp.set("mode", "random");
  if (q.exam) sp.set("exam", q.exam);
  if (q.year) sp.set("year", q.year);
  if (q.season) sp.set("season", q.season);
  if (q.category) sp.set("category", q.category);
  if (q.calculationOnly) sp.set("calc", "1");
  if (!q.exam) sp.set("exam", "ap");
  return `/quiz?${sp.toString()}`;
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
    const raw = JSON.parse(localStorage.getItem(LS_KEYS.history) ?? "[]");
    if (Array.isArray(raw)) {
      const ids = (raw as { id?: string }[])
        .map((e) => e?.id)
        .filter((id): id is string => typeof id === "string");
      return new Set(ids);
    }
    return new Set();
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
  }, [searchParams]);

  // Fetch results
  const fetchResults = useCallback(async (q: ActiveQuery) => {
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
      if (!res.ok) throw new Error(`status ${res.status}`);
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

  const currentParamsStr = toParams(query).toString();
  const isCurrentSaved = savedSearches.some((s) => s.params === currentParamsStr);
  const tokens = useMemo(
    () => query.q.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [query.q],
  );

  const filteredHits = useMemo(() => {
    if (!result) return null;
    if (!recentOnly) return result;
    const filtered = result.hits.filter((h) => recentlyViewedIds.has(h.id));
    return { ...result, hits: filtered, total: filtered.length };
  }, [result, recentOnly, recentlyViewedIds]);

  const practiceUrl = useMemo(() => buildPracticeUrl(query), [query]);
  const hasFacetForPractice = Boolean(query.exam || query.year || query.season || query.category);

  return (
    <div className="space-y-4">
      {/* Search Form (full-width on every viewport) */}
      <SearchForm
        inputText={inputText}
        query={query}
        onInputChange={setInputText}
        onSubmit={() => updateQuery({ q: inputText })}
        onClear={clearAll}
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
      <div className="md:grid md:grid-cols-[18rem_minmax(0,1fr)] md:gap-6 md:items-start">
        <div className="md:sticky md:top-4">
          <FacetPanel
            facets={result?.facets}
            query={query}
            onChange={updateQuery}
          />
        </div>
        <div className="mt-4 md:mt-0">
          <SearchToolbar
            isCurrentSaved={isCurrentSaved}
            onToggleSave={toggleSaveSearch}
            recentOnly={recentOnly}
            onToggleRecentOnly={() => setRecentOnly((v) => !v)}
            hasRecentlyViewed={recentlyViewedIds.size > 0}
            sort={query.sort}
            onSortChange={(sort) => updateQuery({ sort })}
            hasFacetForPractice={hasFacetForPractice}
            practiceUrl={practiceUrl}
            total={filteredHits?.total ?? 0}
            loading={loading}
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
  onClear: () => void;
  onFilterChange: (patch: Partial<ActiveQuery>) => void;
}

function SearchForm({ inputText, query, onInputChange, onSubmit, onClear, onFilterChange }: SearchFormProps) {
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
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            enterKeyHint="search"
            aria-autocomplete="list"
          />
          {inputText && (
            <button
              type="button"
              aria-label="入力をクリア"
              className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted"
              onClick={() => onInputChange("")}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" size="md" className="flex-1 sm:flex-none">
            検索
          </Button>
          <Button type="button" variant="ghost" size="md" onClick={onClear} aria-label="すべての条件をクリア">
            クリア
          </Button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
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
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
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
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
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
            className="min-w-0 flex-1 truncate text-left text-xs text-foreground"
            onClick={() => onApply(item.params)}
          >
            {item.label}
          </button>
          <button
            type="button"
            aria-label="削除"
            onClick={() => onDelete(item.id)}
            className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
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
  hasFacetForPractice: boolean;
  practiceUrl: string;
  total: number;
  loading: boolean;
}

function SearchToolbar({
  isCurrentSaved, onToggleSave,
  recentOnly, onToggleRecentOnly, hasRecentlyViewed,
  sort, onSortChange,
  hasFacetForPractice, practiceUrl,
  total, loading,
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
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
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
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
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
        className="h-7 rounded-full border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* Practice mode CTA */}
      {total > 0 && hasFacetForPractice && (
        <Link
          href={practiceUrl}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-primary bg-primary px-3 py-1 text-xs text-primary-foreground transition-opacity hover:opacity-90"
          aria-label={`${total.toLocaleString("ja-JP")}件の問題を連続演習する`}
        >
          <Play className="h-3 w-3 fill-current" aria-hidden="true" />
          {loading ? "..." : `${total.toLocaleString("ja-JP")}件を演習`}
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
}

function FacetPanel({ facets, query, onChange }: FacetPanelProps) {
  const examEntries = useMemo(
    () =>
      EXAM_OPTIONS.map((code) => ({ code, count: facets?.exam[code] ?? 0 })).filter(
        (e) => e.count > 0 || query.exam === e.code,
      ),
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
      })).filter(
        (e) => e.count > 0 || String(query.difficulty) === String(e.difficulty),
      ),
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
                onClick={() => onChange({ exam: query.exam === code ? "" : code })}
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
                onClick={() => onChange({ year: query.year === year ? "" : year })}
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
                onClick={() => onChange({ season: query.season === season ? "" : season })}
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
                  onChange({ category: query.category === category ? "" : category })
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
                      String(query.difficulty) === String(difficulty) ? "" : String(difficulty),
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

function FacetGroup({ label, children }: { label: string; children: React.ReactNode }) {
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
  active, onClick, label, count,
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
    <section aria-label="検索結果" aria-live="polite" className="space-y-3">
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
