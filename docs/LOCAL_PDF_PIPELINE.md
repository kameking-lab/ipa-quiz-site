# ローカル PDF パイプライン実行手順

IPA 公式 PDF を取得 → Gemini Vision でパース → TypeScript 問題データを生成するパイプラインです。

## 前提条件

- `pnpm` インストール済み
- `GEMINI_API_KEY` を取得済み（Google AI Studio: https://aistudio.google.com）
- `.env.local` に `GEMINI_API_KEY=your-key` を記載

## 基本コマンド

```bash
# ① PDF を取得
pnpm fetch:pdfs --exam=ap

# ② PDF をパース（Gemini API を呼ぶ）
pnpm parse:pdfs --exam=ap

# ③ データ検証
pnpm validate:questions
```

## 試験区分別コマンド

### 基本情報・セキュリティ系（旧紙試験、〜R4/2022）

```bash
# 基本情報技術者（FE）
pnpm fetch:pdfs --exam=fe
pnpm parse:pdfs --exam=fe

# 情報セキュリティマネジメント（SG）
pnpm fetch:pdfs --exam=sg
pnpm parse:pdfs --exam=sg
```

### 応用情報（AP）

```bash
pnpm fetch:pdfs --exam=ap
pnpm parse:pdfs --exam=ap --resume   # 処理済みをスキップ
```

### 高度試験（午前I共通）

午前I（am1）は全高度試験で共通問題。どれか1つで取得すれば全試験区分に流用できます。

```bash
pnpm fetch:pdfs --exam=sc --season=spring
pnpm parse:pdfs --exam=sc --session=am1 --season=spring
```

### 高度試験（午前II専門：各区分）

```bash
# 情報処理安全確保支援士（SC）— 春秋
pnpm fetch:pdfs --exam=sc
pnpm parse:pdfs --exam=sc --session=am2

# ネットワーク（NW）— 秋のみ
pnpm fetch:pdfs --exam=nw
pnpm parse:pdfs --exam=nw --session=am2

# データベース（DB）— 秋のみ
pnpm fetch:pdfs --exam=db
pnpm parse:pdfs --exam=db --session=am2

# システムアーキテクト（SA）— 秋のみ
pnpm fetch:pdfs --exam=sa
pnpm parse:pdfs --exam=sa --session=am2

# プロジェクトマネージャ（PM）— 秋のみ
pnpm fetch:pdfs --exam=pm
pnpm parse:pdfs --exam=pm --session=am2

# ITストラテジスト（ST）— 春のみ
pnpm fetch:pdfs --exam=st
pnpm parse:pdfs --exam=st --session=am2

# エンベデッドシステム（ES）— 春のみ
pnpm fetch:pdfs --exam=es
pnpm parse:pdfs --exam=es --session=am2

# ITサービスマネージャ（SM）— 秋のみ
pnpm fetch:pdfs --exam=sm
pnpm parse:pdfs --exam=sm --session=am2

# システム監査（AU）— 秋のみ
pnpm fetch:pdfs --exam=au
pnpm parse:pdfs --exam=au --session=am2
```

### 全試験一括

```bash
pnpm fetch:pdfs:all
pnpm parse:pdfs:all --resume
```

## オプション一覧

| オプション | 例 | 説明 |
|---|---|---|
| `--exam=<code>` | `--exam=ap` | 対象試験区分 |
| `--all` | `--all` | 全試験区分 |
| `--session=<s>` | `--session=am2` | セッション絞り込み |
| `--year=<yyyy>` | `--year=2023` | 年度絞り込み |
| `--season=<s>` | `--season=autumn` | 季節絞り込み |
| `--resume` | `--resume` | 処理済みをスキップ |

## 推奨実行順序

IP → FE → SG → SC (am1=高度共通) → SC (am2) → NW/DB/SA/PM/ST/ES/SM/AU (am2) → AP

理由: 高度試験の午前Iは全区分共通なので、先に1区分処理してチェックポイントを確認してから他を進める。

## コスト見積もり（Gemini 2.5 Flash）

| 範囲 | 呼び出し数 | 推定コスト |
|---|---|---|
| AP 1年度1季 | 3回 | ≒ ¥10〜30 |
| AP 全年度（2019〜2025 春秋） | 42回 | ≒ ¥200 |
| FE 全年度（2019〜2022 春秋） | 24回 | ≒ ¥100 |
| SG 全年度（2019〜2022 春秋） | 24回 | ≒ ¥100 |
| 高度午前I（SC spring 2019〜2025） | 21回 | ≒ ¥100 |
| 高度午前II 9区分（2019〜2025） | 各 〜21回 | 計 ≒ ¥700 |
| **合計（全試験）** | | **¥1,000〜2,000** |

## チェックポイント機能

`--resume` フラグを使うと、処理済みの年度×季節をスキップします。  
チェックポイントは `data/questions/{exam}/.checkpoints/` に JSON として保存されます。

途中でエラーが出ても `--resume` で再実行すれば続きから処理できます。

## 失敗時リトライ手順

1. `logs/parse-failures.json` で失敗箇所を確認
2. 個別再実行: `pnpm parse:pdfs --exam=ap --year=2023 --season=spring`
3. それでも失敗する場合は `GEMINI_API_KEY` のレート制限を確認（1分待って再試行）
4. PDF が存在しない場合（HTTP 404）: その試験×年度×季節の組み合わせは IPA が公開していない

## 出力ファイル構造

```
data/questions/
  ap/
    by-year/
      2023-spring-am.ts   # 自動生成 — 編集不可
      2023-autumn-am.ts
      index.ts            # バレルファイル (自動生成)
    .checkpoints/
      2023-spring-am.json # チェックポイント
    index.ts              # 手動管理のエントリポイント
  fe/
    by-year/
      ...
    index.ts
```
