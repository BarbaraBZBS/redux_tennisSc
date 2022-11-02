import { configureStore } from '@reduxjs/toolkit';
import produce from "immer";

const initialState = {
    player1: 0,
    player2: 0,
    advantage: null,
    winner: null,
    playing: true,
    history: [

    ],
};

export const playPause = () => ( { type: "playPause" } );

export const pointScored = ( player ) => ( {
    type: "pointScored",
    payload: { player: player }
} );

export const restartGame = () => ( { type: "restart" } );

function reducer( state = initialState, action ) {
    if ( action.type === "playPause" ) {
        if ( state.winner ) {
            return state;
        }
        return produce( state, ( draft ) => {
            draft.playing = !draft.playing
        } );
    }
    if ( action.type === "restart" ) {
        return produce( state, ( draft ) => {
            if ( draft.winner ) {
                draft.history.push( {
                    player1: draft.player1,
                    player2: draft.player2,
                    winner: draft.winner
                } );
            }
            draft.player1 = 0;
            draft.player2 = 0;
            draft.advantage = null;
            draft.winner = null;
            draft.playing = true;
        } );
    }
    if ( action.type === "pointScored" ) {
        const player = action.payload.player;
        const opponent = player === "player1" ? "player2" : "player1";
        if ( state.winner ) {
            return state;
        }
        if ( state.playing === false ) {
            return state;
        }
        return produce( state, ( draft ) => {
            const currentPlayerScore = draft[ player ];
            if ( currentPlayerScore <= 15 ) {
                draft[ player ] += 15
                return
            }
            if ( currentPlayerScore === 30 ) {
                draft[ player ] = 40
                return
            }
            if ( currentPlayerScore === 40 ) {
                if ( draft[ opponent ] !== 40 ) {
                    draft.winner = player
                    return
                }
                if ( draft.advantage === player ) {
                    draft.winner = player
                    return
                }
                if ( draft.advantage === null ) {
                    draft.advantage = player
                    return
                }
                draft.advantage = null
                return
            }
        } );
    }
    return state;
}

export const store = configureStore( { reducer: reducer, initialState } );
