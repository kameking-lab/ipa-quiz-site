const refreshedOutfits = new Set([
  "ap",
  "au",
  "chusho-kigyo-shindanshi",
  "civil1",
  "civil2",
  "db",
  "denken3",
  "denko2",
  "fe",
  "field-accounting",
  "field-architecture",
  "field-civil",
  "field-gas-energy",
  "field-it-basics",
  "field-it-development",
  "field-it-network",
  "field-medical-lab",
  "field-nature",
  "field-plumbing",
  "field-safety",
  "field-welfare",
  "fp1",
  "fp2",
  "fp3",
  "generic",
  "gyosei",
  "ip",
  "kaigo",
  "takken",
]);

export function paceRunSprite(legacySrc: string) {
  const outfit = legacySrc.slice(legacySrc.lastIndexOf("/") + 1, -".webp".length);
  if (refreshedOutfits.has(outfit)) return { src: `/images/home/pace-run/v2/${outfit}.webp`, frames: 8 };
  return { src: legacySrc, frames: 4 };
}
