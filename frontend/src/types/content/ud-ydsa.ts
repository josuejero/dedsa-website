export interface MeetingInfoSectionContent {
  getInvolvedTitle: string;
  meetingInfoTitle: string;
  meetingWhenLabel: string;
  meetingWhereLabel: string;
  meetingEmailLabel: string;
  followTitle: string;
  socialLinks: {
    instagram: { name: string; href: string };
    twitter: { name: string; href: string };
    facebook: { name: string; href: string };
  };
}
