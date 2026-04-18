# 本番実行手順（拘束時間 15 分）

IPA 全試験過去問データを生成するための超簡潔手順書。  
実際の処理は放置中に進むため、手元操作は約 15 分で完了します。

---

## 前提

- `.env.local` に `GEMINI_API_KEY=your-key-here` が設定済み
- `pnpm install` が完了済み
- PDF が `data/raw_pdfs/` に取得済み（未取得の場合はステップ 0 を実施）

---

## ステップ 0（任意）: PDF 一括取得

PDF がまだない場合のみ実施。10〜30 分かかります。

```bash
cd C:\Users\kanet\ipa-quiz-site
pnpm fetch:pdfs:all
```

---

## ステップ 1: 最新化（2 分）

```bash
cd C:\Users\kanet\ipa-quiz-site
git pull origin main
pnpm install
```

---

## ステップ 2: ドライラン — コスト確認（1 分）

実際の API 呼び出しは一切しません。対象タスクと推定コストを表示します。

```bash
pnpm parse:dry-run
```

出力例:
```
=== IPA 全試験パーサー ===
セクション : A (IP/FE/SG), B (高度午前Ⅰ), C (高度午前Ⅱ)
モデル     : gemini-2.5-flash-lite
対象タスク : 156件
推定コスト : ¥556
推定時間   : 約78分

[dry-run] 対象タスク一覧:
  [A] fe-2022-spring-am  ✓
  [A] fe-2022-autumn-am  ✗ PDF未取得
  ...
```

`✗ PDF未取得` の行はスキップされます。

---

## ステップ 3: 本番実行 — 放置 3 時間（手元 1 分）

```bash
pnpm parse:all --yes
```

- `--yes` で確認プロンプトをスキップ
- 途中で止める場合は **Ctrl+C**（チェックポイントを保存して安全終了）
- 再開する場合は `pnpm parse:all --yes --resume`

セクション単体で実行する場合:
```bash
pnpm parse:all:a --yes   # IP / FE / SG のみ（¥200、30分）
pnpm parse:all:b --yes   # 高度午前Ⅰのみ（¥100、15分）
pnpm parse:all:c --yes   # 高度午前Ⅱのみ（¥1000、2時間）
```

---

## ステップ 4: バリデーション（2 分）

```bash
pnpm validate:questions
```

すべて `ok` であれば問題なし。`fail` が出た場合はログを確認して手動修正。

---

## ステップ 5: コミット・プッシュ（5 分）

```bash
git add data/questions/ logs/
git commit -m "feat(data): 全試験過去問データ生成"
git push origin main
```

---

## トラブルシューティング

| 症状 | 対処 |
|------|------|
| `GEMINI_API_KEY が未設定` | `.env.local` を確認 |
| `PDF not found` | `pnpm fetch:pdfs --exam=<exam>` で該当 PDF を取得 |
| `429 rate limit` | 自動リトライ（最大 5 回）。頻発する場合は時間をおいて再実行 |
| 途中で止まった | `pnpm parse:all --yes --resume` で再開 |
| コスト確認 | `logs/api-cost.json` を参照 |
| 失敗ログ | `logs/parse-all-failures.json` を参照 |
