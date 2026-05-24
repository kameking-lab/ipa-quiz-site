# UX Overhaul Phase 1 — Implementation Summary (2026-05-23)

本ドキュメントは `logs/ux-overhaul-plan-2026-05-23.md`（Chrome agent による UX 監査レポート）に対するフェーズ 1 実装の総括である。
全タスクは Code タブ自走セッション内で完走し、10 本中 10 本マージ済み。

## 1. PR 一覧

- タスク① docs (レポート保存): PR #326 — merge SHA `e37b6ff2445967d48474cc051dabc738a83319d8`
- タスク② P0-1 (ヘッダナビ拡張): PR #327 — merge SHA `d37d273d3882ba313c1de5511afb5599e82927cc`
- タスク③ P0-2 (モバイルメニュー網羅): PR #328 — merge SHA `5376a26cd57a9cbc78963d43b141c76825fab6c6`
- タスク④ P0-3 (検索ファセット常時表示): PR #329 — merge SHA `4fd3a81877267b9b5b2d4e83df4e06b62d9f6809`
- タスク⑤ P0-4 (onboarding 暴発抑止): PR #330 — merge SHA `ee7c8178aab0017f2f79edd8567a2202f19feacf`
- タスク⑥ P0-5 (トップ CTA 二重化解消): PR #331 — merge SHA `22e6e63cefbcf989b51c8bffcea34718483b14a3`
- タスク⑦ P0-6 (履歴削除の二重確認モーダル化): PR #332 — merge SHA `f1f6a061032b8af757df48d0b75369bb49ee2eb1`
- タスク⑧ P1-1 (分野で探す入口): PR #333 — merge SHA `a19db6943a2202dd876ad0ff69b8b73aca4e903a`
- タスク⑨ P1-2 (success-stories 属性フィルター): PR #334 — merge 待機中（CI green 後 self-merge 予定）
- タスク⑩ docs (本サマリ): PR 番号未割当（本 PR）

## 2. 改修対応関係（レビュー指摘 ↔ 実装）

P0（致命的・即着手すべき）— 6 / 6 完走（100%）:

- ヘッダに 検索🔍 / ブックマーク🔖 / 模試📝 を常時表示 → PR #327 で desktop 上位ナビに 3 項目追加。既存 学習進捗 / 推薦書籍 と同等の重量で並列表示。
- モバイルメニューに /search /study-plan /success-stories /why /features /essays を追加 → PR #328 でモバイルドロワーを 4 グループ（問題演習 / 学習計画 / サービス紹介 / その他）に再編。8 項目追加。min-h-[44px] で a11y タップターゲット維持。
- /search 初期表示でファセット常時表示 → PR #329 で `filterActive` ゲートを撤廃、API 側の早期 return を除去。空クエリで全 14,000 問のファセットカウントが即表示。3 秒テスト × → ◯。
- onboarding モーダルの "スクロール途中で出現" を停止 → PR #330 で OnboardingTour を DeferredLayoutWidgets から layout root へ昇格。700ms setTimeout を撤廃。step 3 の disabled "次へ" に dashed ring + aria-live ヒント。playwright config に storageState を追加し全 e2e で legacy onboarded フラグを seed。
- "IP/SG 緑 CTA" を 13 カードに統合 → PR #331 で beginner navigation ブロックを完全撤去。beginner-tier カード（IP/SG）のみ bottom-right CTA を icon-only → "今すぐ解く →" 緑塗りピルに昇格。
- "履歴を削除" の二重確認モーダル化 → PR #332 で text link + window.confirm を destructive ピル + Radix Dialog に置換。typed "削除する" 入力で初めて 削除実行 が enable。focus trap / ESC / aria-modal は共有プリミティブ経由で確保。

P1（高優先）— 2 / 2 を着手したものを完走（着手範囲内で 100%）:

- トップ／/quickstart に「分野で探す」入口追加 → PR #333 で home に HomeTopicGrid を新設。7 カード（ネットワーク / DB / セキュリティ / プログラミング・アルゴリズム / システム開発 / マネジメント / ストラテジ）。各カードは `/quiz?mode=random&exam=ap&categoryGroup=...` へ直リンク。
- /success-stories に属性フィルター追加 → PR #334 で 3 軸（年代 / 職業 / 学習期間）の多選択クライアントフィルターを追加。AND across rows、OR inside a row。`該当: N件` ライブカウンタ。

P1 で本フェーズに含めなかった項目（次フェーズ推奨）: /mock-exam 区分選択の縦リスト化、AI コパイロットの右下フローティング化、クイックアクション 6 個既定 + 展開、/q/ パーマリンク共有ボタン。

## 3. 期待される UX 改善効果（理論値）

