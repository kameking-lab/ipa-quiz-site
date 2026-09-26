import Link from "next/link";
import { CalendarDays, ClipboardList, RotateCcw, Search, Shuffle, TrendingUp, type LucideIcon } from "lucide-react";

interface StudyMode {
  href: string;
  title: string;
  body: string;
  scope?: string;
  icon: LucideIcon;
  tone: string;
}

// 実在するページだけを並べる。対象が IPA に限られる機能は scope で明示する。
const STUDY_MODES: readonly StudyMode[] = [
  {
    href: "/challenge",
    title: "デイリーチャレンジ",
    body: "毎日入れ替わる5問に挑戦。",
    icon: CalendarDays,
    tone: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  },
  {
    href: "/quiz?mode=random&exam=ip",
    title: "ランダム演習",
    body: "ITパスポートの過去問をランダムに1問ずつ。",
    scope: "IPA",
    icon: Shuffle,
    tone: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  },
  {
    href: "/mock-exam",
    title: "模試モード",
    body: "本番形式・制限時間つきで通しで解く。",
    scope: "IPA",
    icon: ClipboardList,
    tone: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  },
  {
    href: "/review",
    title: "間隔反復で復習",
    body: "間違えた問題を、忘れる前に解き直す。",
    icon: RotateCcw,
    tone: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  },
  {
    href: "/e-learning/search",
    title: "安全衛生の問題検索",
    body: "キーワードで公表問題を探して解く。",
    scope: "安全衛生",
    icon: Search,
    tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  {
    href: "/e-learning/progress",
    title: "安全衛生の進捗・復習",
    body: "解いた回と間違えた問題を確認する。",
    scope: "安全衛生",
    icon: TrendingUp,
    tone: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  },
];

export function HomeStudyModes() {
  return (
    <section aria-labelledby="home-modes-title" className="mt-10">
      <h2 id="home-modes-title" className="mb-3 text-lg font-bold sm:text-xl">解き方を選ぶ</h2>
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {STUDY_MODES.map(({ href, title, body, scope, icon: Icon, tone }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex min-h-16 items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5">
                  <span className="text-sm font-bold">{title}</span>
                  {scope ? <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{scope}</span> : null}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{body}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
