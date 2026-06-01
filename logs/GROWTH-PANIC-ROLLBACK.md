# GROWTH PANIC ROLLBACK — 集客・収益化フェーズ 緊急復旧手順

作成: 2026-06-01 JST / 対象: 夜間ビルド第2弾（growth-integration）
「本番が壊れたかも」と思ったら最初に開く。落ち着いて上から実行する。

---

## 0. 復元点
- **Git タグ**: `pre-growth-20260601`
- **タグが指すコミット（本番 main の凍結点）**: `fb72413d4c5c066857e3df93c825cf586c5acaf7`（= 第1弾マージ後の本番）
- **本番 Vercel デプロイ（開始時 live）**: `https://ipa-quiz-site-rgb19s7s7-kameking-labs-projects.vercel.app`（Production / Ready）
- **その前の本番（さらに前に戻す用）**: `ipa-quiz-site-r1f6sl3op-...`
- **作業ブランチ**: `growth-integration`（全改善はここ。main へは触れない）

> 大原則: 夜間は main へ push/merge しない＝本番デプロイは起きない＝物理的に壊れない。
> 本番が変だと感じても、まず「本当に夜間作業のせいか」を疑う（夜間は main 不変。env/KV 起因や既知事象は独立）。

---

## 1. 本番が壊れた場合の復旧（git 不要・最速・推奨）
1. https://vercel.com/kameking-labs-projects/ipa-quiz-site/deployments を開く
2. `ipa-quiz-site-rgb19s7s7-...`（開始時の正常な本番）を探す
3. その行の「…」→ **Promote to Production** をクリック → 数十秒で復旧

CLI:
```
vercel ls
vercel promote https://ipa-quiz-site-rgb19s7s7-kameking-labs-projects.vercel.app
```

## 2. growth-integration を破棄したい場合（main・タグに影響なし）
```
git push origin --delete growth-integration
git checkout main && git branch -D growth-integration
```

## 3. 万一 main を誤って変更した場合（最終手段）
```
git checkout main && git fetch origin
git reset --hard pre-growth-20260601
git push origin main --force-with-lease
```
> 通常使わない。夜間ループは main を触らない設計。

## 4. 夜間ループを止めたい場合
- `growth-loop.bat` のコンソール窓を閉じる / Ctrl+C。
- タスクマネージャで `node.exe`（claude）を終了。
- このループは締切ではなく **バックログ枯渇で自動停止**する（やれることが尽きたら止まる）。

## 5. 復旧後チェック
- [ ] 本番トップ 200 / [ ] /admin 401 / [ ] /ip 問題数 2,381
- [ ] main HEAD が `fb72413` のまま / [ ] growth-integration は本番に出ていない
