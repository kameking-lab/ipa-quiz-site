"use client";
import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/** A 44px hit area with the compact rail centered inside it. */
export function SettingsSwitch({ className, ...props }: React.ComponentProps<typeof Switch>) {
  return <Switch {...props} className={cn(
    "relative h-11 w-11 border-0 bg-transparent data-[state=checked]:bg-transparent data-[state=unchecked]:bg-transparent dark:data-[state=unchecked]:bg-transparent before:absolute before:inset-x-0 before:top-2.5 before:h-6 before:rounded-full before:bg-zinc-300 dark:before:bg-zinc-700 data-[state=checked]:before:bg-primary dark:data-[state=checked]:before:bg-primary [&>span]:relative [&>span]:ml-0.5",
    className,
  )} />;
}
