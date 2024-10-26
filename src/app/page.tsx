'use client';
import { useState } from 'react';
import { flashCardsApi } from '@/services/api/FlashCardsApi';

interface FlashCard {
  id: number;
  sentence: string;
  translation: string;
  isFavorite: boolean;
}

export default function Home() {
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [newSentence, setNewSentence] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleAddFlashCard = () => {
    if (newSentence && newTranslation) {
      const newCard: FlashCard = {
        id: Date.now(),
        sentence: newSentence,
        translation: newTranslation,
        isFavorite: false,
      };
      setFlashCards([...flashCards, newCard]);
      setNewSentence('');
      setNewTranslation('');
    }
  };

  const handleGenerateFlashCards = async () => {
    const res = await flashCardsApi.generateFlashCards(aiPrompt);
    console.log('Response:', res);
  };

  const handleToggleFavorite = (id: number) => {
    setFlashCards(
      flashCards.map((card) =>
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
      )
    );
  };

  const displayedFlashCards = showFavoritesOnly
    ? flashCards.filter((card) => card.isFavorite)
    : flashCards;

  return (
    <div
      className={`grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)] ${
        isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <header className="flex justify-between items-center">
        <h1
          className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-indigo-400' : 'text-indigo-700'
          }`}
        >
          Language Study
        </h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`px-4 py-2 rounded ${
            isDarkMode
              ? 'bg-gray-700 text-gray-200'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Have AI generate flash cards"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className={`border p-2 rounded ${
              isDarkMode
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          />
          <button
            onClick={handleGenerateFlashCards}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded transition duration-300"
          >
            Generate Flash Cards
          </button>
          <input
            type="text"
            placeholder="Enter sentence"
            value={newSentence}
            onChange={(e) => setNewSentence(e.target.value)}
            className={`border p-2 rounded ${
              isDarkMode
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          />
          <input
            type="text"
            placeholder="Enter translation"
            value={newTranslation}
            onChange={(e) => setNewTranslation(e.target.value)}
            className={`border p-2 rounded ${
              isDarkMode
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          />
          <button
            onClick={handleAddFlashCard}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded transition duration-300"
          >
            Add Flash Card
          </button>
        </div>
        <div>
          <label
            className={`flex items-center gap-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
            />
            Show favorites only
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayedFlashCards.map((card) => (
            <FlashCard
              key={card.id}
              card={card}
              onToggleFavorite={handleToggleFavorite}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </main>
      <footer
        className={`text-center text-sm ${
          isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
        }`}
      >
        © 2024 Language Study App
      </footer>
    </div>
  );
}

function FlashCard({
  card,
  onToggleFavorite,
  isDarkMode,
}: {
  card: FlashCard;
  onToggleFavorite: (id: number) => void;
  isDarkMode: boolean;
}) {
  const [showTranslation, setShowTranslation] = useState(false);

  const handlePlayAudio = () => {
    const utterance = new SpeechSynthesisUtterance(card.translation);
    utterance.lang = 'es-ES'; // Set Spanish language
    const voice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang === 'es-ES');
    if (voice) {
      utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className={`border p-4 rounded shadow ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <p
        className={`font-bold mb-2 ${
          isDarkMode ? 'text-indigo-400' : 'text-indigo-700'
        }`}
      >
        {card.sentence}
      </p>
      {showTranslation && (
        <p className={isDarkMode ? 'text-gray-300 mb-2' : 'text-gray-700 mb-2'}>
          {card.translation}
        </p>
      )}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={`${
            isDarkMode
              ? 'text-indigo-400 hover:text-indigo-300'
              : 'text-indigo-600 hover:text-indigo-800'
          } transition duration-300`}
        >
          {showTranslation ? 'Hide' : 'Show'} Translation
        </button>
        <button
          onClick={handlePlayAudio}
          className={`${
            isDarkMode
              ? 'text-emerald-400 hover:text-emerald-300'
              : 'text-emerald-600 hover:text-emerald-800'
          } transition duration-300`}
        >
          Play Translation
        </button>
        <button
          onClick={() => onToggleFavorite(card.id)}
          className={`${
            isDarkMode
              ? 'text-yellow-400 hover:text-yellow-300'
              : 'text-amber-500 hover:text-amber-600'
          } transition duration-300 ${card.isFavorite ? 'font-bold' : ''}`}
        >
          {card.isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
}
