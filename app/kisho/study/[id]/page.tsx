import Link from 'next/link';
import { notFound } from 'next/navigation';
import { KishoStudyReader } from '@/components/kisho/KishoStudyReader';
import { KISHO_STUDY_QUESTIONS } from '@/lib/kisho-study';

export function generateStaticParams() { return KISHO_STUDY_QUESTIONS.map(q => ({ id: q.raw.id })); }
export default async function KishoStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!KISHO_STUDY_QUESTIONS.some(q => q.raw.id === id)) notFound();
  return <><nav className="p-4"><Link className="underline" href="/kisho">気象予報士の回・科目一覧へ</Link></nav><KishoStudyReader key={id} initialQuestionId={id} /></>;
}
