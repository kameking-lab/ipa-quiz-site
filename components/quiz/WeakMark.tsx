"use client";

import { useSyncExternalStore } from "react";
import { Star } from "lucide-react";
import { createHistoryStore } from "@/lib/storage/history";
import { isReferenceOnlyQuestionId } from "@/lib/questions/assessment";

const history = createHistoryStore();
function subscribe(refresh: () => void) {
  window.addEventListener("study-plan:changed", refresh);
  window.addEventListener("storage", refresh);
  return () => {
    window.removeEventListener("study-plan:changed", refresh);
    window.removeEventListener("storage", refresh);
  };
}

const noSubscription = () => () => {};

export function WeakMark({ id, marked }: { id: string; marked?: boolean }) {
  const starred = useSyncExternalStore(marked === undefined ? subscribe : noSubscription,
    () => marked ?? history.isStarred(id), () => marked ?? false);
  if (isReferenceOnlyQuestionId(id)) return null;
  return <div className="flex flex-wrap items-center gap-x-3">
    <button type="button" aria-pressed={starred} onClick={() => history.toggleStar(id)}
      className="study-focus inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-sm font-medium text-primary">
      <Star aria-hidden="true" className={starred ? "size-4 fill-current" : "size-4"} />
      {starred ? "苦手の印を外す" : "苦手の印を付ける"}
    </button>
    {marked === undefined && <span className="text-xs text-muted-foreground">印はこの端末に保存されます。</span>}
  </div>;
}
