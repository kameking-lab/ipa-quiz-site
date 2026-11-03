# 高度試験 午前II 直近2回 監査（2026-11-03）

## 結果と完了範囲

対象は db / pm / st / sm / au / es。sc・nw・sa のデータと共通補正処理は変更していない。
直近2回の回数欠落はない。6区分×2回×25問=300問が既に存在し、**実際にエクスポートされる補正後データの正答は300問全て公式解答例と一致**した。生の by-year ファイルだけを見ると古い正答・URLが残るため、各区分 index.ts の補正適用後を監査した。

本文・選択肢・図表・解説まで今回完了した区分は **DB→PM**。ST・SM・AU・ES は回の有無と正答照合までで、本文・図表・解説の精査は未完。これらを内容監査完了とは扱わず、データ変更も行っていない。優先順に完了した区分だけを変更対象とする。

## 「直近2回」の確定根拠

IPA公式の[過去問題一覧](https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html)から、[2025年度](https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html)と[2024年度](https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html)の区分別「午前II」の問題冊子・解答例へのリンクを直接確認し、下表の24 PDFを取得した。DB・PM・AU・ESは両年度の秋期、ST・SMは両年度の春期に掲載されている。開催時期を類推して決めていない。確認時点の過去問題一覧では2025年度が最新の筆記問題公開年度であり、2026年度の高度試験の公開問題・解答例へのリンクはない。SG・FEの2026年度公開問題やサンプル問題を高度試験の実際の過去問として流用していない。

各PDFのURL・SHA-256・問1〜25の公式正答列は [cloud-ipa-am2-latest2-sources.json](cloud-ipa-am2-latest2-sources.json) に保存した。

|区分|回|監査前の有無|追加問数|正答照合|本文等|公式PDF|
|---|---|---|---:|---|---|---|
|DB|2025年度秋期|有・問1〜25（25問）|0|25/25一致|完了|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_db_am2_ans.pdf)|
|DB|2024年度秋期|有・問1〜25（25問）|0|25/25一致|完了|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_am2_ans.pdf)|
|PM|2025年度秋期|有・問1〜25（25問）|0|25/25一致|完了|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_pm_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_pm_am2_ans.pdf)|
|PM|2024年度秋期|有・問1〜25（25問）|0|25/25一致|完了|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_pm_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_pm_am2_ans.pdf)|
|ST|2025年度春期|有・問1〜25（25問）|0|25/25一致|未完|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_st_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_st_am2_ans.pdf)|
|ST|2024年度春期|有・問1〜25（25問）|0|25/25一致|未完|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06h_st_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06h_st_am2_ans.pdf)|
|SM|2025年度春期|有・問1〜25（25問）|0|25/25一致|未完|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_sm_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_sm_am2_ans.pdf)|
|SM|2024年度春期|有・問1〜25（25問）|0|25/25一致|未完|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06h_sm_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06h_sm_am2_ans.pdf)|
|AU|2025年度秋期|有・問1〜25（25問）|0|25/25一致|未完|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_au_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_au_am2_ans.pdf)|
|AU|2024年度秋期|有・問1〜25（25問）|0|25/25一致|未完|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_au_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_au_am2_ans.pdf)|
|ES|2025年度秋期|有・問1〜25（25問）|0|25/25一致|未完|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_es_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_es_am2_ans.pdf)|
|ES|2024年度秋期|有・問1〜25（25問）|0|25/25一致|未完|[問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_es_am2_qs.pdf) / [解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_es_am2_ans.pdf)|

## DB（50問）

公式問題冊子のPDFページ3〜16を画像として全て目視照合した。改行・フォント由来の空白を整形し、読点を原本の「，」にそろえた。数式の累乗・添字は画面向けの文字表記も使うが、図表・下線・図の選択肢は原本切出しで保持した。新規・生成・類似問題の追加は0問。既存IDと問番号は維持。全50問に公式問題URL・公式解答例URLを設定し、独自解説を書き直した。

主な修正：

