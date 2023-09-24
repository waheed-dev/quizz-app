import React from "react";

interface QuestionsProps {
    data: {
        question: string
        options: []
        correctOption: number
        points: number
    }[]
    index: number
}

const Questions: React.FC<QuestionsProps> = ({data, index}) => {
    return (
        <div className={'text-white mt-5'}>
            <div>
                <p className={'text-4xl'}>{data[index].question}</p>
                <ul>
                    {data[index].options.map(Q => {
                        return (
                            <li key={Q} className={'text-2xl m-4'}>{Q}</li>
                        )
                    })}
                </ul>
            </div>
            <div className={'flex flex-row mt-5 gap-6 items-center justify-center   '}>
                <button className={'bg-red-600 py-2 px-4 disabled:opacity-60'} disabled={index === 0}>Previous</button>
                <button className={'bg-green-600 py-2 px-4'}>Next</button>
            </div>
        </div>
    );
};
export default Questions;
