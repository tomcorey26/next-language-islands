import { api } from '@/services/ApiClient';

class FlashCardsApi {
  async generateFlashCards(prompt: string): Promise<{ response: string }> {
    return api.post('/generate-flashcards', { prompt });
  }
}

export const flashCardsApi = new FlashCardsApi();
