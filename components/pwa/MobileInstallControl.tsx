"use client";

import { useContext, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileInstallContext, type InstallPhase } from "./MobileInstallProvider";

const MESSAGES: Partial<Record<InstallPhase, string>> = {
  prompting: "ブラウザーの追加画面で操作してください。",
  accepted: "追加操作を受け付けました。ホーム画面に表示されたか確認してください。",
  dismissed: "追加をキャンセルしました。引き続きブラウザーで利用できます。",
  error: "追加画面を開けませんでした。下の手順をご確認ください。",
  installed: "このブラウザーからの追加完了を確認しました。",
};

export function MobileInstallControl() {
  const state = useContext(MobileInstallContext);
  if (!state) throw new Error("MobileInstallControl requires MobileInstallProvider");
  const { ready, os, standalone, available, phase, install, beforeCompletion } = state;
  const [guideOpen, setGuideOpen] = useState(false);
  const [selectedOs, setSelectedOs] = useState<"iphone" | "android" | null>(null);
  const guideId = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const guideOrigin = useRef<HTMLButtonElement | null>(null);
  const statusHeading = useRef<HTMLParagraphElement>(null);
  const restoreAfterCompletion = useRef(false);
  const mounted = useRef(false);
  const done = standalone || phase === "installed";
  const device = selectedOs ?? (os === "android" ? "android" : "iphone");

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useEffect(() => beforeCompletion(() => {
    restoreAfterCompletion.current = Boolean(root.current?.contains(document.activeElement));
  }), [beforeCompletion]);
  useEffect(() => {
    if (!done) return;
    setGuideOpen(false);
    if (restoreAfterCompletion.current) {
      restoreAfterCompletion.current = false;
      if (root.current?.getClientRects().length) statusHeading.current?.focus();
    }
  }, [done]);

  function closeGuide() {
    setGuideOpen(false);
    const origin = guideOrigin.current;
    if (origin?.isConnected && !origin.disabled && origin.getClientRects().length) origin.focus();
    else if (trigger.current && !trigger.current.disabled) trigger.current.focus();
    else statusHeading.current?.focus();
  }
  async function addToHome() {
    if (!available) { setGuideOpen(true); return; }
    const result = await install();
    if (mounted.current && (result === "error" || result === "unavailable")) setGuideOpen(true);
  }

  if (!ready) return null;
  return (
    <div ref={root} onKeyDown={(event) => {
      if (guideOpen && event.key === "Escape") { event.preventDefault(); closeGuide(); }
    }}>
      <p ref={statusHeading} tabIndex={-1} className="text-sm text-muted-foreground outline-none" aria-live="polite">
        {standalone ? "アプリとして利用中です。" : done ? MESSAGES.installed
          : "スマートフォンのホーム画面からすぐ開けます。追加しなくてもブラウザーで利用できます。"}
      </p>
      {!done && <>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button ref={trigger} type="button" variant="outline" className="min-h-11 w-full whitespace-normal sm:w-auto"
            disabled={phase === "prompting"} onClick={(event) => {
              guideOrigin.current = event.currentTarget;
              void addToHome();
            }}
            aria-expanded={available ? undefined : guideOpen} aria-controls={available ? undefined : guideId}>
            ホーム画面に追加
          </Button>
          {available && <Button type="button" variant="ghost" className="min-h-11 whitespace-normal"
            aria-expanded={guideOpen} aria-controls={guideId} onClick={(event) => {
              guideOrigin.current = event.currentTarget;
              setGuideOpen(true);
            }}>
            追加方法を見る
          </Button>}
        </div>
        <p role="status" className="mt-2 text-sm text-muted-foreground">{MESSAGES[phase]}</p>
        {guideOpen && <div id={guideId} className="mt-3 space-y-3 rounded-xl border border-border bg-background p-4">
          <h3 className="font-semibold">スマートフォンでの追加方法</h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label="手順を見る端末">
            <Button type="button" variant={device === "iphone" ? "soft" : "outline"} className="min-h-11"
              aria-pressed={device === "iphone"} onClick={() => setSelectedOs("iphone")}>iPhone</Button>
            <Button type="button" variant={device === "android" ? "soft" : "outline"} className="min-h-11"
              aria-pressed={device === "android"} onClick={() => setSelectedOs("android")}>Android</Button>
          </div>
          {device === "iphone" ? <>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
              <li>Safariでこのサイトを開き、共有メニューを開きます。レイアウトによってはページメニューから「共有」を選びます。</li>
              <li>「ホーム画面に追加」を選びます。</li>
              <li>「Webアプリとして開く」が表示される場合はオンにし、「追加」を押します。</li>
            </ol>
            <a href="https://support.apple.com/ja-jp/guide/iphone/iphea86e5236/ios" target="_blank" rel="noopener noreferrer"
              className="inline-block py-2 text-sm text-primary underline">Appleの追加手順（外部）</a>
          </> : <>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
              <li>AndroidのChromeでこのサイトを開き、ブラウザーのメニューを開きます。</li>
              <li>「インストールしてショートカットを作成」から「インストール」を選びます。版によっては「ホーム画面に追加」などの名前です。</li>
              <li>表示された画面の案内に従って追加します。</li>
            </ol>
            <a href="https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=ja" target="_blank" rel="noopener noreferrer"
              className="inline-block py-2 text-sm text-primary underline">Chromeの追加手順（外部）</a>
          </>}
          <p className="text-sm leading-relaxed text-muted-foreground">
            項目名や追加できる機能はOS・ブラウザーで異なります。アプリ内ブラウザーなどで項目が見つからない場合は、通常のSafariやChromeでも確認してください。
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            追加後にログインが必要になる場合があります。今の画面はそのままにして、追加後の動作を確認してください。別ブラウザーや追加後の起動への回答・履歴の引継ぎは保証されません。通知の許可は別の操作です。
          </p>
          <Button type="button" variant="outline" className="min-h-11 w-full whitespace-normal sm:w-auto" onClick={closeGuide}>
            追加方法を閉じる
          </Button>
        </div>}
      </>}
    </div>
  );
}
