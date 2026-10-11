# HOLD43問を除いた27問の既存証拠一覧

原稿・公式キー・公開gate・HOLD43問は変更していない。原本/正答欄は既存receiptと固定commitの照合結果を参照し、新しい医学監査・再生成はしていない。全27問とも5肢の説明本文は存在するが、本文の存在と全claimの検証を区別する。

Aは既存QAで5肢それぞれにsupported/verifiedが記録され、個別の追加原典要求がない候補。専門受入れ・独立公開査読は全問未了であり、Aも公開許可ではない。Bは旧要件の適用範囲を統合担当が判断する。Cは図の目視だけの根拠、説明全体の未確認、本文矛盾等を残す。

短縮IDの60は2025年、61は2026年。完全なcanonical問ID・原本SHA・公式URL・各肢状態・旧HOLD文は `remaining27-acceptance-evidence.json` の27行を参照。

## A: 追加原典なしで専門受入れ判断へ回せる6問

| 問ID | 原問/5肢/正答 | 全肢根拠の記録 | 図版 | 個別の未解消要件・受入れ範囲 |
| --- | --- | --- | --- | --- |
| `60AM82` | [原問](sources/2025-question-am-p40-66da8151dfa7.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 5/5 supported | 不要 | 年代順の5肢を州政府資料・国連資料で支持。個別の追加原典要求は記録なし。 |
| `60AM94` | [原問](sources/2025-question-am-p44-ff880dedf26e.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 5/5 supported | 不要 | 5肢を熱傷学会/皮膚科学会指針・原著で支持。成人20%と旧15%閾値を区別した有限修正済み。 |
| `60PM21` | [原問](sources/2025-question-pm-p21-bfa96e9e1be1.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 5/5 supported | 不要 | WHOのCBR構成要素一覧で5肢を支持。 |
| `60PM22` | [原問](sources/2025-question-pm-p21-bfa96e9e1be1.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 5/5 supported | 不要 | 厚労省の標準様式第1〜5表で5肢を支持。 |
| `60PM30` | [原問](sources/2025-question-pm-p24-fe674983eb45.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 5/5 supported | 不要 | 日本語版提供元の8下位尺度一覧で5肢を支持。原マニュアル全文の新規取得はしていない。 |
| `61PM26` | [原問](sources/2026-question-pm-p22-173b5987b6b0.png)・5肢一致 / [正答](sources/2026-answer-p01-81abb0786971.png)一致 | 5/5 算術確認 | [原図照合済](sources/2026-question-pm-p22-173b5987b6b0.png) | 原表30/40/70/60とLR+=0.75を5肢それぞれ再計算済み。肢2/3の否定を計算対象へ限定済み。 |

## B: 全5肢の資料はあるが旧要件の適用範囲判断が必要な2問

| 問ID | 原問/5肢/正答 | 全肢根拠の記録 | 図版 | 個別の未解消要件・受入れ範囲 |
| --- | --- | --- | --- | --- |
| `60PM33` | [原問](sources/2025-question-pm-p25-c41e32bcc177.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 5/5 supported | 不要 | 5肢は2012改訂の学会合同診断基準で支持。旧要件「最新の公式ガイドライン」の照合はこの証拠だけでは完了と数えない。統合担当が試験時点の2012基準で足りるか判断。 |
| `61AM88` | [原問](sources/2026-question-am-p46-5929fb3ec73d.png)・5肢一致 / [正答](sources/2026-answer-p01-81abb0786971.png)一致 | 5/5 supported | 不要 | 5肢はRCUK 2025のBLSで支持。旧要件が名指したJRCの一次資料は未照合。統合担当が独立したRCUK資料を受入れ範囲として認めるか判断。 |

## C: 既存証拠だけで全肢受入れを認定できない19問

| 問ID | 原問/5肢/正答 | 全肢根拠の記録 | 図版 | 個別の未解消要件・受入れ範囲 |
| --- | --- | --- | --- | --- |
| `60AM1` | [原問](sources/2025-question-am-p07-33e12bd69bee.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-am-p07-33e12bd69bee.png) | 側臥位への図形態修正は確認済み。Daniels/MMT手技と5肢の運動方向・筋作用の個別専門根拠は未記録。 |
| `60AM7` | [原問](sources/2025-question-am-p10-43024e093dc9.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-am-p10-43024e093dc9.png) | 図の肢位と外旋矢印は確認済み。選択肢各筋の伸長・作用の5肢専門根拠は未記録。 |
| `60AM9` | [原問](sources/2025-question-am-p12-63eeae559506.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-am-p12-63eeae559506.png) | 壁押しと肩甲骨内側縁の所見は確認済み。支配神経/他筋との鑑別を含む5肢専門根拠は未記録。 |
| `60PM2` | [原問](sources/2025-question-pm-p08-f4d3be4a16fa.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-supplement-pm-p05-6dae62d7fcd7.png) | 共通6歳症例・別冊No.1はPM3と一致。Perthes原著の補強はあるが他4疾患を含む5肢の誤答理由の個別確認は未記録。 |
| `60PM3` | [原問](sources/2025-question-pm-p08-f4d3be4a16fa.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-supplement-pm-p05-6dae62d7fcd7.png) | PM2の症例・別冊を継承。containment原著の補強はあるが保存/荷重/運動等の全5肢の治療理由の個別確認は未記録。 |
| `60PM5` | [原問](sources/2025-question-pm-p10-dea648059844.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-pm-p10-dea648059844.png) | 右股関節の内転矢印を確認済み。MMT段階・代償等を含む5肢の手技根拠は未記録。 |
| `60PM6` | [原問](sources/2025-question-pm-p11-435f55721443.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-pm-p11-435f55721443.png) | 原図の頭部回旋と上下肢位は確認済み。各反射の特徴・発達条件等の5肢根拠は未記録。 |
| `60PM7` | [原問](sources/2025-question-pm-p12-4744eddfe14a.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-pm-p12-4744eddfe14a.png) | 原図の肩肢位・抵抗方向は確認済み。各筋の作用と強化条件の5肢根拠は未記録。 |
| `60PM9` | [原問](sources/2025-question-pm-p13-833cd54d24b6.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-pm-p13-833cd54d24b6.png) | 原図の後方矢印と肢位は確認済み。各特殊テスト/靱帯の全5肢根拠は未記録。 |
| `60PM13` | [原問](sources/2025-question-pm-p16-affbf6547677.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-pm-p16-affbf6547677.png) | 頸部リング・支柱・パッドの原図形態は確認済み。各装具の名称/適応の全5肢根拠は未記録。 |
| `60PM15` | [原問](sources/2025-question-pm-p17-f62f46e08110.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-supplement-pm-p07-bb5e5caeccc3.png) | 別冊脳血管造影の所属と所見は確認済み。病変側を断定せず、各疾患の鑑別理由の5肢根拠は未記録。 |
| `60PM17` | [原問](sources/2025-question-pm-p19-b528ef3294ff.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-pm-p19-b528ef3294ff.png) | 学会の2ステップ手順と原図は確認済み。他の4検査の目的・手順を含む全5肢の個別根拠対応は未記録。 |
| `60PM20` | [原問](sources/2025-question-pm-p21-bfa96e9e1be1.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 2肢R-R計測、他は原図等 | [原図照合済](sources/2025-supplement-pm-p09-cd69d250e4e8.png) | 肢2/5は公式R-R計測で確認済み。肢1/4は原図所見の確認。肢3のLown III定義と総合解説の虚血推論は全肢専門資料の受入れ未了。 |
| `60PM44` | [原問](sources/2025-question-pm-p29-8b41de51a34a.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | 不要（誤cue確認済） | 隣接問題由来の誤図cueを確認し図不要とした。疾患と治療の5組合せは公式問題/正答だけでは説明の検証にならず個別専門資料の確認が未了。 |
| `60PM56` | [原問](sources/2025-question-pm-p34-555b7707c262.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-pm-p34-555b7707c262.png) | 原図の右手橈側の2腱と矢印は確認済み。他腱の走行・停止を含む全5肢の解剖根拠は未記録。 |
| `60PM71` | [原問](sources/2025-question-pm-p40-9edde25bc495.png)・5肢一致 / [正答](sources/2025-answer-p01-6cac1557105f.png)一致 | 原図/一部資料、5肢対応未記録 | [原図照合済](sources/2025-question-pm-p40-9edde25bc495.png) | 原図の体幹伸展は確認済み。各靱帯の張力方向を含む全5肢の解剖根拠は未記録。 |
| `61AM4` | [原問](sources/2026-question-am-p10-d59634645a40.png)・5肢一致 / [正答](sources/2026-answer-p01-81abb0786971.png)一致 | 5肢CORE/検査目的 | [原図照合済](sources/2026-question-am-p10-d59634645a40.png) | SCPと各検査目的は5肢で個別補強済み。ただしCORE/検査目的の照合であり、優先順位を含む本文全claimの受入れ証跡はない。共通症例はAM5と共有するがAM5のHOLD解除に依存しない。 |
| `61AM11` | [原問](sources/2026-question-am-p15-9a30cdfd723d.png)・5肢一致 / [正答](sources/2026-answer-p01-81abb0786971.png)一致 | 5肢CORE/限定修正 | [原図照合済](sources/2026-question-am-p15-9a30cdfd723d.png) | 肢1は気道確保の頭部回旋へ有限修正済みだが、総合解説には「頭部を正中か軽く屈曲」の旧断定が残る。総合解説と肢1の整合が未解消。家庭の睡眠姿勢へ一般化不可。 |
| `61PM35` | [原問](sources/2026-question-pm-p25-f1de004de9fd.png)・5肢一致 / [正答](sources/2026-answer-p01-81abb0786971.png)一致 | 原図/一部資料、5肢対応未記録 | 不要 | NCIのPDQで多因子性などの根拠はあるが、肢3は原問の「多くの場合」を本文の「常に単一とはいえない」で否定しており量化が一致しない。5肢の個別受入れ証跡もない。 |

## 全27問に共通する未解消要件

- G1: 専門受入れと独立公開査読のreceiptは全27問で未取得。Aも受入れ判断の候補であり公開許可ではない。
- G2: 旧HOLD台帳は全て保持。統合担当がcanonical ID/試験回/AMPM・公式PNG・追加一次資料のreceiptを対応づけて個別受入れを記録する。
- G3: 図あり18問はレビューbundle相対URL。出題に採用する場合のpublic配置と登録は今回行わない。
- G4: PR760は70問入りの候補bundle。AのIDだけを採用する判断は他の64問やHOLD43問の解除に連動させない。保存モデルreceiptは全て現状を保持する。

PM2/PM3の共通症例・別冊は両方で保全済み。AM4の共通症例はAM5の設問と同じだが、AM4の出典・原問・キーは単独で保全されている。これらの症例共有を理由にHOLD43問を一括解除しない。

検査: 27=70−43、A6+B2+C19、135肢存在、原本/キー/図の既存SHA一致、元候補JSON・既存HOLD/QA変更0、gate解除0。
