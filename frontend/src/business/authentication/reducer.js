import { ActionTypes } from 'const';
import { createReducer } from 'utils/redux';

export const STATE_KEY = 'authentication';

const initialState = {
    isLogin: false,
    account: null
};

function setAuth(state, action) {
    switch (action.type) {
        case ActionTypes.SET_AUTH: {
            return Object.assign({}, state, {
                isLogin: typeof action.isLogin === "undefined" ? !state.isLogin : action.isLogin,
                account: action.account || initialState.account
            })
        }
        default:
            return state;
    }
}

export const reducer = createReducer(initialState, {
    [ActionTypes.SET_AUTH]: setAuth,
});