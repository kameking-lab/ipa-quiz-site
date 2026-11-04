"""Continue fixed, previously accepted LQ5 packets; never generate exam content."""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
DOC = Path('C:/Users/kanet/Documents/Codex')
OUT = ROOT / 'reports/lq5-20261104'
OUT.mkdir(parents=True, exist_ok=True)
def read(p):
    return json.loads(Path(p).read_text(encoding='utf-8-sig'))
def write(p, d):
    p = ROOT / p
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
def edit(p, old, new):
    p = ROOT / p
    s = p.read_text(encoding='utf-8')
    assert old in s, (p, old)
    p.write_text(s.replace(old, new), encoding='utf-8')
def copy(source, target):
    target = ROOT / target
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)
    return {'source': str(source), 'target': str(target.relative_to(ROOT)), 'sha256': hashlib.sha256(target.read_bytes()).hexdigest()}

beauty = DOC / '2026-10-23/task-6/biyoshi-native-payload-20261024/final-05'
bindings = []
for name in ['2026-first.json', '2026-second.json', 'study-mask.json']:
    bindings.append(copy(beauty / 'product/data/questions/biyoshi' / name, 'data/questions/biyoshi/' + name))
for p in (beauty / 'product/public').rglob('*.png'):
    bindings.append(copy(p, str(p.relative_to(beauty / 'product'))))
mask = read(beauty / 'product/data/questions/biyoshi/study-mask.json')
holds = [
    {'id': 'biyoshi-2026-first-gakka-q6', 'reason': 'needsReview解除拒否を維持。内容受入と公開可能性を区別する。'},
    {'id': 'biyoshi-2026-first-gakka-q48', 'reason': '全肢の根拠HOLD。既存の受入条件未充足。'},
    {'id': 'biyoshi-2026-second-gakka-q50', 'reason': '真正な無印原図未確認。公式raster矢印4と正答赤丸が重なる。SVG再構成・推測加工の停止を維持。'},
    {'id': 'biyoshi-2026-second-gakka-q55', 'reason': 'needsReview解除拒否を維持。既存原図も公開採用しない。'},
    {'id': 'tsushin2-2025-late-gakka-q21', 'reason': '既存の参照専用HOLDを維持。通常採点・履歴・復習には含めない。'},
]
write('reports/lq5-20261104/holds.json', holds)
(ROOT / 'data/questions/biyoshi/index.ts').write_text('''import type { Question } from "@/lib/questions/types";
import first from "./2026-first.json";
import second from "./2026-second.json";
import mask from "./study-mask.json";

const reviewed = new Set(mask.reviewedQuestionIds);
const excluded = new Set(mask.excludedIds);
/** Reuse the exact accepted 106; an accepted explanation cannot lift a recorded hold. */
export const BIYOSHI_QUESTIONS: Question[] = ([...first, ...second] as Question[]).filter(
  q => reviewed.has(q.id) && !excluded.has(q.id) && q.needsReview === false,
);
''', encoding='utf-8')

packets = {
    'kikenbutsu-otsu1': DOC / '2026-11-01/qual-new20-private-20261101/outputs/source-bound/candidate.json',
    'kikenbutsu-otsu2': DOC / '2026-11-01/qual-new21-private-20261101/outputs/official-bound/questions.json',
    'kikenbutsu-otsu6': DOC / '2026-11-01/qual-new25-private-20261101/outputs/bound-past-questions/QUESTIONS.json',
}
keys = set(['id','exam','session','year','season','qNumber','subject','officialAnswerNumber','type','category','topicTags','difficulty','question','originalContent','questionNotice','choiceFactTruth','explanationSections','choices','answer','explanation','choiceExplanations','explanationCoverage','hasImage','imageUrls','imageAltTexts','sourcePdfUrl','sourceAnswerUrl','sourceAttribution','officialReferenceUrls','license','needsReview'])
for exam, source in packets.items():
    packet = read(source)
    qs = packet['questions'] if isinstance(packet, dict) else packet
    assert len(qs) == 10 and sorted(q['qNumber'] for q in qs) == list(range(26,36))
    bindings.append(copy(source, f'data/questions/{exam}/accepted-source.json'))
    normalized = []
    for q in qs:
        n = {k:v for k,v in q.items() if k in keys}
        # Numeric year indexes the public edition, never the undisclosed exam date.
        n.update(exam=exam, year=2026, season='published', session='gakka', sourceExamYear=None,
                 sourceExamSession=None, publicationVersion='2026-06', difficulty=2,
                 category=q.get('category', '危険物の性質・火災予防・消火'),
                 topicTags=q.get('topicTags', [exam]), license='SHOUBO-owner-authorized', needsReview=False)
        n['questionNotice'] = '2026年6月公表版。令和7年度以前に出題された問題の一部です。個別の出題年度・回は公表されていません。'
        if q.get('sourcePage'):
            n['sourcePdfUrl'] = q['sourcePdfUrl'].split('#')[0] + '#page=' + str(q['sourcePage'])
            n['sourceAnswerUrl'] = q['sourceAnswerUrl'].split('#')[0] + '#page=' + str(q['sourceAnswerPage'])
        if n.get('imageUrls'):
            paths=[]
            for image in n['imageUrls']:
                target=f'public/images/questions/{exam}/{Path(image).name}'
                bindings.append(copy(source.parent / image, target))
                paths.append('/' + target.removeprefix('public/'))
            n['imageUrls']=paths
        if exam == 'kikenbutsu-otsu2' and n.get('originalContent'):
            # Full question already contains A-D/A-E, the complete table and note.
            # Keep raw originals in accepted-source; avoid repeating them in the UI.
            n['originalContent'] = {k:v for k,v in n['originalContent'].items() if k not in ['sharedPassages','tables','postOptionNote']}
            if n['qNumber'] == 30:
                n['hasImage'] = False
                n.pop('imageUrls',None)
                n.pop('imageAltTexts',None)
        normalized.append(n)
    write(f'data/questions/{exam}/published-202606.json', normalized)
    (ROOT / f'data/questions/{exam}/index.ts').write_text(f'import type {{ Question }} from "@/lib/questions/types";\nimport questions from "./published-202606.json";\nexport const QUESTIONS = questions as Question[];\n', encoding='utf-8')

