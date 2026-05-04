import { VALID_WORD_LENGTHS } from '../utils/constants';

export default function Sidebar({ wordLength, onWordLengthChange, disabled }) {
  return (
    <aside className="md:w-56 border-b md:border-b-0 md:border-r border-zinc-700 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
        Word Length
      </h2>
      <div className="flex md:flex-col gap-2">
        {VALID_WORD_LENGTHS.map((len) => {
          const active = wordLength === len;
          return (
            <button
              key={len}
              onClick={() => onWordLengthChange(len)}
              disabled={disabled && !active}
              className={`flex-1 md:flex-none px-3 py-2 rounded font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed ${
                active
                  ? 'bg-green-600 text-white'
                  : 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600'
              }`}
            >
              {len} letters
            </button>
          );
        })}
      </div>
      <p className="hidden md:block text-xs text-zinc-500 mt-3 leading-snug">
        Switching length starts a new game.
      </p>
    </aside>
  );
}