import { ActionTypes } from 'const';


export function setCases(cases) {
    return {
        type: ActionTypes.SET_CASES,
        cases,
    }
}