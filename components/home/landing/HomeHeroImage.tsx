"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_HERO, selectHeroVariant, type HeroVariant } from "./heroVariants";

// 元画像は 1402×1122・約 380KB。画面幅に合わせて縮小・AVIF/WebP 化した版を配る。
const HERO_IMAGE = { width: 1402, height: 1122, sizes: "(max-width: 767px) 100vw, 55vw" } as const;

export function HomeHeroImage() {
  const [variant, setVariant] = useState(DEFAULT_HERO);
  const selected = useRef<HeroVariant | null>(null);

  useEffect(() => {
    // Preserve the same selection if React replays effects in development.
    selected.current ??= selectHeroVariant(Math.random());
    const next = selected.current;
    if (next === DEFAULT_HERO) return;

    let active = true;
    const image = new window.Image();
    image.onload = () => {
      const decoded = typeof image.decode === "function" ? image.decode() : Promise.resolve();
      void decoded.then(() => {
        if (active) setVariant(next);
      }).catch(() => {
        // Keep the initial illustration when decoding fails.
      });
    };
    image.onerror = () => {
      // Keep the initial illustration when loading fails.
    };
    // 下の <Image> と同じ URL・同じ候補（srcset/sizes）で先読みする。URL が 1 文字でも
    // 違うと（例: ?dpl= の有無）同じ絵をもう一度ダウンロードしてしまう。
    const { props } = getImageProps({ ...HERO_IMAGE, src: next.src, alt: next.alt });
    if (props.sizes) image.sizes = props.sizes;
    if (props.srcSet) image.srcset = props.srcSet;
    image.src = props.src;
    return () => {
      active = false;
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return <Image src={variant.src} {...HERO_IMAGE} alt={variant.alt} preload />;
}
