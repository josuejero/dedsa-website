import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import serviceAccount from '../../../googleService.json';

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
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 20, // adjust as needed
  });

  const events = (data.items || []).map((e) => ({
    id: e.id!,
    title: e.summary || 'No title',
    description: e.description ?? undefined,
    startDate: e.start?.dateTime ?? e.start?.date!,
    endDate: e.end?.dateTime ?? e.end?.date!,
    location: e.location ?? undefined,
    isAllDay: Boolean(e.start?.date && !e.start?.dateTime),
    // …you can map more e.* fields here if your EventCard needs them
  }));

  return NextResponse.json(events);
}
