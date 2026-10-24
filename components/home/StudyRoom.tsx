"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { presenceExamName } from "@/lib/study-presence";
import type { MeasuredPresence } from "@/lib/study-presence-contract";
import { measuredRoom } from "@/lib/home/study-room";

interface Suggestion { name: string; href: string }
interface Seat { name: string; href?: string; index: number }

export function StudyRoom({ snapshot, stale, suggestions }: {
  snapshot: MeasuredPresence | null;
  stale: boolean;
  suggestions: readonly Suggestion[];
}) {
  const [room, setRoom] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const measured = snapshot ? measuredRoom(snapshot, room) : null;
  const introductions = suggestions.slice(0, 6);
  const seats: Seat[] = measured ? measured.seats.map(seat => {
    const name = presenceExamName(seat.exam)!;
    return { name, href: suggestions.find(item => item.name === name)?.href, index: seat.index };
  }) : Array.from({ length: introductions.length ? 8 : 0 }, (_, index) => ({ ...introductions[index % introductions.length], index }));
  const focus = seats.find(seat => seat.index === selected);
  function changeRoom(next: number) { setRoom(next); setSelected(null); }

  return <>
    <header className="study-room-heading">
      <div><p className="study-kicker">A ROOM FOR SMALL STEPS</p><h2 id="study-room-title">それぞれの目標へ。同じ空間で。</h2></div>
      <p>ひと息ついて、また一問。<br />チワワのポーズは学習風景のイメージです。</p>
    </header>
    <div className="study-room-layout">
      <div className="study-room-card">
        <div className="study-room-toolbar"><div><h3>木もれびの自習室</h3><p>{measured ? `部屋 ${measured.room + 1} / ${measured.roomCount.toLocaleString("ja-JP")}` : "QUALIFICATION LIBRARY"}</p></div>
          <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} className="study-room-motion">{paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}{paused ? "動きを再開" : "動きを止める"}</button>
        </div>
        <div className="study-room-state">
          {snapshot ? "直近5分の集計に基づく表示・イラスト1匹が1人分です" : "資格紹介 実際の学習人数ではありません"}
          {stale && <p>学習状況の更新を待っています。</p>}
        </div>
        <div className={`study-room-scene${paused ? " study-room-paused" : ""}`} role="group" aria-label={snapshot ? "集計に基づくチワワの自習室" : "資格を紹介するイメージルーム"}>
          <span className="study-room-light" aria-hidden="true">木もれびの時間</span>
          {seats.map(seat => <button key={seat.index} type="button" className={`study-room-seat study-seat-${seat.index}`} aria-label={`${seat.name}のチワワ${snapshot ? "（集計人数のイメージ）" : "（資格紹介）"}`} aria-pressed={selected === seat.index} onClick={() => setSelected(value => value === seat.index ? null : seat.index)}>
            <span className={`study-mascot study-pose-${[0, 2, 3, 4, 1, 6, 5, 9, 7, 10, 8, 11][seat.index]}`} aria-hidden="true" />
            <span className="study-seat-tag">{seat.name}</span>
          </button>)}
          {snapshot?.count === 0 && <div className="study-room-empty"><p>静かな、自習室。</p><span>あなたのペースで、今日の一問を。</span></div>}
        </div>
        <div className="study-room-foot">
          <p>{measured ? `この部屋 ${measured.occupancy}人 / 12席` : "気になる資格のチワワを選んでみましょう。"}</p>
          <span>{measured ? `全${snapshot!.count.toLocaleString("ja-JP")}人のうち、この部屋の人数を表示` : "紹介用イラストは実際の利用者を表しません。"}</span>
        </div>
        {measured && measured.roomCount > 1 && <nav className="study-room-navigation" aria-label="自習室の部屋を選ぶ">
          <button type="button" disabled={measured.room === 0} onClick={() => changeRoom(measured.room - 1)}><ArrowLeft aria-hidden="true" />前の部屋</button>
          <span>部屋 {measured.room + 1} / {measured.roomCount.toLocaleString("ja-JP")}</span>
          <button type="button" disabled={measured.room === measured.roomCount - 1} onClick={() => changeRoom(measured.room + 1)}>次の部屋<ArrowRight aria-hidden="true" /></button>
        </nav>}
      </div>
      <aside className="study-room-sidebar">
        <div className="study-room-summary">
          <p className="study-kicker">{snapshot ? "直近5分の学習状況" : "学びの入口を、ひとつ。"}</p>
          <p className="study-room-total">{snapshot ? <><strong>{snapshot.count.toLocaleString("ja-JP")}</strong><span>人</span></> : "資格紹介"}</p>
          {snapshot && <p className="study-room-measurement">確認 <time dateTime={snapshot.measuredAt}>{new Date(snapshot.measuredAt).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}</time></p>}
          {snapshot?.exams.length ? <ul className="study-room-counts" aria-label="資格別の学習人数" tabIndex={0}>
            {snapshot.exams.map(row => <li key={row.exam}>直近5分に<strong>{row.count.toLocaleString("ja-JP")}</strong>人が{presenceExamName(row.exam)}を学習しました。</li>)}
          </ul> : <div className="study-room-guidance">
            {snapshot && <p>直近5分の学習人数は0人です。</p>}
            <p>公開中の問題から学習を始めてみませんか。</p>
            {introductions.length > 0 && <ul>{introductions.map(item => <li key={item.href}><a href={item.href}>{item.name}の問題を見る<ArrowRight aria-hidden="true" /></a></li>)}</ul>}
            <a href="#home-directory-title" className="study-text-link">資格から問題を探す<ArrowRight aria-hidden="true" /></a>
          </div>}
          {snapshot && <p className="study-room-disclosure" title="直近5分に操作した、表示中の問題の資格を集計します。同じブラウザは最後に活動した資格で1人。更新は90秒間隔で、操作が2分途切れると送信を止めます。">直近5分の学習状況・同じブラウザは1人</p>}
        </div>
        <div className="study-room-focus" aria-live="polite" aria-atomic="true">
          <p className="study-kicker">SMALL STEPS, TOGETHER.</p>
          <h3>{focus?.name ?? "今日も、あなたのペースで。"}</h3>
          <p>{focus ? "イラストの姿勢は演出です。利用者個人や実際の行動を示すものではありません。" : "気になるチワワを選ぶと、資格名を確認できます。"}</p>
          {focus?.href && <a href={focus.href} className="study-text-link">{focus.name}へ<ArrowRight aria-hidden="true" /></a>}
        </div>
      </aside>
    </div>
  </>;
}
