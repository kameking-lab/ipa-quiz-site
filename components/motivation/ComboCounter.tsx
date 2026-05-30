"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";

interface Props {
  combo: number;
}

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

// framer-motion の animate は JS 駆動で、globals.css の prefers-reduced-motion
// 抑制(CSS animation/transition のみ)では止まらない。reduce 指定時は spring の
// 入場アニメを使わずバッジを即時表示する(情報は保持しつつ動きだけ抑制・WCAG 2.3.3)。
// ※同型フックが FireworksBurst にも在り、日中に共有フック化が候補。
function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = React.useState<boolean>(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia?.(REDUCE_QUERY).matches,
  );
  React.useEffect(() => {
    const mq = window.matchMedia?.(REDUCE_QUERY);
    if (!mq) return;
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

export function ComboCounter({ combo }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  if (combo < 2) return null;
  const tone =
    combo >= 5
      ? "from-amber-400 via-orange-500 to-rose-500"
      : combo >= 3
        ? "from-amber-300 via-orange-400 to-orange-500"
        : "from-sky-300 to-sky-500";

  const className = `inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${tone} px-2.5 py-1 text-xs font-bold text-white shadow`;
  const content = (
    <>
      <Flame className="h-3 w-3" aria-hidden="true" />
      <span>{combo} 連続！</span>
    </>
  );

  if (reduceMotion) {
    return <div className={className}>{content}</div>;
  }

  return (
    <AnimatePresence>
      <motion.div
        key={combo}
        initial={{ scale: 0.6, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        className={className}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}
