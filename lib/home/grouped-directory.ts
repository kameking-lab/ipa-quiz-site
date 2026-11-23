import type { HomeDirectoryDomain, HomeDirectoryItem } from "./home-directory";
import { groupQualifications, qualificationGroupKey, qualificationGroupLabel, qualificationGroupPath } from "@/lib/qualifications/groups";

export function groupHomeDirectoryItems<T extends HomeDirectoryItem>(items: readonly T[]): T[] {
  return groupQualifications(items, item => item.key).map(row => {
    if ("item" in row) return row.item;
    const { group, children } = row;
    return {
      ...children[0].item,
      key: qualificationGroupKey(group.slug),
      name: qualificationGroupLabel(group, children.length),
      href: qualificationGroupPath(group.slug),
      questionCount: children.reduce((sum, child) => sum + child.item.questionCount, 0),
      abbr: undefined,
      sub: undefined,
      extra: undefined,
      historyPrefixes: undefined,
      periodLabel: "",
      children: children.map(({ item, label }) => ({
        ...item,
        searchTerms: [label, group.name + label, group.name.replace(/試験$/, "") + label],
      })),
      searchTerms: [group.name],
    };
  });
}

export function groupHomeDirectory(domains: readonly HomeDirectoryDomain[]): HomeDirectoryDomain[] {
  const items = groupHomeDirectoryItems(domains.flatMap(domain => [
    ...domain.featured.map(item => ({ ...item, domainId: domain.id, featured: true })),
    ...domain.compact.map(item => ({ ...item, domainId: domain.id, featured: false })),
  ]));
  return domains.flatMap(domain => {
    const entries = items.filter(item => item.domainId === domain.id);
    if (!entries.length) return [];
    return [{
      ...domain,
      featured: entries.filter(item => item.featured),
      compact: entries.filter(item => !item.featured),
      qualificationCount: entries.length,
      totalQuestions: entries.reduce((sum, item) => sum + item.questionCount, 0),
    }];
  });
}
