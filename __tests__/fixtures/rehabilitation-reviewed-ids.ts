import otAm from "@/data/questions/sagyo-ryohoshi/am-ready.json";
import otAm35 from "@/data/questions/sagyo-ryohoshi/am35-local-ready.json";
import otEarlyPm from "@/data/questions/sagyo-ryohoshi/pm01-20-ready.json";
import otPm from "@/data/questions/sagyo-ryohoshi/pm-ready.json";
import otLatePm from "@/data/questions/sagyo-ryohoshi/pm57-end-ready.json";
import visionAm from "@/data/questions/shino-kunrenshi/am-ready.json";
import visionAm15 from "@/data/questions/shino-kunrenshi/am15-formula-ready.json";
import visionAm54 from "@/data/questions/shino-kunrenshi/am54-local-ready.json";
import visionEarlyPm from "@/data/questions/shino-kunrenshi/pm01-20-ready.json";
import visionPm from "@/data/questions/shino-kunrenshi/pm-ready.json";
import visionLatePm from "@/data/questions/shino-kunrenshi/pm57-end-ready.json";
import visionGo34 from "@/data/questions/shino-kunrenshi/saved-go34-20261011.json";
import { OT13_RECOVERED_QUESTIONS } from "@/data/qualification-staging/sagyo-ryohoshi/ot13-recovered";
import { OT61_PM_REMAINING14_QUESTIONS } from "@/data/qualification-staging/sagyo-ryohoshi/ot61-pm-remaining15";

export const reviewedOtIds = new Set([
  ...otAm, ...otAm35, ...otEarlyPm, ...otPm, ...otLatePm, ...OT13_RECOVERED_QUESTIONS, ...OT61_PM_REMAINING14_QUESTIONS,
].filter(q => q.needsReview === false).map(q => q.id));

export const reviewedVisionIds = new Set([
  ...visionAm, ...visionAm15, ...visionAm54, ...visionEarlyPm, ...visionPm, ...visionLatePm, ...visionGo34,
].filter(q => q.needsReview === false).map(q => q.id));
