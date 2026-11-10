import Link from "next/link";
import type { ExamEntryCode } from "@/lib/seo/exam-entry";
import type { Question } from "@/lib/questions/types";
import { groupByYearSeason } from "@/lib/seo/exam-meta";

const namingSource = "https://www.ipa.go.jp/shiken/2026/ap_koudo_sc-cbt.html";
const cancellationSource = "https://www.ipa.go.jp/shiken/mondai-kaiotu/2020r02.html";
const sourceClass = "text-primary underline underline-offset-4";

/** Counts reflect published questions, not the number set in the official exam. */
export function ExamPastQuestionGuide({ exam, questions }: {
  exam: ExamEntryCode;
  questions: Question[];
}) {
  if (exam === "st") return null;
  const isAp = exam === "ap";
  const columns = isAp
    ? [{ session: "am", old: "午前", current: "科目A", purpose: "知識を選択式で確認する" }]
    : [
      { session: "am1", old: "午前I", current: "科目A-1", purpose: "共通知識を確認する" },
      { session: "am2", old: "午前II", current: "科目A-2", purpose: "専門知識を確認する" },
    ];
  const afternoon = exam === "sc" || isAp
    ? [{ old: "午後", current: "科目B" }]
    : [{ old: "午後I", current: "科目B-1" }, { old: "午後II", current: "科目B-2" }];
  const counts = new Map<string, Map<string, number>>();
  for (const question of questions) {
    const key = `${question.year}-${question.season}`;
    const sessions = counts.get(key) ?? new Map<string, number>();
    sessions.set(question.session, (sessions.get(question.session) ?? 0) + 1);
    counts.set(key, sessions);
  }
  const years = groupByYearSeason(questions);

  return (
    <section aria-labelledby="past-question-guide-heading" className="mb-6 rounded-2xl border border-border bg-card p-4 sm:p-5">
      <h2 id="past-question-guide-heading" className="text-base font-bold">過去問の科目と収録範囲</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {exam === "nw" ? "ネットワークスペシャリスト（ネスペ）の" : "このページの"}年度別・分野別一覧では、掲載済みの{isAp ? "午前" : "午前I・午前II"}問題を解けます。
        {isAp ? "科目Aの知識確認と科目Bの記述練習" : "共通知識・専門知識の確認と午後の練習"}を分けて進めましょう。
        分野別の件数は{isAp ? "午前" : "午前I・午前IIの合計"}です。
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="pb-2 text-left font-medium">過去問の表記とCBT移行後の科目名</caption>
          <thead><tr className="border-b"><th scope="col" className="p-2">過去問の表記</th><th scope="col" className="p-2">移行後</th><th scope="col" className="p-2">このサイトでの入口</th></tr></thead>
          <tbody>
            {columns.map(column => <tr key={column.session} className="border-b"><th scope="row" className="p-2 font-medium">{column.old}</th><td className="p-2">{column.current}</td><td className="p-2"><Link href={`#subject-coverage`} className={sourceClass}>{column.purpose}：収録年度を見る</Link></td></tr>)}
            {afternoon.map(column => <tr key={column.old} className="border-b"><th scope="row" className="p-2 font-medium">{column.old}</th><td className="p-2">{column.current}</td><td className="p-2"><Link href="#afternoon" className={sourceClass}>対策記事・公式問題で練習する</Link></td></tr>)}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">名称の対応は<a href={namingSource} className={sourceClass} target="_blank" rel="noopener noreferrer">IPA「CBT方式での実施について」</a>に基づきます（2026年11月10日確認）。過去問の科目名は実施当時の表記を使っています。古い午後問題は、当該年度の公式冊子で形式を確認してください。</p>
      <details id="subject-coverage" className="mt-4 scroll-mt-20 rounded-xl border border-border">
        <summary className="min-h-11 cursor-pointer p-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">科目別の収録数を見る（{years.length}期）</summary>
        <div className="overflow-x-auto px-3 pb-3">
          <table className="w-full text-left text-sm">
            <caption className="pb-2 text-left text-xs text-muted-foreground">掲載済み問題データの集計。「未収録」は当サイトの掲載状況で、試験の未実施を意味しません。</caption>
            <thead><tr className="border-b"><th scope="col" className="p-2">年度・期</th>{columns.map(column => <th key={column.session} scope="col" className="p-2">{column.old}</th>)}</tr></thead>
            <tbody>{years.map(year => <tr key={year.key} className="border-b"><th scope="row" className="p-2 font-medium"><Link href={`/${exam}/${year.key}`} className={sourceClass}>{year.label}</Link></th>{columns.map(column => {
              const count = counts.get(year.key)?.get(column.session) ?? 0;
              return <td key={column.session} className="p-2">{count > 0 ? `${count}問` : "未収録"}</td>;
            })}</tr>)}</tbody>
          </table>
        </div>
      </details>
      {exam === "nw" && <details className="mt-3 rounded-xl border border-border">
        <summary className="min-h-11 cursor-pointer p-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">令和2年（2020年）のネスペ過去問が見つからないのは？</summary>
        <p className="px-3 pb-3 text-sm leading-relaxed">IPAは令和2年度春期試験を中止し、同春期の過去問題を掲載していません。<a href={cancellationSource} className={sourceClass} target="_blank" rel="noopener noreferrer">IPAの令和2年度資料</a>で確認できます。一覧にある別年度の「午前IIは未収録」は当サイトの収録範囲を示す表示です。</p>
      </details>}
    </section>
  );
}
