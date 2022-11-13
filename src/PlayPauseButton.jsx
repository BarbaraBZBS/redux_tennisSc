import { useStore, useSelector } from 'react-redux';
import { autoPlay } from './store';
import { selectGameIsPlaying } from './selectors';

export function PlayPauseButton() {
    const store = useStore();
    const playing = useSelector( selectGameIsPlaying );

    return <button
        className='btn'
        onClick={ () => {
            autoPlay( store )
        } }
    >
        { playing ? "Jeu en cours..." : "Jouer" }
    </button>
}
