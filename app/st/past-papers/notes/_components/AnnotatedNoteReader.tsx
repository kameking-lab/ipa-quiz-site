import {
  getAnnotatedNote, questionReference, answerReference, LEARNING_NOTICE,
} from "../../../../../lib/st-annotated-notes/catalog";
import styles from "./notes.module.css";

// This component resolves its fixed ID itself. It cannot receive an unannotated
// Question, a replacement notice, a scoring callback, or a hide-notice prop.
export function AnnotatedNoteReader({ id }: { id: string }) {
  const note = getAnnotatedNote(id);
  if (!note) throw new Error("Unknown annotated note ID");
  const source = note.accepted;
  const noticeId = `${id}-notice`;
  return (
    <article className={styles.reader} data-st-annotated-note={id} data-scoring="disabled" aria-describedby={noticeId}>
      <header>
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <p className="mt-2 text-sm">注記付教材・解答入力なし</p>
      </header>
      <aside id={noticeId} className={styles.notice} aria-label="常時表示の学習注記" data-note-notice="persistent">
        <p className="font-semibold">{LEARNING_NOTICE}</p>
        <p className="mt-2">{note.notice}</p>
      </aside>
      <section className={styles.section} aria-label="原紙と公式解答の参照">
        <h2 className="text-xl font-semibold">原紙の参照が必要です</h2>
        <p>図・表・社内標準などの原紙情報は、以下の公式PDFの該当ページを必ず参照してください。受入本文の文字起こしと併せて読む教材です。</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><a className={styles.link} href={questionReference(note)}>公式問題PDF・{note.questionPage}ページ（問{source.qNumber}）</a></li>
          <li><a className={styles.link} href={answerReference(note)}>公式解答PDF・{note.answerPage}ページ（問{source.qNumber}）</a></li>
        </ul>
        <p className="text-sm">出典：IPA 情報処理推進機構。PDFのページ指定が反映されない場合は、表示したページ番号を手動で開いてください。</p>
      </section>
      <section className={styles.section} aria-label="受入本文と選択肢">
        <h2 className="text-xl font-semibold">受入本文</h2>
        <p className={styles.verbatim} data-accepted-field="question">{source.question}</p>
        <h3 className="text-lg font-semibold">選択肢</h3>
        <dl className="space-y-4">
          {Object.entries(source.choices).map(([key, text]) => (
            <div key={key}>
              <dt className="font-semibold">{key}</dt>
              <dd className={styles.verbatim} data-accepted-choice={key}>{text}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section id="explanation" className={styles.section} aria-label="公式解答と注記付解説" aria-describedby={noticeId}>
        <div className={styles.printNotice} data-print-notice="required">
          <p>{LEARNING_NOTICE}</p><p>{note.notice}</p>
        </div>
        <h2 className="text-xl font-semibold">公式解答と解説</h2>
        <p>公式解答：<strong data-official-key={source.answer}>{source.answer}</strong>（<a className={styles.link} href={answerReference(note)}>公式解答表</a>）</p>
        <p>公式記号の表示は、解説中の解釈や追加モデルまで数学的に一意とする意味ではありません。本文と注記を一緒に確認してください。</p>
        <div className={styles.verbatim} data-accepted-field="explanation">{source.explanation}</div>
        {source.choiceExplanations ? (
          <section aria-label="全選択肢の理由" className="space-y-4">
            <h3 className="text-lg font-semibold">全選択肢の理由</h3>
            {Object.entries(source.choiceExplanations).map(([key, text]) => (
              <div key={key}>
                <h4 className="font-semibold">{key}</h4>
                <p className={styles.verbatim} data-accepted-reason={key}>{text}</p>
              </div>
            ))}
          </section>
        ) : <p>全選択肢の理由は、上の受入解説内「選択肢別の理由」に含まれています。</p>}
      </section>
      <p className={styles.endNotice}>{LEARNING_NOTICE} {note.notice}</p>
    </article>
  );
}
