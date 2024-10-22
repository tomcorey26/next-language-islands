'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface FlashCard {
  id: number;
  sentence: string;
  translation: string;
  audioUrl: string;
  isFavorite: boolean;
}

export default function Home() {
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [newSentence, setNewSentence] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleAddFlashCard = () => {
    if (newSentence && newTranslation) {
      const newCard: FlashCard = {
        id: Date.now(),
        sentence: newSentence,
        translation: newTranslation,
        audioUrl: '', // You'll need to implement audio upload/generation
        isFavorite: false,
      };
      setFlashCards([...flashCards, newCard]);
      setNewSentence('');
      setNewTranslation('');
    }
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
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <header>
        <h1 className="text-2xl font-bold mb-4">Language Study App</h1>
      </header>
      <main className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter sentence"
            value={newSentence}
            onChange={(e) => setNewSentence(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Enter translation"
            value={newTranslation}
            onChange={(e) => setNewTranslation(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddFlashCard}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Flash Card
          </button>
        </div>
        <div>
          <label className="flex items-center gap-2">
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
            />
          ))}
        </div>
      </main>
      <footer className="text-center text-sm text-gray-500">
        © 2024 Language Study App
      </footer>
    </div>
  );
}

function FlashCard({
  card,
  onToggleFavorite,
}: {
  card: FlashCard;
  onToggleFavorite: (id: number) => void;
}) {
  const [showTranslation, setShowTranslation] = useState(false);

  const handlePlayAudio = () => {
    const audio = new Audio(card.audioUrl);
    audio.play();
  };

  return (
    <div className="border p-4 rounded shadow">
      <p className="font-bold mb-2">{card.sentence}</p>
      {showTranslation && (
        <p className="text-gray-600 mb-2">{card.translation}</p>
      )}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="text-blue-500"
        >
          {showTranslation ? 'Hide' : 'Show'} Translation
        </button>
        <button onClick={handlePlayAudio} className="text-green-500">
          Play Audio
        </button>
        <button
          onClick={() => onToggleFavorite(card.id)}
          className={`text-yellow-500 ${card.isFavorite ? 'font-bold' : ''}`}
        >
          {card.isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
}
