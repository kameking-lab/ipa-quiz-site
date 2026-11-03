# 保健師112午前：未公開preparedの追加13問

既存 `../pilot.json` のQ2/Q8と6ファイルを保持し、Q9/12/15/20/22/25/29–35の13問60肢を別の未登録データとして準備する。合計は15問68肢のみ。全110問・二回分の完成を示さない。

`addition10.json` は先行preparedレビュー用10問payloadとバイト一致。`next3.json` は新3問の作者凍結候補とバイト一致。全13問のquestion objectは元作者稿を保持する。`evidence.json` は別担当盲検・一次根拠・Astra最終のexact receipt SHAを指す。一次資料の原PDF/画像/法律全文はこの追加に転載しない。

`gate.json` は公開・登録・route・live学習・root承認をすべてfalse、権利許諾・exact integration・実表示審査をnullとする。私有prepared収録PASSを公開許可へ拡張しない。法令の歴史版は対象条文のみの照合で、現在全文が同一という主張ではない。Q15試験後計画を出題時根拠へ露出しない。人口FAQの現ページと歴史時点を区別し、第三者パンフの転載許諾を推定しない。

検証：`node --test data/prepared-medical/hokenshi112/reviewed13/validate.test.mjs`

表示確認：`node data/prepared-medical/hokenshi112/reviewed13/render-preview.mjs <明示したローカルHTML出力先>`。このreview previewは全説明・Q25の14日表・独自計算例を表示する。publicディレクトリや公開routeへ追加しない。実際のブラウザ表示を別担当が確認し、exact commitへbindするまで実表示PASSはnullのまま。
