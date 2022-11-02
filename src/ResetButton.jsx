import { useDispatch } from "react-redux";
import { restartGame } from "./store";

export function ResetButton() {
    const dispatch = useDispatch();

    return <button
        className="btn"
        onClick={ () => {
            dispatch( restartGame() )
        } }
    >
        Remise à Zéro
    </button>
}