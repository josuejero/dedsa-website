import { contentService } from '@/core/services/contentService';
import type {
  CampaignsSectionContent,
  EventsSectionContent,
  HeroSectionContent,
  JoinSectionContent,
  LeadershipSectionContent,
  MeetingInfoSectionContent,
} from '@/core/types/pages/ud-ydsa';
import UdYdsaFeature from '@/features/ud-ydsa';

export default function UdYdsaPage() {
  const data = contentService.getPageContent(
    'udYdsa'
  ) as unknown as HeroSectionContent &
    CampaignsSectionContent &
    EventsSectionContent &
    JoinSectionContent &
    LeadershipSectionContent &
    MeetingInfoSectionContent;
  return <UdYdsaFeature {...data} />;
}
