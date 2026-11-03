# keiryoshi 第76回ステージング・直近回取得報告

更新日：2026-11-03（UTC）
対象：一般計量士・環境計量士（濃度関係）・環境計量士（騒音・振動関係）
作業ブランチ：`claude/vibrant-allen-nla4zw`

## 作業結果

第76回の8科目200原問をテキスト・全5肢・全肢の独自解説で未公開データとして追加した。資格への割当は各100問、合計300件。法規・管理の50原問を共通データとして共有する。図が必要な36原問は原本から切り出した図を併用し、`hasImage` と代替テキストを保持した。問題本文を画像だけにした問題、類題、生成問題は含まない。

独立レビュー2回目の3件を修正し、全200問の強調表現・記号・添字も機械走査して追加7問を修正した。指定検証の最新結果は下記「検証と制約」に記載。未公開状態を維持し、今回の指示に従いコミット・pushは実施しない。

| 資格 / slug | 専門科目 | 共通科目 | 第76回ステージング | 第75回 | 第74回 | 公開問数 |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| 一般計量士 / `keiryoshi` | 一基25・計質25 | 法規25・管理25 | 100 | 0 | 0 | 0 |
| 環境計量士（濃度関係） / `keiryoshi-nodo` | 環化25・環濃25 | 法規25・管理25 | 100 | 0 | 0 | 0 |
| 環境計量士（騒音・振動関係） / `keiryoshi-soon` | 環物25・環音25 | 法規25・管理25 | 100 | 0 | 0 | 0 |

## 独立レビュー2回目への対応（2026-11-03）

公式PDFは `data/raw_pdfs/keiryoshi/` の原本を使用した。

| 指摘 | 修正・照合結果 |
| --- | --- |
| 環物問14（PDF15ページ） | 現画像を変更せず、`figure-crops.json` の座標・SHA256を更新。`pdftoppm -scale-to 2000`（`-cropbox`なし）のMediaBox画像1462×2000 pxから `[248,550,1242,1000]`、比率 `[0.17,0.275,0.85,0.5]`。現PNGとの画素一致を確認。SHA256は `31c5c75fe20c88cb3d7c8d60fce37accc174abd1c373f3dc377f759f1c0b5997`。座標系も明記し、旧座標と混同しないようにした。 |
| 計質問19（PDF20ページ） | 分銅の記号を本文・全5肢・全体解説・肢アの解説で `Mᵣ`・`ρᵣ` に復元。符号・式の構造・正答は維持。 |
| 環濃問16（PDF17ページ） | 公式の下線範囲「吸引採取」「捕集バッグ」「希釈」を各ラベルの直後の `【 】` で明示し、原本の下線範囲を括弧で表示した旨を本文に付記。既存の `QuestionBody` は太字に対応するが下線タグに対応しないため、既存データの文字列だけで判定対象範囲を示した。 |

追加点検で修正した7問：

| 科目・問（PDFページ） | 修正内容 |
| --- | --- |
| 環物問10（11） | 初速度 `v0` → `v₀` |
| 環物問11（12） | 振幅 `A0` → `A₀`（図内表記とも照合） |
| 環物問12（13） | 下線「誤っている」を既存の太字表示で代替し、本文に加工注記 |
| 環化問6（7） | 質量数の上付き `³H`・`³He` と `β⁻` を復元 |
| 環濃問6（7） | 下線「塩酸」「加圧法又は減圧法」「メタノール」を `【 】` で明示し加工注記。内標準物質の `d₁₆` も復元 |
| 管理問14（15） | `y₀`・`x₀`・`M₁`・`M₂`・`Mₙ`・`y₁`・`y₂`・`yₙ` の添字を復元 |
| 管理問24（25） | 工程能力指数を `Cₚ`・`C_pk` に修正し、解説も統一。複数字添字pkは既存のアンダースコア記法を使用 |

### 全200問の機械走査と点検範囲

