import { expect, it } from "vitest";
import { learningAssetUrls } from "@/lib/learning-assets";
it("keeps citation images external while caching actual local figures and retaining inline bytes", () => {
  const citation = "https://source.example.test/reference.jpg";
  const content = { imageUrls: ["/images/figure.png", "data:image/png;base64,c3ludGhldGlj"], officialReferenceUrls: [citation] };
  expect(learningAssetUrls(content)).toEqual(["https://www.kakomon-ai.jp/images/figure.png"]);
  expect(content.imageUrls[1]).toBe("data:image/png;base64,c3ludGhldGlj");
  expect(() => learningAssetUrls({ imageUrls: [citation] })).toThrow("外部画像は保存できません");
});
