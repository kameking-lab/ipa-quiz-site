const refreshedOutfits = new Set([
  "ip",
  "fe",
  "ap",
  "takken",
  "fp2",
  "field-accounting",
  "au",
  "chusho-kigyo-shindanshi",
  "civil1",
  "civil2",
]);

export function paceRunSprite(legacySrc: string) {
  const outfit = legacySrc.slice(legacySrc.lastIndexOf("/") + 1, -".webp".length);
  if (refreshedOutfits.has(outfit)) return { src: `/images/home/pace-run/v2/${outfit}.webp`, frames: 8 };
  return { src: legacySrc, frames: 4 };
}