8科目各25問、計200ページの本文・全5肢に対し、PDFの文字位置・サイズ・基線、太字/Gothicフォント、細い線・矩形、点状の小描画、データ側のASCII数式候補を抽出した。候補は上下付き文字67問、細線48問、太字/Gothic7問、小文字サイズ等76問（重複あり）。本文の下線指定に対応する実際の強調範囲は環物12・環濃6・環濃16・環音15で確認した。環音15の既存の太字範囲は公式の5範囲と一致した。図内の太字ラベル・数字は既存画像に保持されている。

PDF抽出では分数線・空欄線・表罫線も候補となり、数式の重複文字や別文字への誤変換もある。候補を本文・全5肢と照合し、抽出だけでは確定できない式・記号はPDF画像でも照合した。複数字添字（例 `L_Aeq,T`、`S_A`）、分数、積分の上下限は既存の明示的なテキスト記法も許容した。単なる正規化後の文字一致を、表示の忠実性の保証とは扱わなかった。表の線や図の記号とは別の傍点指定の欠落は確認しなかった。

再現用の `docs/evidence/keiryoshi-76/typography-scan.py`（PyMuPDFが必要）、全200問の抽出結果 `typography-scan.json`、各問の判定と修正理由 `typography-review.json` を保存した。走査は画像内文字のOCRを含まず、全解説の意味内容を自動保証するものでもない。今回の追加修正後、この点検で未処理の転記候補はない。

## 根拠と正答訂正

