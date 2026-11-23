export const HOME_WEATHER_ENDPOINT = "/api/home/weather";
export const WEATHER_CACHE_MS = 3_600_000;
export const HOME_WEATHERS = ["clear", "cloudy", "rain", "snow"] as const;
export type HomeWeather = typeof HOME_WEATHERS[number];

export function isHomeWeather(value: unknown): value is HomeWeather {
  return HOME_WEATHERS.some(weather => weather === value);
}
