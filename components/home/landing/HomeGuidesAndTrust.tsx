import Link from "next/link";
import { ArrowUpRight, BookOpenText, ShieldCheck, UserRound } from "lucide-react";
import { TrackedNoteLink } from "@/components/analytics/TrackedNoteLink";
import { NOTE_PROFILE_URL } from "@/lib/external-links";
import { getNoteGuide } from "@/lib/note-guides";
import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";

// 各資格ページの ExamNoteGuide と同じ登録済みの無料記事だけを使う（URLは lib/note-guides.ts が唯一の情報源）。
const HOME_GUIDE_EXAMS: readonly ExamCode[] = ["ip", "sg", "fe", "ap", "civil2"];

export function HomeNoteGuides() {
  const guides = HOME_GUIDE_EXAMS.flatMap((exam) => {
    const guide = getNoteGuide(exam);
    return guide && guide.kind === "free" ? [{ exam, guide }] : [];
  });
  if (guides.length === 0) return null;
  return (
    <section aria-labelledby="home-guides-title" className="mt-10 rounded-3xl border border-sky-200/70 bg-sky-50/60 p-4 dark:border-sky-900/50 dark:bg-sky-950/20 sm:p-6">
      <div className="mb-3 flex items-start gap-3">
        <span className="rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          <BookOpenText className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 id="home-guides-title" className="text-lg font-bold">学習ガイド（note・無料）</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">過去問演習とあわせて、試験の形式や設問の考え方を確認できます。</p>
        </div>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {guides.map(({ exam, guide }) => (
          <li key={exam}>
            <TrackedNoteLink
              href={guide.href}
              source="home"
              account={guide.account}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-sky-200 bg-white px-3.5 py-2.5 text-sm shadow-sm hover:border-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-sky-900 dark:bg-zinc-950"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold text-sky-700 dark:text-sky-300">{examLabel(exam)}</span>
                <span className="block font-semibold leading-snug">{guide.label}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-sky-700 dark:text-sky-300" aria-hidden="true" />
              <span className="sr-only">（noteの無料記事・新しいタブで開きます）</span>
            </TrackedNoteLink>
          </li>
        ))}
      </ul>
      <TrackedNoteLink
        href={NOTE_PROFILE_URL}
        source="home"
        account="ipa_quiz_ai"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-sky-800 hover:underline dark:text-sky-200"
      >
        noteの記事一覧を見る
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">（新しいタブで開きます）</span>
      </TrackedNoteLink>
    </section>
  );
}

const TRUST_LINKS = [
  { href: "/operator", label: "運営者情報", icon: UserRound },
  { href: "/transparency", label: "運営の透明性レポート", icon: ShieldCheck },
] as const;

export function HomeTrust() {
  return (
    <section aria-labelledby="home-trust-title" className="mt-10">
      <h2 id="home-trust-title" className="mb-2 text-lg font-bold sm:text-xl">過去問AIについて</h2>
      <p className="text-sm leading-7 text-muted-foreground">
        問題は、試験実施機関が公式に公開した過去問です。解説は学習支援用に作成したもので、試験実施機関による公式解説ではありません。各問題から公式問題と公式正答を確認できます。
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {TRUST_LINKS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
