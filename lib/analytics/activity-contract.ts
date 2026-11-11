import { JOURNEY_EXAM_CODES } from "@/lib/billing/journey-exam-codes";
import { journeyPage, journeyQualification } from "@/lib/billing/journey-contract";

export const ACTIVITY_EVENTS = ["page_view", "quiz_started", "question_answered", "quiz_completed", "exam_library_answered", "exam_library_ai_query", "ai_query_sent", "practice_limit_viewed", "practice_free_limit_reached", "practice_upgrade_clicked", "essay_viewed", "blog_viewed", "blog_article_scrolled", "feedback_submitted", "contact_form_submitted", "book_click"] as const;
export type ActivityEventName = typeof ACTIVITY_EVENTS[number];
export const ACTIVITY_PAGES = ["home", "quiz", "question", "exam_library", "qualification", "pricing", "signin", "billing", "billing_success", "billing_cancel", "blog", "essay", "other"] as const;
export type ActivityPage = typeof ACTIVITY_PAGES[number];
export interface ActivityEvent { event: ActivityEventName; qualification: string; page: ActivityPage }
export interface ActivityRow extends ActivityEvent { day: string; count: number }
export interface ActivityData { available: boolean; rows: ActivityRow[] }

export function activityPage(pathname: string): ActivityPage {
  if (pathname.startsWith("/blog")) return "blog";
  if (/^\/essays?(\/|$)/.test(pathname)) return "essay";
  return journeyPage(pathname);
}

/** Only public allowlisted labels leave the browser; never URLs, IDs or user input. */
export function activityQualification(pathname: string, search: string, props?: Record<string, unknown>): string {
  const explicit = journeyQualification(props?.exam ?? props?.hubSlug ?? props?.qualification_slug);
  if (explicit !== "unknown") return explicit;
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "q") return journeyQualification(parts[1]);
  if (parts[0] === "e-learning" && parts[2] === "qualifications") return journeyQualification(parts[3]);
  if (["essay", "essays", "mock-exam", "recommended-books"].includes(parts[0])) return journeyQualification(parts[1]);
  if (parts[0] === "quiz") return journeyQualification(new URLSearchParams(search).get("exam"));
  return JOURNEY_EXAM_CODES.includes(parts[0] as typeof JOURNEY_EXAM_CODES[number]) ? parts[0] : "unknown";
}