codes = ['biyoshi', *packets]
quoted = ', '.join(json.dumps(x) for x in codes)
edit('lib/questions/types.ts', '  | "gas-hei";', '  | "gas-hei"\n' + ''.join(f'  | "{x}"\n' for x in codes).rstrip() + ';')
edit('lib/questions/types.ts', ' | "gas-hei">;', ' | "gas-hei" | ' + ' | '.join(json.dumps(x) for x in codes) + '>;')
edit('lib/questions/types.ts', '  year: number;\n  season: Season;', '  /** For published excerpts this is the publication year, not the exam year. */\n  year: number;\n  sourceExamYear?: number | null;\n  sourceExamSession?: string | null;\n  publicationVersion?: string;\n  season: Season;')
edit('lib/questions/types.ts', ' | "JIA-attributed";', ' | "JIA-attributed" | "SHOUBO-owner-authorized";')
edit('lib/questions/display.ts', 'const PLAIN_NUMBER_CHOICE_EXAMS: readonly ExamCode[] = [', f'const PLAIN_NUMBER_CHOICE_EXAMS: readonly ExamCode[] = [{quoted}, ')
edit('scripts/validate-questions.ts', '"gas-hei"]),', f'"gas-hei", {quoted}]),')
edit('scripts/validate-questions.ts', '"JIA-attributed"]),', '"JIA-attributed", "SHOUBO-owner-authorized"]),')

names = {'biyoshi':'美容師', **{f'kikenbutsu-otsu{i}':f'危険物取扱者 乙種第{i}類' for i in [1,2,6]}}
configs = []
for exam, name in names.items():
    count=55 if exam=='biyoshi' else 10
    seasons='["first", "second"]' if exam=='biyoshi' else '["published"]'
    categories='["美容師筆記"]' if exam=='biyoshi' else '["危険物の性質並びにその火災予防及び消火の方法"]' if exam.endswith('2') else '["危険物の性質・火災予防・消火"]'
    configs.append(f'  "{exam}": {{ code: "{exam}", nameFull: "{name}", urlSlug: "{exam}", level: "basic", sessions: [{{ session: "gakka", urlSlug: "gakka", expectedQuestions: {count}, label: "筆記", categories: {categories} }}], seasons: {seasons}, yearRange: {{ start: 2026, end: 2026 }} }},\n')
edit('lib/exam-config.ts', 'export const EXAM_CONFIGS: Record<ExamCode, ExamConfig> = {', 'export const EXAM_CONFIGS: Record<ExamCode, ExamConfig> = {\n' + ''.join(configs))
edit('lib/exam-config.ts', '"gas-hei"] as string[]', f'"gas-hei", {quoted}] as string[]')
for p, marker in [('lib/utils.ts','export const EXAM_LABELS: Record<string, string> = {'),('lib/seo/exam-meta.ts','const EXAM_FULL_NAMES: Record<ExamCode, string> = {')]:
    edit(p, marker, marker+'\n'+''.join(f'  "{e}": "{n}",\n' for e,n in names.items()))

