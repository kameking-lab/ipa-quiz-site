"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";

interface Props {
  combo: number;
}

export function ComboCounter({ combo }: Props) {
  if (combo < 2) return null;
  const tone =
    combo >= 5
      ? "from-amber-400 via-orange-500 to-rose-500"
      : combo >= 3
        ? "from-amber-300 via-orange-400 to-orange-500"
        : "from-sky-300 to-sky-500";

  return (
    <AnimatePresence>
      <motion.div
        key={combo}
        initial={{ scale: 0.6, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${tone} px-2.5 py-1 text-xs font-bold text-white shadow`}
      >
        <Flame className="h-3 w-3" aria-hidden="true" />
        <span>{combo} 連続！</span>
      </motion.div>
    </AnimatePresence>
  );
}
