import { NextRequest, NextResponse } from 'next/server';
import { assistant, AssistantInput } from '@/ai/flows/assistant-flow';

export async function POST(req: NextRequest) {
  try {
    const { history } = (await req.json()) as AssistantInput;

    if (!history) {
      return NextResponse.json({ error: 'History is required' }, { status: 400 });
    }

    const result = await assistant({ history });
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in assistant API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