imports='import { BIYOSHI_QUESTIONS } from "./biyoshi";\n'+''.join(f'import {{ QUESTIONS as OT{i}_QUESTIONS }} from "./kikenbutsu-otsu{i}";\n' for i in [1,2,6])
edit('data/questions/index.ts', 'export const QUESTIONS_BY_EXAM:', imports+'\nexport const QUESTIONS_BY_EXAM:')
edit('data/questions/index.ts', 'Partial<Record<ExamCode, Question[]>> = {', 'Partial<Record<ExamCode, Question[]>> = {\n  biyoshi: BIYOSHI_QUESTIONS,\n'+''.join(f'  "kikenbutsu-otsu{i}": OT{i}_QUESTIONS,\n' for i in [1,2,6]))
edit('lib/questions/get-questions.ts', 'const EXAM_LOADERS:', 'const EXAM_LOADERS:') if False else None
loader = (ROOT/'lib/questions/get-questions.ts').read_text(encoding='utf-8')
marker='= {'
idx=loader.index(marker,loader.index('EXAM_LOADERS'))+len(marker)
loader=loader[:idx]+'\n  biyoshi: async () => (await import("@/data/questions/biyoshi")).BIYOSHI_QUESTIONS,\n'+''.join(f'  "{e}": async () => (await import("@/data/questions/{e}")).QUESTIONS,\n' for e in packets)+loader[idx:]
(ROOT/'lib/questions/get-questions.ts').write_text(loader,encoding='utf-8')

entries=[]
for exam,name in names.items():
    beautyExam=exam=='biyoshi'
    url='https://www.rbc.or.jp/exam/past_question/' if beautyExam else 'https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html'
    summary='第53・54回の筆記各55問から確認済み各53問（計106問）を収録。4問は図・根拠・解除拒否の既存保留を維持。実技・2暦年全体の完成を意味しません。' if beautyExam else '2026年6月公表版の実出題抜粋・問26〜35の10問と全50肢解説。令和7年度以前の出題で、個別年度・回は非公表。特定回全35問や最新2回の収録ではありません。'
    entry={'slug':exam,'examCode':exam,'shortName':name,'fullName':name,'domain':'personal-services' if beautyExam else 'safety','administrator':'公益財団法人理容師美容師試験研修センター' if beautyExam else '一般財団法人消防試験研究センター','officialQuestionsUrl':url,'officialReuseTermsUrl':url,'status':'live','reuseSummary':summary,'remainingWork':['第53回問6・48、第54回問50・55の既存保留を維持'] if beautyExam else []}
    entries.append(json.dumps(entry,ensure_ascii=False,indent=2)+',\n')
edit('lib/qualifications/catalog.ts','export const QUALIFICATION_CATALOG: readonly QualificationCatalogEntry[] = [','export const QUALIFICATION_CATALOG: readonly QualificationCatalogEntry[] = [\n'+''.join(entries))
home='  { code: "biyoshi", name: "美容師", sub: "第53・54回の確認済み106問（4問保留）", domain: "welfare" },\n'+''.join(f'  {{ code: "kikenbutsu-otsu{i}", name: "危険物取扱者 乙種第{i}類", sub: "2026年6月公表版・性質/消火の実出題抜粋10問", domain: "safety" }},\n' for i in [1,2,6])
edit('lib/home/home-directory.ts','  { code: "riyoshi",',home+'  { code: "riyoshi",')
# Existing source edition helper is extended, rather than replacing other qualifications.
edit('lib/questions/source-label.ts','  const riyoshiPaper =', '''  if (q.exam === "biyoshi" && q.year === 2026) {
    if (q.season === "first") return "第53回（2026年3月1日実施）";
    if (q.season === "second") return "第54回（2026年9月6日実施）";
  }
  if (q.exam?.startsWith("kikenbutsu-otsu") && q.season === "published") return "2026年6月公表版（個別の出題年・回は非公表）";
  const riyoshiPaper =''')
write('reports/lq5-20261104/reused-files.json', bindings)
write('reports/lq5-20261104/scope.json', {'rightsDecision':'【オーナー決定 2026-11-04 01:30】今ダッシュボードに出ている資格は全て権利問題ないので止めるな','rightsVerified':True,'beauty':{'pool':106,'expected':110,'holds':4,'reasons':424,'source':str(beauty)},'telecom':{'materials':130,'scored':129,'reference':1,'inheritedCommit':'33fbd0a185a1c04574329716e44eb2f787c2bca4'},'hazardous':{'each':10,'total':30,'reasons':150,'edition':'2026-06','examYear':None,'examSession':None,'latestTwoSittingsComplete':False}})
print('Reused accepted 106 + 30 questions; inherited telecom 130. Content creation: zero.')
