import { useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOverModal from './components/GameOverModal';
import { useWordleGame } from './hooks/useWordleGame';

export default function App() {
  const game = useWordleGame();

  useEffect(() => {
    function onKeyDown(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toUpperCase();
      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
        e.preventDefault();
        game.handleKey(key);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [game]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar
          wordLength={game.wordLength}
          onWordLengthChange={game.setWordLength}
          disabled={game.submitting || game.status === 'loading'}
        />
        <main className="flex-1 flex flex-col items-center px-4 py-4">
          {game.error && (
            <div className="bg-red-600 text-white px-3 py-2 rounded text-sm mb-2">
              {game.error}
            </div>
          )}
          <Board rows={game.rows} wordLength={game.wordLength} />
          <div className="mt-auto w-full">
            <Keyboard onKey={game.handleKey} letterStatus={game.letterStatus} />
          </div>
        </main>
      </div>
      {(game.status === 'won' || game.status === 'lost') && (
        <GameOverModal
          status={game.status}
          answer={game.answer}
          onPlayAgain={game.restart}
        />
      )}
    </div>
  );
}