/**
 * Compare a guess to the answer and return per-letter feedback.
 *
 * Each entry is one of:
 *   - 'correct' (green)  letter matches position
 *   - 'present' (yellow) letter exists elsewhere in the answer
 *   - 'absent'  (gray)   letter not in the answer (or already accounted for)
 *
 * Two-pass approach is needed to handle duplicate letters correctly.
 * Example: answer "ALLEY", guess "LLAMA" -> [present, correct, present, absent, absent]
 */
export function evaluateGuess(guess, answer) {
  const result = new Array(guess.length).fill('absent');
  const answerChars = answer.split('');

  // Pass 1: mark greens and consume those letters from the answer.
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = 'correct';
      answerChars[i] = null;
    }
  }

  // Pass 2: mark yellows from whatever's left.
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'correct') continue;
    const idx = answerChars.indexOf(guess[i]);
    if (idx !== -1) {
      result[i] = 'present';
      answerChars[idx] = null;
    }
  }

  return result;
}