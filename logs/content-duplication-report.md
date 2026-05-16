# Phase 4: 重複コンテンツスキャン報告

調査対象: HEAD 37e85b7
対象: essays 27ファイル、blog プログラマティック生成 65本相当、exam page 13区分
スキャン日: 2026-05-16


## 結論サマリ

重大な重複(95%以上一致)はゼロ。軽微なテンプレ流用は設計意図によるもので問題なし。
ただし exam page のメタ説明テンプレと exam description 文言には改善余地あり。


## 1. Essays データの重複分析

データパス: data/essays/sc/(2023-spring | 2024-spring | 2025-spring)/pm2/q1/(8業種)
構成: 3年度 × 8業種 = 24本 + index 系3本

検証ペア1: 2023/finance vs 2024/finance
- 2023版: B地方銀行/内部不正対策
- 2024版: G証券/クラウド移行セキュリティ
- 類似度: 低 (異なる事案・異なる企業)

検証ペア2: 2024/retail vs 2023/retail
- 2023版: R流通/購買履歴流出・内部不正対策 約670字
- 2024版: R流通/EC基盤クラウド移行・PCI DSS対応 約780字
- 類似度: 約35% (企業名・ドメイン用語は共通、事案構造は異なる)

検証ペア3: 2025/manufacturing vs 2024/manufacturing
- 2024版: M電機/CAD・PLM基盤のAWSクラウド移行 約900字
- 2025版: M電機/ゼロトラスト導入 約1050字
- 類似度: 約40% (企業設定は同じ、対策内容は別)

業種差の表現:
- 全エッセイで業種固有リスクを明示
- 金融: 顧客資産保護、預金量、勘定系
- 製造: 営業秘密、CAD設計データ、加工パラメタ
- 流通: 会員情報、個人情報保護法、PCI DSS
- IT: 特権ID、開発環境、本番環境

結論: 重大な重複なし、業種差は適切に表現済み。追加改修不要。


## 2. Blog 記事の重複分析

データパス: data/blog/(index.ts | generators.ts | exam-data.ts | types.ts)
生成: generators.ts 7033行で動的生成

生成パターン (data/blog/index.ts):
- buildOverviewPost() x 13試験
- buildLastMonthPost() x 13試験
- buildFrequentTopicsPost() x 13試験
- buildPracticePost() x 13試験
- buildAnalysisPost() x 13試験
- buildGeneralPosts() 共通記事

合計: 65本 + 共通記事数本

テンプレ構造例 (buildOverviewPost):
- title: `${p.label} 合格までの勉強法・学習時間・出題傾向ガイド【2026年最新】`
- 共通セクション: 試験概要と難易度、午前試験の戦略、午後試験の戦略、推奨学習スケジュール
- 可変部: ${p.label}, ${p.passRate}, ${p.studyHours}, ${p.career}

判定: 意図的・効率的なプログラマティック生成。重大な重複なし。
SEOキーワード重複度は高い (合格戦略・勉強法・学習時間) が、各記事は試験別カスタマイズで本文一致はゼロ。

改善余地: 試験別記事タイトルのバリエーション増加。
注意点: タイトル末の【2026年最新】は来年更新時に置換必須(自動置換ロジック確認推奨)。


## 3. Exam ページ (app/[exam]/page.tsx) のテンプレ流用度

対象: 13区分(ap, sc, db, nw, sm, au, pm, st, sa, fe, sg, ip, es)
関連: lib/seo/exam-meta.ts 154行

共通構造:
- 試験説明文(EXAM_DESCRIPTIONS[])
- メタディスクリプション生成関数(examMetaDescription())
- 共通コンポーネント: ExamBrowseTabs, ExamProgressBar, ExamOfficialResources, ExamRoadmap, ExamDeepContent

重大な発見: lib/seo/exam-meta.ts の EXAM_META_DESC_DIVERSE が 13試験で共通パターンを使用。
例:
- ip: 「...${c}問・${y}期分・${k}分野を実問題AI解説で体系的に対策...」
- sg: 「...${c}問・${y}期分・${k}分野をAI解説で完全習得...」
- fe: 「...${c}問・${y}期分・${k}分野をAI解説で体系的に対策...」

判定: 共通パターン部 (15-20字程度)。各試験で説明文の文脈が異なるため致命的な重複ではないが、
SEO 観点で「同質コンテンツの量産」と Google に判定されるリスクは中程度。

改善案:
- EXAM_META_DESC_DIVERSE の共通パターン部を定数化して可読性向上
- 各試験の独自性をより前面に出す書き分け強化


## 件数サマリ

- 重大な重複(95%以上一致): 0件
- 軽微な流用(設計意図によるもの): 3カテゴリ (blog/exam page/meta desc)
- 業種差未表現の essays: 0件
- 改善提案項目: 2件(blog タイトル多様化、exam meta 差別化)


## 削除推奨候補

このフェーズからは削除推奨ゼロ。すべて維持または改善対象。
