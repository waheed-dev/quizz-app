import React from "react";

interface StartScreenProps {
    data : []
}

export const StartScreen: React.FC<StartScreenProps> = ({data}) => {
    return (
        <div className={'text-white flex flex-col items-center mt-10 gap-5'}>
        <h1 className={'text-3xl font-bold'}>Welcome to the React Quiz</h1>
            <p className={'text-2xl'}>{data.length} questions to test your react mastery</p>
            <button className={'bg-gray-800 py-4 px-4 rounded-xl hover:opacity-90'}>Click to start</button>
        </div>
    );
};