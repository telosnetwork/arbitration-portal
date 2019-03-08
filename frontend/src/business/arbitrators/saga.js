import { put, takeEvery } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

import * as api     from 'utils/api-client';
import * as actions from './actions';

export function* fetchArbitrators() {

  let arbitrators = yield api.getArbitrators();
  yield put(actions.setArbitrators(arbitrators));

}

export default function* usersSaga() {

  yield takeEvery(ActionTypes.FETCH_ARBITRATORS, fetchArbitrators);

}
