import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check for required environment variables
    if (!process.env.GOOGLE_CALENDAR_ID) {
      console.error('GOOGLE_CALENDAR_ID environment variable is not set');
      return NextResponse.json(
        { error: 'Calendar configuration missing' },
        { status: 500 }
      );
    }

    // Import service account credentials
    let serviceAccount;
    try {
      serviceAccount = await import('../../../googleService.json');
    } catch (error) {
      console.error('Google service account file not found:', error);
      return NextResponse.json(
        { error: 'Service account credentials missing' },
        { status: 500 }
      );
    }

    // Create Google Auth client
    const auth = new google.auth.JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    // Initialize Calendar API
    const calendar = google.calendar({ version: 'v3', auth });

    // Fetch events
    const { data } = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
    });

    // Transform events to expected format
    const events = (data.items || []).map((event) => ({
      id: event.id || '',
      summary: event.summary || 'No title',
      description: event.description || '',
      start: event.start || {},
      end: event.end || {},
      location: event.location || '',
    }));

    return NextResponse.json(events);
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}
