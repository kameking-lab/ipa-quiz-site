"use client";

import type { OwnershipState, SyncAccount } from "@/lib/sync/ownership";

export function SyncOwnershipNotice({ account, ownership, confirmed, onConfirm }: {
  account: SyncAccount;
  ownership: OwnershipState;
  confirmed: boolean;
  onConfirm: (confirmed: boolean) => void;
}) {
  if (ownership === "matching") return null;
  if (ownership === "different") return (
    <p role="status" className="text-xs leading-relaxed text-amber-700 dark:text-amber-400">
      この端末の保存先を現在のアカウントとして確認できないため、同期を保留しています。端末の記録は残っています。
    </p>
  );
  return (
    <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-3 text-xs leading-relaxed">
      <p>引継ぎは任意です。同期しなくても演習を続けられます。ペットや報酬はこの同期の対象に含まれません。</p>
      <label className="flex items-start gap-2">
        <input type="checkbox" className="mt-0.5 shrink-0" checked={confirmed} onChange={(event) => onConfirm(event.target.checked)} />
        <span>
          このブラウザの学習履歴・ブックマーク・カスタムタグ・学習計画が自分の記録であることを確認し、
          <strong className="break-all">{account.label}</strong> へ引き継ぎます。このブラウザの以後の記録も、ログアウト中の追加分を含め、この保存先への自動同期の対象になります。
        </span>
      </label>
    </div>
  );
}
