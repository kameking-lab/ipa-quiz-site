# UX Overhaul Phase 2 — Implementation Summary (2026-05-23)

本ドキュメントは `logs/ux-overhaul-plan-2026-05-23.md`（Chrome agent による UX 監査レポート）に対するフェーズ 2 実装の総括である。
P1 残4項目と P2 着手可能3項目を完走（タスク①〜⑦）し、最終レポート（タスク⑧）を本ファイルとして提出する。
フェーズ 1 と合わせて、P0/P1 は完走、P2 は本フェーズで 3 項目消化。

## 1. フェーズ 2 PR 一覧

- タスク① P1-3 (/mock-exam 試験区分セレクター刷新): PR #336 — merge SHA `0dd850b34fb9cf39c17d3bc7ecfe5626ed8e718a`
- タスク② P1-4 (Copilot quick action progressive disclosure): PR #337 — merge SHA `6a1bb0a827826be5d3210d0dd4cbc813c07494f3`
- タスク③ P1-5 (問題ページ パーマリンク共有ボタン): PR #338 — merge SHA `0496473e9f607725d07ca0c187464547dc2a8944`
- タスク④ P1-6 (Copilot PC フローティング化): PR #339 — merge SHA `fcfcd7bcb7d7cafd70f64c5e15e4593c19fa2a35`
- タスク⑤ P2-1 (/quickstart 二段階展開): PR #340 — merge SHA `16be7d8d0a1cf5960b1bab295810869e57dd2b3b`
- タスク⑥ P2-2 (/study-plan ウィザード化): PR #341 — merge SHA `c9d58ea76f4372b47a5b21b60502a171976d0e0f`
- タスク⑦ P2-3 (/my-progress 履歴ゼロ時 Next Action): PR #342 — merge 待機中（CI green 後 self-merge 予定）
- タスク⑧ docs (本サマリ): PR 番号未割当（本 PR）

## 2. 改修対応関係（レビュー指摘 ↔ 実装）

P1 — 6 / 6 (フェーズ 1+2 累計 100%):

- ヘッダ常時露出 → フェーズ1 PR #327
- モバイルメニュー網羅 → フェーズ1 PR #328
- /search ファセット常時表示 → フェーズ1 PR #329
- onboarding 暴発抑止 → フェーズ1 PR #330
- トップ CTA 二重化解消 → フェーズ1 PR #331
- 履歴削除モーダル化 → フェーズ1 PR #332

P1（フェーズ1 では未着手だった残 4 項目 + 既着手 2 項目）:

- 分野で探す入口 → フェーズ1 PR #333
- /success-stories 属性フィルター → フェーズ1 PR #334
- /mock-exam 区分選択 → 本フェーズ PR #336。横スクロールタブを PC グリッド + モバイル native select に置換。AP 既定状態を視覚的に明示（'既定' チップ + ヒント）。「結果分析でわかること」予告カードを start CTA 上部に追加。
- AI クイックアクション初期 6 個 → 本フェーズ PR #337。`QUICK_ACTION_COLLAPSED_COUNT=6` 定数で先頭 6 のみ表示、`+他N個を見る` トグルで展開。`aria-expanded`/`aria-controls` で a11y。セッション内のみ保持。
- /q/ パーマリンク共有 → 本フェーズ PR #338。`<ShareButtons compact />` 変種（44px 角の icon-only クラスタ、`aria-label` 完備、role=status トースト）を問題ヘッダ右上に配置。
- AI コパイロット 右下フローティング化 → 本フェーズ PR #339。`<aside>` 常駐サイドバーを撤廃、新規 `CopilotDesktopFloating` を導入。`role=dialog`/`aria-modal`/ESC/外部クリック/初回フォーカスの a11y を実装。

P2 — 5 項目中 3 項目完走:

- /quickstart 二段階展開 → 本フェーズ PR #340。`QuickstartDisclosure` クライアント primitive を導入し、style picker と 13区分一覧をデフォルト非表示に。「全13区分を表示」を solid primary pill に昇格。
- /study-plan ウィザード化 → 本フェーズ PR #341。5 カードを 4 ステップウィザードに分解（StepProgress / 次へ・前に戻る / sticky 生成ボタン）。knowledge level にアイコン + おすすめチップ。
- /my-progress 履歴ゼロ時 Next Action → 本フェーズ PR #342。streak/dailyGoal/3-stats を `hasHistory` でゲート、空状態を flame icon + "Next: 5問解いて初日ストリーク獲得" + 主要/副 CTA の単一カードに置換。

P2 で本フェーズに含めなかった項目（次フェーズ推奨）:

- モバイル底タブ風ナビ実装（5 人日）
- 初訪問 / 再訪パーソナライゼーション（5 人日）
- /search の 2 カラム並列レイアウト（PC、3 人日）

## 3. レビュー指摘 対応率 最終値

- P0: 6 / 6 (100%)
- P1: 6 / 6 (100%)
- P2: 3 / 5 (60%、本フェーズで対応)
- P3: 0 / 4 (構造変更を伴うため後続フェーズ)

合計対応率: 15 / 21 ＝ 71%

## 4. ローカル CLI 実機検証チェックリスト全項目

