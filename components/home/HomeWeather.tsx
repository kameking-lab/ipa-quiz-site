"use client";

import { useEffect, useRef, useState } from "react";
import { nextJstMidnight } from "@/lib/billing/reset-time";
import { HOME_WEATHER_ENDPOINT, isHomeWeather, WEATHER_CACHE_MS, type HomeWeather as Weather } from "@/lib/home/weather";
import { LS_KEYS } from "@/lib/storage/keys";

interface CachedWeather { weather: Weather | null; expiresAt: number }

function readCachedWeather(now: number): CachedWeather | null {
  try {
    const entry = JSON.parse(localStorage.getItem(LS_KEYS.homeWeather) ?? "null") as Partial<CachedWeather> | null;
    if (entry && (entry.weather === null || isHomeWeather(entry.weather)) &&
        typeof entry.expiresAt === "number" && entry.expiresAt > now && entry.expiresAt <= now + WEATHER_CACHE_MS) {
      return { weather: entry.weather, expiresAt: entry.expiresAt };
    }
  } catch { /* Storage can be disabled. */ }
  return null;
}

export function HomeWeather({ endpoint = HOME_WEATHER_ENDPOINT }: { endpoint?: string }) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const layer = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let pending: AbortController | undefined;
    let disposed = false;
    let cached: CachedWeather | null = null;

    async function refresh() {
      if (!navigator.onLine || document.visibilityState === "hidden" || pending) return;
      const now = Date.now();
      const valid = cached && cached.expiresAt > now ? cached : readCachedWeather(now);
      if (valid) {
        setWeather(valid.weather);
        return;
      }

      const controller = new AbortController();
      pending = controller;
      const timeout = window.setTimeout(() => controller.abort(), 5_000);
      setWeather(null);
      let result: CachedWeather["weather"] = null;
      try {
        const response = await fetch(endpoint, {
          credentials: "omit",
          redirect: "error",
          signal: controller.signal,
        });
        if (response.ok) {
          const data = await response.json();
          if (isHomeWeather(data?.weather)) result = data.weather;
        }
      } catch { /* The landscape is usable without a forecast. */ }
      finally {
        window.clearTimeout(timeout);
        pending = undefined;
      }

      if (disposed || !navigator.onLine) return;
      const expiresAt = Math.min(now + WEATHER_CACHE_MS, nextJstMidnight(now).getTime());
      if (expiresAt <= Date.now()) return;
      cached = { weather: result, expiresAt };
      try { localStorage.setItem(LS_KEYS.homeWeather, JSON.stringify(cached)); } catch { /* Use the in-memory result. */ }
      setWeather(result);
    }

    const offline = () => setWeather(null);
    void refresh();
    window.addEventListener("online", refresh);
    window.addEventListener("offline", offline);
    window.addEventListener("pageshow", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      disposed = true;
      pending?.abort();
      window.removeEventListener("online", refresh);
      window.removeEventListener("offline", offline);
      window.removeEventListener("pageshow", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [endpoint]);

  useEffect(() => {
    const element = layer.current;
    if (!element || (weather !== "rain" && weather !== "snow") || !("IntersectionObserver" in window)) return;
    let onscreen = false;
    const update = () => element.toggleAttribute("data-weather-moving", onscreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      onscreen = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      element.removeAttribute("data-weather-moving");
    };
  }, [weather]);

  if (!weather || weather === "clear") return null;
  return <span ref={layer} className="p3-weather" data-home-weather={weather} aria-hidden="true">
    <span className="p3-weather-cloud p3-weather-cloud-left" />
    <span className="p3-weather-cloud p3-weather-cloud-middle" />
    <span className="p3-weather-cloud p3-weather-cloud-right" />
    {weather !== "cloudy" && <span className="p3-weather-fall" />}
  </span>;
}
