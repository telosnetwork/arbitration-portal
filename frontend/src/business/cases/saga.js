import { put, takeEvery, select } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

import * as api     from 'utils/api-client';
import * as actions from './actions';
import { AuthenticationSelectors } from '../selectors';

// TODO All this things should be done in a contract wrapper outside of the saga, and the saga should call them

export function* sendAction({ action, actionData }) {

  const eosio = yield select(AuthenticationSelectors.eosio);

  let actionObject = yield eosio.makeAction(
    process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT,
    action,
    actionData,
  );
  console.log(actionObject);

  let result = yield eosio.sendTx(actionObject);
  console.log('Results: ', result);
  if (result) {
    alert(`FileCase Successful`);
  } else {
    alert(`FileCase Unsuccessful`);
  }

}

export function* fileCase({ caseData }) {

  const account = yield select(AuthenticationSelectors.account);

  const claimant = account.name;
  const { claim_link, lang_codes, respondant } = caseData;

  const actionData = {
    claimant,
    claim_link,
    lang_codes,
    respondant,
  };

  yield sendAction({ action: 'filecase', actionData })

}

export function* addClaim({ claimData }) {

  const account = yield select(AuthenticationSelectors.account);
  const claimant = account.name;

  const { case_id, claim_link } = claimData;

  const actionData = {
    case_id,
    claimant,
    claim_link,
  };

  yield sendAction({ action: 'addclaim', actionData })

}

export function* deleteCase({ case_id }) {

  const actionData = {
    case_id,
  };

  yield sendAction({ action: 'deletecase', actionData })

}

export function* deleteClaim({ case_id, claim_id }) {

  const actionData = {
    case_id,
    claim_id,
  };

  yield sendAction({ action: 'deleteclaim', actionData })

}

export function* readyCase({ case_id }) {

  const account = yield select(AuthenticationSelectors.account);
  const claimant = account.name;

  const actionData = {
    case_id,
    claimant,
  };

  yield sendAction({ action: 'readycase', actionData })

}
export function* respondClaim({ responseData }) {

  const account = yield select(AuthenticationSelectors.account);
  const respondant = account.name;

  const claim_hash = ''; // TODO ???

  const { case_id, response_link } = responseData;

  const actionData = {
    case_id,
    claim_hash,
    respondant,
    response_link,
  };

  yield sendAction({ action: 'respond', actionData })

}

export function* fetchCases() {

  let cases = yield api.getCases();
  yield put(actions.setCases(cases));

}

export default function* casesSaga() {

  yield takeEvery(ActionTypes.FETCH_CASES, fetchCases);
  yield takeEvery(ActionTypes.FILE_CASE, fileCase);
  yield takeEvery(ActionTypes.ADD_CLAIM, addClaim);
  yield takeEvery(ActionTypes.DELETE_CASE, deleteCase);
  yield takeEvery(ActionTypes.DELETE_CLAIM, deleteClaim);
  yield takeEvery(ActionTypes.READY_CASE, readyCase);
  yield takeEvery(ActionTypes.RESPOND_CLAIM, respondClaim);

}
