import { useCallback, useEffect, useState } from 'react';
import { MAX_GUESSES, WORD_LENGTH } from '../utils/constants';

const emptyRows = () =>
  Array.from({ length: MAX_GUESSES }, () => ({ letters: '', feedback: null }));

export function useWordleGame() {
  const [rows, setRows] = useState(emptyRows());
  const [currentRow, setCurrentRow] = useState(0);
  const [error, setError] = useState(null);

  const setLetters = useCallback((letters) => {
    setRows((prev) => {
      const next = prev.slice();
      next[currentRow] = { ...next[currentRow], letters };
      return next;
    });
  }, [currentRow]);

  const handleKey = useCallback((key) => {
    const current = rows[currentRow];
    if (!current) return;

    if (key === 'ENTER') {
      if (current.letters.length !== WORD_LENGTH) {
        setError('Not enough letters');
        setTimeout(() => setError(null), 1200);
        return;
      }
      return;
    }

    if (key === 'BACKSPACE') {
      if (current.letters.length > 0) setLetters(current.letters.slice(0, -1));
      return;
    }

    if (/^[A-Z]$/.test(key) && current.letters.length < WORD_LENGTH) {
      setLetters(current.letters + key);
    }
  }, [rows, currentRow, setLetters]);

  return { rows, currentRow, error, handleKey };
}