export type ComboLevel = "none" | "small" | "big";

export function comboLevel(combo: number): ComboLevel {
  if (combo >= 5) return "big";
  if (combo >= 3) return "small";
  return "none";
}
