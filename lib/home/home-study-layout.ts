import { LS_KEYS } from "@/lib/storage/keys";

// A layout hint only. HomePace still validates and restores the saved data.
function reserveHomeStudyLayout(pacePlans: string, lastQuestion: string, history: string, activity: string, paper: string, tab: string) {
  if (location.pathname !== "/") return;

  function read(key: string) {
    try { return JSON.parse(localStorage.getItem(key) ?? "null"); } catch { return null; }
  }

  function hasPaperStudy(storage: Storage, prefix: string) {
    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index);
      if (!key?.startsWith(prefix)) continue;
      try {
        if (JSON.parse(storage.getItem(key) ?? "null")?.summary?.answered > 0) return true;
      } catch { /* Ignore a corrupt individual save. */ }
    }
    return false;
  }

  const plans = read(pacePlans);
  const plan = Array.isArray(plans) ? plans[0] : null;
  const root = document.documentElement;
  if (plan?.kind === "exam-pace-v1" && typeof plan.exam === "string" && typeof plan.id === "string") {
    const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    const followsSchedule = plan.sessionId && !plan.result &&
      (plan.examDateSource === "official" || plan.examDateSource === "tentative" || plan.examDateSource === "estimated");
    root.dataset.homeStudyLayout = followsSchedule ? "planned" : plan.examDate < today ? "post-exam" : plan.examDate === today ? "exam-day" : "planned";
    const registration = plan.registration;
    const savedCountdown = !plan.registered && registration && !registration.estimated &&
      (registration.deadline >= today || (registration.start > today && !registration.deadline));
    if (followsSchedule || ((!plan.examDate || registration?.estimated) && !plan.result && !savedCountdown)) {
      root.dataset.homeStudyCalendar = plan.sessionId ? "pending" : "empty";
    }
    return;
  }
  try {
    const entries = read(history)?.entries;
    const actions = read(activity)?.actions;
    if (read(lastQuestion)?.exam || (Array.isArray(entries) && entries.length) ||
        (Array.isArray(actions) && actions.some(action => action?.kind === "answer")) ||
        hasPaperStudy(sessionStorage, tab) || hasPaperStudy(localStorage, paper)) {
      root.dataset.homeStudyLayout = "returning";
    }
  } catch { /* Storage can be unavailable in restricted browsers. */ }
}

const keys = [LS_KEYS.pacePlans, LS_KEYS.lastQuestion, LS_KEYS.history, LS_KEYS.learningActivity,
  LS_KEYS.examLibraryPrefix, LS_KEYS.examLibrarySessionPrefix];

export const HOME_STUDY_LAYOUT_BOOTSTRAP_SCRIPT =
  `(${reserveHomeStudyLayout.toString()})(...${JSON.stringify(keys)});`;
