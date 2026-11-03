# LQ8D 作業報告

記録時点：2026-11-04T08:11:49+09:00。

既存worktree `C:/Users/kanet/20260522/wt-LQ8`、branch `qual/hoshasen-20261104`でLQ8Cから継続しました。再制作はしていません。指定の未収録20原問の追加は完了しました。収録済みは393→413原問、全肢解説は3,530→5,920件です。残りは内容保留1原問です。全414原問完成とは扱いません。

## 追加した範囲

第一種令和8・7年度それぞれ、物理学問31〜32、化学問31〜32、実務問1〜6を公式問題・公式正答どおり収録しました。本文・数式・全選択肢・選択肢順・表・必要図を原本画像と照合し、独自の全肢解説を付けています。

追加20原問の238空欄と2,390肢解説は同じ原問に保持しました。累計の多肢択一式は34原問・438空欄・4,025肢解説です。既存の単一正答形式379原問の1,895肢解説と合計して5,920件です。空欄を原問数へ加算していません。必要な原図6点をprivateなfiguresへ追加しました。

| 種別・年度 | 収録済み原問 | 残原問 |
|---|---:|---:|
| 第一種・令和8年度 | 132 | 0 |
| 第一種・令和7年度 | 132 | 0 |
| 第二種・令和8年度 | 74 | 1（保留） |
| 第二種・令和7年度 | 75 | 0 |

既存393原問は内容を変更していません。単一正答形式の既存JSONはバイト単位で変更なし、既存14多肢択一式は全オブジェクト一致、既存公式正答キーも一致を確認しました。README・監査台帳・資格カタログの件数と残作業を更新しました。公開レジストリ・ExamCode・問題ローダーへの接続はしていません。

## 正誤票・全員正解指定

- 令和8年度第一種実務問1-II：面状試料を検出窓と平行に置き、点状試料と検出窓との距離を同じとする条件を反映。
- 同実務問5-II：バックグラウンド10 cpmを含んだ計数率を明記。正味720 cpm、総計数率730 cpmを区別。
- 令和7年度第一種実務問2-D：肢2〜7末尾の「に」を削除。
- 同年度第一種化学問31式(5)：初期原子数Nₐ⁰を初期放射能Aₐ⁰へ訂正。
- 同化学問31-I-F：公式全員正解指定を`allAnswersAccepted=true`、`officialAnswerNumber=null`で保持。架空の特定正答番号は設けていません。

## 保留1原問の再確認

令和8年度第二種化学問9は公式正答5を維持し、候補配列から除外したままです。公式問題・正答を通常HTTPS GETで再取得し、ともにHTTP 200、SHA-256が既存原本と一致しました。公式掲載一覧にも疑義を解消する訂正は確認できませんでした。

[JAEA](https://nsec.jaea.go.jp/fme/group5/group5_thema10.htm)と[筑波大学](https://bukko.bk.tsukuba.ac.jp/~positron/positron/positron_lifetime.html)は、²²Naによる陽電子寿命測定で消滅γ線を検出することを説明しています。線源からの放射線と測定信号の区別だけでは肢1を一意に誤りと断定できません。指定モデルの独立再判定もKEEP HOLD（`reports/lq8d-review-held.md`）でした。十分な解除根拠が得られないため解除していません。

## 指定の独立レビュー

すべて `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` で実施しました。

- 物理学4原問・60空欄：`reports/lq8d-review-physics.md`のaltによる正答露出を修正し、`reports/lq8d-review-physics-fixed.md`でPASS。
- 化学4原問・58空欄：`reports/lq8d-review-chemistry.md`の「伝導定数」の転記を修正し、`reports/lq8d-review-chemistry-fixed.md`でPASS。
- 令和8年度実務6原問・60空欄：`reports/lq8d-review-practical2026.md`でPASS。
- 令和7年度実務6原問・60空欄：`reports/lq8d-review-practical2025.md`でPASS。
- 保留問再判定：`reports/lq8d-review-held.md`でKEEP HOLD。
- 最終の413原問ステージング統合確認：`reports/lq8d-review-final.md`で内容・統合PASS。報告書未作成のP3を解消し、`reports/lq8d-review-final-fixed.md`で最終確認。

本文・全解答群・公式キー・全肢解説・計算・図とalt・正誤票・非公開性・件数と監査記録を確認しました。初回指摘も削除せず保存しています。これは追加20原問と413原問ステージングの品質判定であり、全414原問完成や保留解除の判定ではありません。

## 検証

最終実行はすべて終了コード0です。

- `corepack pnpm validate:questions`：native413原問のスキーマ検証成功。既存公開26,444問はok=26,444、fail=0、warn=16,808。既存警告は残っています。
- `corepack pnpm typecheck`：成功。
- `corepack pnpm exec vitest run __tests__/questions/hoshasen-staging.test.ts __tests__/questions/qualification-expansion.test.ts`：2ファイル、1,074テスト成功（hoshasen 8、関連1,066）。両年度第一種全132原問、全員正解指定のtrue/null、不正キーや不完全解説の拒否、非公開性を確認。
- `git diff --check`：成功。

初回の機械検証は3つの空欄解説が最低20文字を下回って失敗しました。根拠説明を補足し、再実行で成功しています。初回ログも残しています。全テスト一式の成功は主張しません。生ログはgit除外の`data/raw_pdfs/hoshasen/lq8d-*-final.log`、独立レビューの生ログは同階層の`lq8d-review-*.log`です。

## コミットと再開

データ・検証・レビュー・監査更新のコミット：`621714e59` — `feat(hoshasen): complete remaining 20 source questions with reviewed explanations`。

本報告は指定先`C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lq8d-report.md`とworktreeの`reports/lq8d-report.md`へ同内容で保存し、報告を別コミットにします。

次回は同じworktree・branchで状態と本報告を確認してください。未収録20原問の追加は完了しています。残りは第二種令和8年度化学問9のみで、公式訂正又は肢1を排除できる十分な一次根拠が得られた場合だけ保留を解除します。公開用区分・科目設定とローダー接続は別途の公開指示が必要です。

オーナー決定に従い権利確認済みとして進めました。アクセス制限の迂回、第三者への連絡、push・PR・デプロイは行っていません。
