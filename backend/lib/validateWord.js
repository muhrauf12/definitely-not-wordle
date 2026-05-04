// Free Dictionary API (https://dictionaryapi.dev

const DICTIONARY_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const cache = new Map();

export async function isRealWord(word) {
  const key = word.toLowerCase();
  if (cache.has(key)) return cache.get(key);

  try {
    const res = await fetch(`${DICTIONARY_URL}/${key}`);

    if (res.status === 404) {
      cache.set(key, false);
      return false;
    }
    if (!res.ok) {
      console.warn(`Dictionary API returned ${res.status} for "${key}"`);
      return true; 
    }
    cache.set(key, true);
    return true;
  } catch (err) {
    console.warn(`Dictionary API error for "${key}":`, err.message);
    return true; 
  }
}