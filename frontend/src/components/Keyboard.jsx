const KEY_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

const STATUS_STYLES = {
  correct: 'bg-green-600 text-white',
  present: 'bg-yellow-500 text-white',
  absent: 'bg-zinc-800 text-zinc-500',
};

export default function Keyboard({ onKey, letterStatus = {} }) {
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-lg mx-auto pb-4">
      {KEY_ROWS.map((row, i) => (
        <div key={i} className="flex gap-1.5 justify-center">
          {row.map((key) => {
            const status = letterStatus[key];
            const base = status ? STATUS_STYLES[status] : 'bg-zinc-600 text-white';
            const wide = key === 'ENTER' || key === 'BACKSPACE';
            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={`${base} ${wide ? 'px-3 text-xs' : 'w-9 sm:w-10'} h-12 sm:h-14 rounded font-semibold uppercase active:scale-95 transition`}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}