import { put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from 'const';

import * as api from 'utils/api-client';
import * as actions from './actions';

export function* fetchCases() {

  let cases = yield api.getCases();
  yield put(actions.setCases(cases));

}

export default function* usersSaga() {

  yield takeEvery(ActionTypes.FETCH_CASES, fetchCases);

}
