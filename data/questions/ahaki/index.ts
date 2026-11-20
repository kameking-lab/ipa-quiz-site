import type { Question } from "@/lib/questions/types";


import anma2024Morning from "./ahaki-anma-2024-am.json";

import anma2024Afternoon from "./ahaki-anma-2024-pm-plan5.json";


import anma2023Morning from "./ahaki-anma-2023-am-plan5.json";

import anma2023Pm from "./ahaki-anma-2023-pm.json";


import anma2022Morning from "./ahaki-anma-2022-am.json";

import anma2025 from "./ahaki-anma-2025.json";

import anma2026 from "./ahaki-anma-2026.json";

import hari2022 from "./ahaki-hari-kyu-2022.json";


import anma2026Q147 from "./ahaki-anma-2026-q147.json";

import anma2022Pm from "./ahaki-anma-2022-pm.json";


import hari2024Am from "./ahaki-hari-kyu-2024-am.json";

import hari2024Pm from "./ahaki-hari-kyu-2024-pm.json";


import hari2023Am from "./ahaki-hari-kyu-2023-am.json";

import hari2023Pm from "./ahaki-hari-kyu-2023-pm.json";

import hari2025 from "./ahaki-hari-kyu-2025.json";

import hari2026 from "./ahaki-hari-kyu-2026.json";

import hari2022Morning from "./ahaki-hari-kyu-2022-am.json";


/** The 161–170 and 171–180 tracks remain in the single official hari/kyuu booklet. */
export const AHAKI_ANMA_QUESTIONS: Question[] = [
  ...([...anma2026, ...anma2026Q147] as Question[]).sort((a, b) => a.qNumber - b.qNumber),
  ...(anma2025 as Question[]),
  ...(anma2024Morning as Question[]),
  ...(anma2024Afternoon as Question[]),
  ...(anma2023Morning as Question[]),
  ...(anma2023Pm as Question[]),
  ...(anma2022Morning as Question[]),
  ...(anma2022Pm as Question[]),
];


export const AHAKI_HARI_KYUU_QUESTIONS: Question[] = [
  ...(hari2026 as Question[]),
  ...(hari2025 as Question[]),
  ...(hari2022Morning as Question[]),
  ...(hari2022 as Question[]),
  ...(hari2024Am as Question[]),
  ...(hari2024Pm as Question[]),
  ...(hari2023Am as Question[]),
  ...(hari2023Pm as Question[]),
];
