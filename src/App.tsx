import './App.css'
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import {useEffect, useReducer} from "react";
import axios, {AxiosError} from "axios";
import Loader from "./components/Loader.tsx";
import {StartScreen} from "./components/StartScreen.tsx";
import Questions from "./components/Questions.tsx";

enum Status {
    loading = 'loading',
    ready = 'ready',
    error = 'error',
    active = 'active'
}

interface ReducerState {
    data : {
        question : string
        options : []
        correctOption : number
        points : number
    }[]
    status: Status
    index : number
}

export type actionType = { type: 'fetch', payload: [] } | { type: 'error' } | {type : 'active'}
const reducer = (state: ReducerState, action: actionType) => {
    switch (action.type) {
        case 'fetch' :
            return {...state, data: action.payload, status: Status.ready}
        case "error":
            return {...state, status: Status.error}
        case "active":
            return {...state, status: Status.active}
        default :
            return state
    }
}

const initialState: ReducerState = {
    index: 0,
    data: [],
    status: Status.loading

}

function App() {

    const [{data,status,index}, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        axios.get('http://localhost:8000/questions').then(res => {
            dispatch({type: 'fetch', payload: res.data})
        }).catch((e: Error | AxiosError) => {
            dispatch({type: 'error'})
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
                {status === 'active' ? <Questions data={data} index={index}/> : ''}
            </Main>
        </div>
    )
}

export default App
