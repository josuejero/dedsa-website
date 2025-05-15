import meetingInfoSectionContent from '../../../content/ud-ydsa/meetingInfoSection.json';
import { MeetingInfoSectionContent } from '../../../types/content/ud-ydsa';
import { SectionProps, SocialLinkProps } from '../types';

// Type assertion for imported JSON
const typedContent = meetingInfoSectionContent as MeetingInfoSectionContent;

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

export default function MeetingInfoSection({ udYdsaInfo }: SectionProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: udYdsaInfo.pageContent || '' }}
      />

      <h2 className="text-2xl font-bold mb-6">
        {typedContent.getInvolvedTitle}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">
            {typedContent.meetingInfoTitle}
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <svg
                className="h-6 w-6 text-dsa-red mt-1 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-medium">{typedContent.meetingWhenLabel}</p>
                <p>{udYdsaInfo.meetingSchedule}</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg
                className="h-6 w-6 text-dsa-red mt-1 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="font-medium">{typedContent.meetingWhereLabel}</p>
                <p>{udYdsaInfo.meetingLocation}</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg
                className="h-6 w-6 text-dsa-red mt-1 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="font-medium">{typedContent.meetingEmailLabel}</p>
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
          <h3 className="text-xl font-bold mb-4">{typedContent.followTitle}</h3>

          <div className="space-y-4">
            <SocialLink
              href={udYdsaInfo.socialMedia.instagram}
              name={typedContent.socialLinks.instagram.name}
              icon={<InstagramIcon />}
            />

            <SocialLink
              href={udYdsaInfo.socialMedia.twitter}
              name={typedContent.socialLinks.twitter.name}
              icon={<TwitterIcon />}
            />

            <SocialLink
              href={udYdsaInfo.socialMedia.facebook}
              name={typedContent.socialLinks.facebook.name}
              icon={<FacebookIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 3.807-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-3.807-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
  </svg>
);

// Similar TwitterIcon and FacebookIcon components would be defined here
const TwitterIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.735a4.674 4.674 0 002.042-2.573c-.91.537-1.918.925-2.99 1.134a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.325v21.35C0 23.404.596 24 1.325 24h21.35c.73 0 1.325-.596 1.325-1.325V1.325C24 .596 23.404 0 22.675 0zm-2.65 12h-4v10h-4V12H9V8h3V6c0-2.21 1.79-4 4-4h3v4h-2c-.55 0-1 .45-1 1v2h4l-1 4z" />
  </svg>
);
