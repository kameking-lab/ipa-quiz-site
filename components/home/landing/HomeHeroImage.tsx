"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_HERO, selectHeroVariant, type HeroVariant } from "./heroVariants";

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
    image.src = next.src;
    return () => {
      active = false;
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return <Image src={variant.src} width={1402} height={1122}
    sizes="(max-width: 767px) 100vw, 55vw" alt={variant.alt} preload unoptimized />;
}
