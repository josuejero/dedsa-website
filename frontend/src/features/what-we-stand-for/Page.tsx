import type {
  PositionCardContent,
  WhatWeStandForHero,
} from '@/core/types/pages/whatwestandfor';
type Props = WhatWeStandForHero & { positionCard: PositionCardContent };
export default function WhatWeStandForPage(props: Props) {
  // TODO: render the positions page using props.heading, props.description, props.positionCard, etc.
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
