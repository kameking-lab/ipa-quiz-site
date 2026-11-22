import { SITE_BASE_URL } from "@/lib/seo/config";

export type ShareKind = "card" | "question";

export function shareLink(path: string, kind: ShareKind): URL {
  const url = new URL(path, SITE_BASE_URL);
  url.searchParams.set("utm_source", "share");
  url.searchParams.set("utm_medium", kind);
  return url;
}

export function questionShareTitle(stem: string): string {
  const text = stem.replace(/\s+/g, " ").trim();
  const chars = Array.from(text);
  const lead = chars.length > 46 ? chars.slice(0, 45).join("") + "…" : text;
  return lead ? `${lead}｜答えと解説` : "答えと解説";
}

export function questionShareImage(title: string): string {
  return `${SITE_BASE_URL}/api/og?${new URLSearchParams({ type: "question", title, subtitle: "答えと解説" })}`;
}

export function libraryQuestionSharePath(paper: string, id: string): string {
  return `/e-learning/exams/${encodeURIComponent(paper)}?${new URLSearchParams({ question: id })}`;
}
