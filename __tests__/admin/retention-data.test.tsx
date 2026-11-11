// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Page from "@/app/admin/retention/page";
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
it.each(["missing", "failed", "empty"])("does not display a demo cohort for %s data", async state => {
  vi.stubEnv("POSTHOG_API_KEY", state === "missing" ? "" : "fixture");
  vi.stubEnv("POSTHOG_PROJECT_ID", "fixture");
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ result: [] }, { status: state === "failed" ? 500 : 200 })));
  const html = renderToStaticMarkup(await Page());
  expect(html).not.toContain("デモデータ"); expect(html).not.toContain("31.0%"); expect(html).toContain("—");
  expect(html).toContain(state === "empty" ? "コホート記録はありません" : "継続率は未取得");
});
