import React, {useEffect} from "react";
import {actionType} from "../App.tsx";

interface TimerProps {
    dispatch: (action: actionType) => void
    timer : number | null
}

const Timer : React.FC<TimerProps> = ({dispatch,timer}) => {
    const mins = Math.floor(timer / 60)
    const secounds = (timer % 60)
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({type : 'timer'})
        },1000)
        return () => clearInterval(id)
    }, [dispatch]);
    return (
        <div>
            <span className={'text-white'}>
                {mins < 10 && '0'}
                {mins}
                :
                {secounds < 10 && '0'}
                {secounds}
            </span>
        </div>
    );
};
export default Timer;
