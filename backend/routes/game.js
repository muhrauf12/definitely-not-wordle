import express from 'express';
import { randomUUID } from 'crypto';
import { getRandomAnswer } from '../data/words.js';
import { evaluateGuess } from '../lib/evaluate.js';
import { isRealWord } from '../lib/validateWord.js';

export const MAX_GUESSES = 6;
export const VALID_LENGTHS = [4, 5, 6, 7];
export const DEFAULT_LENGTH = 5;

const games = new Map();

const router = express.Router();

router.post('/games', (req, res) => {
  const { wordLength = DEFAULT_LENGTH } = req.body ?? {};
  if (!VALID_LENGTHS.includes(wordLength)) {
    return res.status(400).json({
      error: `Word length must be one of: ${VALID_LENGTHS.join(', ')}`,
    });
  }

  const id = randomUUID();
  games.set(id, {
    id,
    wordLength,
    answer: getRandomAnswer(wordLength),
    guesses: [],
    status: 'playing',
    createdAt: Date.now(),
  });
  res.status(201).json({
    gameId: id,
    maxGuesses: MAX_GUESSES,
    wordLength,
  });
});

router.post('/games/:id/guess', async (req, res) => {
  const game = games.get(req.params.id);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  if (game.status !== 'playing') {
    return res.status(400).json({ error: 'Game is already over' });
  }

  const { guess } = req.body ?? {};
  if (typeof guess !== 'string' || guess.length !== game.wordLength) {
    return res.status(400).json({
      error: `Guess must be a ${game.wordLength}-letter string`,
    });
  }
  if (!/^[a-zA-Z]+$/.test(guess)) {
    return res.status(400).json({ error: 'Guess must contain only letters' });
  }

  const normalized = guess.toUpperCase();

  if (normalized !== game.answer && !(await isRealWord(normalized))) {
    return res.status(400).json({ error: 'Not a valid word' });
  }

  const feedback = evaluateGuess(normalized, game.answer);
  game.guesses.push({ guess: normalized, feedback });

  const won = normalized === game.answer;
  const lost = !won && game.guesses.length >= MAX_GUESSES;
  if (won) game.status = 'won';
  else if (lost) game.status = 'lost';

  res.json({
    guess: normalized,
    feedback,
    guessesUsed: game.guesses.length,
    guessesLeft: MAX_GUESSES - game.guesses.length,
    status: game.status,
    answer: game.status === 'playing' ? null : game.answer,
  });
});

router.get('/games/:id/answer', (req, res) => {
  const game = games.get(req.params.id);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  res.json({ answer: game.answer });
});

export { games };
export default router;