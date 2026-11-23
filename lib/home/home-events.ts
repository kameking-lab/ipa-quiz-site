// Keep the lookup self-contained so the first paint and the hydrated hero use
// the same calendar without depending on the server's time zone.
export function createHomeEventCalendar() {
  const DAY_MS = 86_400_000;

  // National Astronomical Observatory of Japan, Japanese calendar dates.
  // https://www.nao.ac.jp/faq/a0301.html
  // https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/phenomena_sy.cgi?year=2029
  // https://eco.mtk.nao.ac.jp/koyomi/wiki/C3E6BDA9A4CECCBEB7EEA4C8A4CF.html
  // Future equinoxes use NAOJ projections until the official gazette is published.
  type AstronomicalDates = {
    setsubun: number;
    spring: number;
    autumn: number;
    moon: readonly [month: number, day: number];
  };

  const astronomicalDates: Partial<Record<number, AstronomicalDates>> = {
    2026: { setsubun: 3, spring: 20, autumn: 23, moon: [9, 25] },
    2027: { setsubun: 3, spring: 21, autumn: 23, moon: [9, 15] },
    2028: { setsubun: 3, spring: 20, autumn: 22, moon: [10, 3] },
    2029: { setsubun: 2, spring: 20, autumn: 23, moon: [9, 22] },
    2030: { setsubun: 3, spring: 20, autumn: 23, moon: [9, 12] },
    2031: { setsubun: 3, spring: 21, autumn: 23, moon: [10, 1] },
    2032: { setsubun: 3, spring: 20, autumn: 22, moon: [9, 19] },
  };

  type Anchor = (year: number) => number | undefined;

  // Convert local date fields to a day index so calendar math is independent of DST.
  function civilDay(year: number, month: number, day: number) {
    return Date.UTC(year, month - 1, day) / DAY_MS;
  }

  function fixed(month: number, day: number): Anchor {
    return year => civilDay(year, month, day);
  }

  function nthWeekday(month: number, weekday: number, occurrence: number) {
    return (year: number) => {
      const first = civilDay(year, month, 1);
      const firstWeekday = new Date(first * DAY_MS).getUTCDay();
      return first + (weekday - firstWeekday + 7) % 7 + (occurrence - 1) * 7;
    };
  }

  function astronomical(key: Exclude<keyof AstronomicalDates, "moon">, month: number): Anchor {
    return year => {
      const day = astronomicalDates[year]?.[key];
      return day === undefined ? undefined : civilDay(year, month, day);
    };
  }

  const respectForAged = nthWeekday(9, 1, 3);

  const events = [
    { id: "new-year", name: "正月", end: fixed(1, 7), days: 7 },
    { id: "coming-of-age", name: "成人の日", end: nthWeekday(1, 1, 2), days: 7 },
    { id: "winter", name: "冬の暮らし", end: fixed(1, 26), days: 8 },
    { id: "setsubun", name: "節分", end: astronomical("setsubun", 2), days: 7 },
    { id: "valentine", name: "バレンタイン", end: fixed(2, 14), days: 7 },
    { id: "hinamatsuri", name: "ひな祭り", end: fixed(3, 3), days: 8 },
    { id: "spring", name: "卒業・春分", end: astronomical("spring", 3), days: 8 },
    { id: "sakura", name: "桜・入学", end: fixed(4, 8), days: 9 },
    { id: "children", name: "ゴールデンウィーク・こどもの日", end: fixed(5, 5), days: 7 },
    { id: "mothers", name: "母の日", end: nthWeekday(5, 0, 2), days: 7 },
    { id: "green-tea", name: "新茶の季節", end: fixed(5, 29), days: 8 },
    { id: "hydrangea", name: "梅雨・あじさい", end: fixed(6, 17), days: 9 },
    { id: "tanabata", name: "七夕", end: fixed(7, 7), days: 7 },
    { id: "marine", name: "海の日・夏", end: nthWeekday(7, 1, 3), days: 7 },
    { id: "sunflower", name: "ひまわりの季節", end: fixed(7, 31), days: 8 },
    { id: "obon", name: "花火・お盆", end: fixed(8, 15), days: 8 },
    { id: "moon-viewing", name: "十五夜", end: (year: number) => {
      const moon = astronomicalDates[year]?.moon;
      return moon && civilDay(year, ...moon);
    }, days: 7 },
    { id: "autumn-equinox", name: "敬老の日・秋分", end: astronomical("autumn", 9), days: 7 },
    { id: "sports", name: "スポーツの日", end: nthWeekday(10, 1, 2), days: 7 },
    { id: "autumn-reading", name: "秋の読書", end: fixed(10, 23), days: 8 },
    { id: "halloween", name: "ハロウィン", end: fixed(10, 31), days: 7 },
    { id: "culture", name: "文化の日・紅葉", end: fixed(11, 3), days: 7 },
    { id: "shichi-go-san", name: "七五三", end: fixed(11, 15), days: 7 },
    { id: "labor", name: "勤労感謝の日", end: fixed(11, 23), days: 7 },
    { id: "christmas", name: "クリスマス", end: fixed(12, 25), days: 7 },
    { id: "new-years-eve", name: "大晦日", end: fixed(12, 31), days: 7 },
  ] as const satisfies readonly { id: string; name: string; end: Anchor; days: number }[];

  type EventId = typeof events[number]["id"];

  function getHomeEvent(date: Date): EventId | null {
    const year = date.getFullYear();
    const day = civilDay(year, date.getMonth() + 1, date.getDate());
    if (!Number.isFinite(day)) return null;

    const respect = respectForAged(year);
    let selected: EventId | null = null;
    let earliestEnd = Infinity;
    for (const event of events) {
      const end = event.end(year);
      if (end === undefined || end < day) continue;
      // Preserve Respect for the Aged Day within the shared autumn window.
      if (event.id === "autumn-equinox" && day === respect) return event.id;
      const start = end - event.days + 1;
      if (end >= earliestEnd || day < (event.id === "autumn-equinox" ? Math.min(start, respect) : start)) continue;
      // The event ending soonest wins. Calendar order breaks ties.
      selected = event.id;
      earliestEnd = end;
    }
    return selected;
  }

  const lastYear = Math.max(...Object.keys(astronomicalDates).map(Number));
  return { events, getHomeEvent, lastYear };
}

export const { events: HOME_EVENTS, getHomeEvent, lastYear: HOME_EVENT_TABLE_LAST_YEAR } = createHomeEventCalendar();
export type HomeEventId = typeof HOME_EVENTS[number]["id"];
