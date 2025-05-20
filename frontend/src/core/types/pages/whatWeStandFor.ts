// frontend/src/types/content/whatWeStandFor.ts

export interface WhatWeStandForHero {
  heading: string;
  description: string;
}

export interface WhatWeStandForCTA {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface WhatWeStandForPageContent {
  hero: WhatWeStandForHero;
  fallbackContent: string;
  cta: WhatWeStandForCTA;
  emptyPositionsMessage: string;
  notFoundMessage: string;
}

export interface PositionCardContent {
  ariaLabels: {
    position: string;
  };
}
