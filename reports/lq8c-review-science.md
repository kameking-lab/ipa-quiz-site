**NECESSARY FIXES — not PASS.**

Reviewed all 6 questions, 60 blanks and 571 choice explanations against the specified pages.

1. **Definite answer-key error: 2025 chemistry Q11, C.**
   [multi-part.json:942](C:/Users/kanet/20260522/wt-LQ8/data/questions/hoshasen/multi-part.json:942) records **3 (⁵⁷Co)**; the official answer is **8 (²⁴¹Am)**. Correct the key, C’s explanation and choice explanations, the overall explanation, and [source-audit.json:1173](C:/Users/kanet/20260522/wt-LQ8/data/questions/hoshasen/source-audit.json:1173). Thin-steel thickness gauges using ²⁴¹Am are also supported by [manufacturer specifications](https://www.global.toshiba/jp/products-solutions/smart-manufacturing/metal-industry-measuring/product/gamma-ray/tosgage-170.html). Official source: :codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ8/data/raw_pdfs/hoshasen/R07_2seitou.pdf" purpose="source"}

2. **Definite crop defect: 2026 physics Q11.**
   [Figure asset](C:/Users/kanet/20260522/wt-LQ8/data/questions/hoshasen/figures/2026-2-butsuri-q11.png) clips Figure 1’s **“2.55 m”** label. Expand the original crop to preserve it completely.

3. **Minor transcription correction: both physics Q11 introductions.**
   Restore **「次のI、IIの文章」**; both currently omit 「I、II」.

4. **Audit metadata needs explicit checkpoint scope.**
   [Validation metadata](C:/Users/kanet/20260522/wt-LQ8/data/questions/hoshasen/source-audit.json:1119) still describes **379 questions / 5 staging tests**, while current data contains **385 questions / 6 tests**. Label those results historical or replace them after verification.

Otherwise, choice ordering, remaining 59 keys, explanation concepts—including the corrected biology content—and essential figure information checked out. Optional cleanup: remove stray surrounding text from the 2025 physics figure.

Schema parsing and in-memory multipart assertions passed; all 20 PDF hashes/byte counts matched. All 13 supplied question-page renders matched the original PDFs pixel-for-pixel. The staging tests were inspected; the Vitest suite was not executed. Their duplicated incorrect C key currently lets that error escape detection.

**2026 chemistry Q9: KEEP HOLD.** The [official listing](https://www.nustec.or.jp/syunin/syunin05.html) shows no visible new erratum, and the official key remains 5. [JAEA](https://nsec.jaea.go.jp/fme/group5/group5_thema10.htm) and [Tsukuba](https://bukko.bk.tsukuba.ac.jp/~positron/positron/positron_lifetime.html) explicitly support using annihilation γ signals in ²²Na positron-lifetime measurements. That leaves insufficient evidence to reject choice 1 unequivocally and release this as a single-answer question.

No files changed.
