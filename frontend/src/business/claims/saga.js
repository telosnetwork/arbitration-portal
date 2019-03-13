import { put, takeEvery } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

import * as api     from 'utils/api-client';
import * as actions from './actions';

export function* fetchClaims() {

    let claims = yield api.getClaims();
    yield put(actions.setClaims(claims));

}

export default function* claimsSaga() {

  yield takeEvery(ActionTypes.FETCH_CLAIMS, fetchClaims);

}
