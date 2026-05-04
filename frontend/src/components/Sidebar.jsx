import { VALID_WORD_LENGTHS } from '../utils/constants';

export default function Sidebar({ wordLength, onWordLengthChange, disabled }) {
  return (
    <aside
      className="
        static md:absolute md:left-4 md:top-4
        w-full md:w-44
        mb-4 md:mb-0
        bg-zinc-800/60 md:bg-transparent
        border border-zinc-700 md:border-zinc-700
        rounded-lg p-3
      "
    >
      <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
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
      <p className="hidden md:block text-xs text-zinc-500 mt-2 leading-snug">
        Switching length starts a new game.
      </p>
    </aside>
  );
}