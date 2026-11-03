import janHouki from './2026-january-houki.json';
import janKiso from './2026-january-kiso.json';
import janKogakuA from './2026-january-kogaku-a.json';
import janKogakuB from './2026-january-kogaku-b.json';
import julHouki from './2026-july-houki.json';
import julKiso from './2026-july-kiso.json';
import julKogakuA from './2026-july-kogaku-a.json';
import julKogakuB from './2026-july-kogaku-b.json';
import { normalizeQuestionData } from '@/lib/questions/native-b';

export const RIKU_TECH1_QUESTIONS = [
  ...janHouki,
  ...janKiso,
  ...janKogakuA,
  ...janKogakuB,
  ...julHouki,
  ...julKiso,
  ...julKogakuA,
  ...julKogakuB,
].map(normalizeQuestionData);
