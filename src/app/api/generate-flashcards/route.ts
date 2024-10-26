// src/app/api/generate-flashcards/route.ts
import { chatGptService } from '@/services/ChatGptService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  // Call your chatGptService here
  const response = await chatGptService.generateResponse(prompt);

  return NextResponse.json({ response });
}
