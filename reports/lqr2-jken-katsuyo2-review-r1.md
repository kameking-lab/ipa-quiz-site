**FAIL — LQR2 / J検 情報活用2級**

Reviewed HEAD `1de89297` against merge-base `00e49b94` with `origin/main`.

1. **P2 — Gantt-chart legend omitted.**  
   `jken-katsuyo2-260621-m2-s1`–`s3`: [260621-p5-figure1.png](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo2/public/images/questions/jken-katsuyo2/260621-p5-figure1.png) excludes the original gray＝予定 / black＝実績 legend. The JSON retains only the words, losing their association with the bars needed for interpretation.

2. **P2 — Invisible PDF text becomes incorrect blank numbering.**  
   For example, [latest-two.json:1069](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo2/data/questions/jken-katsuyo2/latest-two.json:1069), ID `jken-katsuyo2-260621-m4-s5`, reproduces the PDPC instruction as “記述中の (1)”. The visible original has an **unnumbered empty box**, and this section concerns slots (5)–(8). Similar artifacts occur in other sections and the grade2 source-pack, including [260621_mondaijk02.txt:381](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo2/data/exam-library/source-packs/jken-katsuyo/grade2/260621_mondaijk02.txt:381).

3. **P2 — Staged figures bypass the publication gate.**  
   All 18 images are under `public/images/questions/jken-katsuyo2/`. Deploying this tree exposes those static URLs regardless of `ready-to-ingest`; the catalog gate protects question registries/loaders, not these files. No deployment was performed or remotely checked.

4. **P3 — Duplicate question prefix.**  
   [display.ts:11](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo2/lib/questions/display.ts:11) returns `問題1(1)`, while existing consumers prepend `問`, producing **問問題1(1)** in quiz badges, question pages and SEO titles.

**Audit coverage:** 101/101 official answers matched—50 + 51—including manifest slot mapping; 14/14 shared question bodies; 45 distinct choice sets covering 567 choice entries; 101 explanations and 567 choice explanations, with repeated templates deduplicated; 18/18 images visually compared with original pages. All four PDF hashes matched the manifest. No answer-key or option-mapping mismatch found. Fiscal-year/date metadata matched.

**Limitations:** Static/read-only review; no browser rendering, deployment verification or test suites. Other grades excluded. No files changed.

Original visual evidence:  
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/LQR2/pdfs/260621_mondaijk02.pdf" purpose="source"}