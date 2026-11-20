import fy508Houki from './2023-july-fy508-houki.json';
import fb507KogakuB from './2023-july-fb507-kogaku-b.json';
import fa507KogakuA from './2023-july-fa507-kogaku-a.json';
import fk507Kiso from './2023-july-fk507-kiso.json';
import fy507Houki from './2023-july-fy507-houki.json';
import jul2025KogakuB from './2025-july-kogaku-b.json';
import jul2025KogakuA from './2025-july-kogaku-a.json';
import jul2025Kiso from './2025-july-kiso.json';
import jul2025Houki from './2025-july-houki.json';
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
  ...fy508Houki,
  ...fb507KogakuB,
  ...fa507KogakuA,
  ...fk507Kiso,
  ...fy507Houki,
  ...janHouki,
  ...janKiso,
  ...janKogakuA,
  ...janKogakuB,
  ...julHouki,
  ...julKiso,
  ...julKogakuA,
  ...julKogakuB,
  ...jul2025Houki,
  ...jul2025KogakuB,
  ...jul2025KogakuA,
  ...jul2025Kiso,
].map(normalizeQuestionData);
