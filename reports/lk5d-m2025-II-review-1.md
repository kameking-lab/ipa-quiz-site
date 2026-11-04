**FAIL** — 開始時HEAD `b2ac99a4b9ba02f46def7b50c6503f6bbb9e2a9d`。修正が必要な点は2件です。

1. **問18：代替テキストの敷地奥行が誤り**
   [1013行](/C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/mokuzo-2025-II.ts:1013)の「13 m（2+8+3）」を **「14 m（2+1+8+3）」** に修正してください。原図のA点までの1 mが抜けています。正答8.75 mと道路制限9.50 mの計算は正しいです。

2. **問16：建蔽率加算を適用しない理由が不正確**
   [838行](/C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/mokuzo-2025-II.ts:838)の「木造なので」を **「設問で耐火建築物等・準耐火建築物等ではないと指定されているため」** に修正してください。緩和の判断条件は木造か否かではなく防火性能です。118.5 m²の計算は正しいです。[国交省資料](https://www.nilim.go.jp/lab/jbg/pdf/commitee/05_sankousiryou_02.pdf)

その他の確認結果：

- 全25本文・125選択肢・25公式正答は一致。125肢解説を確認し、上記以外の修正必須事項は検出なし。
- 8画像は原本切り出しと画素一致。構造化表2件も一致。
- 指定された計算・問20の3か月／懲役・問21・問23は整合。
- manifest／index／READMEは350/400問、次回は木造2025Ⅲ問1。全350問のフラグ維持、公開接続なし。
- verifier再実行のJSONは **PASS：本文350・選択肢1,750・公式正答400**。
- 既存テストログは29件・追加11件成功。型検査ログにエラー出力なし。

原本：:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/mk-2025-1st-gakka1_2.pdf" purpose="source"}
正答：:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/mk-2025-1st-gokakukijun.pdf" purpose="source"}

書込み・Gitコマンド実行・報告書作成は行っていません。
