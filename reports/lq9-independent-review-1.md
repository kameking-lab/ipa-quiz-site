**総合判定：FAIL／STOP。** ファイル変更・push・PR作成はしていません。

| 監査項目 | 結果 |
|---|---|
| 保存PDF6本のSHA-256・ページ数 | manifestと一致 |
| リフォーム2025/2026各50問 | 計100問、公式正答と一致 |
| 消費生活相談員2025大問1の14問／2024大問1の8問 | 計22問、原文・公式正答と一致 |
| 指定された重点12問 | 問題文・選択肢・正答は一致 |
| catalog／公開registry・loader | `ready-to-ingest`、公開収録0問 |
| validator | **122件、fail=0、warn=7** ※代替実行 |

**修正が必要な点：**

- **IPA専用一覧への混入。** 両資格が `ALL_EXAM_CODES` に含まれています。`IpaExamCode` 型からの除外だけでは実行時の配列を除外できません。[該当箇所](C:/Users/kanet/20260522/wt-LQ9/lib/exam-config.ts:1158)
- **ルビが本文へ混入。** 2026問10の末尾に「くたいせんこう」、問20の選択肢3末尾に「かし」が付いています。[問10](C:/Users/kanet/20260522/wt-LQ9/data/questions/reform-mgr/2026.json:180)／[問20](C:/Users/kanet/20260522/wt-LQ9/data/questions/reform-mgr/2026.json:374)
- **2025問44の解説に用語の誤り。** 短周期振動との対比を「スラミング」と説明していますが、バルジングとの区別を説明する必要があります。[解説](C:/Users/kanet/20260522/wt-LQ9/data/questions/reform-mgr/2025.json:840)／[水道技術研究センター資料](https://www.jwrc-net.or.jp/research-development/aqua-tank/aqua-tank_report.pdf)
- **図版は公開ゲート対象外。** `public/questions/reform-mgr/2025-q3.webp` は、デプロイすると静的URLで配信されます。問題registryの非公開判定では保護されません。

通常のvalidator起動はEPERMで失敗しました。同じ検証スクリプトをメモリ内でTypeScript変換して実行した結果が上表です。**構造検証のPASSを、全肢解説の内容検収PASSとは扱えません。**

照合原本：
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq9/reform-2025.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq9/reform-2025-answer.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq9/reform-2026.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq9/reform-2026-answer.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq9/shohi-2025.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq9/shohi-2024.pdf" purpose="source"}