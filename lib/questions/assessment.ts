/** These exact originals are reference material, including legacy records that
 * carry no assessment metadata. Never infer this status from an exam or prefix.
 */
export const REFERENCE_ONLY_QUESTION_IDS: ReadonlySet<string> = new Set([
  "gijutsushi1-kensetsu-2025-annual-senmon-q13",
  "tsushin2-2025-late-gakka-q21",
  "kenchiku-setsubishi-2026-annual-am2-q18",
  "radio21-amateur1-2026-05-kogaku-q19",
  "radio21-riku-tech2-2026-01-kogaku-b-q25",
  "sokuryoshiho-2026-annual-gakka-q12",
  "yakuzaishi-2024-annual-theory-q111",
  "shika-ishi-2024-annual-mondai-d-q54",
  "shika-ishi-2024-annual-mondai-d-q79",
  "shinryo-hoshasengishi-2022-annual-am-q3",
  "shinryo-hoshasengishi-2022-annual-am-q40",
  "shinryo-hoshasengishi-2022-annual-am-q69",
  "rigaku-ryohoshi-2025-annual-am-q3",
  "rigaku-ryohoshi-2025-annual-am-q20",
  "sagyo-ryohoshi-2022-annual-am-q96",
  "sagyo-ryohoshi-2022-annual-pm-q2",
  "sagyo-ryohoshi-2022-annual-pm-q68",
  "sagyo-ryohoshi-2022-annual-pm-q99",
  "yakuzaishi-2026-annual-practical-q199",
  "yakuzaishi-2024-annual-practical-q330",
  "kangoshi-2018-annual-am-q5",
  "tohan-kyushu-okinawa-2024-annual-gakka-q44",
  "tohan-kyushu-okinawa-2024-annual-gakka-q69",
  "tohan-kyushu-okinawa-2025-annual-gakka-q35",
  "jken-katsuyo2-220619-m7-s4",
  "jken-katsuyo2-221218-m5-s7",
  "chusho-kigyo-shindanshi-2022-annual-unei-q3",
  "chusho-kigyo-shindanshi-2023-annual-unei-q14",
  "chusho-kigyo-shindanshi-2023-annual-unei-q31",
  "shuwa-2023-annual-mondai-d-10",
  "shuwa-2024-annual-mondai-b-13",
  "shuwa-2024-annual-mondai-d-19",
  "kyoin-gunma-2025-annual-kyotsu-14",
  "kyoin-kobe-2022-annual-kyotsu-16",
  "kyoin-nagano-2026-annual-kyotsu-13",
]);


export function isReferenceOnlyQuestionId(id: unknown): boolean {
  return typeof id === "string" && REFERENCE_ONLY_QUESTION_IDS.has(id);
}
