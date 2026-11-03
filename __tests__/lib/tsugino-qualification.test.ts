import { describe, expect, it } from "vitest";
import { tsuginoLearningUrl, tsuginoScheduleUrl } from "@/lib/tsugino-qualification";

describe("次の資格の日程導線", () => {
  it("学習中の資格が分かるときは該当資格のページへ送る", () => {
    expect(tsuginoScheduleUrl("ip")).toBe("https://tsugino-shikaku.jp/shikaku/itpassport");
    expect(tsuginoScheduleUrl("fe")).toBe("https://tsugino-shikaku.jp/shikaku/kihon-joho");
    expect(tsuginoScheduleUrl("sc")).toBe("https://tsugino-shikaku.jp/shikaku/sc");
    expect(tsuginoScheduleUrl("fp3")).toBe("https://tsugino-shikaku.jp/shikaku/fp-3kyu");
    expect(tsuginoScheduleUrl("denko2")).toBe("https://tsugino-shikaku.jp/shikaku/denko2");
    expect(tsuginoScheduleUrl("civil2")).toBe("https://tsugino-shikaku.jp/shikaku/doboku-sekou-2kyu");
    expect(tsuginoScheduleUrl("kaigo")).toBe("https://tsugino-shikaku.jp/shikaku/care-worker");
  });

  it("資格が未選択なら日程カレンダーへ送る", () => {
    expect(tsuginoScheduleUrl()).toBe("https://tsugino-shikaku.jp/calendar");
  });

  it("対応する資格だけ学習・教材ページへ送る", () => {
    expect(tsuginoLearningUrl("ip")).toBe("https://tsugino-shikaku.jp/learn/itpassport");
    expect(tsuginoLearningUrl("fe")).toBe("https://tsugino-shikaku.jp/learn/kihon-joho");
    expect(tsuginoLearningUrl("eisei1")).toBe("https://tsugino-shikaku.jp/learn/eisei-kanrisha-1shu");
    expect(tsuginoLearningUrl("kaigo")).toBe("https://tsugino-shikaku.jp/learn/care-worker");
    expect(tsuginoLearningUrl()).toBeNull();
  });
});
