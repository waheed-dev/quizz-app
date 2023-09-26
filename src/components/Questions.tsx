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
    status: Status
}

const Questions: React.FC<QuestionsProps> = ({data, status, index, dispatch, score}) => {
   const totalScore = Object.values(data).reduce((acc,val) => {
        return acc + val.points
    },0)

    const handleCorrectOption = (optionIndex: number) => {
        if (optionIndex === data[index].correctOption) {
            dispatch({type: "addScore", payload: data[index].points})
            dispatch({type : 'correctAnswer'})
        } else {
            dispatch({type : 'wrongAnswer'})
        }
        dispatch({type: Status.finished})
    }
    const handleNext = () => {
        dispatch({type: 'next'})
        dispatch({type: Status.active})
    }
    const handleRes = () => {

        dispatch({type: 'res'})
    }
    const percentage = (index   / data.length) * 100
    console.log(percentage)
    return (
        <div className={'text-white container mt-5'}>
            <div className={'w-2/3 mx-auto'}>
                <div className={'text-xl text-center  m-4 rounded-xl items-center'}>POINTS : {score} / {totalScore}
                <div className="relative mb-5 h-4 rounded-full bg-gray-200">
                    <div className="h-4 rounded-full bg-red-500" style={{width: `${percentage}%`}}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-900">{index + 1} / {data.length}</span>
                </div>
                </div>
                <p className={'text-3xl'}>{data[index].question}</p>
                {status === Status.active ? <ul className={'w-full'}>
                    {data[index].options.map((Q, index1) => {
                        return (
                            <li key={Q} onClick={() => handleCorrectOption(index1)}
                                className={`w-full text-xl m-4 py-3 px-2 rounded-xl bg-gray-800 hover:bg-gray-950 hover:scale-105`}>{Q}</li>
                        )
                    })}
                </ul> : null}
                {status === Status.finished ? <ul className={'w-full'}>
                    {data[index].options.map((Q, index1) => {
                        return (
                            <li key={Q}
                                className={` w-full text-xl m-4  bg-gray-800 py-3 px-2 rounded hover:cursor-not-allowed ${data[index].correctOption === index1 ? 'bg-green-600' : 'bg-red-600'}`}>{Q}</li>
                        )
                    })}
                </ul> : null}
            </div>
            <div className={'flex flex-row mt-5 gap-6 items-center justify-center'}>
                <button className={'bg-red-600 py-2 px-4 disabled:opacity-60'} disabled={index === 0}
                        onClick={handleRes}>Restart
                </button>
                <button className={'bg-green-600 py-2 px-4 disabled:opacity-60'}
                        onClick={handleNext} disabled={index === (data.length - 1) || status === Status.active}>Next
                </button>
            </div>

        </div>
    );
};

export default Questions;
