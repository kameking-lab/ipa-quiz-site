"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

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
          <DialogTitle>AI コパイロットの公平利用上限</DialogTitle>
          <DialogDescription>
            サービスを安定して提供するため、1日あたりの利用上限を設けています。
            JST 0:00 にリセットされます。
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
