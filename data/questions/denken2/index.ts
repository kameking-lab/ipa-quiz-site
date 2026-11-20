import official2017Theory from "./official-2017-primary-theory.json";
import official2018Power from "./official-2018-primary-power.json";
import official2023Secondary from "./official-2023-second-machine-control.json";
import plan7256 from "./official-2019-primary-riron.json";
import plan7251 from "./official-2020-primary-denryoku.json";
import plan7248 from "./official-2021-secondary-power-management.json";
import official2018PrimaryKikai from "./official-2018-primary-kikai.json";
import official2019PrimaryHouki from "./official-2019-primary-houki.json";
import official2022Secondary from "./official-2022-second-machine-control.json";
import official2016Law from "./official-2016-primary-law.json";
import official2017Power from "./official-2017-primary-power.json";
import official2018PrimaryRiron from "./official-2018-primary-riron.json";
import official2019PrimaryDenryoku from "./official-2019-primary-denryoku.json";
import official2017PrimaryKikai from "./official-2017-primary-kikai.json";
import official2018PrimaryHouki from "./official-2018-primary-houki.json";
import official2023SecondPowerManagement from "./official-2023-second-power-management.json";
import type { Question } from "@/lib/questions/types";
import launch from "./launch.json";
import power2024 from "./2024-power.json";
import power2016 from "./plan7-267.json";
import official2020PrimaryMachine from "./official-2020-primary-machine.json";
import official2016PrimaryMachine from "./official-2016-primary-machine.json";
import official2017Law from "./2017-primary-houki.json";
import official2021SecondKikai from "./official-2021-second-kikai.json";
import official2020PrimaryRiron from "./official-2020-primary-riron.json";
import official2016PrimaryRiron from "./official-2016-primary-riron.json";
import official2022SecondDenryoku from "./official-2022-second-denryoku.json";
import official2020PrimaryHouki from "./official-2020-primary-houki.json";
import official2019PrimaryKikai from "./official-2019-primary-kikai.json";

export const DENKEN2_QUESTIONS = [
  ...official2017Theory,
  ...official2018Power,
  ...official2023Secondary,
  ...plan7256,
  ...plan7251,
  ...plan7248,
  ...official2018PrimaryKikai,
  ...official2019PrimaryHouki,
  ...official2022Secondary,
  ...official2016Law,
  ...official2017Power,
  ...official2018PrimaryRiron,
  ...official2019PrimaryDenryoku,
  ...official2017PrimaryKikai,
  ...official2018PrimaryHouki,
  ...official2023SecondPowerManagement,
  ...launch,
  ...power2024,
  ...power2016,
  ...official2020PrimaryMachine,
  ...official2016PrimaryMachine,
  ...official2017Law,
  ...official2021SecondKikai,
  ...official2020PrimaryRiron,
  ...official2016PrimaryRiron,
  ...official2022SecondDenryoku,
  ...official2020PrimaryHouki,
  ...official2019PrimaryKikai,
] as Question[];

export const DENKEN2_PRACTICE_QUESTIONS = DENKEN2_QUESTIONS;