- [経済産業省 過去の計量士国家試験問題](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/23_kakomon.html)。取得済みの `LISTINGS.json` を `docs/evidence/keiryoshi-76/listings.json` に保持。最新2回は第76回・第75回。第74回も追加取得を試みた。
- [第76回試験公示案内](https://www.meti.go.jp/information/license/data/c250620aj.html) の公式検索結果本文で実施日2025-12-14を確認。
- [第76回 正答案内](https://www.meti.go.jp/information/license/data/c251215aj.html) と [訂正版正答PDF](https://www.meti.go.jp/information/license/data/pdf/c251215aj.pdf)。8科目の番号・資格対応は公式一覧、取得時MANIFESTの対応、正答案内の公式検索結果及びPDFの列見出しと照合。
- 法規問21は訂正後の **2**（内部キー「イ」）。共通データから3資格すべてに反映。問題PDFの肢4にある「しなけなければ」の表記は原文どおり保持し、解説で注記。
- 環濃問3はPDF脚注「※『環・濃』の問３は、全員正解とする。」に従う。`answer` を全5肢の許容配列、`requiredSelections: 1` とし、既存の許容正答判定でどの1肢でも正解になる。解説カードの正答表示は「全員正解」。既存の回答直後の番号列表示でも1～5の全肢が許容正答として並ぶ。無回答の自動加点は既存プレイヤーの範囲に含めず、1肢の回答後に採点する。旧正答5へ固定しない。

法令問題の解説には「令和7年12月（出題時点）の法令に基づく解説。」を明記し、`lawReferenceDate: 2025-12-14` を保持。下線部を問う環音問15は原本の下線範囲を既存の太字表示で示し、加工内容を本文に付記した。数式の上下付き文字、分数、行列、表は可読なテキスト表記に直した。計質問7の水・水銀の密度値は、物理上の一般的な値に置き換えず印刷原文の1・13 kg/m³を保持した。

### 収録したPDF

原本は入力済みの `data/raw_pdfs/keiryoshi/` を使用。全9本のSHA256を `MANIFEST.json` と再照合した。下記は各25問で、正答PDFは200問分。

| 科目 | 根拠PDF | SHA256 |
| --- | --- | --- |
| 環化 | [1_R07kanka.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/1_R07kanka.pdf) | `4c2d616c8730662c17a0f49f975b3a192b428b4366ca92243b26bd1ca768ba56` |
| 環物 | [2_R07kanbutsu.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/2_R07kanbutsu.pdf) | `60c405da45bbb2caa8eca449b4c795a9978653e71949e6f86b738f8286e33921` |
| 環濃 | [3_R07kannou.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/3_R07kannou.pdf) | `e974e7ef94d5d3bea05475e4feb0aae24818b00e11c9863a2c18ff155722e774` |
| 環音 | [4_R07kanon.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/4_R07kanon.pdf) | `7a4875e31447f97800ca8bec580a2dbbd2b151e605bbfd82fedf88de8605f45e` |
| 法規 | [5_R07houki.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/5_R07houki.pdf) | `47a95bc57a6e0ae4d1a7648be2b980013c020c1efcf6c8795c27c33934205b7d` |
| 管理 | [6_R07kanri.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/6_R07kanri.pdf) | `5ff07c981fa25369969ec9b67cb0ed3d67ca9ee082e911e2f2fe970c34978ffa` |
| 一基 | [7_R07ichiki.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/7_R07ichiki.pdf) | `7167c8fc22f6c98f69354681bf6bb21fa87f53b2e0c6d0a9eeeab6abfd996349` |
| 計質 | [8_R07keishitsu.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/8_R07keishitsu.pdf) | `a5b2df650eec926bdd35e799be932497370fd411e8ccc37b262b38debff412ca` |
| 正解番号 | [c251215aj.pdf](https://www.meti.go.jp/information/license/data/pdf/c251215aj.pdf) | `0846d92bce58ba6ff32fa098097f23bc7e13700f33d9d0ca0132df7178d8c433` |

## 除外と取得できなかった一覧

第75回は入力の `FAILED.json` では全9件HTTP 202。今回、公式一覧に記載されたURLへ通常アクセスし直したところ全9件403。第74回も公式一覧の全9件が403となった。問題・正答原本を確認できないため、両回とも作成・収録しない。CAPTCHA・ボット拒否を迂回していない。第76回は入力原本が揃っているため、今回の直接アクセス拒否を収録除外の理由にしていない。

| 回 | 科目 / 資料 | 取得できなかった公式URL | 今回の結果 |
| --- | --- | --- | --- |
| 75 | 環化 | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/1_R06kanka.pdf) | HTTP 403 |
| 75 | 環物 | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/2_R06kanbutsu.pdf) | HTTP 403 |
| 75 | 環濃 | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/3_R06kannou.pdf) | HTTP 403 |
| 75 | 環音 | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/4_R06kanon.pdf) | HTTP 403 |
| 75 | 法規 | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/5_R06houki.pdf) | HTTP 403 |
| 75 | 管理 | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/6_R06kanri.pdf) | HTTP 403 |
| 75 | 一基 | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/7_R06ichiki.pdf) | HTTP 403 |
| 75 | 計質 | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/8_R06keishitsu.pdf) | HTTP 403 |
| 75 | 正解番号 | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/75seikaibangou.pdf) | HTTP 403 |
| 74 | 環化（PDF形式：739KB） | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/1_R05kanka.pdf) | HTTP 403 |
| 74 | 環物（PDF形式：1,016KB） | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/2_R05kanbutsu.pdf) | HTTP 403 |
| 74 | 環濃（PDF形式：245KB） | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/3_R05kannou.pdf) | HTTP 403 |
| 74 | 環音（PDF形式：391KB） | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/4_R05kanon.pdf) | HTTP 403 |
| 74 | 法規（PDF形式：215KB） | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/5_R05houki.pdf) | HTTP 403 |
| 74 | 管理（PDF形式：511KB） | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/6_R05kanri.pdf) | HTTP 403 |
| 74 | 一基（PDF形式：916KB） | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/7_R05ichiki.pdf) | HTTP 403 |
| 74 | 計質（PDF形式：642KB） | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/8_R05keishitsu.pdf) | HTTP 403 |
| 74 | 正解番号 | [公式PDF](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/00_download/R05_seikaibangou.pdf) | HTTP 403 |

試行のURLと結果は `docs/evidence/keiryoshi-76/network-attempts.json` に保持。公式未公表と判定したものではなく、原本取得不能による除外である。第76回内の除外は0問。

## 既存成果と登録方式

`CLAUDE.md` を最初に読み、類似資格の問題データ、資格台帳、集約・遅延ローダー、ルーティング、資格一覧、`data/exam-library` を確認した。開始時点に存在した `03d65d6b`（WIP）の資格登録・型・ローダー・出典台帳・管理3問の図を再利用し、未完成だった原問データを補った。既存成果を別実装で作り直していない。

