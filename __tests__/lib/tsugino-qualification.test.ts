import { describe, expect, it } from "vitest";
import { tsuginoScheduleUrl } from "@/lib/tsugino-qualification";

describe("次の資格の日程導線", () => {
  it("学習中の資格が分かるときは該当資格のページへ送る", () => {
    expect(tsuginoScheduleUrl("ip")).toBe("https://tsugino-shikaku.jp/shikaku/itpassport");
    expect(tsuginoScheduleUrl("fe")).toBe("https://tsugino-shikaku.jp/shikaku/kihon-joho");
    expect(tsuginoScheduleUrl("sc")).toBe("https://tsugino-shikaku.jp/shikaku/sc");
  });

  it("資格が未選択なら日程カレンダーへ送る", () => {
    expect(tsuginoScheduleUrl()).toBe("https://tsugino-shikaku.jp/calendar");
  });
});
