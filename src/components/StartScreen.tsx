import React from "react";
import {actionType, Status} from "../App.tsx";

interface StartScreenProps {
    data : {
        question : string
        options : []
        correctOption : number
        points : number
    }[]
    dispatch: (action : actionType) => void
}
export const StartScreen: React.FC<StartScreenProps> = ({data, dispatch}) => {
    const handleStart = () => {
        dispatch({type : 'ready'})
        dispatch({type: Status.active})
    }
    return (
        <div className={'text-white flex flex-col items-center mt-10 gap-5'}>
            <h1 className={'text-3xl font-bold'}>Welcome to the React Quiz</h1>
            <p className={'text-lg text-center lg:text-2xl'}>{data.length} questions to test your react mastery</p>
            <button className={'bg-gray-800 py-4 px-4 rounded-xl hover:opacity-90'} onClick={handleStart}>Click to
                start
            </button>
        </div>
    );
};