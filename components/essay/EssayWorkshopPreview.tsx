"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { WORKSHOP_QUESTIONS } from "@/data/questions/essay/workshop";
import { countEssayCharacters, SECTION_KEYS, WORKSHOP_RELEASE_DEFAULTS, type EssayDraft } from "@/lib/essay/workshop";
import { adjustedSamples, planningExcerpt, sampleExcerpt, sampleSentenceChanges, shortCostFollowUp, shortSampleInterview, templateSample } from "@/lib/essay/workshop-sample";
import { LS_KEYS } from "@/lib/storage/keys";

const questions = WORKSHOP_QUESTIONS.pm.filter(({ id }) => WORKSHOP_RELEASE_DEFAULTS.variantIds.includes(id));
const costQuestion = "pm-2024-q1";
const previewChange = "essay-workshop-preview:change";
const panel = "rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900";
const revision = "rounded bg-amber-100 text-amber-950 underline decoration-dotted underline-offset-4 dark:bg-amber-900 dark:text-amber-50";
const revisedParagraph = "rounded-r-lg border-l-2 border-amber-400 bg-amber-50/75 p-3 dark:border-amber-600 dark:bg-amber-950/50";

let tabPosition: string | undefined;
let costReadInMemory = false;

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === LS_KEYS.essayWorkshopPreviewCostRead || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(previewChange, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(previewChange, listener);
  };
}

