import { it, expect, describe } from "vitest";
import {
  encodeRelatedHeader,
  decodeRelatedHeader,
  findRelatedQuestions,
  type RelatedQuestion,
} from "@/lib/copilot/related";

/**
 * Characterization tests for the three previously-untested exports of
 * lib/copilot/related.ts. The module's topic helpers (sharesTopicOrCategory /
 * topicRelevanceMultiplier) are covered by related-topic.test.ts, but the
 * HTTP-header round-trip pair and the BM25-backed `findRelatedQuestions`
 * orchestrator had no coverage (partial-coverage gap).
 *
 * Load-bearing contracts:
 *  - encode/decode is the wire format for the X-Related-Questions response
 *    header: ASCII-only base64(JSON(UTF-8)) so Japanese previews survive a
 *    header hop, with empty / corrupt inputs degrading to "" / [] (never throw).
 *  - findRelatedQuestions gates non-retrievable queries to [], never returns
 *    the viewed question or excluded citation docs, honours `limit`, and emits
 *    a non-increasing score order.
 */

function sampleItem(overrides: Partial<RelatedQuestion> = {}): RelatedQuestion {
  return {
    questionId: "ap-2023h-am-q1",
    exam: "ap",
    examLabel: "応用情報技術者",
    year: 2023,
    season: "spring",
    yearSeasonLabel: "2023年 春期",
    qNumber: 1,
    category: "テクノロジ系",
    preview: "可変長符号化に関する記述として、最も適切なものはどれか。",
    url: "/quiz?id=ap-2023h-am-q1",
    score: 12.5,
    ...overrides,
  };
}

describe("encodeRelatedHeader / decodeRelatedHeader", () => {
  it("空配列は空文字へエンコードされる（ヘッダを付けない合図）", () => {
    expect(encodeRelatedHeader([])).toBe("");
  });

  it("非空配列は ASCII-only な base64 文字列になる", () => {
    const header = encodeRelatedHeader([sampleItem()]);
    expect(header.length).toBeGreaterThan(0);
    // HTTP ヘッダ値として安全な ASCII（base64 文字集合）のみ。
    expect(header).toMatch(/^[A-Za-z0-9+/=]+$/);
  });

  it("日本語を含むフィールドが encode→decode で無損失に往復する", () => {
    const items = [
      sampleItem(),
      sampleItem({
        questionId: "ap-2023h-am-q2",
        qNumber: 2,
        preview: "TCP/IP の階層モデルにおける役割は？",
        score: 9.0,
      }),
    ];
    const decoded = decodeRelatedHeader(encodeRelatedHeader(items));
    expect(decoded).toEqual(items);
  });

  it("null / 空文字ヘッダは空配列を返す", () => {
    expect(decodeRelatedHeader(null)).toEqual([]);
    expect(decodeRelatedHeader("")).toEqual([]);
  });

  it("配列でない JSON をデコードしても空配列にフォールバックする", () => {
    const notArray = Buffer.from(JSON.stringify({ foo: 1 }), "utf8").toString(
      "base64",
    );
    expect(decodeRelatedHeader(notArray)).toEqual([]);
  });

  it("壊れた base64 / JSON は throw せず空配列を返す", () => {
    expect(decodeRelatedHeader("%%%not-base64%%%")).toEqual([]);
    const garbageJson = Buffer.from("{not json", "utf8").toString("base64");
    expect(decodeRelatedHeader(garbageJson)).toEqual([]);
  });
});

describe("findRelatedQuestions", () => {
  const emptyExclude = new Set<string>();

  it("検索不能なクエリ（記号のみ）は空配列を返す", () => {
    expect(
      findRelatedQuestions({ userMessage: "?????", excludeDocIds: emptyExclude }),
    ).toEqual([]);
  });

  it("有効なクエリは limit 件以下・スコア降順・question 種別のみを返す", () => {
    const results = findRelatedQuestions({
      userMessage: "TCP/IP の階層モデル",
      excludeDocIds: emptyExclude,
      limit: 3,
    });
    // コーパスにヒットがあること（vacuous pass の防止）。
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(3);
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
    // 全件が実在する問題 URL を持つ（kind==="question" の写像）。
    for (const r of results) {
      expect(r.url).toBe(`/quiz?id=${encodeURIComponent(r.questionId)}`);
    }
  });

  it("excludeDocIds に入れた docId は結果から除外される", () => {
    const baseline = findRelatedQuestions({
      userMessage: "TCP/IP の階層モデル",
      excludeDocIds: emptyExclude,
      limit: 4,
    });
    expect(baseline.length).toBeGreaterThan(0);
    const excludedId = `q:${baseline[0].questionId}`;
    const filtered = findRelatedQuestions({
      userMessage: "TCP/IP の階層モデル",
      excludeDocIds: new Set([excludedId]),
      limit: 4,
    });
    expect(filtered.map((r) => r.questionId)).not.toContain(
      baseline[0].questionId,
    );
  });

  it("currentQuestionId に一致する自問題は結果に含めない", () => {
    const baseline = findRelatedQuestions({
      userMessage: "TCP/IP の階層モデル",
      excludeDocIds: emptyExclude,
      limit: 4,
    });
    expect(baseline.length).toBeGreaterThan(0);
    const selfId = baseline[0].questionId;
    const filtered = findRelatedQuestions({
      userMessage: "TCP/IP の階層モデル",
      currentQuestionId: selfId,
      excludeDocIds: emptyExclude,
      limit: 4,
    });
    expect(filtered.map((r) => r.questionId)).not.toContain(selfId);
  });
});
