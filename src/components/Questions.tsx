import React from "react";
import {actionType, Status} from "../App.tsx";

interface QuestionsProps {
    data: {
        question: string
        options: []
        correctOption: number
        points: number
    }[]
    index: number
    dispatch: (action: actionType) => void
    score: number
    status : Status
}

const Questions: React.FC<QuestionsProps> = ({data,status, index, dispatch, score}) => {
    console.log(status)
    const handleCorrectOption = (optionIndex: number) => {
        if (optionIndex === data[index].correctOption) {
            dispatch({type: "addScore", payload: data[index].points})
        }
            dispatch({type : Status.finished})
    }
    return (
        <div className={'text-white mt-5'}>
            <div>
                <p className={'text-2xl bg-gray-800 py-4 px-3 rounded-xl text-center'}>POINTS : {score}</p>
                <p className={'text-4xl'}>{data[index].question}</p>
                {status === Status.active ? <ul>
                    {data[index].options.map((Q, index1) => {
                        return (
                            <li key={Q} onClick={() => handleCorrectOption(index1)}
                                className={`text-2xl m-4  bg-gray-800 py-3 px-2 rounded }`}>{Q}</li>
                        )
                    })}
                </ul> : null}
                {status === Status.finished ? <ul>
                    {data[index].options.map((Q, index1) => {
                        return (
                            <li key={Q}
                                className={`text-2xl m-4  bg-gray-800 py-3 px-2 rounded hover:cursor-none ${data[index].correctOption === index1 ? 'bg-green-600' : 'bg-red-600'}`}>{Q}</li>
                        )
                    })}
                </ul> : null}
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
