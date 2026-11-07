# 司法試験 短答式（憲法・民法・刑法）・未公開ステージング

令和8年（2026-07-19実施）・令和7年（2025-07-20実施）の短答式 全問。各年 77原問・109解答欄。

**未公開。** `manifest.json` は `publicationStatus: staging`・`publishable: false`。全レコード `publicAllowed: false`。ExamCode・レジストリには未接続（差分案は `reports/shiho-tanto-registry.md`）。

## 構成
- `sources/<年>-<科目>.json`: 公式問題PDFのテキスト層を問ごとに分割したものと、公式正解表（解答欄No.ごと）。
- `editorial/<年>-<科目>[.partN].json`: 過去問AIの転記構造と独自解説（記述ごとの正誤・根拠条文・判例）。
- `<年>.json`: ビルド結果（表示用レコード）。`official-answers.json`・`manifest.json`（PDFのURL・SHA-256）・`source-audit.json`。

## 解答形式の写像
- 「各記述について１（正しい等）／２（誤っている等）」→ 記述ごとに1レコード（`part` 1〜5、選択肢は柱書の文言から作った2択）。
- 組合せ・○×組合せ（８択）・語句群の組合せ・個数 → 1レコードの択一。
- 「２個選びなさい（順不同）」→ 1レコード、`answer` 配列・`requiredSelections: 2`。
- 部分点（「2問正解で部分点1点」等）は再現していない（`officialPoints` に配点のみ保持）。
- 表現できずに除外した問はない。

## 再生成・検証
```powershell
python -X utf8 scripts/build-moj-tanto-staging.py          # 生成
python -X utf8 scripts/build-moj-tanto-staging.py --check  # 生成物が最新か
pnpm vitest run __tests__/questions/w3-law-customs-staging.test.ts
```
ビルダーは、柱書・全記述・全選択肢・参照条文が公式テキスト層の空白無視部分文字列であること、公式テキストに未転記の残りがないこと、解答が公式正解表どおりであること、解説の正誤判断が公式正解と整合することを検査する。
