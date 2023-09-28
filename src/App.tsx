import './App.css'
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import {useEffect, useReducer} from "react";
import axios, {AxiosError} from "axios";
import Loader from "./components/Loader.tsx";
import {StartScreen} from "./components/StartScreen.tsx";
import Questions from "./components/Questions.tsx";
import Result from "./components/Result.tsx";

export enum Status {
    loading = 'loading',
    ready = 'ready',
    error = 'error',
    active = 'active',
    finished = 'finished',
    result = 'result'
}

interface ReducerState {
    data: {
        question: string
        options: []
        correctOption: number
        points: number
    }[]
    status: Status
    index: number
    timeTakenForEachQuestion : number
    score: number
    correctAnswers: number
    wrongAnswers: number
    timer: number | null
    ProgressTrack: number | string
    eachQuestionTimer : number[]
}

export type actionType = { type: 'fetch', payload: [] } | { type: Status.error } | { type: Status.active } | {
    type: 'next'
} | {
    type: 'res'
} | { type: 'addScore', payload: number } | { type: Status.finished } | { type: Status.result } | {
    type: 'correctAnswer'
} | { type: 'wrongAnswer' } | { type: 'timer' } | { type: 'ProgressTrack', payload: string } | {type : 'questionTimer'} | {type : 'timeTakenForEachQuestion'}
const reducer = (state: ReducerState, action: actionType) => {
    switch (action.type) {
        case 'fetch' :
            return {...state, data: action.payload, status: Status.ready,timer: state.data.length * 15}
        case "error":
            return {...state, status: Status.error}
        case "active":
            return {...state, status: Status.active, }
        case "next" :
            return {...state, index: state.index + 1}
        case "res" :
            return {...state, index: 0, score: 0, status: Status.active,timer: state.data.length * 15,eachQuestionTimer : [],timeTakenForEachQuestion : 0}
        case "addScore" :
            return {...state, score: state.score + action.payload}
        case Status.finished :
            return {...state, status: Status.finished}
        case Status.result :
            return {...state, status: Status.result}
        case "correctAnswer":
            return {...state, correctAnswers: state.correctAnswers + 1}
        case "wrongAnswer":
            return {...state, wrongAnswers: state.wrongAnswers + 1}
        case "ProgressTrack":
            return {...state, ProgressTrack: action.payload}
        case "timer" :
            return {...state, timer: state.timer! - 1, status: state.timer === 0 ? Status.result : state.status}
        case "timeTakenForEachQuestion" :
            return {...state,timeTakenForEachQuestion : state.timeTakenForEachQuestion + 1}
        case "questionTimer" :
        return {...state,eachQuestionTimer : [...state.eachQuestionTimer,state.timeTakenForEachQuestion],timeTakenForEachQuestion : 0 }
        default :
            return state
    }
}
const initialState: ReducerState = {
    index: 0,
    data: [],
    status: Status.loading,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    ProgressTrack: '',
    timer: 500,
    timeTakenForEachQuestion : 0,
    eachQuestionTimer : []
}

function App() {

    const [{
        data,
        timer,
        ProgressTrack,
        status,
        index,
        score,
        correctAnswers,
        wrongAnswers,
        eachQuestionTimer,
        timeTakenForEachQuestion,
    }, dispatch] = useReducer(reducer, initialState)
    console.log(eachQuestionTimer,timeTakenForEachQuestion)
    useEffect(() => {
        axios.get('https://cyan-roan-woodpecker.glitch.me/questions').then(res => {
            dispatch({type: 'fetch', payload: res.data})
        }).catch((e: Error | AxiosError) => {
            console.log(e)
            dispatch({type: Status.error})
        })
    }, []);

    useEffect(() => {
        if (index === (data.length - 1) && status === Status.finished) {
            dispatch({type: 'ProgressTrack', payload: 'Quiz completed! Redirecting'})
            setTimeout(() => {
                dispatch({type: Status.result})
            }, 2000);
        }
    }, [data.length, index, status]);
    return (
        <div className={'flex flex-col items-center p-2 h-screen'}>
            <Header/>
            <Main>
                {status === 'loading' ? <Loader/> : ''}
                {status === 'error' ? <div>Error Loading Data</div> : ''}
                {status === 'ready' ? <StartScreen dispatch={dispatch} data={data}/> : ''}
                {status === 'active' || status === 'finished' ?
                    <Questions timer={timer} progressTrack={ProgressTrack} data={data} dispatch={dispatch}
                               status={status} score={score} index={index}/> : ''}
                {status === Status.result ?
                    <Result eachQuestionTimer={eachQuestionTimer} data={data} dispatch={dispatch} correctAnswer={correctAnswers} wrongAnswer={wrongAnswers}
                            score={score}/> : null}
            </Main>
        </div>
    )
}

export default App
