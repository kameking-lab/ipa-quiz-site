/**
 * 既存の問題データに Gemini を使って topicTags を自動付与するスクリプト（スケルトン）。
 *
 * 使い方: pnpm tsx scripts/topic-tagger.ts
 *
 * 前提: GEMINI_API_KEY が設定されていること。未設定時はヒューリスティックで
 *       キーワードマッチングのみ行います。
 */
import { ALL_QUESTIONS } from "@/data/questions";

const HEURISTICS: Array<{ pattern: RegExp; tag: string }> = [
  { pattern: /SQL|SELECT|JOIN|正規化|トランザクション/i, tag: "データベース" },
  { pattern: /TCP|UDP|IPv[46]|サブネット|ルーティング|DNS/i, tag: "ネットワーク" },
  { pattern: /暗号|SSL|TLS|ハッシュ|署名|PKI|認証/i, tag: "暗号・認証" },
  { pattern: /ソート|探索|計算量|オーダー|O\(n/i, tag: "アルゴリズム" },
  { pattern: /EVM|CPI|SPI|WBS|クリティカルパス/i, tag: "プロジェクト管理" },
  { pattern: /個人情報|著作権|請負|派遣|労働者/i, tag: "法務" },
];

async function main() {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  console.log(`Provider: ${hasKey ? "gemini" : "heuristic-only"}`);

  for (const q of ALL_QUESTIONS) {
    const existing = new Set(q.topicTags);
    const newTags: string[] = [];
    for (const { pattern, tag } of HEURISTICS) {
      if (pattern.test(q.question + "\n" + q.explanation) && !existing.has(tag)) {
        newTags.push(tag);
      }
    }
    if (newTags.length) {
      console.log(`  ${q.id}: + ${newTags.join(", ")}`);
    }
  }
  console.log(
    `\n※ 実書き込みは未実装。本体データを更新する場合はファイル IO の実装を追加してください。`,
  );
}

main();
