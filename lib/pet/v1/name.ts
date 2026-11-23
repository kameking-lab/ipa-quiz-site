/** Pet names: what the learner calls each qualification's chihuahua. Shown only to
 * the learner (their own panel and care sheet), never in shared places like the study room. */
export const PET_DEFAULT_NAME = "チワワ";
export const PET_NAME_MAX = 10;

// Deliberately small: obvious slurs and sexual words. Compared after NFKC and
// lower-casing with spaces removed, so full-width and spaced variants match too.
const BLOCKED = [
  "死ね", "しね", "氏ね", "殺す", "ころす", "うんこ", "うんち", "ちんこ", "ちんぽ", "まんこ", "おっぱい",
  "セックス", "せっくす", "レイプ", "れいぷ", "きちがい", "キチガイ", "かたわ", "ガイジ", "がいじ",
  "fuck", "shit", "bitch", "sex", "dick", "pussy", "nigger", "nigga", "kill",
].map(word => word.normalize("NFKC").toLowerCase());

export type PetNameResult = { ok: true; name: string } | { ok: false; error: string };

/** Trims, caps at 10 characters, maps an empty name back to the default, and blocks a few bad words. */
export function normalizePetName(input: string): PetNameResult {
  const name = input.trim();
  if (!name) return { ok: true, name: PET_DEFAULT_NAME };
  if ([...name].length > PET_NAME_MAX) return { ok: false, error: `${PET_NAME_MAX}文字までにしてください。` };
  const folded = name.normalize("NFKC").toLowerCase().replace(/\s+/g, "");
  const hiragana = folded.replace(/[ァ-ヶ]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60));
  if (BLOCKED.some(word => folded.includes(word) || hiragana.includes(word))) return { ok: false, error: "この名前は使えません。" };
  return { ok: true, name };
}

/** True once the learner has given this chihuahua its own name. */
export function hasCustomPetName(name: string | undefined): name is string {
  return Boolean(name) && name !== PET_DEFAULT_NAME;
}