function readStorage(storage: "sessionStorage" | "localStorage", key: string) {
  try {
    return window[storage].getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage: "sessionStorage" | "localStorage", key: string, value: string) {
  try {
    window[storage].setItem(key, value);
  } catch {
    // The current tab can still read the sample without browser storage.
  }
}

function getPosition() {
  const [lastPosition, legacyCostRead] = (readStorage("localStorage", LS_KEYS.essayWorkshopPreview) ?? "0").split("/");
  tabPosition ??= readStorage("sessionStorage", LS_KEYS.essayWorkshopPreview) ?? lastPosition;
  const costRead = costReadInMemory || legacyCostRead || readStorage("localStorage", LS_KEYS.essayWorkshopPreviewCostRead);
  return costRead ? tabPosition + "/cost" : tabPosition;
}

function savePosition(position: string, costRead: boolean) {
  tabPosition = position;
  if (costRead) {
    costReadInMemory = true;
    writeStorage("localStorage", LS_KEYS.essayWorkshopPreviewCostRead, "1");
  }
  writeStorage("sessionStorage", LS_KEYS.essayWorkshopPreview, position);
  writeStorage("localStorage", LS_KEYS.essayWorkshopPreview, position);
  window.dispatchEvent(new Event(previewChange));
}

function getServerPosition() {
  return "0";
}

function labelForQuestion(question: (typeof questions)[number]) {
  return `${question.year}年度 問${question.number}`;
}

function Answers({ turns, compact = false }: { turns: readonly { prompt: string; answer: string }[]; compact?: boolean }) {
  return (
    <dl className={compact ? "grid gap-x-4 gap-y-2 text-[13px] leading-snug sm:grid-cols-2 sm:gap-y-3 sm:text-sm" : "space-y-4 text-sm leading-relaxed"}>
      {turns.map(({ prompt, answer }) => (
        <div key={prompt}>
          <dt className="font-semibold">{prompt}</dt>
          <dd className={compact ? "mt-0.5 text-slate-700 dark:text-slate-200" : "mt-1.5 rounded-xl bg-blue-50 px-3 py-2.5 text-slate-800 dark:bg-blue-950/70 dark:text-slate-200"}>{answer}</dd>
        </div>
      ))}
    </dl>
  );
}

function Transcript({ includeCost }: { includeCost: boolean }) {
  return (
    <details className="mt-5 border-t border-slate-200 py-3 dark:border-slate-800">
      <summary className="min-h-8 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">これまでの回答</summary>
      <Answers turns={includeCost ? [...shortSampleInterview, ...shortCostFollowUp] : shortSampleInterview} />
    </details>
  );
}

function DraftSections({ draft, selected }: { draft: EssayDraft; selected?: (typeof questions)[number] }) {
  return SECTION_KEYS.map((key, index) => {
    const section = draft.sections[key];
    const original = templateSample.sections[key];
    const [min, max] = (selected ?? questions[0]).bounds[index];
    const count = countEssayCharacters(section.body);
    return (
      <section key={key} className="border-b border-slate-200 px-4 py-5 last:border-b-0 dark:border-slate-800 sm:px-7 sm:py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
          <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300">
            設問{key} <span className="ml-1 text-slate-900 dark:text-slate-100">{section.title}</span>
          </h3>
          <span className="text-xs tabular-nums text-slate-600 dark:text-slate-300">{count.toLocaleString("ja-JP")}字 <span className="text-slate-500 dark:text-slate-400">/ {min ? `${min}〜${max}字` : `${max}字以内`}</span></span>
        </div>
        {section.paragraphs.map(({ heading, text }, i) => {
          const changes = selected ? sampleSentenceChanges(text, original.body) : [];
          const newParagraph = changes.length > 0 && changes.every(({ changed }) => changed);
          const reuse = draft.reuse.filter(({ section, anchor }) => section === key && text.includes(anchor));
          return (
            <div key={i} className={newParagraph ? `mt-3 ${revisedParagraph}` : "mt-3"}
              data-revised-text={newParagraph || undefined} data-revised-paragraph={newParagraph || undefined}
              data-sample-excerpt={selected?.id === sampleExcerpt.questionId && text.includes(sampleExcerpt.sentence) || undefined}>
              <h4 tabIndex={-1} className="scroll-mt-20 text-sm font-semibold outline-none">
                {selected && !newParagraph && !original.paragraphs.some((paragraph) => paragraph.heading === heading)
                  ? <mark className={revision}>{heading}</mark>
                  : heading}
              </h4>
              {reuse.length > 0 && <aside className="mt-1 text-xs text-slate-600 select-none dark:text-slate-300 print:hidden">{reuse.map(({ theme }) => theme).join("・")}にも使える</aside>}
              <p className="mt-1.5 text-sm leading-[1.95] text-slate-800 dark:text-slate-200 sm:text-[15px]">
                {selected && !newParagraph ? changes.map(({ sentence, changed }, j) =>
                  changed ? <mark key={j} className={revision} data-revised-text>{sentence}</mark> : <span key={j}>{sentence}</span>
                ) : text}
              </p>
            </div>
          );
        })}
      </section>
    );
  });
}

export function EssayWorkshopPreview() {
  const savedPosition = useSyncExternalStore(subscribe, getPosition, getServerPosition);
  const [position, costRead] = savedPosition.split("/");
  const paperId = position === "0" ? sampleExcerpt.questionId : position;
  const selected = questions.find(({ id }) => id === paperId);
  const manuscript = (selected && adjustedSamples[selected.id]) ?? templateSample;
  const heading = useRef<HTMLHeadingElement>(null);
  const article = useRef<HTMLElement>(null);
  const focusOnChange = useRef<"change" | "excerpt" | null>(null);

  useEffect(() => {
    // Remember the initial draft even in a tab that has never changed the selector.
    const [initialPosition] = getPosition().split("/");
    writeStorage("sessionStorage", LS_KEYS.essayWorkshopPreview, initialPosition);
  }, []);

  useEffect(() => {
    const target = focusOnChange.current;
    if (!target) return;
    focusOnChange.current = null;
    if (target === "excerpt") {
      const excerpt = article.current?.querySelector("[data-sample-excerpt]");
      if (excerpt) {
        excerpt.querySelector("h4")?.focus({ preventScroll: true });
        excerpt.scrollIntoView({ block: "center", behavior: "instant" });
        return;
      }
    }
    const firstChange = article.current?.querySelector("[data-revised-text]");
    if (firstChange) {
      const paragraphHeading = firstChange.closest("div")?.querySelector("h4");
      paragraphHeading?.focus({ preventScroll: true });
      if (firstChange.hasAttribute("data-revised-paragraph")) {
        paragraphHeading?.scrollIntoView({ block: "start", behavior: "instant" });
      } else {
        firstChange.scrollIntoView({ block: "center", behavior: "instant" });
      }
      return;
    }
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [savedPosition]);

  function show(value: string, openCost = false, target: "change" | "excerpt" = "change") {
    const next = costRead || openCost ? value + "/cost" : value;
    if (next === savedPosition) return;
    focusOnChange.current = target;
    savePosition(value, Boolean(costRead || openCost));
  }

  return (
    <main className="min-h-[calc(100svh-4rem)] flex-1 bg-slate-50 px-4 pb-16 pt-6 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:pt-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-5">
          <p className="text-xs font-semibold text-blue-800 dark:text-blue-300">PM <span className="ml-1.5 text-slate-600 dark:text-slate-300">プロジェクトマネージャ · 架空事例</span></p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">経験から作る論文の見本</h1>
        </header>

        {paperId === sampleExcerpt.questionId && (
          <section aria-label="回答から論文になる例" className="mb-4 rounded-2xl border border-blue-100 bg-blue-50/80 p-4 dark:border-blue-900 dark:bg-blue-950/55 sm:px-6 sm:py-5">
            {[{ label: "設問イ", ...planningExcerpt }, { label: "設問ウ", ...sampleExcerpt }].map(({ label, answers, sentence }) => (
            <div key={label} className="border-b border-blue-200 pb-3.5 pt-3.5 first:pt-0 last-of-type:border-b-0 last-of-type:pb-0 dark:border-blue-900 sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6">
              <div>
                <p className="text-xs font-bold text-blue-800 dark:text-blue-300">ヒアリングの短い回答</p>
                <p className="mt-1 text-sm leading-snug">{answers.join("")}</p>
              </div>
              <div className="mt-2.5 dark:border-blue-900 sm:mt-0 sm:border-l sm:border-blue-200 sm:pl-6">
                <p className="text-xs font-bold text-blue-800 dark:text-blue-300">2023年度・{label}</p>
                <p className="mt-1 text-sm leading-relaxed">{sentence}</p>
              </div>
            </div>
            ))}
          </section>
        )}
        <>
            <div className="sticky top-14 z-10 flex flex-wrap items-center gap-x-3 gap-y-2 bg-slate-50 py-2 dark:bg-slate-950">
              <label htmlFor="workshop-question" className="text-sm">読む原稿</label>
              <select id="workshop-question" value={selected?.id ?? "template"} onChange={(event) => show(event.target.value)} className="min-h-11 min-w-0 max-w-full rounded-xl border border-slate-300 bg-white px-2.5 text-sm font-medium dark:border-slate-700 dark:bg-slate-900">
                <option value="template">王道テンプレート</option>
                {questions.map((question) => <option key={question.id} value={question.id}>{labelForQuestion(question)} · {question.year === 2025 ? "稼働開始リスク" : question.year === 2024 ? "コスト管理" : "管理方法の修整"}</option>)}
              </select>
              {selected && <a className="inline-flex min-h-11 items-center text-sm font-medium text-blue-800 underline underline-offset-4 dark:text-blue-300" href={selected.source.booklet} target="_blank" rel="noreferrer">IPA 問題冊子</a>}
            </div>
            <article ref={article} className={panel + " min-w-0"} aria-labelledby="workshop-heading">
              <header className="border-b border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-7 sm:py-6">
                <h2 ref={heading} id="workshop-heading" tabIndex={-1} className="text-xl font-bold leading-snug tracking-tight outline-none sm:text-2xl">{manuscript.title}</h2>
              </header>
              {paperId === costQuestion && (
                <details className="px-4 py-3 sm:px-7">
                  <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">補足の質問と回答例</summary>
                  <Answers turns={shortCostFollowUp} compact />
                </details>
              )}
              <DraftSections draft={manuscript} selected={selected} />
            </article>
            <Transcript includeCost={paperId === costQuestion} />
        </>
      </div>
    </main>
  );
}
