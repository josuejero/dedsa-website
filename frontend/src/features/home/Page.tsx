import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Delaware chapter of the Democratic Socialists of America (DSA).',
};

export default function HomePage() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-4">Home Page</h1>
        <p>This is a placeholder for the home page components</p>
      </div>
    </div>
  );
}
