import React from "react";
import {Bar, Pie} from "react-chartjs-2";
import {Chart, registerables} from 'chart.js';
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
    eachQuestionTimer: number[]
}

const Result: React.FC<ResultsProps> = ({eachQuestionTimer, correctAnswer, dispatch, wrongAnswer, score, data}) => {
    const totalScore = Object.values(data).reduce((acc, val) => {
        return acc + val.points
    }, 0)
    const handleRestart = () => {
        dispatch({type: 'res'})
    }
    const data2 = {
        labels: eachQuestionTimer.map((_, index) => `Question ${index + 1}`),
        datasets: [
            {
                label: 'Time Taken (seconds)',
                data: eachQuestionTimer,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Time (s)',
                },
            },
        },
    };
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
    const proportion = (score / totalScore) * 360;
    const Piedata = {
        labels: [`Total Score ${totalScore}`,`Your Score ${score}`],
        datasets: [
            {
                data: [ 360 - proportion,proportion],
                backgroundColor: ['#FF6384','#36A2EB',],
                hoverBackgroundColor: ['#FF6384','#36A2EB'],
            },
        ],
    };

    return (
        <div className={'text-white font-medium text-md mt-10'}>

            <div className={'flex flex-col lg:flex-row w-full lg:w-1/2 gap-10 items-center'}>
                <div className={'w-full'}>
                    <Bar data={Bardata}/>
                </div>
                <div className={'w-full'}>
                    <Pie data={Piedata} options={optionsPie}/>
                </div>
            </div>
            <div className={'w-full'}>
                <Bar data={data2} options={options}/>
            </div>
            <div className={'flex justify-center mt-4'}>
            <button className={'mb-4 lg:mb-0 py-4 px-2 rounded-md bg-red-500'} onClick={handleRestart}>Restart</button>
            </div>
        </div>

    )
}

export default Result