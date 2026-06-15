import { NextResponse } from 'next/server';
import { chatWithCoach } from '@/lib/ai/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    // SECURITY: Input Validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid input: message must be a string.' }, { status: 400 });
    }

    // SECURITY: Length Limiting
    if (message.trim().length === 0 || message.length > 500) {
      return NextResponse.json({ error: 'Message must be between 1 and 500 characters.' }, { status: 400 });
    }

    const aiResponse = await chatWithCoach(message);

    return NextResponse.json({ reply: aiResponse });
  } catch (error: unknown) {
    console.error('Coach API Error:', error);
    // SECURITY: Sanitize error messages sent to the client
    const errorMessage = error instanceof Error ? error.message : 'Failed to process chat.';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
