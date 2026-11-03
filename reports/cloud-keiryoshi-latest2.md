# keiryoshi 第76回ステージング・直近回取得報告

更新日：2026-11-03（UTC）
対象：一般計量士・環境計量士（濃度関係）・環境計量士（騒音・振動関係）
作業ブランチ：`claude/vibrant-allen-nla4zw`

## 作業結果

第76回の8科目200原問をテキスト・全5肢・全肢の独自解説で未公開データとして追加した。資格への割当は各100問、合計300件。法規・管理の50原問を共通データとして共有する。図が必要な36原問は原本から切り出した図を併用し、`hasImage` と代替テキストを保持した。問題本文を画像だけにした問題、類題、生成問題は含まない。

指定のpnpm検証はCorepackの環境エラーで起動不可、資格別コミットはGitメタデータの読み取り専用制限で未作成。したがって、検証合格・公開可能・作業完了とは扱わない。独立レビューは今回呼び出しておらず、監督役が行う。

| 資格 / slug | 専門科目 | 共通科目 | 第76回ステージング | 第75回 | 第74回 | 公開問数 |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| 一般計量士 / `keiryoshi` | 一基25・計質25 | 法規25・管理25 | 100 | 0 | 0 | 0 |
| 環境計量士（濃度関係） / `keiryoshi-nodo` | 環化25・環濃25 | 法規25・管理25 | 100 | 0 | 0 | 0 |
| 環境計量士（騒音・振動関係） / `keiryoshi-soon` | 環物25・環音25 | 法規25・管理25 | 100 | 0 | 0 | 0 |

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

| 操作 | 結果 |
| --- | --- |
| `pnpm install` | 失敗：Corepackが `/root/.cache/node/corepack/v1` をmkdirできず `ENOENT`。依存導入未完了 |
| `pnpm validate:questions` | 同じCorepackエラーで検証本体起動前に失敗 |
| `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` | 同じCorepackエラーで型検査本体起動前に失敗 |
| 関連Vitest（下記） | 同じCorepackエラーでテスト本体起動前に失敗 |
| `python scripts/verify-keiryoshi-source.py` | 成功：9PDFハッシュ、200正答、各科目25問、全1,000肢解説の存在、各資格100問・300ID、36画像の存在・ハッシュを検証 |
| `git diff --check` | 成功 |
| `git add data/questions/keiryoshi/2025-ichiki.json data/questions/keiryoshi/2025-keishitsu.json` | 失敗：`.git/index.lock: Read-only file system`。資格別コミットは0件 |

関連テストの実行コマンド：

```sh
pnpm test -- __tests__/keiryoshi-staging.test.ts __tests__/lib/accepted-answers.test.ts __tests__/lib/native-b.test.ts __tests__/unit/exam-source-label.test.ts __tests__/lib/question-source-label.test.ts
```

新規テストは資格対応・公式正答全件・全員正解の1肢採点と表示・通常経路からの公開抑止・出典表示を確認する。pnpm検証が合格したとは報告しない。Python監査は出典データの検査であり、TypeScriptの型検査やブラウザー表示検証の代替ではない。原文と解説内容の独立確認は監督役に引き継ぐ。

`docs/evidence/keiryoshi-76/official-answers.json`、`transcription-ledger.json`、`figure-crops.json`、`source-audit-result.json`、`verification-status.json` に監査情報を保存した。元の `source-inventory.json` はPDF抽出の未整形テキストを保管したものなので、UI本文には用いない。

pnpmキャッシュ移動、別パッケージマネージャー、権限変更、別Gitディレクトリなどによる制限の迂回は行っていない。今回の作業では独立レビューを呼ばず、`pnpm build`・push・PR・デプロイ・main変更も実施していない。作業ツリーの変更を残しており、指定検証が可能でGitメタデータへ書ける環境で検証後、一般計量士・濃度・騒音振動の資格単位でコミットする作業が残る。
