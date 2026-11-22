import type { HomeEventId } from "./home-events";

export const HOME_EVENT_ART_DIR = "images/home/event-scenes";

export const HOME_EVENT_ART: Partial<Record<HomeEventId, { mobile: string; wide?: string }>> = {
  "new-year": { mobile: "new-year.webp", wide: "new-year-wide.webp" },
  sakura: { mobile: "sakura.webp", wide: "sakura-wide.webp" },
  christmas: { mobile: "christmas.webp", wide: "christmas-wide.webp" },
};
