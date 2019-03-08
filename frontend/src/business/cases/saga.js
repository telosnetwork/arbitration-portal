import { put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from 'const';

import * as api from 'utils/api-client';
import * as actions from './actions';

export function* fetchCases() {

  //yield put(actions.setUsersLoading(true));
  let cases = yield api.getCases();
  yield put(actions.setCases(cases));
  //yield put(actions.setUsersLoading(false));

}

export default function* usersSaga() {

  yield takeEvery(ActionTypes.FETCH_CASES, fetchCases);

}