`git ls-remote --heads origin 'claude/*' 'qual/*' 'codex/*'` で388件の名前・先端ハッシュを確認。同じWIP先端が `claude/vibrant-allen-nla4zw` にあり、別の計量士名/slugのブランチは見つからなかった。任意名ブランチの全内容を照合できたわけではない。先行作業で `git fetch` が `.git/FETCH_HEAD` 読み取り専用エラーとなっており、その制限を迂回していない。

- `data/questions/keiryoshi/2025-*.json`：8科目を一元保存。`index.ts` が科目対応に従って資格別IDを割り当て、300件の候補を返す。
- `lib/qualifications/catalog.ts`：3資格とも `ready-to-ingest`。オーナーの権利確認済み判断を記載し、独立レビューと環境復旧後の検証を公開前作業として残す。
- `data/questions/index.ts` と `lib/questions/get-questions.ts`：`isExamPublished` を経由し、通常の同期・非同期出題経路から取得させない。公開資格一覧も従来の `live` 判定を使用。
- 既存の試験設定・セッション・表示名・SEO名登録を使用。番号表示を公式の1～5に合わせ、正答配列が全肢を許容する場合の表示を補った。構造化データの著者と利用条件も経済産業省へ対応。
- `data/exam-library` の公開カタログは別の資格群向けであるため追加せず、`source-packs/keiryoshi-76.json` に未公開の出典・科目対応だけを保存。公開用の新ルートは増設していない。

## 転載条件の記録

オーナーの「権利確認済み」を承認として扱い、転載条件の文言を中断理由にしていない。

