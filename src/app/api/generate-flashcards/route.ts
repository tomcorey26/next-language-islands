import { chatGptService } from '@/services/ChatGptService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const response = await chatGptService.generateResponse(prompt);

  return NextResponse.json({ response });
}
