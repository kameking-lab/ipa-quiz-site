# 2級造園施工管理・令和7年度後期の第4ロット

2026-09-27に全国建設研修センターの[公式問題PDF](https://www.jctc.jp/wjctcp/wp-content/uploads/2025/11/20251117z_mondaia.pdf)と[公式正答PDF](https://www.jctc.jp/wjctcp/wp-content/uploads/2025/11/20251117z_seitou.pdf)を再照合した。PDF本体とSHA-256は`RELEASE.md`に記録済み。

- 今回追加: 問19・21・23・25・26。公式正答は順に1・1・4・4・4。
- 問題PDFのPDFページ8〜11を画像化し、本文と全20肢を目視照合した。読み仮名、改行、空白のみ整えた。
- 問20は木造建築物、問22は給水装置、問24はデミング・サークルの図を読ませる設問。図を正確に抽出・表示できるまで保留する。前ロットで保留した問9・16・17も同様。
- 解説は公式正答を基準に独自制作した。問21は[経済産業省の資格不要作業の説明](https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/1-3keibi.pdf)と[e-Govの電気工事士法施行令](https://laws.e-gov.go.jp/law/335CO0000000260/20230401_504CO0000000365)、問23・25・26は国土交通省の[公共工事約款](https://www.cgr.mlit.go.jp/chiki/kensei/kyoka/5/koukyou_yakkan.html)・[建設副産物の定義](https://www.mlit.go.jp/sogoseisaku/region/recycle/d01about/d0101/page_010201byproduct.htm)・[工期と共通費の説明](https://www.mlit.go.jp/gobuild/content/001733290.pdf)を確認した。
- 反映後は令和7年度後期40問中20問、未収録20問。令和8年度前期は40問中10問で、試験回を分けて表示する。

## 公開後の確認対象

- `/zoen2` に令和7年度後期20問、令和8年度前期10問と、それぞれの未収録数が表示される。
- `/zoen2/2025-late` に20問が並び、問9・16・17・20・22・24は並ばない。
- `/q/zoen2/2025-late/gakka/q19`、`q21`、`q23`、`q25`、`q26` がHTTP 200で問題・4肢・正答・各肢解説・公式出典を示す。
- 本文、メタ情報、構造化データにオーナー本人名や登録番号を含めない。

## 次の追加

問27以降を設問ごとに照合する。図表に依存する設問は図の再現・表示方法を確認するまで保留する。全40問を収録済みと表示しない。
