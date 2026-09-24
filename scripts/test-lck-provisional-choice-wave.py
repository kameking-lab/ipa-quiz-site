import copy
from hashlib import sha256
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parent))
from lck_provisional_wave import (MODEL, WAVES, digest, load_receipts, load_wave,  # noqa: E402
                                  question_fingerprint, read, record_issues, shard_path,
                                  validate_shard)

TEXT = "問１ 伝熱に関する記述のうち、適切でないものは次のうちどれか。"
CHOICES = ["相変化を伴う熱伝達率は極めて高い。", "熱量は厚さに反比例する。",
           "放射は電磁波による熱移動である。", "熱量は温度差の四乗に比例する。",
           "表面温度は内部流体より高い。"]
LEGACY = "公式正答は（4）。放射伝熱量は絶対温度の四乗の差に比例する。労働安全衛生法第59条に基づく教育も参照。"


def fixture():
    question = {"id": "lckohyo-X-q1", "number": 1, "text": TEXT, "correctChoice": 4,
                "choiceCount": 5, "answerAuthority": "official"}
    presentation = {"prompt": TEXT[3:],
                    "choices": [{"number": n, "text": t} for n, t in enumerate(CHOICES, 1)]}
    target = {"paper": "X", "question": question, "presentation": presentation, "legacy": LEGACY}
    record = {
        "sourceHash": sha256(TEXT.encode()).hexdigest(),
        "questionFingerprint": question_fingerprint(question, presentation),
        "correctChoice": 4, "basedOnLegacyExplanationHash": digest(LEGACY),
        "provisionalReview": True, "generationBatch": "X-q01",
        "choices": [{"number": n, "verdict": "correct" if n == 4 else "incorrect",
                     "reason": f"選択肢{n}の記述は伝熱の基本関係に照らして判断でき、その理由をここで具体的に説明する。"}
                    for n in range(1, 6)],
    }
    receipt = {"ids": [question["id"]], "promptSha256": "a" * 64, "resultSha256": "b" * 64,
               "modelProof": {"requestedModel": MODEL, "assistantModels": [MODEL],
                              "modelUsage": {MODEL: {"canonicalModel": MODEL,
                                                     "provider": "firstParty"}}}}
    return target, record, {"X-q01": receipt}


class RecordGateTest(unittest.TestCase):
    def setUp(self):
        self.target, self.record, self.receipts = fixture()
        self.qid = self.target["question"]["id"]

    def issues(self, record=None, receipts=None):
        return record_issues(self.qid, self.target, record or self.record, receipts or self.receipts)

    def test_valid_record_passes(self):
        self.assertEqual(self.issues(), [])

    def test_answer_and_verdict_must_follow_official_key(self):
        record = copy.deepcopy(self.record)
        record["correctChoice"] = 3
        record["choices"][2]["verdict"] = "correct"
        record["choices"][3]["verdict"] = "incorrect"
        joined = " ".join(self.issues(record))
        self.assertIn("correctChoice", joined)
        self.assertIn("choice 3 verdict", joined)
        self.assertIn("choice 4 verdict", joined)

    def test_requires_five_ordered_nonempty_reasons(self):
        record = copy.deepcopy(self.record)
        record["choices"] = record["choices"][:4]
        self.assertTrue(any("1..5" in i for i in self.issues(record)))
        record = copy.deepcopy(self.record)
        record["choices"][1]["reason"] = "  "
        self.assertTrue(any("empty reason" in i for i in self.issues(record)))

    def test_rejects_internal_notes(self):
        for note in ("HOLD", "要確認", "未確認", "FIX", "TODO", "https://example.com"):
            record = copy.deepcopy(self.record)
            record["choices"][0]["reason"] += note
            self.assertTrue(any("internal" in i for i in self.issues(record)), note)

    def test_rejects_invented_quotation_but_allows_verbatim(self):
        record = copy.deepcopy(self.record)
        record["choices"][3]["reason"] += "「温度差の四乗に比例」とする点が誤り。"
        self.assertEqual(self.issues(record), [])
        record["choices"][3]["reason"] += "「放射率は常に1である」"
        self.assertTrue(any("quotes" in i for i in self.issues(record)))

    def test_rejects_article_numbers_absent_from_sources(self):
        record = copy.deepcopy(self.record)
        record["choices"][0]["reason"] += "労働安全衛生法第59条による。三条件を満たす。"
        self.assertEqual(self.issues(record), [])
        record["choices"][0]["reason"] += "同規則第612条による。"
        self.assertTrue(any("article" in i for i in self.issues(record)))

    def test_stale_question_or_legacy_explanation_is_detected(self):
        target = copy.deepcopy(self.target)
        target["presentation"]["choices"][0]["text"] += "改"
        target["legacy"] += "追記"
        joined = " ".join(record_issues(self.qid, target, self.record, self.receipts))
        self.assertIn("questionFingerprint", joined)
        self.assertIn("basedOnLegacyExplanationHash", joined)

    def test_requires_provisional_flag_and_exact_model_receipt(self):
        record = copy.deepcopy(self.record)
        record["provisionalReview"] = False
        self.assertTrue(any("provisionalReview" in i for i in self.issues(record)))
        receipts = copy.deepcopy(self.receipts)
        receipts["X-q01"]["modelProof"]["modelUsage"]["claude-haiku-4-5"] = {}
        self.assertTrue(any("receipt invalid" in i for i in self.issues(receipts=receipts)))
        receipts = copy.deepcopy(self.receipts)
        receipts["X-q01"]["ids"] = []
        self.assertTrue(any("receipt missing" in i for i in self.issues(receipts=receipts)))


