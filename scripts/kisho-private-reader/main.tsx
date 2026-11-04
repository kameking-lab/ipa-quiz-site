import React from "react";
import { createRoot } from "react-dom/client";
import { KishoPrivateReader } from "@/components/kisho-private/KishoPrivateReader";
import { KISHO_SOURCE_MANIFEST } from "@/lib/kisho-private";
import type { ImageAsset } from "@/lib/kisho-private/types";

const root = createRoot(document.getElementById("root")!);
const urls = new Map<string, string>();

async function openLocalReader() {
  try {
    // The server only serves IDs present in the private manifest, from a 127.0.0.1 endpoint.
    await Promise.all(KISHO_SOURCE_MANIFEST.assets.map(async (asset: ImageAsset) => {
      const response = await fetch(`/__kisho_asset/${encodeURIComponent(asset.assetId)}`);
      if (!response.ok) throw new Error(`画像を取得できません: ${asset.assetId}`);
      const blob = await response.blob();
      if (blob.type !== "image/png") throw new Error(`PNG形式ではありません: ${asset.assetId}`);
      urls.set(asset.assetId, URL.createObjectURL(blob));
    }));
    root.render(<KishoPrivateReader resolvePrivateImage={(asset) => urls.get(asset.assetId) ?? ""} />);
  } catch (error) {
    root.render(<main role="alert" style={{ padding: "1rem" }}>{error instanceof Error ? error.message : "画像を読み込めません。"}</main>);
  }
}

window.addEventListener("pagehide", () => { for (const url of urls.values()) URL.revokeObjectURL(url); });
void openLocalReader();
