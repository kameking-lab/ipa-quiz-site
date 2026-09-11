import { SITE_BASE_URL } from "@/lib/seo/config";

interface ExamStructuredDataProps {
  title: string;
  description: string;
  url: string;
}

export function ExamStructuredData({ title, description, url }: ExamStructuredDataProps) {
  const items = [
    { name: "ホーム", item: SITE_BASE_URL },
    { name: "安全衛生の過去問演習", item: `${SITE_BASE_URL}/e-learning/exams` },
  ];
  if (url !== items[1].item) items.push({ name: title, item: url });
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })) },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} />;
}
