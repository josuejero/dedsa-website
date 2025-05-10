import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward the request to your WordPress GraphQL endpoint
    const wpEndpoint = process.env.WORDPRESS_API_URL || 'http://delaware-dsa-backend.local/graphql';

    const response = await fetch(wpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GraphQL API route error:', error);
    return NextResponse.json({ errors: [{ message: 'Internal server error' }] }, { status: 500 });
  }
}
