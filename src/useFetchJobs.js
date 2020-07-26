import { useReducer, useEffect } from 'react';
import axios from 'axios';

//const BASE_URL = "http://localhost:8080/https://jobs.github.com/positions.json"
const BASE_URL = "https://jobs.github.com/positions.json"

const ACTIONS = {
    MAKE_REQUEST: "make-request",
    GET_DATA: "get-data",
    ERROR: "error"
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { jobs: [], loading: true }
        case ACTIONS.GET_DATA:
            return { jobs: action.payload.jobs, loading: false }
        case ACTIONS.ERROR:
            return { error: true, jobs: [] }
        default:
            return { ...state }

    }
}

export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true, error: false });
    console.log(params);
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        dispatch({ type: ACTIONS.MAKE_REQUEST });
        axios.get(BASE_URL, {
            
            params: { markdown: true, page: page, ...params }
        })
            .then((result) => {
                dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: result.data, loading: false } });

            }).catch((error) => {
                dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
            })

        return (() => {
            cancelToken.cancel("param changed");
        })

    }, [params, page])

    return state;
}