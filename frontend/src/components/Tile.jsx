const STATUS_STYLES = {
  correct: 'bg-green-600 border-green-600 text-white',
  present: 'bg-yellow-500 border-yellow-500 text-white',
  absent: 'bg-zinc-700 border-zinc-700 text-white',
};

export default function Tile({ letter, status }) {
  const style = status
    ? STATUS_STYLES[status]
    : letter
      ? 'border-zinc-500 text-white'
      : 'border-zinc-700 text-white';

  return (
    <div
      className={`w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center text-2xl font-bold uppercase ${style}`}
    >
      {letter}
    </div>
  );
}