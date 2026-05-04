/**
 Compare a guess to the answer and return colors.
 **/
export function evaluateGuess(guess, answer) {
  const result = new Array(guess.length).fill('absent');
  const answerChars = answer.split('');

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = 'correct';
      answerChars[i] = null;
    }
  }

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