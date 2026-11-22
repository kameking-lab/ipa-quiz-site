"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics/events";
import { nativeClient } from "@/mobile/shared/contracts";
import { shareLink, type ShareKind } from "@/lib/sharing/links";

export function StudyShareButton({ kind, path, title, imagePath }: {
  kind: ShareKind; path: string; title: string; imagePath?: string;
}) {
  const [fallback, setFallback] = useState(false);
  const [status, setStatus] = useState("");
  const image = useRef<Blob | undefined>(undefined);
  const busy = useRef(false);
  const id = useId();
  const url = shareLink(path, kind).href;
  const record = () => trackEvent({ name: "share", kind });

  useEffect(() => {
    image.current = undefined;
    if (!imagePath || (!nativeClient() && !navigator.share)) return;
    const signal = new AbortController();
    void fetch(imagePath, { signal: signal.signal }).then(async response => {
      if (response.ok && response.headers.get("Content-Type")?.startsWith("image/png")) {
        const blob = await response.blob();
        if (!signal.signal.aborted) image.current = blob;
      }
    }).catch(() => {});
    return () => signal.abort();
  }, [imagePath]);

  async function share() {
    if (busy.current) return;
    setStatus("");
    const native = nativeClient();
    const data = { title, url };
    if (!native && (!navigator.share || navigator.canShare?.(data) === false)) {
      setFallback(value => !value);
      return;
    }
    busy.current = true;
    record();
    try {
      if (native) {
        const { shareStudyResult } = await import("@/mobile/src/study-sharing");
        await shareStudyResult(title, url, image.current);
      } else {
        const files = image.current ? [new File([image.current], "study-result.png", { type: "image/png" })] : [];
        await navigator.share(files.length && navigator.canShare?.({ ...data, files }) ? { ...data, files } : data);
      }
    } catch (error) {
      if (!native && !(error instanceof DOMException && error.name === "AbortError")) setFallback(true);
      else if (native && !/cancel/i.test(String((error as { message?: string })?.message ?? error))) {
        setStatus("共有を開けませんでした。もう一度お試しください。");
      }
    } finally {
      busy.current = false;
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      record();
      setStatus("リンクをコピーしました");
    } catch {
      setStatus("リンクをコピーできませんでした。");
    }
  }

  return <div data-study-share={kind}>
    <button type="button" className="inline-flex min-h-11 items-center gap-1.5 rounded text-sm underline underline-offset-4 focus-visible:outline-2"
      aria-controls={fallback ? id : undefined} onClick={() => void share()}>
      <Share2 className="size-4" aria-hidden="true" />
      {kind === "card" ? "この結果を共有" : "この問題を共有"}
    </button>
    {fallback && <div id={id} className="flex flex-wrap justify-center gap-x-4 text-sm">
      <a className="inline-flex min-h-11 items-center underline" target="_blank" rel="noopener noreferrer" onClick={record}
        href={`https://twitter.com/intent/tweet?${new URLSearchParams({ text: title, url })}`}>X</a>
      <a className="inline-flex min-h-11 items-center underline" target="_blank" rel="noopener noreferrer" onClick={record}
        href={`https://social-plugins.line.me/lineit/share?${new URLSearchParams({ url })}`}>LINE</a>
      <button type="button" className="min-h-11 underline" onClick={() => void copy()}>リンクをコピー</button>
    </div>}
    {status && <p role="status" className="text-xs text-muted-foreground">{status}</p>}
  </div>;
}
