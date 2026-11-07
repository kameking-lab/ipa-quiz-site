import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { KishoStudyReader } from '@/components/kisho/KishoStudyReader';
import { KISHO_QUESTIONS } from '@/data/questions/kisho';
import { KISHO_STUDY_QUESTIONS, KISHO_STUDY_ASSETS } from '@/lib/kisho-study';
import { getQuestionsForExam } from '@/lib/questions/get-questions';
import { QUESTIONS_BY_EXAM } from '@/data/questions';
import { shuffleChoices } from '@/lib/questions/filter';
import { choiceDisplayLabel } from '@/lib/questions/display';
import { defaultPracticeSession, practiceSessionLabel } from '@/lib/questions/practice-session';
import { ipaSourceLabel } from '@/lib/exam-config';
import { questionSourceEdition } from '@/lib/questions/source-label';

describe('気象予報士の通常学習導線', () => {
  it('下書き復元前のSSRでは実技入力を無効にし、読込み前の入力消失を防ぐ', () => {
    const html = renderToStaticMarkup(<KishoStudyReader initialQuestionId="kisho-65-pm1-q05" />);
    const container = document.createElement('div');
    container.innerHTML = html;
    expect(container.querySelector('textarea')).toBeDisabled();
    expect(container.querySelector('main')).toHaveAttribute('data-study-ready', 'false');
  });
  it('通常レジストリと遅延取得が同じ60学科問を返し、公式肢順を維持する', async () => {
    expect(await getQuestionsForExam('kisho')).toEqual(KISHO_QUESTIONS);
    expect(QUESTIONS_BY_EXAM.kisho).toEqual(KISHO_QUESTIONS);
    expect(KISHO_QUESTIONS).toHaveLength(60);
    for (const q of KISHO_QUESTIONS) {
      expect(shuffleChoices(q)).toEqual(q);
      expect(Object.keys(q.choiceExplanations!)).toHaveLength(5);
      expect(q.imageUrls?.every(url => url.startsWith('/images/kisho/'))).toBe(true);
    }
    expect(choiceDisplayLabel('kisho', 'オ')).toBe('5');
    expect(defaultPracticeSession('kisho')).toBe('ippan');
    expect(practiceSessionLabel('ippan', 'kisho')).toBe('学科一般');
    expect(ipaSourceLabel(KISHO_QUESTIONS[0].sourcePdfUrl, 'question')).toContain('気象業務支援センター');
    expect(questionSourceEdition(KISHO_QUESTIONS[0])).toContain('第65回');
  });
  it('130公開画像の実体・ハッシュと全78問・237欄の参照が一致する', () => {
    expect(KISHO_STUDY_ASSETS.size).toBe(130);
    expect(KISHO_STUDY_QUESTIONS).toHaveLength(78);
    expect(KISHO_STUDY_QUESTIONS.reduce((n, q) => n + q.fields.length, 0)).toBe(237);
    expect(JSON.stringify(KISHO_STUDY_QUESTIONS)).not.toMatch(/\b[A-Z]:[\\/]|file:\/\//i);
    for (const asset of KISHO_STUDY_ASSETS.values()) {
      const bytes = fs.readFileSync(`public${asset.preparedPath}`);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(asset.sha256);
    }
    for (const item of KISHO_STUDY_QUESTIONS) {
      for (const page of [...item.source.questionPages, ...item.source.figurePages, ...item.source.officialAnswerPages]) {
        expect(KISHO_STUDY_ASSETS.has(page.assetId)).toBe(true);
      }
    }
  });
  it('公開readerで誤答・全肢理由・公式出典と公開画像を表示する', () => {
    render(<KishoStudyReader initialQuestionId="kisho-65-ippan-q01" />);
    fireEvent.click(screen.getByRole('radio', { name: /①/ }));
    fireEvent.click(screen.getByRole('button', { name: '答え合わせ' }));
    expect(screen.getByText('不正解')).toBeInTheDocument();
    expect(screen.getByText('全5肢の理由')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /公式問題・解答例/ })).toHaveAttribute('href', expect.stringContaining('cwfe_65_z1.zip'));
    expect(screen.getAllByRole('img', { hidden: true }).every(img => img.getAttribute('src')?.startsWith('/images/kisho/'))).toBe(true);
    expect(screen.queryByText(/公開不可/)).not.toBeInTheDocument();
  });
  it('実技の作図問題を自動採点せず、入力と解答例・手動照合を使える', () => {
    render(<KishoStudyReader initialQuestionId="kisho-65-pm1-q05" />);
    const section = screen.getByRole('region', { name: '実技の記述と手動照合' });
    expect(within(section).getByText(/記述答案は自動採点しません/)).toBeInTheDocument();
    const answer = within(section).getAllByRole('textbox')[0];
    fireEvent.change(answer, { target: { value: '北' } });
    const check = within(section).getAllByRole('checkbox')[0];
    expect(check).toBeEnabled();
    fireEvent.click(check);
    expect(check).toBeChecked();
    expect(screen.getAllByRole('img', { hidden: true }).some(img => img.getAttribute('alt') === '公式解答例の作図')).toBe(true);
  });
});
