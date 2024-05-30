import "./index.css";

interface TileProps {
  number: {
    value: number;
    index: number;
  };
  moveTile: (number: { value: number; index: number }) => void;
}

const Tile: React.FC<TileProps> = ({ number, moveTile }) => (
  <button
    onClick={() => moveTile(number)}
    className={`number ${number.value === number.index + 1 ? "correct" : ""} ${
      number.value === 16 ? "disabled" : ""
    } slot--${number.index}`}
  >
    {number.value === 16 ? "" : number.value}
  </button>
);

export default Tile;
