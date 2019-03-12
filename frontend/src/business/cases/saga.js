import { put, takeEvery, select } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

import * as api     from 'utils/api-client';
import * as actions from './actions';
import { AuthenticationSelectors } from '../selectors';

export function* fileCase({ caseData }) {

  const account = yield select(AuthenticationSelectors.account);
  console.log(caseData, account);

}
export function* fetchCases() {

  let cases = yield api.getCases();
  yield put(actions.setCases(cases));

}

export default function* usersSaga() {

  yield takeEvery(ActionTypes.FETCH_CASES, fetchCases);
  yield takeEvery(ActionTypes.FILE_CASE, fileCase);

}
