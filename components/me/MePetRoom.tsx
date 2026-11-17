"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Award, Heart, Leaf, Shirt, Sparkles, Star, Utensils } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { usePetProfileView } from "@/components/pet/usePetProfileView";
import { petArtFor, petPortraitFor, type PetPose } from "@/lib/pet/v1/art";
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

export function MePetRoom({ exam, minutes, todayCount, todayExamCount, goal, passedExams, paceBehind }: {
  exam: string; minutes: number; todayCount: number; todayExamCount: number; goal: number; passedExams: string[]; paceBehind?: boolean;
}) {
  const view = usePetProfileView(() => {});
  const [pose, setPose] = useState<PetPose | null>(null), [message, setMessage] = useState("");
  const [settingsOwner, setSettingsOwner] = useState<string | null>(null), [clothesOwner, setClothesOwner] = useState<string | null>(null);
  const [qualification, setQualification] = useState<string | null>(null);
  const [paused, setPaused] = useState(true), [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState<{ owner: string; value: boolean } | null>(null);
  const nameButton = useRef<HTMLButtonElement>(null), clothesButton = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doc = view.document, owner = doc?.ownerScope;
  const selectedExam = qualification ?? exam;
  const profile = doc?.profiles.find(profile => profile.qualificationId === selectedExam) ?? doc?.profiles.find(profile => profile.qualificationId === exam) ?? doc?.profiles[0];
  const artExam = qualification ?? profile?.qualificationId ?? exam;
  const stage = lifetimePetStage(doc, minutes);
  const level = ROOM_STAGES.indexOf(stage);
  const entitled = paid !== null && paid.owner === owner && paid.value;
  const appearance = profile?.care.appearance;
  const accessory = appearance?.accessory === "star" && !entitled ? "none" : appearance?.accessory ?? "none";
  const formal = entitled && appearance?.costume === "formal";
  const sleepy = paceBehind ?? todayExamCount < goal;
  const shownPose = pose ?? (sleepy ? "slack" : "study");
  const image = formal ? petArtFor(artExam, stage, shownPose === "study" ? "correct" : shownPose) : petPortraitFor(artExam, stage, shownPose);
  const mealOwner = doc?.profiles.find(item => item.care.meals.some(meal => meal.consumedAt === null));
  const meal = mealOwner?.care.meals.find(meal => meal.consumedAt === null);
  const enabled = view.status === "ready" && !busy;
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
  return <section aria-label="チワワの部屋" data-pet-stage={stage} data-pet-mood={sleepy ? "sleepy" : "active"} className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-900">
    <div className="relative isolate h-80 overflow-hidden bg-gradient-to-b from-orange-50/80 to-stone-100 dark:from-stone-900 dark:to-stone-800">
      <div aria-hidden="true" className="absolute left-7 top-6 grid h-24 w-20 grid-cols-2 grid-rows-2 gap-1 rounded-t-full border-[5px] border-white bg-white p-1 shadow-sm dark:border-stone-600 dark:bg-stone-600"><span className="rounded-tl-full bg-sky-100 dark:bg-sky-950" /><span className="rounded-tr-full bg-sky-100 dark:bg-sky-950" /><span className="bg-sky-100 dark:bg-sky-950" /><span className="bg-sky-100 dark:bg-sky-950" /></div>
      {passedExams.length ? <div aria-label="合格証" className="absolute right-7 top-7 max-w-36 border-4 border-amber-700/50 bg-white px-3 py-2 text-center shadow-sm dark:bg-stone-800"><Award className="mx-auto mb-1 size-5 text-amber-600" /><span className="block text-[10px] text-muted-foreground">合格</span><span className="block text-xs font-bold">{examLabel(passedExams[0])}</span>{passedExams.length > 1 ? <span className="text-[10px] text-muted-foreground">+{passedExams.length - 1}</span> : null}</div> : null}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 border-t border-stone-200/60 bg-orange-100/40 dark:border-stone-700 dark:bg-stone-800" />
      <div aria-hidden="true" className="absolute bottom-16 left-5"><Leaf className="mx-auto size-12 -rotate-12 fill-emerald-700/30 text-emerald-700 dark:text-emerald-500" /><span className="mx-auto block h-9 w-8 rounded-b-xl bg-orange-200 dark:bg-orange-900" /></div>
      <div aria-hidden="true" className="absolute bottom-10 left-1/2 h-14 w-56 -translate-x-1/2 rounded-[50%] bg-stone-200/70 dark:bg-stone-700/70" />
      <button type="button" aria-label="チワワをなでる" disabled={!enabled} onClick={() => react("petted", "なでなで、うれしそう。")} className={`absolute bottom-11 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${pose && !paused ? "motion-safe:animate-pulse" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={`${ROOM_STAGE_LABELS[stage]}のチワワ`} width={208} height={208} className={`h-full w-full object-contain ${formal ? "rounded-full border-2 border-amber-400 bg-amber-50/40" : ""}`} />
        {formal ? <svg aria-hidden="true" viewBox="0 0 100 70" width="54" height="38" className="pointer-events-none absolute bottom-[88px] left-[45%] -translate-x-1/2 drop-shadow-sm"><path d="m22 9 28 10L78 9l17 48-25 7H30L5 57z" fill="#d7a34b" stroke="#a77927" strokeWidth="2" /><path d="m22 9 28 10-12 22-13-15zM78 9 50 19l12 22 13-15z" fill="#fff0c7" /><path d="M50 23v39" stroke="#b38537" strokeWidth="2" /><circle cx="54" cy="44" r="2" fill="#fff5d5" /><circle cx="54" cy="54" r="2" fill="#fff5d5" /></svg> : null}
        {accessory !== "none" ? <span aria-hidden="true" className={`absolute bottom-24 left-[45%] -translate-x-1/2 ${accessory === "star" ? "text-amber-500" : "text-rose-500"}`}><AccessoryArtwork accessory={accessory} /></span> : null}
        {pose === "petted" ? <Heart aria-hidden="true" className="absolute right-2 top-3 size-7 fill-rose-300 text-rose-300" /> : null}
        {formal ? <Sparkles aria-hidden="true" className="absolute right-0 top-5 size-6 text-amber-500" /> : null}
      </button>
      {meal ? <button type="button" disabled={!enabled} aria-label="ごはんをあげる" onClick={() => void care({ type: "feed", rewardId: meal.rewardId }, mealOwner?.qualificationId)} className="absolute bottom-4 left-4 flex min-h-11 items-center gap-1 rounded-full bg-white/90 px-3 text-xs text-stone-700 shadow-sm dark:bg-stone-900 dark:text-stone-200"><Utensils className="size-4" />{doc?.profiles.reduce((sum, item) => sum + item.care.meals.filter(meal => meal.consumedAt === null).length, 0)}</button> : todayCount >= goal ? <span className="absolute bottom-5 left-5 flex items-center gap-1 text-xs text-emerald-800 dark:text-emerald-400"><Utensils className="size-4" />今日のごはん ✓</span> : null}
      <button ref={clothesButton} type="button" disabled={!enabled || !profile} aria-label="着がえ" onClick={() => setClothesOwner(owner ?? null)} className="absolute bottom-4 right-4 flex min-h-11 items-center gap-1.5 rounded-full border border-white bg-white/90 px-4 text-xs font-medium text-stone-700 shadow-sm disabled:opacity-40 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"><Shirt className="size-4" />着がえ</button>
    </div>
    <div className="px-5 py-4 text-center"><button type="button" ref={nameButton} disabled={!enabled} onClick={() => setSettingsOwner(owner ?? null)} className="min-h-11 rounded-lg px-4 text-base font-bold focus-visible:outline-2 focus-visible:outline-primary">{profile?.name ?? "チワワ"}<span aria-hidden="true" className="ml-2 text-xs font-normal text-muted-foreground">⌄</span></button>
      <p role="status" className="min-h-5 text-xs text-muted-foreground">{message || (view.status === "unavailable" ? "育成の保存を確認できませんでした" : sleepy ? "眠そう" : "元気")}</p>
      <ol aria-label="チワワの成長" className="mx-auto mt-3 flex max-w-72 items-center justify-between">{ROOM_STAGES.map((item, index) => <li key={item} aria-current={item === stage ? "step" : undefined} className={`flex flex-1 flex-col items-center gap-1 border-t-2 pt-2 text-[11px] ${index <= level ? "border-emerald-600 font-semibold text-emerald-800 dark:text-emerald-400" : "border-stone-200 text-muted-foreground dark:border-stone-700"}`}>{ROOM_STAGE_LABELS[item]}</li>)}</ol>
    </div>
    {settingsOwner !== null ? <PetCareSheet key={`${settingsOwner}:${selectedExam}`} document={doc?.ownerScope === settingsOwner ? doc : null} qualificationId={selectedExam} initialSettingsOpen motionPaused={paused} onMotionChange={motion} allowMotion={!paused} onClose={() => setSettingsOwner(null)} returnFocus={() => nameButton.current?.focus()} onPose={react} /> : null}
    <Dialog open={clothesOwner !== null && clothesOwner === owner} onOpenChange={open => { if (!open) setClothesOwner(null); }}><DialogContent aria-describedby={undefined} onCloseAutoFocus={event => { event.preventDefault(); clothesButton.current?.focus(); }} className="max-h-[85dvh] overflow-y-auto"><DialogTitle>着がえ</DialogTitle>
      <label className="grid gap-2 text-sm font-medium">資格の服<select className="min-h-11 w-full rounded-xl border border-border bg-background px-3" value={profile?.qualificationId ?? ""} disabled={busy} onChange={event => setQualification(event.target.value)}>{doc?.profiles.map(item => <option key={item.qualificationId} value={item.qualificationId}>{examLabel(item.qualificationId)}</option>)}</select></label>
      <fieldset><legend className="mb-2 text-sm font-medium">小物</legend><div className="grid grid-cols-2 gap-2">{accessories.map(item => <button key={item.id} type="button" disabled={busy || item.level > level || (!!item.paid && !entitled)} aria-pressed={accessory === item.id} onClick={() => void care({ type: "appearance", costume: appearance?.costume ?? "qualification", accessory: item.id })} className="flex min-h-12 items-center justify-center gap-1 rounded-xl border border-border px-2 text-xs aria-pressed:border-emerald-600 aria-pressed:bg-emerald-50 aria-pressed:text-emerald-900 disabled:opacity-40 dark:aria-pressed:bg-emerald-950 dark:aria-pressed:text-emerald-100">{item.paid ? <Star className="size-3 text-amber-600" /> : null}{item.label}{item.level > level ? ` · ${ROOM_STAGE_LABELS[ROOM_STAGES[item.level]]}` : item.paid && !entitled ? " · 月額" : ""}</button>)}</div></fieldset>
      <fieldset><legend className="mb-2 text-sm font-medium">服</legend><div className="grid grid-cols-2 gap-2">{(["qualification", "formal"] as const).map(costume => <button key={costume} type="button" disabled={busy || (costume === "formal" && !entitled)} aria-pressed={(formal ? "formal" : "qualification") === costume} onClick={() => void care({ type: "appearance", costume, accessory })} className="min-h-12 rounded-xl border border-border px-2 text-xs aria-pressed:border-emerald-600 aria-pressed:bg-emerald-50 aria-pressed:text-emerald-900 disabled:opacity-40 dark:aria-pressed:bg-emerald-950 dark:aria-pressed:text-emerald-100">{costume === "formal" ? "★ 金の晴れ着 · 月額" : "資格の服"}</button>)}</div></fieldset>
      <p role="status" className="text-xs text-muted-foreground">{message}</p>
    </DialogContent></Dialog>
  </section>;
}

function AccessoryArtwork({ accessory }: { accessory: Exclude<Accessory, "none"> }) {
  if (accessory === "star") return <Star className="size-7 fill-amber-300 drop-shadow-sm" />;
  return <svg width="46" height="28" viewBox="0 0 46 28" className="drop-shadow-sm" fill="currentColor">
    {accessory === "bow" ? <><path d="M22 14 4 3v22l18-9M24 14 42 3v22L24 16" /><circle cx="23" cy="14" r="5" /></> : accessory === "scarf" ? <><rect x="3" y="3" width="40" height="10" rx="5" /><path d="m28 10 10 2-3 15-10-3z" /></> : <path d="M3 3h40L23 27z" />}
  </svg>;
}
