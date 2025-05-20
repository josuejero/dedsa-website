import Link from 'next/link';
import campaignsSectionContent from '../../../content/ud-ydsa/campaignsSection.json';
import { CampaignsSectionContent } from '../../../types/content/ud-ydsa';

// Type assertion for imported JSON
const typedContent = campaignsSectionContent as CampaignsSectionContent;

export default function CampaignsSection() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">{typedContent.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {typedContent.campaigns.map((campaign, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
            <p className="mb-4">{campaign.description}</p>
            <Link
              href={campaign.linkHref}
              className="text-dsa-red hover:underline"
            >
              {campaign.linkText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
