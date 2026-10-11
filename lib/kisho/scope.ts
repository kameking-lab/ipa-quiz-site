export const KISHO_SOURCE_LISTING = "https://www.jmbsc.or.jp/jp/examination/examination-7.html";
export const KISHO_DATE_EVIDENCE = "https://www.jmbsc.or.jp/jp/examination/pdf/cwfe_result.pdf";

export const KISHO_SITTINGS = [
  {
    round: 66, year: 2026, fiscalYear: 2026, season: "first", examDate: "2026-08-23",
    label: "第66回（2026年度第1回）",
    sourceZipUrl: "https://www.jmbsc.or.jp/jp/examination/z/cwfe_66_z_correction.zip",
    sourceZipSha256: "3cde378731394fc921ff4944c388d56f17a6a6700343e1fbcbee6a9182d9d3c3",
    sections: { ippan: 15, senmon: 15, pm1: 5, pm2: 3 },
  },
  {
    round: 65, year: 2026, fiscalYear: 2025, season: "second", examDate: "2026-01-25",
    label: "第65回（2025年度第2回）",
    sourceZipUrl: "https://www.jmbsc.or.jp/jp/examination/z/cwfe_65_z.zip",
    sourceZipSha256: "2dc5fe8d06877c04fedbc6bccd1d8243d8e50445234f35c4c98a40c25b5fe18a",
    sections: { ippan: 15, senmon: 15, pm1: 7, pm2: 3 },
  },
] as const;

export const KISHO_SECTION_LABELS = {
  ippan: "学科一般", senmon: "学科専門", pm1: "実技1", pm2: "実技2",
} as const;
export type KishoSection = keyof typeof KISHO_SECTION_LABELS;
export type KishoRound = (typeof KISHO_SITTINGS)[number]["round"];
export const KISHO_REQUIRED_ORIGINALS = KISHO_SITTINGS.reduce(
  (sum, sitting) => sum + Object.values(sitting.sections).reduce((total, count) => total + count, 0), 0,
);
export const KISHO_PUBLICATION = {
  status: "permission-required", permissionVerified: false, publishedOriginals: 0,
} as const;

/** Minimum independently answerable fields, enumerated from the official answer sheets. */
export const KISHO_PRACTICAL_ANSWER_FIELDS: Readonly<Record<string, number>> = {
  "kisho-65-pm1-q01": 18, "kisho-65-pm1-q02": 12, "kisho-65-pm1-q03": 5,
  "kisho-65-pm1-q04": 10, "kisho-65-pm1-q05": 6, "kisho-65-pm1-q06": 11, "kisho-65-pm1-q07": 4,
  "kisho-65-pm2-q01": 18, "kisho-65-pm2-q02": 8, "kisho-65-pm2-q03": 28,
  "kisho-66-pm1-q01": 24, "kisho-66-pm1-q02": 14, "kisho-66-pm1-q03": 4,
  "kisho-66-pm1-q04": 5, "kisho-66-pm1-q05": 8,
  "kisho-66-pm2-q01": 19, "kisho-66-pm2-q02": 16, "kisho-66-pm2-q03": 27,
};

