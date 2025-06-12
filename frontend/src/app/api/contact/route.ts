import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isEmail, isNonEmpty } from '@/core/utils/validation';
import { sanitizeString } from '@/core/utils/sanitization';

export async function POST(req: Request) {
  try {
    
    const { name, email, subject, message } = await req.json();

    const cleanName = sanitizeString(name);
    const cleanEmail = sanitizeString(email);
    const cleanSubject = sanitizeString(subject || "");
    const cleanMessage = sanitizeString(message);

    if (!isNonEmpty(cleanName) || !isEmail(cleanEmail) || !isNonEmpty(cleanMessage)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE_HOST,
      port: Number(process.env.EMAIL_SERVICE_PORT || "587"),
      auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
      },
    });

    await transporter.sendMail({
      from: cleanEmail,
      to: process.env.CONTACT_EMAIL_TO || process.env.EMAIL_SERVICE_USER,
      subject: cleanSubject || `Contact form submission from ${cleanName}`,
      text: cleanMessage,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
