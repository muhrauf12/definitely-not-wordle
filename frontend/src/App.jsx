import Header from './components/Header';
import Board from './components/Board';
import { MAX_GUESSES } from './utils/constants';

const placeholderRows = Array.from({ length: MAX_GUESSES }, () => ({
  letters: '',
  feedback: null,
}));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-4">
        <Board rows={placeholderRows} />
      </main>
    </div>
  );
}