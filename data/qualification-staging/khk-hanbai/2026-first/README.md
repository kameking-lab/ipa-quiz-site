# 第一種販売 2026年度

令和8年度の法令 JX 20問・保安管理技術 JY 20問。KHK公式掲載ページから取得した問題・正答表のURLとSHA-256を `sources.json`、公式正答番号を `official-answer-keys.json` に保存する。

既存の高圧ガス2026年度データと同じ非公開ステージング。過年度の販売・設備士230問には混ぜず、公開用レジストリや配信ローダーからは読み込まない。

`questions.json` に40問・全200肢解説を保存。IDは `khk-hanbai-2026-annual-{houki|gas-technology}-q{番号}`。`review.json` は本文・選択肢・公式正答の照合記録を保持する。別のエージェントによる独立レビューは未実施。

検証：`pnpm validate:questions --staging=khk-hanbai-2026-first`。
