import type { Metadata } from "next";
import Link from "next/link";
import {
  getAnnotatedNotes, annotatedNotePath, LEARNING_NOTICE, NOTES_PATH,
} from "../../../../lib/st-annotated-notes/catalog";

export const metadata: Metadata = {
  title: "ITストラテジスト 注記付・非採点教材",
  description: "原紙・公式解答・全肢理由・解釈の留保を一緒に読む1問の学習教材。",
  alternates: { canonical: NOTES_PATH },
};

export default function AnnotatedNotesIndex() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 leading-8">
      <h1 className="text-2xl font-bold">ST 注記付・非採点教材</h1>
      <p className="my-6 rounded-xl border-2 border-warning p-4" data-note-notice="index">{LEARNING_NOTICE}</p>
      <p>この1問の原紙と公式解答表を参照し、受入本文・全肢理由・解釈上の留保を読むことができます。</p>
      <ul className="mt-6 space-y-6">
        {getAnnotatedNotes().map((note) => (
          <li key={note.id} className="rounded-xl border border-border bg-card p-4">
            <Link className="font-semibold text-primary underline" href={annotatedNotePath(note.id)}>{note.title}</Link>
            <p className="mt-2 text-sm" data-note-notice={note.id}>{note.notice}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
