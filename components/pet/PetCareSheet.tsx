"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { PetProfileDocument } from "@/lib/pet/v1/profile";
import { PET_BACKUP_MAX_BYTES } from "@/lib/pet/v1/profile";
import { parsePetBackup } from "@/lib/pet/v1/profile-store";
import { PET_PATHS, PET_PATH_LABELS, petGrowthProgress, petNextStageProgress, type PetPath } from "@/lib/pet/v1/growth";
import { exportCurrentPetBackup, restoreCurrentPetBackup, savePetCare, writeCurrentPetBackup } from "@/lib/pet/v1/browser-care";
import type { PetCareAction } from "@/lib/pet/v1/care";
import { PET_ROOM_SCENES, PET_ROOM_STORIES } from "@/lib/pet/v1/room";
import { petArtFor, petPathArtFor, type PetPose } from "@/lib/pet/v1/art";
import { examLabel } from "@/lib/utils";
import { normalizePetName, PET_DEFAULT_NAME, PET_NAME_MAX } from "@/lib/pet/v1/name";
import { petDisplayName } from "./PetNameTitle";
import styles from "./PetCareSheet.module.css";
import { usePetNextAction } from "./usePetNextAction";
import { petAlbumEntries } from "@/lib/pet/v1/album";
import { petLearningDay } from "@/lib/pet/v1/learning";

const STAGE_NAMES = { puppy: "こいぬ", partner: "学習の相棒", expert: "専門家" } as const;

