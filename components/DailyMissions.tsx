"use client";

import * as React from "react";
import { Gift, Sparkles } from "lucide-react";
import {
  MISSIONS,
  readMissions,
  claimMission,
  type MissionProgress,
} from "@/lib/gamification/missions";
import { awardXp } from "@/lib/gamification/xp";

export function DailyMissions() {
  const [state, setState] = React.useState<MissionProgress | null>(null);
  const [justClaimed, setJustClaimed] = React.useState<Record<string, number>>({});

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readMissions());
    const handler = () => setState(readMissions());
    window.addEventListener("storage", handler);
    window.addEventListener("focus", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("focus", handler);
    };
  }, []);

  if (!state) {
    return (
      <div className="h-32 animate-pulse rounded-2xl border border-border bg-muted/40" />
    );
  }

  function handleClaim(id: string) {
    const r = claimMission(id as keyof typeof MISSIONS);
    if (r.claimed) {
      awardXp(r.xp);
      setJustClaimed((p) => ({ ...p, [id]: r.xp }));
      setState(readMissions());
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Gift className="h-4 w-4 text-violet-500" />
          今日のミッション
        </h3>
        <span className="text-xs text-muted-foreground">{state.date}</span>
      </div>
      <ul className="space-y-2">
        {state.missions.map((id) => {
          const def = MISSIONS[id];
          const cur = Math.min(state.progress[id] ?? 0, def.target);
          const done = cur >= def.target;
          const claimed = state.claimed[id];
          const pct = Math.round((cur / def.target) * 100);
          return (
            <li
              key={id}
              className="rounded-xl border border-border bg-background p-3"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{def.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{def.title}</p>
                  <p className="text-xs text-muted-foreground">{def.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={
                          "h-full transition-all " +
                          (done ? "bg-emerald-500" : "bg-violet-500")
                        }
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {cur}/{def.target}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  {claimed ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      <Sparkles className="h-3 w-3" />
                      受取済
                    </span>
                  ) : done ? (
                    <button
                      onClick={() => handleClaim(id)}
                      className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 text-xs font-medium text-white shadow-sm hover:brightness-105"
                    >
                      +{def.xpReward}XP受取
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground">+{def.xpReward}XP</span>
                  )}
                </div>
              </div>
              {justClaimed[id] && (
                <p className="mt-2 text-xs text-violet-600 dark:text-violet-400">
                  {justClaimed[id]} XP を獲得しました！
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
