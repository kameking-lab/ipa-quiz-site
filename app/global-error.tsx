"use client";

import * as React from "react";
import { AlertTriangle, HomeIcon, RefreshCw } from "lucide-react";
import { captureException } from "@/lib/monitoring/sentry";
import { THEME_BOOTSTRAP_SCRIPT } from "@/components/theme-provider";
import { LS_KEYS } from "@/lib/storage/keys";
import { discardWebAds } from "@/lib/ads/web-ads";

// This boundary replaces the root layout, including its stylesheet.
const ERROR_STYLES = `
:root{--error-bg:#fafafa;--error-text:#18181b;--error-muted:#52525b;--error-card:#fff;--error-border:#d4d4d8;--error-accent:#4f46e5;--error-on-accent:#fff}
:root.dark{--error-bg:#09090b;--error-text:#fafafa;--error-muted:#a1a1aa;--error-card:#18181b;--error-border:#3f3f46;--error-accent:#c4b5fd;--error-on-accent:#1e1645}
@media(prefers-color-scheme:dark){:root:not([style*="color-scheme: light"]){--error-bg:#09090b;--error-text:#fafafa;--error-muted:#a1a1aa;--error-card:#18181b;--error-border:#3f3f46;--error-accent:#c4b5fd;--error-on-accent:#1e1645}}
*{box-sizing:border-box}body{margin:0;min-height:100dvh;display:grid;place-items:center;padding:24px;background:var(--error-bg);color:var(--error-text);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.global-error-content{width:100%;max-width:420px;text-align:center}.global-error-icon{display:flex;align-items:center;justify-content:center;width:56px;height:56px;margin:0 auto 24px;border-radius:16px;background:var(--error-card);border:1px solid var(--error-border);color:var(--error-accent)}svg{width:20px;height:20px;flex-shrink:0}.global-error-icon svg{width:28px;height:28px}h1{margin:0 0 16px;font-size:24px;line-height:1.5;overflow-wrap:anywhere;outline:none}p{margin:0 0 24px;color:var(--error-muted);font-size:14px;line-height:1.85}.global-error-digest{padding:10px 12px;border-radius:10px;background:var(--error-card);font-family:ui-monospace,monospace;font-size:12px;overflow-wrap:anywhere}
.global-error-actions{display:flex;flex-direction:column;gap:12px}button,a{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:12px 20px;border:1px solid var(--error-border);border-radius:12px;background:var(--error-card);color:var(--error-text);font:600 14px/1.5 system-ui;cursor:pointer;text-decoration:none}button{border-color:var(--error-accent);background:var(--error-accent);color:var(--error-on-accent)}button:hover,a:hover{filter:brightness(.94)}button:focus-visible,a:focus-visible{outline:3px solid var(--error-accent);outline-offset:4px}@media(min-width:640px){.global-error-actions{flex-direction:row}.global-error-actions>*{flex:1}}
`;

export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const digest = error instanceof Error && "digest" in error && typeof error.digest === "string" ? error.digest : undefined;
  React.useEffect(() => {
    discardWebAds();
    try {
      const theme = window.localStorage.getItem(LS_KEYS.theme);
      const dark = theme === "dark" || (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
    } catch { /* The self-contained stylesheet also follows the OS theme. */ }
    headingRef.current?.focus({ preventScroll: true });
    console.error(error);
    void captureException(error, { route: "app/global-error.tsx", extra: { digest } });
  }, [error, digest]);

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <title>アプリ起動エラー | 過去問AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        <style>{ERROR_STYLES}</style>
      </head>
      <body>
        <main className="global-error-content">
          <span className="global-error-icon" aria-hidden="true"><AlertTriangle /></span>
          <h1 ref={headingRef} tabIndex={-1}>アプリ起動エラー</h1>
          <p>アプリを読み込めませんでした。再読み込みしてください。</p>
          {digest && <p className="global-error-digest">エラーID: {digest}</p>}
          <div className="global-error-actions">
            <button onClick={retry}><RefreshCw aria-hidden="true" />再読み込み</button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- This boundary replaces the root document and Next.js context. */}
            <a href="/"><HomeIcon aria-hidden="true" />トップへ移動</a>
          </div>
        </main>
      </body>
    </html>
  );
}
