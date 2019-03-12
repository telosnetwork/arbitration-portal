import { all } from 'redux-saga/effects';

import claimsSaga from './claims/saga';
import casesSaga from './cases/saga';
import arbitratorsSaga from './arbitrators/saga';
import authenticationSaga from './authentication/saga';

export default function* rootSaga() {

  yield all([
    authenticationSaga(),
    claimsSaga(),
    casesSaga(),
    arbitratorsSaga(),
  ]);

}
