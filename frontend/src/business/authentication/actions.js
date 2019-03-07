import { ActionTypes } from 'const';

export function setAuthentication({ isLogin, account }) {
    return {
        type: ActionTypes.SET_AUTH,
        isLogin,
        account
    }
}
