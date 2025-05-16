import { NextResponse } from 'next/server';
import newslettersData from '../../../data/newsletters.json';

export async function GET() {
  return NextResponse.json(newslettersData);
}
