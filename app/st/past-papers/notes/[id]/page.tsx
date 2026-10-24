import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  NOTE_IDS, getAnnotatedNote, annotatedNotePath, NOTES_PATH,
} from "../../../../../lib/st-annotated-notes/catalog";
import { AnnotatedNoteReader } from "../_components/AnnotatedNoteReader";

type Props = { params: Promise<{ id: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return NOTE_IDS.map((id) => ({ id })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getAnnotatedNote((await params).id);
  if (!note) return { title: "教材が見つかりません", robots: { index: false, follow: false } };
  return {
    title: `${note.title}・注記付非採点`,
    description: "原紙・公式解答と解釈の留保を一緒に読む学習教材。",
    alternates: { canonical: annotatedNotePath(note.id) },
  };
}

export default async function AnnotatedNotePage({ params }: Props) {
  const note = getAnnotatedNote((await params).id);
  if (!note) notFound();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <nav aria-label="教材内の移動" className="mb-6">
        <Link className="text-primary underline" href={NOTES_PATH}>注記付・非採点教材の一覧へ</Link>
      </nav>
      <AnnotatedNoteReader id={note.id} />
    </main>
  );
}
