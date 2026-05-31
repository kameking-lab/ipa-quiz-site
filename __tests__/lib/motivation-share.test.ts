import { describe, it, expect } from "vitest";
import {
  buildOgImageUrl,
  buildXShareUrl,
  buildLineShareUrl,
  buildSessionText,
  buildStreakText,
  buildBadgeText,
} from "@/lib/motivation/share";
import { SITE_BASE_URL } from "@/lib/seo/config";

// share.ts はストリーク/セッション/バッジ獲得時の SNS シェア URL・本文を組み立てる
// ユーザー向け導線（X/LINE 共有・OG 画像）。クエリの欠落・エンコード崩れは共有カードの
// 破損や 404 に直結する。崩れたら落ちる契約として現挙動を回帰固定する（source 無変更）。

describe("buildOgImageUrl", () => {
  it("type は常に付与し、SITE_BASE_URL の /api/og を指す", () => {
    const url = new URL(buildOgImageUrl({ type: "streak" }));
    expect(url.origin + url.pathname).toBe(`${SITE_BASE_URL}/api/og`);
    expect(url.searchParams.get("type")).toBe("streak");
  });

  it("指定された任意パラメータのみをクエリに含める", () => {
    const url = new URL(
      buildOgImageUrl({
        type: "session",
        title: "AP 2024",
        accuracy: 80,
        count: 20,
      }),
    );
    expect(url.searchParams.get("title")).toBe("AP 2024");
    expect(url.searchParams.get("accuracy")).toBe("80");
    expect(url.searchParams.get("count")).toBe("20");
    // 未指定のものはクエリに現れない
    expect(url.searchParams.has("streak")).toBe(false);
    expect(url.searchParams.has("badge")).toBe(false);
  });

  it("数値 0 は undefined と区別して付与される（streak=0 を欠落させない）", () => {
    const url = new URL(buildOgImageUrl({ type: "streak", streak: 0, accuracy: 0, count: 0 }));
    expect(url.searchParams.get("streak")).toBe("0");
    expect(url.searchParams.get("accuracy")).toBe("0");
    expect(url.searchParams.get("count")).toBe("0");
  });

  it("badge 文字列をエンコードして付与する", () => {
    const raw = buildOgImageUrl({ type: "badge", badge: "7日継続 & 達成" });
    const url = new URL(raw);
    expect(url.searchParams.get("badge")).toBe("7日継続 & 達成");
    // 生の文字列ではエンコードされている（'&' がクエリ区切りに化けない）
    expect(raw).toContain("badge=");
    expect(raw).not.toContain("badge=7日継続 & 達成");
  });
});

describe("buildXShareUrl / buildLineShareUrl", () => {
  it("X intent はテキストと URL をクエリに載せる", () => {
    const u = new URL(buildXShareUrl("結果はこちら", "https://example.com/r"));
    expect(u.origin + u.pathname).toBe("https://twitter.com/intent/tweet");
    expect(u.searchParams.get("text")).toBe("結果はこちら");
    expect(u.searchParams.get("url")).toBe("https://example.com/r");
  });

  it("LINE 共有はテキストと URL を改行連結し全体をエンコードする", () => {
    const out = buildLineShareUrl("結果はこちら", "https://example.com/r");
    expect(out).toBe(
      `https://line.me/R/msg/text/?${encodeURIComponent("結果はこちら\nhttps://example.com/r")}`,
    );
    // 改行が生のまま残らない
    expect(out).not.toContain("\n");
  });
});

describe("share text builders", () => {
  it("セッション完了文に問題数と正答率を含む", () => {
    expect(buildSessionText({ count: 20, accuracy: 85 })).toBe(
      "📚 過去問AI セッション完了！20問・正答率85% #IPA過去問 #IPA_Quiz",
    );
  });

  it("ストリーク文に連続日数と累計問題数を含む", () => {
    expect(buildStreakText({ streak: 7, count: 140 })).toBe(
      "🔥 過去問AI 7日連続学習中！累計140問解きました #IPA過去問 #IPA_Quiz",
    );
  });

  it("バッジ獲得文にバッジ名と継続日数を含む", () => {
    expect(buildBadgeText({ name: "皆勤賞", days: 30 })).toBe(
      "🏆 過去問AI「皆勤賞」バッジ獲得！30日継続達成 #IPA過去問 #IPA_Quiz",
    );
  });
});
