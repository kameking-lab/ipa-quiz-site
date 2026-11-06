import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { TOHAN_2024_KANSAI_QUESTIONS, TOHAN_CATEGORIES, TOHAN_QUESTIONS } from "@/data/questions/tohan";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

/** 公式「令和６年度 関西広域連合 登録販売者試験 正答」PDF（R06touhankaitou.pdf）の問1〜120。 */
const OFFICIAL_KEY =
  "33421111444453352235" + "42143142332425555315" + "33415445351421423455" +
  "21141411322435324434" + "33354211235342445322" + "55513224531535421324";

const receipt = JSON.parse(
  readFileSync(path.join(process.cwd(), "reports/tohan-kansai-2024/source-receipt.json"), "utf8"),
) as { officialAnswerKey: string; sha256: Record<string, string> };

const ZENHAN = "https://www.kouiki-kansai.jp/material/files/group/12/R6tourokuhanbaisyashiken_zennhan.pdf";
const KOUHAN = "https://www.kouiki-kansai.jp/material/files/group/12/R6tourokuhanbaisyashiken_kouhan.pdf";
const ANSWER = "https://www.kouiki-kansai.jp/material/files/group/12/R06touhankaitou.pdf";

const chapterOf = (n: number) =>
  n <= 20 ? "医薬品に共通する特性と基本的な知識"
    : n <= 60 ? "主な医薬品とその作用"
      : n <= 80 ? "人体の働きと医薬品"
        : n <= 100 ? "薬事に関する法規と制度"
          : "医薬品の適正使用と安全対策";

describe("登録販売者試験（関西広域連合）令和6年度 全120問", () => {
  it("問1〜120がそろい、令和7年度と合わせて2回分になる", () => {
    expect(TOHAN_2024_KANSAI_QUESTIONS).toHaveLength(120);
    expect(TOHAN_2024_KANSAI_QUESTIONS.map((q) => q.qNumber)).toEqual(Array.from({ length: 120 }, (_, i) => i + 1));
    expect(TOHAN_QUESTIONS).toHaveLength(240);
    expect(new Set(TOHAN_QUESTIONS.map((q) => q.id)).size).toBe(240);
    expect(new Set(TOHAN_QUESTIONS.map((q) => q.year))).toEqual(new Set([2024, 2025]));
  });

  it("正答は公式正答PDFと受領記録の両方に一致する", () => {
    expect(receipt.officialAnswerKey).toBe(OFFICIAL_KEY);
    for (const q of TOHAN_2024_KANSAI_QUESTIONS) {
      const official = Number(OFFICIAL_KEY[q.qNumber - 1]);
      expect(q.officialAnswerNumber, q.id).toBe(String(official));
      expect(q.answer, q.id).toBe(["ア", "イ", "ウ", "エ", "オ"][official - 1]);
    }
    expect(receipt.sha256["解答"]).toBe("54c3a979d52fc07c7ca6c1466209476a7757357e7122aaed8ea976521ca82c9c");
  });

  it("手引きの試験項目を問番号の範囲どおりに付けている", () => {
    for (const q of TOHAN_2024_KANSAI_QUESTIONS) {
      expect(q.category, q.id).toBe(chapterOf(q.qNumber));
      expect(TOHAN_CATEGORIES as readonly string[]).toContain(q.category);
    }
  });

  it("5肢すべてに解説があり、正答肢だけが正解と説明される", () => {
    for (const q of TOHAN_2024_KANSAI_QUESTIONS) {
      expect(Object.keys(q.choices ?? {}), q.id).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      for (const [key, text] of Object.entries(q.choiceExplanations ?? {})) {
        expect(text.trim().length, `${q.id}/${key}`).toBeGreaterThan(30);
        expect(/^(正しい組合せ|正解)。/.test(text), `${q.id}/${key}`).toBe(key === q.answer);
      }
      expect(q.explanation.startsWith(`正解は(${q.officialAnswerNumber})。`), q.id).toBe(true);
      expect(q.sourcePdfUrl, q.id).toBe(q.qNumber <= 60 ? ZENHAN : KOUHAN);
      expect(q.sourceAnswerUrl, q.id).toBe(ANSWER);
      expect(q.sourceAttribution, q.id).toBe(
        `出典：関西広域連合 令和6年度 登録販売者試験（${q.qNumber <= 60 ? "前半" : "後半"}）問${q.qNumber}。ルビ・改行・表組みを整理。解説は本サイト作成。`,
      );
      expect(q.hasImage, q.id).toBe(false);
    }
  });

  it("問題URLは 2024-kansai で引き直せる", () => {
    for (const q of TOHAN_2024_KANSAI_QUESTIONS) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(yearSeason, q.id).toBe("2024-kansai");
      expect(findQuestionByRoute(TOHAN_QUESTIONS, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });
});
