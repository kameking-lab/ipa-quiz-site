import {
  isHealthConsultantSubject,
  type ExamCatalogEntry,
  type ExamGroupId,
} from "@/lib/exam-library-model";

export const QUALIFICATION_HUB_PATH = "/e-learning/exams/qualifications";

type QualificationHubScope =
  | { kind: "subjects"; names: readonly string[] }
  | { kind: "group" }
  | { kind: "safety-consultant" }
  | { kind: "health-consultant" };

export interface QualificationHub {
  slug: string;
  name: string;
  group: ExamGroupId;
  description: string;
  scope: QualificationHubScope;
}

/**
 * 検索需要が高く、公式カタログに複数の公表問題がある資格だけを恒久URLにする。
 * 科目名は official-catalog.json の値と完全一致させ、測定士とコンサルタントを
 * 同名科目（例: 労働衛生一般）だけで判定しない。
 */
export const QUALIFICATION_HUBS: readonly QualificationHub[] = [
  {
    slug: "dai-1-shu-eisei-kanrisha",
    name: "第一種衛生管理者",
    group: "lckohyo",
    description:
      "第一種衛生管理者の公表過去問を公表回別に解けます。公式正答を確認できる問題はその場で採点し、間違えた問題を解き直せます。",
    scope: { kind: "subjects", names: ["第一種衛生管理者"] },
  },
  {
    slug: "dai-2-shu-eisei-kanrisha",
    name: "第二種衛生管理者",
    group: "lckohyo",
    description:
      "第二種衛生管理者の公表過去問を公表回別に解けます。公式正答を確認できる問題はその場で採点し、間違えた問題を解き直せます。",
    scope: { kind: "subjects", names: ["第二種衛生管理者"] },
  },
  {
    slug: "ni-kyu-boiler-gishi",
    name: "二級ボイラー技士",
    group: "lckohyo",
    description:
      "二級ボイラー技士の公表過去問を公表回別に解けます。公式正答を確認できる問題はその場で採点し、間違えた問題を解き直せます。",
    scope: { kind: "subjects", names: ["二級ボイラー技士"] },
  },
  {
    slug: "crane-derrick-unlimited",
    name: "クレーン・デリック運転士（限定なし）",
    group: "lckohyo",
    description:
      "クレーン・デリック運転士（限定なし）の公表過去問を公表回別に解けます。公式正答で採点し、間違えた問題を解き直せます。",
    scope: { kind: "subjects", names: ["クレーン・デリック運転士（限定なし）"] },
  },
  {
    slug: "sagyo-kankyo-sokuteishi",
    name: "作業環境測定士",
    group: "emkohyo",
    description:
      "作業環境測定士の公表過去問を、共通科目と選択科目に分けて試験回別に解けます。測定士試験の科目だけを掲載しています。",
    scope: { kind: "group" },
  },
  {
    slug: "rodo-anzen-consultant",
    name: "労働安全コンサルタント",
    group: "cskohyo",
    description:
      "労働安全コンサルタントの公表過去問を、産業安全一般・関係法令・専門科目に分けて試験回別に学習できます。",
    scope: { kind: "safety-consultant" },
  },
  {
    slug: "rodo-eisei-consultant",
    name: "労働衛生コンサルタント",
    group: "cskohyo",
    description:
      "労働衛生コンサルタントの公表過去問を、労働衛生一般・関係法令・専門科目に分けて試験回別に学習できます。",
    scope: { kind: "health-consultant" },
  },
] as const;

export function qualificationHubPath(slug: string): string {
  return `${QUALIFICATION_HUB_PATH}/${slug}`;
}

export function findQualificationHub(slug: string): QualificationHub | undefined {
  return QUALIFICATION_HUBS.find((hub) => hub.slug === slug);
}

export function qualificationHubMatchesEntry(
  hub: QualificationHub,
  entry: Pick<ExamCatalogEntry, "group" | "subject">,
): boolean {
  if (entry.group !== hub.group) return false;
  switch (hub.scope.kind) {
    case "subjects":
      return hub.scope.names.includes(entry.subject);
    case "group":
      return true;
    case "safety-consultant":
      return !isHealthConsultantSubject(entry.subject);
    case "health-consultant":
      return isHealthConsultantSubject(entry.subject);
  }
}

export function qualificationHubForEntry(
  entry: Pick<ExamCatalogEntry, "group" | "subject">,
): QualificationHub | undefined {
  return QUALIFICATION_HUBS.find((hub) => qualificationHubMatchesEntry(hub, entry));
}

/**
 * 既存の絞り込みURLから恒久ハブへ移すための解決関数。
 * カタログに存在しない group/subject は決して近い資格へ推測マッチしない。
 */
export function qualificationHubForSelection(
  group: ExamGroupId,
  subject?: string,
  availableEntries?: readonly Pick<ExamCatalogEntry, "group" | "subject">[],
): QualificationHub | undefined {
  if (!subject) {
    return QUALIFICATION_HUBS.find(
      (hub) => hub.group === group && hub.scope.kind === "group",
    );
  }
  const entry = availableEntries?.find(
    (candidate) => candidate.group === group && candidate.subject === subject,
  );
  if (availableEntries && !entry) return undefined;
  return qualificationHubForEntry(entry ?? { group, subject });
}

export function qualificationHubHrefForSelection(
  group: ExamGroupId,
  subject?: string,
): string | undefined {
  const hub = qualificationHubForSelection(group, subject);
  return hub ? qualificationHubPath(hub.slug) : undefined;
}
