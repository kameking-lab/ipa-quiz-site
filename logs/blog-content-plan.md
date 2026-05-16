# Blog Articles Batch 1 — Content Plan

作成日: 2026-05-16
ブランチ: feat/blog-articles-batch1

## 既存blog実装

- 実体: TypeScript で動的生成 (`data/blog/generators.ts`, 116 記事)
- ルーティング: `app/blog/page.tsx` (一覧) + `app/blog/[slug]/page.tsx` (詳細)
- メタデータ: `generateMetadata` で title/description/canonical/OGP/Article JSON-LD すべて自動
- sitemap: `lib/seo/sitemap-xml.ts` が `getAllBlogSummaries()` を読み自動include
- 公開日: `publishedAtFor(offset)` は `2026-01-01 + offset 日` を「本日UTC 00:00」でclamp → 過去日として配信される
- 既存 general 記事数: 51 本 / 既存 exam 個別: 65 本 (13区分 × 5パターン)

## 投入方針

- 触れない: 既存 `buildOverviewPost` ほか定型ジェネレータ・既存 `general.push` 50+ 本
- 新規: `buildGeneralPosts()` 末尾に 10 件 `general.push(...)` を追加
- offset: 既存最終が `ext2Offset + 19` (=baseOffset+12+21+19 = 117) → 新規は 118〜127 を使用
- 「本日 UTC 00:00」でclamp されるため publishedAt は 2026-05-16 に揃う。日付ずらしのためそれぞれ 1〜3 日ずつ過去にずらすには `updatedAt` 未設定で OK（自動 clamp）

## 既存記事との重複チェックと角度調整

| # | 検索意図                                             | 既存重複                              | 採用角度・slug                                                                     |
|---|------------------------------------------------------|---------------------------------------|------------------------------------------------------------------------------------|
| 1 | ITパスポート 何から勉強                              | `ip-3shukan-goukaku` (3週間集中)      | 「未経験者の初日〜1週間目」入門ロードマップ。slug=`ip-nani-kara-benkyou`           |
| 2 | 基本情報技術者 勉強時間 目安                         | overview 内に studyHours 言及あり     | 立場別 (社会人/学生/未経験) 勉強時間配分の実例。slug=`fe-benkyou-jikan-meyasu`     |
| 3 | 応用情報 午後 選択科目 おすすめ                      | `ap-gogo-sentaku` (背景別選択戦略)    | 「文系・非エンジニアに最適な4科目」サブ視点。slug=`ap-gogo-bunkei-sentaku`         |
| 4 | 情報処理試験 高度試験 違い                           | `ipa-shiken-zenkubun-hikaku` (全13区分) | 高度9区分のみに絞った難易度・記述量・キャリア接続比較。slug=`ipa-koudo-9kubun-chigai` |
| 5 | IPA試験 申し込み 流れ                                | なし                                  | 申込〜受験票〜会場〜当日の流れ完全ガイド。slug=`ipa-shiken-moushikomi-nagare`     |
| 6 | ネットワークスペシャリスト 難易度 合格率             | `nw-hinshutu-pattern`, ranking 系     | 過去5年の合格率推移＋他高度試験との難易度比較。slug=`nw-nanido-goukakuritsu-suii` |
| 7 | 情報処理安全確保支援士 メリット                      | `sc-ronbun-taisaku` (午後II)          | 「取得して何が変わるか」キャリア/年収/業務メリット解説。slug=`sc-shikaku-merit`     |
| 8 | IT資格 ロードマップ                                  | `shikaku-career-path`, `13-shikaku-osusume-jyun` | 年代別 (20代/30代/40代) ロードマップ視点。slug=`it-shikaku-nendaibetsu-roadmap`     |
| 9 | 過去問 何年分 解く                                   | なし                                  | 試験区分別「過去何年分が最適か」を統計+学習効率で解説。slug=`kakomon-nannenbun`     |
| 10| IPA試験 直前対策                                     | `shiken-zenjitsu-checklist`(前日), `cyokusen-1kagetsu` (exam別1ヶ月) | 「直前1週間」全試験共通プレイブック。slug=`ipa-cyokusen-1shukan` |

## 字数・構造目標

- 本文 2,500〜4,000 字 (目標 3,000 字)
- H1 = 検索意図に一致するタイトル
- H2 5〜7 セクション
- E-E-A-T: 「過去問AI が独自にまとめた学習ガイド」注記、IPA 公式リンク必須
- 内部リンク: `/{exam}`, `/blog/{slug}`, `/quiz` を文脈に応じて自然に
- 外部リンク: IPA 公式 (https://www.ipa.go.jp/shiken/) のみ
- 教育貢献体裁・ボランティア有志運営の文体を維持
- AI コパイロット機能の言及は自然に絡める

## SEO 観点

- 検索ボリューム想定: 100〜1,000/月 のロングテール (大手競合のhead語回避)
- 競合状況: 「過去問道場」「ITプロ」等の大手は head語 を押さえているが、本リストはロングテールでミドル競合中心
- 過去問AI との相性: 全テーマで AI コパイロット・モバイル UX へ自然に導線可

## 生成方針

- Gemini API は CLI 環境変数 GEMINI_API_KEY 未設定の可能性が高く、本タスクは Claude 自身で執筆して品質保証する方が確実
- 各記事は手書きで生成、字数カウントを記事ごとに確認
- 不適合 (字数3,000未満) は最大3リトライで増補

## API コスト想定

- Gemini を使う場合: 1記事 = 約 3,000字 → 約 6,000 token 出力 = $0.0024 ≒ 0.37円 × 10 = 約 4円
- Claude 自身で執筆する方針なので追加 API コストはゼロ
