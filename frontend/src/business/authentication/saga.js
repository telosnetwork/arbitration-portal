import { put, takeEvery } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

import ScatterBridge             from 'utils/scatterBridge';
import ArbitrationContract        from 'utils/arbitrationContract';

import {ArbitratorsActions, AuthenticationActions, CasesActions} from '../actions';

export function* login() {

  const appName = process.env.REACT_APP_NAME;
  const network = {
    blockchain: `${process.env.REACT_APP_BLOCKCHAIN}`,
    node_uri:   `${process.env.REACT_APP_NODE_URI}`,
    chainId:    `${process.env.REACT_APP_CHAINID}`
  };
  const eosio = new ScatterBridge(network, appName);

  yield eosio.connect();
  yield eosio.login();

  const arbitrationContract = new ArbitrationContract(eosio);

  yield put(AuthenticationActions.setAuthentication({
    isLogin: !!eosio.currentAccount,
    account: eosio.currentAccount,
    eosio,
    arbitrationContract,
  }));

  yield put(AuthenticationActions.listenWebsocket());

  yield put(ArbitratorsActions.fetchArbitrators());
  yield put(CasesActions.fetchCases());

}

export default function* authenticationSaga() {

  yield takeEvery(ActionTypes.LOGIN, login);

}
