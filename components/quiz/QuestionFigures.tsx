import { questionNumberLabel } from "@/lib/questions/display";
import type { Question } from "@/lib/questions/types";

export function QuestionFigures({ question }: { question: Question }) {
  if (!question.imageUrls?.length) return null;
  return <div className="mt-4 space-y-4">
    {question.imageUrls.map((url, index) => ({ url, index })).filter(({ url }) => url.trim()).map(({ url, index }) => (
      <figure key={url} className="overflow-x-auto rounded-lg border border-border bg-white p-2">
        {/* Native image preserves source aspect ratio without guessed dimensions. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={question.imageAltTexts?.[index] || `問${questionNumberLabel(question)}の図表${index + 1}`} className="mx-auto h-auto max-w-full" loading="lazy" />
        <figcaption className="mt-2 text-sm">
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
            図表を拡大して表示
          </a>
        </figcaption>
      </figure>
    ))}
  </div>;
}
