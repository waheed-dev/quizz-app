import React, {useState} from "react";
import {actionType} from "../App.tsx";

interface QuestionsProps {
    data: {
        question: string
        options: []
        correctOption: number
        points: number
    }[]
    index: number
    dispatch: (action: actionType) => void
}

const Questions: React.FC<QuestionsProps> = ({data, index, dispatch}) => {

    const handleCorrectOption = (optionIndex : number) => {

    }
    return (
        <div className={'text-white mt-5'}>
            <div>
                <p className={'text-4xl'}>{data[index].question}</p>
                <ul>
                    {data[index].options.map((Q,index1) => {
                        return (
                            <li key={Q} onClick={() =>handleCorrectOption(index1)} className={`text-2xl m-4  bg-gray-800 py-3 px-2 rounded }`}>{Q}</li>
                        )
                    })}
                </ul>
            </div>
            <div className={'flex flex-row mt-5 gap-6 items-center justify-center'}>
                <button className={'bg-red-600 py-2 px-4 disabled:opacity-60'} disabled={index === 0}
                        onClick={() => dispatch({type: 'prev'})}>Previous
                </button>
                <button className={'bg-green-600 py-2 px-4 disabled:opacity-60'}
                        onClick={() => dispatch({type: 'next'})} disabled={index === (data.length - 1)}>Next
                </button>
            </div>
        </div>
    );
};
export default Questions;
