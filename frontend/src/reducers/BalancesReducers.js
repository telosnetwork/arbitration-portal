import { ActionTypes } from 'const';

const initialState = {
    id:     0,
    owner:  '',
    escrow: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_BALANCES: {
            return Object.assign({}, state, {
                id:     typeof action.name  === "undefined" ? state.id : action.id,
                owner:  typeof action.owner === "undefined" ? state.owner : action.owner,
                escrow: action.escrow || initialState.escrow
            });
        }
        default:
            return state;
    }
}