"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import type { ExamCode } from "@/lib/questions/types";

interface ExamCardDef {
  id: ExamCode;
  abbr: string;
  name: string;
  sub?: string;
}

const EXAMS: ExamCardDef[] = [
  { id: "ip", abbr: "IP", name: "ITパスポート" },
  { id: "sg", abbr: "SG", name: "セキュリティ", sub: "マネジメント" },
  { id: "fe", abbr: "FE", name: "基本情報", sub: "技術者" },
  { id: "ap", abbr: "AP", name: "応用情報", sub: "技術者" },
  { id: "sc", abbr: "SC", name: "情報処理", sub: "安全確保支援士" },
  { id: "nw", abbr: "NW", name: "ネットワーク", sub: "スペシャリスト" },
  { id: "db", abbr: "DB", name: "データベース", sub: "スペシャリスト" },
  { id: "es", abbr: "ES", name: "エンベデッド", sub: "システム" },
  { id: "st", abbr: "ST", name: "ITストラテジスト" },
  { id: "sa", abbr: "SA", name: "システム", sub: "アーキテクト" },
  { id: "pm", abbr: "PM", name: "プロジェクト", sub: "マネージャ" },
  { id: "sm", abbr: "SM", name: "ITサービス", sub: "マネージャ" },
  { id: "au", abbr: "AU", name: "システム監査", sub: "技術者" },
];

interface Props {
  trigger: React.ReactNode;
  onClose?: () => void;
}

export function ExamSelectorDialog({ trigger, onClose }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) onClose?.();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <div>
          <DialogTitle className="text-lg font-bold">
            どの試験区分の過去問を解きますか？
          </DialogTitle>
          <DialogDescription className="mt-1 text-xs text-muted-foreground">
            13区分から選択 — 選んだ試験のランダム出題が始まります
          </DialogDescription>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {EXAMS.map((e) => (
            <Link
              key={e.id}
              href={`/quiz?mode=random&exam=${e.id}`}
              onClick={() => setOpen(false)}
              className="group flex flex-col gap-0.5 rounded-xl border border-border bg-card p-2.5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-primary px-1.5 py-0.5 text-xs font-bold text-primary-foreground">
                  {e.abbr}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="text-xs font-semibold leading-tight text-foreground">
                {e.name}
              </p>
              {e.sub && (
                <p className="text-[10px] leading-tight text-muted-foreground">
                  {e.sub}
                </p>
              )}
            </Link>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          試験区分はあとから切り替えられます。
        </p>
      </DialogContent>
    </Dialog>
  );
}
