"use client";

import { useEffect, useState } from "react";
import { getHomeEvent, HOME_EVENT_IMAGE_DIR, type HomeEventId } from "@/lib/home/home-events";
import { HOME_EVENT_ART, HOME_EVENT_ART_DIR } from "@/lib/home/home-event-art";

export function useHomeEvent() {
  const [event, setEvent] = useState<HomeEventId | null>(null);

  useEffect(() => {
    let timer: number | undefined;

    function update() {
      window.clearTimeout(timer);
      const now = new Date();
      setEvent(getHomeEvent(now));
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

export function HomeEventOrnament({ event, assetBase = "" }: EventProps) {
  if (!event || HOME_EVENT_ART[event]) return null;

  /* The same small WebP is served by the web and bundled in the offline app. */
  /* eslint-disable @next/next/no-img-element */
  return <img
    src={`${assetBase}/${HOME_EVENT_IMAGE_DIR}/${event}.webp`}
    className="p3-event-ornament"
    data-home-event={event}
    width={48}
    height={48}
    loading="lazy"
    fetchPriority="low"
    decoding="async"
    alt=""
    aria-hidden="true"
  />;
  /* eslint-enable @next/next/no-img-element */
}

export function HomeEventArt({ event, assetBase = "" }: EventProps) {
  if (!event) return null;
  const art = HOME_EVENT_ART[event];
  return art ? <EventArtImage key={event} event={event} art={art} assetBase={assetBase} /> : null;
}

function EventArtImage({ event, art, assetBase }: {
  event: HomeEventId;
  art: { mobile: string; wide?: string };
  assetBase: string;
}) {
  const [ready, setReady] = useState(false);
  const base = `${assetBase}/${HOME_EVENT_ART_DIR}`;
  return <picture className="p3-event-art" aria-hidden="true" data-home-event-art={event} data-home-event-ready={ready || undefined}>
    {art.wide && <source media="(min-width: 640px)" srcSet={`${base}/${art.wide}`} />}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`${base}/${art.mobile}`} alt="" fetchPriority="low" decoding="async"
      onLoad={event => { void event.currentTarget.decode().then(() => setReady(true), () => {}); }}
      onError={() => setReady(false)} />
  </picture>;
}
