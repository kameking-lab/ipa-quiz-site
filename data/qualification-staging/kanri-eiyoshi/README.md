# 管理栄養士国家試験 第40回（W5・未公開）

第40回（2026-03-01、厚生労働省）全200問（午前1〜97、午後98〜200）。`publicAllowed=false`、`publicationStatus=staging`。
公開レジストリ・ローダーには接続しない（差分は `reports/kanri-eiyoshi-registry.md`）。

- 原本：厚労省の問題PDF（午前 001663681.pdf、午後 001663682.pdf）と正答PDF（001683038.pdf。001677806.pdf とバイト一致）。
  URL・SHA-256・取得日は `manifest.json`。全200問とも単一正答（正答表に採点除外の注記なし）。
- **第39回は未収録**：問題PDFが公式で404（2026-11-06確認）。正答は公式に残る。保存コピー（Wayback）を使うかはオーナー判断待ち。
- 選択肢キー：公式番号 ⑴→ア … ⑸→オ。4肢の問（97・101・103・105・107・109・172〜189・191・192・194〜199）はア〜エ。
- 本文は PDF 文字層から抽出し、折返し改行を結合。組合せ問題は「A　―　B」、列見出しのある組合せ（48・138・175・185）は
  「a：…　b：…」の形に整形。表・図・構造式は文字層が線形でないため本文から外し、**原本ページ画像（webp、110dpi、グレースケール）**
  を `imageUrls` に併記（29問、29ページ）。構造式だけの選択肢（18・58）は「構造式⑴（原本ページ画像の⑴を参照）」とした。
- 事例問題（171〜200）は `sharedContext` に共通の事例文、`caseLabel` に原文の「次の文を読み…」を保持。
- 解説は全肢とも過去問AIの独自作成。計算問題は計算過程を記載。未確認点は `explanationNotes`。
- 既存の部分稿 `origin/codex/kanri-eiyoshi-20261010`（午前17問）は使っておらず、200問を原本から作り直した。

## 再現・照合

```powershell
# <dir> に 40_am.pdf / 40_pm.pdf / 40_answers.pdf として保存
python scripts/ingest-kanri-eiyoshi.py --source-dir <dir>                 # SHA・本文・全肢・正答の照合
python scripts/ingest-kanri-eiyoshi.py --source-dir <dir> --render '<pages json>'   # 画像の再生成（source-audit.json の imagePages）
pnpm vitest run __tests__/questions/kanri-eiyoshi-staging.test.ts
```

独立レビュー：`reports/kanri-eiyoshi-review.md`。
