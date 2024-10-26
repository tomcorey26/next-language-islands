import { OpenAI } from 'openai';

class ChatGptService {
  private _client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    this._client = new OpenAI({ apiKey });
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
