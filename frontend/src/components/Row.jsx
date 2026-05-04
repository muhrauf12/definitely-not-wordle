import Tile from './Tile';

export default function Row({ letters = '', feedback = null, wordLength }) {
  const tiles = [];
  for (let i = 0; i < wordLength; i++) {
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