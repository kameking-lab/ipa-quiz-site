import type {
  Occupation,
  ITYears,
  Goal,
  StudyHours,
  SkillLevel,
  ExamSeason,
} from "./engine";

export interface DiagnosisChoice<V extends string> {
  value: V;
  label: string;
  emoji: string;
}

export interface DiagnosisQuestion<V extends string> {
  id: string;
  prompt: string;
  hint?: string;
  choices: DiagnosisChoice<V>[];
}

export const Q_OCCUPATION: DiagnosisQuestion<Occupation> = {
  id: "occupation",
  prompt: "現在の立場・職種は？",
  choices: [
    { value: "student", label: "学生", emoji: "🎓" },
    { value: "junior", label: "新人エンジニア（〜3年）", emoji: "🌱" },
    { value: "mid", label: "中堅エンジニア（4〜9年）", emoji: "🛠️" },
    { value: "senior", label: "シニア（10年〜）", emoji: "🧭" },
    { value: "non-it", label: "非IT職・他業種", emoji: "🏢" },
  ],
};

export const Q_IT_YEARS: DiagnosisQuestion<ITYears> = {
  id: "itYears",
  prompt: "IT実務経験は？",
  choices: [
    { value: "none", label: "実務経験なし", emoji: "🆕" },
    { value: "lt1", label: "1年未満", emoji: "🌿" },
    { value: "1-3", label: "1〜3年", emoji: "🌳" },
    { value: "3-7", label: "3〜7年", emoji: "💼" },
    { value: "gte7", label: "7年以上", emoji: "🦉" },
  ],
};

export const Q_GOAL: DiagnosisQuestion<Goal> = {
  id: "goal",
  prompt: "受験の主な目的は？",
  choices: [
    { value: "job-hunt", label: "就活で武器にしたい", emoji: "🎯" },
    { value: "career-change", label: "転職を有利にしたい", emoji: "🚀" },
    { value: "promotion", label: "昇進・昇給につなげたい", emoji: "📈" },
    { value: "self-growth", label: "自己研鑽・体系学習", emoji: "📚" },
    { value: "company-mandate", label: "業務命令・会社推奨", emoji: "🏛️" },
  ],
};

export const Q_STUDY_HOURS: DiagnosisQuestion<StudyHours> = {
  id: "studyHours",
  prompt: "週あたりの学習時間の目安は？",
  choices: [
    { value: "lt3", label: "3時間未満", emoji: "🐢" },
    { value: "3-7", label: "3〜7時間", emoji: "🚶" },
    { value: "7-15", label: "7〜15時間", emoji: "🏃" },
    { value: "gte15", label: "15時間以上", emoji: "🔥" },
  ],
};

export const Q_MATH: DiagnosisQuestion<SkillLevel> = {
  id: "math",
  prompt: "数学への苦手意識は？",
  hint: "確率・離散数学・基数変換などが出題されます",
  choices: [
    { value: "weak", label: "苦手", emoji: "😖" },
    { value: "neutral", label: "ふつう", emoji: "😐" },
    { value: "strong", label: "得意", emoji: "🤓" },
  ],
};

export const Q_ENGLISH: DiagnosisQuestion<SkillLevel> = {
  id: "english",
  prompt: "技術英語への抵抗感は？",
  hint: "RFC・公式ドキュメント・略語の読解力",
  choices: [
    { value: "weak", label: "苦手", emoji: "😖" },
    { value: "neutral", label: "ふつう", emoji: "😐" },
    { value: "strong", label: "得意", emoji: "🌍" },
  ],
};

export const Q_SEASON: DiagnosisQuestion<ExamSeason> = {
  id: "examSeason",
  prompt: "受験予定はいつごろ？",
  choices: [
    { value: "spring", label: "次の春期試験", emoji: "🌸" },
    { value: "autumn", label: "次の秋期試験", emoji: "🍁" },
    { value: "any", label: "どちらでも", emoji: "🗓️" },
    { value: "tbd", label: "まだ未定", emoji: "🤔" },
  ],
};

export const DIAGNOSIS_QUESTIONS = [
  Q_OCCUPATION,
  Q_IT_YEARS,
  Q_GOAL,
  Q_STUDY_HOURS,
  Q_MATH,
  Q_ENGLISH,
  Q_SEASON,
] as const;
