"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  active: boolean;
  level: "small" | "big";
  onDone: () => void;
}

const SMALL_PARTICLE_COUNT = 14;
const BIG_PARTICLE_COUNT = 28;

const PALETTE_SMALL = ["#fbbf24", "#f97316", "#ef4444", "#eab308"];
const PALETTE_BIG = [
  "#fbbf24",
  "#f97316",
  "#ef4444",
  "#10b981",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
];

export function FireworksBurst({ active, level, onDone }: Props) {
  const count = level === "big" ? BIG_PARTICLE_COUNT : SMALL_PARTICLE_COUNT;
  const palette = level === "big" ? PALETTE_BIG : PALETTE_SMALL;
  const radius = level === "big" ? 160 : 90;
  const duration = level === "big" ? 0.95 : 0.7;

  const particles = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const dist = radius * (0.8 + Math.random() * 0.4);
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          color: palette[i % palette.length],
          size: level === "big" ? 8 + Math.random() * 4 : 5 + Math.random() * 3,
        };
      }),
    [count, radius, palette, level],
  );

  // Hold onDone in a ref so the auto-clear timer depends only on `active` and
  // `duration`, not on onDone's identity. The parent (QuizPlayer) re-renders
  // every second via its elapsed-time interval and passes a fresh inline
  // onDone={() => setBurst(null)} each tick. Keying the effect on onDone
  // restarted the timer every ~1000ms; the "big" burst timer (0.95s*1000+100 =
  // 1050ms) is longer than that interval, so it was reset before firing and
  // never cleared the burst — leaving a perpetual invisible overlay and a
  // self-resetting timer for the rest of the session (same stale-closure class
  // as the AchievementToast auto-dismiss fix).
  const onDoneRef = React.useRef(onDone);
  React.useEffect(() => {
    onDoneRef.current = onDone;
  });

  React.useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => onDoneRef.current(), duration * 1000 + 100);
    return () => window.clearTimeout(t);
  }, [active, duration]);

  return (
    <AnimatePresence>
      {active && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center"
        >
          <div className="relative h-0 w-0">
            {level === "big" && (
              <motion.div
                initial={{ scale: 0, opacity: 0.7 }}
                animate={{ scale: 3.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration * 0.8, ease: "easeOut" }}
                className="absolute -inset-20 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 blur-2xl"
              />
            )}
            {particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: 0,
                  scale: 0.4,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  width: p.size,
                  height: p.size,
                  borderRadius: 9999,
                  backgroundColor: p.color,
                  boxShadow: `0 0 ${p.size * 1.5}px ${p.color}`,
                  willChange: "transform, opacity",
                }}
              />
            ))}
            {level === "big" && (
              <motion.div
                initial={{ y: 0, opacity: 0, scale: 0.6 }}
                animate={{ y: -40, opacity: [0, 1, 0], scale: 1 }}
                transition={{ duration: duration * 1.1, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg"
              >
                🎆 5連続正解！
              </motion.div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
