# 第75回 計量士・独立レビュー2回目の指摘への対応

確認日：2026-11-03。**指摘4件を4問・6フィールドで修正。正答は200問すべて変更なし。管理問9はレコード全体がHEADと同一。** 問題データ・証跡・レポートだけを変更し、表示コード、公開制御、第76回は変更していない。コミット・pushなし。

| 対象 | 修正 |
| --- | --- |
| 計質問7・選択肢4 | 公式PDF第8ページを432 dpiで描画し、「非接地型がある」を確認。重複した「型」と総合解説の誤った原文保持注記を削除。正答1を維持。 |
| 法規問8 | 定期検査主体を知事又は特定市町村の長と明示。計量士の事前業務届と、法25条1・2項による使用者の検査後の届出を、主体・提出先・時期で分けて説明。総合解説と選択肢3の解説を修正。正答3を維持。 |
| 環化問18・alt | 「単位格子3個分にあたる正六角柱」に訂正。正六角柱全体と、その1/3である単位格子を区別。 |
| 環化問13・alt | 原図どおり、置換基を下付きR₁～R₄から上付きR¹～R⁴へ訂正。 |

第1回の[対応報告](cloud-keiryoshi-r75-round1-resolution.md)と[第75回収録報告](cloud-keiryoshi-latest2.md)にも残っていた、計質問7の原本を「非接地型型」とする誤認を訂正した。第1回の式確認記録・生成スクリプトの同じ所見も訂正し、旧選択肢対応表には修正前の履歴であることを明記した。現在データの再検査には今回のスクリプトを用いる。

432 dpiの確認画像：[計質問7](../docs/evidence/keiryoshi-75/round2-resolution/keishitsu-q7-432dpi.png)、[環化問13](../docs/evidence/keiryoshi-75/round2-resolution/kanka-q13-432dpi.png)、[環化問18](../docs/evidence/keiryoshi-75/round2-resolution/kanka-q18-432dpi.png)。出典、ページ、描画座標、ハッシュは[描画記録](../docs/evidence/keiryoshi-75/round2-resolution/focused-visual-checks.json)に保存。

## 全数点検

- **200問・1,000肢：** 公式PDFの問題ページ200枚すべてを300 dpiで再描画し、日本語OCRと現行本文・全選択肢の機械差分を作成。[200問の差分](../docs/evidence/keiryoshi-75/round2-resolution/ocr-transcription-diffs.json)、[描画・OCR結果](../docs/evidence/keiryoshi-75/round2-resolution/render-ocr.json)に記録した。本文200・選択肢1,000・総合解説200・選択肢解説1,000の計2,400フィールドについて重複文字と原文保持注記を走査。重複候補のある80フィールドと、修正後に残る実質的な原文保持注記1フィールド（一基問20の大文字添字L/S）を点検した。追加修正なし。[字句点検](../docs/evidence/keiryoshi-75/round2-resolution/lexical-audit.json)。
- **脱字候補：** 環物問21・25の「ものする」は原本描画にも存在し、収録時の脱字ではないため変更していない。一基問20の添字L/Sの保持注記は原図と一致した。[原本表記の判定記録](../docs/evidence/keiryoshi-75/round2-resolution/source-typo-dispositions.json)。OCRには誤認・数式や表の読順崩れがあるため、一致率を意味の正確さの証明には用いていない。
- **55図・全alt：** 55枚を1枚ずつaltと対置して、単位格子、上下付き、軸、表見出し、記号、配線・図形を確認。さらに各図を原PDFから再描画し、既存の切出し画像との全RGB画素一致を55/55件で確認した。画像なし145問に不要なalt配列はない。修正は環化の2件。[55図の点検記録](../docs/evidence/keiryoshi-75/round2-resolution/image-alt-audit.json)。
- **法令：** 全1,200解説フィールドから「届出」「届け」「指定」「検査」「登録」「認定」「権限」「報告」「申請」「知事」「市町村長」「大臣」等を含む122フィールドを抽出。うち法令・告示に関係する100フィールドを、保存済み2024-12-15時点のe-Gov条文・一次資料に対応させ、主体・手続・時期を再確認。残る22フィールドは計算条件やJIS分析法等であり、法令上の手続ではない。法規問8以外の追加修正なし。[全候補と条文・所見](../docs/evidence/keiryoshi-75/round2-resolution/legal-statement-audit.json)。

法規問8では、法19条の定期検査主体、法25条1・2項の使用者による実施期日までの検査後届、自治体要綱等による計量士の事前業務届を分離した。[千葉市要綱16・17条](https://www.city.chiba.jp/shimin/seikatsubunka/shohi/documents/5keiryouteiki.pdf)もweb経由で確認し、[取得記録](../docs/evidence/keiryoshi-75/round2-resolution/chiba-guideline-web.json)を保存した（ローカルPDF取得はプロキシ403）。施行規則96条の計量士の年度報告とも区別した。法規問19については、条文上の大臣への廃止届と、規則49条の10の実際の提出経路を証跡で区別している。

e-Gov本文が委任するJIS全文については、従来の6問の確認範囲を超えて全文照合済みとは扱わない。今回の記録は修正担当の点検であり、独立レビュー承認や公開承認ではない。

再実行用：[描画・OCR](../docs/evidence/keiryoshi-75/round2-resolution/render-ocr.py)、[全数検査・転記証跡更新](../docs/evidence/keiryoshi-75/round2-resolution/audit.py)。集計と不変検査は[coverage.json](../docs/evidence/keiryoshi-75/round2-resolution/coverage.json)、変更箇所は[changes.json](../docs/evidence/keiryoshi-75/round2-resolution/changes.json)。第76回の保護対象163ファイルのSHA256一致、2025年問題データ8ファイルのHEADとのバイト一致、staging・needsReviewの維持を確認した。

## 指定コマンド

| コマンド | 結果 |
| --- | --- |
| `pnpm validate:questions` | 終了0。27,044問、失敗0、既存警告17,255件。 |
| `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` | 終了0。 |
| `npx vitest run __tests__/keiryoshi-staging.test.ts __tests__/seo` | 終了0。111ファイル・599テスト成功。 |
| `python3 scripts/verify-keiryoshi-source.py` | 終了0。公式PDF・正答・原問200問・1,000肢・55図及び転記証跡を検証。 |

[検証結果とログ](../docs/evidence/keiryoshi-75/round2-resolution/checks.json)。
