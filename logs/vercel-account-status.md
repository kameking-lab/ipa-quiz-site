# Vercel アカウント状態調査結果

調査日時: 2026-05-18
調査 API: /v2/user, /v9/projects/ipa-quiz-site, /v6/deployments
認証: ローカル Vercel CLI auth (token 値は記録しない)

## アカウント状態

- username: kameking-lab
- email: (確認済み、記録省略)
- billing_plan: hobby
- status: active
- softBlock: null

## プロジェクト情報

- projectId: prj_t0YGXuTY62TNajIJg2v6W68TciT1
- name: ipa-quiz-site
- team: kameking-labs-projects
- teamId: team_fmzwEegB8SRsADNmwXkBUN34

## 結論

アカウントはブロックされていない。
status は "active"、softBlock は null。
問題の根本原因は Hobby プランの 100 builds/日 rate limit 超過。
ToS 違反や Fair Use Policy 違反によるアカウント停止ではない。
