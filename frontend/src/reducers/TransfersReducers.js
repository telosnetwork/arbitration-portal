import { ActionTypes } from 'const';

const initialState = {
    trxHash:  '',
    from:     '',
    to:       '',
    quantity: '',
    memo:     ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_TRANSFERS: {
            return Object.assign({}, state, {
                trxHash: typeof action.trxHash === "undefined" ? state.trxHash : action.trxHash,
                from: action.from         || initialState.from,
                to: action.to             || initialState.to,
                quantity: action.quantity || initialState.quantity,
                memo: action.memo         || initialState.memo
            });
        }
        default:
            return state;
    }
}