import './App.css'
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import {useEffect, useReducer} from "react";
import axios, {AxiosError} from "axios";
import Loader from "./components/Loader.tsx";
import {StartScreen} from "./components/StartScreen.tsx";
import Questions from "./components/Questions.tsx";

export enum Status {
    loading = 'loading',
    ready = 'ready',
    error = 'error',
    active = 'active',
    finished = 'finished'
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
    score: number
}

export type actionType = { type: 'fetch', payload: [] } | { type: Status.error } | { type: Status.active } | { type: 'next' } | {
    type: 'prev'
} | { type: 'addScore', payload: number } | {type : Status.finished}
const reducer = (state: ReducerState, action: actionType) => {
    switch (action.type) {
        case 'fetch' :
            return {...state, data: action.payload, status: Status.ready}
        case "error":
            return {...state, status: Status.error}
        case "active":
            return {...state, status: Status.active}
        case "next" :
            return {...state, index: state.index + 1}
        case "prev" :
            return {...state, index: state.index - 1}
        case "addScore" :
        return {...state,score :state.score + action.payload}
        case Status.finished :
            return {...state,status: Status.finished}
        default :
            return state
    }
}

const initialState: ReducerState = {
    index: 0,
    data: [],
    status: Status.loading,
    score: 0
}

function App() {

    const [{data, status, index, score}, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        axios.get('http://localhost:8000/questions').then(res => {
            dispatch({type: 'fetch', payload: res.data})
        }).catch((e: Error | AxiosError) => {
            dispatch({type: Status.error})
            console.log(e)
        })
    }, []);
    console.log(data)
    return (
        <div className={'flex flex-col items-center h-screen'}>
            <Header/>
            <Main>
                {status === 'loading' ? <Loader/> : ''}
                {status === 'error' ? <div>Error Loading Data</div> : ''}
                {status === 'ready' ? <StartScreen dispatch={dispatch} data={data}/> : ''}
                {status === 'active' || status === 'finished' ? <Questions data={data} dispatch={dispatch} status={status} score={score} index={index}/> : ''}
            </Main>
        </div>
    )
}

export default App
