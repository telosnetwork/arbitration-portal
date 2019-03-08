import { ActionTypes } from 'const';

export function fetchArbitrators() {
    return {
        type: ActionTypes.FETCH_ARBITRATORS,
    };
}

export function setArbitrators(arbitrators) {
    return {
        type: ActionTypes.SET_ARBITRATORS,
        arbitrators,
    }
}
