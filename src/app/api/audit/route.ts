import { NextResponse } from 'next/server';
import { performCarbonAudit } from '@/lib/ai/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { habits } = body;

    // SECURITY: Input Validation
    if (!habits || typeof habits !== 'string') {
      return NextResponse.json({ error: 'Invalid input: habits must be a string.' }, { status: 400 });
    }
    
    // SECURITY: Length Limiting (prevent extremely large payloads)
    if (habits.trim().length === 0 || habits.length > 2000) {
      return NextResponse.json({ error: 'Input must be between 1 and 2000 characters.' }, { status: 400 });
    }

    const aiResponse = await performCarbonAudit(habits);

    return NextResponse.json(aiResponse);
  } catch (error: unknown) {
    console.error('Audit API Error:', error);
    // SECURITY: Sanitize error messages sent to the client
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during the audit.';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
