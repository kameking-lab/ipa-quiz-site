import { describe, it, expect } from "vitest";
import { maskPII, totalHits } from "@/lib/feedback/pii-masker";

// maskPII は app/api/contact/route.ts でユーザーの feedback / question-comment /
// question-rating 本文を公開ログ・モデレーション画面へ流す前に通す PII スクラバ。
// プライバシー上クリティカルかつ純関数だがテスト皆無だったため、
// 「崩れたら落ちる」回帰を敷設する（source 無変更・現挙動の契約固定）。

const MASK = "[削除済み]";

describe("maskPII — email", () => {
  it("masks a single address embedded in Japanese text", () => {
    const r = maskPII("返信は yamada.taro@example.co.jp までお願いします。");
    expect(r.masked).toBe(`返信は ${MASK} までお願いします。`);
    expect(r.hits).toEqual({ email: 1 });
  });

  it("masks multiple addresses and counts each", () => {
    const r = maskPII("メール a@b.co と c@d.co を併記");
    expect(r.masked).toBe(`メール ${MASK} と ${MASK} を併記`);
    expect(r.hits.email).toBe(2);
  });
});

describe("maskPII — phone", () => {
  it("masks mobile / area-code / freedial variants", () => {
    const r = maskPII(
      "緊急の場合は 090-1234-5678 か 03-1234-5678 にご連絡ください。フリーダイヤル 0120-123-456 もあります。",
    );
    expect(r.masked).toBe(
      `緊急の場合は ${MASK} か ${MASK} にご連絡ください。フリーダイヤル ${MASK} もあります。`,
    );
    expect(r.hits).toEqual({ phone: 3 });
  });

  it("masks a hyphen-less 11-digit mobile number", () => {
    const r = maskPII("携帯は 08012345678 です。");
    expect(r.masked).toBe(`携帯は ${MASK} です。`);
    expect(r.hits).toEqual({ phone: 1 });
  });
});

describe("maskPII — mynumber (12 digits)", () => {
  it("masks both 4-4-4 separated and bare 12-digit forms", () => {
    const r = maskPII("番号 123456789012 と 1234-5678-9012 です。");
    expect(r.masked).toBe(`番号 ${MASK} と ${MASK} です。`);
    expect(r.hits.mynumber).toBe(2);
  });

  it("masks a bare 12-digit run flush against Japanese (word boundary holds)", () => {
    // \b は日本語(非 \w 文字)との境界でも成立するため隣接でもマスクされる。
    const r = maskPII("番号は123456789012です");
    expect(r.masked).toBe(`番号は${MASK}です`);
    expect(r.hits).toEqual({ mynumber: 1 });
  });
});

describe("maskPII — name with honorific", () => {
  it("masks clear personal names with さん / 先生", () => {
    const r = maskPII("山田 太郎さんが推薦してくれました。佐藤先生の解説とは違う気がします。");
    expect(r.masked).toBe(`${MASK}が推薦してくれました。${MASK}の解説とは違う気がします。`);
    expect(r.hits).toEqual({ "name-honorific": 2 });
  });

  it("masks 様 attached to a name", () => {
    const r = maskPII("山田様にお伝えください。");
    expect(r.masked).toBe(`${MASK}にお伝えください。`);
    expect(r.hits).toEqual({ "name-honorific": 1 });
  });
});

describe("maskPII — passthrough / edge cases", () => {
  it("returns empty string untouched", () => {
    expect(maskPII("")).toEqual({ masked: "", hits: {} });
  });

  it("leaves PII-free text untouched with no hits", () => {
    const r = maskPII("普通のコメントです。問題なし。");
    expect(r.masked).toBe("普通のコメントです。問題なし。");
    expect(r.hits).toEqual({});
  });

  it("masks every category in a mixed message and counts each rule once", () => {
    const r = maskPII(
      "鈴木さんの携帯 08012345678 と taro@example.com に共有しました。マイナンバー 123412345678 も含めて削除をお願いします。",
    );
    expect(r.masked).toBe(
      `${MASK}の携帯 ${MASK} と ${MASK} に共有しました。マイナンバー ${MASK} も含めて削除をお願いします。`,
    );
    expect(r.hits).toEqual({
      email: 1,
      phone: 1,
      mynumber: 1,
      "name-honorific": 1,
    });
  });
});

describe("totalHits", () => {
  it("sums all rule counts", () => {
    expect(totalHits({ email: 2, phone: 1, mynumber: 3 })).toBe(6);
  });

  it("is 0 for an empty hits record", () => {
    expect(totalHits({})).toBe(0);
  });
});

describe("maskPII — known over-masking limitation (DAYTIME CANDIDATE, not a leak)", () => {
  // name-honorific ルール `[一-鿿゠-ヿ]…(?:様|氏|…)` は、honorific を末尾に持つ
  // 一般語（仕様 / 同様 / 模様 …）を「名前」と誤判定してマスクする。IPA 試験文脈では
  // 「仕様」「同様」が頻出するため正当なフィードバック本文が破損する。
  // ただしこれは over-mask（プライバシー的には安全側）であり、正規表現を狭めると
  // 実在の姓+様（例「林様」）を取りこぼす危険があるため、修正は要人手判断＝日中候補。
  // 現挙動を characterization として固定し、将来の修正時にこのテストが気付かせる。
  it("over-masks the common word 仕様 (specification)", () => {
    const r = maskPII("問題の仕様が分かりにくいです。");
    expect(r.masked).toBe(`問題の${MASK}が分かりにくいです。`);
    expect(r.hits).toEqual({ "name-honorific": 1 });
  });

  it("over-masks the common word 同様 (similarly)", () => {
    const r = maskPII("他の問題も同様に解説が欲しい。");
    expect(r.masked).toBe(`他の問題も${MASK}に解説が欲しい。`);
  });
});
