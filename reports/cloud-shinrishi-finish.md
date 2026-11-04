# 公認心理師（shinrishi）仕上げ・再開報告

確認日：2026-11-03（UTC）。オーナー決定：2026-11-04 01:30（ユーザー指定の時刻）。対象は既存の第8・9回のみ。新しい回は追加していない。

**公開設定：308問を公開対象へ変更、権利理由の保留308問を解除、品質理由の保留0問。指定の独立レビューはサンドボックスの読み取り専用制約で起動できず、今回の再レビュー合格は未達。デプロイは未実施。**

## 対象回・根拠URL・問数

| 回 | 実施日 | 午前 | 午後 | 計 | 公式掲載ページ |
| --- | --- | ---: | ---: | ---: | --- |
| 第8回 | 2025-03-02 | 77 | 77 | 154 | https://www.jccpp.or.jp/shiken/shikenjoho/dai8.html |
| 第9回 | 2026-03-01 | 77 | 77 | 154 | https://www.jccpp.or.jp/shiken/shikenjoho/dai9.html |
| 合計 | | 154 | 154 | 308 | |

- 第8回：[午前問題](https://www.jccpp.or.jp/files/items/132/File/04_gokaku_happyo_09.pdf)、[午後問題](https://www.jccpp.or.jp/files/items/132/File/05_gokaku_happyo_09.pdf)、[合格基準・正答](https://www.jccpp.or.jp/files/items/132/File/03_gokaku_happyo_09.pdf)。
- 第9回：[午前問題](https://www.jccpp.or.jp/files/items/222/File/04_gokaku_happyo_09.pdf)、[午後問題](https://www.jccpp.or.jp/files/items/222/File/05_gokaku_happyo_09pm.pdf)、[合格基準・正答](https://www.jccpp.or.jp/files/items/222/File/03_gokaku_happyo_09.pdf)。

公式掲載ページ2本を今回再閲覧し、問題・正答の公開と実施回を確認した。対象回に未公開資料はなく、スキップ0回。第8回は759肢・2肢選択15問、第9回は755肢・2肢選択13問。計1,514肢すべてに独自解説がある。

## 原文・正答・図・出典

公式6PDFを今回用の `/tmp/shinrishi-finish8`、`/tmp/shinrishi-finish9` へ新規取得し、次の監査を実行した。各154問、計308問の本文・全選択肢・公式正答・必要選択数・出典ページが一致した。

```text
python scripts/audit-shinrishi.py --round 8 --source-dir /tmp/shinrishi-finish8
python scripts/audit-shinrishi.py --round 9 --source-dir /tmp/shinrishi-finish9
```

比較は組版上の空白・制御文字、第9回問27の区切り線、第8回問84の上付き2と抽出文字2を正規化する。午前1〜77、午後78〜154の公式番号を保持している。各問に問題PDFのページ付きURL、正答PDF URL、出典表示を保存している。正答表に採点除外・全員正解の特例はない。

照合証跡 `reports/shinrishi-8-source-audit.json`、`reports/shinrishi-9-source-audit.json` は今回再生成後も既存内容と一致した。6PDFのSHA-256も前回と一致。本文・選択肢・正答・解説を含む問題JSONは前回の内容レビューPASS時から変更していない。

図の判定は前回の4冊192問題ページのレンダリング確認（[前回レビュー3](cloud-shinrishi-review-3.md)）と同一PDFのハッシュ照合を用いた。今回 `pdfimages -list` で4冊とも埋込画像0件も確認した。ベクター図の欠落がないことを埋込画像数だけで判断したわけではなく、前回のページ目視結果を再利用している。独立した画像が必要な設問はなく、第9回問27の区切り、問46の統計表記、第8回問84の指数はテキストで保持されている。今回は全192ページの目視や1,514肢の専門内容通読を新規に繰り返していない。

## オーナー決定・転載条件の記録・保留

【オーナー決定 2026-11-04 01:30】「この資格はオーナーが権利確認済み。転載条件・使用許諾申請の文言を理由に止めず、保留を解除して公開できる状態まで進める（文言は reports に記録するだけ）」を保留解除の根拠とした。許諾文書を今回独自に取得したという意味ではなく、オーナーの権利確認済み判断を記録する。

[公式サイトポリシー](https://www.jccpp.or.jp/policy.html) 第2項「著作権について」の文言（今回再閲覧）：

> 私的使用のための複製など著作権法によって認められる場合を除き、当センターの事前の許可なく、これらの情報を利用（複製、転用、改変、配布、掲示、送信等を含みます。）することはできません。

同項は著作権の帰属先を同センターとする。この条件は記録のみとし、今回の保留理由にしない。外部への問い合わせ・許諾申請は行っていない。

- 権利理由の保留：第8回問1〜154、第9回問1〜154の計308問を解除。
- その他の保留：0問。公式の問題・正答未公開による回のスキップも0回。
- 資格台帳：`status: live`、`remainingWork: []`。利用者向け説明から旧保留理由を削除。
- 既存の公開制御により全308問を公開エクスポート、同期・非同期プール、資格・SEO一覧へ接続。番号表示とシャッフル禁止を維持。
- 公開説明に残っていた「公開準備中」を修正し、年度設定を2025〜2026年へ拡張。公開用年度グループが両回各154問になることを確認する。

## 独立レビュー結果

前回の[レビュー1](cloud-shinrishi-review-1.md)・[レビュー2](cloud-shinrishi-review-2.md)の指摘は全肢解説追加、番号順保持、台帳訂正、第9回問88の集団錯誤・問90のA-B-Xモデルの説明修正等で解消済み。[レビュー3](cloud-shinrishi-review-3.md)は全308問・1,514肢を通読して内容PASSだった。前回の権利理由の保留判断は今回のオーナー決定で解除した。前回PASSは今回の独立レビュー結果として流用しない。

今回、以下の指定条件で別Codexを起動した。

```text
codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check -C /home/user/ipa-quiz-site -
```

終了コード1。`failed to initialize in-process app-server client: Read-only file system (os error 30)` により、レビュー開始前に失敗した。起動時にはPATH alias作成にも同じ読み取り専用エラーが出た。ログ：`/tmp/shinrishi-finish-review-1.log`。サンドボックス・権限・ホーム設定を変更して迂回していない。

**今回の独立レビュー・修正後の再レビュー：未実施。新たな独立合格判定はない。** 親側では公開説明と年度設定の残りを修正したが、これを独立レビュー合格とはしない。残作業は指定Codexが起動できる環境で公開切替を含めた独立レビューを行い、指摘があれば修正・再レビューすること。

## 今回の検証

- `pnpm validate:questions`：26,752問成功、fail=0、warn=16,904。公認心理師は一般解説50文字未満の長さ警告96件。全肢解説欠落・原文不一致・正答不一致ではない。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功、終了コード0。ログ：`/tmp/shinrishi-finish-typecheck-final.log`。
- 関連テスト：下記8ファイル・1,130テストすべて成功、終了コード0。ログ：`/tmp/shinrishi-finish-tests-verified.log`。公開プール308問、全肢解説、原典ハッシュ、正答・選択数・出典、番号保持、両年度各154問、公開説明を確認した。
- `git -c core.whitespace=cr-at-eol diff --check`：成功（既存CRLFを維持）。
- build、デプロイ、push、PR作成は実施していない。秘密値の参照・出力なし。

関連テストの実行コマンド：

```text
pnpm exec vitest run __tests__/questions/shinrishi-staging.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/unit/exam-source-label.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/lib/questions-filter.test.ts __tests__/seo/exam-meta-description.test.ts __tests__/seo/exam-meta-grouping.test.ts __tests__/seo/question-url.test.ts
```

## データの識別・コミット

- `data/questions/shinrishi/2025-annual.json` SHA-256：`9db93e6c06db4e5f2fa079c0cb924a839009e3b8c629ed18956677af56ecec31`。
- `data/questions/shinrishi/2026-annual.json` SHA-256：`5c04f3f73ebc6abb508a6e07bbc5db3ed656b15333aea1809d31162a2e111b2c`。
- 現在ブランチ：`claude/cool-babbage-qliart`。`git add` が `.git/index.lock: Read-only file system`（終了コード128）で失敗し、依存する `git commit` は未実行。コミットは作成できていない。別gitディレクトリ・権限変更等の迂回は行っていない。変更は作業ツリーの5ファイルに残した。


## 未完了と再開条件

データの権利理由・品質理由の保留は0問。公開対象308問へのコード変更と要求された検証は完了した。一方、サンドボックス制約により、指定した別Codexによる独立レビューとその再レビュー合格、コミット作成は未完了であり、タスク全体の完了とは扱わない。別Codexの初期化と `.git` への書込みが許可された環境で、現差分の独立レビュー（指摘時は修正・再レビュー）とコミットを行う必要がある。mainへのpush・PR作成・build・デプロイは行っていない。
