**総合：FAIL（対象 HEAD `09932ed7d`、`origin/main` 比較）**。前回3指摘は修正済みですが、追加の不備が残っています。

| 前回の統合修正 | 判定 |
|---|---|
| メタデータ宣言をオブジェクト内へ移動 | **PASS** |
| 気象のストリーム・年度別・分野別許可一覧／科目ラベル | **PASS** |
| validator の `kisho`／license 追加 | **PASS** |

残存指摘：

- **P2：新テストが通らない。** [kisho-learning-modes.test.tsx:72](C:/Users/kanet/20260522/wt-LQ4B/__tests__/questions/kisho-learning-modes.test.tsx:72) は、分野別の既定科目 `ippan` の30問から全60問を期待します。さらに87–88行は実ラベルではなく `"????"` を検査しています。メタデータ関数も import のみで未検証です。レビュー中の未コミット修正は HEAD の合格根拠に含めていません。
- **P2：気象カテゴリが未設定。** [exam-config.ts:129](C:/Users/kanet/20260522/wt-LQ4B/lib/exam-config.ts:129) の両科目は `categories: []` のままです。更新中ログにも整合性テストの失敗が出ています。`ALL_EXAM_CODES` の重複 callback 解消・3資格除外は確認済みです。
- **P2：問題ページの構造化メタデータが誤帰属。** [question-jsonld.ts:121](C:/Users/kanet/20260522/wt-LQ4B/lib/seo/question-jsonld.ts:121) は気象・建築設備士の分岐がなく、著作者と license URL が IPA にフォールバックします。権利承認とは別の表示不備です。

受理済みコンテンツは前回対象から変更なし。建築設備士の **Q18公開除外・公開209問**も維持されています。PDF14件は両 inventory と実ファイルの SHA-256 一致を確認しました。

**未完了の別スコープ：biru-kan 360問／gijutsushi1-kikai 160問の実原稿確認・統合。** 5資格完了とは判定せず、この未完了を3件の修正の不合格理由にもしていません。

既存 validator ログは26,873問・失敗0。テストログは再実行途中、buildも完了未確認です。独立Vitestは `maxWorkers=1` で試行しましたが `spawn EPERM` により起動できませんでした。01:30のオーナー権利承認を前提とし、アクセス回避・変更・build・deploy・pushは行っていません。
