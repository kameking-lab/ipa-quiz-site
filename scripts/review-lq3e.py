"""Run the owner-required read-only Astra review, retaining UTF-8 evidence."""
import subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
slug=sys.argv[1]; iteration=sys.argv[2] if len(sys.argv)>2 else '1'
out=ROOT/'reports/LQ3E-20261104'; out.mkdir(exist_ok=True)
dept={'textile':6,'metal':7,'resource':8}[slug]
prompt=f'''Independently review ONLY LQ3E {slug} 2024 (department {dept:02}), all 35 questions and 175 choice reasons.
Owner explicitly confirmed rights at 2026-11-04 01:30. Do not stop for rights or past acquisition STOPs. Do not bypass access restrictions. No edits, commits, pushes, PRs, deployment, credentials or environment dumps. Read-only review.
Review reports/LQ3B-20261104/manuscripts/pe-first-{slug}-2024.json and data/exam-library/pe-first/pe-first-{slug}-2024.json against the FULL original PDF reports/LQ3B-20261104/sources/2024-{dept:02}.pdf and official answer PDF sources/answers-2024.pdf in that same directory (answer page {dept+2}). Check every question, all five reasons, calculation details, correct/incorrect polarity (many ask for the least appropriate statement), all original figures/choices visible, page mappings, manifest pins, catalog loading/grading. Images may be inspected with tools; prepared contact sheets are reports/LQ3C-20261104/local/2024-{dept:02}-*.png. Full source-page images are in public/exam-library/pe-first-{slug}-2024. Image-only source questions intentionally preserve all wording, formulas and choices instead of uncorrected OCR. This matches the established accepted papers.
Do not assume official answer agreement proves reasons correct. Check niche facts using primary sources if necessary. Historical statistics/regulations must be interpreted at the time stated in each original question. Focus on material factual errors and missing source content, not optional full-text transcription. Check validation logs in reports/LQ3E-20261104 if present. Existing pre-task tests/logs are not proof of new content.
Return a Japanese acceptance report with explicit PASS or FAIL. If FAIL list each mandatory correction with Q number, choice, exact problem and corrected factual explanation. Do not give PASS if mandatory corrections remain. Review only this department and do not change LQ3D or earlier accepted content. Do not run other agents or create a canvas. This is a repository content review, not a standalone analytical artifact.
'''
if iteration!='1':
    prompt+='\nThis is a fresh acceptance re-review after fixes. Read earlier receipts and corrections.md in reports/LQ3E-20261104. Check the CURRENT manuscript, normalized data and pins; do not assume changes were applied. Confirm all previous mandatory findings fixed and look for remaining material problems.\n'
(out/f'{slug}-prompt-{iteration}.txt').write_text(prompt,encoding='utf8')
cmd=[r'C:\Users\kanet\AppData\Roaming\npm\codex.cmd','exec','-m','gpt-6-astra','-s','read-only','--ephemeral','-C',str(ROOT),'-o',str(out/f'astra-{slug}-{iteration}.md'),'-']
with (out/f'astra-{slug}-{iteration}-execution.log').open('wb') as log:
    result=subprocess.run(cmd,input=prompt.encode('utf8'),stdout=log,stderr=subprocess.STDOUT,cwd=ROOT)
print(f'{slug} Astra review {iteration} exitCode={result.returncode}')
sys.exit(result.returncode)
