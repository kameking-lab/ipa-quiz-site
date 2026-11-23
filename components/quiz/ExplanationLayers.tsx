import { QuestionBody } from "./QuestionBody";

type Layer = {
  label: string;
  body: string;
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
  const matches = para.match(/[^。]+(?:。|$)/g);
  if (!matches || matches.length < 3) return [para];
  return [matches[0], matches.slice(1).join("")];
}

function splitLayers(explanation: string): Layer[] {
  // Do not split a code fence or a table across independently rendered layers.
  if (/^\s*(`{3,}|~{3,})/m.test(explanation) || /^\s*\|.*\|\s*$/m.test(explanation)) {
    return [{ label: "解説", body: explanation }];
  }
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
          body: paragraphs[0],
        },
      ];
    }
  }

  if (paragraphs.length === 2) {
    return [
      {
        label: "結論",
        body: paragraphs[0],
      },
      {
        label: "詳細",
        body: paragraphs[1],
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
      body: conclusion,
    },
    {
      label: "詳細",
      body: detail,
    },
    {
      label: "補足",
      body: supplement,
    },
  ];
}

/** Describe exactly the same source layers that the body renders. */
export function ExplanationStructureLabel({ explanation }: { explanation: string }) {
  const layers = splitLayers(explanation);
  if (layers.length === 0) return null;

  return (
    <p className="text-[11px] text-muted-foreground">
      {layers.length === 1
        ? "解説本文"
        : `${layers.map((layer) => layer.label).join(" → ")} の ${layers.length} 層構成`}
    </p>
  );
}

export function ExplanationLayers({ explanation }: { explanation: string }) {
  const layers = splitLayers(explanation);
  if (layers.length === 0) return null;

  return (
    <div className="divide-y divide-hairline">
      {layers.map((layer, idx) => (
        <article key={idx} className="py-3 first:pt-0 last:pb-0">
          {layers.length > 1 && <h3 className="mb-2 text-sm font-bold">{layer.label}</h3>}
          <div className="selectable-content text-base leading-[1.85]">
            <QuestionBody text={layer.body} linkReferences />
          </div>
        </article>
      ))}
    </div>
  );
}
