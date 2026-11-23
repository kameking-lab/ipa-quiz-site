"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { exportBookmarks, getAllBookmarks, importBookmarks } from "@/lib/storage/bookmarks";

export function BookmarkDataControls() {
  const input = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  function downloadBookmarks() {
    if (getAllBookmarks().length === 0) {
      setMessage("保存されたブックマークはありません。");
      return;
    }
    const url = URL.createObjectURL(new Blob([exportBookmarks()], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "ipa-bookmarks-" + new Date().toISOString().slice(0, 10) + ".json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function uploadBookmarks(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    try {
      setMessage(importBookmarks(await file.text())
        ? "ブックマークを読み込みました。"
        : "ブックマークのJSONファイルを選んでください。");
    } catch {
      setMessage("ファイルを読み込めませんでした。");
    }
  }

  return (
    <div className="space-y-2 border-t border-border py-3">
      <h3 className="text-sm font-medium">保存済みブックマーク</h3>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={downloadBookmarks}>書き出す</Button>
        <Button variant="outline" onClick={() => input.current?.click()}>読み込む</Button>
      </div>
      <input ref={input} type="file" accept=".json" hidden onChange={uploadBookmarks} />
      <p role="status" className="text-xs text-muted-foreground">{message}</p>
    </div>
  );
}