export default function PetCareSheet({ document: doc, qualificationId, initialAppearanceOpen = false, allowMotion = true, onClose, returnFocus, onPose }: {
  document: PetProfileDocument | null; qualificationId?: string; onClose(): void;
  initialAppearanceOpen?: boolean;
  allowMotion?: boolean;
  returnFocus(): void; onPose(pose: PetPose, caption: string, qualificationId: string): void;
}) {
  const [selected, setSelected] = useState(qualificationId), [busy, setBusy] = useState(false), [message, setMessage] = useState("");
  const [pending, setPending] = useState<{ raw: string; expected: PetProfileDocument; pets: number } | null>(null);
  const [savedPrevious, setSavedPrevious] = useState(false), [confirmed, setConfirmed] = useState(false);
  const [pose, setPose] = useState<PetPose>("study"), [hearts, setHearts] = useState(0);
  const [sections, setSections] = useState({ appearance: initialAppearanceOpen, paths: false, memories: false, settings: false });
  const toggleSection = (section: keyof typeof sections, open: boolean) => setSections(current => current[section] === open ? current : { ...current, [section]: open });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(true);
  const currentSelection = useRef({ owner: doc?.ownerScope, qualification: selected });
  useEffect(() => { currentSelection.current = { owner: doc?.ownerScope, qualification: selected }; }, [doc?.ownerScope, selected]);
  useEffect(() => {
    mounted.current = true;
    const hide = () => { if (document.hidden) { if (timer.current) clearTimeout(timer.current); setPose("study"); setHearts(0); } };
    document.addEventListener("visibilitychange", hide);
    return () => { mounted.current = false; if (timer.current) clearTimeout(timer.current); document.removeEventListener("visibilitychange", hide); };
  }, []);
  const showPose = (next: PetPose, caption: string) => {
    if (timer.current) clearTimeout(timer.current);
    setPose(next); if (profile) onPose(next, caption, profile.qualificationId); timer.current = setTimeout(() => { setPose("study"); setHearts(0); }, 6000);
  };
  const profile = selected ? doc?.profiles.find(item => item.qualificationId === selected) : doc?.profiles[0];
  const nextAction = usePetNextAction(profile, doc);
  const progress = profile ? petGrowthProgress(profile) : null;
  const next = profile ? petNextStageProgress(profile) : null;
  const meal = profile?.care.meals.find(item => item.consumedAt === null);
  const album = profile ? petAlbumEntries(profile) : [];
  const nextScene = profile ? PET_ROOM_SCENES.find(scene => !profile.roomEvents.some(event => event.scene === scene)) : null;
  const act = async (work: () => Promise<void>) => {
    if (busy) return;
    setBusy(true); setMessage("");
    try { await work(); } catch { setMessage("保存を確認できませんでした。開き直してお試しください。"); }
    finally { setBusy(false); }
  };
  const care = (action: PetCareAction) => {
    if (!doc || !profile) return;
    void act(async () => {
      await savePetCare(doc, profile.qualificationId, action);
      if (!mounted.current || currentSelection.current.owner !== doc.ownerScope || (currentSelection.current.qualification ?? doc.profiles[0]?.qualificationId) !== profile.qualificationId) return;
      setMessage("保存しました。");
      if (action.type === "feed") showPose("meal", "もぐもぐ、ごちそうさま！");
    });
  };
  const pathGoals: Record<PetPath, { now: number; goal: number; hint: string }> | null = progress ? {
    exploration: { now: progress.fields, goal: 3, hint: "3分野で正解" },
    memory: { now: progress.delayedAnswers, goal: 3, hint: "日をあけて正解" },
    precision: { now: progress.delayedQuestions, goal: 5, hint: "直近20問中16正解 または 日をあけて5問" },
    companionship: { now: progress.learningDays, goal: 5, hint: "学習した日" },
  } : null;
  return <Dialog open onOpenChange={open => { if (!open && !busy) onClose(); }}>
    <DialogContent className={styles.sheet} onOpenAutoFocus={event => { event.preventDefault(); heading.current?.focus({ preventScroll: true }); }} onCloseAutoFocus={event => { event.preventDefault(); returnFocus(); }}>
      <DialogTitle ref={heading} tabIndex={-1}>チワワの育成</DialogTitle>
      <DialogDescription>問題を解くほど育ちます。</DialogDescription>
      <div role="status" className={styles.message}>{message}</div>
      {!doc ? <p>読み込み中…</p> : <>
        {doc.profiles.length > 1 || (selected && !profile && doc.profiles.length > 0) ? <label>資格<select value={profile?.qualificationId ?? ""} disabled={busy} onChange={event => { if (timer.current) clearTimeout(timer.current); setSelected(event.target.value); setPose("study"); setHearts(0); onPose("study", "", event.target.value); setMessage(""); setSections({ appearance: false, paths: false, memories: false, settings: false }); }}>
          {!profile ? <option value="">資格を選んでください</option> : null}
          {doc.profiles.map(item => <option key={item.petId} value={item.qualificationId}>{examLabel(item.qualificationId)}</option>)}
        </select></label> : null}
        {profile && progress && pathGoals ? <>
          <div className={styles.hero}>
            <div className={styles.heroArt}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={petArtFor(profile.qualificationId, profile.selectedStage, pose)} width={128} height={128} alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {profile.selectedPath ? <img src={petPathArtFor(profile.selectedPath)} width={32} height={32} alt="" className={styles.heroBadge} /> : null}
              {hearts > 0 ? <span key={hearts} className={`${styles.heart} ${allowMotion ? "" : styles.stillHeart}`} aria-hidden="true">♥</span> : null}
            </div>
            <div className={styles.heroCopy}>
              <p className={styles.name}>{petDisplayName(examLabel(profile.qualificationId), profile.name)}</p>
              <p className={styles.chips}><span className={styles.stageChip}>{STAGE_NAMES[profile.selectedStage]}</span>
                {profile.selectedPath ? <span>{PET_PATH_LABELS[profile.selectedPath]}</span> : null}</p>
              {nextAction ? <p className={styles.goal}>{nextAction.label}</p> : null}
            </div>
          </div>
          <section aria-label="世話"><div className={styles.careRow}>
            <button type="button" disabled={busy} onClick={() => { showPose("petted", "なでなで、うれしそう。"); setHearts(count => count + 1); setMessage(""); }}><span aria-hidden="true" className={styles.emoji}>🤲</span>なでる</button>
            <button type="button" disabled={busy} onClick={() => { showPose("rest", "のんびり、ひと休み。"); setMessage(""); }}><span aria-hidden="true" className={styles.emoji}>💤</span>休む</button>
            {meal ? <button type="button" className={styles.treat} disabled={busy} onClick={() => care({ type: "feed", rewardId: meal.rewardId })}><span aria-hidden="true" className={styles.emoji}>🍖</span>ごほうびごはんを食べる</button> : null}
          </div></section>
          <button type="button" className={styles.done} disabled={busy} onClick={onClose}>学習へ戻る</button>
          {nextAction ? <Link prefetch={false} className={styles.nextAction} href={nextAction.href}>{nextAction.action} ›</Link> : null}
          <details open={sections.appearance} onToggle={event => toggleSection("appearance", event.currentTarget.open)}><summary>姿</summary>
            <div className={styles.tiles}>{(["puppy", "partner", "expert"] as const).map(stage => { const open = profile.unlockedStages.includes(stage); return <button type="button" key={stage} className={styles.tile} disabled={busy || !open} aria-pressed={profile.selectedStage === stage} onClick={() => care({ type: "stage", stage })}>
              {open ? <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={petArtFor(profile.qualificationId, stage, "study")} width={128} height={128} alt="" loading="lazy" decoding="async" />
              </> : null}{STAGE_NAMES[stage]}<span className={styles.selection}>{profile.selectedStage === stage ? "選択中" : open ? "この姿にする" : "これから"}</span></button>; })}</div>
            {next ? <div className={styles.stageGoals}><p>{STAGE_NAMES[next.stage]}まで</p>{next.parts.map(part => <label key={part.unit} className={styles.meter}><span>{part.now}/{part.goal}{part.unit}</span><meter min={0} max={part.goal} value={part.now} /></label>)}</div> : null}
          </details>
          <details open={sections.paths} onToggle={event => toggleSection("paths", event.currentTarget.open)}><summary>特技</summary>
            <div className={styles.paths}>{PET_PATHS.map(path => { const open = profile.unlockedPaths.includes(path), goal = pathGoals[path]; return <div key={path} className={styles.path}>
              <button type="button" className={styles.tile} disabled={busy || !open} aria-pressed={profile.selectedPath === path} onClick={() => care({ type: "path", path: profile.selectedPath === path ? null : path })}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={petPathArtFor(path)} width={36} height={36} alt="" loading="lazy" decoding="async" className={open ? undefined : styles.locked} />{PET_PATH_LABELS[path]}</button>
              {path === "precision" ? <span className={styles.goal}>{goal.hint}<span>最近{profile.recentAnswers.length}/20問・正解{profile.recentAnswers.filter(answer => answer.correct).length}/16</span><span>復習{progress.delayedQuestions}/5問</span></span> : open ? null : <span className={styles.goal}>{goal.hint} {Math.min(goal.now, goal.goal)}/{goal.goal}<meter min={0} max={goal.goal} value={Math.min(goal.now, goal.goal)} /></span>}
            </div>; })}</div>
            {profile.selectedPath ? <button type="button" className={styles.plain} disabled={busy} onClick={() => care({ type: "path", path: null })}>系統なし</button> : null}
          </details>
          <details open={sections.memories} onToggle={event => toggleSection("memories", event.currentTarget.open)}><summary>思い出</summary>
            <p className={styles.chips}><span>成長 {profile.growth}</span><span>なつき {profile.bond}</span><span>いっしょに{progress.learningDays}日</span></p>
          <section><h4>自習室のアルバム</h4>
            {album[0] ? <figure className={styles.latestMemory}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={album[0].art} alt="" width={200} height={200} loading="lazy" decoding="async" />
              <figcaption><time>{new Intl.DateTimeFormat("ja", { timeZone: doc.timeZone, month: "numeric", day: "numeric" }).format(album[0].at)}</time><strong>{album[0].title}</strong><p>{album[0].detail}</p></figcaption>
            </figure> : null}
            {nextScene ? <p className={styles.nextMemory}>次の1枚「{PET_ROOM_STORIES[nextScene].title}」<br />{profile.roomEvents.some(event => event.day === petLearningDay(Date.now(), doc.timeZone)) ? "明日また1問で。" : "今日の1問で。"}</p> : null}
          </section>
          {album.length > 1 ? <ol className={styles.memories}>{album.slice(1, 50).map((memory, index) => <li key={`${memory.title}-${memory.at}-${index}`}>
            <time>{new Intl.DateTimeFormat("ja", { timeZone: doc.timeZone, month: "numeric", day: "numeric" }).format(memory.at)}</time>{memory.title}
          </li>)}</ol> : null}
          </details>
        </> : <><p className={styles.empty}>1問解くと、この資格の子に会えます。</p><button type="button" className={styles.done} disabled={busy} onClick={onClose}>学習へ戻る</button></>}
        <details open={sections.settings} onToggle={event => toggleSection("settings", event.currentTarget.open)}><summary>設定</summary>
          {profile ? <><form key={`${profile.petId}:${profile.name}`} className={styles.nameForm} onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget);
            const result = normalizePetName(String(data.get("petName") ?? ""));
            if (!result.ok) { setMessage(result.error); return; }
            care({ type: "name", name: result.name }); }}>
            <label>名前<input name="petName" defaultValue={profile.name === PET_DEFAULT_NAME ? "" : profile.name} placeholder={PET_DEFAULT_NAME} maxLength={PET_NAME_MAX * 2} autoComplete="off" disabled={busy} /></label><button disabled={busy} type="submit">名前を保存</button>
          </form><label className={styles.check}><input type="checkbox" checked={profile.care.autoFeed} disabled={busy} onChange={event => care({ type: "autoFeed", enabled: event.target.checked })} />ごほうびごはんは自動で食べる</label></> : null}
        <section><h4>バックアップ</h4><p className={styles.note}>育成はこの端末に保存されます（{doc.ownerScope === "guest" ? "ゲスト" : "ログイン中"}）。</p>
          <div className={styles.careRow}><button type="button" disabled={busy} onClick={() => void act(async () => { await writeCurrentPetBackup(doc, "chihuahua-backup.json"); setMessage("バックアップを書き出しました。"); })}>バックアップを保存</button></div>
          <label>バックアップを読み込む<input type="file" accept="application/json,.json" disabled={busy} onChange={event => {
            const file = event.target.files?.[0]; event.target.value = ""; setPending(null); setSavedPrevious(false); setConfirmed(false);
            if (!file) return;
            void act(async () => {
              if (file.size > PET_BACKUP_MAX_BYTES) throw new Error("too_large");
              const raw = await file.text(), imported = parsePetBackup(raw);
              if (imported.ownerScope !== doc.ownerScope || imported.timeZone !== doc.timeZone) throw new Error("owner_or_timezone");
              await exportCurrentPetBackup(doc);
              setPending({ raw, expected: doc, pets: imported.profiles.length }); setMessage("読み込みました。先に今の育成を退避してください。");
            });
          }} /></label>
          {pending ? <div className={styles.restore}><p>{pending.pets}匹の育成データで置き換えます。</p>
            <button type="button" disabled={busy} onClick={() => void act(async () => { await writeCurrentPetBackup(pending.expected, "chihuahua-before-restore.json"); setSavedPrevious(true); })}>復元前のデータを保存</button>
            <label className={styles.check}><input type="checkbox" checked={confirmed} disabled={busy || !savedPrevious} onChange={event => setConfirmed(event.target.checked)} />退避ファイルを保存したことを確認し、置き換えます</label>
            <div className={styles.careRow}><button type="button" disabled={busy || !savedPrevious || !confirmed} onClick={() => void act(async () => { await restoreCurrentPetBackup(pending.expected, pending.raw); setPending(null); setMessage("復元しました。"); })}>確認したデータを復元</button>
              <button type="button" disabled={busy} onClick={() => setPending(null)}>復元をやめる</button></div></div> : null}
        </section></details>
      </>}
    </DialogContent>
  </Dialog>;
}
