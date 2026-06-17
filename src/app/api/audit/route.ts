import { NextResponse } from 'next/server';
import { performCarbonAudit } from '@/lib/ai/gemini';

/**
 * POST /api/audit
 *
 * Accepts a JSON body with a `habits` string and returns
 * a structured carbon footprint analysis from Gemini.
 *
 * Security:
 * - Validates that `habits` is a non-empty string.
 * - Enforces a 2 000-character limit to prevent payload abuse.
 * - Sanitises error messages before returning them to the client.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { habits } = body;

    if (!habits || typeof habits !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: habits must be a string.' },
        { status: 400 },
      );
    }

    if (habits.trim().length === 0 || habits.length > 2000) {
      return NextResponse.json(
        { error: 'Input must be between 1 and 2000 characters.' },
        { status: 400 },
      );
    }

    const aiResponse = await performCarbonAudit(habits);
    return NextResponse.json(aiResponse);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred during the audit.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
