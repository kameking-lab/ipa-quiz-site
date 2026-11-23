import { createHomeEventCalendar, getHomeEvent, type HomeEventId } from "./home-events";

export function setHomeEventLayout(event: HomeEventId | null) {
  const root = document.documentElement;
  if (event) root.dataset.homeEventLayout = event;
  else delete root.dataset.homeEventLayout;
}

export const HOME_EVENT_LAYOUT_BOOTSTRAP_SCRIPT =
  `(${setHomeEventLayout.toString()})((${createHomeEventCalendar.toString()})().getHomeEvent(new Date()));`;

export function initHomeEventLayout() {
  setHomeEventLayout(getHomeEvent(new Date()));
}
