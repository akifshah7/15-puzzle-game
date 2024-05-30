import "./index.css";

interface ShuffleProps {
  reset: () => void;
}

const Shuffle: React.FC<ShuffleProps> = ({ reset }) => (
  <div className="button-wrapper">
    <button onClick={reset}>Shuffle</button>
  </div>
);

export default Shuffle;
