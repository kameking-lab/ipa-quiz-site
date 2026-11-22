const seasonNames: Record<string, readonly string[]> = {
  spring: ["spring"], autumn: ["autumn"], fall: ["autumn"], "春": ["spring"], "春期": ["spring"],
  "秋": ["autumn"], "秋期": ["autumn"], "前期": ["early", "first"], zenki: ["early", "first"],
  "後期": ["late", "second"], kouki: ["late", "second"], "上期": ["first", "early"], "下期": ["second", "late"],
};
const sectionNames: Record<string, readonly string[]> = {
  "午前": ["am"], "午後": ["pm"], "午前1": ["am1"], "午前i": ["am1"], "午前2": ["am2"], "午前ii": ["am2"],
  "午後1": ["pm1"], "午後i": ["pm1"], "午後2": ["pm2"], "午後ii": ["pm2"], "科目a": ["kamoku-a"], "科目b": ["kamoku-b"],
  a: ["kamoku-a"], b: ["kamoku-b"],
  "am-i": ["am1"], "am-ii": ["am2"], "pm-i": ["pm1"], "pm-ii": ["pm2"],
};
export function legacyExamPath(path: string) {
  let parts: string[];
  try { parts = path.slice(1).split("/").map(part => decodeURIComponent(part)); } catch { return null; }
  const questionPath = parts[0] === "q";
  if (questionPath) parts.shift();
  if (parts.length < (questionPath ? 4 : 2) || parts.length > (questionPath ? 5 : 3)) return null;
  const [exam, ...rest] = parts;
  if (!/^[a-z0-9-]+$/i.test(exam)) return null;
  const editionRaw = rest.slice(0, questionPath ? -2 : undefined).join("-");
  const edition = editionRaw.normalize("NFKC").toLowerCase();
  const section = questionPath ? rest.at(-2)!.normalize("NFKC").toLowerCase() : undefined;
  const question = questionPath ? rest.at(-1)!.normalize("NFKC").toLowerCase() : undefined;
  if (section && !/^[a-z0-9ぁ-ん一-龯-]+$/.test(section)) return null;
  const number = question && /^(?:q|問)?0*(\d+)([ab]|-[1-5])?$/.exec(question);
  if (questionPath && !number) return null;
  const qnum = number ? "q" + number[1] + (number[2] ?? "") : undefined;
  const round = /^(?:第)?(\d{1,3})回$/.exec(edition);
  const dated = /^(?:(\d{4})|([rh]|令和|平成)(元|\d{1,2}))(?:年度|年)?(?:[-_ ]?([a-z0-9一-龯]+))?$/.exec(edition);
  if (!round && !dated) return null;
  if (dated?.[2] && !/^(?:元|[1-9]\d?)$/.test(dated[3])) return null;
  const year = dated?.[1] ? Number(dated[1]) : dated
    ? (/^(r|令和)$/.test(dated[2]) ? 2018 : 1988) + (dated[3] === "元" ? 1 : Number(dated[3])) : null;
  const season = dated?.[4];
  const hasCanonicalEdition = /^\d{4}-[a-z0-9]+$/.test(editionRaw) &&
    !["fall", "zenki", "kouki"].includes(season ?? "");
  if (parts.length === (questionPath ? 4 : 2) && hasCanonicalEdition &&
      exam === exam.toLowerCase() && (!questionPath || ((section === rest.at(-2) || /^gakka-I{1,3}$|^gakka-IV$/.test(rest.at(-2)!)) && !Object.hasOwn(sectionNames, section!) && qnum === rest.at(-1)))) return null;
  const roundSuffix = season && /^(?:第)?(\d{1,3})回$/.exec(season);
  return { exam: exam.toLowerCase(), year, round: round ? Number(round[1]) : roundSuffix ? Number(roundSuffix[1]) : null,
    seasons: season && !roundSuffix ? (Object.hasOwn(seasonNames, season) ? seasonNames[season] : [season]) : null,
    sections: section ? (Object.hasOwn(sectionNames, section) ? sectionNames[section] : [section]) : null, qnum };
}
