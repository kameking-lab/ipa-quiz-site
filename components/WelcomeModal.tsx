"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EXAM_LABELS } from "@/lib/utils";
import { ChevronRight, CheckCircle2 } from "lucide-react";

const LS_KEY = "ipa-quiz:onboarded:v1";

type ExamCode = keyof typeof EXAM_LABELS;

const EXAM_DIFFICULTY: Record<string, { level: number; label: string }> = {
  ip:  { level: 1, label: "入門" },
  sg:  { level: 2, label: "初級" },
  fe:  { level: 2, label: "初級" },
  ap:  { level: 3, label: "中級" },
  sc:  { level: 4, label: "上級" },
  nw:  { level: 4, label: "上級" },
  db:  { level: 4, label: "上級" },
  es:  { level: 4, label: "上級" },
  st:  { level: 5, label: "最上級" },
  sa:  { level: 5, label: "最上級" },
  pm:  { level: 5, label: "最上級" },
  sm:  { level: 5, label: "最上級" },
  au:  { level: 5, label: "最上級" },
};

const POPULAR_EXAMS: ExamCode[] = ["ip", "fe", "ap", "sc", "nw"];

const STEPS = [
  { num: 1, title: "試験区分を選ぶ", desc: "13区分から目標の試験を選択" },
  { num: 2, title: "お試し3問を解く", desc: "登録不要で今すぐ体験" },
  { num: 3, title: "AIと一緒に復習", desc: "分からない点はAIに質問" },
];

export function WelcomeModal() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<"guide" | "select">("guide");
  const [selectedExam, setSelectedExam] = React.useState<ExamCode | null>(null);

  React.useEffect(() => {
    const done = localStorage.getItem(LS_KEY);
    if (!done) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(LS_KEY, "1");
    setOpen(false);
  };

  const handleStartTrial = () => {
    const exam = selectedExam ?? "ap";
    localStorage.setItem(LS_KEY, "1");
    setOpen(false);
    router.push(`/quiz?mode=random&exam=${exam}&limit=3`);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <DialogContent className="max-w-md">
        {step === "guide" ? (
          <>
            <DialogHeader>
              <div className="mb-1 flex items-center gap-2">
                <Badge variant="success">初回ガイド</Badge>
                <Badge variant="outline">登録不要</Badge>
              </div>
              <DialogTitle className="text-xl">IPA Quizへようこそ！</DialogTitle>
              <DialogDescription>
                AIコパイロット付きの無料過去問学習サービスです。
                3ステップでさっそく始めましょう。
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              {STEPS.map((s) => (
                <div key={s.num} className="flex items-start gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white">
                    {s.num}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{s.title}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="primary" className="w-full" onClick={() => setStep("select")}>
                試験区分を選ぶ <ChevronRight className="h-4 w-4" />
              </Button>
              <button
                type="button"
                onClick={handleDismiss}
                className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                あとで見る
              </button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>目標の試験を選んでください</DialogTitle>
              <DialogDescription>
                選択した試験の問題3問をお試し体験できます（登録不要）
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(Object.keys(EXAM_LABELS) as ExamCode[]).map((code) => {
                const diff = EXAM_DIFFICULTY[code] ?? { level: 3, label: "中級" };
                const isSelected = selectedExam === code;
                const isPopular = POPULAR_EXAMS.includes(code);
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setSelectedExam(code)}
                    className={`relative rounded-xl border px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? "border-sky-500 bg-sky-50 dark:border-sky-600 dark:bg-sky-950/30"
                        : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                    }`}
                  >
                    {isPopular && (
                      <span className="absolute right-2 top-2 rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                        人気
                      </span>
                    )}
                    <div className="flex items-center gap-1.5">
                      {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />}
                      <span className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400">
                        {code}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-zinc-800 dark:text-zinc-100 leading-snug">
                      {EXAM_LABELS[code]}
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-3 rounded-full ${i < diff.level ? "bg-sky-500" : "bg-zinc-200 dark:bg-zinc-700"}`}
                        />
                      ))}
                      <span className="ml-1 text-[10px] text-zinc-400">{diff.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={handleStartTrial}
                disabled={!selectedExam}
              >
                {selectedExam
                  ? `${EXAM_LABELS[selectedExam]}を3問体験する`
                  : "試験を選んでください"}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setStep("guide")}>
                戻る
              </Button>
            </div>

            <p className="text-center text-[11px] text-zinc-400">
              登録不要・無料でお試しいただけます
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
