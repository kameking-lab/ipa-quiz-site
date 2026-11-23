const digits = "〇一二三四五六七八九";
const places: Record<string, number> = { 十: 10, 百: 100, 千: 1_000 };
const groups: Record<string, number> = { 万: 10_000, 億: 100_000_000, 兆: 1_000_000_000_000 };
const sentenceBreak = /[。！？；;\n]/u;

interface Quantity {
  amount: number;
  unit: string;
  label: string;
  index: number;
}

function readNumber(value: string) {
  let total = 0;
  let group = 0;
  let pending: number | undefined;
  for (const part of value.replace(/[,]/gu, "").match(/\d+(?:\.\d+)?|[〇零一二三四五六七八九十百千万億兆]/gu) ?? []) {
    if (groups[part]) {
      total += (group + (pending ?? (group === 0 ? 1 : 0))) * groups[part];
      group = 0;
      pending = undefined;
    } else if (places[part]) {
      group += (pending ?? 1) * places[part];
      pending = undefined;
    } else {
      const digit = part === "零" ? 0 : digits.indexOf(part);
      pending = digit >= 0 ? (pending ?? 0) * 10 + digit : Number(part);
    }
  }
  return total + group + (pending ?? 0);
}

function quantities(normalized: string) {
  const matches = normalized.matchAll(/([0-9〇零一二三四五六七八九十百千万億兆][0-9,.〇零一二三四五六七八九十百千万億兆]*?)\s*(万円|円|時間|分(?![析割類野布散岐担離解]|の[0-9〇零一二三四五六七八九十百千万])|件|[かカヶ箇]月|人(?![月日口前目材称]))/gu);
  const result: Quantity[] = [];
  for (const { 0: label, 1: numeral, 2: unit, index } of matches) {
    if (label === "十分" && (normalized[index - 1] === "不" ||
      /^(?:に|な|だ|です|で(?:ある|あった|はない|はなかった)|と(?:考|判))/u.test(normalized.slice(index + label.length)))) continue;
    const amount = readNumber(numeral);
    const multiplier = unit === "万円" ? 10_000 : unit === "時間" ? 60 : 1;
    const baseUnit = unit === "万円" ? "円" : unit === "時間" ? "分" : unit.endsWith("月") ? "か月" : unit;
    result.push({ amount: amount * multiplier, unit: baseUnit, label, index });
  }
  return result;
}

function end(quantity: Quantity) {
  return quantity.index + quantity.label.length;
}

const budgetLabel = /予算|上限/u;
const moneyDirection = /下回|上回|超過|超え|余[裕り]|収ま|(?:予算|上限)(?:の)?範囲内/u;

function statedBudget(text: string) {
  return quantities(text).find((value) => value.unit === "円" &&
    /(?:予算(?:総額|上限)?|上限)(?:は|が|の|[:：])?\s*$/u.test(text.slice(0, value.index)) &&
    !/^(?:超え|下回|上回|の超過)/u.test(text.slice(end(value))))?.amount;
}

function statedEstimate(text: string) {
  return quantities(text).find((value) => value.unit === "円" && (
    /^(?:で[、,]?(?:予算|上限)|を見込)/u.test(text.slice(end(value))) ||
    /(?:見込(?:み|額)?|総額(?:の)?見込み|再見積(?:り)?(?:額|の結果))(?:は|が|[:：])?\s*$/u.test(text.slice(0, value.index))
  ))?.amount;
}

function budgetComparisons(text: string) {
  const comparisons: { direction: number; difference?: number }[] = [];
  for (const sentence of text.normalize("NFKC").split(sentenceBreak)) {
    // Keep only statements about the estimate, rather than a trigger or expected effect of a measure.
    if (/超え(?:たら|る場合|そうな場合)|下回(?:ったら|る場合)|上回(?:ったら|る場合)/u.test(sentence)) continue;
    const relation = sentence.match(moneyDirection);
    if (!relation || !budgetLabel.test(sentence) && !/超過見込|超過額|超過とな/u.test(sentence)) continue;
    if (/(?:上回|超え)(?:られ)?な|超過しな/u.test(sentence)) continue;
    const direction = /下回|余[裕り]/u.test(relation[0]) ? -1 : /収ま|範囲内/u.test(relation[0]) ? 0 : 1;
    const offset = relation.index ?? 0;
    const difference = quantities(sentence).find((value) => value.unit === "円" && (
      /^(?:の)?$/u.test(sentence.slice(end(value), offset)) ||
      /^(?:差[額分]?(?:は|が)?|[、,]|見込[額み]?は)?$/u.test(sentence.slice(offset + relation[0].length, value.index)) && value.index > offset
    ));
    comparisons.push({ direction, difference: difference?.amount });
  }
  return comparisons;
}

