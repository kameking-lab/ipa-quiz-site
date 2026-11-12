import type { Question } from "@/lib/questions/types";
import data0 from "./chintai.json";
import data1 from "./kyusui.json";
import { BIRU_KAN_QUESTIONS } from "../biru-kan";
import data3 from "./gijutsushi1-kikai.json";
import data4 from "./hoshasen-2.json";
import data5 from "./hoshasen-1.json";
import data6 from "./khk-kikai-kou.json";
import data7 from "./khk-kikai-otsu.json";
import data8 from "./energy-kanri.json";
export const BATCH1_QUESTIONS: Partial<Record<Question["exam"], Question[]>> = {
  "chintai": data0 as Question[],
  "kyusui": data1 as Question[],
  "biru-kan": BIRU_KAN_QUESTIONS,
  "gijutsushi1-kikai": data3 as Question[],
  "hoshasen-2": data4 as Question[],
  "hoshasen-1": data5 as Question[],
  "khk-kikai-kou": data6 as Question[],
  "khk-kikai-otsu": data7 as Question[],
  "energy-kanri": data8 as Question[],
};
