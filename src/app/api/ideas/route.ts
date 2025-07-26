import { NextRequest, NextResponse } from 'next/server';
import { submitIdea, IdeaSubmissionInput } from '@/ai/flows/idea-submission-flow';

export async function POST(req: NextRequest) {
  try {
    const { idea } = (await req.json()) as IdeaSubmissionInput;

    if (!idea) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    const result = await submitIdea({ idea });

    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in idea submission API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
