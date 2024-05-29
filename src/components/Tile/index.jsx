import './index.css';
import PropTypes from 'prop-types';

const Tile = ({ number, moveTile }) => 
    <button 
        onClick={() => moveTile(number)} 
        className={`number ${number.value === number.index + 1? 'correct' : ''} ${number.value===16? 'disabled' : ''} slot--${number.index}`}>
        {number.value === 16? '' : number.value}
    </button>

Tile.propTypes = {
    number: PropTypes.shape({
        value: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
    }).isRequired,
    moveTile: PropTypes.func.isRequired,
};    


export default Tile;