/** Official answer-field identifiers only; no question text or answers. */
export const KISHO_PRACTICAL_FIELD_IDS: Readonly<Record<string, readonly string[]>> = {
  "kisho-65-pm1-q01": ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8", "1-9", "1-10", "1-11", "1-12", "2-1a", "2-1b", "2-2", "3-a", "3-b", "3-c"],
  "kisho-65-pm1-q02": ["1-800", "1-900", "1-F", "2-1", "2-2", "2-3", "2-4", "2-5", "2-6", "2-7", "2-8", "3"],
  "kisho-65-pm1-q03": ["1", "2-T", "2-Td", "2-RH", "3"],
  "kisho-65-pm1-q04": ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8", "2-700", "2-850"],
  "kisho-65-pm1-q05": ["1-992", "1-988", "2-1-lat", "2-1-lon", "2-2-dir", "2-2-speed"],
  "kisho-65-pm1-q06": ["1-side", "1-reason", "2-1", "2-2", "2-3", "2-4", "2-5", "2-6", "3-1-rain", "3-1-time", "3-2"],
  "kisho-65-pm1-q07": ["1", "2-a", "2-b", "2-c"],
  "kisho-65-pm2-q01": ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8", "1-9", "1-10", "2-A", "2-B", "3-N", "3-S", "4-1a", "4-1b", "4-2", "4-3"],
  "kisho-65-pm2-q02": ["1-1-low", "1-1-mid", "1-1-high", "1-2-N", "1-2-S", "2-1", "2-2", "2-3"],
  "kisho-65-pm2-q03": ["1-1", "1-2-isobar", "1-2-shear", "1-3-18", "1-3-15", "2-1-time", "2-1-wind", "2-1-T", "2-1-Td", "2-1-P", "2-2-rain", "2-2-snow", "2-3", "2-4", "2-5", "3-type", "3-reason", "3-height", "4-1-15", "4-1-18", "4-2-A", "4-2-B", "4-2-C", "4-3", "4-4", "5-a", "5-b", "5-c"],
  "kisho-66-pm1-q01": ["(1).1", "(1).2", "(1).3", "(1).4", "(1).5", "(1).6", "(1).7", "(1).8", "(1).9", "(1).10", "(1).11", "(1).12", "(2).前線図", "(3).1", "(3).2", "(3).3", "(3).4", "(3).5", "(3).6", "(3).7", "(3).8", "(3).9", "(3).10", "(3).11"],
  "kisho-66-pm1-q02": ["(1).24h経度", "(1).36h経度", "(2)①.移流種類", "(2)①.気温変化率", "(2)②.記述", "(3)①.鉛直流", "(3)①.気温", "(3)②.地点イ風向", "(3)②.地点ウ風向", "(3)②.風速が大きい地点", "(3)③.ア", "(3)③.イ", "(3)③.ウ", "(3)④.理由"],
  "kisho-66-pm1-q03": ["(1).通過方向", "(1).理由", "(2).0.3km離脱", "(2).1.8km離脱"],
  "kisho-66-pm1-q04": ["(1).気温", "(1).エコー", "(2).−2℃等温線", "(3).シアーライン", "(4).機構"],
  "kisho-66-pm1-q05": ["(1).移動", "(1).風気温", "(1).降水", "(2)①.雪水比", "(2)②.降雪量", "(2)②.起時", "(3).注意報", "(3).根拠"],
  "kisho-66-pm2-q01": ["(1).1", "(1).2", "(1).3", "(1).4", "(1).5", "(1).6", "(1).7", "(1).8", "(1).9", "(1).10", "(1).11", "(2)①.赤外画像", "(2)②.水蒸気画像", "(3)①.850hPa等温線", "(3)①.850hPa等相当温位線", "(3)②.上端高度", "(3)②.自由対流高度", "(3)②.浮力消失高度", "(3)③.雲域成因"],
  "kisho-66-pm2-q02": ["(1)①.トラフA位置", "(1)②.緯度", "(1)②.経度", "(2)①.133°12h", "(2)①.138°12h", "(2)①.133°24h", "(2)①.138°24h", "(2)②.前線強化", "(3)山陰沖.第一要因", "(3)山陰沖.第二要因", "(3)四国.第一要因", "(3)四国.第二要因", "(4)①.緯度", "(4)①.経度", "(4)②.地上前線", "(5).高相当温位域成因"],
  "kisho-66-pm2-q03": ["(1).東進速度", "(2).21℃等温線", "(3).気温", "(3).風", "(4)①.名古屋", "(4)①.静岡", "(4)②.名古屋開始", "(4)②.名古屋終了", "(4)②.静岡開始", "(4)②.静岡終了", "(5)①.1回目前線種類", "(5)①.1回目通過", "(5)①.2回目前線種類", "(5)①.2回目通過", "(5)②.1回目", "(5)②.2回目", "(6).1", "(6).2", "(6).3", "(6).4", "(6).5", "(7).1", "(7).2", "(7).3", "(7).4", "(7).5", "(7).6"],
};
