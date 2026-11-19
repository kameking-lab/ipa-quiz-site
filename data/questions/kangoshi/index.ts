import plan7043 from "./2017-annual-pm.json";

import plan7037 from "./2020-annual-pm.json";

import official2016AnnualAm from "./official-2016-annual-am.json";


import official2019AnnualAm from "./official-2019-annual-am.json";

import official2018AnnualAm from "./official-2018-annual-am.json";
import official2018AnnualPm from "./official-2018-annual-pm.json";


import type { Question } from "@/lib/questions/types";

import paper2016 from "./2016-annual.json";

import paper2019 from "./2019-annual.json";

import paper2025 from "./2025-annual.json";

import paper2024 from "./2024-annual.json";

import paper2023 from "./2023-annual.json";

import paper2022 from "./2022-annual.json";

import paper2021 from "./2021-annual.json";


import plan5Imported from "./plan5-qc1-imported.json";

import plan5Completion from "./plan5-114-completion.json";


import completed2024am from "./2024-annual-am-completion.json";

import pm114Plan5 from "./2024-pm-plan5-qc4.json";

import paper111pm from "./2021-annual-pm.json";


import official2020AnnualAm from "./official-2020-annual-am.json";


import official2017AnnualAm from "./official-2017-annual-am.json";


/** 第115・114回の464原問、第113回午前120問・午後119問、第112・111回の午前各10問を収録。未確認・採点除外は未収録。 */
export const KANGOSHI_QUESTIONS: Question[] = [
  ...(official2017AnnualAm as Question[]),
  ...(official2020AnnualAm as Question[]),
  ...(plan7043 as Question[]),
  ...(plan7037 as Question[]),
  ...(official2018AnnualPm as Question[]),
  ...(paper2025 as Question[]),
  ...(plan5Imported as Question[]),
  ...(paper2024 as Question[]),
  ...(paper2023 as Question[]),
  ...(paper2022 as Question[]),
  ...(paper2021 as Question[]),
  ...(plan5Completion as Question[]),
  ...(completed2024am as Question[]),
  ...(pm114Plan5 as Question[]),
  ...(paper111pm as Question[]),
  ...(official2016AnnualAm as Question[]),
  ...(official2019AnnualAm as Question[]),
  ...(paper2019 as Question[]),
  ...(paper2016 as Question[]),
  ...(official2018AnnualAm as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
