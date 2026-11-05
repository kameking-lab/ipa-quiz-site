import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import QualificationHubPage from "@/app/e-learning/exams/qualifications/[slug]/page";

afterEach(cleanup);
describe("qualification hubs after article retirement", () => {
  it.each(["rodo-eisei-consultant", "sagyo-kankyo-sokuteishi"])("%s keeps source notices and practice entries", async slug => {
    const { container } = render(await QualificationHubPage({ params: Promise.resolve({ slug }) }));
    expect(within(container).getByRole("heading", { name: "出典・日付・採点について" })).toBeInTheDocument();
    expect(container.querySelector('a[href^="/e-learning/exams/"]')).not.toBeNull();
    expect(container.querySelector('a[href*="tsugino-shikaku.jp/articles"], a[href^="https://note.com/"]')).toBeNull();
  });
});
