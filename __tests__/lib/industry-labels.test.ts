import { describe, expect, it } from "vitest";

import { INDUSTRY_LABELS } from "@/lib/essay/types";
import { ESSAY_INDUSTRY_LABELS } from "@/lib/essays/types";

/**
 * 業種ラベル Record のデータ整合性 invariant。
 *
 * 両マップは「型では表現できない制約」を持つ:
 *  - 値（表示ラベル）が非空であること
 *  - 値が一意であること（業種を一意に識別できること）
 *
 * `Record<Industry, string>` 型はキーの網羅は保証するが、値が空文字でないこと・
 * 値同士が重複しないことは保証しない。これらは user-visible に効く:
 *  - INDUSTRY_LABELS: EssayEditor の業種選択 <select> オプション
 *    (components/essay/EssayEditor.tsx:177)、essay-grade API が LLM へ渡す
 *    `【受験生の業種】${INDUSTRY_LABELS[industry]}`(app/api/essay-grade/route.ts:103)、
 *    EssayResultView / EssayHistoryView の見出し
 *  - ESSAY_INDUSTRY_LABELS: EssayIndustryTabs の業種タブのボタン文言
 *    (app/essays/.../EssayIndustryTabs.tsx:62)
 *
 * 空ラベルは「空のオプション/空のタブ/`【受験生の業種】`で途切れた LLM プロンプト」を生み、
 * 重複ラベルは「同名タブ/同名オプションで業種を区別できない」UX 不具合を生む。
 */
describe("industry label maps data integrity", () => {
  const maps = [
    { name: "INDUSTRY_LABELS (lib/essay/types)", map: INDUSTRY_LABELS },
    { name: "ESSAY_INDUSTRY_LABELS (lib/essays/types)", map: ESSAY_INDUSTRY_LABELS },
  ] as const;

  for (const { name, map } of maps) {
    describe(name, () => {
      it("every label is a non-empty (non-whitespace) string", () => {
        for (const [key, label] of Object.entries(map)) {
          expect(typeof label, key).toBe("string");
          expect(label.trim().length, key).toBeGreaterThan(0);
        }
      });

      it("has no duplicate labels (each industry is distinguishable)", () => {
        const labels = Object.values(map);
        const unique = new Set(labels);
        expect(unique.size).toBe(labels.length);
      });
    });
  }
});
