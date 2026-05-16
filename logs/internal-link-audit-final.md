# Internal Link Integrity Audit — Final Report

**Date:** 2026-05-16  
**Branch:** audit/internal-link-integrity  
**Auditor:** Claude Sonnet 4.6 (automated)

## Scope

- Blog posts: 136 posts (65 exam-based × 5 types + 71 general/longtail)
- Essays: 6 exam codes (sc/st/sa/pm/sm/au)
- Exam pages: 13 exam codes
- Static pages: all app/ routes discovered dynamically

## Phase 1: Initial Scan Results

| Category | Count |
|---|---|
| Blog posts scanned | 136 |
| Body markdown links | 376 |
| relatedSlugs links | 385 |
| **Total links checked** | **761** |

### Initial Issues Found

| Severity | Type | Count | Notes |
|---|---|---|---|
| FATAL | Dead body links (false positive) | 3 | `/modes/year`, `/account/dashboard` — valid routes not in initial static list |
| WARNING | Orphaned posts | 12 | No inbound links from other posts |
| OBSERVATION | Generic anchors | 0 | None detected |
| OBSERVATION | Circular links | — | Not flagged (mutual refs are acceptable) |

## Phase 2: Classification

### Dead Links
All 3 initially reported dead links were **false positives** due to the audit script using a static path list that omitted dynamically-discovered Next.js routes. After switching to filesystem-based route discovery (`discoverAppRoutes()`), 0 dead links remain.

- `/modes/year` → `app/modes/year/page.tsx` ✅ valid
- `/account/dashboard` → `app/account/dashboard/page.tsx` ✅ valid

### Orphaned Posts (12 posts, all WARNING)
Posts with zero inbound links from other blog posts:

| Slug | Topic |
|---|---|
| ipa-shiken-keisan-mondai-kokuhuku | 計算問題を捨てない |
| shippai-pattern-7 | 受からない人の典型7パターン |
| syakaijin-asakatsu-benkyou | 社会人の朝活 |
| ipa-shiken-pomodoro | ポモドーロ式学習法 |
| it-shikaku-nendaibetsu-roadmap | IT資格年代別ロードマップ |
| fe-algorithm-nigate-kokufuku | FEアルゴリズム苦手克服 |
| ap-gogo-management-erabikata | AP午後マネジメント系選び方 |
| sg-shiken-meritto-imi-aru | SGシケンを取る意味はあるか |
| ipa-moushikomi-mynumber | IPA申込みマイナンバー |
| kakomon-nankai-tokinaosu | 過去問難解問題解き直し |
| koudo-ronjutsu-kakikata-kotsu | 高度試験論述書き方コツ |
| ipa-zaitaku-remote-juken | IPA在宅リモート受験 |

## Phase 3: Repairs

### Orphan Rescue — 12 relatedSlugs additions in `data/blog/generators.ts`

| Orphaned Post | Added to Referrer Post | Context |
|---|---|---|
| ipa-shiken-keisan-mondai-kokuhuku | ipa-shiken-gogo-vs-am | 計算問題は午前対策記事から自然な接続 |
| shippai-pattern-7 | ipa-shiken-fugoukaku-kara-no-recovery | 不合格後のリカバリー記事から失敗パターン |
| syakaijin-asakatsu-benkyou | ipa-shiken-shakaijin-jikan-kakuho | 社会人時間管理→朝活の流れ |
| ipa-shiken-pomodoro | ipa-shiken-tsuukin-jikan-katsuyou | 通勤学習→ポモドーロの流れ |
| it-shikaku-nendaibetsu-roadmap | 13-shikaku-osusume-jyun | 推奨取得順→年代別ロードマップ |
| fe-algorithm-nigate-kokufuku | fe-kamoku-b-pseudo-language | 擬似言語→アルゴリズム苦手克服 |
| ap-gogo-management-erabikata | ap-gogo-sentaku | AP午後選択→マネジメント系選び方 |
| sg-shiken-meritto-imi-aru | ipa-shiken-goukakuritsu-ranking | 合格率ランキングからSG価値記事 |
| ipa-moushikomi-mynumber | shiken-zenjitsu-checklist | 前日チェックリスト→申込手続き |
| kakomon-nankai-tokinaosu | kakomon-ai-vs-paper | 過去問紙vs.アプリ→難解問題解き直し |
| koudo-ronjutsu-kakikata-kotsu | pm-essay-shudai-pickup | PM論述→高度試験論述全般のコツ |
| ipa-zaitaku-remote-juken | ipa-shiken-cbt-vs-pbt | CBT/PBT比較→在宅受験の現状 |

## Phase 4: Final Scan Results

| Category | Count |
|---|---|
| Blog posts scanned | 136 |
| Body markdown links | 376 |
| relatedSlugs links | 397 (+12) |
| **Total links checked** | **773** |

### Final Issue Count

| Severity | Count |
|---|---|
| **FATAL (dead links)** | **0** |
| WARNING (orphans) | **0** |
| WARNING (generic anchors) | **0** |
| OBSERVATION | **0** |

## Conclusion

- **抽出内部リンク総数**: 773（本文376 + relatedSlugs397）
- **デッドリンク検出**: 0件（当初3件は誤検知、有効ルートだった）
- **孤立記事**: 12件 → 0件（修復完了）
- **汎用アンカーテキスト**: 0件
- **修復件数**: 12件（relatedSlugs追加）
