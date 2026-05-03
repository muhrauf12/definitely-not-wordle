import Tile from './Tile';
import { WORD_LENGTH } from '../utils/constants';

export default function Row({ letters = '', feedback = null }) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    tiles.push(
      <Tile
        key={i}
        letter={letters[i] || ''}
        status={feedback ? feedback[i] : null}
      />
    );
  }
  return <div className="flex gap-1.5 justify-center">{tiles}</div>;
}