// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(req: Request) {
  let jsonBody;

  try {
    jsonBody = await req.json();
  } catch (err) {
    console.error('❌ Failed to parse JSON:', err);
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // 2️⃣ Validate with Zod
  const result = contactSchema.safeParse(jsonBody);

  if (!result.success) {
    console.error('❌ Zod validation error:', result.error.format());
    return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
  }

  const { name, email, phone, message } = result.data;

  try {
    const contact = await prisma.contact.create({
      data: { name, email, phone, message },
    });

    console.log('✅ Contact saved:', contact);
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('❌ Prisma error:', error);
    return NextResponse.json(
      { error: 'Database error', details: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
