import { ClientQuizLoader } from "@/components/quiz/ClientQuizLoader";

interface SearchParams {
  mode?: string;
  exam?: string;
  year?: string;
  season?: string;
  topic?: string;
  category?: string;
  calc?: string;
  order?: string;
}

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return <ClientQuizLoader params={sp} />;
}
