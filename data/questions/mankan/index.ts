import type { Question } from "@/lib/questions/types";


import paper2023 from "./2023-annual.json";


import paper2021 from "./2021-annual.json";

import paper2022 from "./2022-annual.json";


import paper2024 from "./2024-annual.json";


import paper2025 from "./2025-annual.json";

/** マンション管理士試験（公益財団法人マンション管理センター）令和5〜7年度。 */
export const MANKAN_QUESTIONS: Question[] = [
  ...(paper2023 as Question[]),
  ...(paper2021 as Question[]),
  ...(paper2022 as Question[]),
  ...(paper2024 as Question[]),
  ...(paper2025 as Question[]),
].sort((a, b) => a.year - b.year || a.qNumber - b.qNumber);
