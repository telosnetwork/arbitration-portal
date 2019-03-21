import { ActionTypes } from 'const';

export function listenWebsocket() {
  return {
    type: ActionTypes.LISTEN_WEBSOCKET,
  }
}

export function login() {
  return {
    type: ActionTypes.LOGIN,
  }
}

export function logout() {
  return {
    type: ActionTypes.LOGOUT,
  }
}

export function resetAuth() {
  return {
    type: ActionTypes.SET_AUTH,
    isLogin: false,
    account: null,
    eosio: null,
  }
}

export function setAuthentication({ isLogin, account, eosio, arbitrationContract }) {
  return {
    type: ActionTypes.SET_AUTH,
    isLogin,
    account,
    eosio,
    arbitrationContract,
  }
}
