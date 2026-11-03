import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import YearModePage, { generateMetadata as yearMetadata } from "@/app/modes/year/page";
import TopicModePage, { generateMetadata as topicMetadata } from "@/app/modes/topic/page";
import StreamQuizPage from "@/app/quiz/stream/page";
import { examLabel } from "@/lib/utils";
import { EXAM_CONFIGS } from "@/lib/exam-config";

vi.mock("next/dynamic", () => ({ default: () => () => null }));
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/quiz/stream",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

describe("next166 selected qualification at actual mode pages", () => {
  for (const exam of ["maritime3", "land-special2", "land-special3"] as const) {
    for (const [name, page] of [["year", YearModePage], ["topic", TopicModePage], ["stream", StreamQuizPage]] as const) {
      it(`${exam} keeps its heading and navigation on ${name}`, async () => {
        for (const session of ["houki", "kogaku"]) {
          const html = renderToStaticMarkup(await page({ searchParams: Promise.resolve({ exam, session }) }));
          const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]*>/g, "");
          expect(heading).toContain(name === "stream" ? EXAM_CONFIGS[exam].nameFull : examLabel(exam));
          expect(html).toContain(`exam=${exam}`);
          expect(heading).not.toContain("応用情報");
          if (name !== "stream") expect(html).toContain(`href="/${exam}"`);
        }
      });
    }
    it(`${exam} keeps the selected qualification in mode metadata`, async () => {
      for (const [mode, metadata] of [["year", yearMetadata], ["topic", topicMetadata]] as const) {
        const value = await metadata({ searchParams: Promise.resolve({ exam }) });
        expect(value.title).toContain(examLabel(exam));
        expect(value.alternates?.canonical).toBe(`/modes/${mode}?exam=${exam}`);
      }
    });
  }
});
