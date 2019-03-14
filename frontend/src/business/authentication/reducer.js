import { ActionTypes } from 'const';
import { createReducer } from 'utils/redux';

export const STATE_KEY = 'authentication';

const initialState = {
  isLogin: false,
  account: null,
  eosio: null,
  arbitrationContract: null,
};

function setAuth(state, action) {
  return Object.assign({}, state, {
    isLogin: action.isLogin,
    account: action.account,
    eosio: action.eosio,
    arbitrationContract: action.arbitrationContract,
  });
}

export const reducer = createReducer(initialState, {
  [ActionTypes.SET_AUTH]: setAuth,
});
