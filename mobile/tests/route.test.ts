import { expect, it } from "vitest";
import { GET, runtime } from "../../app/api/mobile/packs/route";

it("accepts the Next.js route boundary without treating route context as a catalog", async () => {
  expect(runtime).toBe("nodejs");
  const response = await GET(new Request("https://example.test/api/mobile/packs?pack=ip&since=1"));
  expect(response.status).toBe(204);
  expect(await response.text()).toBe("");
});
