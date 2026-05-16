# Structured Data Validation Report

Generated: 2026-05-16

## Summary

Code review: PASS (all schema.org required properties present, no violations)
Production state: 114 commits behind main HEAD (last deployed ce043dccd4 / PR #203)

Errors found in code: 0
Warnings (minor consistency): 1
Production gaps (deployment lag, not code bugs): 3

---

## Production curl results (as of 2026-05-16)

### /q/ap/2024-spring/am/q1 (question detail)

Status: deployed and correct
Types present: QAPage, Quiz, LearningResource, FAQPage, Question (x5), Answer (x14), BreadcrumbList, EducationalOrganization, WebSite
Required properties: all present

QAPage: url, inLanguage, mainEntity, isPartOf - OK
Quiz: name, about, educationalLevel, inLanguage, url, dateModified, hasPart - OK
LearningResource: name, inLanguage, learningResourceType, educationalLevel, educationalUse, teaches, keywords, isAccessibleForFree, license, creator, publisher - OK
FAQPage: mainEntity with Question + acceptedAnswer - OK
BreadcrumbList: 4 ListItems (home/exam/yearSeason/question) - OK

### /ap (exam index)

Status: Course and HowTo NOT YET DEPLOYED (deployment lag)
Types present: CollectionPage, EducationalOccupationalCredential, Organization, BreadcrumbList
Types in code but not deployed: Course, HowTo (conditional)

CollectionPage: name, description, url, inLanguage, about - OK
EducationalOccupationalCredential: name, credentialCategory, url, inLanguage, description, recognizedBy, educationalLevel, competencyRequired - OK
BreadcrumbList: 2 ListItems (home/exam) - OK

### /blog/ap-goukaku-benkyouhou (blog article)

Status: LearningResource NOT YET DEPLOYED (deployment lag)
Types present: Article, BreadcrumbList, ImageObject (x2), Organization (x2), WebPage
Types in code but not deployed: LearningResource

Article: headline, description, url, image (ImageObject), datePublished, dateModified, inLanguage, keywords, author, publisher, mainEntityOfPage - OK
BreadcrumbList: 3 ListItems (home/blog/article) - OK

### /essays/sc (essays index)

Status: NO JSON-LD (entire schema not yet deployed)
Types in code but not deployed: CollectionPage, LearningResource, BreadcrumbList

Root cause: JSON-LD was added in commit c264926 (PR #225), not yet deployed to production

---

## Code-level validation (verified against current main HEAD)

### app/[exam]/page.tsx

@graph: CollectionPage + EducationalOccupationalCredential + Course + HowTo(conditional) + BreadcrumbList
All required properties: present

WARNING: educationalLevel inconsistency
  EducationalOccupationalCredential: educationalLevel = "professional" (lowercase)
  Course: educationalLevel = "Professional" (capitalized)
  LearningResource (q/ page): educationalLevel = "Professional" (capitalized)
  Action: harmonize to "Professional" for consistency

### app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx

@graph: QAPage + Quiz + LearningResource + FAQPage + BreadcrumbList + EducationalOrganization
All required properties: present
No issues.

### app/blog/[slug]/page.tsx

@graph: Article + LearningResource + BreadcrumbList + HowTo(conditional on -yoru-tokurensyu slug)
Article: headline, author (Organization), datePublished, image (ImageObject) - all present
LearningResource: name, inLanguage, learningResourceType, educationalUse, teaches, isAccessibleForFree, publisher - all present
HowTo: name, description, step (with HowToStep position/name/text) - all present when generated
No required property violations.

### app/essays/[exam]/page.tsx

@graph: CollectionPage + LearningResource + BreadcrumbList
CollectionPage: name, description, url, inLanguage, isPartOf, numberOfItems - all present
LearningResource: name, description, inLanguage, learningResourceType, educationalUse, teaches, isAccessibleForFree, publisher, creator - all present
No issues.

### app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx

@graph: Article + LearningResource + BreadcrumbList
Article: headline, description, url, inLanguage, datePublished, dateModified, author, publisher (with logo), mainEntityOfPage, about - all present
LearningResource: name, description, inLanguage, learningResourceType, educationalUse, teaches, isAccessibleForFree, publisher - all present
No issues.

---

## Production deployment gap

Current production: ce043dccd4 (PR #203, merged 2026-05-16T01:20:43Z)
Current main HEAD: 8674588 (PR #234, merged 2026-05-16T10:51:25Z)
Commits not yet deployed: 114

Structured data changes not yet live:
- Course + HowTo on /[exam] pages (added f45cb81, PR #217)
- LearningResource on /blog/[slug] pages (added c264926, PR #225)
- HowTo on /blog/ practice posts (added c264926, PR #225)
- CollectionPage + LearningResource + BreadcrumbList on /essays/[exam] (added c264926, PR #225)
- Article + LearningResource + BreadcrumbList on /essays/[exam]/... detail pages (added c264926, PR #225)

Resolution: trigger a new Vercel production deployment from main HEAD to make these live.
This is a deployment timing issue, not a code bug.

---

## Actions taken

1. Fixed educationalLevel consistency: changed "professional" (lowercase) to "Professional" in
   EducationalOccupationalCredential at app/[exam]/page.tsx

Total code fixes: 1 (minor consistency fix)
Schema errors (required props missing): 0
Deployment gap pages: 4 (will resolve once Vercel redeploys from main HEAD)
