import { useReducer, useEffect } from 'react';
import axios from 'axios';

//const BASE_URL = "https://jobs.github.com/positions.json"
//self hosted
const BASE_URL = "http://localhost:8080/https://jobs.github.com/positions.json"
//heroku hosted
//const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"

const ACTIONS = {
    MAKE_REQUEST: "make-request",
    GET_DATA: "get-data",
    ERROR: "error"
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { ...state, jobs: [], loading: true }
        case ACTIONS.GET_DATA:
            return { ...state, jobs: action.payload.jobs, loading: false }
        case ACTIONS.ERROR:
            return { error: true, jobs: [] }
        case ACTIONS.UPDATE_HASNEXTPAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage, error: action.payload.error }
        default:
            return { ...state }

    }
}

export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true, error: false });

    useEffect(() => {

        const cancelToken1 = axios.CancelToken.source();
        const cancelToken2 = axios.CancelToken.source();

        dispatch({ type: ACTIONS.MAKE_REQUEST });

        //request 1
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params }
        })
        .then((result) => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: result.data, loading: false } });

        }).catch((error) => {
            dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
        })

        //request 2 for has next page
        axios.get(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: {...params, markdown: true, page: page + 1 }
        })
        .then((result) => {
            dispatch({ type: ACTIONS.UPDATE_HASNEXTPAGE, payload: { hasNextPage: result.data.length > 0 } });
        }).catch((error) => {
            dispatch({ type: ACTIONS.UPDATE_HASNEXTPAGE, payload: { hasNextPage: false, error: error } });
        })

        return (() => {
            cancelToken1.cancel("param changed");
            cancelToken2.cancel("param changed");
        })

    }, [params, page])

    return state;
}