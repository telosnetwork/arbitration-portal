import { ActionTypes } from 'const';

const initialState = {
    isLogin: false,
    account: null
};

export default function(state = initialState, action) {
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