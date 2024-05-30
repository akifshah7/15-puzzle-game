import "./index.css";

interface OverlayProps {
  size: number;
}

const Overlay: React.FC<OverlayProps> = ({ size }) =>
  new Array(size).fill(undefined).map((_, i) => <div key={i} className="overlay" />);

export default Overlay;
