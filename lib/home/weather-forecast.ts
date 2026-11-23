import "server-only";

import { unstable_cache } from "next/cache";
import { z } from "zod";
import { jstDayNumber } from "@/lib/billing/reset-time";
import { HOME_WEATHERS, WEATHER_CACHE_MS, type HomeWeather } from "./weather";

const forecast = z.tuple([z.object({ timeSeries: z.array(z.unknown()) })]).rest(z.unknown());
const dailySeries = z.object({
  timeDefines: z.array(z.iso.datetime({ offset: true })),
  areas: z.array(z.object({ area: z.object({ code: z.string() }), weatherCodes: z.array(z.string()) })),
});

export function weatherFromCode(code: unknown): HomeWeather | null {
  // The hundreds digit is the main weather even when the code specifies mixed weather.
  if (typeof code !== "string" || !/^[1-4]\d{2}$/.test(code)) return null;
  return HOME_WEATHERS[Number(code[0]) - 1];
}

export function todayWeatherCode(data: unknown, area: string, now: number): string | undefined {
  const parsed = forecast.safeParse(data);
  if (!parsed.success) return undefined;
  for (const series of parsed.data[0].timeSeries) {
    const daily = dailySeries.safeParse(series);
    if (!daily.success) continue;
    const today = daily.data.timeDefines.findIndex(time => jstDayNumber(Date.parse(time)) === jstDayNumber(now));
    return daily.data.areas.find(item => item.area.code === area)?.weatherCodes[today];
  }
}

const cachedForecast = unstable_cache(async (office: string, area: string, hour: number) => {
  try {
    const response = await fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${office}.json`, {
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(2_000),
    });
    if (!response.ok) return null;
    return weatherFromCode(todayWeatherCode(await response.json(), area, hour * WEATHER_CACHE_MS));
  } catch {
    return null;
  }
}, ["home-weather-v1"], { revalidate: WEATHER_CACHE_MS / 1_000 });

// A warm function shares one request per office and hour, including failed forecasts.
// The Next.js Data Cache shares completed results across function instances.
const hourlyForecasts = new Map<string, { hour: number; weather: Promise<HomeWeather | null> }>();

export function getForecast(office: string, area: string, hour: number): Promise<HomeWeather | null> {
  const existing = hourlyForecasts.get(office);
  if (existing?.hour === hour) return existing.weather;
  const weather = cachedForecast(office, area, hour).catch(() => null);
  hourlyForecasts.set(office, { hour, weather });
  return weather;
}
