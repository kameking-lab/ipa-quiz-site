# 造園1級 2026第一次 追加6原問 / 24肢理由

対象は A36、B2・B7・B11・B12・B28。前バッチ A21/A24/B5/B6/B8 と重複せず、先行JSONを変更しない。保存説明稿の再利用0、新規6原問・24理由。モデル希望は gpt-6.1-sol、実体receiptは null（未検証）。この資料は公開完了証跡ではない。

原問・公式正答は既存 `docs/evidence/zoen1-2026/input` のハッシュ固定済みPDF。A36はPDF16頁、B2は3頁、B7は6頁、B11/B12は8頁、B28は14頁の共通条件と16頁の設問を画像で照合した。公式正答は順に 2 / 4 / 4 / 3 / 2 / 1・2・4。図A36はPDF16頁の `Rect(105,435,465,602)` を2倍で切り出した。矢印・日数・2本のダミーは原図のまま。画像SHA256: `da1024dc553391df8845a4517dd6d57c95bec8e4be311de7d438655d7feb0834`。

一次技術根拠は無料原典を通常取得し、保存PDFの該当本文を固定した。法律時点を必要とする新問は含まない。一般の掲載許諾の再探索は行っていない。

| 原問 | 原典と固定箇所 | 判定根拠 |
| --- | --- | --- |
| A36 | Penn State大学 GEOG871、Task Sequencing and Network Diagrams https://courses.ems.psu.edu/geog871/book/export/html/1745 | 全経路を再計算した最大が工期。短縮前11日、短縮後9日 |
| B2 | 林野庁 土工歩掛参考資料 https://www.rinya.maff.go.jp/j/sekou/gijutu/attach/pdf/bugakarisankou-58.pdf PDF8頁 | ダンプの時間当たり量 Vt=60/Cm×q×E。162m³/日、切上げ10日。従前の一次根拠HOLDを解消 |
| B7 | 新潟県都市緑花センター https://www.greenery-niigata.or.jp/center/documents/manual01.pdf PDF30頁 表4.1/4.2、ダイトウ製造者説明書 https://www.daitoutg.co.jp/images/dlmanual/tousui.pdf PDF10頁 | S≤1.0が10cm連続、最終減水能≤10mm/hrは不良 |
| B11 | 千葉県品質管理手引 https://www.pref.chiba.lg.jp/kouchi/seibi-sekisan/documents/2528sekoukanritebiki.pdf PDF1〜3頁、NIST https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc32.htm WECO/Trend Rules | 品質目標、ヒストグラムと規格、処置しやすい品質特性、管理限界内でも非ランダムな並びは異常を示し得る |
| B12 | 地盤工学会 https://www.jiban.or.jp/file/file/jgs1521_201109.pdf PDF1頁、国交省 https://www.mlit.go.jp/common/001286199.pdf PDF30頁、建材試験センター https://www.jtccm.or.jp/sites/default/files/2024-05/kisochishiki_vol1-13.pdf PDF18頁（印刷51頁）、国交省北海道 https://www.hkd.mlit.go.jp/ky/jg/gijyutu/slo5pa000000kv6k-att/slo5pa000000kvby.pdf 舗装出来形、国交省秋田 https://www.thr.mlit.go.jp/akita/branch_office/honjoukantokukansitu/newkantokukanHP/kakotopics/topics/nisime-highschool.html | 支持特性/CBR支持力/スランプのコンシステンシー/コア厚さとプロフィル平坦性を分離 |
| B28 | 国交省監修・日本緑化センター https://www.jpgreen.or.jp/book/books/koukyouyou_2.pdf PDF5頁（印刷13頁）とPDF12頁（印刷20頁） | 枝張は長短平均。3本立指定は太い順3本かつ所定高さ70％以上を対象とし、幹周の合計×0.7。4本目1.9mは対象外、0.154mで合格 |

公式カバー65問に対し統合予定35問（A23/B12）。2025第一次65問は原問公式旧URL A/B が実404、再試行・別資格化なしで原問不足HOLD。2回完備とは表示しない。2026の残30問は次の制作対象。

PDF固定SHA256（実ファイルの通常取得、全文再監査ではなく該当項目照合）:
- `chiba-quality.pdf`: `45a6680368ce5076fe4184f06d6fc9041e7ca82e01ad6b443793efd551d3cdb6`
- `daitou-water.pdf`: `c063ce28130ed0b6baf64ed771b57483cbc7dfd32cbc1c0399ad634bcd68bee2`
- `hkd-dekigata.pdf`: `76e09524b63baccea0f316f70f51b3aad9fcbf67a56c2f2c0921366fa1d49558`
- `jgs-plate.pdf`: `18a5313c1dbf0e814c71cc7142154e34c926d6c19ed052d7c355f7272c022e8c`
- `jtccm-slump.pdf`: `e7d17d2947a508d842c703ae763e741ddc17902b2de30cf1bb88fd26639c80b3`
- `koukyouyou_2.pdf`: `885bfd5ece3d79cd4881af319014d3061c0219e4eeddacb194154f09807fd683`
- `mlit-cbr.pdf`: `359b434585c87d1d49c6ac9e19b2b62b04a6f1bf8d750df3a291afdcfc080bd3`
- `mlit-pavement.pdf`: `d0d5abca31f04b8180a730cfbc8a066d42017a89d00637e9ed37d39231d7d6ac`
- `niigata-soil.pdf`: `45f0c2a2e07d4cc924957513b22db1747eeb5b3309773d7dce4ef59202aa373d`
- `rinya-bugakarisankou-58.pdf`: `32c7fb9f31ece28be6e7831cb4ad8ebde7296c0050827c71c5ecabe738d7cd92`
