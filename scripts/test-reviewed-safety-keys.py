"""Exercise the importer guard without downloading or regenerating PDF images."""
import importlib.util, json, pathlib, unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('official_import', ROOT/'scripts/import-official-exams.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
keys = json.loads((ROOT/'data/exam-library/reviewed-answer-keys.json').read_text(encoding='utf8'))

class ReviewedKeysTest(unittest.TestCase):
    def setUp(self):
        self.source = keys[0]
        self.record = {'id': self.source['paperId'], 'pdfUrl': self.source['pdfUrl']}
        self.rows = json.loads((ROOT/'data/exam-library/papers'/f'{self.record["id"]}.json').read_text(encoding='utf8'))
        for q in self.rows:
            q['correctChoice'] = None
            q['answerAuthority'] = 'unconfirmed'

    def test_restores_all_reviewed_keys(self):
        for source in keys:
            record = {'id': source['paperId'], 'pdfUrl': source['pdfUrl']}
            rows = json.loads((ROOT/'data/exam-library/papers'/f'{record["id"]}.json').read_text(encoding='utf8'))
            for q in rows:
                q['correctChoice'] = None
                q['answerAuthority'] = 'unconfirmed'
            module.apply_reviewed_answer_keys(rows, record, source['pdfSha256'])
            self.assertEqual([q['correctChoice'] for q in rows], source['answers'])
            self.assertTrue(all(q['answerAuthority'] == 'official' for q in rows))

    def test_refuses_changed_pdf(self):
        with self.assertRaisesRegex(ValueError, 'source changed'):
            module.apply_reviewed_answer_keys(self.rows, self.record, '0'*64)

    def test_refuses_question_mapping_drift(self):
        self.rows[0]['sourcePages'] = [999]
        with self.assertRaisesRegex(ValueError, 'mapping changed'):
            module.apply_reviewed_answer_keys(self.rows, self.record, self.source['pdfSha256'])

    def test_refuses_conflicting_mark(self):
        self.rows[0]['correctChoice'] = self.source['answers'][0] % 5 + 1
        with self.assertRaisesRegex(ValueError, 'conflicts'):
            module.apply_reviewed_answer_keys(self.rows, self.record, self.source['pdfSha256'])

if __name__ == '__main__': unittest.main()
