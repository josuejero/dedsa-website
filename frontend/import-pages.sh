#!/usr/bin/env bash
set -e

# 1) Dedupe the contentService registrations (removes all duplicate lines)
awk '!seen[$0]++' src/core/services/contentService.ts > tmp && mv tmp src/core/services/contentService.ts

# 2) Patch each feature’s Page.tsx stub so it accepts the merged JSON props

# Calendar
cat << 'PATCH' | patch -p0
*** Begin Patch
*** Update File: src/features/calendar/Page.tsx
@@
-import React from 'react';
-export default function CalendarPage() {
-  return <div>Calendar page (stub)</div>;
-}
+import React from 'react';
+import type { CalendarPageContent, EventCalendarContent, MonthSelectorContent } from '@/core/types/pages/calendar';
+
+export interface CalendarPageProps extends CalendarPageContent {
+  eventCalendar: EventCalendarContent;
+  monthSelectorData: MonthSelectorContent;
+}
+
+export default function CalendarPage(props: CalendarPageProps) {
+  const {
+    title,
+    subtitle,
+    errorTitle,
+    errorMessage,
+    errorActionLabel,
+    subscribeTitle,
+    subscribeText,
+    googleCalendarButtonText,
+    iCalOutlookButtonText,
+    eventCalendar,
+    monthSelectorData
+  } = props;
+  return (
+    <div>
+      <h1>{title}</h1>
+      <p>{subtitle}</p>
+      {/* TODO: render <MonthSelector {...monthSelectorData}/> and <EventCalendar {...eventCalendar}/> */}
+    </div>
+  );
+}
*** End Patch
PATCH

# Contact
cat << 'PATCH' | patch -p0
*** Begin Patch
*** Update File: src/features/contact/Page.tsx
@@
-import React from 'react';
-export default function ContactPage() {
-  return <div>Contact page (stub)</div>;
-}
+import React from 'react';
+import type { ContactPageContent, ContactFormContent } from '@/core/types/pages/contact';
+
+export type ContactPageProps = ContactPageContent & ContactFormContent;
+
+export default function ContactPage(props: ContactPageProps) {
+  const {
+    heading,
+    fallbackContent,
+    fallbackContactInfo,
+    sections,
+    error,
+    formFields,
+    buttons,
+    validation,
+    success,
+    error: formError
+  } = props;
+  return (
+    <div>
+      <h1>{heading}</h1>
+      {/* TODO: render your form and contact sections here */}
+    </div>
+  );
+}
*** End Patch
PATCH

# Leadership
cat << 'PATCH' | patch -p0
*** Begin Patch
*** Update File: src/features/leadership/Page.tsx
@@
-import React from 'react';
-export default function LeadershipPage() {
-  return <div>Leadership page (stub)</div>;
-}
+import React from 'react';
+import type { LeadershipPageContent, ChapterStructureContent, LeadershipCardContent } from '@/core/types/pages/leadership';
+
+export interface LeadershipPageProps extends LeadershipPageContent {
+  chapterStructure: ChapterStructureContent;
+  leadershipCard: LeadershipCardContent;
+}
+
+export default function LeadershipPage(props: LeadershipPageProps) {
+  const { title, introContent, fallbackContent, chapterStructure, leadershipCard } = props;
+  return (
+    <div>
+      <h1>{title}</h1>
+      {/* TODO: render <ChapterStructure {...chapterStructure}/> and <LeadershipCard {...leadershipCard}/> */}
+    </div>
+  );
+}
*** End Patch
PATCH

# Newsletter
cat << 'PATCH' | patch -p0
*** Begin Patch
*** Update File: src/features/newsletter/Page.tsx
@@
-import React from 'react';
-export default function NewsletterPage() {
-  return <div>Newsletter page (stub)</div>;
-}
+import React from 'react';
+import type { NewsletterPageContent, ArticleHeaderContent, ArticleFooterContent } from '@/core/types/pages/newsletter';
+
+export type NewsletterPageProps = NewsletterPageContent & ArticleHeaderContent & ArticleFooterContent;
+
+export default function NewsletterPage(props: NewsletterPageProps) {
+  const {
+    title,
+    noPostsMessage,
+    errorTitle,
+    errorMessage,
+    errorActionLabel,
+    backToNewsletterText,
+    relatedArticlesTitle,
+    noRelatedArticlesMessage
+  } = props;
+  return (
+    <div>
+      <h1>{title}</h1>
+      {/* TODO: render your newsletter list and related articles here */}
+    </div>
+  );
+}
*** End Patch
PATCH

# What-We-Stand-For
cat << 'PATCH' | patch -p0
*** Begin Patch
*** Update File: src/features/what-we-stand-for/Page.tsx
@@
-import React from 'react';
-export default function WhatWeStandForPage() {
-  return <div>What-We-Stand-For page (stub)</div>;
-}
+import React from 'react';
+import type { HeroSectionContent, PositionCardContent } from '@/core/types/pages/whatWeStandFor';
+
+export interface WhatWeStandForPageProps extends HeroSectionContent {
+  positionCard: PositionCardContent;
+}
+
+export default function WhatWeStandForPage(props: WhatWeStandForPageProps) {
+  const { heading, description } = props.hero;
+  return (
+    <div>
+      <h1>{heading}</h1>
+      <p>{description}</p>
+      {/* TODO: render <PositionCard {...props.positionCard}/> */}
+    </div>
+  );
+}
*** End Patch
PATCH

# UD-YDSA
cat << 'PATCH' | patch -p0
*** Begin Patch
*** Update File: src/features/ud-ydsa/Page.tsx
@@
-import React from 'react';
-export default function UdYdsaPage() {
-  return <div>UD-YDSA page (stub)</div>;
-}
+import React from 'react';
+import type {
+  HeroSectionContent,
+  CampaignsSectionContent,
+  EventsSectionContent,
+  JoinSectionContent,
+  LeadershipSectionContent,
+  MeetingInfoSectionContent
+} from '@/core/types/pages/ud-ydsa';
+
+export interface UdYdsaPageProps extends HeroSectionContent {
+  campaignsSection: CampaignsSectionContent;
+  eventsSection: EventsSectionContent;
+  joinSection: JoinSectionContent;
+  leadershipSection: LeadershipSectionContent;
+  meetingInfoSection: MeetingInfoSectionContent;
+}
+
+export default function UdYdsaPage(props: UdYdsaPageProps) {
+  const { title, subtitle, campaignsSection, eventsSection, joinSection, leadershipSection, meetingInfoSection } = props;
+  return (
+    <div>
+      <h1>{title}</h1>
+      <p>{subtitle}</p>
+      {/* TODO: render each UD-YDSA section here */}
+    </div>
+  );
+}
*** End Patch
PATCH

# 3) Fix the import path in the app-level what-we-stand-for page
sed -i '' \
  "s@from '@/core/types/pages/what-we-stand-for'@from '@/core/types/pages/whatWeStandFor'@" \
  src/app/what-we-stand-for/page.tsx

# 4) Finally, verify
npx tsc --noEmit && echo "✅ All stubs now accept props and contentService is clean!"