class ShardGateTest(unittest.TestCase):
    def test_exact_id_set_and_meta(self):
        target, record, receipts = fixture()
        qid = target["question"]["id"]
        wave = "lckohyo-wave-a"
        excluded = {"lckohyo-X-q9": "descriptive"}
        shard = {"meta": {"wave": wave, "papers": WAVES[wave], "provisionalReview": True,
                          "governmentSourceStrictReview": False, "excluded": excluded},
                 "entries": {qid: record}}
        self.assertEqual(validate_shard(wave, shard, {qid: target}, excluded, receipts), [])
        extra = copy.deepcopy(shard)
        extra["entries"]["lckohyo-X-q9"] = record
        self.assertTrue(any("unexpected IDs" in i
                            for i in validate_shard(wave, extra, {qid: target}, excluded, receipts)))
        self.assertTrue(any("missing IDs" in i for i in validate_shard(
            wave, shard, {qid: target, "lckohyo-X-q2": target}, excluded, receipts)))

    def test_strict_reviewed_ids_are_excluded_not_regenerated(self):
        with tempfile.TemporaryDirectory() as tmp:
            data = Path(tmp)
            (data / "papers").mkdir()
            (data / "presentation").mkdir()
            papers = WAVES["lckohyo-wave-a"]
            qs = {p: [] for p in papers}
            qs[papers[1]] = [
                {"id": "a-q1", "number": 1, "text": "t", "correctChoice": 2, "choiceCount": 5,
                 "answerAuthority": "official"},
                {"id": "a-q2", "number": 2, "text": "u", "correctChoice": 3, "choiceCount": 5,
                 "answerAuthority": "official"},
                {"id": "a-q3", "number": 3, "text": "v", "correctChoice": None, "choiceCount": 0,
                 "answerAuthority": "descriptive"}]
            for paper in papers:
                (data / "papers" / f"lckohyo-{paper}.json").write_text(json.dumps(qs[paper]))
                (data / "presentation" / f"lckohyo-{paper}.json").write_text(json.dumps(
                    {q["id"]: {"prompt": q["text"], "choices": []} for q in qs[paper]}))
            (data / "explanations.json").write_text(json.dumps({"a-q1": "x", "a-q2": "y"}))
            (data / "choice-explanations.json").write_text(json.dumps({"a-q2": {}}))
            targets, excluded = load_wave("lckohyo-wave-a", data)
            self.assertEqual(set(targets), {"a-q1"})
            self.assertEqual(set(excluded), {"a-q2", "a-q3"})


class CommittedShardTest(unittest.TestCase):
    def test_committed_wave_a_shard_passes_gate(self):
        path = shard_path("lckohyo-wave-a")
        self.assertTrue(path.exists(), path)
        targets, excluded = load_wave("lckohyo-wave-a")
        issues = validate_shard("lckohyo-wave-a", read(path), targets, excluded,
                                load_receipts("lckohyo-wave-a"))
        self.assertEqual(issues, [])


if __name__ == "__main__":
    unittest.main()
