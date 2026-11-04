**復旧385件：FAIL（受入れ証跡の結合不足2件）。** 内容が385件とも誤っているという判定ではありません。

- `jidosha-2025-second-3-motorcycle-q21`
- `jidosha-2025-second-3-motorcycle-q29`

[復旧台帳](/C:/Users/kanet/20260522/wt-LQ1B/data/qualification-staging/automotive/latest-two/qa/lq1b-recovery-ledger.json:2510)が参照する `252539c4b5b2-CONSOLIDATED-DELTA-RECEIPT.json` は受入れID一覧と外部パスだけで、当該候補の変更内容・不変フィールドを結合できません。参照先の `AUTOMOTIVE-DELTA-RESULTS.json` と `AUTOMOTIVE-UNCHANGED-FIELD-HASHES.json` を自己完結した証跡として回収し、現候補へのハッシュ一致を確認してください。今回、この2件の内容自体の誤りは確定していません。

確認できた事項：

- 385件の候補・証跡ファイルの台帳ハッシュ一致、公式解答表とのキー一致。
- 全件に4択と4肢解説あり。必要図版101件／92ページは実在し、図版ハッシュ・対象ID結合も一致。
- 受領証の旧原稿と異なる7件は、受領証内の修正内容・修正後ハッシュで説明でき、問題扱いしていません。
- 保存PDF20件のSHA256は受領記録と一致。

残り225件では、次を区別します。

| 原問ID | 判定・修正 |
|---|---|
| `jidosha-2025-second-2-diesel-q30` | **実際の解説誤り。** `explanation`・`choiceExplanations.ア` の「12Vから2V低下」は誤り。[原図p13](/C:/Users/kanet/20260522/wt-LQ1B/data/qualification-staging/automotive/latest-two/figures/jaspa-2025-second-2-diesel-p13.webp)ではスイッチ側D–Eの降下が10V、リレーコイルC–Dが2V。「接点抵抗増大でD点が10Vとなり、コイルに2Vしか掛からない」に修正。正答アは維持。 |
| `jidosha-2026-first-2-gasoline-q31` | キーは一致。ただし肢2を誤りとする技術的理由が未確定。内容誤り確定とは別の未解決事項。 |
| `jidosha-2025-second-2-gasoline-q13` | 公式全員正解問題。通常の単一正答採点と区別が必要。 |

二級ジーゼル40件の旧PDF取得STOPは解消済みです。他の保留にも「メーカー資料未確保」が多く、これだけで内容欠陥とは判定しません。

確認範囲は全件の構造・キー・証跡結合と、解説・原図の重点抽出確認です。全385件の原紙逐字再照合、全225件の技術的再審査は未実施。**全610件の最終リリースPASSは主張しません。** 11通常ルートの実装・表示・採点確認は別途統合作業の対象です。権利確認済みの決定を尊重し、旧フラグはブロッカーにしていません。ファイル変更・push・PR操作・deployは行っていません。