# FP3 q11 category correction proposal

Status: proposal only; no question-data edit is included in this quality PR.

At 2026-10-11 15:17 UTC, remote main was `08d2b261a6c3616c4da3d85fc2f970d765bebb72`. Its `fp3-2026-published-gakka-q11` still had `category: リスク管理` and the same sole topic tag. All 80 open PRs were inspected by changed file name; none changed `data/questions/fp3/`. This confirms absence of an open-PR overlap at that time, not absence of unpublished work. The owner should confirm reservation before a data commit.

Proposed separate commit after the parent assigns the correction:

- File: `data/questions/fp3/academic-2026-05.json`.
- Exact ID: `fp3-2026-published-gakka-q11`.
- Change only its category and category topic tag from `リスク管理` to the existing category `金融資産運用`; use the actual correction date for `lastUpdated`.
- Keep question, choices, answer, all choice explanations, source URLs, law reference date and publication flags.
- Record why: the question concerns the Bank of Japan's open-market operations, a financial/economic topic rather than insurance risk management. Its official problem/key source is `https://www.jafp.or.jp/exam/mohan/files/g3_202605_qa.pdf`.
- Validate the exact ID/source/answer and ready-question count; check the affected category filter and static question page. Do not combine a category correction with content intake.

The neighboring registered metadata also appears misclassified: q9/10 are insurance questions tagged life planning; q12–14 concern ETF, individual government bonds and the Nikkei average but are tagged risk management; q16/17 are income-tax questions but are tagged risk management. These are an evidence-backed signal to the existing data owner, not permission for this application lane to mass-edit the paper. A one-item commit must not be described as a full-paper classification repair.
