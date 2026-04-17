"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Infinity, Zap } from "lucide-react";
import { setPremiumFlag } from "@/lib/storage/history";

export function PremiumUpsellDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const onActivate = () => {
    setPremiumFlag(true);
    onClose();
    window.location.reload();
  };
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2 text-sky-600 dark:text-sky-400">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold">本日の無料枠を使い切りました</span>
          </div>
          <DialogTitle>プレミアムなら AI 質問は無制限</DialogTitle>
          <DialogDescription>
            月300円（初期価格）で AI コパイロットの回数制限を撤廃、広告も非表示になります。
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <Infinity className="mt-0.5 h-4 w-4 text-sky-600" />
            <span>AI 質問 無制限（1分10回のソフトリミットのみ）</span>
          </li>
          <li className="flex items-start gap-2">
            <Zap className="mt-0.5 h-4 w-4 text-sky-600" />
            <span>高品質モデル（Gemini 2.5 Flash）</span>
          </li>
          <li className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 text-sky-600" />
            <span>広告非表示 / 午後AI採点・論文添削も開放（順次）</span>
          </li>
        </ul>
        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
          <Button variant="primary" size="lg" onClick={onActivate} className="flex-1">
            プレミアムにする（ベータ版: 決済未実装）
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            あとで
          </Button>
        </div>
        <p className="text-[11px] text-zinc-500">
          ※ フェーズ4で Stripe 決済を実装予定。現在はベータ期間中、ローカルフラグでの有効化です。
        </p>
      </DialogContent>
    </Dialog>
  );
}
