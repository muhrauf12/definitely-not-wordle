import { useCallback, useEffect, useState } from 'react';
import { MAX_GUESSES, DEFAULT_WORD_LENGTH } from '../utils/constants';
import { startNewGame, submitGuess } from '../api';

const emptyRows = () =>
  Array.from({ length: MAX_GUESSES }, () => ({ letters: '', feedback: null }));

export function useWordleGame() {
  const [wordLength, setWordLengthState] = useState(DEFAULT_WORD_LENGTH);
  const [gameId, setGameId] = useState(null);
  const [rows, setRows] = useState(emptyRows);
  const [currentRow, setCurrentRow] = useState(0);
  const [status, setStatus] = useState('loading');
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const startGame = useCallback(async (length) => {
    setStatus('loading');
    setError(null);
    setAnswer(null);
    setRows(emptyRows());
    setCurrentRow(0);
    try {
      const game = await startNewGame(length);
      setGameId(game.gameId);
      setStatus('playing');
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    startGame(DEFAULT_WORD_LENGTH);
  }, []);

  const restart = useCallback(
    () => startGame(wordLength),
    [startGame, wordLength],
  );

  const setWordLength = useCallback(
    (length) => {
      if (length === wordLength) return;
      setWordLengthState(length);
      startGame(length);
    },
    [wordLength, startGame],
  );

  const setLetters = useCallback((letters) => {
    setRows((prev) => {
      const next = prev.slice();
      next[currentRow] = { ...next[currentRow], letters };
      return next;
    });
  }, [currentRow]);

  const flashError = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 1500);
  };

  const handleKey = useCallback(async (key) => {
    if (status !== 'playing' || submitting) return;
    const current = rows[currentRow];
    if (!current) return;

    if (key === 'ENTER') {
      if (current.letters.length !== wordLength) {
        flashError('Not enough letters');
        return;
      }
      try {
        setSubmitting(true);
        const result = await submitGuess(gameId, current.letters);
        setRows((prev) => {
          const next = prev.slice();
          next[currentRow] = { letters: result.guess, feedback: result.feedback };
          return next;
        });
        setCurrentRow((r) => r + 1);
        if (result.status !== 'playing') {
          setStatus(result.status);
          setAnswer(result.answer);
        }
      } catch (e) {
        flashError(e.message);
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (key === 'BACKSPACE') {
      if (current.letters.length > 0) setLetters(current.letters.slice(0, -1));
      return;
    }

    if (/^[A-Z]$/.test(key) && current.letters.length < wordLength) {
      setLetters(current.letters + key);
    }
  }, [status, submitting, rows, currentRow, gameId, wordLength, setLetters]);

  const letterStatus = {};
  const priority = { absent: 0, present: 1, correct: 2 };
  for (const row of rows) {
    if (!row.feedback) continue;
    for (let i = 0; i < row.letters.length; i++) {
      const ltr = row.letters[i];
      const fb = row.feedback[i];
      if (!letterStatus[ltr] || priority[fb] > priority[letterStatus[ltr]]) {
        letterStatus[ltr] = fb;
      }
    }
  }

  return {
    wordLength,
    setWordLength,
    rows,
    currentRow,
    status,
    answer,
    error,
    submitting,
    handleKey,
    restart,
    letterStatus,
  };
}