- 2024問1：シーケンスの矢印・省略記号の転記。
- 2024問3・6・9：欠けていた図・表の選択肢を原本画像で補完。問9は等結合で両表の商品番号列が残る理由も修正。
- 2024問7：SQLの列参照の余分な空白を修正。
- 2024問8：ツリー・隣接リスト・SQLを補完。「リーフは親を持たない」とする誤解説を訂正。
- 2024問10：選択肢イの「ES1」を「S1」に訂正しSQL・表定義を補完。最年長の生年月日は最小であることを解説。
- 2024問13：文章化されていた待ちグラフを原本画像に戻し hasImage=true。循環に依存するFも永久待ちになる根拠を説明。
- 2024問14：欠落したa・bの定義を補完。
- 2024問15：変数xを誤って乗算記号×にした転記を訂正。
- 2024問19：常用対数の底を明示。
- 2025問3・6・11・12・23：モデル図、元表、主キー・外部キー、回復時系列、RAID図と式を原本から補完。
- 2025問4：同じ文字列に見えていた主キーの下線の違いを選択肢画像で保持し hasImage=true。
- 2025問8・9：表・SQLを原本画像でも保持し、読み順だけでは失われる構造を補完。
- 2025問12：読取りだけのT3・T4がUNDO対象外となる根拠を明示。
- 2025問20：選択肢ウの逆転した「メッセージダイジェストからデジタル署名」を原本の「デジタル署名からメッセージダイジェスト」に訂正。
- 2025問23：XOR記号の誤転記④を⊕に訂正。残存ディスクのD1・Ap・AvからA2、A1を復元する計算を解説。

原本画像を補完した問：2024年度の3・6・8・9・10・13、2025年度の3・4・6・8・9・11・12・23（計14問）。図の再生成は行っていない。

## PM（50問）

公式問題冊子のPDFページ3〜15を画像として全て目視照合した。改行・空白・読点を整形し、全50問に公式問題URL・解答例URLを保持。新規問題の追加は0問。

- 2024問4：EVMグラフを原本画像で補完し hasImage=true。
- 2024問5・6：ネットワーク図と資源制約を補完し、最遅開始21日・最少工期19日の計算根拠を記述。
- 2024問9：消失していた累乗を ^0.98 として明示。
- 2024問10：設計・製造・試験工程のX・Y・Zの定義を補完。原本の選択肢ウは1/X+1/Y+1/Z、エは1/(1/X+1/Y+1/Z)。既存の誤った分子3と調和平均という解説を訂正。
- 2024問12：要員投入表と調達条件を原本画像で補完。計94台月×5千円=470千円の根拠を記述。
- 2024問18：JISをそのまま国際規格と呼んでいた解説を修正。
- 2025問2・6・7：プロセス群図、リード・ラグ、計画変更図を補完。問6は12日、問7は33日から34日となる根拠を記述。
- 2025問9：消失した累乗を ^1.12 として明示。四つのグラフを原本画像で保持し、減少する二つの曲線の傾きの違いを説明。
- 2025問11：会議体一覧を原本画像でも保持。
- 2025問18：課金グラフを原本画像で補完。総料金が右肩下がりになるという誤解説を、総料金は増え傾きが減ると訂正。
- 2025問21：出題時点の下請法・設問の限定条件に沿う説明に修正。
- 2025問24：「ものどれか」の脱字を「ものはどれか」に訂正。

原本画像を補完した問：2024年度の4・5・6・12、2025年度の2・6・7・9・11・18（計10問）。

## 除外と未完事項

DB・PMで除外した問題は **なし（0問）**。図が必要な問題は hasImage を付け、原本画像を提供できた。問題が欠けていないため架空の問題で水増ししていない。ST・SM・AU・ESの内容による除外判断は未実施であり、「除外不要」と判定したものではない。

DB・PMの修正は各区分index.tsの最終段にある監査オーバーレイで適用する。生のby-yearは旧データのままなので、掲載内容の確認には公開エクスポートを用いる。共有補正処理や他作業中の区分への変更を避けるための構成である。

## 検証

- `pnpm install`：成功（lockfile変更なし）。
- `pnpm validate:questions`：成功。26,444問、fail=0、warn=16,808。既存データの品質警告（タグ未設定・短い解説・他年度の画像未添付など）は残る。
- `pnpm typecheck`：初回はNodeの既定ヒープ約2GBでメモリ不足。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`で再実行し成功。
- `pnpm exec vitest run __tests__/questions/cloud-ipa-am2-latest2.test.ts __tests__/questions/ipa-paper-player-parity.test.ts __tests__/questions/explanation-consistency.test.ts`：3ファイル・25テスト全て成功。新しいテストで12回・300問の正答列とURL、完了区分の画像実在、RSA選択肢と生産性の式、主キー下線の画像を検証。既存のプレイヤー整合性テストの定型文開始件数は、DB解説の書換えによる実測値1,451へ更新。
- `pnpm build`・デプロイは実施していない。
