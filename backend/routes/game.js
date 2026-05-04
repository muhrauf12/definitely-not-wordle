import express from 'express';
import { randomUUID } from 'crypto';
import { getRandomAnswer } from '../data/words.js';
import { evaluateGuess } from '../lib/evaluate.js';
import { isRealWord } from '../lib/validateWord.js';

export const MAX_GUESSES = 6;
export const WORD_LENGTH = 5;

// In-memory game store. Fine for an intern project; swap for Redis later.
const games = new Map();

const router = express.Router();

router.post('/games', (req, res) => {
  const id = randomUUID();
  games.set(id, {
    id,
    answer: getRandomAnswer(),
    guesses: [],
    status: 'playing',
    createdAt: Date.now(),
  });
  res.status(201).json({
    gameId: id,
    maxGuesses: MAX_GUESSES,
    wordLength: WORD_LENGTH,
  });
});

router.post('/games/:id/guess', async (req, res) => {
  const game = games.get(req.params.id);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  if (game.status !== 'playing') {
    return res.status(400).json({ error: 'Game is already over' });
  }

  const { guess } = req.body ?? {};
  if (typeof guess !== 'string' || guess.length !== WORD_LENGTH) {
    return res.status(400).json({ error: 'Guess must be a 5-letter string' });
  }
  if (!/^[a-zA-Z]+$/.test(guess)) {
    return res.status(400).json({ error: 'Guess must contain only letters' });
  }

  const normalized = guess.toUpperCase();

  // Always allow the actual answer through even if the dictionary doesn't know it.
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

// Per the spec: include a "get answer" endpoint that reveals the secret word.
router.get('/games/:id/answer', (req, res) => {
  const game = games.get(req.params.id);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  res.json({ answer: game.answer });
});

export { games };
export default router;