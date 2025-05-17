// services/content.ts

// Default values for fallbacks
const DEFAULT_GLOBAL_CONTENT = {
  siteName: 'Delaware DSA',
  tagline: 'Democratic Socialists of America',
  joinButtonText: 'Join Our Chapter',
  contactInfo: {
    email: 'info@delawaredsa.org',
    phone: '(302) 555-0123',
    mailingAddress: 'Delaware DSA\nP.O. Box 12345\nWilmington, DE 19801',
  },
  socialLinks: {
    twitter: 'https://twitter.com/delawaredsa',
    facebook: 'https://facebook.com/delawaredsa',
    instagram: 'https://instagram.com/delawaredsa',
  },
};

interface GlobalContent {
  globalContent?: typeof DEFAULT_GLOBAL_CONTENT;
}

interface UiString {
  uiStringByKey?: {
    stringData?: {
      stringValue?: string;
    };
  };
}

interface UiStringsByComponent {
  uiStringsByComponent?: Array<{
    stringData: {
      stringKey: string;
      stringValue: string;
    };
  }>;
}

// … your existing getGlobalContent, getHomeContent, getUiString, getUiStringsByComponent here …

// -----------------------------------------------------------------------------
// Now import each JSON slice:

// Home page sections
import { chapterStatsSection } from '../content/consolidated/home/chapterStatsSection.json';
import { committeesCard } from '../content/consolidated/home/committeesCard.json';
import { getInvolvedSection } from '../content/consolidated/home/getInvolvedSection.json';
import { heroSection } from '../content/consolidated/home/heroSection.json';
import { joinCTASection } from '../content/consolidated/home/joinCTASection.json';
import { latestUpdatesSection } from '../content/consolidated/home/latestUpdatesSection.json';
import { missionSection } from '../content/consolidated/home/missionSection.json';
import { strategicPrioritiesSection } from '../content/consolidated/home/strategicPrioritiesSection.json';
import { upcomingEventsCard } from '../content/consolidated/home/upcomingEventsCard.json';

// “Join” page sections
import { faq } from '../content/consolidated/join/faq.json';
import { joinHero } from '../content/consolidated/join/joinHero.json';
import { membershipOptions } from '../content/consolidated/join/membershipOptions.json';
import { testimonials } from '../content/consolidated/join/testimonials.json';
import { whyJoinDSA } from '../content/consolidated/join/whyJoinDSA.json';

// “About” page sections
import { aboutHero } from '../content/consolidated/about/aboutHero.json';
import { achievements } from '../content/consolidated/about/achievements.json';
import { democraticSocialism } from '../content/consolidated/about/democraticSocialism.json';
import { getInvolved as aboutGetInvolved } from '../content/consolidated/about/getInvolved.json';
import { nationalInfo } from '../content/consolidated/about/nationalInfo.json';
import { page as aboutPage } from '../content/consolidated/about/page.json';
import { timeline } from '../content/consolidated/about/timeline.json';

// “Calendar” page sections
import { eventCalendar } from '../content/consolidated/calendar/eventCalendar.json';
import { monthSelector } from '../content/consolidated/calendar/monthSelector.json';
import { page as calendarPage } from '../content/consolidated/calendar/page.json';

// -----------------------------------------------------------------------------
// Export aggregated objects for each page:

export const homeContent = {
  chapterStatsSection,
  committeesCard,
  getInvolvedSection,
  heroSection,
  joinCTASection,
  latestUpdatesSection,
  missionSection,
  strategicPrioritiesSection,
  upcomingEventsCard,
};

export const joinContent = {
  faq,
  joinHero,
  membershipOptions,
  testimonials,
  whyJoinDSA,
};

export const aboutContent = {
  aboutHero,
  achievements,
  democraticSocialism,
  getInvolved: aboutGetInvolved,
  nationalInfo,
  page: aboutPage,
  timeline,
};

export const calendarContent = {
  page: calendarPage,
  eventCalendar,
  monthSelector,
};