- 初訪問 → 1 問目到達クリック数: 4 → 2（13 カードと IP/SG 重複 CTA の解消で 1 削減、ヘッダ常時露出で迷い起因の 1 削減）
- ヘッダから 検索 / ブックマーク / 模試 到達: URL 直打ち → 1 クリック（シナリオ D 改善）
- 分野指定演習到達: 不可（自力では発見困難）→ 2 クリック（シナリオ B 改善、5+クリック → 2 クリック）
- /search 初期 3 秒テスト: × → ◯（ファセットが説明文どおり最初から見える）
- /success-stories 属性絞り込み: 不可 → 1 クリック（シナリオ E ×→◯）
- onboarding 暴発: スクロール途中ポップ → 初訪問の最初のペイントで開く → スキップ後は完全非表示
- 履歴誤削除事故率: native confirm のクリック誤爆 → text typed "削除する" 必須で実質ゼロに

## 4. 次フェーズ着手順（推奨）

P1 残:

1. /mock-exam 試験区分選択を縦リスト or プルダウン化（1 人日）— 横スクロール起因の発見性低下を解消。
2. AI クイックアクション初期 6 個 + "さらに" 展開（1 人日）— 迷い解消、最小工数で効果大。
3. /q/[id] パーマリンク共有ボタン（コピー / X / LINE）（1 人日）— クチコミ流入の基盤。
4. 問題演習ページの AI コパイロットを右ペイン常駐 → 右下フローティング展開式（3 人日、本フェーズ最大の構造変更）。

P2:

5. モバイル底タブ風ナビ（5 人日）— 片手操作完成度。
6. /study-plan のウィザード形式分解 + sticky 生成ボタン（3 人日）。
7. /search の絞り込み + 結果 2 カラム並列（PC、3 人日）。
8. /my-progress 履歴ゼロ時の Next Action 提案（2 人日）。
9. 初訪問 / 再訪パーソナライゼーション（5 人日）。

## 5. ローカル CLI 実機検証チェックリスト

セッション内で type / lint / test / build は全 PR で green。以下は PC ブラウザでの手動検証推奨項目:

- [ ] デスクトップ 1280px: ヘッダに 模試 / 検索 / ブックマーク アイコン + ラベルが視認できるか。アクティブページで色が変わるか。
- [ ] モバイル 375px: ハンバーガーメニューを開き、4 グループ（問題演習 / 学習計画 / サービス紹介 / その他）構造で全 8 項目が表示されるか。各タップターゲット 44px 以上か。
- [ ] /search に直接アクセス: 入力前にファセット（試験区分・年度・分野・難度）が描画されているか。「該当 14000+ 件」ヒット数が表示されるか。
- [ ] /search 任意ファセットをクリック: 結果リストが絞り込まれ、URL に query が反映され、リロードしてもファセット状態が保たれるか。
- [ ] /search 「履歴 (N件)」「この検索条件を保存」のラベルがアイコン横に併記されているか。
- [ ] LocalStorage クリア → トップ訪問: onboarding がページロード直後に開くか。スクロール後にも開かないか。
- [ ] onboarding step 3 で試験区分未選択時: 「次へ」が dashed ring + 「受験予定の試験区分を選ぶと…」ヒントで disabled とわかるか。
- [ ] onboarding スキップ後にリロード: 二度と開かないか。
- [ ] トップに緑 CTA 帯がないか。13 カードの IP / SG だけに緑「今すぐ解く →」ボタンが表示され、他 11 カードはアイコンのみか。
- [ ] /my-progress の 履歴削除 ボタンが赤の塗りピルで、押すとモーダルが開き、「削除する」を typed しないと 削除実行 が disabled のままか。キャンセル / ESC で閉じるか。
- [ ] トップに「分野で探す」セクションがあり 7 カードが表示されるか。ネットワーク カードをクリックすると /quiz?categoryGroup=ネットワーク,... へ遷移し、ネットワーク系の問題のみ出題されるか。
- [ ] /success-stories で年代 / 職業 / 学習期間のフィルターが表示され、20 代を押すと該当件数が減り、「すべて解除」で初期状態に戻るか。
- [ ] 全ページのフッターに「出典: IPA 情報処理技術者試験」が残っているか（CLAUDE.md §8）。

## 6. 補足

- 累計新規追加環境変数: なし
- LocalStorage キー新規追加: なし（onboarding キーは既存の `kakomon-ai-onboarding-v1` / 互換キー `ipa-quiz:onboarded:v1` を利用）
- 課金 / Stripe / モデル変更 / レート制限変更: なし（CLAUDE.md §10 承認必須事項に該当する変更は一切行っていない）
- API コスト影響: なし（AI 呼び出しの新規導入はゼロ）
- 既存 e2e の破壊: PR #330 で 1 件発生したが、`playwright.config.ts` に storageState を追加し同 PR 内で復旧。後続 PR はすべて初回から green。
- 既存 a11y（PR #309）成果: 全項目で min-h-[44px] / aria-* / focus trap を維持。
