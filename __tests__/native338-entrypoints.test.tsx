import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { NativeBReview } from "@/app/review/NativeBReview";
import { nativeBQuestion } from "@/__tests__/fixtures/native-b-question";
import { createHistoryStore } from "@/lib/storage/history";
import { GET as searchGet } from "@/app/api/search/questions/route";
import { POST as duePost } from "@/app/api/review/due/route";
import YearModePage from "@/app/modes/year/page";
import TopicModePage from "@/app/modes/topic/page";
import StreamQuizPage from "@/app/quiz/stream/page";
import QuestionPage from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import { RIKU_TECH1_QUESTIONS } from "@/data/questions/riku-tech1";
import { MARITIME4_QUESTIONS } from "@/data/questions/maritime4";
import { questionPagePath } from "@/lib/seo/question-url";

vi.mock("next/dynamic", () => ({ default: () => () => null }));
vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams(), usePathname: () => "/quiz/stream", useRouter: () => ({ push: vi.fn(), replace: vi.fn() }), notFound: () => { throw new Error("NOT_FOUND"); } }));
vi.mock("@/lib/posthog", () => ({ posthogCapture: vi.fn() }));
beforeEach(() => localStorage.clear());

describe("native338 actual entry points", () => {
  it("serves the selected qualification in year/topic/stream instead of AP", async () => {
    for (const exam of ["riku-tech1","maritime4","land-special1"]) {
      const args = { searchParams: Promise.resolve({ exam }) };
      for (const page of [YearModePage, TopicModePage, StreamQuizPage]) {
        const html = renderToStaticMarkup(await page(args));
        expect(html).toContain(`exam=${exam}`);
        expect(html).not.toContain("応用情報技術者試験");
      }
    }
  });

  it("accepts new exam/subject/month filters in the real search API", async () => {
    const cases = [
      ["riku-tech1","july","kiso",25],
      ["riku-tech1","january","kogaku-a",25],
      ["riku-tech1","july","kogaku-b",25],
      ["maritime4","august","houki",20],
      ["maritime4","february","kogaku",18],
      ["land-special1","june","kogaku",24],
    ] as const;
    for (const [exam,season,session,total] of cases) {
      const response = await searchGet(new Request(`http://localhost/api/search/questions?exam=${exam}&season=${season}&session=${session}&limit=60`));
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.total).toBe(total);
      expect(data.hits.every((q: { exam: string }) => q.exam === exam)).toBe(true);
    }
  });

  it("mounts five independent inputs on a real native /q page", async () => {
    const q = RIKU_TECH1_QUESTIONS.find(q => q.type === "native-b")!;
    const [, , exam,yearSeason,section,qnum] = questionPagePath(q).split("/");
    const html = renderToStaticMarkup(await QuestionPage({ params:Promise.resolve({ exam:exam!, yearSeason:yearSeason!, section:section!, qnum:qnum! }) }));
    expect(html).toContain("五つの空欄の回答");
    expect((html.match(/<select /g) ?? []).length).toBe(5);
    expect(html).toContain("回答を採点する");
  });

  it("keeps every ready B original in its due review queue", async () => {
    const questions = [...RIKU_TECH1_QUESTIONS,...MARITIME4_QUESTIONS].filter(q => q.nativeB);
    const response = await duePost(new Request("http://localhost/api/review/due", { method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ historyIds:questions.map(q => q.id), reviewStore:{}, today:"2026-10-15" }) }));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.questions).toHaveLength(62);
    expect(new Set(body.questions.map((q: {id:string}) => q.id))).toEqual(new Set(questions.map(q => q.id)));
  });

  it("grades four filled review slots, records once, then advances with the actual result", () => {
    const q = nativeBQuestion();
    const next = vi.fn();
    render(<NativeBReview question={q} onNext={next} />);
    const inputs = screen.getAllByRole("combobox");
    q.nativeB!.slots.slice(0,4).forEach((slot,i) => fireEvent.change(inputs[i]!,{target:{value:slot.answer}}));
    fireEvent.click(screen.getByRole("button",{name:"回答を採点する"}));
    expect(screen.getByRole("status").textContent).toContain("正答枠数 4/5");
    expect(next).not.toHaveBeenCalled();
    const entries = createHistoryStore().getAllEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0]?.nativeBResult?.correctSlots).toBe(4);
    expect(entries[0]?.correct).toBe(false);
    fireEvent.click(screen.getByRole("button",{name:"次の問題へ"}));
    expect(next).toHaveBeenCalledExactlyOnceWith(false);
  });
});
