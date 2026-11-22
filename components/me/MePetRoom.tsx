"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Award, Heart, Settings, Sparkles, Star, Utensils } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { usePetProfileView } from "@/components/pet/usePetProfileView";
import type { PetPose } from "@/lib/pet/v1/art";
import { RoomChihuahua } from "@/components/home/RoomChihuahua";
import { idleArt } from "@/lib/home/study-room";
import { RELAXED_ROOM_ART } from "@/lib/home/room-chihuahua-art";
import { savePetCare } from "@/lib/pet/v1/browser-care";
import type { PetCareAction } from "@/lib/pet/v1/care";
import type { PetProfile } from "@/lib/pet/v1/profile";
import { lifetimePetStage, ROOM_STAGES, ROOM_STAGE_LABELS } from "@/lib/me/pet";
import { LS_KEYS } from "@/lib/storage/keys";
import { examLabel } from "@/lib/utils";

const PetCareSheet = dynamic(() => import("@/components/pet/PetCareSheet"), { ssr: false });
type Accessory = NonNullable<PetProfile["care"]["appearance"]>["accessory"];
const accessories: readonly { id: Accessory; label: string; level: number; paid?: boolean }[] = [
  { id: "none", label: "なし", level: 0 }, { id: "bandana", label: "バンダナ", level: 0 },
  { id: "bow", label: "蝶ネクタイ", level: 1 }, { id: "scarf", label: "マフラー", level: 2 },
  { id: "star", label: "星のブローチ", level: 0, paid: true },
];

