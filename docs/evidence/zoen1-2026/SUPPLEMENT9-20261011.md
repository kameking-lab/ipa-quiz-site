# 造園1 第一次2026 補充9

基準HEAD `2a1a18da35bff5d947409ff3ffd2f821c68ee54c`（PR702）。NEW B13/B14/B15/B16/B29、5原問・20肢理由・保存稿再利用0。公式正答3/4/3/3/1・4。2026 A29/B21=50/65、未収録15。2025原問404 HOLD65。requested model `gpt-6.1-sol`、実体receipt `null`。最新2回完備の主張なし。

既存問題JSON変更・削除0。原文・正答は機械投影。原問PDF8/9/17を実画像確認。B29は法令条件を問う設問で、共通工事の数量表は正誤判定に使用しない。原問の「本工事」は保持。

## 公式原問・正答

- `zoen1-2026-a.pdf` SHA256 `fd2af674b3049915a085ec0c1e5d0a2360549f7cfed0e3fea23be346b9e4f0da`。
- `zoen1-2026-b.pdf` SHA256 `f3b0df0c1a8cc7feeb2b659faa7854a0ff1bf41e01b365fe47127b671756a06d`。
- `zoen1-2026-answers.pdf` SHA256 `6faa5bee113cde6b5c4665ddcfcde223bae90a11083348c813e1f530f6d81a7d`。

## 時点別公式法令

e-Gov公式APIの2026年1月1日版と試験日9月6日版を保存。受検手引から法令基準日を推定しない。判定に用いる人数・重量・寸法・作業中止の条件は両時点で同じ。条文全体が同一とは主張しない。作業従事者への適用拡大等の差分は保持。

- [osh-act 347AC0000000057_20260101_507AC0000000033](https://laws.e-gov.go.jp/api/2/law_data/347AC0000000057?asof=2026-01-01) 保存 `osh-act-20260101.json` SHA256 `331b02d45249ec4b78b05b5b45e76fa5c67df1ba84fc71f000b4421f227f3b66`。
- [osh-act 347AC0000000057_20260401_507AC0000000033](https://laws.e-gov.go.jp/api/2/law_data/347AC0000000057?asof=2026-09-06) 保存 `osh-act-20260906.json` SHA256 `b765cc56374c110d56a7aa888fb63d0ef3d6c86917446e5590d1463cd0fa140c`。
- [osh-decree 347CO0000000318_20260101_507CO0000000361](https://laws.e-gov.go.jp/api/2/law_data/347CO0000000318?asof=2026-01-01) 保存 `osh-decree-20260101.json` SHA256 `da4d3e0c19552d54ebba18944005b5f9463b3f919809a711fd664fd5c336b9cc`。
- [osh-decree 347CO0000000318_20260401_507CO0000000361](https://laws.e-gov.go.jp/api/2/law_data/347CO0000000318?asof=2026-09-06) 保存 `osh-decree-20260906.json` SHA256 `9b0fa81d403a92b65b312970c79d4a3cee01f8bfeba09ebe84e1513c16fe8c27`。
- [osh-regulations 347M50002000032_20260101_507M60000100113](https://laws.e-gov.go.jp/api/2/law_data/347M50002000032?asof=2026-01-01) 保存 `osh-regulations-20260101.json` SHA256 `c5363832127f3a25b03086d7d010842de5948a16b83475e3fe656e77418fc5e9`。
- [osh-regulations 347M50002000032_20260801_508M60000100086](https://laws.e-gov.go.jp/api/2/law_data/347M50002000032?asof=2026-09-06) 保存 `osh-regulations-20260906.json` SHA256 `e0adca43ece12676e5cf6924d643f8f8156114663de13074aee396441b452bd5`。
- [crane-regulations 347M50002000034_20250401_507M60000100014](https://laws.e-gov.go.jp/api/2/law_data/347M50002000034?asof=2026-01-01) 保存 `crane-regulations-20260101.json` SHA256 `ea9ad263af0fbae809507920c6445a09c6778fca0cd2c4e4f2a40dab7fe29127`。
- [crane-regulations 347M50002000034_20260401_508M60000100003](https://laws.e-gov.go.jp/api/2/law_data/347M50002000034?asof=2026-09-06) 保存 `crane-regulations-20260906.json` SHA256 `03d16ec106bc805a6335bdfbd77bbcc837d75e1e54ae989a3499fde191ea2c54`。

該当条文を機械抽出した `SAFETY-LAW-EXCERPTS-20261011.json` を保存。B13は安衛則552/563条。B14は安衛法11～15条、施行令3～5/7条。B15は安衛法59/61条、施行令20条、安衛則36条9号/41条/別表第三。B16は安衛則152/153/156/158/159条。B29はクレーン則1条6号/70条の5/74条の3、施行令20条7号と安衛則別表第三。

B13(2)は物体落下防止の幅木10cm下限を判定し、人の墜落防止設備の15cm条件と混同しない。B14(2)の30人例外は特定の仕事に限定。B15は免許・技能講習不要と特別教育不要を区別。B29は強風の速度を推測せず、危険が予想される場合の中止義務を説明。

focused audit/validator/Vitest/typecheck/lint。local full buildなし、必須CI build・独立review・mergeはroot担当。
