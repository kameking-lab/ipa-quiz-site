"use client";

import * as React from "react";
import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPremiumFlag } from "@/lib/storage/history";

interface Props {
  /** Title shown above the upsell card. */
  featureTitle: string;
  /** Short pitch describing why the user wants this feature. */
  featurePitch: string;
  children: React.ReactNode;
}

export function PremiumGate({ featureTitle, featurePitch, children }: Props) {
  const [ready, setReady] = React.useState(false);
  const [premium, setPremium] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPremium(getPremiumFlag());
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="h-32 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" aria-hidden />
    );
  }

  if (premium) return <>{children}</>;

  return (
    <Card className="border-sky-300 bg-gradient-to-br from-sky-50 to-white dark:border-sky-700/60 dark:from-sky-950/30 dark:to-zinc-950">
      <CardContent className="flex flex-col items-start gap-4 pt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900/60 dark:text-sky-200">
          <Lock className="h-3.5 w-3.5" />
          Premium 限定機能
        </div>
        <div>
          <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            <Sparkles className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            {featureTitle}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {featurePitch}
          </p>
        </div>
        <Button asChild variant="primary">
          <Link href="/pricing">Premium で解放する</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
