"use client";

import { useEffect, useState } from "react";
import { loadPlanCatalog, type CatalogQuestion } from "./client";

export function usePlanCatalog(exam: string) {
  const [revision, setRevision] = useState(0);
  const [result, setResult] = useState<{ exam: string; revision: number; questions: CatalogQuestion[] | null }>();
  useEffect(() => {
    if (!exam) return;
    let pending: AbortController | undefined;
    const load = () => {
      pending?.abort();
      const controller = new AbortController();
      pending = controller;
      void loadPlanCatalog(exam, controller.signal).then(questions => {
        if (!controller.signal.aborted) setResult({ exam, revision, questions });
      }, () => {
        if (!controller.signal.aborted) setResult({ exam, revision, questions: null });
      });
    };
    load();
    window.addEventListener("focus", load);
    return () => { pending?.abort(); window.removeEventListener("focus", load); };
  }, [exam, revision]);
  return {
    questions: result?.exam === exam && result.revision === revision ? result.questions : undefined,
    reload: () => setRevision(r => r + 1),
  };
}
