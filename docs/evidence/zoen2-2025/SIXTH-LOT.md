# 2級造園施工管理・令和7年度後期の第6ロット

2026-09-27に全国建設研修センターの[公式問題PDF](https://www.jctc.jp/wjctcp/wp-content/uploads/2025/11/20251117z_mondaia.pdf)と[公式正答PDF](https://www.jctc.jp/wjctcp/wp-content/uploads/2025/11/20251117z_seitou.pdf)を再照合した。PDF本体とSHA-256は`RELEASE.md`に記録済み。

- 今回追加: 問35・36。公式正答は順に1・2。
- 問題PDFのPDFページ14〜15を画像化し、本文と全8肢を目視照合した。読み仮名、改行、空白のみ整えた。
- 問35の解説は厚生労働省の[労働契約](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/keiyaku/index.html)と[労働基準法](https://www.mhlw.go.jp/web/t_doc?dataId=73022000)、問36は[安全衛生教育](https://anzeninfo.mhlw.go.jp/yougo/yougo68_1.html)と[衛生管理者・健康診断・ストレスチェック](https://www.startup-roudou.mhlw.go.jp/study/jigyonushi_kajuroudou.html)で事実を確認した。解説は公式正答を基準に独自制作した。
- 問37〜40は共通の工事数量表・条件を読ませる設問で、複数正答も含む。表を正確に抽出・表示できるまで保留する。問9・16・17・20・22・24・27・28・29も図表の再現待ち。
- 反映後は令和7年度後期40問中27問、未収録13問。令和8年度前期は40問中10問で、試験回を分けて表示する。

## 公開後の確認対象

- `/zoen2` に令和7年度後期27問、令和8年度前期10問と、それぞれの未収録数が表示される。
- `/zoen2/2025-late` に27問が並び、図表依存の問9・16・17・20・22・24・27・28・29・37〜40は並ばない。
- `/q/zoen2/2025-late/gakka/q35`と`q36`がHTTP 200で問題・4肢・正答・各肢解説・公式出典を示す。
- 本文、メタ情報、構造化データにオーナー本人名や登録番号を含めない。

## 次の追加

この試験回の未収録13問はすべて図表依存。正確な図表の再現・表示方法を確認し、設問ごとに照合してから追加する。全40問を収録済みと表示しない。
