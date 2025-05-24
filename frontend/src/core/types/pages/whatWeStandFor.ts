// frontend/src/core/types/pages/whatWeStandFor.ts

export interface WhatWeStandForHero {
  heading: string;
  description: string;
}

export interface AboutSectionContent {
  title: string;
  content: string;
}

export interface Principle {
  title: string;
  description: string;
  icon: string;
}

export interface BeliefsContent {
  title: string;
  subtitle: string;
  principles: Principle[];
}

export interface PlatformPlank {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface PlatformContent {
  title: string;
  subtitle: string;
  planks: PlatformPlank[];
}

export interface Priority2025 {
  title: string;
  description: string;
  iconPath: string;
}

export interface Priorities2025Content {
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  priorities: Priority2025[];
}

export interface WhatWeStandForCTA {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface WhatWeStandForPageContent {
  hero: WhatWeStandForHero;
  aboutSection: AboutSectionContent;
  beliefs: BeliefsContent;
  platform: PlatformContent;
  priorities2025: Priorities2025Content;
  cta: WhatWeStandForCTA;
  emptyPositionsMessage: string;
  notFoundMessage: string;
}

export interface PositionCardContent {
  ariaLabels: {
    position: string;
  };
}
