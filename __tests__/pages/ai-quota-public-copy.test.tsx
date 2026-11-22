import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import { AI_QUOTA_COPY } from "@/lib/constants/ai-quota";
import About, { revalidate as aboutCache } from "@/app/about/page";
import Faq, { revalidate as faqCache } from "@/app/faq/page";
import Why, { revalidate as whyCache } from "@/app/why-kakomon-ai/page";
import Terms, { revalidate as termsCache } from "@/app/billing/terms/page";

afterEach(() => vi.unstubAllEnvs());

it.each([
  ["運営情報", About, aboutCache],
  ["よくある質問", Faq, faqCache],
  ["サイトの特徴", Why, whyCache],
  ["月額プランの条件", Terms, termsCache],
] as const)("%s renders the current server policy after a runtime switch", (_name, Page, revalidate) => {
  expect(revalidate).toBe(0);
  vi.stubEnv("AI_QUOTA_ROLLOUT", "true");
  expect(renderToStaticMarkup(<Page />)).toContain(AI_QUOTA_COPY);
  vi.stubEnv("AI_QUOTA_ROLLOUT", "false");
  expect(renderToStaticMarkup(<Page />)).not.toContain(AI_QUOTA_COPY);
});
