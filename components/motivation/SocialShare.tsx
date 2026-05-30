"use client";

import * as React from "react";
import { Copy, Download, ExternalLink, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildLineShareUrl,
  buildXShareUrl,
} from "@/lib/motivation/share";

interface Props {
  text: string;
  url: string;
  imageUrl: string;
  showImagePreview?: boolean;
}

export function SocialShare({ text, url, imageUrl, showImagePreview = true }: Props) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    const nav = (typeof navigator !== "undefined" ? navigator : null) as
      | (Navigator & { clipboard?: { writeText: (s: string) => Promise<void> } })
      | null;
    try {
      await nav?.clipboard?.writeText(`${text}\n${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "ipa-quiz-share.png";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-3">
      {showImagePreview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt="シェア画像プレビュー"
          width={1200}
          height={630}
          className="w-full rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800"
        />
      )}

      <div className="grid grid-cols-2 gap-2">
        <Button asChild variant="outline" size="sm" className="gap-2">
          <a href={buildXShareUrl(text, url)} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5" />
            X (Twitter) に投稿
          </a>
        </Button>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <a href={buildLineShareUrl(text, url)} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5" />
            LINE で送る
          </a>
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleCopy}>
          <Copy className="h-3.5 w-3.5" />
          {copied ? "コピー済" : "テキストをコピー (Instagram/TikTok 用)"}
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleDownload}>
          <Download className="h-3.5 w-3.5" />
          画像を保存
        </Button>
      </div>

      {/* コピー成功はボタン文言が変わるだけでは SR に告知されない(WCAG 4.1.3)。
          polite live region で告知する。 */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "テキストをコピーしました" : ""}
      </span>

      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
        <ImageIcon className="mr-1 inline h-3 w-3" />
        画像を保存して Instagram ストーリーや TikTok にもそのまま投稿できます。
      </p>
    </div>
  );
}
