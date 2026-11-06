# 総合旅行業務取扱管理者試験 旅行業法令・約款（W5・未公開・部分収録）

令和8年度（2026-10-25）・令和7年度（2025-10-26）の **① 旅行業法令 25問 ＋ ② 約款 30問** を各年度、計110問。
`publicAllowed=false`、`publicationStatus=staging`。公開レジストリには接続しない（差分は `reports/sogo-ryoko-registry.md`）。

**未収録**：③ 国内旅行実務（各年32問）・④ 海外旅行実務（各年52問）。行程図・写真選択肢・JR運賃料金表・ルビ付き地名・
英文読解・資料編（運賃表・時差表）を含み、本パックでは扱っていない。原本PDFは取得済み（manifest の `not-yet-transcribed`）。
令和8年度 海外旅行実務 問50 は正解表の注記で受験者全員正解扱い。

- 原本：JATA（一般社団法人日本旅行業協会）の公式PDF。URL・SHA-256・取得日は `manifest.json`。法令基準日は各年度の8月1日現在施行。
- 選択肢キー：原記号 a→ア, b→イ, c→ウ, d→エ（`officialChoiceLabels`）。設問中の (ア)(イ)(ウ) は原文の記述記号で選択肢キーとは別。
- 採点：「すべて選び」型（法令 問11〜25、約款 令和8年度 問9〜20／令和7年度 問13〜20）は公式正答の集合と完全一致
  （`scoring: all-selected-exactly`、`requiredSelections`=正答数）。約款 問21〜30 は正誤式で ア=正しい／イ=誤っている（`true-false`）。
- 大問の指示文は `sharedContext`。配点 `points`（法令4点×25、約款4点×20＋2点×10）。
- 表のある 令和7年度 約款 問10 は、文字層のセルを行ごとに再配置して本文に入れ（セルの連結が抽出文と一致することをスクリプトで検証）、原本ページ画像を併記。
- 解説は全肢とも過去問AIの独自作成。法令は e-Gov の条文で照合。航空・バス・宿泊約款は原文の一部が取得できず、`explanationNotes` に記録。

## 再現・照合

```powershell
# <dir> に manifest の公式ファイルを公開時のファイル名のまま保存
python scripts/ingest-sogo-ryoko.py --source-dir <dir>            # SHA・本文・全肢・正答の照合
python scripts/ingest-sogo-ryoko.py --source-dir <dir> --render   # 表ページ画像の再生成
pnpm vitest run __tests__/questions/sogo-ryoko-staging.test.ts
```

独立レビュー：`reports/sogo-ryoko-review.md`。
