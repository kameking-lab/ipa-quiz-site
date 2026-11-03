"use client";
import { useRef } from "react";
import Image from "next/image";
import type { AnswerFigure } from "@/lib/learning-assets";

/** Enlargement stays in the app and uses the same durable image as the thumbnail. */
export function AnswerFigureView({figure}: {figure: AnswerFigure}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <figure>
    <button type="button" onClick={()=>dialog.current?.showModal()} aria-label={`${figure.alt}を拡大`}>
      <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} className="h-auto max-w-full rounded-lg bg-white" />
    </button>
    <figcaption className="mt-1 text-xs">{figure.alt}：{figure.official ? "公式の正答例から抜粋" : "模範解答用の模式図（独自作成）"}。図を押すと拡大できます。</figcaption>
    <dialog ref={dialog} aria-label={`${figure.alt}の拡大図`} className="max-h-[90vh] max-w-[95vw] overflow-auto rounded-xl p-4 backdrop:bg-black/60">
      <button type="button" className="mb-3 min-h-11 rounded border px-4" onClick={()=>dialog.current?.close()}>拡大図を閉じる</button>
      <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} className="h-auto max-w-none bg-white" />
    </dialog>
  </figure>;
}
