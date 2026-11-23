import type { HomeEventId } from "./home-events";

export const HOME_EVENT_ART_DIR = "images/home/event-scenes";

export const HOME_EVENT_ART: Record<HomeEventId, { file: string; position: string }> = {
  "new-year": { file: "new-year.webp", position: "96% 55%" },
  "coming-of-age": { file: "coming-of-age.webp", position: "97% 54%" },
  "winter": { file: "winter.webp", position: "80% 50%" },
  "setsubun": { file: "setsubun.webp", position: "89% 66%" },
  "valentine": { file: "valentine.webp", position: "91% 63%" },
  "hinamatsuri": { file: "hinamatsuri.webp", position: "91% 64%" },
  "spring": { file: "spring.webp", position: "86% 64%" },
  "sakura": { file: "sakura.webp", position: "100% 47%" },
  "children": { file: "children.webp", position: "94% 36%" },
  "mothers": { file: "mothers.webp", position: "91% 62%" },
  "green-tea": { file: "green-tea.webp", position: "71% 62%" },
  "hydrangea": { file: "hydrangea.webp", position: "86% 61%" },
  "tanabata": { file: "tanabata.webp", position: "86% 38%" },
  "marine": { file: "marine.webp", position: "95% 46%" },
  "sunflower": { file: "sunflower.webp", position: "100% 56%" },
  "obon": { file: "obon.webp", position: "100% 38%" },
  "moon-viewing": { file: "moon-viewing.webp", position: "96% 32%" },
  "autumn-equinox": { file: "autumn-equinox.webp", position: "91% 60%" },
  "sports": { file: "sports.webp", position: "66% 65%" },
  "autumn-reading": { file: "autumn-reading.webp", position: "88% 67%" },
  "halloween": { file: "halloween.webp", position: "94% 67%" },
  "culture": { file: "culture.webp", position: "89% 65%" },
  "shichi-go-san": { file: "shichi-go-san.webp", position: "91% 62%" },
  "labor": { file: "labor.webp", position: "91% 71%" },
  "christmas": { file: "christmas.webp", position: "98% 43%" },
  "new-years-eve": { file: "new-years-eve.webp", position: "92% 53%" },
};
