import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ExamLibraryPage from "@/app/e-learning/exams/page";
import QualificationHubPage from "@/app/e-learning/exams/qualifications/[slug]/page";
import { qualificationHubForSelection, qualificationHubPath } from "@/lib/exam-qualification-hubs";
import type { ExamGroupId } from "@/lib/exam-library-model";

const guides: readonly [ExamGroupId, string, string][] = [
  ["cskohyo", "労働衛生関係法令", "n2de579238b62"],
  ["cskohyo", "電気安全", "nef1b585a3a81"],
  ["cskohyo", "化学安全", "nac697b4a463c"],
  ["cskohyo", "建築安全", "n07484a5c6ad4"],
  ["emkohyo", "有機溶剤", "n611c052c28e4"],
  ["emkohyo", "鉱物性粉じん", "n306ea7448af7"],
  ["emkohyo", "特定化学物質", "ndd4ad022c045"],
  ["emkohyo", "金属類", "ne7265e071a47"],
  ["emkohyo", "放射性物質", "n73e96a181f33"],
  ["emkohyo", "デザイン・サンプリング", "n19b0412a9477"],
  ["emkohyo", "分析に関する概論", "n4083bac24433"],
];

afterEach(cleanup);

describe("科目記事は旧URLのリダイレクト先で実際に読める", () => {
  it.each(guides)("%s / %s は恒久ハブ上に重複のない記事を表示する", async (group, subject, noteId) => {
    const hub = qualificationHubForSelection(group, subject)!;
    // ヘルパーの返り値だけでなく、利用者が訪れるページの redirect 契約を確認する。
    await expect(ExamLibraryPage({ searchParams: Promise.resolve({ group, subject }) }))
      .rejects.toMatchObject({ digest: expect.stringContaining(qualificationHubPath(hub.slug)) });

    const { container } = render(await QualificationHubPage({ params: Promise.resolve({ slug: hub.slug }) }));
    const heading = within(container).getByRole("heading", { name: `${subject}の解説記事`, level: 4 });
    const section = heading.closest("section")!;
    const links = within(section).getAllByRole("link");
    const urls = links.map((link) => link.getAttribute("href"));
    expect(urls).toContain(`https://note.com/anzen_ai_jp/n/${noteId}`);
    expect(new Set(urls).size).toBe(urls.length);
    const kinds = Array.from(section.querySelectorAll("li > span")).map((badge) => badge.textContent);
    if (kinds.includes("有料")) expect(kinds.lastIndexOf("無料")).toBeLessThan(kinds.indexOf("有料"));
    expect(links.every((link) => link.getAttribute("target") === "_blank")).toBe(true);
    expect(links.every((link) => link.getAttribute("rel")?.includes("noopener"))).toBe(true);
  });

  it("測定士の同名法令科目に衛生コンサルタントの記事を混ぜない", async () => {
    const { container } = render(await QualificationHubPage({ params: Promise.resolve({ slug: "sagyo-kankyo-sokuteishi" }) }));
    expect(container.querySelector('a[href="https://note.com/anzen_ai_jp/n/n2de579238b62"]')).toBeNull();
  });
});
