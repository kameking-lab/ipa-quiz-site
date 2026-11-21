export function isStudyWeekdays(value: unknown): value is number[] {
  return Array.isArray(value) && value.length >= 1 && value.length <= 7 &&
    value.every(day => Number.isInteger(day) && day >= 0 && day <= 6) &&
    new Set(value).size === value.length;
}

export function preserveStudyWeekdays(next: unknown, previous: unknown): unknown {
  if (!isPacePayload(next) || !isPacePayload(previous) || next.exam !== previous.exam ||
      isStudyWeekdays(next.studyWeekdays) || !isStudyWeekdays(previous.studyWeekdays)) return next;
  return { ...next, studyWeekdays: previous.studyWeekdays };
}

function isPacePayload(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && "kind" in value && value.kind === "exam-pace-v1";
}
