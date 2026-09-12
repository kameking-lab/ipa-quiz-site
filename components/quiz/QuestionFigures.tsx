import type { Question } from "@/lib/questions/types";

export function QuestionFigures({ question }: { question: Question }) {
  if (!question.imageUrls?.length) return null;
  return <div className="mt-4 space-y-4">
    {question.imageUrls.filter((url) => url.trim()).map((url, index) => (
      <figure key={url} className="overflow-x-auto rounded-lg border border-border bg-white p-2">
        {/* Native image preserves source aspect ratio without guessed dimensions. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={`問${question.qNumber}の図表${index + 1}`} className="mx-auto h-auto max-w-full" loading="lazy" />
      </figure>
    ))}
  </div>;
}
