import { practiceQuestion } from "@/lib/billing/practice-question";

export const runtime = "nodejs";

export function POST(request: Request) {
  return practiceQuestion(request);
}
