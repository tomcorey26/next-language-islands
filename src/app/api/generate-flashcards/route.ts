import { chatGptService } from '@/services/ChatGptService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt, language } = await request.json();

  const response = await chatGptService.generateFlashCards(prompt, language);

  return NextResponse.json({ response });
}
