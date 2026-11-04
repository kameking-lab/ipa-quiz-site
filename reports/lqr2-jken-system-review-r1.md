**FAIL — two concrete findings.**

1. **P2: Staged figures bypass the publication gate.** All 22 images reside in [public/questions/jken-system](C:/Users/kanet/20260522/wt-LQR2-jken-system/public/questions/jken-system). On deployment, Next.js serves these directly at `/questions/jken-system/*.png`, although the catalog says unpublished. Neither middleware nor `.vercelignore` blocks them. Keep these assets outside public deployment until publication is authorized.

2. **P2: Original primary-key annotation is missing.** In [260913-js03.json:608](C:/Users/kanet/20260522/wt-LQR2-jken-system/data/questions/jken-system/260913-js03.json:608), question **`jken-system-260913-js03-q4-6`** loses the original 受注表’s underlined **受注番号**. PDF page 12 identifies it as the original primary key; the text loses underlining, the transcript omits this annotation, and the crop ends above that table. Preserve it explicitly in the transcript or include the table in the image. Evidence: [official question PDF, page 12](C:/Users/kanet/AppData/Local/Temp/codex-work/LQR2/pdfs/260913_mondaijs03.pdf).

Audited against merge-base `00e49b940` through HEAD `99c32c53f`:

- **227/227 answers match** independently extracted official answer sheets: 42/30/42 and 41/32/40.
- Reviewed **30 original texts, 136 option banks, 1,055 candidate rationales**, adapter, source pack and integration.
- Inspected **22 images**; all match their declared PDF crops pixel-for-pixel.
- **12/12 PDF hashes match**. FY2025 February labels, original numbering, bank mappings and restored exponent/logarithm notation are consistent.
- No additional answer or rationale corrections identified. Question registries and lazy loaders retain publication gating.

Limitations: source-level integration review; no browser/deployed-endpoint verification or validation/typecheck/test execution, which the parent owns. No files changed or publication actions taken.