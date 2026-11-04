import Link from 'next/link';
import { KISHO_STUDY_QUESTIONS } from '@/lib/kisho-study';

export const metadata = { title: '気象予報士 第65・66回の過去問', alternates: { canonical: '/kisho' } };
const subjects = { ippan: '学科一般', senmon: '学科専門', pm1: '実技1', pm2: '実技2' } as const;

export default function KishoPage() {
  return <main className="mx-auto max-w-4xl space-y-6 p-4">
    <Link href="/qualifications" className="underline">資格一覧へ</Link>
    <h1 className="text-2xl font-bold">気象予報士 第65・66回</h1>
    <p>学科60問・全300肢の解説、実技18問・237回答欄。実技は公式解答例・作図と手動で照合します。</p>
    {([66, 65] as const).map(round => <section key={round} className="space-y-4 rounded border p-4">
      <h2 className="text-xl font-bold">第{round}回（{round === 65 ? '2026年1月25日・令和7年度第2回' : '2026年8月23日・令和8年度第1回'}）</h2>
      {Object.entries(subjects).map(([session, name]) => <div key={session}>
        <h3 className="font-semibold">{name}</h3>
        {(session === 'ippan' || session === 'senmon') && <Link className="my-2 inline-block underline" href={`/quiz?mode=year&exam=kisho&year=2026&season=${round === 65 ? 'second' : 'first'}&session=${session}&order=1&returnTo=/kisho`}>通常の学科学習を始める</Link>}
        <div className="flex flex-wrap gap-3">{KISHO_STUDY_QUESTIONS.filter(q => q.source.round === round && q.raw.session === session).map(q => <Link className="inline-flex min-h-11 items-center underline" key={q.raw.id} href={`/kisho/study/${q.raw.id}`}>問{q.raw.qNumber}</Link>)}</div>
      </div>)}
    </section>)}
    <p>出典：一般財団法人 気象業務支援センター 気象予報士試験問題・解答例。原典の画像化・表記整理を行っています。解説は学習用で、実施団体の公式解説ではありません。</p>
  </main>;
}
