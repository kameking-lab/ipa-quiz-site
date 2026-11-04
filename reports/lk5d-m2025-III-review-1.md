**FAIL — 修正必須の不備が4件あります。**

1. **問14：吊束の軸力が誤り**  
   [総合解説・選択肢ウ](/C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/mokuzo-2025-III.ts:661)の「圧縮力」は、**軸力0**に修正してください。吊束下端には鉛直外力がなく、接続する陸梁は水平なので、節点の鉛直方向の釣合いから0です。独立計算でも左右吊束0、真束は引張を確認。公式正答3は変更不要です。

2. **問19：訂正した荷重伝達順序にも逆転が残存**  
   [選択肢イの解説](/C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/mokuzo-2025-III.ts:917)は、**天井板→野縁→野縁受→吊木→吊木受→梁**に修正してください。「吊木受→吊木」が逆です。[国交省標準仕様書・表10.9.3](https://www.mlit.go.jp/gobuild/content/001888858.pdf)でも吊木上部を吊木受に取り付けます。出題文と公式正答2は保持してください。

3. **問12：代替テキストの壁数が不一致**  
   [imageAltTexts](/C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/mokuzo-2025-III.ts:583)の「下階に左右2壁」は、**下階は左側2壁＋右側1壁の計3壁**に修正してください。画像内のA～E、全選択肢、下端「土台」は欠けていません。

4. **問20：図の切り出し不足**  
   [図](/C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/assets/mokuzo-2025-III-q20.png)は右端「繊維方向」の末尾と立方体上端が切れています。原本11ページから上・右に余白を確保して再切り出ししてください。

全25本文・125選択肢・25正答は原本と一致し、125解説・7図を確認しました。問7の断面係数と右側寸法、問8の大小関係、問9の23m、問11のC＝0、問12のE最大は確認済みです。問21の強度順序は[FFPRI 2018・表35／36](https://www.ffpri.go.jp/pubs/bulletin/445/documents/445-1.pdf)、問23のパネル区別は[国交省資料](https://www.mlit.go.jp/pubcom/01/kekka/pubcomk40_.html)と整合しています。

管理情報は375/400、次回mokuzo2025IV問1、`needsReview=true`／`publicAllowed=false`で整合。公開側への接続は検出されませんでした。指定ログは29テスト成功、型チェックのエラー記載なし。今回は再実行せず、書込み・Git操作・レポート作成も行っていません。

照合原本：  
:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/mk-2025-1st-gakka3_4.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/mk-2025-1st-gokakukijun.pdf" purpose="source"}