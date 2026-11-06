"use client";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { PetProfileDocument } from "@/lib/pet/v1/profile";
import { PET_BACKUP_MAX_BYTES } from "@/lib/pet/v1/profile";
import { parsePetBackup } from "@/lib/pet/v1/profile-store";
import { PET_PATHS, PET_PATH_LABELS, petGrowthProgress } from "@/lib/pet/v1/growth";
import { exportCurrentPetBackup, restoreCurrentPetBackup, savePetCare, writeCurrentPetBackup } from "@/lib/pet/v1/browser-care";
import type { PetCareAction } from "@/lib/pet/v1/care";
import { PET_ROOM_STORIES } from "@/lib/pet/v1/room";
import { petArtFor, petPathArtFor, type PetPose } from "@/lib/pet/v1/art";
import { examLabel } from "@/lib/utils";
import styles from "./PetCareSheet.module.css";

export default function PetCareSheet({ document: doc, qualificationId, onClose, returnFocus, onPose }: {
  document: PetProfileDocument | null; qualificationId?: string; onClose(): void;
  returnFocus(): void; onPose(pose: PetPose, caption: string): void;
}) {
  const [selected, setSelected] = useState(qualificationId), [busy, setBusy] = useState(false), [message, setMessage] = useState("");
  const [pending, setPending] = useState<{ raw: string; expected: PetProfileDocument; pets: number } | null>(null);
  const [savedPrevious, setSavedPrevious] = useState(false), [confirmed, setConfirmed] = useState(false);
  const [pose, setPose] = useState<PetPose>("study");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const showPose = (next: PetPose, caption: string) => {
    if (timer.current) clearTimeout(timer.current);
    setPose(next); onPose(next, caption); timer.current = setTimeout(() => setPose("study"), 6000);
  };
  const profile = selected ? doc?.profiles.find(item => item.qualificationId === selected) : doc?.profiles[0];
  const progress = profile ? petGrowthProgress(profile) : null;
  const meal = profile?.care.meals.find(item => item.consumedAt === null);
  const act = async (work: () => Promise<void>) => {
    if (busy) return;
    setBusy(true); setMessage("");
    try { await work(); } catch { setMessage("保存を確認できませんでした。所有者や学習内容が変わった場合は、開き直してお試しください。"); }
    finally { setBusy(false); }
  };
  const care = (action: PetCareAction) => {
    if (!doc || !profile) return;
    void act(async () => {
      await savePetCare(doc, profile.qualificationId, action); setMessage("保存しました。");
      if (action.type === "feed") showPose("meal", "ごほうびごはんを、ゆっくり味わいました。");
    });
  };
  return <Dialog open onOpenChange={open => { if (!open && !busy) onClose(); }}>
    <DialogContent className={styles.sheet} onOpenAutoFocus={event => { event.preventDefault(); heading.current?.focus({ preventScroll: true }); }} onCloseAutoFocus={event => { event.preventDefault(); returnFocus(); }}>
      <DialogTitle ref={heading} tabIndex={-1}>チワワの育成</DialogTitle>
      <DialogDescription>この端末で、いっしょに育ちます。閉じても育成は続きます。通常のごはんと水はいつでもあります。</DialogDescription>
      <div role="status" className={styles.message}>{message}</div>
      {!doc ? <p>保存の所有者を確認中です。</p> : <>
        {doc.profiles.length > 1 || (selected && !profile && doc.profiles.length > 0) ? <label>育成を見る資格<select value={profile?.qualificationId ?? ""} disabled={busy} onChange={event => { setSelected(event.target.value); setPose("study"); setMessage(""); }}>
          {!profile ? <option value="">資格を選んでください</option> : null}
          {doc.profiles.map(item => <option key={item.petId} value={item.qualificationId}>{examLabel(item.qualificationId)}</option>)}
        </select></label> : null}
        {profile && progress ? <>
          <div className={styles.hero}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={petArtFor(profile.qualificationId, profile.selectedStage, pose)} width={112} height={112} alt="" />
            <div><p>{examLabel(profile.qualificationId)}の{profile.name}</p><p>{profile.selectedStage === "puppy" ? "こいぬ" : profile.selectedStage === "partner" ? "学習の相棒" : "専門家"}</p>
              <p>{profile.selectedPath ? `${PET_PATH_LABELS[profile.selectedPath]}の特技` : "あなたのペースで、一問ずつ。"}</p></div>
          </div>
          <form key={`${profile.petId}:${profile.name}`} onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); care({ type: "name", name: String(data.get("petName") ?? "") }); }}>
            <label>名前<input name="petName" defaultValue={profile.name} required maxLength={24} disabled={busy} /></label><button disabled={busy} type="submit">名前を保存</button>
          </form>
          <section><h4>世話</h4><div className={styles.row}>
            <button type="button" onClick={() => { showPose("petted", "そっとなでると、うれしそう。"); setMessage("うれしそうにしています。世話で成長値は変わりません。"); }}>なでる</button>
            <button type="button" onClick={() => { showPose("rest", "のんびり、ひと休み。"); setMessage("ひと息つこう。休んでも不利益はありません。"); }}>休む</button>
            {meal ? <button type="button" disabled={busy} onClick={() => care({ type: "feed", rewardId: meal.rewardId })}>ごほうびごはんを食べる</button> : null}
          </div><label className={styles.check}><input type="checkbox" checked={profile.care.autoFeed} disabled={busy} onChange={event => care({ type: "autoFeed", enabled: event.target.checked })} />ごほうびごはんは自動で食べる</label>
            <p>学習した日に届くごはんです。食べ忘れは次の学習日に自動で片づきます。手動でも自動でも育ち方は同じです。</p></section>
          <section><h4>自分が育てた姿</h4><p>異なる5問の有効な回答で「学習の相棒」。今は{Math.min(progress.uniqueQuestions, 5)} / 5問。いつでも前の姿を選べます。</p>
            <div className={styles.row}>{(["puppy", "partner"] as const).map(stage => <button type="button" key={stage} disabled={busy || !profile.unlockedStages.includes(stage)} aria-pressed={profile.selectedStage === stage} onClick={() => care({ type: "stage", stage })}>{stage === "puppy" ? "こいぬ" : "学習の相棒"}</button>)}</div></section>
          <section><h4>覚えた技</h4><p>開いた系統はいつでも選び直せます。間隔を空けた復習は24時間以上が目安です。</p>
            <ul className={styles.paths}>
              <li>探究：3分野で自力正解（{progress.fields} / 3分野）</li>
              <li>記憶：間隔を空けた自力正解3回（{progress.delayedAnswers} / 3回）</li>
              <li>精密：直近の異なる20問で16問正解、または異なる5問で間隔を空けて正解（{progress.delayedQuestions} / 5問）</li>
              <li>伴走：学習した日が5日（{progress.learningDays} / 5日）。連続でなくても大丈夫。</li>
            </ul><div className={styles.row}><button type="button" disabled={busy} aria-pressed={profile.selectedPath === null} onClick={() => care({ type: "path", path: null })}>系統なし</button>
              {PET_PATHS.map(path => <button key={path} type="button" disabled={busy || !profile.unlockedPaths.includes(path)} aria-pressed={profile.selectedPath === path} onClick={() => care({ type: "path", path })}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={petPathArtFor(path)} width={28} height={28} alt="" loading="lazy" decoding="async" className={styles.icon} />{PET_PATH_LABELS[path]}{profile.unlockedPaths.includes(path) ? "" : "（これから）"}</button>)}</div>
          </section>
          <section><h4>自習室のアルバム</h4><p>学習した日に、少しずつ出来事が増えます。見逃してもここに残り、再読込で引き直すことはありません。</p>
            {profile.roomEvents.length ? <ul className={styles.album}>{profile.roomEvents.map(event => { const story = PET_ROOM_STORIES[event.scene]; return <li key={event.scene}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/pet-v1/${story.art}.webp`} alt="" width={64} height={64} loading="lazy" decoding="async" /><div><strong>{story.title}</strong><p>{story.text}</p><time>{event.day}</time></div>
            </li>; })}</ul> : <p>次の学習から、机の小さな出来事が残ります。</p>}</section>
          <section><h4>思い出</h4>{profile.memories.length ? <ol className={styles.memories}>{profile.memories.slice(-50).reverse().map((memory, index) => <li key={`${memory.kind}-${memory.occurredAt}-${index}`}>
            <time>{new Intl.DateTimeFormat("ja", { timeZone: doc.timeZone, year: "numeric", month: "numeric", day: "numeric" }).format(memory.occurredAt)}</time> — {memory.kind === "overcome" ? "前に迷った問題を、自力で克服しました。" : memory.kind === "stage" ? "学習の相棒の姿を覚えました。" : `${PET_PATH_LABELS[memory.path]}の特技を覚えました。`}
          </li>)}</ol> : <p>これから、一緒に思い出を重ねよう。</p>}{profile.memories.length > 50 ? <p>最近の50件を表示しています。すべての思い出はバックアップに残ります。</p> : null}
            {doc.legacyMigration ? <p>以前の育成の思い出も保存しています。資格や成績が分からない記録を推測して配り直すことはありません。</p> : null}</section>
        </> : <p>最初の回答をすると、この資格の子と出会えます。</p>}
        <section><h4>端末内の保存とバックアップ</h4><p>クラウド引き継ぎは未対応です。保存の所有者：{doc.ownerScope === "guest" ? "この端末のゲスト" : "ログイン中のアカウント"}。バックアップは同じ所有者へ復元できます。</p>
          <button type="button" disabled={busy} onClick={() => void act(async () => { await writeCurrentPetBackup(doc, "chihuahua-backup.json"); setMessage("バックアップを書き出しました。"); })}>バックアップを保存</button>
          <label>バックアップを読み込む<input type="file" accept="application/json,.json" disabled={busy} onChange={event => {
            const file = event.target.files?.[0]; event.target.value = ""; setPending(null); setSavedPrevious(false); setConfirmed(false);
            if (!file) return;
            void act(async () => {
              if (file.size > PET_BACKUP_MAX_BYTES) throw new Error("too_large");
              const raw = await file.text(), imported = parsePetBackup(raw);
              if (imported.ownerScope !== doc.ownerScope || imported.timeZone !== doc.timeZone) throw new Error("owner_or_timezone");
              await exportCurrentPetBackup(doc);
              setPending({ raw, expected: doc, pets: imported.profiles.length }); setMessage("読み込みました。復元前に現在の育成を退避してください。");
            });
          }} /></label>
          {pending ? <div className={styles.restore}><p>{pending.pets}匹の育成データで、この所有者の現在の育成を置き換えます。</p>
            <button type="button" disabled={busy} onClick={() => void act(async () => { await writeCurrentPetBackup(pending.expected, "chihuahua-before-restore.json"); setSavedPrevious(true); })}>復元前のデータを保存</button>
            <label className={styles.check}><input type="checkbox" checked={confirmed} disabled={busy || !savedPrevious} onChange={event => setConfirmed(event.target.checked)} />退避ファイルを保存したことを確認し、置き換えます</label>
            <button type="button" disabled={busy || !savedPrevious || !confirmed} onClick={() => void act(async () => { await restoreCurrentPetBackup(pending.expected, pending.raw); setPending(null); setMessage("復元しました。報酬や反応の再生はありません。"); })}>確認したデータを復元</button>
            <button type="button" disabled={busy} onClick={() => setPending(null)}>復元をやめる</button></div> : null}
        </section>
      </>}
      <button type="button" className={styles.done} disabled={busy} onClick={onClose}>育成を閉じて学習に戻る</button>
    </DialogContent>
  </Dialog>;
}
