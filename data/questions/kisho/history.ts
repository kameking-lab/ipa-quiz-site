import type { ImageAsset, PrivateQuestion } from "@/lib/kisho-private/types";
import type { Question } from "@/lib/questions/types";
import round64Practical1 from "./round-64-practical1.json";
import round63 from "./round-63.json";
import round62 from "./round-62.json";
import round61 from "./round-61.json";
import round60 from "./round-60.json";

interface HistoricalRound {
  academic: Question[];
  practical: (Pick<PrivateQuestion, "source" | "fields"> & { raw: PrivateQuestion["raw"] & Question })[];
  assets: ImageAsset[];
}

export const KISHO_HISTORICAL_ROUNDS = [{ academic: [], ...round64Practical1 }, round63, round62, round61, round60] as unknown as HistoricalRound[];
