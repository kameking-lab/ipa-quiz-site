"use client";
import { useEffect, useRef, useState } from "react";
import { Browser } from "@capacitor/browser";
import { usePathname, useSearchParams } from "next/navigation";
import { pageQualifications } from "../shared/qualification-context";
import { qualificationTargets, qualificationUrl, todayJst, type CalendarDraft, type QualificationTarget } from "../shared/qualification-schedules";
import { addQualificationEvent, fetchQualificationSchedules, openQualificationUrl } from "./qualification-platform";

const services = { fetch: fetchQualificationSchedules, add: addQualificationEvent, open: openQualificationUrl, source: async (url: string) => { await Browser.open({ url }); } };
const actionClass = "min-h-11 rounded-lg border px-3 py-2 text-left disabled:opacity-50";
export function QualificationActions({ target, service = services }: { target: QualificationTarget; service?: typeof services }) {
  const [events, setEvents] = useState<CalendarDraft[]>([]), [notice, setNotice] = useState(""), [busy, setBusy] = useState(false), [loaded, setLoaded] = useState(false);
  const running = useRef(false), generation = useRef(0);
  useEffect(() => { generation.current++; setEvents([]); setNotice(""); setLoaded(false); }, [target.id]);
  async function run(work: () => Promise<void>) {
    if (running.current) return;
    running.current = true; setBusy(true); setNotice("");
    try { await work(); } catch (e) { setNotice(e instanceof Error ? e.message : "処理を完了できませんでした。"); }
    finally { running.current = false; setBusy(false); }
  }
  return <section aria-label={`${target.name}の日程と申込情報`} className="space-y-2 break-words rounded-xl border p-3">
    <h2 className="font-bold">{target.name}の日程・申込情報</h2>
    <button className={actionClass} disabled={busy} onClick={() => void run(() => service.open(qualificationUrl(target.id)))}>次の資格で申込方法・日程・関連資格を見る</button>
    <p className="text-sm">日程提供：次の資格。確定日程のみ追加できます。保存はiOS 17以降の標準編集画面で選べます。</p>
    <button className={actionClass} disabled={busy || target.calendarScope !== "specific"} onClick={() => void run(async () => {
      const current = generation.current; setEvents([]); setLoaded(false);
      const fresh = await service.fetch(target);
      if (current === generation.current) { setEvents(fresh); setLoaded(true); }
    })}>{busy ? "確認中…" : "試験日・申込締切を取得・再確認"}</button>
    {target.calendarScope !== "specific" && <p>級・区分を特定できる確定日程がないため、追加できません。資格ページで確認してください。</p>}
    {loaded && events.length === 0 && <p>追加できる確定日程はありません。未発表・目安・過去・確認期限切れの日程は追加できません。</p>}
    {events.map(event => <div key={event.id} className="space-y-1 border-t py-2">
      <p>{event.startDay} · {event.title}</p>
      <p className="text-sm">終日 · 出典確認日：{event.verifiedAt} · 確認期限：{event.validUntil}</p>
      <button className={actionClass} disabled={busy} onClick={() => void run(() => service.source(event.sourceUrl))}>公式出典を確認</button>{" "}
      <button className={actionClass} disabled={busy || event.startDay < todayJst() || event.validUntil < todayJst()} onClick={() => void run(async () => {
        try { const saved = await service.add(event, target); setNotice(saved ? "カレンダーに保存しました。" : "保存をキャンセルしました。"); }
        catch (error) { setEvents([]); setLoaded(false); throw error; }
      })}>カレンダーに追加</button>
    </div>)}
    {notice && <p role="status">{notice}</p>}
  </section>;
}
export function QualificationCardActions({ code }: { code: string }) {
  const [expanded, setExpanded] = useState(false);
  const targets = qualificationTargets(code);
  return <details onToggle={e => setExpanded(e.currentTarget.open)}><summary className="min-h-11 cursor-pointer py-2">試験日・申込情報・カレンダー</summary>
    {expanded && (targets.length ? targets.map(t => <QualificationActions key={t.id} target={t}/>) : <p>該当資格の公開情報を確認できていません。日程の追加はできません。</p>)}
  </details>;
}
export function NativePageQualificationActions({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const [expanded, setExpanded] = useState(false);
  const targets = pageQualifications(pathname, search.toString());
  const unavailable = ["gas-otsu", "gas-hei"].some(code => pathname === `/${code}` || pathname.startsWith(`/${code}/`) || search.get("exam") === code);
  if (!targets.length && unavailable) return <p className="py-3">この資格の公開ページ・確定日程を確認できていません。カレンダーへの追加はできません。</p>;
  if (!targets.length) return null;
  const list = <div className="space-y-3 pb-3">{targets.map(target => <QualificationActions key={target.id} target={target}/>)}</div>;
  // Above the page content: keep the question visible on the first screen.
  if (collapsed) return <details className="mx-auto mt-1 max-w-2xl" onToggle={e => setExpanded(e.currentTarget.open)}>
    <summary className="flex min-h-11 cursor-pointer items-center text-sm font-medium">試験日・申込情報・カレンダー</summary>
    {expanded && list}
  </details>;
  return <div className="mx-auto max-w-2xl py-3">{list}</div>;
}
