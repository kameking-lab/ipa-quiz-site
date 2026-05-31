"use client";

import * as React from "react";
import { Copy, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const LS_CODE_KEY = "ipa-quiz:referral-code:v1";
const LS_COUNT_KEY = "ipa-quiz:referral-count:v1";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function ReferralClient() {
  const [code, setCode] = React.useState<string | null>(null);
  const [count, setCount] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    try {
      let c = localStorage.getItem(LS_CODE_KEY);
      if (!c) {
        c = generateCode();
        localStorage.setItem(LS_CODE_KEY, c);
      }
      setCode(c);
      const cnt = Number(localStorage.getItem(LS_COUNT_KEY) ?? "0");
      setCount(isNaN(cnt) ? 0 : cnt);
    } catch {}
  }, []);

  const referralUrl =
    typeof window !== "undefined" && code
      ? `${window.location.origin}/?ref=${code}`
      : "";

  async function copyUrl() {
    if (!referralUrl) return;
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  function shareToX() {
    const text = encodeURIComponent(
      `IPA情報処理技術者試験の過去問をAIコパイロット付きで学習できる「IPA Quiz」がおすすめ！${referralUrl}`,
    );
    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank", "noopener");
  }

  function shareToLine() {
    const text = encodeURIComponent(
      `IPA Quiz — AIコパイロット付き過去問学習サービス\n${referralUrl}`,
    );
    window.open(`https://line.me/R/share?text=${text}`, "_blank", "noopener");
  }

  return (
    <div className="space-y-6">
      {/* Code display */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-5 dark:border-sky-900/40 dark:bg-sky-950/20">
        <p className="mb-2 text-xs font-semibold text-sky-700 dark:text-sky-300">あなたの紹介コード</p>
        <div className="mb-3 flex items-center gap-3">
          <span className="flex-1 rounded-xl bg-white px-4 py-2.5 font-mono text-xl font-bold tracking-widest text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-50">
            {code ?? "読み込み中…"}
          </span>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white px-3 py-2 font-mono text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
          {referralUrl || "URL を取得中…"}
        </div>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Button
          variant="primary"
          size="md"
          onClick={copyUrl}
          className="transition-transform active:scale-95"
          data-track="referral-copy"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "コピーしました！" : "URLをコピー"}
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={shareToX}
          className="transition-transform active:scale-95"
          data-track="referral-share-x"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X でシェア
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={shareToLine}
          className="transition-transform active:scale-95"
          data-track="referral-share-line"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          LINE でシェア
        </Button>
      </div>

      {/* コピー成功はボタン文言が変わるだけでは SR に告知されない(WCAG 4.1.3)。
          polite live region で告知する。 */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "紹介 URL をコピーしました" : ""}
      </span>

      {/* Count */}
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/40">
        <span className="rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
          <Users className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            紹介実績: <span className="text-sky-600 dark:text-sky-400">{count} 人</span>
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            紹介した友達が登録するとカウントが増えます（近日実装）
          </p>
        </div>
      </div>
    </div>
  );
}
