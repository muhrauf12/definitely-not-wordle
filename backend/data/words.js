// A curated list of 5-letter answer words.
// Kept small and common so the game is fair.
export const ANSWER_WORDS = [
  'APPLE', 'BEACH', 'BRAIN', 'BREAD', 'CHAIR', 'CLOUD', 'CRANE',
  'DREAM', 'EAGLE', 'EARTH', 'FAITH', 'FENCE', 'FLAME', 'FRESH',
  'GHOST', 'GIANT', 'GLASS', 'GRAPE', 'HAPPY', 'HEART', 'HOUSE',
  'IMAGE', 'JOKER', 'KNIFE', 'LEMON', 'LIGHT', 'MAGIC', 'MAPLE',
  'MUSIC', 'NIGHT', 'NORTH', 'OCEAN', 'OLIVE', 'PAPER', 'PEACE',
  'PIANO', 'PILOT', 'PIZZA', 'PLANT', 'POWER', 'PRIDE', 'PRIZE',
  'QUEEN', 'QUEST', 'QUICK', 'QUIET', 'RADIO', 'RIVER', 'ROBOT',
  'ROUND', 'SHARK', 'SHARP', 'SHINE', 'SMILE', 'SNAKE', 'SOLAR',
  'SOUND', 'SPACE', 'SPARK', 'STONE', 'STORM', 'STORY', 'SUGAR',
  'SWEET', 'TABLE', 'THINK', 'TIGER', 'TODAY', 'TOWER', 'TRACK',
  'TRAIN', 'TRUST', 'TRUTH', 'VOICE', 'WATER', 'WHEEL', 'WHITE',
  'WORLD', 'WRITE', 'YOUTH', 'ZEBRA',
];

export function getRandomAnswer() {
  return ANSWER_WORDS[Math.floor(Math.random() * ANSWER_WORDS.length)];
}
