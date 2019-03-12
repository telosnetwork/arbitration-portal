import { ActionTypes } from 'const';

export function login() {
  return {
    type: ActionTypes.LOGIN,
  }
}

export function logout() {
  return {
    type: ActionTypes.SET_AUTH,
    isLogin: false,
    account: null,
    eosio: null,
  }
}

export function setAuthentication({ isLogin, account, eosio }) {
  return {
    type: ActionTypes.SET_AUTH,
    isLogin,
    account,
    eosio,
  }
}
