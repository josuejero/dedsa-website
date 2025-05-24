import type {
  CampaignsSectionContent,
  EventsSectionContent,
  HeroSectionContent,
  JoinSectionContent,
  LeadershipSectionContent,
  MeetingInfoSectionContent,
  UdYdsaPageContent,
} from '@/core/types/pages/ud-ydsa';

type Props = UdYdsaPageContent;

export default function UdYdsaPage(props: Props) {
  const {
    hero,
    campaignsSection,
    eventsSection,
    meetingInfoSection,
    leadershipSection,
    joinSection,
  } = props;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* passes only the hero object */}
      <HeroSection hero={hero} />

      {/* passes only campaigns array */}
      <CampaignsSection campaigns={campaignsSection.campaigns} />

      {/* eventsSection already has the right shape */}
      <EventsSection {...eventsSection} />

      {/* meetingInfoSection contains socialLinks */}
      <MeetingInfoSection {...meetingInfoSection} />

      {/* leadershipSection has leaders/contactLink */}
      <LeadershipSection {...leadershipSection} />

      {/* joinSection has title/description/buttonText */}
      <JoinSection {...joinSection} />
    </div>
  );
}

// Hero Section
function HeroSection({ hero }: { hero: HeroSectionContent }) {
  return (
    <section className="bg-gradient-to-r from-dsa-red to-red-700 text-white py-20">
      <div className="container-page">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{hero.title}</h1>
        <p className="text-xl md:text-2xl">{hero.subtitle}</p>
      </div>
    </section>
  );
}

// Campaigns Section
function CampaignsSection({
  campaigns,
}: {
  campaigns: CampaignsSectionContent['campaigns'];
}) {
  return (
    <section className="py-16">
      <div className="container-page">
        <h2 className="text-3xl font-bold mb-8">Current Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns?.map(
            (
              campaign: CampaignsSectionContent['campaigns'][number],
              index: number
            ) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">{campaign.title}</h3>
                <p className="text-gray-700 mb-4">{campaign.description}</p>
                <a
                  href={campaign.linkHref}
                  className="text-dsa-red hover:underline"
                >
                  {campaign.linkText}
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// Events Section
function EventsSection({
  upcomingEvents,
  viewAllLinkText,
  viewAllLinkHref,
}: EventsSectionContent) {
  return (
    <section className="py-16 bg-white">
      <div className="container-page">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
        <div className="space-y-4 mb-8">
          {upcomingEvents?.map(
            (
              event: EventsSectionContent['upcomingEvents'][number],
              index: number
            ) => (
              <div key={index} className="border-l-4 border-dsa-red pl-4 py-3">
                <h3 className="font-bold text-lg">{event.title}</h3>
                <p className="text-gray-600">
                  {event.date} at {event.time} • {event.location}
                </p>
              </div>
            )
          )}
        </div>
        <a href={viewAllLinkHref} className="text-dsa-red hover:underline">
          {viewAllLinkText}
        </a>
      </div>
    </section>
  );
}

// Meeting Info Section
function MeetingInfoSection(props: MeetingInfoSectionContent) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {props.meetingInfoTitle}
            </h2>
            <div className="space-y-2">
              <p>
                <strong>{props.meetingWhenLabel}:</strong> Second Tuesday of
                each month, 7:00 PM
              </p>
              <p>
                <strong>{props.meetingWhereLabel}:</strong> Morris Library, Room
                202
              </p>
              <p>
                <strong>{props.meetingEmailLabel}:</strong>{' '}
                udydsa@delawardsa.org
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{props.followTitle}</h2>
            <div className="flex space-x-4">
              {Object.entries(props.socialLinks).map(([key, link]) => (
                <a
                  key={key}
                  href={link.href}
                  className="text-dsa-red hover:text-red-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Leadership Section
function LeadershipSection({
  leaders,
  contactLinkText,
  contactLinkHref,
}: LeadershipSectionContent) {
  return (
    <section className="py-16">
      <div className="container-page">
        <h2 className="text-3xl font-bold mb-8">Chapter Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaders?.map(
            (
              leader: LeadershipSectionContent['leaders'][number],
              index: number
            ) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-dsa-red text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {leader.imageInitials}
                </div>
                <h3 className="font-bold">{leader.name}</h3>
                <p className="text-gray-600">{leader.role}</p>
              </div>
            )
          )}
        </div>
        <div className="text-center">
          <a href={contactLinkHref} className="text-dsa-red hover:underline">
            {contactLinkText}
          </a>
        </div>
      </div>
    </section>
  );
}

// Join Section
function JoinSection({ title, description, buttonText }: JoinSectionContent) {
  return (
    <section className="py-16 bg-dsa-red text-white">
      <div className="container-page text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">{description}</p>
        <a href="/join" className="btn bg-white text-dsa-red hover:bg-gray-100">
          {buttonText}
        </a>
      </div>
    </section>
  );
}
