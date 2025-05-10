interface AchievementsProps {
  achievements?: string[];
}

export default function Achievements({
  achievements = [
    'Successfully advocated for tenant protections in Wilmington',
    'Organized mutual aid networks during the COVID-19 pandemic',
    'Campaigned for Medicare for All in partnership with healthcare workers',
    'Supported labor organizing efforts across the state',
    'Built coalitions with community organizations fighting for racial justice'
  ]
}: AchievementsProps) {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
      <ul className="space-y-4">
        {achievements.map((achievement, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="h-6 w-6 text-dsa-red flex-shrink-0 mr-4 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-lg">{achievement}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