export function MePetRoom({ exam, minutes, todayCount, goal, passedExams, streak }: {
  exam: string; minutes: number; todayCount: number; todayExamCount: number; streak?: number; goal: number; passedExams: string[]; paceBehind?: boolean;
}) {
  const view = usePetProfileView(() => {});
  const [pose, setPose] = useState<PetPose | null>(null), [message, setMessage] = useState("");
  const [settingsOwner, setSettingsOwner] = useState<string | null>(null), [clothesOwner, setClothesOwner] = useState<string | null>(null);
  const [qualification, setQualification] = useState<string | null>(null);
  const [paused, setPaused] = useState(true), [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState<{ owner: string; value: boolean } | null>(null);
  const nameButton = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doc = view.document, owner = doc?.ownerScope;
  const selectedExam = qualification ?? exam;
  const profile = doc?.profiles.find(profile => profile.qualificationId === selectedExam) ?? doc?.profiles.find(profile => profile.qualificationId === exam) ?? doc?.profiles[0];
  const stage = lifetimePetStage(doc, minutes);
  const level = ROOM_STAGES.indexOf(stage);
  const entitled = paid !== null && paid.owner === owner && paid.value;
  const appearance = profile?.care.appearance;
  const accessory = appearance?.accessory === "star" && !entitled ? "none" : appearance?.accessory ?? "none";
  const formal = entitled && appearance?.costume === "formal";
  const mealOwner = doc?.profiles.find(item => item.care.meals.some(meal => meal.consumedAt === null));
  const meal = mealOwner?.care.meals.find(meal => meal.consumedAt === null);
  const enabled = view.status === "ready" && !busy;
  const petted = pose === "petted";
  useEffect(() => {
    try { setPaused(JSON.parse(localStorage.getItem(LS_KEYS.studyRewardPreferences) ?? "null")?.paused === true); } catch { setPaused(false); }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);
  useEffect(() => {
    if (!owner) return;
    let cancelled = false;
    const controller = new AbortController();
    const refresh = () => {
      // Reuse the existing server entitlement (web + App Store). A local
      // premium flag or a saved cosmetic never establishes paid status.
      void fetch("/api/billing/status", { cache: "no-store", signal: controller.signal }).then(async response => {
        const status: unknown = response.ok ? await response.json() : null;
        if (!cancelled) setPaid({ owner, value: !!status && typeof status === "object" && "entitled" in status && status.entitled === true });
      }).catch(() => { if (!cancelled) setPaid({ owner, value: false }); });
    };
    refresh(); window.addEventListener("mobile:entitlement-changed", refresh); window.addEventListener("focus", refresh);
    return () => { cancelled = true; controller.abort(); window.removeEventListener("mobile:entitlement-changed", refresh); window.removeEventListener("focus", refresh); };
  }, [owner]);
  useEffect(() => {
    setQualification(null); setPose(null); setMessage("");
  }, [owner]);
  const motion = (next: boolean) => {
    setPaused(next);
    try { const saved = JSON.parse(localStorage.getItem(LS_KEYS.studyRewardPreferences) ?? "{}"); localStorage.setItem(LS_KEYS.studyRewardPreferences, JSON.stringify({ ...saved, paused: next })); } catch { setMessage("設定を保存できませんでした"); }
  };
  const react = (next: PetPose, text: string) => {
    if (timer.current) clearTimeout(timer.current);
    setPose(next); setMessage(text); timer.current = setTimeout(() => { setPose(null); setMessage(""); }, 4000);
  };
  const care = async (action: PetCareAction, qualificationId = profile?.qualificationId) => {
    if (!doc || !qualificationId || busy) return;
    setBusy(true); setMessage("");
    try { await savePetCare(doc, qualificationId, action); if (action.type === "feed") react("meal", "ごはん、ありがとう。"); }
    catch { setMessage("保存を確認できませんでした。もう一度お試しください。"); }
    finally { setBusy(false); }
  };
  return <section aria-label="チワワの部屋" data-pet-stage={stage} data-pet-mood="relaxed" className="overflow-hidden rounded-2xl border border-border bg-card">
    <div className="p3-landscape p3-hero p3-me-hero">
      <dl className="col-start-1 row-start-1 self-center">
        <dt className="text-sm font-semibold">連続日数</dt>
        <dd className="mt-1 font-display text-[39px] leading-none font-bold tabular-nums">{streak ?? "—"}<span className="ml-1 font-sans text-sm">日</span></dd>
        <dd className="mt-2 text-xs">{examLabel(selectedExam)}</dd>
      </dl>
      {passedExams.length ? <div aria-label="合格証" className="col-start-2 row-start-2 w-fit max-w-full justify-self-center rounded-sm border-2 border-amber-700/60 dark:border-amber-500/60 bg-card px-2 py-2 text-center shadow-sm"><Award aria-hidden="true" className="mx-auto mb-1 size-4 text-amber-700 dark:text-amber-400" /><span className="block text-xs text-muted-foreground">合格</span><span className="block text-balance text-xs font-bold leading-relaxed">{examLabel(passedExams[0])}</span>{passedExams.length > 1 ? <span className="text-xs text-muted-foreground">+{passedExams.length - 1}</span> : null}</div> : null}
      <button type="button" aria-label="チワワをなでる" disabled={!enabled} onClick={() => react("petted", "なでなで、うれしそう。")} className={`relative col-start-2 row-start-1 aspect-square w-full self-end rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${pose && !paused ? "motion-safe:animate-pulse" : ""}`}>
        <RoomChihuahua src={petted ? RELAXED_ROOM_ART.petted : pose === "meal" ? RELAXED_ROOM_ART.play : idleArt(selectedExam, "wave") ?? RELAXED_ROOM_ART.play} alt={`${ROOM_STAGE_LABELS[stage]}のチワワ（くつろぎ）`} />
        {formal ? <svg aria-hidden="true" viewBox="0 0 100 70" width="54" height="38" className="pointer-events-none absolute bottom-[24%] left-[68%] -rotate-12 -translate-x-1/2 drop-shadow-sm"><path d="m22 9 28 10L78 9l17 48-25 7H30L5 57z" fill="#d7a34b" stroke="#a77927" strokeWidth="2" /><path d="m22 9 28 10-12 22-13-15zM78 9 50 19l12 22 13-15z" fill="#fff0c7" /><path d="M50 23v39" stroke="#b38537" strokeWidth="2" /><circle cx="54" cy="44" r="2" fill="#fff5d5" /><circle cx="54" cy="54" r="2" fill="#fff5d5" /></svg> : null}
        {accessory !== "none" ? <span aria-hidden="true" className={`absolute bottom-[28%] left-[68%] -translate-x-1/2 ${accessory === "star" ? "text-amber-500" : "text-rose-500"}`}><AccessoryArtwork accessory={accessory} /></span> : null}
        {petted ? <Heart aria-hidden="true" className="absolute right-2 top-3 size-7 fill-rose-300 text-rose-300" /> : null}
        {formal ? <Sparkles aria-hidden="true" className="absolute right-1 top-20 size-5 text-amber-500" /> : null}
      </button>
      {meal ? <button type="button" disabled={!enabled} aria-label="ごはんをあげる" onClick={() => void care({ type: "feed", rewardId: meal.rewardId }, mealOwner?.qualificationId)} className="col-start-1 row-start-2 flex min-h-11 items-center justify-self-start gap-1 rounded-full border border-border bg-card px-3 text-xs text-primary hover:bg-muted"><Utensils aria-hidden="true" className="size-4" />{doc?.profiles.reduce((sum, item) => sum + item.care.meals.filter(meal => meal.consumedAt === null).length, 0)}</button> : todayCount >= goal ? <span className="col-start-1 row-start-2 flex items-center self-center gap-1 text-xs text-primary"><Utensils aria-hidden="true" className="size-4" />今日のごはん ✓</span> : null}
    </div>
    <div className="px-4 pb-2 text-center"><span className="font-bold">{profile?.name ?? "チワワ"}</span>
      <button type="button" ref={nameButton} aria-label="チワワの設定" disabled={!enabled} onClick={() => setSettingsOwner(owner ?? null)} className="ml-2 inline-grid size-11 place-items-center rounded-lg align-middle hover:bg-muted"><Settings aria-hidden="true" className="size-4" /></button>
      <p role="status" className="min-h-5 text-xs text-muted-foreground">{message || (view.status === "unavailable" ? "育成の保存を確認できませんでした" : !profile ? "" : "くつろいでいる")}</p>
      <ol aria-label="チワワの成長" className="mx-auto mt-2 flex max-w-72 items-center justify-between">{ROOM_STAGES.map((item, index) => <li key={item} aria-current={item === stage ? "step" : undefined} className={`relative flex flex-1 flex-col items-center gap-1 border-t-2 pt-2 text-xs ${index === level ? "after:absolute after:-top-[5px] after:left-1/2 after:size-2 after:-translate-x-1/2 after:rounded-full after:bg-primary after:ring-4 after:ring-card" : ""} ${index <= level ? "border-primary font-semibold text-primary" : "border-border text-muted-foreground"}`}>{ROOM_STAGE_LABELS[item]}</li>)}</ol>
    </div>
    {settingsOwner !== null ? <PetCareSheet key={`${settingsOwner}:${selectedExam}`} document={doc?.ownerScope === settingsOwner ? doc : null} qualificationId={selectedExam} initialSettingsOpen motionPaused={paused} onMotionChange={motion} allowMotion={!paused} onClose={() => setSettingsOwner(null)} returnFocus={() => nameButton.current?.focus()} onPose={react} appearanceAction={profile ? () => { setSettingsOwner(null); setClothesOwner(owner ?? null); } : undefined} /> : null}
    <Dialog open={clothesOwner !== null && clothesOwner === owner} onOpenChange={open => { if (!open) setClothesOwner(null); }}><DialogContent aria-describedby={undefined} onCloseAutoFocus={event => { event.preventDefault(); nameButton.current?.focus(); }} className="max-h-[85dvh] overflow-y-auto [&>button:last-child]:size-11"><DialogTitle className="pr-11">着がえ</DialogTitle>
      <label className="grid gap-2 text-sm font-medium">資格の服<select className="min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary" value={profile?.qualificationId ?? ""} disabled={busy} onChange={event => setQualification(event.target.value)}>{doc?.profiles.map(item => <option key={item.qualificationId} value={item.qualificationId}>{examLabel(item.qualificationId)}</option>)}</select></label>
      <details><summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">小物</summary><div className="grid grid-cols-2 gap-2">{accessories.map(item => <button key={item.id} type="button" disabled={busy || item.level > level || (!!item.paid && !entitled)} aria-pressed={accessory === item.id} onClick={() => void care({ type: "appearance", costume: appearance?.costume ?? "qualification", accessory: item.id })} className={`flex min-h-12 items-center justify-center gap-1.5 rounded-xl border border-border px-3 text-sm outline-offset-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary ${item.paid ? "col-span-2" : ""} aria-pressed:border-emerald-600 aria-pressed:bg-emerald-50 aria-pressed:text-emerald-900 disabled:opacity-60 dark:aria-pressed:bg-emerald-950 dark:aria-pressed:text-emerald-100`}>{item.paid ? <Star aria-hidden="true" className="size-4 shrink-0 text-amber-700 dark:text-amber-400" /> : null}{item.label}{item.level > level ? ` · ${ROOM_STAGE_LABELS[ROOM_STAGES[item.level]]}` : item.paid && !entitled ? " · 月額" : ""}</button>)}</div></details>
      <details><summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">服</summary><div className="grid grid-cols-2 gap-2">{(["qualification", "formal"] as const).map(costume => <button key={costume} type="button" disabled={busy || (costume === "formal" && !entitled)} aria-pressed={(formal ? "formal" : "qualification") === costume} onClick={() => void care({ type: "appearance", costume, accessory })} className="min-h-12 rounded-xl border border-border px-3 text-sm outline-offset-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary aria-pressed:border-emerald-600 aria-pressed:bg-emerald-50 aria-pressed:text-emerald-900 disabled:opacity-60 dark:aria-pressed:bg-emerald-950 dark:aria-pressed:text-emerald-100">{costume === "formal" ? `金の晴れ着${entitled ? "" : " · 月額"}` : "資格の服"}</button>)}</div></details>
      <p role="status" className="text-xs text-muted-foreground empty:hidden">{message}</p>
    </DialogContent></Dialog>
  </section>;
}

function AccessoryArtwork({ accessory }: { accessory: Exclude<Accessory, "none"> }) {
  if (accessory === "star") return <Star className="size-7 fill-amber-300 drop-shadow-sm" />;
  return <svg width="46" height="28" viewBox="0 0 46 28" className="drop-shadow-sm" fill="currentColor">
    {accessory === "bow" ? <><path d="M22 14 4 3v22l18-9M24 14 42 3v22L24 16" /><circle cx="23" cy="14" r="5" /></> : accessory === "scarf" ? <><rect x="3" y="3" width="40" height="10" rx="5" /><path d="m28 10 10 2-3 15-10-3z" /></> : <path d="M3 3h40L23 27z" />}
  </svg>;
}
