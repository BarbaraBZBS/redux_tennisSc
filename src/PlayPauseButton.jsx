import { useDispatch } from 'react-redux';
import { playPause } from './store';

export function PlayPauseButton() {
    const dispatch = useDispatch();

    return <button
        className='btn'
        onClick={ () => {
            dispatch( playPause() )
        } }
    >
        Pause / Reprendre
    </button>
}
