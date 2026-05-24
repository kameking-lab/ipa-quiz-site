import { Lightbulb, Layers, BookOpen, ChevronDown } from "lucide-react";

type Layer = {
  label: string;
  icon: React.ReactNode;
  body: string;
  tone: "primary" | "neutral" | "muted";
};

/**
 * Split a single paragraph into [結論, 詳細] when the paragraph carries 3
 * or more sentences. Most IPA explanations arrive as a single paragraph,
 * so without this fallback ~86% of /q/* pages emitted only LAYER 1 and
 * the LAYER 2/3 <details open> shells were missing — bad for both SEO
 * body thickness and the scannable-then-collapsible reading affordance.
 *
 * We do NOT synthesize content not in the source data — just re-shape
 * the existing prose into the layer container.
 */
function splitSingleParagraphBySentence(para: string): string[] {
  const matches = para.match(/[^。]+。/g);
  if (!matches || matches.length < 3) return [para];
  return [matches[0], matches.slice(1).join("")];
}

function splitLayers(explanation: string): Layer[] {
  let paragraphs = explanation
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return [];

  // Single paragraph + ≥3 sentences → reshape into 結論 + 詳細.
  if (paragraphs.length === 1) {
    const sentenceSplit = splitSingleParagraphBySentence(paragraphs[0]);
    if (sentenceSplit.length === 2) {
      paragraphs = sentenceSplit;
    } else {
      return [
        {
          label: "解説",
          icon: <Lightbulb className="h-3.5 w-3.5" />,
          body: paragraphs[0],
          tone: "primary",
        },
      ];
    }
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

function LayerBody({
  body,
  textClass,
}: {
  body: string;
  textClass: string;
}) {
  return (
    <div
      className={`selectable-content text-sm leading-[1.85] sm:text-[15px] ${textClass}`}
    >
      {body.split("\n").map((line, i) => (
        <p key={i} className="mb-2.5 last:mb-0">
          {line}
        </p>
      ))}
    </div>
  );
}

export function ExplanationLayers({ explanation }: { explanation: string }) {
  const layers = splitLayers(explanation);
  if (layers.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {layers.map((layer, idx) => {
        const tone = TONE_STYLES[layer.tone];
        // Layer 1 (結論) stays always open with no toggle — it is the
        // headline of the answer. Layer 2 / 3 wrap their body in a
        // <details open> so the LAYERs ship server-rendered for SEO and
        // power-users can collapse them once they have read past.
        const collapsible = idx > 0;
        return (
          <article
            key={idx}
            className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 ${tone.wrap}`}
          >
            {collapsible ? (
              <details open className="group/layer">
                <summary className="mb-2.5 flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide ${tone.chip}`}
                    >
                      {layer.icon}
                      {layer.label}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
                      Layer {idx + 1}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                    <ChevronDown
                      className="h-3.5 w-3.5 transition group-open/layer:rotate-180"
                      aria-hidden="true"
                    />
                    <span className="group-open/layer:hidden">展開</span>
                    <span className="hidden group-open/layer:inline">閉じる</span>
                  </span>
                </summary>
                <LayerBody body={layer.body} textClass={tone.text} />
              </details>
            ) : (
              <>
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
                <LayerBody body={layer.body} textClass={tone.text} />
              </>
            )}
          </article>
        );
      })}
    </div>
  );
}
