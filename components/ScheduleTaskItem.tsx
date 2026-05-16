"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, Circle, FileText, GraduationCap, ListChecks, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TaskItem } from "@/lib/study-plan/types";

function TaskIcon({ kind, className }: { kind: TaskItem["kind"]; className?: string }) {
  switch (kind) {
    case "questions":
      return <ListChecks className={className} aria-hidden />;
    case "blog":
      return <BookOpen className={className} aria-hidden />;
    case "essay":
      return <FileText className={className} aria-hidden />;
    case "mock":
      return <GraduationCap className={className} aria-hidden />;
    case "review":
      return <Repeat className={className} aria-hidden />;
  }
}

interface Props {
  task: TaskItem;
  done: boolean;
  onToggle: (next: boolean) => void;
}

export function ScheduleTaskItem({ task, done, onToggle }: Props) {
  const content = (
    <div
      className={cn(
        "flex flex-1 items-start gap-2 rounded-lg px-2 py-1.5 transition",
        done && "opacity-60",
      )}
    >
      <TaskIcon
        kind={task.kind}
        className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
      />
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "text-sm font-medium leading-tight",
            done && "line-through",
          )}
        >
          {task.title}
        </div>
        {task.description && (
          <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
            {task.description}
          </p>
        )}
        <div className="mt-1 text-[11px] text-muted-foreground">
          {task.estimatedMinutes} 分目安
        </div>
      </div>
    </div>
  );

  return (
    <li className="flex items-start gap-2">
      <button
        type="button"
        onClick={() => onToggle(!done)}
        className="mt-1.5 shrink-0 text-muted-foreground hover:text-primary"
        aria-label={done ? "未完了にする" : "完了にする"}
        aria-pressed={done}
      >
        {done ? (
          <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
        ) : (
          <Circle className="h-5 w-5" aria-hidden />
        )}
      </button>
      {task.link ? (
        <Link
          href={task.link}
          className="flex flex-1 rounded-lg hover:bg-muted"
          aria-label={`${task.title}（リンクを開く）`}
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </li>
  );
}
