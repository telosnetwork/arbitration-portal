import { ActionTypes } from 'const';

export function fetchCalims() {
    return {
        type: ActionTypes.FETCH_CLAIMS,
    };
}

export function setClaims(claims) {
    return {
        type: ActionTypes.SET_CLAIMS,
        claims,
    }
}