import type { Question } from "@/lib/questions/types";
import data0 from "./chintai.json";
import data1 from "./kyusui.json";
import { BIRU_KAN_QUESTIONS } from "../biru-kan";
import data3 from "./gijutsushi1-kikai.json";
import { HOSHASEN_SECOND_QUESTIONS } from "../hoshasen/second-public";
import { HOSHASEN_FIRST_QUESTIONS } from "../hoshasen/first-public";
import data6 from "./khk-kikai-kou.json";
import { KHK_KIKAI_OTSU_QUESTIONS } from "../khk-kikai-otsu";
import data8 from "./energy-kanri.json";
export const BATCH1_QUESTIONS: Partial<Record<Question["exam"], Question[]>> = {
  "chintai": data0 as Question[],
  "kyusui": data1 as Question[],
  "biru-kan": BIRU_KAN_QUESTIONS,
  "gijutsushi1-kikai": data3 as Question[],
  "hoshasen-2": HOSHASEN_SECOND_QUESTIONS,
  "hoshasen-1": HOSHASEN_FIRST_QUESTIONS,
  "khk-kikai-kou": data6 as Question[],
  "khk-kikai-otsu": KHK_KIKAI_OTSU_QUESTIONS,
  "energy-kanri": data8 as Question[],
};
