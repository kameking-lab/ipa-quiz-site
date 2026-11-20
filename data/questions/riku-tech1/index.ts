import fy408Houki from './2022-july-fy408-houki.json';
import fb407KogakuB from './2022-july-fb407-kogaku-b.json';
import fa407KogakuA from './2022-july-fa407-kogaku-a.json';
import fk407Kiso from './2022-july-fk407-kiso.json';
import fy407Houki from './2022-july-fy407-houki.json';
import fb502KogakuB from './2023-january-fb502-kogaku-b.json';
import fa502KogakuA from './2023-january-fa502-kogaku-a.json';
import fk502Kiso from './2023-january-fk502-kiso.json';
import fy502Houki from './2023-january-fy502-houki.json';
import fb501KogakuB from './2023-january-fb501-kogaku-b.json';
import fa501KogakuA from './2023-january-fa501-kogaku-a.json';
import fk501Kiso from './2023-january-fk501-kiso.json';
import fy501Houki from './2023-january-fy501-houki.json';
import fb508KogakuB from './2023-july-fb508-kogaku-b.json';
import fa508KogakuA from './2023-july-fa508-kogaku-a.json';
import fk508Kiso from './2023-july-fk508-kiso.json';
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
  ...fy408Houki,
  ...fb407KogakuB,
  ...fa407KogakuA,
  ...fk407Kiso,
  ...fy407Houki,
  ...fb502KogakuB,
  ...fa502KogakuA,
  ...fk502Kiso,
  ...fy502Houki,
  ...fb501KogakuB,
  ...fa501KogakuA,
  ...fk501Kiso,
  ...fy501Houki,
  ...fb508KogakuB,
  ...fa508KogakuA,
  ...fk508Kiso,
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
