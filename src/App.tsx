import './App.css'
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import {useEffect, useReducer} from "react";
import axios, {AxiosError} from "axios";
import Loader from "./components/Loader.tsx";
import {StartScreen} from "./components/StartScreen.tsx";

enum Status {
    loading = 'loading',
    ready = 'ready',
    error = 'error'
}

interface ReducerState {
    data: []
    status: Status
}

type actionType = { type: 'fetch', payload: [] } | { type: 'error' }
const reducer = (state: ReducerState, action: actionType) => {
    switch (action.type) {
        case 'fetch' :
            return {...state, data: action.payload, status: Status.ready}
        case "error":
            return {...state, status: Status.error}
        default :
            return state
    }
}

const initialState: ReducerState = {
    data: [],
    status: Status.loading
}

function App() {

    const [{data,status}, dispatch] = useReducer(reducer, initialState)
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
                {status === 'ready' ? <StartScreen data={data}/> : ''}
            </Main>
        </div>
    )
}

export default App
