import type {
  PositionCardContent,
  WhatWeStandForHero,
} from '@/core/types/pages/whatWeStandFor';

type Props = WhatWeStandForHero & { positionCard: PositionCardContent };

export default function WhatWeStandForPage(props: Props) {
  const { heading, description, positionCard } = props;
  
  // Example positions - in a real app, these would come from the CMS
  const positions = [
    {
      id: '1',
      title: 'Medicare for All',
      description: 'Healthcare is a human right. We fight for a single-payer healthcare system that covers everyone.',
      icon: '❤️'
    },
    {
      id: '2',
      title: 'Green New Deal',
      description: 'We support a massive public investment in renewable energy and sustainable infrastructure.',
      icon: '🌱'
    },
    {
      id: '3',
      title: 'Housing Justice',
      description: 'Everyone deserves safe, affordable housing. We fight for tenant rights and social housing.',
      icon: '🏠'
    },
    {
      id: '4',
      title: 'Workers Rights',
      description: 'We stand with workers organizing for better wages, benefits, and working conditions.',
      icon: '✊'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-dsa-red text-white py-16">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{heading}</h1>
          <p className="text-xl max-w-3xl">{description}</p>
        </div>
      </section>
      
      {/* Positions Grid */}
      <section className="py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((position) => (
              <PositionCard key={position.id} position={position} {...positionCard} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Movement</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            If you share our vision for a more just and equitable society, join us in building a better future.
          </p>
          <a href="/join" className="btn btn-primary">
            Become a Member
          </a>
        </div>
      </section>
    </div>
  );
}

// Position Card Component
interface Position {
  id: string;
  title: string;
  description: string;
  icon: string;
}

function PositionCard({ position, ariaLabels }: { position: Position } & PositionCardContent) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
      aria-label={`${ariaLabels.position} ${position.title}`}
    >
      <div className="text-4xl mb-4">{position.icon}</div>
      <h3 className="text-2xl font-bold mb-3">{position.title}</h3>
      <p className="text-gray-700">{position.description}</p>
    </div>
  );
}
