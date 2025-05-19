import meetingInfoSectionContent from '../../../content/ud-ydsa/meetingInfoSection.json';
import { MeetingInfoSectionContent } from '../../../types/content/ud-ydsa';
import { SectionProps, SocialLinkProps } from '../types';

const c = meetingInfoSectionContent as MeetingInfoSectionContent;

// Generic 24×24 icon wrapper
const Icon = ({ d }: { d: string }) => (
  <svg
    className="h-6 w-6 text-dsa-red mt-1 mr-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
  </svg>
);

// Reusable social‐link component
const SocialLink = ({ href, icon, name }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center group"
  >
    <div
      className={`${
        name === 'Instagram'
          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'
          : name === 'Twitter'
            ? 'bg-blue-400'
            : 'bg-blue-600'
      } text-white p-2 rounded-full mr-3`}
    >
      {icon}
    </div>
    <span className="group-hover:text-dsa-red transition-colors">{name}</span>
  </a>
);

const infoPaths: Record<'when' | 'where' | 'email', string> = {
  when: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  where:
    'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  email:
    'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
};

export default function MeetingInfoSection({ udYdsaInfo }: SectionProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: udYdsaInfo.pageContent || '',
        }}
      />
      <h2 className="text-2xl font-bold mb-6">{c.getInvolvedTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">{c.meetingInfoTitle}</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <Icon d={infoPaths.when} />
              <div>
                <p className="font-medium">{c.meetingWhenLabel}</p>
                <p>{udYdsaInfo.meetingSchedule}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Icon d={infoPaths.where} />
              <div>
                <p className="font-medium">{c.meetingWhereLabel}</p>
                <p>{udYdsaInfo.meetingLocation}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Icon d={infoPaths.email} />
              <div>
                <p className="font-medium">{c.meetingEmailLabel}</p>
                <a
                  href={`mailto:${udYdsaInfo.contactEmail}`}
                  className="text-dsa-red hover:underline"
                >
                  {udYdsaInfo.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">{c.followTitle}</h3>
          <div className="space-y-4">
            <SocialLink
              href={udYdsaInfo.socialMedia.instagram}
              name={c.socialLinks.instagram.name}
              icon={<InstagramIcon />}
            />
            <SocialLink
              href={udYdsaInfo.socialMedia.twitter}
              name={c.socialLinks.twitter.name}
              icon={<TwitterIcon />}
            />
            <SocialLink
              href={udYdsaInfo.socialMedia.facebook}
              name={c.socialLinks.facebook.name}
              icon={<FacebookIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- social icons kept minimal ---
const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 ..." />
  </svg>
);
const TwitterIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.735a4.674 4.674 0 002.042-2.573 ..." />
  </svg>
);
const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.325v21.35C0 23.404.596 24 1.325 24h21.35 ..." />
  </svg>
);
