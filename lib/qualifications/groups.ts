interface QualificationGroup {
  slug: string;
  name: string;
  kind: string;
  selectLabel: string;
  members: Readonly<Record<string, string>>;
  library?: { group: string; subjectPrefix: string; labelSuffix: string };
}

// Exam codes are the existing child routes. Library subjects use their catalog keys.
export const QUALIFICATION_GROUPS: readonly QualificationGroup[] = [
  {
    slug: "chori", name: "調理師試験", kind: "都道府県別", selectLabel: "地域",
    members: {
      "chori-center": "共通問題", "chori-hokkaido": "北海道", "chori-tochigi": "栃木県",
      "chori-gunma": "群馬県", "chori-kanagawa": "神奈川県", "chori-nagano": "長野県",
      "chori-shizuoka": "静岡県", "chori-kansai": "関西広域連合", "yamaguchi-chori": "山口県", "chori-ehime": "愛媛県",
      "chori-okinawa": "沖縄県",
    },
  },
  {
    slug: "gijutsushi-first", name: "技術士第一次試験", kind: "科目・部門別", selectLabel: "科目・部門",
    members: {
      "gijutsushi1-kiso": "基礎科目", "gijutsushi1-tekisei": "適性科目",
      "gijutsushi1-kikai": "機械部門", "gijutsushi1-kensetsu": "建設部門",
    },
    library: { group: "pe-first", subjectPrefix: "技術士第一次・", labelSuffix: "部門" },
  },
  {
    slug: "tohan", name: "登録販売者試験", kind: "ブロック別", selectLabel: "ブロック",
    members: {
      "tohan-hokkaido-tohoku": "北海道・東北", "tohan-kitakanto-koshinetsu": "北関東・甲信越",
      "tohan-tokai-hokuriku": "東海・北陸", tohan: "関西広域連合・東京都",
      "tohan-chugoku-shikoku": "中国・四国", "tohan-kyushu-okinawa": "九州・沖縄",
    },
  },
  {
    slug: "junkango", name: "准看護師試験", kind: "地域・日程別", selectLabel: "地域・日程",
    members: { "junkango-saitama": "埼玉県", "junkango-kansai": "関西広域連合", "junkango-b": "B日程" },
  },
  {
    slug: "dokugeki", name: "毒物劇物取扱者試験", kind: "都道府県別", selectLabel: "地域",
    members: { "dokugeki-chiba": "千葉県", "dokugeki-tokyo": "東京都", "dokugeki-kansai": "関西広域連合" },
  },
  {
    slug: "kyoin", name: "教員採用試験", kind: "自治体別", selectLabel: "自治体",
    members: {
      "kyoin-gunma": "群馬県", "kyoin-tokyo": "東京都", "kyoin-nagano": "長野県", "kyoin-gifu": "岐阜県",
      "kyoin-osaka": "大阪府", "kyoin-kobe": "神戸市", "kyoin-shimane": "島根県", "kyoin-hiroshima": "広島県・広島市",
      "kyoin-kochi": "高知県", "kyoin-nagasaki": "長崎県", "kyoin-okinawa": "沖縄県",
    },
  },
  {
    slug: "kokka-sogo", name: "国家公務員採用総合職試験", kind: "試験区分別", selectLabel: "試験区分",
    members: {
      "kokka-sogo-in": "院卒者試験",
      "kokka-sogo-dai": "大卒程度試験（教養区分以外）",
      "kokka-sogo-kyoyo": "大卒程度試験（教養区分）",
    },
  },
];

const groupMembers = new Map(QUALIFICATION_GROUPS.flatMap(group => Object.entries(group.members)
  .map(([key, label], order) => [key, { group, label, order }] as const)));

export function qualificationGroupMember(key: string) {
  const member = groupMembers.get(key);
  if (member) return member;
  for (const group of QUALIFICATION_GROUPS) {
    if (!group.library) continue;
    const prefix = `${group.library.group}-${group.library.subjectPrefix}`;
    if (key.startsWith(prefix) && key.length > prefix.length) {
      return { group, label: key.slice(prefix.length) + group.library.labelSuffix, order: Object.keys(group.members).length };
    }
  }
}

export function qualificationGroupPath(slug: string) {
  return `/qualifications/${slug}`;
}

export function qualificationGroupKey(slug: string) {
  return `group:${slug}`;
}

export function qualificationDisplayKey(key: string) {
  const member = qualificationGroupMember(key);
  return member ? qualificationGroupKey(member.group.slug) : key;
}

export function qualificationGroupLabel(group: QualificationGroup, count: number) {
  return `${group.name}（${group.kind} ${count}）`;
}

export function groupQualifications<T>(items: readonly T[], keyOf: (item: T) => string) {
  type Child = { item: T; label: string; order: number };
  type Group = { group: QualificationGroup; children: Child[] };
  const groups = new Map<string, Group>();
  const rows: ({ item: T } | Group)[] = [];
  for (const item of items) {
    const member = qualificationGroupMember(keyOf(item));
    if (!member) {
      rows.push({ item });
      continue;
    }
    let row = groups.get(member.group.slug);
    if (!row) {
      row = { group: member.group, children: [] };
      groups.set(member.group.slug, row);
      rows.push(row);
    }
    row.children.push({ item, label: member.label, order: member.order });
  }
  for (const row of groups.values()) row.children.sort((a, b) => a.order - b.order);
  return rows;
}
