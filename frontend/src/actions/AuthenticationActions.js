import { ActionTypes } from 'const';

class AuthenticationActions {

    static setAuthentication({ isLogin, account }) {
        return {
            type: ActionTypes.SET_AUTH,
            isLogin,
            account
        }
    }
}

export default AuthenticationActions;