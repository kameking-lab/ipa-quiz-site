# PANIC ROLLBACK — 夜間自律改善 緊急復旧手順

作成: 2026-05-30 (土) JST / 対象期間: 2026-05-30 〜 2026-05-31 09:00 JST
このファイルは「本番が壊れたかも」と思ったら最初に開くファイル。落ち着いて上から実行する。

---

## 0. 復元点（コレに戻せば必ず元に戻る）

- **Git タグ**: `pre-overnight-20260530`
- **タグが指すコミット (main の凍結点)**: `ea2ca693dee205b9318c018bcd0aea2ce0854e81`
- **本番 Vercel デプロイ (夜間開始時に Production だったもの)**:
  - URL: `https://ipa-quiz-site-1pczwwevy-kameking-labs-projects.vercel.app`
  - プロジェクト: `kameking-labs-projects/ipa-quiz-site`
  - 状態: ● Ready / Production / 開始時点で最新の本番デプロイ
- **夜間作業ブランチ**: `overnight-integration`（本番には一切触れない。全改善はここに積む）

> 大原則: 夜間は **main へ push / merge しない**。本番デプロイは起きない＝物理的に壊れない。
> もし本番が変だと感じても、まず「本当に夜間作業のせいか？」を疑う（夜間は main を触っていないので、
> 普通は無関係。env/KV 起因＝§0 コスト上限・/admin 503 などは夜間作業と独立した既知事象）。

---

## 1. 本番が壊れた場合の復旧（git 不要・最速・推奨）

Vercel ダッシュボードで前の正常デプロイへ即時ロールバックする。git 操作は一切不要。

1. https://vercel.com/kameking-labs-projects/ipa-quiz-site/deployments を開く
2. 上記「本番 Vercel デプロイ」= `ipa-quiz-site-1pczwwevy-...` を探す
   （もし不安なら 2026-05-30 09:00 JST より前で ● Ready / Production のものを選ぶ）
3. その行の「…」メニュー → **Promote to Production** をクリック
4. 数十秒で本番がそのデプロイに戻る。完了。

CLI で行う場合（任意）:
```
vercel ls                       # Production の Ready なデプロイ URL を確認
vercel promote <deployment-url> # 上記の本番デプロイ URL を昇格
```

---

## 2. overnight-integration を丸ごと破棄したい場合

夜間ブランチが汚れた／全部なかったことにしたい時。**main・タグには影響しない。**
```
git push origin --delete overnight-integration
```
ローカルも消すなら:
```
git checkout main
git branch -D overnight-integration
```

---

## 3. 万一 main を誤って変更してしまった場合（最終手段）

タグの凍結点へ main を戻す。**force push を伴うため、本当に必要な時だけ。**
```
git checkout main
git fetch origin
git reset --hard pre-overnight-20260530
# ローカルが正しいことを確認してから:
git push origin main --force-with-lease
```
> 通常このセクションは使わない。夜間ループは main を触らない設計。

---

## 4. 夜間ループ自体を止めたい場合

- `overnight-loop.bat` を起動したコンソール窓を閉じる、もしくは Ctrl+C。
- 実行中の claude セッションも止めたい場合、タスクマネージャで `node.exe`（claude）プロセスを終了。
- ループは Sun 2026-05-31 09:00 JST に自動停止する（bat 内の DEADLINE 判定）。

---

## 5. チェックリスト（復旧後）

- [ ] 本番トップが 200 で開く
- [ ] /admin が 401（503 は env/KV 起因の既知事象。夜間作業とは無関係なので慌てない）
- [ ] main の HEAD が `ea2ca69`（タグの指すコミット）のままである
- [ ] overnight-integration の中身は本番に出ていない（merge していない）
