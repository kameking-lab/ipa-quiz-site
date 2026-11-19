"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MASCOTS = [
  "01-fists",
  "02-book-and-flame",
  "03-pen",
  "04-megaphone",
  "05-book-lift",
  "06-desk",
];
const LAST_MASCOT_KEY = "ipa-quiz:billing-mascot:v1";

export function MonthlyMascot() {
  const [mascot, setMascot] = useState<string>();

  useEffect(() => {
    // Run after hydration. Cancel the pending draw if the page closes first.
    const frame = requestAnimationFrame(() => {
      let previous: string | null = null;
      try {
        previous = sessionStorage.getItem(LAST_MASCOT_KEY);
      } catch { /* The illustration still works when storage is unavailable. */ }

      const choices = MASCOTS.filter((name) => name !== previous);
      const selected = choices[Math.floor(Math.random() * choices.length)];
      setMascot(selected);
      try {
        sessionStorage.setItem(LAST_MASCOT_KEY, selected);
      } catch { /* Remembering the previous draw is optional. */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="size-24 shrink-0 min-[360px]:size-28 sm:size-32" aria-hidden="true">
      {mascot && (
        <Image
          src={`/images/billing/${mascot}-160.webp`}
          alt=""
          width={160}
          height={160}
          className="size-full object-contain"
          loading="eager"
          unoptimized
        />
      )}
    </div>
  );
}
