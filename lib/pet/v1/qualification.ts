import { EXAM_LABELS } from "@/lib/utils";
const aliases: Record<string, string> = {
  itpassport: "ip", "it-passport": "ip", "itパスポート": "ip",
  "応用情報技術者": "ap", "宅地建物取引士": "takken", "fp-3kyu": "fp3",
  "doboku-sekou-2kyu": "civil2", "薬剤師": "yakuzaishi", pharmacy: "yakuzaishi",
  "dai-1-shu-eisei-kanrisha": "eisei1", "dai-2-shu-eisei-kanrisha": "eisei2",
};
/** Shared light identity lookup; no schema/model imports in the display bundle. */
export function canonicalPetQualification(value: string): string | null {
  const normalized = value.trim().toLowerCase();
  const code = Object.hasOwn(aliases, normalized) ? aliases[normalized] : normalized;
  return Object.hasOwn(EXAM_LABELS, code) ? code : null;
}
