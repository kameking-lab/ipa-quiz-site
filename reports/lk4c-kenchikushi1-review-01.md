# LK4C 独立レビュー 01：2025年法規30問・構造30問

指定コマンド：`C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only`（別プロセス）。指示はUTF-8ファイルを直接読み込ませた。各レビューは読み取り専用で、対象ファイルへの編集は親プロセスが行った。

## 初回：法規

**FAIL — 必須修正4件。** 2025年法規30問・全120肢をレビューしました。

対象：[2025-houki.ts](C:/Users/kanet/20260522/wt-kenchikushi1/data/qualification-staging/kenchikushi1/2025-houki.ts)

| 箇所 | 必須修正 |
|---|---|
| No.3・肢1解説（150行） | 「2025年4月施行」は誤り。計画通知の指定確認検査機関への開放は**2024年11月1日施行**。4月例外による制度と説明しない。[行政資料](https://www.pref.tokushima.lg.jp/ippannokata/kurashi/kenchiku/2009082401277/) |
| No.6・肢1／総合解説（354・356行） | 5階以上の売場に通ずる直通階段は、**その1以上**を特別避難階段とする。すべて必要と読める現解説を修正。すべて必要なのは15階以上。[施行令122条3項](https://laws.e-gov.go.jp/law/325CO0000000338/20230401_504CO0000000351) |
| No.12・肢4／総合解説（690・695行） | 「短期は長期の値の1.5倍」は鉄筋の表に適用できない。径32mmの異形鉄筋の短期許容圧縮応力度は**F**。長期は `min(F/1.5,195)` N/mm²で、単純な1.5倍では一致しない。[施行令90条・表二](https://laws.e-gov.go.jp/document?lawid=325CO0000000338_20250401_506CO0000000001) |
| No.19・肢4原文（1083・1091行） | 原図は「建築協定区域内の**土地で借地権**の目的…」。収録の「土地に借地権」を修正。`choices` と `originalContent.choices` の両方が対象。誤肢の内容自体は維持する。 |

指定された計算も独立に確認しました。

- **No.16：294.5m²**。道路後退1mを除き、`5×19×0.7＋15×19×0.8＝294.5`。追記された数値式は一致。
- **No.17：31.25m**。南道路斜線 `(9＋14＋2)×1.25＝31.25`、東隣地斜線 `20＋(5＋4)×1.25＝31.25`、北隣地斜線 `20＋(6＋4)×1.25＝32.5`。西道路側は後退後の反対側境界から `9＋15＋2＝26m` で適用距離25m外。この除外理由も解説に追記すると導出が完結します。

公式正答30件、No.5の全表セル、分数・単位、No.16・17の図とラベルを照合しました。図表の欠落・切れは認めません。法令基準日と4月1日例外の記録、全問 `publicAllowed=false`、画像のステージング配置、公開用空配列も確認しました。

原本：:codex-file-citation{path="C:/Users/kanet/20260522/wt-kenchikushi1/.cache/lk4/2025-gakka3.pdf" purpose="source"}
正答：:codex-file-citation{path="C:/Users/kanet/20260522/wt-kenchikushi1/.cache/lk4/2025-gokakukijun.pdf" purpose="source"}

ファイル変更なし。統合・テストのレビューは今回の判定に含めていません。

## 初回：構造

**FAIL — 必須修正が5項目あります。**

全30問・全120肢解説、公式PDFの2～17ページ、原図6点・alt文、No.2の表、公式正答を照合しました。

1. **No.4・肢ウ：柱軸力比が逆**
   [243・247行付近](/C:/Users/kanet/20260522/wt-kenchikushi1/data/qualification-staging/kenchikushi1/2025-kozo.ts:243)の「C：D＝7：3」は **3：7**。
   支点鉛直反力は±21P/4、筋かい鉛直分力は3P。Cは引張9P/4、Dは圧縮21P/4です。総合解説と肢別解説を修正してください。

2. **No.6・肢イ：座屈長さの説明が誤り**
   [363・366行付近](/C:/Users/kanet/20260522/wt-kenchikushi1/data/qualification-staging/kenchikushi1/2025-kozo.ts:363)を、`L_A＝2h、L_B≒0.699×2h、L_C＝2h`に修正。`Pcr＝π²EI/L²`から`P_A＝P_C＜P_B`と導出できます。現状の「Aはh」「Bは…h、ではなく」は不正確です。

3. **No.14・肢イ：公式訂正未反映**
   [787・795行付近](/C:/Users/kanet/20260522/wt-kenchikushi1/data/qualification-staging/kenchikushi1/2025-kozo.ts:787)の「柱部材の」を削除。公式PDFの訂正後表示は「…応力などに応じて構造特性係数D_sを算出する」です。`choices`と`originalContent.choices`双方を修正してください。

4. **No.25・肢ウ：添字欠落**
   [1371・1379行付近](/C:/Users/kanet/20260522/wt-kenchikushi1/data/qualification-staging/kenchikushi1/2025-kozo.ts:1371)の構造特性係数`D`を、原文どおり **`D_s`** に修正。両フィールドそれぞれ2箇所あります。

5. **原図3点が切れている**
   - No.2：梁B下の寸法線・`l＋l`が欠落。
   - No.5：左右の幅`l`、各層高さ`l`が欠落し、下端支点も切れています。
   - No.6：C右側の高さ`2h`が切れています。

   原図全体を含む範囲で再切出しが必要です。alt文に寸法があっても、原図の欠落は補えません。

確認済み事項：公式正答は30問すべて一致。全問`publicAllowed=false`・`needsReview=true`。No.2の表の値も一致。No.1～6を独立計算し、上記以外の計算結果に相違なし。残る解説にも追加の必須修正は見つかりませんでした。

原文・訂正・図の根拠は[JAEIC公式問題PDF](https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf)です。ファイル変更、build、commit、push、deployは行っていません。

## 修正後の再レビュー

**法規・構造の再レビューはPASS。全体統合ゲートは未通過です。**

| 対象 | 判定 | 確認範囲 |
|---|---|---|
| 2025年法規 | **PASS** | 初回30問・120肢の監査と今回の全原文・解説再読を合算。指摘4件、No.16・17の計算、図表3点を確認 |
| 2025年構造 | **PASS** | 同30問・120肢。軸力比3:7、座屈長さ、No.14訂正、No.25の両添字、再切出しを含む図6点を確認 |
| 250問のデータ統合・非公開境界 | **PASS** | 両年125問、5科目の連番、公式最終正答との独立照合、全1,000肢解説、出典・基準日・注意事項を確認 |
| 2025年施工 | **未合格** | [結果ファイル](/C:/Users/kanet/20260522/wt-kenchikushi1/.cache/lk4c-review-sekou-result.md)は依然FAIL。No.13・20の修正反映は確認したが、再レビューPASSの記録待ち |

法規No.3の施行日修正は[徳島県の行政資料](https://www.pref.tokushima.lg.jp/ippannokata/kurashi/kenchiku/2009082401277/)とも一致します。今回、法規・構造に追加の必須修正は見つかりませんでした。

全候補の `publicAllowed=false`・`needsReview=true`、全科目の人的確認0、`publicationGo=false`・`ingestionBlocked=false`を確認。公開レジストリ・一覧・ナビゲーション・ローダー・演習への流出も認めません。

検証ログは関連66テスト成功、全体26,694問／対象250問ともエラー0。両バリデーターがステージング実体を読むことも確認しました。**typecheckは診断出力なしですが、ログだけでは終了コード0を確認できません。**

残条件は、施工再レビューのPASS記録とtypecheck正常終了の確認です。ファイル変更・build・commit・push・PR・deployは行っていません。

注：法規・構造再レビューが挙げた残条件（施工PASS記録とtypecheck正常終了）の最終確認はレビュー03に分離する。原本PDF、指示、過程ログは.cacheに保存し、コミットに含めない。
