import { describe, expect, it } from "vitest";
import { getPracticeRelatedQuestions } from "@/lib/questions/related";
import type { Question } from "@/lib/questions/types";

const current: Question = {
  id: "ap-2025h-am-q1", exam: "ap", session: "am", year: 2025, season: "spring",
  qNumber: 1, type: "multiple-choice", category: "ネットワーク", topicTags: ["DNS"],
  difficulty: 2, question: "名前解決に利用する仕組みはどれか。",
  choices: { ア: "DNS", イ: "HTTP", ウ: "SMTP", エ: "NTP" }, answer: "ア",
  explanation: "DNSはドメイン名とIPアドレスを対応付ける仕組みです。名前解決にはDNSサーバーを利用します。",
  hasImage: false, sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html", license: "IPA-public",
};

describe("in-place related practice", () => {
  it("excludes other qualifications, subjects, formats and review-held content", () => {
    const pool: Question[] = [current,
      { ...current, id: "other-exam", exam: "fe" },
      { ...current, id: "other-subject", session: "pm" },
      { ...current, id: "other-category", category: "経営戦略" },
      { ...current, id: "other-format", type: "descriptive" },
      { ...current, id: "held", needsReview: true },
      { ...current, id: "valid" },
    ];
    expect(getPracticeRelatedQuestions(current, pool).map((q) => q.id)).toEqual(["valid"]);
  });
  it("prioritizes shared subject tags, then recent years, and caps suggestions", () => {
    const pool: Question[] = [
      { ...current, id: "new", year: 2026, topicTags: [] },
      { ...current, id: "related", year: 2024 },
      { ...current, id: "old", year: 2023, topicTags: [] },
    ];
    expect(getPracticeRelatedQuestions(current, pool, 2).map((q) => q.id)).toEqual(["related", "new"]);
  });
});
