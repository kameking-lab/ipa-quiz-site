import text2022 from "./2022-annual-text.json";


import morning2022 from "./2022-annual-am-completion.json";

import paper2022Pm1To50 from "./2022-annual-pm-1-50.json";

import paper2022Pm51To75 from "./2022-annual-pm-51-75.json";

import paper2022Pm76To100 from "./2022-annual-pm-76-100.json";

import text2023 from "./2023-annual-text.json";

import afternoon2023 from "./2023-pm-official-completion.json";

import text2024 from "./2024-annual-text.json";


import round59Morning from "./2024-annual-am-plan5.json";

import type { Question } from "@/lib/questions/types";

import y2026 from "./2026-annual.json";

import y2025 from "./2025-annual.json";

import remaining2026 from "./2026-remaining-ready.json";

import remaining2025 from "./2025-remaining-ready.json";

import overlay2026 from "./2026-literal-overlay9.json";

import overlay2025 from "./2025-literal-overlay9.json";

import publicText4 from "./public-text4-20261015.json";

import completion2026Am from "./2026-annual-am-completion.json";

import afternoon2026Supplement from "./2026-pm-plan5-supplement.json";


import am2025Imported from "./2025-annual-am-plan5-imported.json";


import am2025New from "./2025-annual-am-plan5-new.json";

import plan5Pm2025Imported from "./2025-annual-pm-plan5-imported.json";

import plan5Pm2025New from "./2025-annual-pm-plan5-new.json";

import paper2024Pm from "./2024-annual-pm-qe10.json";


import official2023am from "./2023-am-official-completion.json";


export const RIGAKU_RYOHOUSHI_QUESTIONS: Question[] = [
  ...(text2024 as Question[]),
  ...(round59Morning as Question[]),
  ...(paper2024Pm as Question[]),
  ...(text2023 as Question[]),
  ...(afternoon2023 as Question[]),
  ...(text2022 as Question[]),
  ...(morning2022 as Question[]),
  ...(paper2022Pm1To50 as Question[]),
  ...(paper2022Pm51To75 as Question[]),
  ...(paper2022Pm76To100 as Question[]),
  ...(y2026 as Question[]),
  ...(y2025 as Question[]),
  ...(remaining2026 as Question[]),
  ...(remaining2025 as Question[]),
  ...(overlay2026 as Question[]),
  ...(overlay2025 as Question[]),
  ...(publicText4 as Question[]),
  ...(completion2026Am as Question[]),
  ...(afternoon2026Supplement as Question[]),
  ...(am2025Imported as Question[]),
  ...(am2025New as Question[]),
  ...(plan5Pm2025Imported as Question[]),
  ...(plan5Pm2025New as Question[]),
  ...(official2023am as Question[]),
].filter(question => question.needsReview === false);
