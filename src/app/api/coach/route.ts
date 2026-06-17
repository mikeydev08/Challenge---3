import { NextResponse } from 'next/server';
import { chatWithCoach } from '@/lib/ai/gemini';

/**
 * POST /api/coach
 *
 * Accepts a JSON body with a `message` string and returns
 * a conversational AI reply from the Gemini-powered coach.
 *
 * Security:
 * - Validates that `message` is a non-empty string.
 * - Enforces a 500-character limit to prevent payload abuse.
 * - Sanitises error messages before returning them to the client.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: message must be a string.' },
        { status: 400 },
      );
    }

    if (message.trim().length === 0 || message.length > 500) {
      return NextResponse.json(
        { error: 'Message must be between 1 and 500 characters.' },
        { status: 400 },
      );
    }

    const aiResponse = await chatWithCoach(message);
    return NextResponse.json({ reply: aiResponse });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to process chat.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
