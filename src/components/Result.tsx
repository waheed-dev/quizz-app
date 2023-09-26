import React from "react";
import {Bar, Pie} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import {actionType} from "../App.tsx";
Chart.register(...registerables);
interface ResultsProps {
    correctAnswer: number
    wrongAnswer: number
    score: number
    data: {
        question: string
        options: []
        correctOption: number
        points: number
    }[]
    dispatch: (action: actionType) => void
}

const Result: React.FC<ResultsProps> = ({correctAnswer,dispatch, wrongAnswer, score,data}) => {
   const totalScore=  Object.values(data).reduce((acc,val) => {
        return acc + val.points
    },0)
    const handleRestart = () => {
       dispatch({type : 'res'})
    }
    const Bardata = {
        labels: [`Correct Answers ${correctAnswer}`, `Wrong Answers ${wrongAnswer}`],
        datasets: [
            {
                label: 'Answers',
                backgroundColor: ['#36A2EB', '#FF6384'],
                data: [correctAnswer, wrongAnswer],
            },
        ],
    };
    const Piedata = {
        labels: [`Your Score ${score}`, `Total Score ${totalScore}`],
        datasets: [
            {
                data: [score, totalScore],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    return (
        <div className={'text-white font-medium text-md mt-10'}>
            <div className={'flex w-1/2 gap-10 items-center'}>
                <div>
                    <div className={'flex gap-4'}>
                    </div>
            <Bar data={Bardata}/>
                </div>
                <div>
            <Pie data={Piedata}/>
                </div>
            </div>
            <button onClick={handleRestart}>Restart</button>
        </div>
    )
}

export default Result