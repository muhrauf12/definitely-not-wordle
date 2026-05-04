# Definitely Not Wordle

A word game built for the GoLinks 2026 Fullstack Intern Project.

**Live demo:** https://definitely-not-wordle-chi.vercel.app/
**API:** https://definitely-not-wordle-api.onrender.com

## Stack

- **Frontend:** React + Vite + Tailwind CSS, hosted on Vercel
- **Backend:** Node.js + Express, hosted on Render
- **Word validation:** https://dictionaryapi.dev/

## Game Rules

You have 6 tries to guess a hidden word. After each guess, tiles light up:

- Green — correct letter, correct position
- Yellow — correct letter, wrong position
- Gray — letter is not in the word

The sidebar lets you switch between 4, 5, 6, and 7 letter words. Changing length starts a new game.

## API

POST: `/api/games`, Start a new game. Body: `{ wordLength }`.
POST: `/api/games/:id/guess`, Submit a guess. Body: `{ guess }`.
GET: `/api/games/:id/answer`, Reveal the secret word.
GET: `/api/health`, Health check.


## Notes

- **Duplicate letters** Evaluating a guess like `LLAMA` against `ALLEY` needs a two pass solution: mark greens first and consume those positions from the answer, then mark yellows from whatever's left. `backend/lib/evaluate.js`.
- **Word validation fails** Guesses are checked against the Free Dictionary API. If the API is down or rate limits, the validator lets the guess through rather than blocking the player.
