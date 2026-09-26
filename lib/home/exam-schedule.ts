/**
 * トップページ「試験日が近い資格」帯のデータ。
 *
 * 掲載してよいのは、実施機関の公式ページ（一次資料）で日程を確認できたものだけ。
 * 二次情報でしか確認できていない日程（宅建・FP・電験三種・施工管理の建築/電気など）は
 * ここに入れない。確認元は note-automation/reports/sikaku-next-20260926/B2-EXAM-CALENDAR.md。
 *
 * 日付はすべて JST の暦日（YYYY-MM-DD）。終了日を過ぎたものは自動で表示しない。
 */

export interface HomeExamEvent {
  id: string;
  /** 帯に出す資格名 */
  name: string;
  /** 何の日程か（例: 科目A試験、第一次検定） */
  eventLabel: string;
  /** 開始日（JST, YYYY-MM-DD） */
  start: string;
  /** 期間の最終日。単日の試験は省略 */
  end?: string;
  /** カウントダウンの意味。"exam" は試験日まで、"stop" は受験休止まで */
  kind: "exam" | "stop";
  /** 補足（申込期間など、同じ公式ページで確認した事実だけ） */
  note: string;
  /** サイト内の学習ページ */
  links: readonly { href: string; label: string }[];
  /** 日程の確認元（公式） */
  sourceUrl: string;
  sourceLabel: string;
}

/** 日程を公式ページで確認した日 */
export const HOME_EXAM_SCHEDULE_CHECKED_AT = "2026-09-26";

export const HOME_EXAM_EVENTS: readonly HomeExamEvent[] = [
  {
    id: "ipa-koudo-2026-zenki",
    name: "高度試験・情報処理安全確保支援士（前期）",
    eventLabel: "科目A試験",
    start: "2026-10-17",
    end: "2026-10-27",
    kind: "exam",
    note: "申込は10月6日〜10月24日。科目B試験は11月11日〜11月23日。",
    links: [
      { href: "/sc", label: "支援士" },
      { href: "/nw", label: "NW" },
      { href: "/db", label: "DB" },
      { href: "/ipa", label: "高度試験一覧" },
    ],
    sourceUrl: "https://www.ipa.go.jp/shiken/2026/ap_koudo_sc_kikan.html",
    sourceLabel: "IPA",
  },
  {
    id: "civil2-2026-kouki",
    name: "2級土木施工管理技術検定",
    eventLabel: "第一次検定（後期）・第二次検定",
    start: "2026-10-25",
    kind: "exam",
    note: "第一次検定の合格発表は12月2日。",
    links: [{ href: "/civil2", label: "2級土木の過去問" }],
    sourceUrl: "https://www.jctc.jp/exam/doboku-2/",
    sourceLabel: "全国建設研修センター",
  },
  {
    id: "ipa-ap-2026-zenki",
    name: "応用情報技術者（前期）",
    eventLabel: "科目A試験",
    start: "2026-10-28",
    end: "2026-11-10",
    kind: "exam",
    note: "申込は10月6日〜11月7日。科目B試験は11月24日〜12月6日。",
    links: [{ href: "/ap", label: "応用情報の過去問" }],
    sourceUrl: "https://www.ipa.go.jp/shiken/2026/ap_koudo_sc_kikan.html",
    sourceLabel: "IPA",
  },
  {
    id: "ipa-cbt-2026-pause",
    name: "ITパスポート・情報セキュリティマネジメント・基本情報",
    eventLabel: "CBT試験の休止",
    start: "2026-12-28",
    kind: "stop",
    note: "12月28日以降は試験休止。会場によってはそれより前に休止する場合があります。",
    links: [
      { href: "/ip", label: "IP" },
      { href: "/sg", label: "SG" },
      { href: "/fe", label: "FE" },
    ],
    sourceUrl: "https://www.ipa.go.jp/shiken/2026/r08_fe-sg_exam.html",
    sourceLabel: "IPA",
  },
];

export type HomeExamEventStatus =
  | { phase: "upcoming"; daysLeft: number }
  | { phase: "ongoing" };

export interface HomeExamEventView extends HomeExamEvent {
  status: HomeExamEventStatus;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** 与えた時刻の JST 暦日を YYYY-MM-DD で返す */
export function jstDateString(now: Date): string {
  return new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function dayNumber(date: string): number {
  return Math.round(Date.parse(`${date}T00:00:00Z`) / DAY_MS);
}

/**
 * JST の今日から見て、終了していない日程を開始日順に返す。
 * 開始前は「あと N 日」、期間中は「実施中」。終了日（単日は開始日）を過ぎたら除外。
 */
export function getUpcomingExamEvents(
  now: Date,
  events: readonly HomeExamEvent[] = HOME_EXAM_EVENTS,
): HomeExamEventView[] {
  const today = dayNumber(jstDateString(now));
  return events
    .flatMap((event): HomeExamEventView[] => {
      const start = dayNumber(event.start);
      const last = dayNumber(event.end ?? event.start);
      // 休止は開始日を迎えた時点で案内の意味がなくなる。
      if (event.kind === "stop" ? today >= start : today > last) return [];
      const status: HomeExamEventStatus =
        today < start ? { phase: "upcoming", daysLeft: start - today } : { phase: "ongoing" };
      return [{ ...event, status }];
    })
    .sort((a, b) => a.start.localeCompare(b.start));
}

/** "2026-10-17" → "10月17日" */
export function formatMonthDay(date: string): string {
  const [, month, day] = date.split("-");
  return `${Number(month)}月${Number(day)}日`;
}
