import { put, takeEvery } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

import ScatterBridge             from 'utils/scatterBridge';

import { AuthenticationActions } from '../actions';

export function* login() {

  const appName = process.env.REACT_APP_NAME;
  const network = {
    blockchain: `${process.env.REACT_APP_BLOCKCHAIN}`,
    protocol:   `${process.env.REACT_APP_PROTOCOL}`,
    host:       `${process.env.REACT_APP_HOST}`,
    port:       `${process.env.REACT_APP_PORT}`,
    chainId:    `${process.env.REACT_APP_CHAINID}`
  };
  const eosio = new ScatterBridge(network, appName);

  yield eosio.connect();
  yield eosio.login();

  yield put(AuthenticationActions.setAuthentication({
    isLogin: !!eosio.currentAccount,
    account: eosio.currentAccount,
    eosio,
  }));

}

export default function* authenticationSaga() {

  yield takeEvery(ActionTypes.LOGIN, login);

}
