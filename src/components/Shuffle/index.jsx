import './index.css';
import PropTypes from 'prop-types'

const Shuffle = ({ reset }) =>
    <div className='button-wrapper'>
        <button onClick={reset}>Shuffle</button>
    </div>

Shuffle.propTypes = {
    reset: PropTypes.func.isRequired,
}

export default Shuffle
