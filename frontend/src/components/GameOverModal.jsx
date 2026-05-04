export default function GameOverModal({ status, answer, onPlayAgain }) {
  const won = status === 'won';
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-2">
          {won ? 'You got it!' : 'Out of guesses'}
        </h2>
        <p className="text-zinc-300 mb-4">
          The word was{' '}
          <span className="font-bold tracking-widest">{answer}</span>
        </p>
        <button
          onClick={onPlayAgain}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold w-full"
        >
          Play again
        </button>
      </div>
    </div>
  );
}