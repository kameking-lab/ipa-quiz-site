import type { Difficulty } from "@/lib/questions/types";

const LABELS: Record<Difficulty, string> = {
  1: "やさしい",
  2: "やや易",
  3: "標準",
  4: "やや難",
  5: "難しい",
};

/** Stored scores have no per-question measurement or editorial provenance.
 * Keep the stored value inspectable without presenting it as verified difficulty.
 */
export function DifficultyMeter({
  difficulty,
  className = "",
}: {
  difficulty?: Difficulty | null;
  className?: string;
}) {
  const stored = typeof difficulty === "number" && Number.isInteger(difficulty)
    && difficulty >= 1 && difficulty <= 5 ? difficulty as Difficulty : null;

  return (
    <div className={`min-w-0 text-sm leading-relaxed ${className}`}>
      <span className="inline-flex max-w-full flex-wrap gap-x-1 rounded-md border border-border bg-muted px-2 py-1 font-medium text-foreground">
        <span>難度：</span><span>{stored === null ? "未設定" : "根拠未確認"}</span>
      </span>
      <details className="mt-1 text-foreground">
        <summary className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">難度表示の意味</summary>
        <div className="max-w-prose space-y-1 py-2">
          {stored === null
            ? <p>この問題には有効な難度の登録値がありません。標準としては扱いません。</p>
            : <p>データ上の登録値：{stored}/5（{LABELS[stored]}）。</p>}
          <p>登録値を付けた判断基準・集計元は、この問題のデータでは確認できません。受験者の正答率や公式の難度評価を示す値としては使えません。</p>
          <p>難度は問題ごとの情報です。資格全体の難しさや合格の見込みを示すものではありません。</p>
        </div>
      </details>
    </div>
  );
}
