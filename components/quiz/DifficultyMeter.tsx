import type { Difficulty } from "@/lib/questions/types";

const LABELS: Record<Difficulty, string> = {
  1: "やさしい",
  2: "やや易",
  3: "標準",
  4: "やや難",
  5: "難しい",
};

const TONES: Record<Difficulty, string> = {
  1: "bg-emerald-500",
  2: "bg-lime-500",
  3: "bg-amber-500",
  4: "bg-orange-500",
  5: "bg-rose-500",
};

export function DifficultyMeter({
  difficulty,
  className = "",
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        難度
      </span>
      <div
        className="flex gap-0.5"
        role="img"
        aria-label={`難度 ${difficulty} / 5（${LABELS[difficulty]}）`}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`h-1.5 w-3 rounded-sm ${
              n <= difficulty ? TONES[difficulty] : "bg-border"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-[11px] font-medium text-foreground">
        {LABELS[difficulty]}
      </span>
    </div>
  );
}
