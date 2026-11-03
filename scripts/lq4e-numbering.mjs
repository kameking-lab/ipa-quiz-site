// Basis has five groups of six printed questions, unlike the flat III numbering.
export function engineerNumbering(subject, number) {
  if (!Number.isInteger(number) || number < 1) return null;
  if (subject === 'basis' && number <= 30) {
    const group = Math.floor((number - 1) / 6) + 1;
    const item = (number - 1) % 6 + 1;
    return { printed: `Ⅰ－${group}－${item}`, official: `I-${group}-${item}`, idSuffix: `I-${group}-${item}` };
  }
  if (subject === 'mechanical' && number <= 35) return { printed: `Ⅲ－${number}`, official: `III-${number}`, idSuffix: `III-${String(number).padStart(2, '0')}` };
  return null;
}
