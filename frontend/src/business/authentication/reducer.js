import { ActionTypes } from 'const';
import { createReducer } from 'utils/redux';

export const STATE_KEY = 'authentication';

const initialState = {
    isLogin: false,
    account: null
};

function setAuth(state, action) {
    return Object.assign({}, state, {
        isLogin: typeof action.isLogin === "undefined" ? !state.isLogin : action.isLogin,
        account: action.account || initialState.account
    });
}

export const reducer = createReducer(initialState, {
    [ActionTypes.SET_AUTH]: setAuth,
});