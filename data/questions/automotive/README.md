# 自動車整備士11資格・既存稿の復元

LQ1B・LQ1C（2026-11-04）。Draft PR #731、`codex/automotive-acceptance-20261011` の保存610原問を再利用し、後続受入票と修正版を原問IDで結合した。LQ1Cは前回コミット `c926248a5` の残85 IDに限定して修正・独立審査を行う。

今回の対象は令和8年度第1回（2026-10-04）と令和7年度第2回（2026-03-22）に実施された17筆記科目。科目ごとの直近2回とは異なる。口述2問は筆記原問数から分離して保存する。

608原問・2432肢解説を通常の問題レジストリ、遅延ローダー、11資格の一覧・年度別・問題詳細・演習に登録した。`qualifications.json` が資格ごとの保存数と今回の部分収録数を表す。残2原問は別の保存原稿に残し、採点対象に混ぜない。通常採点への未収録2問には公式全員正解1問を含む。全610原問が完成したとは主張しない。

## 権利と旧記録

オーナー決定 2026-11-04 01:30：「今ダッシュボードに出ている資格は全て権利問題ないので止めるな」。権利は確認済みとして扱い、旧 `permissionVerified=false`、権利保留、公式PDF新規取得STOPは今回の作業の停止条件にしない。公開用アダプタは `JASPA-owner-authorized` を使用する。過去の保存原稿・レビュー票の権利フラグは履歴の原本として維持し、現在の権利判定として利用しない。公式の利用規約URLや許諾文を捏造しない。

公式PDF20冊は2026-11-04に通常のHTTP取得に成功し、すべて保存済みSHA256と一致した。取得不能PDFは0。PDFは画像主体なので、文字列検索の不一致は原文誤りの証拠にならない。既存の問題文・選択肢・図・公式キーの照合票を再利用し、新規取得した同一バイトの原典に結び付けた。

## 証拠と検証

- `data/qualification-staging/automotive/latest-two/qa/lq1b-recovery-ledger.json`：現在の608 ID・候補ハッシュ・証拠ハッシュ・未収録2 ID。
- 同 `lq1b-recovered-evidence/`：既存受入票の複製。根拠の変更や新規受入への水増しは行わない。
- 同 `lq1b-source-verification.json`：公式PDFの取得結果と同一性。
- `assets.json`：原問題ページ図の公開URL・ハッシュ・物理ページ。内容を生成せず既存図を利用する。
- `__tests__/automotive-release.test.ts`：11資格の両ローダー・通常採点可否・原問ID・公式キー・4肢解説・証拠と図のハッシュを検証。

LQ1Cの正本は同QAディレクトリの `lq1c-candidates.json`（最終候補とハッシュ）、`lq1c-progress.json`（採用・参考・残IDと最新判定）、`lq1c-review-*.json`（指定 `codex.cmd exec -m gpt-6-astra` の独立票）。受入時は票と候補のハッシュ、全4肢・公式正答・原典ページ確認、通常採点可否を検査し、証拠票をハッシュ付きで複製する。候補の修正だけでは採用しない。

再開時は `git status --short` と `lq1c-progress.json` を確認する。`prepare-lq1c.py` は初期候補作成専用で、修正後には再実行しない。既存の受入集合へ追加する再現手順は `python scripts/automotive/accept-lq1c.py <最新候補に一致する独立票>` → `materialize-reviewed-release.py` → `refresh-release-metadata.py`。旧 `recover-reviewed-candidates.py` の単独実行はLQ1Bまでの集合を再構築するため、LQ1Cの継続には使わない。

push・PR作成・デプロイは行わない。
