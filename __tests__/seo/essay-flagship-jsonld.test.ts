import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { POST } from "@/app/api/generate-question/route";
import { getAllEssayQuestions } from "@/lib/essay/load";
import { renderMainSitemapXml } from "@/lib/seo/sitemap-xml";

const source = readFileSync(join(process.cwd(), "app/essay/page.tsx"), "utf8");

describe("independent essay removal from public discovery", () => {
  it("keeps only the official guide in the sitemap", () => {
    const xml = renderMainSitemapXml();
    expect(xml).toContain("/essay</loc>");
    for (const question of getAllEssayQuestions()) {
      expect(xml).not.toContain(`/essay/${question.exam}/${question.id}`);
    }
  });

  it("does not advertise independent questions in metadata or the hub", () => {
    expect(source).toContain("https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html");
    expect(source).not.toContain("getAllEssayQuestions");
    expect(source).not.toContain("EssayEditor");
  });

  it("retires the similar-question generation API before any model call", async () => {
    const response = await POST();
    expect(response.status).toBe(410);
    await expect(response.json()).resolves.toMatchObject({
      error: "original_question_unavailable",
      href: "/search",
    });
  });
});
