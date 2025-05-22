import type {
  HeroSectionContent,
  CampaignsSectionContent,
  EventsSectionContent,
  JoinSectionContent,
  LeadershipSectionContent,
  MeetingInfoSectionContent
} from '@/core/types/pages/ud-ydsa';
type Props = HeroSectionContent & CampaignsSectionContent & EventsSectionContent & JoinSectionContent & LeadershipSectionContent & MeetingInfoSectionContent;
export default function UdYdsaPage(props: Props) {
  // TODO: render the UD-YDSA page using props.hero, props.campaigns, props.upcomingEvents, etc.
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
