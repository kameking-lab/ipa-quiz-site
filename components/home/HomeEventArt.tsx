"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { getHomeEvent, type HomeEventId } from "@/lib/home/home-events";
import { HOME_EVENT_ART, HOME_EVENT_ART_DIR } from "@/lib/home/home-event-art";
import { setHomeEventLayout } from "@/lib/home/home-event-layout";

export function useHomeEvent() {
  const [event, setEvent] = useState<HomeEventId | null>(null);

  useEffect(() => {
    let timer: number | undefined;

    function update() {
      window.clearTimeout(timer);
      const now = new Date();
      const current = getHomeEvent(now);
      setHomeEventLayout(current);
      setEvent(current);
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timer = window.setTimeout(update, nextDay.getTime() - now.getTime());
    }

    function onVisible() {
      if (document.visibilityState === "visible") update();
    }

    function start() {
      timer = window.setTimeout(update, 0);
      window.addEventListener("pageshow", update);
      document.addEventListener("visibilitychange", onVisible);
    }

    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (document.readyState === "complete" && (navigation?.loadEventStart ?? 1) > 0) start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", start);
      window.removeEventListener("pageshow", update);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return event;
}

type EventProps = { event: HomeEventId | null; assetBase?: string };

export function HomeEventArt({ event, assetBase = "" }: EventProps) {
  return <div className="p3-event-art-slot" aria-hidden="true">
    {event && <EventArtImage key={event} event={event} assetBase={assetBase} />}
  </div>;
}

function EventArtImage({ event, assetBase }: { event: HomeEventId; assetBase: string }) {
  const [ready, setReady] = useState(false);
  const { file, position } = HOME_EVENT_ART[event];
  return <picture className="p3-event-art" data-home-event-art={event} data-home-event-ready={ready || undefined}>
    <img src={`${assetBase}/${HOME_EVENT_ART_DIR}/${file}`} alt="" style={{ "--p3-art-position": position } as CSSProperties}
      fetchPriority="low" decoding="async"
      onLoad={event => { void event.currentTarget.decode().then(() => setReady(true), () => {}); }}
      onError={() => setReady(false)} />
  </picture>;
}
