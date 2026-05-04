const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `Request failed: ${res.status}`);
  return body;
}

export const startNewGame = (wordLength) =>
  request('/games', {
    method: 'POST',
    body: JSON.stringify({ wordLength }),
  });

export const submitGuess = (gameId, guess) =>
  request(`/games/${gameId}/guess`, {
    method: 'POST',
    body: JSON.stringify({ guess }),
  });

export const getAnswer = (gameId) => request(`/games/${gameId}/answer`);