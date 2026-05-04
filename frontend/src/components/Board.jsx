import Row from './Row';

export default function Board({ rows, wordLength }) {
  return (
    <div className="flex flex-col gap-1.5 my-6">
      {rows.map((r, i) => (
        <Row
          key={i}
          letters={r.letters}
          feedback={r.feedback}
          wordLength={wordLength}
        />
      ))}
    </div>
  );
}