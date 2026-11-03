# 公認心理師（shinrishi）独立再レビュー 2

**再レビュー判定：FAIL。第9回の未解決内容指摘2件（2問2肢）。保留管理の修正確認：PASS。公開可否：全308問を理由付き保留（現在の公開は不可）。**

レビュー日：2026-11-03。最初にCLAUDE.mdを読み、初回 `reports/cloud-shinrishi-review-1.md` の5指摘、検証方法、必要図の証拠、未確認範囲を確認した。他agentは使用していない。リポジトリの変更対象は本報告書のみ。問題データ・コードの修正、build、deploy、push、PR、commit、秘密値・環境変数の参照・出力は実施していない。

## 範囲と固定条件

内容レビュー対象は **`data/questions/shinrishi/2026-annual.json` の第9回154問755肢のみ**。午前77問377肢、午後77問378肢。全154件の設問・選択肢・概要解説と全755件の肢別解説を通読し、正答との関係だけでなく、各肢の適否、具体的理由、否定極性、事例との対応、医学・心理学・法制度の専門的妥当性を独立に評価した。正答一致や文字数検査を内容レビューの代わりにしていない。

**第8回の2025年JSONは別作業者が編集中のため、今回の内容レビュー対象外。未完成の解説と、それに起因するテスト失敗は今回のFAIL理由にしていない。** 全308問という数は保留管理・収録管理の確認範囲であり、第8回の内容まで合格とする意味ではない。

レビュー開始時に作業ツリーのデータと関連コード（app、components、lib、scripts、tests、data、設定等4,281ファイル）を `/tmp/shinrishi-review2-start` にコピーし、以後の評価とテストは固定コピーに対して行った。固定時刻は2026-11-03 16:13:03 UTC、全コピーのSHA-256台帳は同ディレクトリの `review-manifest.json`。同時作業者による後続変更を取り込んで評価していない。テストでは既存node_modulesを参照し、空のserver-onlyテストスタブを一時領域に用意した。

## 判定の区別

| 評価項目 | 結果 |
| --- | --- |
| 第9回原文・全選択肢・公式正答・選択数・出典ページ | PASS、154/154問 |
| 第9回全肢解説の存在・構造 | PASS、154問755/755肢、全問full |
| 第9回全肢解説の内容 | FAIL、以下の2件。その他の152問について今回のレビューで要修正の内容指摘は認めなかった |
| 番号シャッフル修正 | PASS、全候補を順序固定、初回対象15問を含む回帰テスト成功 |
| 全肢解説の例外削除 | PASS、shinrishiのofficial-summary例外は削除済み |
| 台帳・公開保留管理 | PASS、保存308問・公開0問、具体的なポリシーURLと許可記録未確認の理由を保持 |
| 公開可否 | 全308問を保留。許可記録未確認の現状で公開へ切り替えない |

