**FAIL — content keys pass, but staging import and compatibility fail.** No files were changed.

Necessary fixes:

1. **Import-blocking validation error:** [multi-part.json:92](C:/Users/kanet/20260522/wt-LQ8/data/questions/hoshasen/multi-part.json:92) has a 17-character explanation for 2026 blank B; [index.ts:59](C:/Users/kanet/20260522/wt-LQ8/data/questions/hoshasen/index.ts:59) requires 20. Expand it meaningfully, e.g. `Gで表される塩基は、プリン塩基の一種であるグアニン。` Actual module evaluation throws at `[379,"blanks",1,"explanation"]`. Correcting only this value **in memory** allows all 381 records to parse.

2. **Existing consumers/tests need multi-part handling:** [hoshasen-staging.test.ts:27](C:/Users/kanet/20260522/wt-LQ8/__tests__/questions/hoshasen-staging.test.ts:27) assumes a top-level answer; line 39 dereferences nonexistent `q.choiceExplanations` on multi-part records. Narrow by `format`, validate blank keys separately, and update coverage/count expectations and audit metadata. Actual totals are **381 questions, 2,093 choice explanations**, versus recorded 379/1,895.

3. **Restore the original introductory instructions**, or explicitly disclose paraphrasing. Both stems replace the original instruction with a shortened sentence; 2026 additionally drops “Ⅰ、Ⅱ”. This is **not whitespace normalization**. See [2026 stem](C:/Users/kanet/20260522/wt-LQ8/data/questions/hoshasen/multi-part.json:9) and [2025 stem](C:/Users/kanet/20260522/wt-LQ8/data/questions/hoshasen/multi-part.json:258).

Checks that passed:

- All substantive stem text, choice order, blank identities/group assignments, and **20 official keys** match the supplied renders:
  - 2025 A–J: **3,1,5,6,2,4,6,10,9,13**
  - 2026 A,B,C,D,ア,E,F,G,H,I: **6,7,12,14,2,1,4,1,3,5**
- Reviewed both overall explanations, all 20 blank explanations, and all **198 choice explanations**. No definite factual error requiring correction found. The “4000個…1本鎖切断のオーダー” wording is loose but describes an order of magnitude; a clearer explanation would say “40個の100倍で過大”. Typical SSB estimates are approximately 1,000/Gy. [Environment Ministry](https://www.env.go.jp/en/chemi/rhm/basic-info/2018/03-02-04.html)
- Deliberate spacing/line-break cleanup, bracketed blank labels, and Unicode exponent notation are acceptable normalization.
- Schema group references, answer bounds, duplicate IDs, explanation-array lengths, and all-answers-accepted/null handling show no additional concrete defect.
- **Unpublished separation is intact:** no public registry/loader import found; catalog remains `ready-to-ingest` without `examCode`.

Source comparison used the supplied renders of these local originals:

:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ8/data/raw_pdfs/hoshasen/R07_2_butsurikagakuseibutsu.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ8/data/raw_pdfs/hoshasen/R08_2_butsurikagakuseibutsu.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ8/data/raw_pdfs/hoshasen/R07_2seitou.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ8/data/raw_pdfs/hoshasen/R08_2seitou.pdf" purpose="source"}
