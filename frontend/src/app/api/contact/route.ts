import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    
    const { name, email, subject, message } = await req.json();

    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    
    
    
    

    
    console.log('Contact form submission:', { name, email, subject, message });

    
    await new Promise((resolve) => setTimeout(resolve, 500));

    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
