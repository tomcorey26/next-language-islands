import { OpenAI } from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const FlashCard = z.object({
  sentence: z.string(),
  translation: z.string(),
});

class ChatGptService {
  private _client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    this._client = new OpenAI({ apiKey });
  }

  async generateFlashCards(prompt: string, language: string) {
    const completion = await this._client.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `The user will provide a prompt of a situation, and you need to generate flashcards of useful sentences to study pertaining to the prompt in ${language}.`,
        },
        { role: 'user', content: prompt },
      ],
      response_format: zodResponseFormat(FlashCard, 'flashcard'),
    });

    const flashcards = completion.choices[0].message.parsed;
    return flashcards;
  }

  async generateResponse(prompt: string): Promise<string | null> {
    try {
      const chatCompletion = await this._client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o-mini',
      });

      console.log('Chat completion:', chatCompletion.choices);
      return chatCompletion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }
}

const chatGptService = new ChatGptService();

export { chatGptService };
