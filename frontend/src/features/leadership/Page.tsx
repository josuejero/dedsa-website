import type {
  ChapterStructureContent,
  LeadershipCardContent,
  LeadershipPageContent,
} from '@/core/types/pages/leadership';

type Props = LeadershipPageContent & {
  chapterStructure: ChapterStructureContent;
  leadershipCard: LeadershipCardContent;
};

export default function LeadershipPage(props: Props) {
  const {
    title,
    introContent,
    fallbackContent,
    chapterStructure,
    leadershipCard,
  } = props;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container-page">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: introContent || fallbackContent,
            }}
          />
        </div>

        {/* Chapter Structure Section */}
        <ChapterStructure {...chapterStructure} />

        {/* Leadership Cards */}
        <LeadershipSection {...leadershipCard} />
      </div>
    </div>
  );
}

// Chapter Structure Component
function ChapterStructure(props: ChapterStructureContent) {
  const {
    title,
    description,
    structureItems,
    meetingsInfo,
    bylawsLinkText,
    bylawsLinkHref,
  } = props;

  return (
    <section className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg mb-6">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(structureItems).map(([key, item]) => (
          <div key={key} className="border-l-4 border-dsa-red pl-4">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="mb-4">{meetingsInfo}</p>
        <a
          href={bylawsLinkHref}
          className="text-dsa-red hover:underline font-medium"
        >
          {bylawsLinkText} →
        </a>
      </div>
    </section>
  );
}

// Leadership Section Component (placeholder for now)
function LeadershipSection(props: LeadershipCardContent) {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold mb-6">Chapter Leadership</h2>
      <p className="text-gray-600">
        Leadership information will be displayed here.
      </p>
      {/* TODO: Implement actual leadership cards when data is available */}
    </section>
  );
}
