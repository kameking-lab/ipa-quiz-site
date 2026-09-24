"""Provisional acceptance rejects stale, incomplete and internal-only drafts."""

from copy import deepcopy
from hashlib import sha256
import unittest

from emkohyo_choice_launch_gate import candidate_launch_issues, government_sources


ROW = {
    'id': 'emkohyo-TEST-q1',
    'text': '問1 正しいものはどれか。',
    'answerAuthority': 'official',
    'correctChoice': 3,
    'choiceCount': 5,
}
OVERLAY = {
    'sourceHash': sha256(ROW['text'].encode('utf-8')).hexdigest(),
    'correctChoice': 3,
    'summary': '問題文と公式正答を照合し、各肢の判断理由を順に整理した学習用の解説。',
    'choices': [
        {'number': n, 'verdict': 'correct' if n == 3 else 'incorrect',
         'reason': f'選択肢{n}について問題文に示された条件と公式正答の番号を照合し、この肢を選ぶべきかどうか個別の理由を確認するための説明文です。'}
        for n in range(1, 6)
    ],
    'sources': [],
    'provisionalReview': True,
    'lastCheckedAt': '2026-09-25',
}


class LaunchGateTest(unittest.TestCase):
    def test_complete_source_limited_candidate_can_pass(self):
        self.assertEqual(candidate_launch_issues(ROW, OVERLAY), [])

    def test_no_invented_non_government_citation(self):
        sources = [
            {'title': '省庁', 'url': 'https://www.mhlw.go.jp/example'},
            {'title': '学術誌', 'url': 'https://www.jstage.jst.go.jp/example'},
        ]
        self.assertEqual(government_sources(sources), sources[:1])

    def test_stale_text_and_answer_are_rejected(self):
        stale = deepcopy(OVERLAY)
        stale['sourceHash'] = '0' * 64
        stale['correctChoice'] = 4
        self.assertIn('sourceHash', candidate_launch_issues(ROW, stale))
        self.assertIn('officialCorrectChoice', candidate_launch_issues(ROW, stale))

    def test_internal_marker_or_missing_choice_is_rejected(self):
        incomplete = deepcopy(OVERLAY)
        incomplete['choices'][0]['reason'] += ' 要確認'
        incomplete['choices'] = incomplete['choices'][:4]
        issues = candidate_launch_issues(ROW, incomplete)
        self.assertIn('fiveChoices', issues)
        incomplete['choices'].append(OVERLAY['choices'][4])
        self.assertIn('choice1Reason', candidate_launch_issues(ROW, incomplete))


if __name__ == '__main__':
    unittest.main()
