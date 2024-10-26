import { chatGptService } from '@/services/ChatGptService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt, language } = await request.json();

  const response = await chatGptService.generateFlashCards(prompt, language);

  if (!response) {
    return NextResponse.json(
      { error: 'No response from GPT' },
      { status: 500 }
    );
  }

  return NextResponse.json({ flashcards: response.flashcards });
}
