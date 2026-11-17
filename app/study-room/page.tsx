import "../home-study.css";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { getHomeDirectory } from "@/lib/home/home-directory";
export default function StudyRoomPage() {
  const suggestions = getHomeDirectory().flatMap(d => [...d.featured, ...d.compact]).map(i => ({ name: i.name, exam: i.key, href: i.href }));
  return <main className="study-home mx-auto w-full max-w-6xl flex-1 px-4 py-6"><TotalAnswerCounter suggestions={suggestions} /></main>;
}
