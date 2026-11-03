import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CHOICES, EXAMS, jstDay, progressFor, queueFor, type Choice, type Exam } from "./domain";
import { Repository, type State } from "./state";
import { nativeStorage, observeConnection, observeReminderTap, openExternal, setReminder } from "./platform";
import { StudyService } from "./services";
import "./styles.css";

type Tab = "learn" | "review" | "history" | "settings";
const repo = new Repository(nativeStorage);
const service = new StudyService(repo);
const errorText = (error: unknown) => error instanceof Error ? error.message : "処理を完了できませんでした。もう一度お試しください。";

function App({ initial, recovered }: { initial: State; recovered: boolean }) {
  const [state, setState] = useState(initial);
  const [tab, setTab] = useState<Tab>("learn");
  const [active, setActive] = useState(Boolean(initial.resume));
  const [online, setOnline] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(recovered ? "前回の保存データから復旧しました。直近の操作が反映されていない場合があります。" : "");
  const [uncertain, setUncertain] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [reminderTime, setReminderTime] = useState(initial.reminder ?? "20:00");
  const [confirmClear, setConfirmClear] = useState(false);
  const [day, setDay] = useState(jstDay());
  const progress = progressFor(state.history);
  const due = Object.values(state.packs).flatMap(p => p.questions).filter(q => progress.get(q.id)?.review).length;
  const today = state.history.filter(a => jstDay(new Date(a.answeredAt)) === day);
  const current = state.resume && state.packs[state.resume.exam].questions.find(q => q.id === state.resume?.questionId);
  const selected = state.resume?.selected ?? null;
  const quotaUsed = state.aiQuota.day === day ? state.aiQuota.used : 0;

  useEffect(() => {
    const refresh = () => setDay(jstDay());
    const timer = window.setInterval(refresh, 1000);
    document.addEventListener("visibilitychange", refresh);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", refresh); };
  }, []);

  useEffect(() => {
    let stopped = false;
    const disposers: (() => void)[] = [];
    void observeConnection(value => { if (!stopped) setOnline(value); }).then(dispose => {
      if (stopped) dispose(); else disposers.push(dispose);
    }).catch(() => setNotice("接続状況を確認できません。演習はそのまま使えます。"));
    void observeReminderTap(() => { setTab("review"); setActive(false); }).then(dispose => {
      if (stopped) dispose(); else disposers.push(dispose);
    }).catch(() => setNotice("通知からの復習画面を開けませんでした。復習タブをご利用ください。"));
    return () => { stopped = true; disposers.forEach(dispose => dispose()); };
  }, []);

  async function run(work: () => Promise<void>) {
    if (busy) return;
    setBusy(true); setNotice("");
    try { await work(); }
    catch (error) { setNotice(errorText(error)); }
    finally { setState(repo.state); setBusy(false); }
  }
  async function begin(exam: Exam, reviewOnly: boolean, exclude?: string) {
    const questions = queueFor(repo.state.packs[exam], repo.state.history, reviewOnly).filter(q => q.id !== exclude);
    const next = questions[0];
    setAiAnswer(""); setAiQuestion(""); setUncertain(false);
    if (!next) {
      await repo.update(s => { s.resume = null; return s; });
      setActive(false); setNotice(reviewOnly ? "この資格の復習が終わりました。おつかれさまでした。" : "演習が終わりました。");
      return;
    }
    await repo.update(s => { s.resume = { exam, questionId: next.id, reviewOnly, selected: null }; return s; });
    setActive(true);
  }
  async function answer(choice: Choice) {
    if (!current || selected) return;
    const q = current;
    await repo.update(s => {
      if (!s.resume || s.resume.questionId !== q.id || s.resume.selected) return s;
      s.history.push({ questionId: q.id, selected: choice, correct: choice === q.answer,
        answeredAt: new Date().toISOString(), uncertain });
      s.resume.selected = choice;
      return s;
    });
  }
  function navigate(next: Tab) { if (!busy) { setTab(next); setActive(false); setNotice(""); } }

  return <div className="app-shell">
    <header><div className="brand"><span className="brand-mark" aria-hidden="true">問</span><div><strong>過去問AI</strong><small>ひと問から、理解を積み重ねる。</small></div></div>
      <span className={`connection ${online ? "connected" : ""}`}><span aria-hidden="true">●</span> {online ? "オンライン" : "オフライン"}</span></header>
    <main id="main">
      {notice && <div className="notice" role="status">{notice}<button aria-label="メッセージを閉じる" onClick={() => setNotice("")}>×</button></div>}
      {active && current ? <>
        <div className="section-line"><button className="text-button" disabled={busy} onClick={() => setActive(false)}>‹ 資格選択へ</button><span>{state.resume?.reviewOnly ? "復習" : "演習"} · {EXAMS[current.exam]}</span></div>
        <article className="card question-card">
          <p className="eyebrow">{current.year}年度 · 問{current.qNumber} · {current.category}</p>
          <h1 className="question-text">{current.question}</h1>
          <div className="choices" aria-label="解答の選択肢">
            {CHOICES.map(choice => <button key={choice} disabled={busy || Boolean(selected)}
              className={`choice ${selected && current.answer === choice ? "correct" : ""} ${selected === choice ? "chosen" : ""}`}
              onClick={() => void run(() => answer(choice))}>
              <span className="choice-key">{choice}</span><span>{current.choices[choice]}</span>
              {selected && current.answer === choice && <strong>正解</strong>}
              {selected === choice && current.answer !== choice && <strong>選択</strong>}
            </button>)}
          </div>
          {!selected && <label className="check"><input type="checkbox" checked={uncertain} disabled={busy} onChange={e => setUncertain(e.target.checked)} />自信がないので、正解でも復習する</label>}
          {selected && <section className="explanation" aria-label="解答と解説">
            <p className="result">{selected === current.answer ? "正解です" : "もう一度、理解を深めよう"} <span>正解：{current.answer}</span></p>
            <h2>固定解説</h2><p className="preserve">{current.explanation}</p>
            {current.choiceExplanations && CHOICES.map(c => current.choiceExplanations?.[c] && <p key={c}>{c}：{current.choiceExplanations[c]}</p>)}
            <small>過去問AIの学習用解説です。IPAの公式解説ではありません。</small>
            <button className="text-button" disabled={busy} onClick={() => void run(async () => {
              await repo.update(s => {
                const latest = [...s.history].reverse().find(a => a.questionId === current.id);
                if (latest) latest.uncertain = !progress.get(current.id)?.review;
                return s;
              });
            })}>{progress.get(current.id)?.review ? "復習に登録済み" : "あとで復習する"}</button>
            <button className="primary next" disabled={busy} onClick={() => void run(() => begin(current.exam, state.resume?.reviewOnly ?? false, current.id))}>次の問題へ →</button>
          </section>}
        </article>
        {selected && <section className="card ai-panel">
          <p className="eyebrow">理解をもう一歩</p><h2>AIコパイロット</h2>
          <p>オンライン専用 · ログイン不要 · 1日10回まで無料（日本時間0時更新）</p>
          <p className="muted">本日の送信：{quotaUsed}/10回。Webと同じIPの利用で先に上限となる場合があります。送信試行も回数に含みます。</p>
          {!online && <p className="offline-note">圏外では固定解説と復習を利用できます。</p>}
          <label className="check"><input type="checkbox" checked={state.aiConsent} disabled={busy} onChange={e => {
            const checked = e.target.checked;
            void run(async () => { await repo.update(s => { s.aiConsent = checked; return s; }); });
          }} />問題文・選択肢・解答・質問を過去問AIのAPIと、その先のAI提供者へ送信することに同意する</label>
          <p className="muted">個人情報は入力しないでください。学習履歴全体は送信しません。AI回答には誤りが含まれることがあります。</p>
          <label htmlFor="ai-question">この問題について聞く</label>
          <textarea id="ai-question" value={aiQuestion} disabled={busy} maxLength={4000} onChange={e => setAiQuestion(e.target.value)} placeholder="例：正解の理由を具体例で教えて" />
          <button className="secondary" disabled={busy || !online || !state.aiConsent || quotaUsed >= 10 || !aiQuestion.trim()} onClick={() => void run(async () => {
            setAiAnswer("");
            setAiAnswer(await service.ask(current, aiQuestion, selected));
          })}>{busy ? "処理中…" : "AIに質問する"}</button>
          {aiAnswer && <div className="ai-answer preserve" role="status"><strong>AIによる回答</strong><p>{aiAnswer}</p></div>}
        </section>}
        <p className="source">出典: IPA 情報処理技術者試験 <button className="text-button" disabled={busy} onClick={() => void run(() => openExternal(current.sourcePdfUrl))}>公式問題PDF ↗</button>{current.sourceAnswerUrl && <> · <button className="text-button" disabled={busy} onClick={() => void run(() => openExternal(current.sourceAnswerUrl!))}>公式正答PDF ↗</button></>}</p>
      </> : <>
        {(tab === "learn" || tab === "review") && <>
          <section className="hero"><p className="eyebrow">{tab === "review" ? "理解を確かに" : "毎日の、小さな前進"}</p>
            <h1>{tab === "review" ? <>迷った問題を、<br />自分の力に。</> : <>今日もひと問、<br />未来につながる。</>}</h1>
            <p>{tab === "review" ? "誤答と、自信がなかった正解をまとめました。" : "通信がなくても、問題も解説も手元に。"}</p>
          </section>
          <div className="stats"><div><strong>{today.length}<small>問</small></strong><span>今日の演習</span></div><div><strong>{due}<small>問</small></strong><span>復習待ち</span></div><div><strong>{state.history.length ? Math.round(state.history.filter(a => a.correct).length / state.history.length * 100) : 0}<small>%</small></strong><span>これまでの正答率</span></div></div>
          {tab === "learn" && state.resume && <button className="resume" disabled={busy} onClick={() => setActive(true)}>前回の問題を続ける → {EXAMS[state.resume.exam]}</button>}
          <h2 className="section-title">{tab === "review" ? "復習する資格" : "学習する資格を選ぶ"}</h2>
          <div className="exam-list">{(["ip", "fe"] as const).map(exam => {
            const pack = state.packs[exam];
            const count = tab === "review" ? pack.questions.filter(q => progress.get(q.id)?.review).length : pack.questions.length;
            return <button key={exam} className="card exam" disabled={busy || count === 0} onClick={() => void run(() => begin(exam, tab === "review"))}>
              <span className="exam-icon" aria-hidden="true">{exam.toUpperCase()}</span><span><strong>{EXAMS[exam]}</strong><small>{tab === "review" ? `復習待ち ${count}問` : `${count}問収録 · ${exam === "fe" ? "科目A" : "四択演習"}`}<br />オフライン対応</small></span><span className="arrow" aria-hidden="true">↗</span>
            </button>;
          })}</div>
          {tab === "review" && due === 0 && <p className="empty">復習待ちはありません。演習で間違えた問題や自信のない問題がここに残ります。</p>}
          <p className="hint">固定解説・学習記録・復習は無料。アカウント登録は不要です。</p>
        </>}
        {tab === "history" && <>
          <p className="eyebrow">積み重ねた学び</p><h1>学習の記録</h1><p>この端末に保存した解答履歴です。</p>
          <div className="card"><strong>累計 {state.history.length}問</strong><p>正解 {state.history.filter(a => a.correct).length}問 · 復習待ち {due}問</p></div>
          {state.history.length === 0 && <p className="empty">最初のひと問を解くと、ここに記録されます。</p>}
          <ol className="history-list">{state.history.slice(-50).reverse().map((a, i) => <li key={`${a.answeredAt}-${i}`}>
            <span className={`history-badge ${a.correct ? "ok" : ""}`}>{a.correct ? "正解" : "誤答"}</span><div><strong>{a.questionId}</strong><small>{new Date(a.answeredAt).toLocaleString("ja-JP")}{a.uncertain ? " · 自信なし" : ""}</small></div>
          </li>)}</ol><p className="muted">直近50件を表示。復習の判定はすべての保存履歴を使います。</p>
        </>}
        {tab === "settings" && <>
          <p className="eyebrow">自分のペースで</p><h1>設定とデータ</h1>
          <section className="card"><h2>学習リマインダー</h2><p>毎日、設定した端末の現地時刻に通知します。通知を許可しなくても学習できます。</p>
            <label htmlFor="reminder-time">通知する時刻</label><input id="reminder-time" type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)} disabled={busy} />
            <p>保存済み：{state.reminder ?? "通知しない"}</p>
            <div className="button-row"><button className="secondary" disabled={busy} onClick={() => void run(async () => {
              const previous = repo.state.reminder;
              await setReminder(reminderTime);
              try { await repo.update(s => { s.reminder = reminderTime; return s; }); }
              catch (error) { await setReminder(previous); throw error; }
              setNotice("リマインダーを設定しました。");
            })}>通知を設定</button><button disabled={busy} onClick={() => void run(async () => {
              const previous = repo.state.reminder;
              await setReminder(null);
              try { await repo.update(s => { s.reminder = null; return s; }); }
              catch (error) { await setReminder(previous); throw error; }
              setNotice("通知を停止しました。");
            })}>通知を停止</button></div>
          </section>
          <section className="card"><h2>問題パック</h2><p>解説を含めて端末に保存しています。更新失敗時も保存済みの問題を利用できます。</p>
            {(["ip", "fe"] as const).map(exam => <div className="pack-row" key={exam}><div><strong>{EXAMS[exam]}</strong><small>v{state.packs[exam].version} · {state.packs[exam].questions.length}問 · 更新日 {state.packs[exam].updatedAt}</small></div>
              <button disabled={busy || !online} onClick={() => void run(async () => {
                const updated = await service.updatePack(exam);
                setNotice(updated ? "問題パックを更新しました。" : "最新の問題パックです。");
              })}>更新を確認</button></div>)}
          </section>
          <section className="card"><h2>AIとプライバシー</h2><p>学習記録は端末内に保存します。AIへの送信は同意後、質問した時だけ行います。</p><p>AI提供者の詳細・保持方針はプライバシーポリシーをご確認ください。</p>
            <button disabled={busy || !state.aiConsent} onClick={() => void run(async () => { await repo.update(s => { s.aiConsent = false; return s; }); setNotice("AI送信への同意を取り消しました。"); })}>AI送信の同意を取り消す</button>
            <div className="button-row"><button className="text-button" disabled={busy} onClick={() => void run(() => openExternal("https://www.kakomon-ai.jp/privacy"))}>プライバシーポリシー ↗</button><button className="text-button" disabled={busy} onClick={() => void run(() => openExternal("https://www.kakomon-ai.jp/contact"))}>お問い合わせ・誤り報告 ↗</button></div>
          </section>
          <section className="card"><h2>学習記録の削除</h2><p>解答履歴と復習・再開位置を削除します。通知設定と本日のAI送信回数は保持します。</p>
            {!confirmClear ? <button className="danger" disabled={busy} onClick={() => setConfirmClear(true)}>学習記録を削除…</button> : <div><p>この端末の学習記録を削除します。元に戻せません。</p><div className="button-row"><button className="danger" disabled={busy} onClick={() => void run(async () => {
              // Overwrite both snapshots so recovery cannot resurrect deleted history.
              const clear = (s: State) => { s.history = []; s.resume = null; return s; };
              await repo.update(clear); await repo.update(clear);
              setConfirmClear(false); setNotice("学習記録を削除しました。");
            })}>削除する</button><button disabled={busy} onClick={() => setConfirmClear(false)}>キャンセル</button></div></div>}
          </section><p className="muted">過去問AI v1.0.0 · 無料版 · アプリ内課金なし</p>
        </>}
      </>}
      <footer>出典: IPA 情報処理技術者試験<br />本アプリはIPAの公式アプリではありません。</footer>
    </main>
    <nav aria-label="メインナビゲーション">{([["learn", "演習", "▤"], ["review", "復習", "↻"], ["history", "記録", "◷"], ["settings", "設定", "⚙"]] as const).map(([id, label, icon]) => <button key={id} disabled={busy} aria-current={tab === id ? "page" : undefined} onClick={() => navigate(id)}><span aria-hidden="true">{icon}</span>{label}{id === "review" && due > 0 && <small>{due}</small>}</button>)}</nav>
  </div>;
}

const root = createRoot(document.getElementById("root")!);
void repo.load().then(({ state, recovered }) => root.render(<App initial={state} recovered={recovered} />)).catch(error => {
  root.render(<main className="fatal"><h1>保存データを確認できません</h1><p>{errorText(error)}</p><p>端末の空き容量を確認して、アプリを再起動してください。</p></main>);
});
