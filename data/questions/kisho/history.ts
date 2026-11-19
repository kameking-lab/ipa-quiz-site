import type { ImageAsset, PrivateQuestion } from "@/lib/kisho-private/types";
import type { Question } from "@/lib/questions/types";
import round63 from "./round-63.json";
import round62 from "./round-62.json";
import round61 from "./round-61.json";

interface HistoricalRound {
  academic: Question[];
  practical: Pick<PrivateQuestion, "raw" | "source" | "fields">[];
  assets: ImageAsset[];
}

export const KISHO_HISTORICAL_ROUNDS = [round63, round62, round61] as HistoricalRound[];
