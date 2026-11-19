import type { KenchikuQuestion as Question } from "./types";
import { readKenchikuSavedSource } from "./saved-source-reader";
import paper2023Am1 from "./2023-am1.json";
import paper2023Am2 from "./2023-am2.json";
import paper2025Am1 from "./2025-am1.json";
import paper2025Am2 from "./2025-am2.json";
import paper2025Pm from "./2025-pm.json";
import paper2026Am1 from "./2026-am1.json";
import paper2026Am2 from "./2026-am2.json";
import paper2026Pm from "./2026-pm.json";

// Originals include documented source corrections. Only the study export is public.
// Q18 remains private until its official-answer/legal interpretation conflict is resolved.
const baseline = [paper2025Am1, paper2025Am2, paper2025Pm, paper2026Am1, paper2026Am2, paper2026Pm].flatMap(readKenchikuSavedSource);
const materials = [...baseline, ...[paper2023Am1, paper2023Am2].flatMap(readKenchikuSavedSource)];
if (baseline.length !== 210 || new Set(materials.map((q) => q.id)).size !== materials.length) {
  throw new Error("kenchiku-setsubishi material count or IDs mismatch");
}
const special = materials.filter((q) => q.assessmentMode === "reference-only");
if (special.length !== 1 || special[0].id !== "kenchiku-setsubishi-2026-annual-am2-q18" ||
    baseline.filter((q) => q.assessmentMode !== "reference-only").length !== 209) {
  throw new Error("kenchiku-setsubishi reference-only boundary mismatch");
}
export const KENCHIKU_SETSUBISHI_QUESTIONS: Question[] = materials;

export const KENCHIKU_SETSUBISHI_STUDY_QUESTIONS = materials.filter((q) => q.assessmentMode !== "reference-only");
export const KENCHIKU_SETSUBISHI_REFERENCE_QUESTIONS = special;
