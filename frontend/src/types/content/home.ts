export interface HeroSectionContent {
  mainHeading: string;
  subHeading: string;
  tagline: string;
  description: string;
  buttons: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
}

export interface MissionSectionContent {
  heading: string;
  paragraphs: string[];
  button: {
    text: string;
    href: string;
  };
}

export interface PriorityItem {
  title: string;
  description: string;
  iconPath: string;
}

export interface StrategicPrioritiesSectionContent {
  heading: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  priorities: PriorityItem[];
}
