import { forecastArea, WEATHER_REGION_HEADERS } from "@/lib/home/weather-areas";
import { getForecast } from "@/lib/home/weather-forecast";
import { WEATHER_CACHE_MS } from "@/lib/home/weather";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const area = forecastArea(request.headers);
  const headers = {
    // The bundled iOS home can read this public response without credentials.
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store",
    Vary: WEATHER_REGION_HEADERS.join(", "),
  };
  if (!area) return Response.json({ weather: null }, { headers });

  const hour = Math.floor(Date.now() / WEATHER_CACHE_MS);
  const weather = await getForecast(...area, hour);
  const millisecondsLeft = (hour + 1) * WEATHER_CACHE_MS - Date.now();
  if (millisecondsLeft <= 0) return Response.json({ weather: null }, { headers });
  const secondsLeft = Math.floor(millisecondsLeft / 1_000);
  if (secondsLeft === 0) return Response.json({ weather }, { headers });

  return Response.json({ weather }, { headers: {
    ...headers,
    "Cache-Control": "public, max-age=0",
    "Vercel-CDN-Cache-Control": `public, s-maxage=${secondsLeft}`,
  } });
}
