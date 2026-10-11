import type { Question } from "@/lib/questions/types";

export function QuestionFigures({ question }: { question: Question }) {
  if (!question.imageUrls?.length) return null;
  return <div className="mt-4 space-y-4">
    {question.imageUrls.map((url, index) => ({ url, index })).filter(({ url }) => url.trim()).map(({ url, index }) => {
      const alt = question.imageAltTexts?.[index] || "問" + question.qNumber + "の図表" + (index + 1);
      // Whole official surveyor pages need their original resolution for map reading.
      const image = (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={alt} className="mx-auto h-auto max-w-full" loading="lazy" />
      );
      return (
        <figure key={url} className="overflow-x-auto rounded-lg border border-border bg-white p-2">
          {question.exam === "sokuryoshi" ? (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={"原図を拡大表示：" + alt} className="block">
              {image}
              <span className="mt-2 block text-center text-xs text-indigo-700 underline">原図を拡大表示（別タブ）</span>
            </a>
          ) : image}
        </figure>
      );
    })}
  </div>;
}
