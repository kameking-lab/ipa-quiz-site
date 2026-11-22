// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/home/weather/route";
import { forecastArea } from "@/lib/home/weather-areas";
import { todayWeatherCode, weatherFromCode } from "@/lib/home/weather-forecast";

vi.mock("next/cache", () => ({ unstable_cache: (fn: unknown) => fn }));

const at = Date.parse("2026-11-23T00:20:00+09:00");
const timeDefines = ["2026-11-22T17:00:00+09:00", "2026-11-23T00:00:00+09:00", "2026-11-24T00:00:00+09:00"];
const forecast = (code: string) => [{ timeSeries: [
  { timeDefines, areas: [{ area: { code }, pops: ["0", "20", "20"] }] },
  { timeDefines, areas: [
    { area: { code: "999999" }, weatherCodes: ["100", "200", "300"] },
    { area: { code }, weatherCodes: ["101", "413", "313"] },
  ] },
] }];

function request(country?: string, region?: string) {
  const headers = new Headers({ "x-forwarded-for": "192.0.2.1" });
  if (country !== undefined) headers.set("x-vercel-ip-country", country);
  if (region !== undefined) headers.set("x-vercel-ip-country-region", region);
  return new Request("http://localhost/api/home/weather", { headers });
}

describe("home weather forecast", () => {
  it.each([
    ["100", "clear"], ["112", "clear"], ["199", "clear"], ["200", "cloudy"], ["211", "cloudy"],
    ["299", "cloudy"], ["300", "rain"], ["313", "rain"], ["399", "rain"], ["400", "snow"],
    ["413", "snow"], ["499", "snow"], ["099", null], ["500", null], ["10", null],
    ["1000", null], [" 100", null], ["1e2", null], [100, null], [undefined, null],
  ])("classifies %s as %s", (code, weather) => expect(weatherFromCode(code)).toBe(weather));

  it("selects today's Japan date and the prefectural capital's forecast area", () => {
    expect(todayWeatherCode(forecast("016010"), "016010", at)).toBe("413");
    expect(todayWeatherCode(forecast("016010"), "016010", at - 3_600_000)).toBe("101");
    expect(todayWeatherCode(forecast("016010"), "999999", at)).toBe("200");
    expect(todayWeatherCode(forecast("016010"), "016020", at)).toBeUndefined();
    expect(todayWeatherCode(forecast("016010"), "016010", at + 3 * 86_400_000)).toBeUndefined();
    expect(todayWeatherCode({ timeSeries: [] }, "016010", at)).toBeUndefined();
  });

  it("maps all 47 prefectures to unique JMA offices", () => {
    const areas = Array.from({ length: 47 }, (_, index) =>
      forecastArea(request("JP", String(index + 1).padStart(2, "0")).headers));
    expect(areas.every(Boolean)).toBe(true);
    expect(new Set(areas.map(area => area?.[0])).size).toBe(47);
    expect(areas[0]).toEqual(["016000", "016010"]);
    expect(areas[34]).toEqual(["350000", "350020"]);
    expect(areas[45]).toEqual(["460100", "460010"]);
    expect(areas[46]).toEqual(["471000", "471010"]);
  });
});

describe("GET /api/home/weather", () => {
  const upstream = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(at);
    upstream.mockReset();
    vi.stubGlobal("fetch", upstream);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it.each([[undefined, undefined], ["JP", undefined], ["US", "13"], ["JP", "JP-13"], ["JP", "48"], ["JP", "01, 02"]])(
    "returns null for country %s and region %s without contacting JMA", async (country, region) => {
      const response = await GET(request(country, region));
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ weather: null });
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(upstream).not.toHaveBeenCalled();
    },
  );

  it("sends only the forecast office in the URL and shares requests within the hour", async () => {
    const timeout = vi.spyOn(AbortSignal, "timeout");
    upstream.mockImplementation(async () => Response.json(forecast("016010")));
    const responses = await Promise.all([GET(request("JP", "01")), GET(request("JP", "01"))]);
    for (const response of responses) {
      expect(await response.json()).toEqual({ weather: "snow" });
      expect(response.headers.get("vary")).toBe("x-vercel-ip-country, x-vercel-ip-country-region");
      expect(response.headers.get("vercel-cdn-cache-control")).toBe("public, s-maxage=2400");
      expect(response.headers.get("access-control-allow-origin")).toBe("*");
    }
    await GET(request("JP", "01"));
    expect(upstream).toHaveBeenCalledTimes(1);
    expect(upstream).toHaveBeenCalledWith("https://www.jma.go.jp/bosai/forecast/data/forecast/016000.json", {
      cache: "no-store", redirect: "error", signal: expect.any(AbortSignal),
    });
    expect(timeout).toHaveBeenCalledWith(2_000);

    vi.setSystemTime(at + 3_600_000);
    await GET(request("JP", "01"));
    expect(upstream).toHaveBeenCalledTimes(2);
  });

  it("returns and caches a null result when JMA times out or fails", async () => {
    upstream.mockRejectedValueOnce(new DOMException("Timed out", "TimeoutError"))
      .mockResolvedValueOnce(new Response("Unavailable", { status: 503 }))
      .mockResolvedValueOnce(new Response("not JSON"));
    for (const region of ["02", "03", "04"]) {
      const response = await GET(request("JP", region));
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ weather: null });
      expect(await (await GET(request("JP", region))).json()).toEqual({ weather: null });
    }
    expect(upstream).toHaveBeenCalledTimes(3);
  });
});
