import { describe, expect, it } from "vitest";

import { topicTagToSlug, topicSlugToTag } from "@/lib/seo/topics";

/**
 * Characterization tests for the topic slug <-> tag conversion pair.
 * topicTagToSlug は topic-link-href.test.ts で踏まれるが、その逆変換
 * topicSlugToTag は未テストだった(部分カバレッジgap)。/topics/[slug] の
 * URL 復元に使われるため、空白区切りタグの round-trip と、ハイフンを含む
 * タグが非可逆になる現挙動を固定する。
 */
describe("topicSlugToTag", () => {
  it("converts hyphens back to spaces and trims", () => {
    expect(topicSlugToTag("TCP-IP")).toBe("TCP IP");
    expect(topicSlugToTag("-leading-and-trailing-")).toBe("leading and trailing");
  });

  it("percent-decodes the slug (日本語タグの復元)", () => {
    const encoded = encodeURIComponent("ネットワーク");
    expect(topicSlugToTag(encoded)).toBe("ネットワーク");
  });

  it("round-trips a space-separated tag through tag→slug→tag", () => {
    for (const tag of ["データベース", "TCP IP", "オブジェクト 指向"]) {
      expect(topicSlugToTag(topicTagToSlug(tag))).toBe(tag);
    }
  });

  it("is lossy for tags that already contain a hyphen (現挙動: ハイフン→空白)", () => {
    // topicTagToSlug は空白のみ正規化しハイフンは保持するため、
    // 逆変換でハイフンが空白へ潰れて元のタグには戻らない。
    const slug = topicTagToSlug("TCP-IP"); // "TCP-IP"（ハイフン保持）
    expect(slug).toBe("TCP-IP");
    expect(topicSlugToTag(slug)).toBe("TCP IP"); // 元の "TCP-IP" には戻らない
  });
});
