"use client";

import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studyPlanCalendar } from "@/lib/study-plan/calendar";
import { japanDate } from "@/lib/home/featured-exams";
import type { PacePlan } from "@/lib/study-plan/pace";
import type { ExamScheduleSession } from "@/lib/study-plan/schedule";

export function PlanCalendarButton({ plan, name, today, sessions, loading }: {
  plan: PacePlan; name: string; today: string; sessions?: readonly ExamScheduleSession[]; loading?: boolean;
}) {
  if (!plan.examDate || plan.examDate < today) return null;
  return <Button variant="outline" className="min-h-11" disabled={loading} onClick={() => {
    const now = new Date();
    const content = studyPlanCalendar(plan, name, location.origin, japanDate(now), now, sessions);
    if (!content) return;
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "kakomon-study-plan.ics";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }}><CalendarPlus aria-hidden="true" className="size-4" />カレンダーに追加（.ics）</Button>;
}
