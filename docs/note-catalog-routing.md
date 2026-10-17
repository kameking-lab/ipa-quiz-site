# note記事一覧への導線

行先は `https://tsugino-shikaku.jp/articles`。元の試験区分は既存の `tsugino-qualification.ts` の対応で引き継ぐ（IP→itpassport、FE→kihon-johoなど）。資格ページの個別記事選択と教材索引を入口1つへ集約し、無料・有料の選択は一覧で行う。

共通のTrackedNoteLinkは、対象3アカウントのプロフィール・記事・マガジンを一覧へ送る。第三者のnote、問い合わせ先、他サイトは変更しない。既存の公開証跡・記事台帳は保持する。発信者の構造化データsameAsはプロフィールのままとする。

ホームとフッターの重複した記事入口をまとめる。価格・本文の新規生成や複製はしない。

## 公開の前提

次の資格側の専用branch `codex/note-catalog-tsugino-20261016` を先に公開し、次を確認してからこのbranchを公開する。

- `/articles/status` のcomplete=true、3アカウントと件数・取得日時の整合。
- `/articles?qualification=itpassport` と `qualification=kihon-joho` の着地・検索・無料有料・元noteリンク。
- 400px画面で横はみ出しがないこと。

このbranchは `codex/note-catalog-kakomon-20261016`。基点は既公開main `d8108fe1`（PR772）。未公開のPR773や別資格補充を取り込まない。公開操作はこの作業の実装・検証報告とは分ける。

公表問題の出典注記にある共通ガイドも一覧へ変換する。回/資格ハブ内の既存記事から資格が一意に確認できる場合は、その資格で着地する。複数資格や未確定の場合は推測せず全体一覧にする。
