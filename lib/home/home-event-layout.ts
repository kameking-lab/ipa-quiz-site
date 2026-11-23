import { createHomeEventCalendar, getHomeEvent } from "./home-events";

export function setHomeEventLayout(active: boolean) {
  document.documentElement.toggleAttribute("data-home-event-layout", active);
}

export const HOME_EVENT_LAYOUT_BOOTSTRAP_SCRIPT =
  `(${setHomeEventLayout.toString()})(Boolean((${createHomeEventCalendar.toString()})().getHomeEvent(new Date())));`;

export function initHomeEventLayout() {
  setHomeEventLayout(Boolean(getHomeEvent(new Date())));
}
