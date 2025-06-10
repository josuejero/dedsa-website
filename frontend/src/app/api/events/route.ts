import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import serviceAccount from '../../../googleService.json';

type CalendarEventRaw = {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  location?: string;
};

export async function GET() {
  const auth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });

  const calendar = google.calendar({ version: 'v3', auth });
  const { data } = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID!,
    timeMin: new Date().toISOString(),
    maxResults: 5,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events: CalendarEventRaw[] = (data.items || []).map((e) => ({
    id: e.id!,
    summary: e.summary || 'No title',
    start: e.start!,
    location: e.location,
  }));

  return NextResponse.json(events);
}
