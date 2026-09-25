# 資格追加の一次資料証拠

検証日: 2026-09-23（JST）

このファイルは、実際に収録した問題だけについて、公式公開元・正答・再利用条件を再検証できる形で記録する。PDF 本体は権利者の公式 URL を参照し、リポジトリには複製しない。SHA-256 は検証日に公式 URL から取得したバイト列に対する値である。

## 3級ファイナンシャル・プランニング技能検定

- 公開元: 日本FP協会「試験問題・模範解答」
  - https://www.jafp.or.jp/exam/mohan/
  - 公式ページは、3級CBTについて毎年1セットの問題と解答を公表すると説明している。
- 利用条件: 日本FP協会「FP技能検定の試験問題の利用について」
  - https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf
  - 協会が著作権を保有する。
  - 所定の利用禁止対象を除き申請不要。出典明記が必要で、修正・加工時はその事実も明記する。
  - SHA-256: `db604850c3f14cab982bedf622beae6f33d0624dd79f8dc8f9baaa979e00df45`
  - 取得サイズ: 66,174 bytes
- 問題・模範解答: 2025年5月公表分 3級学科
  - https://www.jafp.or.jp/exam/mohan/files/g3_202505_qa.pdf
  - 問31〜35の問題文、3択、正答を目視照合した。問31の正答は3、問32は2、問33は3、問34は2、問35は1。
  - SHA-256: `5a6a5352df3084dad46ac9b02c932aaaf2f4fb66dbe73cd49534dd59e22aa64c`
  - 取得サイズ: 347,653 bytes
- 実装上の表記: `出典：日本FP協会 3級ファイナンシャル・プランニング技能検定 学科試験（2025年5月公表分）`
- 収録範囲: 問31〜35の5問だけ。残りを収録済みとは扱わない。

## 第三種電気主任技術者試験

> 公開状態: `ready-to-ingest`。利用状況連絡は運営者確認済みだが、直近2年・4科目の全問検収が未完のため、検証用2問は公開問題レジストリ・静的ページ・検索・クイズ導線から除外する。

- 公開元: 一般財団法人電気技術者試験センター「第三種電気主任技術者試験の問題と解答」
  - https://www.shiken.or.jp/chief/third/qa/
  - 2025年8月31日実施の理論科目問題と試験解答を公式一覧から確認した。
- 利用条件: 同センター FAQ (277)
  - https://www.shiken.or.jp/shiken/faq/faq08/000082.html
  - 著作権は同センターに帰属する。
  - 教育目的など試験制度の意義に反しない利用は、許諾・使用料不要。出典明記が必要で、改変時はその事実も明記する。
  - FAQ が案内する利用状況連絡は、2026-09-24にサイト運営者が完了済みと確認した。個人情報や送信本文はリポジトリへ保存しない。
- 問題: 令和7年度上期 第三種 理論
  - https://www.shiken.or.jp/chief/upload/20250831_ch_third_q01.pdf
  - 問2と問14の問題文および5択を目視照合した。
  - SHA-256: `11a75ffd5dd2b5309ad75370bb963c4fda9e12a812174cfa2c2237383c3a964d`
  - 取得サイズ: 2,027,235 bytes
- 正答: 令和7年度第三種電気主任技術者上期試験解答
  - https://www.shiken.or.jp/chief/upload/20250831_ch_third_a01.pdf
  - 理論科目の問2は5、問14は4と照合した。
  - SHA-256: `76fd3715ed487d19a56b387fb402de20ee09474e9fa55b0413f9037b96af06c9`
  - 取得サイズ: 52,173 bytes
- 実装上の表記: `出典：令和7年度上期第三種電気主任技術者試験 理論科目`
- 収録範囲: 理論科目の問2・問14の2問だけ。他科目・他年度を収録済みとは扱わない。

## 2級ファイナンシャル・プランニング技能検定

- 公開元: 日本FP協会「試験問題・模範解答」
  - https://www.jafp.or.jp/exam/mohan/
  - 2024年5月・9月、2025年1月のペーパー試験と、2025年5月・2026年5月のCBT公表セットを収録した。
- 利用条件: 日本FP協会「FP技能検定の試験問題の利用について」
  - https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf
  - 2級学科・実技の著作権者を明記し、利用申請は不要、出典明記と加工時の加工明記が必要とする条件を2026-09-26に再確認した。
- 2024〜2025年公表分
  - 学科4回・各60問（計240問）と実技4回・各40問（計160問）。問題・正答PDFのURL、取得日相当の公表情報、SHA-256、ページ数、法令基準日は `fp2-two-year/manifest.json` に固定した。
  - 学科全240問は4肢すべての理由を収録し、`academic-coverage.json` の review queue は0件。実技は択一・○×・複数空欄・記述の形式に応じた解説を収録し、`practical-explanation-coverage.json` と独立レビュー群で検収した。
- 2026年5月公表分
  - 学科問題・正答: https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf （60問、法令基準日2025-04-01）。PDFハッシュと全問抽出は `fp2-2026-may/extraction.json`、問11〜60の `claude-opus-5-5` solve/explain実応答は `fp2-2026-may/receipts/` に保存した。問1〜10は既存パイロットで、同形式のOpus receipt対象外であることを明示して過大表示を防ぐ。
  - 実技問題: https://www.jafp.or.jp/exam/mohan/files/j2_202605_q.pdf
  - 実技正答: https://www.jafp.or.jp/exam/mohan/files/j2_202605_a.pdf
  - 実技40問のSHA-256・ページ数は `fp2-2026-may-practical/manifest.json`、全40問のfirst-party `claude-opus-5-5`検収は `review-coverage.json` と5件のreceiptに保存した。HOLDは0件。
- 公開収録数: 学科300問、実技200問。2026-09-26に匿名本番 `/fp2`（学科300問）、`/fp2/practical`（5セット200問）、`/fp2/practical/202605`（40問）がHTTP 200で件数表示と一致することを確認した。
- 今回の独立監査receipt: `fp2-coverage-audit-20260926.json`。AntigravityのHOLDのうち、古い台帳・STATUS・一次証拠欠落は本変更で解消する。2026年学科問1〜10のOpus receipt非対象は問題品質のHOLDではなく、モデル監査範囲の限定として保持する。

## 再取得とハッシュ照合

第二種電気工事士の2024・2025年度学科200問・技能104課題と公開前連絡ゲートの証拠は [DENKO2_FULL_YEAR_PLAN.md](./DENKO2_FULL_YEAR_PLAN.md)、[DENKO2_REUSE_NOTICE.md](./DENKO2_REUSE_NOTICE.md) に記録した。令和8年度上期の未公開10問は [DENKO2_2026_FIRST.md](./DENKO2_2026_FIRST.md) に分離している。


PowerShell で公式 PDF を一時ディレクトリに取得し、`Get-FileHash -Algorithm SHA256` で照合する。公式側でファイルが更新された場合は、内容を再確認してからこの記録と問題データを更新する。
