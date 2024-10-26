import { api } from '@/services/ApiClient';

// TODO: Change to something that auto generates the api client and api routes, and react-query hooks

class FlashCardsApi {
  async generateFlashCards(
    prompt: string,
    language: string
  ): Promise<{ response: string }> {
    return api.post('/generate-flashcards', { prompt, language });
  }
}

export const flashCardsApi = new FlashCardsApi();
