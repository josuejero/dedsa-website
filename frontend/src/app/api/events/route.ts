import { promises as fs } from 'fs';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  // 1. Validate env
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    console.error('GOOGLE_CALENDAR_ID is not set');
    return NextResponse.json({ error: 'Missing calendar ID' }, { status: 500 });
  }

  // 2. Load service account
  let serviceAccount: any;
  try {
    const credsPath = path.join(process.cwd(), 'src', 'googleService.json');
    const content = await fs.readFile(credsPath, 'utf8');
    serviceAccount = JSON.parse(content);
  } catch (err) {
    console.error('Could not load googleService.json:', err);
    return NextResponse.json({ error: 'Credentials missing' }, { status: 500 });
  }

  try {
    // 3. Authenticate
    const auth = new google.auth.JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });
    const calendar = google.calendar({ version: 'v3', auth });

    // 4. Fetch events
    const { data } = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
    });

    // 5. Transform
    const events = (data.items || []).map((evt) => ({
      id: evt.id || '',
      summary: evt.summary || 'No title',
      description: evt.description || '',
      start: evt.start || {},
      end: evt.end || {},
      location: evt.location || '',
    }));

    return NextResponse.json(events);
  } catch (err) {
    console.error('Calendar API error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
