# 金田向け：次のローカル作業ステップ

パイプライン実行の優先順序と具体的なコマンドです。  
各セクション完了後に確認コマンドを実行してデータが正常に生成されているかチェックしてください。

## 準備

```bash
# リポジトリを最新化
cd C:\Users\kanet\ipa-quiz-site
git pull origin main

# 依存インストール
pnpm install

# .env.local に Gemini API キーが設定されているか確認
type .env.local   # Windows
```

`.env.local` の内容:
```
GEMINI_API_KEY=your-key-here
```

---

## セクション 1 — IP / FE / SG（¥200、約30分）

基本情報・パスポート・セキュリティ系の旧紙試験データを生成します。

```bash
# PDF 取得（FE と SG）
pnpm fetch:pdfs --exam=fe
pnpm fetch:pdfs --exam=sg

# パース（FE 午前、2019〜2022 春秋）
pnpm parse:pdfs --exam=fe --resume

# パース（SG 午前、2019〜2022 春秋）
pnpm parse:pdfs --exam=sg --resume
```

**完了確認コマンド:**
```bash
# ファイル生成確認
ls data/questions/fe/by-year/
ls data/questions/sg/by-year/

# 問題数確認
pnpm validate:questions
```

**期待結果:**
- `data/questions/fe/by-year/` に `20XX-spring-am.ts` / `20XX-autumn-am.ts` が 8 ファイル
- `data/questions/sg/by-year/` に同様に 8 ファイル
- validate が PASS

---

## セクション 2 — 高度午前I共通（¥100、約15分）

高度試験の午前I（am1）は全9区分で共通問題です。SC の PDF で取得し、他の区分にも流用できます。

```bash
# SC の PDF 取得（春秋あり、am1 + am2）
pnpm fetch:pdfs --exam=sc

# SC am1 のみパース（高度共通 30問）
pnpm parse:pdfs --exam=sc --session=am1 --resume
```

**完了確認コマンド:**
```bash
ls data/questions/sc/by-year/
# *-am1.ts ファイルが存在することを確認

pnpm validate:questions
```

**ポイント:**
- am1 は全高度試験で問題が共通のため、SC で処理した内容は NW/DB/SA 等でも同一問題
- am2（専門科目）は別途各試験区分で処理が必要（セクション3）

---

## セクション 3 — 高度午前II 全9区分（¥1,000、約2時間）

高度試験の専門科目（am2）を各試験区分ごとにパースします。  
合計 9 区分 × 最大 7 年度 × 1〜2 季節 ≒ 100〜120 回の Gemini 呼び出し。

### まず PDF を全取得

```bash
pnpm fetch:pdfs --exam=sc  # 既に実行済みならスキップ
pnpm fetch:pdfs --exam=nw
pnpm fetch:pdfs --exam=db
pnpm fetch:pdfs --exam=sa
pnpm fetch:pdfs --exam=pm
pnpm fetch:pdfs --exam=st
pnpm fetch:pdfs --exam=es
pnpm fetch:pdfs --exam=sm
pnpm fetch:pdfs --exam=au
```

### am2 パース（--resume で途中再開可能）

```bash
# SC（情報処理安全確保支援士）— 春秋
pnpm parse:pdfs --exam=sc --session=am2 --resume

# NW（ネットワーク）— 秋のみ
pnpm parse:pdfs --exam=nw --session=am2 --resume

# DB（データベース）— 秋のみ
pnpm parse:pdfs --exam=db --session=am2 --resume

# SA（システムアーキテクト）— 秋のみ
pnpm parse:pdfs --exam=sa --session=am2 --resume

# PM（プロジェクトマネージャ）— 秋のみ
pnpm parse:pdfs --exam=pm --session=am2 --resume

# ST（ITストラテジスト）— 春のみ
pnpm parse:pdfs --exam=st --session=am2 --resume

# ES（エンベデッドシステム）— 春のみ
pnpm parse:pdfs --exam=es --session=am2 --resume

# SM（ITサービスマネージャ）— 秋のみ
pnpm parse:pdfs --exam=sm --session=am2 --resume

# AU（システム監査）— 秋のみ
pnpm parse:pdfs --exam=au --session=am2 --resume
```

**完了確認コマンド:**
```bash
# 全試験のファイル確認
for exam in sc nw db sa pm st es sm au; do
  echo "=== $exam ===" && ls data/questions/$exam/by-year/ 2>/dev/null || echo "empty"
done

# 失敗ログ確認
cat logs/parse-failures.json 2>/dev/null || echo "No failures"

# 全体データ検証
pnpm validate:questions
```

---

## セクション 4 — data/questions/ 各 index.ts を更新

新しい試験区分のデータが生成されたら、`data/questions/index.ts` に追加が必要です。

```bash
# 現状確認
cat data/questions/index.ts
```

`data/questions/fe/index.ts` を作成（by-year/index.ts から import する形）:

```typescript
// data/questions/fe/index.ts
import type { Question } from "@/lib/questions/types";
import { BY_YEAR_QUESTIONS } from "./by-year";

export const FE_QUESTIONS: Question[] = BY_YEAR_QUESTIONS;
```

同様に sg/sc/nw/db/... 各 index.ts を作成したうえで `data/questions/index.ts` に追加:

```typescript
// data/questions/index.ts に追加
import { FE_QUESTIONS } from "./fe";
// ...

export const QUESTIONS_BY_EXAM: Partial<Record<ExamCode, Question[]>> = {
  ap: AP_QUESTIONS,
  fe: FE_QUESTIONS,
  // ...
};
```

---

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| `GEMINI_API_KEY is not set` | `.env.local` を確認 |
| `PDF not found` | `pnpm fetch:pdfs --exam=<exam>` を先に実行 |
| `HTTP 404` on fetch | その試験×年度は公開されていない（正常） |
| JSON parse error | `--year=<yyyy> --season=<s>` で個別再実行 |
| Rate limit error | 1分待ってから `--resume` で再実行 |