[経済産業省 利用規約](https://www.meti.go.jp/main/rules.html) の公式検索結果本文で次の文言を確認した：

> コンテンツを編集・加工等して利用する場合は、上記出典とは別に、編集・加工等を行ったことを記載してください。

同じ公式検索結果には、PDL1.0に関する重要情報、第三者が権利を有する部分の扱いについての記載もある。利用規約ページの直接openは403であり、本文全体を取得したとは扱わない。計量士試験固有の別の使用許諾申請文言は確認できておらず、未確認の文言を創作しない。

各問の出典には「出典：経済産業省 第76回計量士国家試験 ○○ 問○（問題・訂正版正答）。テキスト化・図の切り出しは過去問AI、解説は独自作成。」を保持する。問題・正答双方の公式URLを保存し、独自解説を公式作成の解説として表示しない。

## 検証と制約

修正後の最新実行結果：

| 操作 | 結果 |
| --- | --- |
| `pnpm validate:questions` | 成功：26,744問、fail=0、warn=16,956（短い解説等の警告を含む） |
| `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` | 成功、終了コード0 |
| `npx vitest run __tests__/keiryoshi-staging.test.ts __tests__/seo` | 成功：111ファイル、597テスト全件合格、終了コード0 |
| `python scripts/verify-keiryoshi-source.py` | 成功：9PDFハッシュ、200正答、各科目25問、全1,000肢解説の存在、各資格100問・300ID、36画像の存在・ハッシュを検証 |
| 環物問14の切り出し照合 | 公式PDFの上記MediaBox座標からの切り出しと現PNGの画素が完全一致 |
| `git diff --check` | 成功 |

`sourceAudit` は今回のPython監査が実際に終了コード0で成功した後に `passed` に更新した。最新結果は `docs/evidence/keiryoshi-76/verification-status.json` に保存する。型検査の初回は終了コード143で中断したが、同一指定コマンドの再実行と最終実行は終了コード0だった。

初回データ取得時はCorepackのキャッシュ環境エラー等で検証を開始できなかったが、今回は既存環境で上記コマンドを実行できた。依存定義・設定・実装コードは変更していない。

今回の変更は問題データ・証跡・このレポートのみ。画像ファイル、問題の正答、公開制御は変更していない。コミット・push・PR・デプロイは実施していない。未公開状態のテストはリポジトリ内の出題経路を対象とし、稼働サイトのデプロイ状態を確認したものではない。

## 第75回追加作業（2026-11-03・未完了）

**第75回の問題データ追加は未完了。直近2回分の収録完了とは扱わない。** 上記の第75回「原本取得不能」は前作業時点の記録であり、今回提供された `data/raw_pdfs/keiryoshi/r06-75/` の原本9本で解消した。現在の未収録理由は原本取得不能ではなく、転記・解説・画像・全数照合が未完了である。第76回の問題・画像・証跡・公開制御は変更していない。

### 確認済みの原本・資格対応

対象は第75回（令和6年12月実施、出題年2024）。[公式実施案内](https://www.meti.go.jp/information/license/data/c240621aj.html)の公式検索結果で2024-12-15実施を確認。[問題一覧](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/23_kakomon.html)、入力 `LISTINGS.json`、[正答案内の資格・科目対応表](https://www.meti.go.jp/information/license/data/c241216aj.html)、正答PDFの8列見出しを照合した。法規・管理は3資格共通。

| 資格 | 第75回対象科目と公式問数 | 第75回予定展開件数 | 第75回登録済 | 第76回登録済 | 公開問数 |
| --- | --- | ---: | ---: | ---: | ---: |
| 一般計量士 `keiryoshi` | 一基25・計質25・法規25・管理25 | 100 | 0 | 100 | 0 |
| 環境計量士（濃度関係） `keiryoshi-nodo` | 環化25・環濃25・法規25・管理25 | 100 | 0 | 100 | 0 |
| 環境計量士（騒音・振動関係） `keiryoshi-soon` | 環物25・環音25・法規25・管理25 | 100 | 0 | 100 | 0 |

8問題PDFは各26ページ（表紙＋問ページ25）、正答PDFは問1～25の8列、計200正答セル。200原問から資格別300件に展開する予定で、法規・管理50原問は第76回と同様に共有する。現時点では `2024-*.json` とローダーへの登録を行っていない。`source-packs/keiryoshi-75.json` は `publicationStatus: staging`、`ingestionStatus: pending-transcription`、実登録0問を明記した準備台帳である。

| 科目 | MANIFEST記載の公式URL |
| --- | --- |
| 環化25問 | [1_R06kanka.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/1_R06kanka.pdf) |
| 環物25問 | [2_R06kanbutsu.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/2_R06kanbutsu.pdf) |
| 環濃25問 | [3_R06kannou.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/3_R06kannou.pdf) |
| 環音25問 | [4_R06kanon.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/4_R06kanon.pdf) |
| 法規25問 | [5_R06houki.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/5_R06houki.pdf) |
| 管理25問 | [6_R06kanri.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/6_R06kanri.pdf) |
| 一基25問 | [7_R06ichiki.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/7_R06ichiki.pdf) |
| 計質25問 | [8_R06keishitsu.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/8_R06keishitsu.pdf) |
| 正答200件 | [75seikaibangou.pdf](https://www.meti.go.jp/policy/economy/hyojun/techno_infra/75seikaibangou.pdf) |

9本のサイズとSHA256を入力MANIFESTと再照合し、`docs/evidence/keiryoshi-75/source-manifest.json` に保存。正答表200セルを `pdftotext -layout` から別台帳 `official-answers.json` へ抽出した。入力正答PDF内に全員正解等の特例の注記はなく、200セルは全て単一の1～5。

[公式正答案内](https://www.meti.go.jp/information/license/data/c241216aj.html)、[公式結果案内](https://www.meti.go.jp/information/license/data/c250218aj.html)、[公式過去のお知らせ](https://www.meti.go.jp/information/license/c_main_backno.html)の検索結果と訂正・全員正解の公式検索で、第75回の訂正告知は見つからなかった。ただし正答・結果案内の直接openは403で、訂正が存在しないことまで確認済みとはしない。検索結果にある別URLの正答PDF `c241216aj.pdf` は今回バイト取得・ハッシュ検証していないため、入力MANIFESTの正答PDFに置き換えていない。確認範囲と制約は `official-research.json` に記録。

### 全数点検の実施範囲と未達項目

`docs/evidence/keiryoshi-75/prepare-source.py` はローカル原本のみを読み、全200問ページについて、pdftotextとPyMuPDFの未加工抽出テキスト、画像オブジェクトの位置・寸法、全ベクタパスの外接矩形、フォント名・ToUnicodeの有無を列挙した。結果は `source-inventory.json`・`font-audit.json`・`pdftotext-errors.json`。再現には `pdftotext`・`pdfinfo`・PyMuPDFが必要。今回の補助Pythonパッケージは `/tmp/keiryoshi-python` に導入し、リポジトリの依存定義は変更していない。

画像オブジェクトのあるページは37/200、ベクタパスのあるページは200/200。後者には文字輪郭・背景・罫線・数式線等が含まれ、**図が必要な問題数や切出し完了数を意味しない**。まだ図候補の全件分類、切出し、ラベル・軸・単位・寸法線を含む画素包含検証、画像ハッシュ台帳を完成していない。

pdftotextは複数PDFで `Missing language pack for 'Adobe-Japan1' mapping`、未定義のフォントタグ等を報告し、PyMuPDFでも複数の埋め込みフォントにToUnicodeがなく、日本語の字形番号が別のUnicode文字として抽出される。例えば一基問1の「実数」は未加工抽出で `ᐇᩘ` となる。PDFの描画では読めるため、原本の破損とは判定していない。第76回の同字形との照合を試したが、未確定文字と数式の読み順が残り、復元結果を確定転記として保存していない。

したがって、本文200欄・全選択肢1,000欄の公式PDFとの全件照合、pdftotextとの全差分の審査、下線・太字等の範囲保持、添字・ギリシャ文字・符号の照合は**未完了**。斜体も未再現・未点検。全体解説200件・肢解説1,000件、独立再計算、図に沿った回路・配線・構造の説明も未作成である。法規等の解説には「令和6年12月（出題時点）の法令」と基準日2024-12-15を持たせる必要がある。既存の2025年の法令注記を流用しない。

第75回内の品質を理由にした恒久除外は決定していない。全200原問が収録作業中で、登録0問。第74回は今回の対象外。オーナーの権利確認済み決定を適用し、転載条件を理由に止めていない。転載条件の文言は、既存報告の「加工した旨を出典とは別に記載する」を引き継いで記録した（今回、利用規約ページ全文を再取得したとは扱わない）。

### 今回の検証

`verify-keiryoshi-source.py` を回・年度・原本ディレクトリ・法令基準日で共通化し、第76回と第75回を順に検証するよう拡張。第76回固有の法規21＝2、環濃3＝全員正解の検査は維持。両回の収録完了後は全600候補IDの衝突も検査する。第75回が未収録の間は非ゼロ終了し、原本監査の成功を問題追加の成功として扱わない。

指定チェックの実行結果は `docs/evidence/keiryoshi-75/verification-status.json` と各ログを参照。第75回は指定検証・全数点検の全PASSに未到達。既存のTypeScriptテストが合格しても、第75回の本文等の品質を検証済みとはしない。

main操作・push・PR・デプロイ・`pnpm build`・独立レビュー依頼は行っていない。未完了のためコミットは作成していない。

| 指定チェック | 今回の結果 |
| --- | --- |
| `pnpm validate:questions` | 終了0、26,744問、fail=0、warn=16,955。第75回は未登録のため対象に含まれない |
| `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` | 終了0 |
| `npx vitest run __tests__/keiryoshi-staging.test.ts __tests__/seo` | 終了0、111ファイル・597テスト合格。第76回の既存テストを含む |
| `python3 scripts/verify-keiryoshi-source.py` | **終了1**。第76回200原問・1,000肢解説・300候補ID・73画像は成功。第75回は9原本ハッシュ・200正答が一致した後、0科目/0原問で未完了を検出 |
| `git diff --check` | 終了0 |
| 第76回ファイル保全 | 2025年8科目JSON・index・source-pack・既存テスト・第76回証跡の計92ファイルがHEADの内容と完全一致。`round76-integrity.json` にハッシュを保存 |
