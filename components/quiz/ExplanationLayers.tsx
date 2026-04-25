import { Lightbulb, Layers, BookOpen } from "lucide-react";

type Layer = {
  label: string;
  icon: React.ReactNode;
  body: string;
  tone: "primary" | "neutral" | "muted";
};

function splitLayers(explanation: string): Layer[] {
  const paragraphs = explanation
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return [];

  if (paragraphs.length === 1) {
    return [
      {
        label: "解説",
        icon: <Lightbulb className="h-3.5 w-3.5" />,
        body: paragraphs[0],
        tone: "primary",
      },
    ];
  }

  if (paragraphs.length === 2) {
    return [
      {
        label: "結論",
        icon: <Lightbulb className="h-3.5 w-3.5" />,
        body: paragraphs[0],
        tone: "primary",
      },
      {
        label: "詳細",
        icon: <Layers className="h-3.5 w-3.5" />,
        body: paragraphs[1],
        tone: "neutral",
      },
    ];
  }

  // 3+ paragraphs — first = 結論, second = 詳細, rest = 補足
  const conclusion = paragraphs[0];
  const detail = paragraphs[1];
  const supplement = paragraphs.slice(2).join("\n\n");

  return [
    {
      label: "結論",
      icon: <Lightbulb className="h-3.5 w-3.5" />,
      body: conclusion,
      tone: "primary",
    },
    {
      label: "詳細",
      icon: <Layers className="h-3.5 w-3.5" />,
      body: detail,
      tone: "neutral",
    },
    {
      label: "補足",
      icon: <BookOpen className="h-3.5 w-3.5" />,
      body: supplement,
      tone: "muted",
    },
  ];
}

const TONE_STYLES: Record<Layer["tone"], { wrap: string; chip: string; text: string }> = {
  primary: {
    wrap: "border-primary/25 bg-gradient-to-br from-primary-soft via-card to-card",
    chip: "bg-primary text-primary-foreground",
    text: "text-card-foreground",
  },
  neutral: {
    wrap: "border-border bg-card",
    chip: "bg-muted text-foreground",
    text: "text-card-foreground",
  },
  muted: {
    wrap: "border-border bg-muted/40",
    chip: "bg-background text-muted-foreground border border-border",
    text: "text-muted-foreground",
  },
};

export function ExplanationLayers({ explanation }: { explanation: string }) {
  const layers = splitLayers(explanation);
  if (layers.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {layers.map((layer, idx) => {
        const tone = TONE_STYLES[layer.tone];
        return (
          <article
            key={idx}
            className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 ${tone.wrap}`}
          >
            <header className="mb-2.5 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide ${tone.chip}`}
              >
                {layer.icon}
                {layer.label}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
                Layer {idx + 1}
              </span>
            </header>
            <div
              className={`selectable-content text-sm leading-[1.85] sm:text-[15px] ${tone.text}`}
            >
              {layer.body.split("\n").map((line, i) => (
                <p key={i} className="mb-2.5 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
