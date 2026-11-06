import type { PetProfile } from "./profile";

export const PET_ROOM_SCENES = ["first-meeting", "bookmark", "light", "tidy", "stretch", "new-page"] as const;
export type PetRoomScene = typeof PET_ROOM_SCENES[number];
export const PET_ROOM_STORIES: Record<PetRoomScene, { title: string; text: string; art: string }> = {
  "first-meeting": { title: "いつもの机", text: "机の隣に、一緒に座りました。", art: "event-first-meeting" },
  bookmark: { title: "小さなしおり", text: "読みかけのノートに、しおりをはさみました。", art: "event-review-success" },
  light: { title: "木もれびの明かり", text: "机を照らす明かりを、そっと整えました。", art: "event-skill-discovery" },
  tidy: { title: "机のお片づけ", text: "ノートと道具を、きれいに並べました。", art: "event-study-milestone" },
  stretch: { title: "ひと息の時間", text: "本を閉じて、ゆっくり伸びをしました。", art: "event-welcome-back" },
  "new-page": { title: "次のページ", text: "新しいページを、一緒に開きました。", art: "event-weakness-overcome" },
};
/** One fixed, previously unseen scene per useful learning day. All six appear
 * within six such days, with no lottery, consecutive-day rule or expiry. */
export function advancePetRoomDay(profile: PetProfile, day: string, occurredAt: number) {
  if (profile.roomEvents.some(event => event.day === day)) return;
  const scene = PET_ROOM_SCENES.find(candidate => !profile.roomEvents.some(event => event.scene === candidate));
  if (scene) profile.roomEvents.push({ scene, day, occurredAt });
}
export function petRoomGag(profile: PetProfile): string {
  if (profile.memories.some(memory => memory.kind === "overcome")) return "前に迷ったノートに、そっとしおりをはさみました。";
  const gags: Record<string, string> = {
    ip: "ノートの角に、しおりをはさんでいます。", ap: "図をつなぐ線を、じっと見ています。",
    takken: "家の図面を眺めながら、ひと息。", fp3: "小さな家計簿を、そっと閉じました。",
    civil2: "定規をそろえて、机を整えています。", yakuzaishi: "ノートを見直して、道具を片づけています。",
  };
  return gags[profile.qualificationId] ?? "読みかけのページに、そっと手を添えています。";
}
