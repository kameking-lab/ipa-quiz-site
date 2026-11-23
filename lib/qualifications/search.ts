import aliases from "./search-aliases.json";

interface SearchableQualification {
  key: string;
  name: string;
  abbr?: string;
  sub?: string;
  domainTitle?: string;
  searchTerms?: readonly string[];
  children?: readonly SearchableQualification[];
}

type SearchSurface = "home" | "browse" | "directory";

const kanjiDigits = "〇一二三四五六七八九";

function normalizeGradeNumber(value: string): string {
  const digits = value.replace(/[〇零一二三四五六七八九]/g, (digit) =>
    String(digit === "零" ? 0 : kanjiDigits.indexOf(digit)),
  );
  const [tens, units] = digits.split("十");
  return units === undefined ? digits : String(Number(tens || "1") * 10 + Number(units));
}

export function normalizeQualificationSearch(value: string): string {
  return value.normalize("NFKC").toLowerCase()
    .replace(/[ァ-ヶヽヾ]/g, (kana) => String.fromCharCode(kana.charCodeAt(0) - 0x60))
    .replace(/[ー\s\p{P}\p{S}]/gu, "")
    .replace(/[〇零一二三四五六七八九十]+(?=[級種類次号])/g, normalizeGradeNumber)
    .replace(/(?<=[甲乙])[一二三四五六七八九](?=$)/g, normalizeGradeNumber)
    .replace(/第(?=\d+[級種類次号])/g, "");
}

// Each row starts with the registered name, followed by the reading and other search terms.
const dictionary = new Map(Object.entries(aliases).map(([key, [name, ...terms]]) => [
  key,
  {
    name: normalizeQualificationSearch(name),
    terms: [...new Set(terms.map(normalizeQualificationSearch))],
  },
]));

function legacyText(value: string, surface: SearchSurface) {
  const normalized = value.normalize("NFKC").toLowerCase();
  return surface === "directory" ? normalized.replace(/\s/g, "") : normalized;
}

export function searchQualifications<T extends SearchableQualification>(
  items: readonly T[],
  query: string,
  surface: SearchSurface = "browse",
): T[] {
  const term = normalizeQualificationSearch(query);
  const legacyQuery = legacyText(query, surface);
  const legacyTerm = surface === "home" ? legacyQuery.trim() : legacyQuery;
  if (!term && !legacyTerm) return [];
  const words = query.split(/\s+/u).map(normalizeQualificationSearch).filter(Boolean);

  const legacy: T[] = [];
  const exactNames: T[] = [];
  const exactAliases: T[] = [];
  const prefixes: T[] = [];
  const parts: T[] = [];
  const exact = new Set<T>();
  const matchingCandidates = new Map<T, Map<SearchableQualification, boolean>>();
  const isShortAbbreviation = /^[a-z]{1,2}$/.test(term);

  for (const [item, candidate] of items.flatMap(item => [item, ...(item.children ?? [])].map(candidate => [item, candidate] as const))) {
    const entry = dictionary.get(candidate.key);
    const name = normalizeQualificationSearch(candidate.name);
    const abbr = normalizeQualificationSearch(candidate.abbr ?? "");
    const extraTerms = candidate.searchTerms?.map(normalizeQualificationSearch) ?? [];
    const exactName = !!term && (name === term || entry?.name === term);
    const exactAlias = !!term && (abbr === term || entry?.terms.includes(term) || extraTerms.includes(term));
    const isExact = exactName || exactAlias;
    if (isExact) exact.add(item);

    const display = surface === "directory"
      ? [candidate.name, candidate.abbr, candidate.sub, candidate.domainTitle].join(" ")
      : candidate.name + (candidate.abbr ?? "");

    // Keep existing hits in their original order. A short abbreviation such as FP
    // has to match the whole alias to rank above existing substring hits like CFP.
    let matches: T[] | undefined;
    if ((!isShortAbbreviation || !isExact) && legacyTerm && legacyText(display, surface).includes(legacyTerm)) {
      matches = legacy;
    } else if (exactName) {
      matches = exactNames;
    } else if (exactAlias) {
      matches = exactAliases;
    } else if (term && !isShortAbbreviation) {
      const terms = [name, abbr, entry?.name ?? "", ...(entry?.terms ?? []), ...extraTerms];
      if (terms.some((value) => value.startsWith(term))) matches = prefixes;
      else if (terms.some((value) => value.includes(term)) ||
        (extraTerms.length > 0 && words.length > 1 && words.every(word => terms.some(value => value.includes(word))))) matches = parts;
    }
    if (matches) {
      matches.push(item);
      const candidates = matchingCandidates.get(item) ?? new Map<SearchableQualification, boolean>();
      candidates.set(candidate, isExact);
      matchingCandidates.set(item, candidates);
    }
  }

  const matches = isShortAbbreviation
    ? [...exactNames, ...exactAliases, ...legacy]
    : [...legacy, ...exactNames, ...exactAliases, ...prefixes, ...parts];
  const uniqueMatches = [...new Set(matches)];
  // Keep the home preview compact, but show every exact candidate for a shared alias.
  return uniqueMatches.filter((item, index) => surface !== "home" || index < 6 || exact.has(item)).map(item => {
    const candidates = matchingCandidates.get(item);
    if (!candidates || candidates.has(item)) return item;
    // An exact section name can also be a substring of its sibling (e.g. 教養区分以外).
    const exactChildren = [...candidates].filter(([, isExact]) => isExact);
    const child = exactChildren.length === 1 ? exactChildren[0][0]
      : candidates.size === 1 ? candidates.keys().next().value : undefined;
    return child ? { ...item, ...child, children: undefined } : item;
  });
}