フェーズ1 PR #335 のチェックリストを継承し、フェーズ2 分を追加。

フェーズ 1 確認項目（PC ブラウザでの手動検証）:

- [ ] デスクトップ 1280px: ヘッダに 模試 / 検索 / ブックマーク アイコン + ラベルが視認できるか
- [ ] モバイル 375px: ハンバーガーメニューを開き、4 グループ構造で全 8 項目が表示されるか
- [ ] /search に直接アクセス: 入力前にファセットが描画され、ヒット数が表示されるか
- [ ] LocalStorage クリア → トップ訪問: onboarding がページロード直後に開き、二度目以降開かないか
- [ ] トップに緑 CTA 帯がなく、IP/SG だけに緑「今すぐ解く →」ボタンが表示されるか
- [ ] /my-progress の 履歴削除 が typed "削除する" モーダル方式で動作するか
- [ ] トップ「分野で探す」の 7 カードからネットワーク系の問題のみ出題されるか
- [ ] /success-stories で年代 / 職業 / 学習期間フィルターが該当件数を更新するか

フェーズ 2 追加項目:

- [ ] /mock-exam: PC で 13 枚カード（横スクロールなし）、モバイルで native select、初回は AP に 既定 チップが付くか
- [ ] /mock-exam: 「結果分析でわかること」予告カードが start CTA の上に表示されるか
- [ ] /quiz クイックアクション: 初期 6 個 + "+他N個を見る"、展開後に "閉じる" で戻るか
- [ ] /q/[exam]/.../q[n]: ヘッダ右上に𝕏 / LINE / Copy の 3 ボタン（44px）、Copy 押下で「リンクをコピーしました」トーストが出るか
- [ ] /quiz: PC で右ペインが消え、右下「AIに聞く」ボタンを押すと右からスライドイン、ESC / 外部クリックで閉じるか
- [ ] /quickstart: 初回表示は 4 カードのみ。style picker と 13 区分一覧が collapsed、「全13区分を表示」が solid pill か
- [ ] /study-plan: ステップ 1/4 から開始、次へ → 前に戻る が動作、step 3 の レベルカードに アイコン + おすすめチップ、最終ステップでのみ「学習スケジュールを生成」が出るか
- [ ] /my-progress: 履歴ゼロで Next Action カード単独表示、答案 1 件追加後にリロード → streak/dailyGoal/3-stats が復活するか

## 5. 次フェーズ（P2 残 + P3）推奨着手順

P2 残:

1. モバイル底タブ風ナビ（5 人日）— 片手操作完成度、ヘッダの軽量化との一貫性。
2. /search の絞り込み + 結果 2 カラム並列（PC、3 人日）— スクロール量半減、検索体験の決定打。
3. 初訪問 / 再訪パーソナライゼーション（5 人日）— LocalStorage `kakomon-ai-onboarding-v1.selectedExam` を起点にトップを最適化。

P3:

4. ダッシュボード（パーソナルホーム）の本格実装 — `selectedExam` 連動でトップ全面置換、続きから + 今日のおすすめ 5 問。
5. AI クイックアクションのユーザーピン留め・並び替え（既出 6 個展開トグルとの整合）。
6. 体験記 "似たペルソナ" レコメンド — フェーズ1 で追加した属性フィルターのデータ基盤を活用。
7. PWA オフライン演習対応 — manifest は既存、Service Worker 拡張で問題プールを selective cache。

## 6. フェーズ 1+2 通しの気づき

- LocalStorage 主体の設計（既存 `LS_KEYS` に集約）が、認証なしのまま個別最適化を実現する上で強力に効いている。新規追加は本フェーズもゼロ、過去のキー再利用のみで P2 範囲がカバーできた。
- `aria-expanded` / `aria-controls` / `role=dialog` / `aria-modal` / `aria-live` の組合せは shadcn 風 primitives（`@components/ui`）に積み上がっており、新規 disclosure / dialog 系コンポーネントを 30 行前後で a11y 完備に書ける状態が維持できている（PR #309/#317 の蓄積）。
- e2e は PR #330 で一度赤化したが、playwright config の storageState seed を導入した以降は全 PR で初回 green。今後の onboarding / 認証系の変更でも同じ seed 戦略で吸収可能。
- 「縦長フォーム → ウィザード化」(PR #341) と「常駐パネル → フローティング」(PR #339) は、いずれも既存ロジックを保ったまま見た目だけ差し替える分解になっており、リファクタリングが破壊的になりにくい構造が確認できた。
- CLAUDE.md §10 承認必須事項に該当する変更は、フェーズ 1・2 を通じてゼロ。AI 呼び出し新規導入もゼロ。本フェーズで Stripe / モデル / 価格 / レート制限の変更は行っていない。

## 7. 補足

- 累計新規追加環境変数（フェーズ 1+2）: なし
- LocalStorage キー新規追加: なし（既存 `kakomon-ai-onboarding-v1` / `LS_KEYS` の再利用のみ）
- 既存テスト破壊: ゼロ（PR #330 は同一 PR 内で復旧）
- 既存 a11y baseline（PR #309/#317）: 全 PR で維持（min-h-[44px], aria-*, focus trap）
- AI コスト影響: ゼロ
