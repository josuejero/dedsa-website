import { contentService } from '@/core/services/contentService';
import type {
  PositionCardContent,
  WhatWeStandForHero,
} from '@/core/types/pages/whatWeStandFor';
import WhatWeStandForFeature from '@/features/what-we-stand-for';

export default function WhatWeStandForPage() {
  const data = contentService.getPageContent(
    'whatWeStandFor'
  ) as unknown as WhatWeStandForHero & {
    positionCard: PositionCardContent;
  };
  return <WhatWeStandForFeature {...data} />;
}
