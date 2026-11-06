# W2 自動車整備5科目 前年度回の追加（2026-11-06）

## 対象回と根拠
- 過去問一覧: https://www.jaspa.or.jp/mechanic/past/ （2024/2nd.html・2025/1st.html で各科目のPDFを確認）
- 令和6年度第2回（2025-03-23実施）
  - 一級小型自動車（筆記） https://www.jaspa.or.jp/Portals/0/resources/jaspahp/user/mechanic/past/2024/20250323_1k.pdf （50問）
  - 二級自動車シャシ https://www.jaspa.or.jp/Portals/0/resources/jaspahp/user/mechanic/past/2024/20250323_2c.pdf （30問）
  - 三級２輪自動車 https://www.jaspa.or.jp/Portals/0/resources/jaspahp/user/mechanic/past/2024/20250323_3n.pdf （30問）
  - 自動車電気装置 https://www.jaspa.or.jp/Portals/0/resources/jaspahp/user/mechanic/past/2024/20250323_el.pdf （40問）
  - 正答 https://www.jaspa.or.jp/Portals/0/resources/jaspahp/user/mechanic/past/2024/20250323_kai.pdf
- 令和7年度第1回（2025-10-05実施）
  - 二級２輪自動車 https://www.jaspa.or.jp/Portals/0/resources/jaspahp/user/mechanic/past/2025/20251005_2n.pdf （40問）
  - 正答 https://www.jaspa.or.jp/Portals/0/resources/jaspahp/user/mechanic/past/2025/20251005_kai.pdf
- SHA256・取得日時は `data/qualification-staging/automotive/prior-sittings/source-manifest.json`。通常のHTTP取得（ログイン・CAPTCHAなし）。
- 一級小型は 20250323_1k が筆記、20250511_1k が口述（一覧ページの表記で確認）。筆記のみ収録。

## 追加問数
190問（一級小型50・二級シャシ30・三級２輪30・電装40・二級２輪40）。全問に公式正答、全4肢の独自解説、出典URL（問題PDF＋ページ、正答PDF）。
図が必要・図を参照する問は原問題ページを webp（180dpi・グレースケール、36枚、計約4.7MB）で併載し hasImage を付けた。問題文・選択肢はすべてテキスト。

## 実装
- `data/questions/automotive/prior-sittings.json`・`prior-assets.json` を追加し、`index.ts` で既存608問の後ろに連結。`qualifications.json` の件数を更新。
- 既存の回収台帳（lq1b/lq1c）は変更していない。`__tests__/automotive-release.test.ts` は総数の期待値のみ +190、新規 `__tests__/automotive-prior-sittings.test.ts`。

## 除外・未解決
- 除外なし。
- 共有レジストリ（yearRange、回ラベル、pool-server のID正規表現、SEO説明・catalog文言）は `reports/jidosha-w2-registry.md` の差分を親が反映する必要あり。未反映のあいだ、令和6年度第2回の回ラベルは汎用表示になり、IDからの直接検索は横断フォールバックで解決する。
- 権利文言: オーナー決定 2026-11-04 に従い停止条件にしていない。
