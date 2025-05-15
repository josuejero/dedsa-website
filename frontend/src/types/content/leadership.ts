export interface LeadershipPageContent {
  title: string;
  introContent: string;
  fallbackContent: string;
}

export interface LeadershipCardContent {
  roleLabelDefault: string;
  nameLabelDefault: string;
  bioLabelDefault: string;
  emailLabelDefault: string;
}

export interface ChapterStructureContent {
  title: string;
  description: string;
  structureItems: {
    generalMembership: {
      title: string;
      description: string;
    };
    steeringCommittee: {
      title: string;
      description: string;
    };
    workingGroups: {
      title: string;
      description: string;
    };
  };
  meetingsInfo: string;
  bylawsLinkText: string;
  bylawsLinkHref: string;
}
