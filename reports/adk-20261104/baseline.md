# ADK 調査基点

作業ブランチ `release/batch1-20261105`、INT1B 完了コミット `cc892a8f4` の上で開始。公開・AI 呼び出しの変更は禁止。本番の取得日時は `production-http.json` に記録。

## 一次資料

- [AdSense プログラム ポリシー](https://support.google.com/adsense/answer/48182?hl=ja): 広告の配置・操作・サイトの方針。
- [広告表示の準備が完了していない場合](https://support.google.com/adsense/answer/12176698?hl=ja): 所有権確認、サイト到達、独自性・利便性、再審査の手順。
- [AdSense アカウントが承認されませんでした](https://support.google.com/adsense/answer/81904?hl=ja): 内容不足、質、サイト操作性。全ページが審査対象。
- [Google パブリッシャー向けポリシー](https://support.google.com/publisherpolicies/answer/10502938?hl=ja): 有用性の低い画面、作成中、ナビゲーション専用画面、価値を追加しない複製を広告対象にしない。
- [Google 検索のスパムポリシー](https://developers.google.com/search/docs/essentials/spam-policies?hl=ja): 独自の価値を欠く大量生成。AI 利用そのものを一律禁止する規則ではなく、検索と AdSense の判断は別。
- [サイトを AdSense にリンクする](https://support.google.com/adsense/answer/7584263?hl=ja): 広告スクリプト以外に ads.txt・メタタグでも所有権を確認できる。
- [必須コンテンツ](https://support.google.com/adsense/answer/1348695?hl=ja): 第三者広告・Google 広告 Cookie・過去の閲覧に基づく配信・無効化方法の説明。

2026-11-04 に公式本文を閲覧。拒否メールは一般的な準備未完了の通知のみ。3サイトの不承認日が異なる事実から同じ理由・アカウント全体の障害とは断定できない。9/19 の tsugino-shikaku の「有用性の低いコンテンツ」はそのサイトの過去の記録で、kakomon-ai の10/25の確定理由ではない。

## 既存対策と未統合案

`docs/adsense-status-20260919.md`、`reports/revenue-2026-09-09/adsense-content-end.md`、`reports/adsense-quality-20261011/README.md`、`feat/adsense-quality-20261103` の3コミットと同ブランチの `docs/adsense-quality-20261103.md` を確認。

現 HEAD では独自の例題解説付き13記事と旧13記事の301、静的問題本文・開いた解説・公式出典、問題の品質除外と同一原問の canonical 統合、運営ハンドルと問い合わせ、広告 Cookie の説明がある。資格ハブ広告は撤去済み。記事の広告審査記録は空で広告コンポーネントは起動しない。所有権のメタタグと ads.txt は存在する。9/19にはCSPの広告ホスト許可を修正済み。

11/3ブランチは未統合。その noindex 候補169件は当時の在庫であり、現在の共通問題レジストリでは単独1問の分野一覧が287件ある。同ブランチの独自論述・採点ローダー等の変更はAI経路に影響するため今回まとめて取り込まない。原文のみの薄いページの判定に、説明の文字数だけを使わない。短い要約でも選択肢別理由・記述別解説が付く例がある（公認会計士など）。

## 実測の解釈

`production-http.json`: 222 URL の限定取得。HTTP 200が219、404が3（`/sources`・`/exams` は存在を仮定した探索、残りは意図的な不存在確認。抽出した内部リンクの404ではない）。リダイレクト後の状態を記録するため、元URLの転送コードは別途検証する。Googlebot・Mediapartners-Google のUAでもトップ・robots・問題の6取得は200。実際のGoogle送信元IPや審査時点の可用性を証明しない。

ads.txt は `google.com, pub-8751260838396451, DIRECT, f08c47fec0942fa0`。robots は `*` で公開ページを許可し、Googlebot・Mediapartners-Google の個別拒否なし。Google以外の3 botに対する拒否は別グループ。主要ページの本文・独自解説はHTTP本文にあり、広告スクリプトはサンプル内0。所有権メタタグは存在。一般公開の取得にログイン・同意操作は不要。

検索フォームや1問のみの分野一覧は学習には有用だが、単独問題や資格ハブと比べて検索入口として独自の情報が少ない。今回の編集方針で noindex,follow と XML サイトマップ除外を一致させる。閲覧・問題数・学習導線は維持する。noindex は AdSense の審査対象から隠す手段ではない。