export function hasGroundedBudgetResult(text: string, answers: readonly string[]) {
  const facts = answers.map((answer) => answer.normalize("NFKC"));
  const baseline = facts.map(statedBudget).find((amount) => amount !== undefined);
  const parts = facts.flatMap((fact) => fact.split(sentenceBreak));
  const estimate = parts.map(statedEstimate).find((amount) => amount !== undefined);
  const estimateResults = parts.filter((part) =>
    (budgetLabel.test(part) || /再見積|見込/u.test(part)) && moneyDirection.test(part));
  const differenceFromEstimate = baseline !== undefined && estimate !== undefined ? estimate - baseline : undefined;
  const known = differenceFromEstimate === undefined ? estimateResults.flatMap(budgetComparisons) :
    [{ direction: Math.sign(differenceFromEstimate), difference: Math.abs(differenceFromEstimate) }];
  const normalized = text.normalize("NFKC");
  const referencedBudget = statedBudget(normalized);
  const referencedEstimate = statedEstimate(normalized);
  if (referencedBudget !== undefined && baseline !== undefined && referencedBudget !== baseline) return false;
  if (referencedEstimate !== undefined && estimate !== undefined && referencedEstimate !== estimate) return false;
  const claims = budgetComparisons(normalized);
  return claims.length > 0 && claims.every(({ direction, difference }) => known.some((fact) =>
    (direction === 0 ? fact.direction <= 0 : direction === fact.direction) &&
    (difference === undefined || difference === fact.difference)));
}

function transitions(sentence: string, values: readonly Quantity[]) {
  return values.slice(1).flatMap((after, i) => {
    const before = values[i];
    if (before.unit !== after.unit) return [];
    const between = sentence.slice(end(before), after.index);
    const suffix = sentence.slice(end(after));
    if (!/^\s*→\s*$/u.test(between) &&
        !(/^(?:から|だったが)[、\s]*(?:(?:変更|改善|見直し|対策)後(?:は|の)?[、\s]*)?$/u.test(between) &&
          /^(?:に|へ|まで)(?:な|抑|増|減|下|上|改善|短縮|延長|変|伸|圧縮|でき|収ま|。|$)/u.test(suffix))) return [];
    return [{ before, after }];
  });
}

const timeUses = [/受入確認|受入試験/u, /移行作業|移行に/u, /予備時間|予備に/u, /判定|例外調査|リハーサル/u];

function sameMeasure(draft: string, source: string, unit: string) {
  if (unit !== "分") return true;
  const wanted = timeUses.find((pattern) => pattern.test(draft));
  const recorded = timeUses.find((pattern) => pattern.test(source));
  return !wanted || !recorded || wanted === recorded;
}

function hasStatedCalculation(sentence: string, value: Quantity, facts: readonly { text: string; values: Quantity[] }[]) {
  const prefix = sentence.slice(0, value.index);
  if (value.unit === "分" && /(?:計|合計)\s*$/u.test(prefix)) {
    // A total for identical durations at several sites is grounded by the count and per-site time in one answer.
    const sites = prefix.match(/([0-9〇零一二三四五六七八九十百]+)拠点[^、。]{0,8}(?:計|合計)\s*$/u);
    if (sites && facts.some(({ text }) => {
      const perSite = text.match(/([0-9〇零一二三四五六七八九十百]+)拠点[^、。]{0,8}(?:各\s*([0-9〇零一二三四五六七八九十百]+)分|([0-9〇零一二三四五六七八九十百]+)分ずつ)/u);
      return perSite && readNumber(sites[1]) === readNumber(perSite[1]) &&
        value.amount === readNumber(perSite[1]) * readNumber(perSite[2] ?? perSite[3]);
    })) return true;
  }
  const prior = quantities(prefix).slice(-2);
  const [left, right] = prior;
  if (!left || !right || left.unit !== value.unit || right.unit !== value.unit) return false;
  const joins = prefix.slice(end(left), right.index);
  const result = prefix.slice(end(right));
  const sum = /^(?:\+|と)$/u.test(joins) && /^(?:で)?(?:、?計|合計|を足すと|=)\s*$/u.test(result);
  const difference = /^(?:-|−|から)$/u.test(joins) && /^(?:を引くと|を差し引くと|の差は|=)\s*$/u.test(result);
  if (!sum && !difference) return false;
  return value.amount === (sum ? left.amount + right.amount : left.amount - right.amount) &&
    facts.some(({ values }) => [left, right].every((operand) =>
      values.some((known) => known.unit === operand.unit && known.amount === operand.amount)));
}

export function findUnsupportedWorkshopNumbers(body: string, answers: readonly string[]) {
  const facts = answers.map((answer) => {
    const text = answer.normalize("NFKC");
    return { text, values: quantities(text) };
  });
  const key = ({ amount, unit }: Quantity) => `${amount}${unit}`;
  const known = new Set(facts.flatMap(({ values }) => values.map(key)));
  const knownTransitions = facts.flatMap(({ text }) => text.split(sentenceBreak).flatMap((sentence) =>
    transitions(sentence, quantities(sentence)).map((pair) => ({ ...pair, sentence }))));
  const rejected = new Set<string>();
  for (const sentence of body.normalize("NFKC").split(sentenceBreak)) {
    const values = quantities(sentence);
    for (const value of values) {
      if (!known.has(key(value)) && !hasStatedCalculation(sentence, value, facts)) rejected.add(value.label);
    }
    for (const { before, after } of transitions(sentence, values)) {
      const relevant = knownTransitions.filter((pair) => pair.before.unit === before.unit &&
        (pair.before.amount === before.amount || pair.after.amount === after.amount ||
          pair.before.amount === after.amount || pair.after.amount === before.amount));
      if (relevant.length > 0 && !relevant.some((pair) =>
        pair.before.amount === before.amount && pair.after.amount === after.amount && sameMeasure(sentence, pair.sentence, before.unit))) {
        rejected.add(`${before.label}→${after.label}`);
      }
    }
  }
  return [...rejected];
}
