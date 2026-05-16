# structured data audit — 2026-05-16

## already implemented (before this branch)

homepage (/):
  WebSite, SearchAction, EducationalOrganization, OfferCatalog, ItemList

exam top page (/[exam]):
  CollectionPage, EducationalOccupationalCredential, Course, CourseInstance,
  HowTo, HowToStep, BreadcrumbList, EducationalOrganization
  (added in PR #217)

question page (/q/[exam]/...):
  QAPage, Quiz, LearningResource, FAQPage, Question, Answer,
  BreadcrumbList, EducationalOrganization, ImageObject

blog list (/blog):
  Blog, BlogPosting, Organization, BreadcrumbList

blog article (/blog/[slug]):
  Article, ImageObject, Organization, WebPage, BreadcrumbList
  — LearningResource was MISSING (added in this branch)
  — HowTo was MISSING for practice posts (added in this branch)

faq (/faq):
  FAQPage, Question, Answer, BreadcrumbList

features (/features/[slug]):
  WebPage, WebSite, Service, Organization, FAQPage, BreadcrumbList

glossary (/glossary):
  DefinedTermSet, DefinedTerm, BreadcrumbList

keywords (/keywords/[keyword]):
  Article, Organization, BreadcrumbList

topics (/topics/[slug]):
  CollectionPage, BreadcrumbList

recommended books (/recommended-books/[exam]):
  ItemList, Product, BreadcrumbList

mock exam (/mock-exam):
  LearningResource, Organization

year/season listing (/[exam]/[yearSeason]):
  CollectionPage, BreadcrumbList

topic listing (/[exam]/topic/[topicSlug]):
  CollectionPage, BreadcrumbList

## added in this branch (feat/structured-data-expansion)

blog article (/blog/[slug]):
  + LearningResource (all posts, 65 total)
  + HowTo + HowToStep (practice posts -yoru-tokurensyu, 13 posts)

essays exam index (/essays/[exam]):
  + CollectionPage + LearningResource + BreadcrumbList (6 exams: sc/st/sa/pm/sm/au)

essays question detail (/essays/[exam]/[yearSeason]/[section]/[qnum]):
  + Article + LearningResource + BreadcrumbList (multiple questions)

## intentionally skipped

VideoObject — no video content
SearchAction — already on homepage WebSite schema
Quiz timeRequired — already has educationalLevel + about; timeRequired is hard to estimate statically
year/season and topic listing LearningResource — collection pages, low SEO value for LearningResource
