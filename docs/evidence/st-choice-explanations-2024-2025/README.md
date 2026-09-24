# ITストラテジスト 2024・2025年度 午前問題の独立監査

Draft PR #510。監査開始時の head は `b57493505156ea5d84bf74410258fba3fe7c0a2f`。
2024春 午前I 30問・午前II 25問、2025春 午前I 30問・午前II 25問の、計110問・440肢を対象とする。午前I/IIを別紙として検証し、SCなど他試験の問題・解説は変更していない。

## 原典と内容の監査

公式問題・解答PDF8本を独立に再取得し、全て既存のSHA-256とバイト数に一致した。問題PDF4本の全問題ページ、110問の本文・選択肢・既存解説、440肢の理由を照合した。公式解答PDFから抽出した110正答は全件一致。図表18点も確認した。

主な修正は次のとおり。

- 2024午前I Q1/Q2: 分数・添字のOCR表記を原典に合わせ、Q2の検査結果をシンドロームとして説明。
- 2024午前I Q3/Q6/Q7: 木の走査順、循環待ち、NANDの本文を修正。Q7は同一のOCR文字列だった4選択肢を図のア〜エに対応させた。
- 2024午前I Q15/Q21/Q30: IPv6のIPsec必須という断定、監査基準の旧表現、ドメイン名の不正競争の説明を修正。
- 2024午前II Q5/Q11/Q20: 請負契約成立の説明、製品の5段階、営業キャッシュフロー128万円の計算を修正。
- 2025午前I Q5: ウの `MTTRA < MTTRB` を原典の `MTTRA > MTTRB` に戻し、反例を修正。Q30の生成AIと依拠性の説明も限定を明確化。
- 2025午前II Q1/Q8/Q10: サンプル表を復元し、マーケティング手順、購買行動の原文・名称を修正。Q10の欠けた縦軸ラベルは公式PDFからST専用画像を再切出し。
- 2025午前II Q14/Q22/Q24: 魔の川と死の谷の区別、米国フェアユースの4要素、CSIRTガイドの役割名を修正。
- Opusの追加指摘により、量子計算、公開鍵、PSIRT/IPsec、ISMAP、L2TP、広告料等の肢別理由も具体化。途中測定を一律に否定する量子計算の修正案は採用せず、一次資料で確かめた内容を再査読した。

補助的な一次資料: [IPv6要件 RFC 8504](https://www.rfc-editor.org/rfc/rfc8504.html)、[経産省 システム監査基準](https://www.meti.go.jp/policy/netsecurity/sys-kansa/sys-kansa-2023r.pdf)、[文化庁 AIと著作権](https://www.bunka.go.jp/seisaku/chosakuken/aiandcopyright.html)、[米国著作権局 Fair Use](https://www.copyright.gov/fair-use/)、[IBM 途中測定](https://www.ibm.com/quantum/blog/quantum-mid-circuit-measurement)、[Google 量子計算](https://quantumai.google/static/site-assets/downloads/what-is-quantum-computing.pdf)。

## 旧receiptの失効と実行証跡

監査開始時のreceiptに対応するraw envelopeは、worktree、作業ルート、Tempの探索で見つからなかった。旧receiptだけでは実Opus実行を独立証明できないため、110問全てを失効させた。旧ファイルはrepo外に保存し、SHA-256をmanifestへ記録している。過去の「110採用」は今回の採用根拠に用いていない。

修正後の全110問を実際の `claude-opus-5-5` / `firstParty` に再査読させ、FIXのあった問題は再修正・再査読した。現行110問は全てPASS、issues 0、入力・候補・採用hash一致。実rawには成功した30回の呼出しがあり、outputTokens合計145,651を確認した。

永続保存先: `C:\Users\kanet\20260522\st-pr510-audit-evidence-20260924`。
各呼出しのprompt/raw/stderr/usageを上書きしない実行IDで保存する。上限や一部失敗が発生した場合も、成功済みのバッチは保存し、保留分から再開する。

- `review-receipts.json`: 110問の判定、現行入力・候補・採用・原典hash、モデル情報、実ファイルパス。
- `independent-audit-manifest.json`: 生ログから独立再計算したhash、8PDF・18画像・内容ファイル・検証ログのhash/path、実usage集計。ローカル原本へのアクセスが必要で、raw自体はGitへ収録しない。
- `scripts/verify-st-review-artifacts.ts`: rawの成功状態、実modelUsage、promptの入力と候補、rawの判定と採用内容、現行データ、各SHA-256を突き合わせる検証器。

再現コマンド:

```powershell
pnpm exec tsx scripts/review-st-choice-explanations.ts --dry-run
pnpm exec tsx scripts/verify-st-review-artifacts.ts --evidence-dir=C:\Users\kanet\20260522\st-pr510-audit-evidence-20260924
```

再開・再査読は同じevidence-dirを指定して `--dry-run` を外す。判定はPASS、issues 0、成功raw、requested/canonical modelとprovider、正のoutputTokens、現行input/candidate/accepted/evidence hash一致、単一紙のバッチだけを採用する。

## 画面と検証

4紙の午前I/II分離、問題数、図表、誤答時の選択肢固有の理由と全4肢、公式問題・解答リンク、元問題へのbrowser backをE2Eで確認する。詳細ページからの年度別演習はQ1から開始する既存仕様なので、対象の問題へプレイヤーで進んで検証する。

最終検証結果は以下の実行記録とPR本文に記載する。merge・本番公開は実施しない。

- `pnpm test --maxWorkers=4`: 386ファイル・3,256テスト成功。既定の高並列実行ではサイトマップ検査が時間切れになったため、並列数を抑えて全件再実行した。
- `pnpm typecheck`: 成功。
- `pnpm lint`: 全体成功。
- `pnpm validate:questions`: 14,784問成功、失敗0、既存警告14,628。
- `pnpm build`: 成功、3,209ページ生成。
- 最終ビルドのST導線・誤答UI・公式リンク・browser back E2E: 9件成功。
- strict dry-run: 110 accepted / 0 pending。
- raw独立検証: 110 accepted / 0 pending / failures 0、公式PDF8本、図表18点、実Opusバッチ30件。
