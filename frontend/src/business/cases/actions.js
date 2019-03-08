import { ActionTypes } from 'const';

export function fetchCases() {
    return {
        type: ActionTypes.FETCH_CASES,
    };
}

export function setCases(cases) {
    return {
        type: ActionTypes.SET_CASES,
        cases,
    }
}
