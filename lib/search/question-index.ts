import "server-only";

import type {
  ExamCode,
  Question,
  Season,
  Session,
  Difficulty,
} from "@/lib/questions/types";
import {
  getAllQuestionsLazy,
  getQuestionsForExam,
} from "@/lib/questions/get-questions";
import { isPlaceholderExplanation } from "@/lib/questions/filter";

export interface SearchQuery {
  q?: string;
  exam?: ExamCode;
  year?: number;
  season?: Season;
  session?: Session;
  category?: string;
  topicTag?: string;
  difficulty?: Difficulty;
  hasImage?: boolean;
  calculationOnly?: boolean;
  limit?: number;
  offset?: number;
}

export interface SearchHit {
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

export interface FacetCounts {
  exam: Record<string, number>;
  year: Record<string, number>;
  season: Record<string, number>;
  category: Record<string, number>;
  difficulty: Record<string, number>;
}

export interface SearchResponse {
  total: number;
  hits: SearchHit[];
  facets: FacetCounts;
  limit: number;
  offset: number;
}

const SNIPPET_LEN = 160;
const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 60;

function tokenize(input: string): string[] {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .filter((t) => t.length > 0)
    .map((t) => t.toLowerCase());
}

function makeSnippet(text: string, tokens: string[]): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (tokens.length === 0) return flat.slice(0, SNIPPET_LEN);
  const lower = flat.toLowerCase();
  let firstHit = -1;
  for (const t of tokens) {
    const i = lower.indexOf(t);
    if (i >= 0 && (firstHit === -1 || i < firstHit)) firstHit = i;
  }
  if (firstHit < 0) return flat.slice(0, SNIPPET_LEN);
  const start = Math.max(0, firstHit - 30);
  const end = Math.min(flat.length, start + SNIPPET_LEN);
  return (start > 0 ? "…" : "") + flat.slice(start, end) + (end < flat.length ? "…" : "");
}

function scoreQuestion(q: Question, tokens: string[]): number {
  if (tokens.length === 0) return 1;
  const haystackBody = (q.question + " " + (q.explanation ?? "")).toLowerCase();
  const haystackTags = (q.category + " " + q.topicTags.join(" ")).toLowerCase();
  let score = 0;
  for (const t of tokens) {
    const bodyHits = haystackBody.split(t).length - 1;
    const tagHits = haystackTags.split(t).length - 1;
    if (bodyHits === 0 && tagHits === 0) return 0;
    score += bodyHits + tagHits * 3;
  }
  return score;
}

const tableOrFigurePattern =
  /次の表|以下の表|下の表|表のように|表に示す|次の図|以下の図|下の図|図のように|図に示す|図中の|次の条件|以下の条件/;

function isUnrenderable(q: Question): boolean {
  return tableOrFigurePattern.test(q.question) && !q.hasImage;
}

function passesBaseFilters(q: Question): boolean {
  if (q.needsReview) return false;
  if (isUnrenderable(q)) return false;
  if (isPlaceholderExplanation(q)) return false;
  return true;
}

function passesFacets(q: Question, query: SearchQuery): boolean {
  if (query.exam && q.exam !== query.exam) return false;
  if (query.year && q.year !== query.year) return false;
  if (query.season && q.season !== query.season) return false;
  if (query.session && q.session !== query.session) return false;
  if (query.category && q.category !== query.category) return false;
  if (query.topicTag && !q.topicTags.includes(query.topicTag)) return false;
  if (query.difficulty && q.difficulty !== query.difficulty) return false;
  if (query.hasImage !== undefined && q.hasImage !== query.hasImage) return false;
  if (query.calculationOnly && q.isCalculation !== true) return false;
  return true;
}

async function loadPool(query: SearchQuery): Promise<Question[]> {
  if (query.exam) return getQuestionsForExam(query.exam);
  return getAllQuestionsLazy();
}

export async function searchQuestions(query: SearchQuery): Promise<SearchResponse> {
  const tokens = query.q ? tokenize(query.q) : [];
  const limit = Math.min(Math.max(1, query.limit ?? DEFAULT_LIMIT), MAX_LIMIT);
  const offset = Math.max(0, query.offset ?? 0);

  const pool = await loadPool(query);

  const facets: FacetCounts = {
    exam: {},
    year: {},
    season: {},
    category: {},
    difficulty: {},
  };

  type Scored = { q: Question; score: number };
  const matched: Scored[] = [];

  for (const q of pool) {
    if (!passesBaseFilters(q)) continue;
    if (!passesFacets(q, query)) continue;
    const score = scoreQuestion(q, tokens);
    if (score === 0) continue;
    matched.push({ q, score });
    facets.exam[q.exam] = (facets.exam[q.exam] ?? 0) + 1;
    facets.year[String(q.year)] = (facets.year[String(q.year)] ?? 0) + 1;
    facets.season[q.season] = (facets.season[q.season] ?? 0) + 1;
    facets.category[q.category] = (facets.category[q.category] ?? 0) + 1;
    facets.difficulty[String(q.difficulty)] =
      (facets.difficulty[String(q.difficulty)] ?? 0) + 1;
  }

  matched.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.q.year !== a.q.year) return b.q.year - a.q.year;
    return a.q.qNumber - b.q.qNumber;
  });

  const total = matched.length;
  const sliced = matched.slice(offset, offset + limit);
  const hits: SearchHit[] = sliced.map(({ q, score }) => ({
    id: q.id,
    exam: q.exam,
    year: q.year,
    season: q.season,
    session: q.session,
    qNumber: q.qNumber,
    category: q.category,
    topicTags: q.topicTags,
    difficulty: q.difficulty,
    snippet: makeSnippet(q.question, tokens),
    score,
  }));

  return { total, hits, facets, limit, offset };
}
