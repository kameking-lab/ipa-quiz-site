import type { ExamCode } from "@/lib/questions/types";


const TSUGINO_ORIGIN = "https://tsugino-shikaku.jp";


const QUALIFICATION_IDS: Partial<Record<ExamCode, string>> = {
  "kogai-18": "guide-2026-0bef9b004e620f13",
  "kogai-13": "guide-2026-0bef9b004e620f13",
  "concrete-assou1": "gino-concrete-assou",
  "zensho-eco-80": "guide-2026-3a59d51224d1f35d",
  "kogai-08": "guide-2026-0bef9b004e620f13",
  "kogai-04": "guide-2026-0bef9b004e620f13",
  "aigan-kangoshi": "guide-2026-da17871bbe889fec",
  "concrete-assou2": "gino-concrete-assou",
  "kawarabuki1": "gino-kawarabuki",
  "zensho-marketing": "guide-2026-3a59d51224d1f35d",
  "cfp-3": "cfp",
  "dekyo-charge-2": "guide-2026-a463c7d84e4da5c5",
  "kogai-16": "guide-2026-0bef9b004e620f13",
  "building-cleaning2": "gino-building-cleaning",
  "sakui-rotary1": "gino-sakui",
  "kouku-kanseikan": "guide-2026-69cc4d3c5ff68f1b",
  "cfp-realestate": "cfp",
  "building-cleaning3": "gino-building-cleaning",
  "kogai-taiki-gairon": "guide-2026-0bef9b004e620f13",
  "restaurant-1": "gino-restaurant-service",
  "cfp-souzoku": "cfp",
  "kogai-taiki-tokuron": "guide-2026-0bef9b004e620f13",
  "telecom-chief-denso": "guide-2026-19b78c949918fc94",
  eiken3: "eiken-3kyu",
  "restaurant-3": "gino-restaurant-service",
  eiken4: "eiken-4kyu",
  "nyukoku-keibikan": "guide-2026-1485f51028fb5f0a",
  chizai3: "chizai-kanri-gino-3kyu",
  "kogai-06": "guide-2026-0bef9b004e620f13",
  "dekyo-chief-2": "guide-2026-19b78c949918fc94",
  "kogai-large-water": "guide-2026-0bef9b004e620f13",
  "dekyo-chief-system": "guide-2026-19b78c949918fc94",
  eiken5: "eiken-5kyu",
  "rodo-kijun-kantokukan": "guide-2026-d10a8dd5221bc7c1",
  chizai1: "chizai-kanri-gino-1kyu",
  "kogai-09": "guide-2026-0bef9b004e620f13",
  webdesign2: "webdesign-2kyu",
  "glass-sekou1": "gino-glass-sekou",
  "eikenp1": "eiken-jun1kyu",
  "zensho-eco-81": "guide-2026-3a59d51224d1f35d",
  "kogai-07": "guide-2026-0bef9b004e620f13",
  "webdesign-3": "webdesign-kentei-3kyu",
  "kokka-ippan-dai": "kokka-ippanshoku-daisotsu",
  "kokka-sogo-in": "kokka-sogoshoku-insotsu",
  "technical-illustration-cad1": "gino-technical-illustration",
  "kogai-12": "guide-2026-0bef9b004e620f13",
  "career-gino-1": "gino-career-consulting",
  "zensho-eco-79": "guide-2026-3a59d51224d1f35d",
  "kogai-15": "guide-2026-0bef9b004e620f13",
  "dekyo-charge-1": "guide-2026-a463c7d84e4da5c5",
  "toukei1": "toukei-1kyu",
  cfp: "cfp",
  "kokka-sogo-dai": "kokka-sogoshoku-daisotsu",
  "boueki-c": "boueki-jitsumu-c",
  service2: "service-hospitality-2kyu",
  apef3: "apef-3kyu",
  ishi: "physician-national-exam",
  "riku-tech2": "radio-riku-2",
  "aviation-comm": "radio-koku",
  ip: "itpassport",
  sg: "sg",
  fe: "kihon-joho",
  ap: "ap",
  sc: "sc",
  nw: "nw",
  db: "db",
  st: "st",
  sa: "sa",
  pm: "pm",
  sm: "sm",
  es: "es",
  au: "au",
  fp3: "fp-3kyu",
  fp2: "fp2",
  denko2: "denko2",
  takken: "takken",
  civil2: "doboku-sekou-2kyu",
  eisei1: "eisei-kanrisha-1shu",
  kaigo: "care-worker",
};


/** Qualification schedules live on 次の資格, not in this question bank. */
export function tsuginoScheduleUrl(exam?: ExamCode): string {
  const qualificationId = exam ? QUALIFICATION_IDS[exam] : undefined;
  return qualificationId
    ? `${TSUGINO_ORIGIN}/shikaku/${qualificationId}`
    : `${TSUGINO_ORIGIN}/calendar`;
}


/** Only link to a qualification-specific learning hub when the mapping is known. */
export function tsuginoLearningUrl(exam?: ExamCode): string | null {
  const qualificationId = exam ? QUALIFICATION_IDS[exam] : undefined;
  return qualificationId
    ? `${TSUGINO_ORIGIN}/learn/${qualificationId}`
    : null;
}
