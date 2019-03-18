import { all } from 'redux-saga/effects';

import arbitratorsSaga from './arbitrators/saga';
import authenticationSaga from './authentication/saga';
import casesSaga from './cases/saga';
import claimsSaga from './claims/saga';
import modalSaga from './modal/saga';

export default function* rootSaga() {

  yield all([
    arbitratorsSaga(),
    authenticationSaga(),
    claimsSaga(),
    casesSaga(),
    modalSaga(),
  ]);

}
