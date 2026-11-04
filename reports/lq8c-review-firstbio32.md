**Necessary fixes — 2025 q32. 2026 q32 PASS.**

1. **2025 ク has the wrong key and translation length.** In [multi-part.json](/C:/Users/kanet/20260522/wt-LQ8/data/questions/hoshasen/multi-part.json:5058), change `officialAnswerNumber` from **5 to 7 (67)**. Independently deleting G760 gives:
   - Normal sequence preserved through amino acid **253**.
   - First changed amino acid: **254, AUG (methionine)**.
   - First stop: **codon 321, UAG**.
   - **Z = 320; Z − Y = 320 − 253 = 67**.

   Correct the blank explanation, all nine choice explanations, their correct/incorrect labels, and the overall explanation at line 5072. The official key confirms **ク = 7**. :codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ8/data/raw_pdfs/hoshasen/R07_1seitou.pdf" purpose="source"}

2. **2025 figure caption is cropped**, ending at「リボースの構」. Restore the complete caption「RNAを構成するリボースの構造」in [the figure](/C:/Users/kanet/20260522/wt-LQ8/data/questions/hoshasen/figures/2025-1-seibutsu-q32.png). The sugar structure itself and both 64-codon tables are complete.

All stems, RNA sequences, original choice orders, remaining official blank keys, and remaining explanations passed comparison. Independent translation also confirms **2025 UGG→CGG at amino acid 43**, and **2026 Δ657–661 ACAAA: X=218 (Arg), next=Asn, stop=234, Y=233, difference=15**.

No files changed.
