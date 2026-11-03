# 電験一種 R8一次理論 A問2の限定追加候補

追加は1公式大問・5空欄・共通15選択肢・75解説エントリ。75独立問題ではない。

- `data/questions/denken1/theory-aq02.json` が現V2正本（SHA a38a116d0ba3a187a13250fd33e54f9abe8889dfe96df367d5bc505f1f19c8b6）。既存 launch.json の15行は不変。
- `input/` は公式原本PDF2件を初取得したキャッシュの複製。問題 physical6/7，正答 physical1。原図cropは描き直しなし。
- `AUTHOR-TRANSCRIPTION-V2.json` と `INDEPENDENT-PRIMARY-REVIEW-V2.json` が別担当転記・一次根拠確認。著者自分の独立PASSではない。
- 内部キーア〜ソをchoiceDisplayLabelが原イロハに戻し，公開選択肢/正答/全肢理由は原記号を保持する。
- ホーム/科目/カタログ/SEOは4原問20空欄に揃え，一次全科目・全問題・複数回分の完成とは表示しない。
- typecheck初回・lint・全4348testsはPASS。通常buildは依存junction制約，webpackはcompile PASS後，未変更baseのcopilot余剰exportで型HOLD。詳細は CHECKS-CURRENT と BASELINE-BUILD-BLOCKER。
- 独立最終Astraのexactcommit確認とroot公開判断はまだ未完。新公開・note操作・メール送信0。
- EECのFAQ277は教育利用の許諾・使用料不要を明示，使用状況連絡も依頼している。既送通知receiptは未確認で送付済を捏造しない。利用条件の文言は公開UIへ追加していない。

## Git blobのbyte hash追補

現著者V2のa38a116d…はCRLF・33706bytesの原記録を指します。Git commitの同一JSONはLF・33354bytesへ正規化され，blob SHA-256は `0f54ebedff1b3639a39b4e2b0c86259306983117a1a150a95565a9fd44912331` です。CRLF→LFの全byte一致とJSON semantic一致を独立最終担当が確認しました。原V2・原転記・原一次査読receiptは上書きしていません。内容の変更はありません。詳細は SOURCE-BLOB-NORMALIZATION.json。