公開保留はユーザーの認めた理由付き保留であり、新たな内容不備として数えていない。[公式サイトポリシー第2項](https://www.jccpp.or.jp/policy.html)を今回も閲覧し、法によって認められる場合を除く事前許可の条件を確認した。許諾不存在や違法性の断定はしていない。今回のFAIL理由は以下の内容指摘であり、保留そのものでも第8回の未完成でもない。

## 内容上の未解決指摘

### R2-C001：A-B-XモデルをABC-Xモデルと取り違えて説明

- 問題ID：`shinrishi-2026-annual-pm-090`
- 肢：ウ（原典③）「A-B-X モデル」
- 現在の解説：「ストレッサー、資源、認知の関係から家族危機を説明するモデル。指導への反応に応じた教育介入とは異なる。」
- 理由：この説明は家族ストレス・家族危機のABC-Xモデルに対応し、原問のA-B-Xモデルとは別物。NewcombのA-B-Xは人物A・Bと対象Xへの志向および相互関係を扱うコミュニケーションのモデルである。誤答肢であるという結論は合っているが、その理由として別モデルを学習させてしまう。
- 根拠：Newcomb (1953), *An Approach to the Study of Communicative Acts*, Psychological Review 60, 393–404、[原論文DOI](https://doi.org/10.1037/h0063098)。DOI経由の本文取得はできなかったため、[原論文の公開複製本文](https://www.scribd.com/document/85074834/Newcomb-ABX)の “CO-ORIENTATION AND THE SYSTEM A-B-X”、pp.393–394を確認した（サイトのAI生成要約ではなく原論文本文）。AとBは人、Xはコミュニケーションの対象として定義される。家族危機との対照は[日本家族看護学会の教育ツール、ABC-Xモデル](https://jarfn.or.jp/work/doc/kyoiku-sokushin/kyoiku-tool-202203.pdf)も参照。
- 原問：[午後PDF p.11](https://www.jccpp.or.jp/files/items/222/File/05_gokaku_happyo_09pm.pdf#page=11)。公式正答は②（イ、RTIモデル）で、原文・正答は変更不要。
- 修正案：「Newcombのモデルで、人物A・Bと対象Xへの態度や相互の関係を扱う。指導への反応に応じて支援を調整するRTIとは異なる。」とする。家族危機の説明をこの肢に置かない。

### R2-C002：集団錯誤の固有の意味が示されず、水準間の推論の誤りと混同させる

- 問題ID：`shinrishi-2026-annual-pm-088`
- 肢：ウ（原典③）「集団錯誤」
- 現在の解説：「集団水準と個人水準の性質を混同するような誤り。二つの事柄の関係を誤って認知する本問は錯誤相関に当たる。」
- 理由：F. H. Allportの集団錯誤は、個々人の心とは独立した集団の心・意識を実体化して説明することへの批判を指す。「集団水準と個人水準の性質を混同」という説明だけでは、集計結果から個人の性質を推論する生態学的誤謬等との区別ができず、集団錯誤の中核となる集団心の実体化を説明していない。誤答判定は正しいが、用語の具体的説明を修正する必要がある。
- 根拠：[Allport (1924), Social Psychology, Chapter 1, “Social Psychology as a Science of the Individual. The Group Fallacy” および “Psychological Forms of the Group Fallacy”](https://brocku.ca/MeadProject/Allport/1924/1924_01.html)。原著本文で、成員の心から独立した集合的な心・集団意識を仮定する問題と、その具体的な類型を確認した。
- 原問：[午後PDF p.10](https://www.jccpp.or.jp/files/items/222/File/05_gokaku_happyo_09pm.pdf#page=10)。公式正答は②（イ、錯誤相関）で、原文・正答は変更不要。
- 修正案：「F. H. Allportが批判した、個々人とは独立した心や意識を集団そのものに想定する考え方。無関係な属性間に関連を認知する錯誤相関とは異なる。」とする。

## 全肢内容レビューの実施記録

| 通し番号 | 問数 | 肢数 | 実施内容・結果 |
| --- | ---: | ---: | --- |
| 1–25 | 25 | 125 | 全文・全肢解説通読。喪失、発達、心理検査、医学モデル等の概念差を確認。指摘0 |
| 26–50 | 25 | 120 | 全文・全肢解説通読。制度の根拠法、薬剤・病態、否定問、効果量と有意水準の区別を確認。指摘0 |
| 51–77 | 27 | 132 | 全文・全肢解説通読。複数選択、児童福祉制度、鑑別、学校支援、復職事例との対応を確認。指摘0 |
| 78–102 | 25 | 125 | 全文・全肢解説通読。研究法、社会心理学、検査、支援モデル等を確認。問88・90の各1肢を要修正 |
| 103–128 | 26 | 123 | 全文・全肢解説通読。教育、司法、医学、労災・児童の意見聴取等の制度を確認。指摘0 |
| 129–154 | 26 | 130 | 全文・全肢解説通読。公認心理師法、検査・療法、病態事例、テレワークの対応を確認。指摘0 |
| 合計 | 154 | 755 | 全問全肢実施。内容指摘2件 |

否定極性の問41・42・43・44・45・53・77・118・119・120・121・128について、選択する肢が「不適切／該当しない」理由と、それ以外の肢が該当する理由を確認した。13問の2肢選択も両正答と残りの肢を確認した。事例では、例えば問62の爪かみと加害強迫の主問題、問67の産後精神病の緊急性、問68の生活自立の保持、問77の再休職判断に先立つ評価、問144の身体症状と病気不安の区別、問150の医療優先などを検討した。選択肢間の相対的な適切さを説明する文章を、他の診断・支援が常に不可能という断定として扱っていない。

不確かな点・制度や医学の要点は、以下の一次資料・所管機関資料で追加確認した。全755肢に個別文献を割り当てて取得したという意味ではない。

| 対象 | 追加確認した根拠・要点 |
| --- | --- |
| 問3 | [厚労省・精神科リエゾンチームの施設基準](https://www.mhlw.go.jp/web/t_doc?dataId=00tc4895&dataType=1)：経験要件を満たす薬剤師を含む構成職種 |
| 問28 | [文科省・学びの多様化学校の手引き](https://www.mext.go.jp/content/20240304-mxt_jidou02-000004552_b.pdf)：不登校児童生徒に応じた特別の教育課程 |
| 問36 | [厚労省・抗コリン薬の緑内障禁忌の見直し](https://www.mhlw.go.jp/web/t_doc?dataId=00tc4327&dataType=1&pageNo=1)：病型を区別する説明の妥当性 |
| 問62 | [NICE CG31 Recommendations](https://www.nice.org.uk/guidance/cg31/chapter/Recommendations)：強迫観念と中和・儀式への曝露反応妨害 |
| 問67 | [NHS・Postpartum psychosis](https://www.nhs.uk/mental-health/conditions/post-partum-psychosis/)：産後の急性精神病と緊急医療対応 |
| 問94 | [検査発行元・日本版DN-CASの解釈と事例](https://www.nichibun.co.jp/seek/book/63734.html)：PASSとの関係。検査マニュアル全文を取得したとはしていない |
| 問107 | [法務省・少年院](https://www.moj.go.jp/kyousei1/kyousei_kyouse04.html)：第4種の刑執行、第5種の特定少年の遵守事項違反による収容 |
| 問114 | [PMDA・ニフェジピン徐放錠添付文書](https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/480235_2171014G1259_1_08)：グレープフルーツで血中濃度・作用が増強し得る |
| 問116 | [厚労省・2023年精神障害認定基準](https://www.mhlw.go.jp/web/t_doc?dataId=00tc7915&dataType=1)：本人の主観だけでなく同種労働者の一般的受け止め方で評価 |
| 問120 | [文科省・いじめ重大事態調査ガイドライン](https://www.mext.go.jp/content/20240830-mext_jidou01-1336275_3.pdf)：学校・設置者の調査と心理的配慮、SCの関与 |
| 問124 | [こども家庭庁・第19次検証報告](https://www.cfa.go.jp/sites/default/files/node/basic_page/field_ref_resources/c36a12d5-fb29-481d-861c-a7fea559909d/6735b11d/20230935_councils_shingikai_gyakutai_boushihogojirei_19-houkoku_13.pdf)：2024年4月施行の意見聴取等の義務 |
| 問129 | [厚労省掲載・公認心理師法](https://www.mhlw.go.jp/web/t_doc?dataId=80ab4905)：登録、秘密保持、連携、名称使用制限 |
| 問131 | [厚労省・ストレスチェックの実施方法](https://www.mhlw.go.jp/content/11201250/001266597.pdf)：研修修了の公認心理師・精神保健福祉士の実施者要件 |
| 問154 | [厚労省・テレワークガイドライン](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/shigoto/guideline.html)、[概要](https://www.mhlw.go.jp/content/11601000/001411840.pdf)：時間外メール抑制、労働時間管理と長時間労働防止 |

## 原文・公式正答・必要図の照合

固定コピーで指定どおり `python scripts/audit-shinrishi.py --round 9 --source-dir /tmp/shinrishi9` を実行し、正常終了。「154問の本文・選択肢・正答・選択数・ページが一致」となった。再生成監査JSONは一時コピー内にのみ出力した。原文監査は既存スクリプトの正規化（空白・制御文字・区切り線の除外、²と2の同値扱い）を用いており、全問題の原寸逐字目視照合とは区別する。sourceAnswerUrlも既存回帰テストで確認した。

今回は `/tmp/shinrishi9` にある公式PDFを使用し、新規ダウンロードは行っていない。3ファイルのSHA-256は初回報告の公式再取得PDFとすべて一致した。

| PDF | SHA-256 |
| --- | --- |
| 午前04_gokaku_happyo_09.pdf | `4d3ef6545528f2c867b744a3b836830bbf93c022aac7ca63e498246559ab49ed` |
| 午後05_gokaku_happyo_09pm.pdf | `733af9ca80cd80c8c91c649ad292f2f7c60e3f9b49c49ee59d1003dd940e12d5` |
| 正答03_gokaku_happyo_09.pdf | `a4b59a64d83c731aa5e735e619a58aa3b00de333554f9338bb662473ad1de926` |

初回の必要図証拠について、第9回の縮小コンタクトシート `/tmp/shinrishi-9-{am,pm}-{5,21,37}.png` 全6枚（午前・午後各p.5–52、計96ページ）を今回目視した。初回の詳細画像 `/tmp/shinrishi-review-pdfs/detail-9-18.png`（問27の区切り線）と `detail-9-27.png`（問46の数式・数値）も照合した。PDFを再解析し、問題冊子各56ページ、画像XObjectはいずれも0件であることも確認。必要な独立図表の欠落は認めず、全問hasImage=falseとの整合性を確認した。ベクトル描画の全件分類を今回新たに再実施したわけではなく、初回と同一PDFであること、初回証拠画像の再閲覧および文字層一致を合わせた判断である。

## 初回5指摘の対応確認

| 初回指摘 | 今回の確認・扱い |
| --- | --- |
| R1-E001 全肢解説未整備 | 第9回は全154問full、755肢の説明が揃い、単純な正答番号表示ではなく概念差・理由・事例対応が追加された。構造上は解消。内容は全件通読し、R2-C001・C002が残るため内容まで解消とはしない。第8回の整備状況は対象外 |
| R1-S002 番号シャッフル | filter.tsのshuffleChoices冒頭でshinrishiは元のQuestionを返す。問46–53・122–128の15問を含む全308候補の同一性テストが成功。元番号と表示番号が食い違う初回の経路は修正済み |
| R1-H003 未完成問の保留 | 全体保留を維持するという初回の修正選択肢に適合。公開配列・同期レジストリ・非同期ローダー・一覧から除外されるテストが成功。段階公開は行っていない。isPracticeReadyQuestionに全肢完成判定を新設したわけでも個別needsReviewを追加したわけでもなく、将来ゲートを外してよいという認定はしない |
| R1-L004 転載条件 | 台帳のURLはpolicy.html第2項へ具体化。許可取得記録未確認を理由に全308問保留と明記。ユーザーが認めた保留として維持。公開許可取得が完了したとはしないが、今回の保留管理の修正確認はPASS |
| R1-M005 台帳不一致 | 第8・9回の実施日と保存全308問を明記し、「第8回未収録」の誤記は解消。公開0はゲートとテストで確認。remainingWorkは許諾確認を掲げるが、第8回の内容完成や今回の内容指摘解消まで保証するものではない |

`validate-questions.ts` のofficial-summary例外はdenken3のみとなり、shinrishiの未公開を理由とする全肢解説免除は削除済み。`ExplanationCard.tsx` の汎用official-summary注意表示自体は残っているが、第9回は全問fullのため該当しない。これを削除漏れとは判定しない。

## テスト実績と未確認範囲

固定コピーで次の既存テストを実行した（buildは実施していない）。

```text
node node_modules/vitest/vitest.mjs run   __tests__/questions/shinrishi-staging.test.ts   __tests__/lib/exam-config-integrity.test.ts   __tests__/unit/exam-source-label.test.ts   __tests__/questions/qualification-expansion.test.ts
```

**結果：4ファイル、1,079テスト中1,078成功・1失敗。** 失敗は `shinrishi-staging.test.ts:52` の全308問全肢解説テストで、`shinrishi-2025-annual-am-001` の `official-summary` が `full` ではないため。編集中の第8回に由来するため本レビューのFAIL理由から除外する。全テスト成功とは記載しない。

このテストは第8回で中断するため、第9回の154問について別途Pythonでfull、選択肢キー完全一致、各問内の解説重複なし、全肢15文字超を全件確認しPASS。これは構造検査であり、上記の独立した全肢通読と区別している。テストログは `/tmp/shinrishi-review2-tests.log`。

未確認・対象外は、第8回の内容と全肢完成、全一次論文・全検査マニュアルの個別取得、全PDFページの原寸逐字照合、本番HTTP・ブラウザE2E・配信済みキャッシュ、将来の公開切替後の動作、全体typecheck・lint・validate・buildである。検査の具体的採点規則やマニュアルの全内容を実証したとはしない。一方、第9回154問755肢の専門的内容レビューそのものは実施済みであり、文献を全件個別取得しなかったことを未実施や一律保留に置き換えていない。

**残る件数：内容2件、今回の範囲の管理・コード修正指摘0件。別枠の既知の公開保留理由1件（事前許可記録未確認、対象308問）。再レビューFAIL、保留管理PASS、公開保留。**

## 固定ファイル識別情報

- `data/questions/shinrishi/2026-annual.json`：`54acb075eae24f6361e1e0c7be5b9fca837a4435c998002c313a3ff206015c75`
- `data/questions/shinrishi/index.ts`：`5672bb74441485bd21f8f7bc32aa04b20737edd8a35c1810da19d240fde344d4`
- `lib/questions/filter.ts`：`9e47d7c596f64fa2687b8474396d47779c62774dac7f21e7b2053e3daab0c072`
- `lib/qualifications/catalog.ts`：`b5914ee9f40a84f924f911ddf963d15ab4009be60b4918a1e279405bcc9314c4`
- `lib/questions/get-questions.ts`：`04394bb803bb409e4e508cad2782e112ea9e1452be2bc66ac2d074b54ea6b363`
- `scripts/validate-questions.ts`：`773f85d86f24d6e7572c17894746dc88b7b0b32b23391969d92efb0289131210`
- `scripts/audit-shinrishi.py`：`1f154139fbdf0350be3b122fa02e4d64abf22f1edf2613f9200dc1e50b9febba`
- `__tests__/questions/shinrishi-staging.test.ts`：`68536391768c8ed0b31c33ffe39fe96c60fafe7eb43543dccae45e16d3eeef1b`

## 全154問の確認台帳

「内容OK」は今回の専門的レビューで要修正指摘を認めなかったことを示し、あらゆる誤りの不存在や全一次資料取得を保証するものではない。全行で本文・全肢・公式正答照合はPASS、全肢を通読済み。③等の番号はJSONのア〜オと原典の①〜⑤を対応させたもの。公開は全行保留のままである。

| 問題ID | 通読肢 | 公式正答 | 原文・正答照合 | 内容結果 |
| --- | --- | --- | --- | --- |
| `shinrishi-2026-annual-am-001` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-002` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-003` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-004` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-005` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-006` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-007` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-008` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-009` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-010` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-011` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-012` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-013` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-014` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-015` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-016` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-017` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-018` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-019` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-020` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-021` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-022` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-023` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-024` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-025` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-026` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-027` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-028` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-029` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-030` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-031` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-032` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-033` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-034` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-035` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-036` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-037` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-038` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-039` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-040` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-041` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-042` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-043` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-044` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-045` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-046` | アイウエ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-047` | アイウエ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-048` | アイウエ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-049` | アイウエ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-050` | アイウエ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-051` | アイウエ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-052` | アイウエ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-053` | アイウエ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-054` | アイウエオ | 2・5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-055` | アイウエオ | 1・2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-056` | アイウエオ | 1・4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-057` | アイウエオ | 2・4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-058` | アイウエオ | 1・5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-059` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-060` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-061` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-062` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-063` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-064` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-065` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-066` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-067` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-068` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-069` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-070` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-071` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-072` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-073` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-074` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-075` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-076` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-am-077` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-078` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-079` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-080` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-081` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-082` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-083` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-084` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-085` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-086` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-087` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-088` | アイウエオ | 2 | PASS | ウ：R2-C002、他肢OK |
| `shinrishi-2026-annual-pm-089` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-090` | アイウエオ | 2 | PASS | ウ：R2-C001、他肢OK |
| `shinrishi-2026-annual-pm-091` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-092` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-093` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-094` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-095` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-096` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-097` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-098` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-099` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-100` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-101` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-102` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-103` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-104` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-105` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-106` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-107` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-108` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-109` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-110` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-111` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-112` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-113` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-114` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-115` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-116` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-117` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-118` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-119` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-120` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-121` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-122` | アイウエ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-123` | アイウエ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-124` | アイウエ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-125` | アイウエ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-126` | アイウエ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-127` | アイウエ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-128` | アイウエ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-129` | アイウエオ | 1・5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-130` | アイウエオ | 1・3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-131` | アイウエオ | 1・4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-132` | アイウエオ | 2・4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-133` | アイウエオ | 4・5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-134` | アイウエオ | 2・5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-135` | アイウエオ | 1・3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-136` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-137` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-138` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-139` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-140` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-141` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-142` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-143` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-144` | アイウエオ | 3 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-145` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-146` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-147` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-148` | アイウエオ | 4 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-149` | アイウエオ | 2 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-150` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-151` | アイウエオ | 1 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-152` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-153` | アイウエオ | 5 | PASS | 全肢OK |
| `shinrishi-2026-annual-pm-154` | アイウエオ | 3・5 | PASS | 全肢OK |
