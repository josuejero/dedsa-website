// src/app/api/newsletters/route.ts
import { NextResponse } from 'next/server';

// Mock newsletter data - replace with your actual data source
const newsletters = [
  {
    id: 'march-2024',
    title: 'Delaware DSA March 2024 Newsletter',
    date: '2024-03-01',
    slug: 'march-2024',
    author: 'Delaware DSA Communications Committee',
    excerpt: 'Updates on our organizing efforts, upcoming events, and member spotlights.',
    content: `
      <h2>Message from the Chair</h2>
      <p>Comrades, as we move through March, our organizing efforts continue to gain momentum. This month has been marked by significant victories in our housing justice campaign and growing membership engagement.</p>
      
      <h2>Campaign Updates</h2>
      <h3>Housing Justice</h3>
      <p>Our tenant organizing efforts have resulted in three successful rent strikes this month. We've helped over 50 families avoid eviction and secured heating repairs for dozens of units across Wilmington.</p>
      
      <h3>Healthcare for All</h3>
      <p>The Medicare for All campaign is building steam with weekly phone banks and our upcoming healthcare town hall scheduled for April 15th.</p>
      
      <h2>Member Spotlight</h2>
      <p>This month we're highlighting the incredible work of Sarah Martinez, who has been leading our mutual aid food distribution program...</p>
      
      <h2>Upcoming Events</h2>
      <ul>
        <li>April 15: Healthcare Town Hall</li>
        <li>April 22: Earth Day Climate Action</li>
        <li>April 28: Monthly General Meeting</li>
      </ul>
    `,
    tags: ['organizing', 'housing', 'healthcare', 'mutual aid'],
    featured: true,
  },
  {
    id: 'february-2024',
    title: 'Delaware DSA February 2024 Newsletter',
    date: '2024-02-01',
    slug: 'february-2024',
    author: 'Delaware DSA Communications Committee',
    excerpt: 'Building momentum in the new year with exciting campaigns and actions.',
    content: `
      <h2>New Year, New Organizing</h2>
      <p>February has been a month of renewed energy and commitment to our shared values of democratic socialism.</p>
      
      <h2>Membership Growth</h2>
      <p>We welcomed 25 new members this month, bringing our total active membership to over 200 comrades!</p>
      
      <h2>Legislative Updates</h2>
      <p>Our lobbying efforts for paid sick leave legislation are showing promise, with several legislators expressing support.</p>
    `,
    tags: ['membership', 'legislation', 'organizing'],
    featured: false,
  },
  {
    id: 'latest',
    title: 'Delaware DSA Latest Newsletter',
    date: '2024-06-01',
    slug: 'latest',
    author: 'Delaware DSA Communications Committee',
    excerpt: 'Our most recent updates and upcoming summer activities.',
    content: `
      <h2>Summer Organizing Season</h2>
      <p>As we head into summer, we're ramping up our outdoor organizing efforts and community engagement.</p>
      
      <h2>Pride Month Activities</h2>
      <p>Join us for Pride events throughout June as we stand in solidarity with our LGBTQ+ comrades.</p>
      
      <h2>Electoral Organizing</h2>
      <p>With local elections approaching, we're endorsing progressive candidates who align with our values.</p>
    `,
    tags: ['summer', 'pride', 'electoral', 'community'],
    featured: true,
  },
];

export async function GET() {
  try {
    return NextResponse.json(newsletters);
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
