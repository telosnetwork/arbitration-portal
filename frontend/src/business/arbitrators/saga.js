import { put, takeEvery, select } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

//import * as api     from 'utils/api-client';
import * as actions from './actions';
import {AuthenticationSelectors} from "../selectors";

export function* fetchArbitratorsFromTable() {

  const arbitrationContract = yield select(AuthenticationSelectors.arbitrationContract);

  const arbitrators = yield arbitrationContract.getArbitrators();

  yield put(actions.setArbitrators(arbitrators));

}

export function* fetchArbitrators() {

  yield fetchArbitratorsFromTable();

  /*
  let arbitrators = yield api.getArbitrators();
  yield put(actions.setArbitrators(arbitrators));
  */

}

export default function* arbitratorsSaga() {

  yield takeEvery(ActionTypes.FETCH_ARBITRATORS, fetchArbitrators);

}
