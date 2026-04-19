"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles } from "lucide-react";

export function PremiumUpsellDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-semibold">本日の利用上限に達しました</span>
          </div>
          <DialogTitle>AI コパイロットを使い切りました</DialogTitle>
          <DialogDescription>
            無料プランは AI コパイロット 1 日 50 回までご利用いただけます。
            JST 0:00 にリセットされます。
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm dark:border-sky-900/60 dark:bg-sky-950/30">
          <div className="mb-1 flex items-center gap-2 font-semibold text-sky-800 dark:text-sky-200">
            <Sparkles className="h-4 w-4" />
            Premium プラン（近日公開 / 月980円）
          </div>
          <ul className="ml-5 list-disc space-y-0.5 text-xs text-sky-900/80 dark:text-sky-100/80">
            <li>AI コパイロット 1 日 500 回</li>
            <li>詳細応答・マルチターン会話・類題生成</li>
            <li>誤答パターン分析・学習プラン作成</li>
            <li>広告非表示・クラウド履歴同期</li>
          </ul>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose} className="sm:order-1">
            閉じる
          </Button>
          <Button variant="primary" asChild className="sm:order-2">
            <Link href="/pricing">プランを比較する</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
